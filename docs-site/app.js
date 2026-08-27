'use strict';

const moduleStyle = document.querySelector('#module-style');
const streamMode = document.querySelector('#stream-mode');
const highWaterMark = document.querySelector('#high-water-mark');
const chunkInput = document.querySelector('#chunk-input');
const output = document.querySelector('#result-output code');
const statusText = document.querySelector('#status-text');
const modeFact = document.querySelector('#mode-fact');
const chunkFact = document.querySelector('#chunk-fact');
const unitFact = document.querySelector('#unit-fact');
const chunkFormat = document.querySelector('#chunk-format');

document.querySelector('#generate-button').addEventListener('click', render);
for (const control of [moduleStyle, streamMode, highWaterMark, chunkInput]) {
  control.addEventListener('input', render);
}

document.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-copy]');
  if (!button) return;
  const target = document.querySelector(button.dataset.copy);
  const value = target.matches('pre') ? target.textContent : target.textContent.trim();

  try {
    await navigator.clipboard.writeText(value);
    statusText.textContent = 'Copied to clipboard';
  } catch {
    statusText.textContent = 'Copy unavailable';
  }
});

render();

function render() {
  const objectMode = streamMode.value === 'objects';
  const maximum = objectMode ? 1024 : 1048576;
  const fallback = objectMode ? 16 : 16384;
  const highWaterMarkValue = clamp(Number(highWaterMark.value) || fallback, 1, maximum);
  const chunks = chunkInput.value.split(/\r?\n/).filter((line) => line.length > 0);
  const values = chunks.length > 0 ? chunks : ['value'];

  highWaterMark.max = String(maximum);
  highWaterMark.value = String(highWaterMarkValue);
  modeFact.textContent = objectMode ? 'object mode' : 'byte mode';
  chunkFact.textContent = `${values.length} ${values.length === 1 ? 'chunk' : 'chunks'}`;
  unitFact.textContent = `${highWaterMarkValue.toLocaleString('en-US')} ${objectMode ? 'objects' : 'bytes'}`;
  chunkFormat.textContent = objectMode ? 'one JSON value per line' : 'one string per line';
  output.textContent = createProgram({
    chunks: values,
    commonjs: moduleStyle.value === 'commonjs',
    highWaterMark: highWaterMarkValue,
    objectMode
  });
  statusText.textContent = 'Configuration ready';
}

function createProgram({ chunks, commonjs, highWaterMark: mark, objectMode }) {
  const importLine = commonjs
    ? "const devNull = require('@stackline/dev-null')"
    : "import devNull from '@stackline/dev-null'";
  const values = objectMode
    ? chunks.map((chunk, index) => parseObject(chunk, index))
    : chunks;
  const serialized = JSON.stringify(values, null, 2);
  const options = objectMode
    ? `{ objectMode: true, highWaterMark: ${mark} }`
    : `{ highWaterMark: ${mark} }`;

  return `${importLine}\n\nconst sink = devNull(${options})\n\nfor (const chunk of ${serialized}) {\n  if (!sink.write(chunk)) {\n    await new Promise((resolve) => sink.once('drain', resolve))\n  }\n}\n\nsink.end()`;
}

function parseObject(value, index) {
  try {
    return JSON.parse(value);
  } catch {
    return { index, value };
  }
}

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, Math.trunc(value)));
}

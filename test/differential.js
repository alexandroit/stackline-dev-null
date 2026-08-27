'use strict';

const assert = require('node:assert/strict');
const baseline = require('dev-null-baseline');
const candidate = require('../');

const executions = 300;
let seed = 0x51a7c0de;

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function main() {
  for (let index = 0; index < executions; index += 1) {
    const objectMode = randomInt(4) === 0;
    const options = {
      decodeStrings: randomInt(2) === 0,
      emitClose: randomInt(5) !== 0,
      highWaterMark: objectMode ? randomInt(4) + 1 : randomInt(18) + 1,
      objectMode
    };
    const chunks = Array.from({ length: randomInt(7) + 1 }, (_, chunkIndex) => (
      objectMode
        ? { chunkIndex, seed: randomInt(10_000) }
        : randomInt(2) === 0
          ? Buffer.alloc(randomInt(12) + 1, randomInt(256))
          : `chunk-${index}-${chunkIndex}`
    ));
    const corked = randomInt(3) === 0;

    const expected = await observe(baseline, options, chunks, corked);
    const actual = await observe(candidate, options, chunks, corked);
    assert.deepEqual(actual, expected, `differential execution ${index}`);
  }

  console.log(`${executions} differential stream executions matched dev-null@0.1.1.`);
}

function observe(factory, options, chunks, corked) {
  return new Promise((resolve, reject) => {
    const sink = factory(options);
    const originalWrite = sink._write;
    const events = [];
    const writes = [];
    const returns = [];
    let complete = false;

    sink._write = function inspect(chunk, encoding, callback) {
      writes.push(normalizeChunk(chunk, encoding));
      originalWrite.call(this, chunk, encoding, callback);
    };
    sink.on('drain', () => events.push('drain'));
    sink.on('prefinish', () => events.push('prefinish'));
    sink.on('finish', () => events.push('finish'));
    sink.on('close', () => events.push('close'));
    sink.on('error', reject);

    if (corked) sink.cork();
    for (let index = 0; index < chunks.length; index += 1) {
      returns.push(sink.write(chunks[index], () => events.push(`callback:${index}`)));
    }
    if (corked) sink.uncork();
    sink.end(() => events.push('end-callback'));

    sink.on('close', finish);
    sink.on('finish', () => setImmediate(finish));

    function finish() {
      if (complete) return;
      if (options.emitClose !== false && !sink.closed) return;
      complete = true;
      resolve({
        destroyed: sink.destroyed,
        events,
        objectMode: sink.writableObjectMode,
        returns,
        highWaterMark: sink.writableHighWaterMark,
        writes
      });
    }
  });
}

function normalizeChunk(chunk, encoding) {
  if (Buffer.isBuffer(chunk)) return ['buffer', chunk.length, chunk.toString('hex'), encoding];
  if (typeof chunk === 'string') return ['string', chunk, encoding];
  return ['object', JSON.stringify(chunk), encoding];
}

function randomInt(maximum) {
  seed ^= seed << 13;
  seed ^= seed >>> 17;
  seed ^= seed << 5;
  return (seed >>> 0) % maximum;
}

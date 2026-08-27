'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');
const { once } = require('node:events');
const devNull = require('../');
const numbers = require('./fixtures/number-readable');

test('upstream: readable emits three numbers without a sink', async () => {
  const source = numbers({ to: 2 });
  const data = [];

  source.on('data', (chunk) => data.push(chunk));
  await once(source, 'end');

  assert.equal(data.length, 3);
});

test('upstream: piping to dev-null exposes no readable data', async () => {
  const source = numbers({ to: 2 });
  const sink = devNull();
  const data = [];

  sink.on('data', (chunk) => data.push(chunk));
  source.pipe(sink);
  await once(sink, 'finish');

  assert.equal(data.length, 0);
  assert.equal(sink.writableFinished, true);
});

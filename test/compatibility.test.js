'use strict';

const assert = require('node:assert/strict');
const { once } = require('node:events');
const { Readable, Writable, pipeline } = require('node:stream');
const { test } = require('node:test');
const devNull = require('../');

test('factory and constructor forms return the same writable class', () => {
  const factory = devNull();
  const constructed = new devNull();

  assert.equal(factory instanceof devNull, true);
  assert.equal(constructed instanceof devNull, true);
  assert.equal(factory instanceof Writable, true);
  assert.equal(Object.getPrototypeOf(factory), Object.getPrototypeOf(constructed));

  factory.destroy();
  constructed.destroy();
});

test('writable options are forwarded without changing their units', () => {
  const byteSink = devNull({ highWaterMark: 7, decodeStrings: false });
  const objectSink = devNull({ objectMode: true, highWaterMark: 3 });

  assert.equal(byteSink.writableHighWaterMark, 7);
  assert.equal(byteSink.writableObjectMode, false);
  assert.equal(objectSink.writableHighWaterMark, 3);
  assert.equal(objectSink.writableObjectMode, true);

  byteSink.destroy();
  objectSink.destroy();
});

test('write callbacks stay asynchronous and use the historical timer boundary', async () => {
  const nativeSetTimeout = global.setTimeout;
  let timerCalls = 0;
  let synchronous = true;

  global.setTimeout = function observedSetTimeout(callback, delay) {
    timerCalls += 1;
    return nativeSetTimeout(callback, delay);
  };

  try {
    const sink = devNull();
    sink.end('discarded', () => {
      assert.equal(synchronous, false);
    });
    synchronous = false;
    await once(sink, 'close');
    assert.equal(timerCalls >= 1, true);
  } finally {
    global.setTimeout = nativeSetTimeout;
  }
});

test('object mode accepts arbitrary values and preserves backpressure', async () => {
  const sink = devNull({ objectMode: true, highWaterMark: 1 });
  const drained = once(sink, 'drain');

  assert.equal(sink.write({ id: 1 }), false);
  await drained;
  assert.equal(sink.write(['second']), false);

  const finished = once(sink, 'finish');
  sink.end(null);
  await finished;
  assert.equal(sink.writableFinished, true);
});

test('decodeStrings false reaches the writable implementation unchanged', async () => {
  const sink = devNull({ decodeStrings: false });
  const originalWrite = sink._write;
  const observed = [];

  sink._write = function inspect(chunk, encoding, callback) {
    observed.push([typeof chunk, chunk, encoding]);
    originalWrite.call(this, chunk, encoding, callback);
  };

  const finished = once(sink, 'finish');
  sink.end('plain text', 'utf8');
  await finished;

  assert.deepEqual(observed, [['string', 'plain text', 'utf8']]);
});

test('default byte mode rejects arbitrary objects', () => {
  const sink = devNull();
  assert.throws(() => sink.write({ id: 1 }), {
    code: 'ERR_INVALID_ARG_TYPE'
  });
  sink.destroy();
});

test('destroy preserves error identity and closes the stream', async () => {
  const sink = devNull();
  const expected = new Error('stop');
  const errorEvent = once(sink, 'error');
  const closeEvent = new Promise((resolve) => sink.once('close', resolve));

  sink.destroy(expected);

  const [actual] = await errorEvent;
  await closeEvent;
  assert.equal(actual, expected);
  assert.equal(sink.destroyed, true);
});

test('pipeline forwards source errors instead of swallowing them', async () => {
  const expected = new Error('source failed');
  const source = new Readable({
    read() {
      this.destroy(expected);
    }
  });

  const actual = await new Promise((resolve) => {
    pipeline(source, devNull(), resolve);
  });

  assert.equal(actual, expected);
});

test('AbortSignal behavior remains owned by Writable', async () => {
  const controller = new AbortController();
  const sink = devNull({ signal: controller.signal });
  const errorEvent = once(sink, 'error');

  controller.abort();

  const [error] = await errorEvent;
  assert.equal(error.name, 'AbortError');
  assert.equal(sink.destroyed, true);
});

test('emitClose false is forwarded', async () => {
  const sink = devNull({ emitClose: false });
  let closed = false;
  sink.on('close', () => {
    closed = true;
  });

  const finished = once(sink, 'finish');
  sink.end('done');
  await finished;
  await new Promise((resolve) => setImmediate(resolve));

  assert.equal(closed, false);
});

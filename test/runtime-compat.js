'use strict';

var assert = require('assert');
var stream = require('stream');
var devNull = require('../');

var sink = devNull({ objectMode: true, highWaterMark: 1 });
var callbackWasAsync = false;

assert(sink instanceof stream.Writable);
assert(sink instanceof devNull);
assert.strictEqual(sink.writableObjectMode, true);
assert.strictEqual(sink.writableHighWaterMark, 1);
assert.strictEqual(sink.write({ id: 1 }, function () {
  assert.strictEqual(callbackWasAsync, true);
}), false);

callbackWasAsync = true;
sink.end({ id: 2 });
sink.on('finish', function () {
  assert.strictEqual(sink.writableFinished, true);
  console.log('Runtime compatibility checks passed on ' + process.version + '.');
});

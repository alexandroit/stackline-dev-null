'use strict';

var util = require('util');
var Writable = require('stream').Writable;

module.exports = DevNull;

util.inherits(DevNull, Writable);

function DevNull(options) {
  if (!(this instanceof DevNull)) return new DevNull(options);

  Writable.call(this, options || {});
}

DevNull.prototype._write = function _write(_chunk, _encoding, callback) {
  // Preserve dev-null@0.1.1's observable asynchronous timer boundary.
  setTimeout(callback, 0);
};

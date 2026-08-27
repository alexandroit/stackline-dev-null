'use strict';

const { Readable } = require('stream');
const devNull = require('@stackline/dev-null');

Readable.from(['one', 'two', 'three'])
  .pipe(devNull())
  .on('finish', () => console.log('All chunks discarded.'));

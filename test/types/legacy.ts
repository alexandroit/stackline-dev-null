import devNull = require('../..');

const byteSink: devNull.DevNullStream = devNull({ highWaterMark: 8 });
const objectSink: devNull.DevNullStream = new devNull({ objectMode: true });

byteSink.end('bytes');
objectSink.end({ id: 1 });

// @ts-expect-error Unknown writable option.
devNull({ madeUpOption: true });

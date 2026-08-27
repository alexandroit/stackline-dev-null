import devNull, {
  DevNull,
  devNull as namedDevNull,
  type DevNullFactory,
  type DevNullStream
} from '../../index.mjs';

const factory: DevNullFactory = devNull;
const sink: DevNullStream = factory({ objectMode: true });
const constructed: DevNullStream = new DevNull({ highWaterMark: 4 });

if (namedDevNull !== devNull) throw new Error('named export mismatch');
sink.end({ id: 1 });
constructed.end('done');

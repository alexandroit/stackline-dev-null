import { Writable, WritableOptions } from 'stream';

declare const devNull: devNull.DevNullFactory;

declare namespace devNull {
  interface DevNullStream extends Writable {}

  interface DevNullFactory {
    (options?: WritableOptions): DevNullStream;
    new (options?: WritableOptions): DevNullStream;
  }
}

export = devNull;

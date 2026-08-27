import { Writable, WritableOptions } from 'stream';

export interface DevNullStream extends Writable {}

export interface DevNullFactory {
  (options?: WritableOptions): DevNullStream;
  new (options?: WritableOptions): DevNullStream;
}

export declare const DevNull: DevNullFactory;
export declare const devNull: DevNullFactory;

declare const defaultExport: DevNullFactory;
export default defaultExport;

# Compatibility Contract

Baseline: `dev-null@0.1.1`

## Public API

```js
const devNull = require('dev-null');
const sink = devNull(options);
```

The CommonJS export is one function that is callable with or without `new` and
returns an instance of Node's `Writable` stream.

## Preserved stream behavior

- Every option is forwarded to `Writable`, including `objectMode`,
  `highWaterMark`, `decodeStrings`, `defaultEncoding`, `emitClose`,
  `autoDestroy`, and supported runtime-specific options.
- Every accepted chunk is discarded without mutation or conversion by this
  package.
- Completion of each `_write` remains asynchronous through a zero-delay timer.
- `write()` return values and `drain` behavior remain controlled by the
  configured high-water mark.
- `prefinish`, `finish`, `close`, `error`, destroy, pipeline, and abort behavior
  remain controlled by Node's `Writable` implementation.
- Byte mode rejects invalid object and null chunks; callers use
  `objectMode: true` for arbitrary values.

The historical source named its local scheduler `setImmediate`, but JavaScript
hoisting caused the fallback timer to be selected. This package preserves the
observable timer behavior explicitly instead of changing event ordering.

## Additive distribution surface

- Native ESM provides default, `devNull`, and `DevNull` exports referring to the
  same factory/constructor.
- First-party declarations support callable and constructable CommonJS imports
  and modern ESM imports.
- Historical deep imports `dev-null/index` and `dev-null/index.js` remain
  available when the package is installed through an npm alias.

## Runtime target

Node.js 12 and newer. Development tooling may require a newer Node.js release
and is not part of the runtime contract.

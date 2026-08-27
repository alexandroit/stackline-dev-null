# @stackline/dev-null

> A maintained, zero-dependency writable sink with the established `dev-null@0.1.1` behavior.

[![npm version](https://img.shields.io/npm/v/@stackline/dev-null.svg?style=flat-square)](https://www.npmjs.com/package/@stackline/dev-null)
[![npm downloads](https://img.shields.io/npm/dm/@stackline/dev-null.svg?style=flat-square)](https://www.npmjs.com/package/@stackline/dev-null)
[![CI](https://img.shields.io/github/actions/workflow/status/alexandroit/stackline-dev-null/ci.yml?branch=main&style=flat-square&label=CI)](https://github.com/alexandroit/stackline-dev-null/actions/workflows/ci.yml)
[![license](https://img.shields.io/npm/l/@stackline/dev-null.svg?style=flat-square)](LICENSE)

**[Docs and stream configurator](https://alexandro.net/docs/vanilla/dev-null/)** |
**[npm](https://www.npmjs.com/package/@stackline/dev-null)** |
**[GitHub](https://github.com/alexandroit/stackline-dev-null)** |
**[Migration](MIGRATION.md)** |
**[Security](SECURITY.md)** |
**[Changelog](CHANGELOG.md)**

**Current package version:** `1.0.0`

This package is an independent, maintained continuation of
[`dev-null`](https://github.com/thlorenz/dev-null). It preserves the callable
Node.js `Writable` sink, its asynchronous write boundary, and option forwarding
while adding native ESM entry points, first-party TypeScript declarations, and
reproducible release checks.

## Install

```bash
npm install @stackline/dev-null
```

Preserve an existing `require('dev-null')` or `import devNull from 'dev-null'`
without changing source code:

```bash
npm install dev-null@npm:@stackline/dev-null
```

## Usage

### CommonJS

```js
const devNull = require('@stackline/dev-null');

source.pipe(devNull());
```

### ESM

```js
import devNull from '@stackline/dev-null';
import { pipeline } from 'node:stream/promises';

await pipeline(source, devNull());
```

### Object mode and backpressure

```js
import devNull from '@stackline/dev-null';

const sink = devNull({
  objectMode: true,
  highWaterMark: 16
});

sink.write({ id: 1 });
sink.end({ id: 2 });
```

All options are passed directly to Node's `Writable` constructor. Set
`objectMode: true` before writing arbitrary JavaScript values.

## API

### `devNull(options?)`

Returns a Node.js `Writable` that accepts and discards every chunk. Calling the
export with or without `new` is supported. `_write` completes asynchronously on
the same timer boundary observed in `dev-null@0.1.1`, so standard backpressure,
`drain`, `finish`, `close`, destroy, and error behavior remains owned by Node's
stream implementation.

The package does not swallow upstream pipeline errors and does not convert
invalid chunks. Byte mode rejects objects exactly as a normal `Writable` does.

## When to use the native primitive

New code that does not need package compatibility can construct a sink directly:

```js
import { Writable } from 'node:stream';

const sink = new Writable({
  write(_chunk, _encoding, callback) {
    callback();
  }
});
```

Use this package when a dependency already expects `dev-null`, when a shared
factory keeps stream configuration consistent, or when first-party types and a
tested Node-version contract are useful.

## Compatibility

- CommonJS and native ESM
- First-party TypeScript declarations, including TypeScript 3.9 consumers
- Node.js 12 and newer
- Byte and object mode
- Zero runtime dependencies

See [COMPATIBILITY_CONTRACT.md](COMPATIBILITY_CONTRACT.md) and
[MIGRATION.md](MIGRATION.md) for the exact boundary and alias migration.

## Security

Report vulnerabilities privately as described in [SECURITY.md](SECURITY.md).
Do not disclose an unpatched vulnerability in a public issue.

## Provenance

The upstream source and authorship history are documented in
[UPSTREAM_AUDIT.md](UPSTREAM_AUDIT.md) and [NOTICE](NOTICE). The Stackline fork
is not affiliated with or endorsed by the original author.

## License

MIT. The original copyright and permission notice is preserved in
[LICENSE](LICENSE).

# @stackline/dev-null

> Zero-dependency Node.js writable sink with exact dev-null compatibility and first-party types.

[![npm version](https://img.shields.io/npm/v/@stackline/dev-null.svg?style=flat-square)](https://www.npmjs.com/package/@stackline/dev-null)
[![license](https://img.shields.io/npm/l/@stackline/dev-null.svg?style=flat-square)](https://github.com/alexandroit/stackline-dev-null)
[![GitHub repository](https://img.shields.io/badge/GitHub-alexandroit%2Fstackline-dev-null-181717?style=flat-square&logo=github)](https://github.com/alexandroit/stackline-dev-null)
[![Docs](https://img.shields.io/badge/docs-alexandro.net-0f766e?style=flat-square)](https://alexandro.net/docs/vanilla/dev-null/)
[![Reddit community](https://img.shields.io/badge/community-r%2FStackline-ff4500?style=flat-square&logo=reddit&logoColor=white)](https://www.reddit.com/r/Stackline/)

**[Documentation](https://alexandro.net/docs/vanilla/dev-null/)** | **[npm](https://www.npmjs.com/package/@stackline/dev-null)** | **[Issues](https://github.com/alexandroit/stackline-dev-null/issues)** | **[Repository](https://github.com/alexandroit/stackline-dev-null)**

**Current package version:** `1.0.2`

---

## Why this package?

> A maintained, zero-dependency writable sink with the established `dev-null@0.1.1` behavior.




This package is an independent, maintained continuation of
[`dev-null`](https://github.com/thlorenz/dev-null). It preserves the callable
Node.js `Writable` sink, its asynchronous write boundary, and option forwarding
while adding native ESM entry points, first-party TypeScript declarations, and
reproducible release checks.

<a id="provenance"></a>

### Provenance

The upstream source and authorship history are documented in
[UPSTREAM_AUDIT.md](https://github.com/alexandroit/stackline-dev-null/blob/main/UPSTREAM_AUDIT.md) and [NOTICE](https://github.com/alexandroit/stackline-dev-null/blob/main/NOTICE). The Stackline fork
is not affiliated with or endorsed by the original author.

## Compatibility

| Item | Value |
| --- | --- |
| Package | `@stackline/dev-null@1.0.2` |
| Node.js runtime | `>=12` |
| CommonJS / primary entry | `./index.js` |
| ES module entry | `./index.mjs` |
| Type declarations | `./index.d.ts` |

- CommonJS and native ESM
- First-party TypeScript declarations, including TypeScript 3.9 consumers
- Node.js 12 and newer
- Byte and object mode
- Zero runtime dependencies

See [COMPATIBILITY_CONTRACT.md](https://github.com/alexandroit/stackline-dev-null/blob/main/COMPATIBILITY_CONTRACT.md) and
[MIGRATION.md](https://github.com/alexandroit/stackline-dev-null/blob/main/MIGRATION.md) for the exact boundary and alias migration.

## Installation

<a id="install"></a>

### Install

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

## Features and Integrations

<a id="when-to-use-the-native-primitive"></a>

### When to use the native primitive

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

## Security

Report vulnerabilities privately as described in [SECURITY.md](https://github.com/alexandroit/stackline-dev-null/blob/main/SECURITY.md).
Do not disclose an unpatched vulnerability in a public issue.

## API Surface

<a id="api"></a>

### API

#### `devNull(options?)`

Returns a Node.js `Writable` that accepts and discards every chunk. Calling the
export with or without `new` is supported. `_write` completes asynchronously on
the same timer boundary observed in `dev-null@0.1.1`, so standard backpressure,
`drain`, `finish`, `close`, destroy, and error behavior remains owned by Node's
stream implementation.

The package does not swallow upstream pipeline errors and does not convert
invalid chunks. Byte mode rejects objects exactly as a normal `Writable` does.

## Local Development

```sh
git clone https://github.com/alexandroit/stackline-dev-null.git
cd stackline-dev-null
npm ci
npm run verify
```

Release tooling uses Node.js 24.20.0 and npm 11.19.0. The consumer runtime contract remains the one documented above.

## Consumer Smoke Test

Run the repository's existing consumer/package check after installing development dependencies:

```sh
npm run test:smoke
```

## Release Checklist

Run `npm run verify` and inspect the package contents before release. Publish a new version through the [GitHub Actions publishing workflow](https://github.com/alexandroit/stackline-dev-null/actions/workflows/publish.yml), using the SHA-512 digest of the reviewed tarball. Verify the exact published version, tarball integrity, and npm provenance after the run.

## License

MIT. The original copyright and permission notice is preserved in
[LICENSE](https://github.com/alexandroit/stackline-dev-null/blob/main/LICENSE).

## Credits and original authors

- Original project: [dev-null](https://github.com/thlorenz/dev-null).
- Stackline Maintainers.
- Thorsten Lorenz.
- Copyright 2013 Thorsten Lorenz.
- Stackline maintenance: [Alexandro Paixao Marques](https://www.linkedin.com/in/aleinfo/) and [Stackline contributors](https://github.com/alexandroit).

Original copyright, license notices and contributor acknowledgements remain part of this distribution. Stackline maintenance does not replace authorship of the original work.

## Community and Links

- [Stackline website](https://alexandro.net/)
- [GitHub projects](https://github.com/alexandroit)
- [npm packages](https://www.npmjs.com/~alex360qc)
- [Reddit community — r/Stackline](https://www.reddit.com/r/Stackline/)
- [Maintainer LinkedIn](https://www.linkedin.com/in/aleinfo/)

Use this repository's issue tracker for reproducible bugs and feature requests. Join r/Stackline for examples, usage questions and release discussions.

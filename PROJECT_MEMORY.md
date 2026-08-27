---
schema: stackline-project-memory-v1
package: dev-null
upstream: https://github.com/thlorenz/dev-null
stackline_package: "@stackline/dev-null"
state: PUBLISHED
registry_scope: verdaccio-and-public-npm
public_npm: true
public_github: true
docs_production: true
created: 2026-08-26
last_updated: 2026-08-27
---

# Project Memory

## Objective

Preserve the complete callable `dev-null@0.1.1` Node `Writable` contract while
adding first-party module/types support and current, reproducible release
engineering without introducing runtime dependencies.

## Decision

GO. Modern `Writable` construction is recommended for new code, but it does not
replace the historical key across an active install base. Official npm measured
1,334,023 complete-week downloads and 40,486,996 annual downloads. Current
Axios, Uptime Kuma, Instana, Bailo, and Canvas source trees still reference the
package.

## Compatibility boundary

- factory callable with or without `new`;
- `Writable` instance identity and option forwarding;
- byte and explicit object mode;
- asynchronous zero-delay timer completion;
- standard backpressure, lifecycle, destroy, abort, and pipeline errors;
- historical `index` and `index.js` deep imports through package exports;
- additive ESM and TypeScript surfaces only.

## Baseline

- upstream: three assertions passed on current Node and Node 0.10.48;
- runtime dependency audit: zero findings;
- obsolete development tree: six high and one critical finding;
- no runtime dependencies, no first-party or DefinitelyTyped declarations;
- one open issue and no open pull requests;
- npm latest and default-branch implementation: 2013-09-10.

## Production release

- package: `@stackline/dev-null@1.0.0`;
- npm: https://www.npmjs.com/package/@stackline/dev-null;
- Verdaccio: published from the exact same tarball as npm;
- source: https://github.com/alexandroit/stackline-dev-null;
- release: https://github.com/alexandroit/stackline-dev-null/releases/tag/stackline-v1.0.0;
- documentation: https://alexandro.net/docs/vanilla/dev-null/;
- source and tag commit: `5a2e2fd9de0186e822c42d69da97fa1271d61c80`;
- tarball SHA-1: `b9f2fa64bf42db649003ad1695e37ca5c474fb7f`;
- tarball SHA-256: `ce1199e9d90428b4c3a3e600c7ba5c8aafe08c173a0d2502a1d0a699683ebf40`;
- npm integrity: `sha512-1RK3+0Q5eHMKiTG2dqG3yWs8/pZVpzrMmS3zaibA7UxrMxSDTDvL3jVY0K96x2ejShf7Gwz5FtzT0RljdYbTgg==`;
- packed size: 5,262 bytes; unpacked size: 13,546 bytes; 14 files;
- CI: https://github.com/alexandroit/stackline-dev-null/actions/runs/33037410660;
- CodeQL: https://github.com/alexandroit/stackline-dev-null/actions/runs/33037410692.

## Local verification

- two adapted upstream tests and twelve combined coverage tests passed;
- ten targeted stream compatibility tests passed;
- 300 deterministic differential executions matched `dev-null@0.1.1`;
- core coverage reached 100% statements, branches, functions, and lines;
- CommonJS, ESM, deep imports, and packed scoped install passed;
- TypeScript 3.9.10 and 7.0.2 passed;
- `publint` and AreTheTypesWrong reported no findings for all exports;
- production dependency audit reported zero vulnerabilities;
- 173 registry signatures and 24 attestations were verified;
- desktop and mobile documentation screenshots rendered without overlap or
  blank content, and the browser-generated program was verified in the DOM.

## Chronological log

- 2026-08-26: npm metadata, downloads, repository history, issues, pull
  requests, package artifact, alternatives, license, and active consumers were
  audited.
- 2026-08-26: actual timer scheduling, object mode, backpressure, finish, and
  destroy error behavior were reproduced against the unmodified upstream.
- 2026-08-26: GO approved before implementation.
- 2026-08-27: explicit historical timer behavior, ESM, TypeScript declarations,
  package exports, documentation, and release automation were implemented.
- 2026-08-27: all local and remote release gates passed; one immutable artifact
  was published to Verdaccio and official npm; GitHub source, tag, SBOM, release
  assets, public documentation, catalog, and aggregate sitemaps were verified.

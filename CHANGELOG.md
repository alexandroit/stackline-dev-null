# Changelog

## [1.0.1] - 2026-09-28

- Organize package documentation, preserve API and migration examples, and add Stackline community links.
- Improve package discovery keywords with precise domain terms and `stackline`.
- Pin GitHub Actions release tooling and require an explicit missing-version response before publication.


All notable changes to `@stackline/dev-null` are documented here.

## 1.0.0

- Preserve the callable `dev-null@0.1.1` writable sink and asynchronous timer boundary.
- Preserve all Node `Writable` options, backpressure, lifecycle events, and errors.
- Add native ESM with default, `devNull`, and `DevNull` exports.
- Add first-party TypeScript declarations compatible with TypeScript 3.9 and newer.
- Add differential, object-mode, backpressure, abort, error, packed-install, and runtime-matrix tests.
- Add an explicit package allowlist, CI, CodeQL, SBOM and checksum release gates, security policy, provenance audit, and public documentation.

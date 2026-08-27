# Issue Triage

## Bug report checklist

- Include the package version and Node.js version.
- Provide a minimal stream pipeline or sequence of `write()` calls.
- Include the `Writable` options used, especially `objectMode` and
  `highWaterMark`.
- State the observed event order and any emitted error.
- Compare with `dev-null@0.1.1` when reporting a compatibility regression.

## Scope

Compatibility, correctness, types, package distribution, documentation, and
supported-runtime failures are in scope. Transforming chunks, collecting data,
cross-runtime browser streams, and general stream orchestration belong in other
packages.

# Registry Handoff

## Current state

- upstream: `dev-null@0.1.1`
- Stackline target: `@stackline/dev-null@1.0.0`
- decision: GO
- state: implementation verification in progress
- registry scope: Verdaccio and official npm
- runtime dependencies: zero

## Required release gates

- upstream, regression, and differential suites
- Node.js 12 through 24 runtime matrix
- CommonJS, ESM, and TypeScript 3.9/current checks
- object mode, backpressure, abort, destroy, and pipeline errors
- packed direct and legacy-name alias installs
- package quality, production audit, signatures, CI, and CodeQL
- immutable tarball hash, SBOM, GitHub release, and production docs

Artifact hashes and public URLs are recorded only after publication.

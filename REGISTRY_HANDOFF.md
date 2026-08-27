# Registry Handoff

## Current state

- upstream: `dev-null@0.1.1`
- Stackline release: `@stackline/dev-null@1.0.0`
- decision: GO
- state: published and verified
- registry scope: Verdaccio and official npm
- runtime dependencies: zero

## Registry result

- npm: https://www.npmjs.com/package/@stackline/dev-null
- Verdaccio: `@stackline/dev-null@1.0.0`
- GitHub: https://github.com/alexandroit/stackline-dev-null
- release: https://github.com/alexandroit/stackline-dev-null/releases/tag/stackline-v1.0.0
- docs: https://alexandro.net/docs/vanilla/dev-null/
- source/tag commit: `5a2e2fd9de0186e822c42d69da97fa1271d61c80`
- tarball SHA-1: `b9f2fa64bf42db649003ad1695e37ca5c474fb7f`
- tarball SHA-256: `ce1199e9d90428b4c3a3e600c7ba5c8aafe08c173a0d2502a1d0a699683ebf40`
- npm integrity: `sha512-1RK3+0Q5eHMKiTG2dqG3yWs8/pZVpzrMmS3zaibA7UxrMxSDTDvL3jVY0K96x2ejShf7Gwz5FtzT0RljdYbTgg==`

## Verified gates

- adapted upstream, targeted, differential, lifecycle, and error tests;
- Node.js 12 through 24 runtime matrix;
- CommonJS, ESM, historical deep imports, TypeScript 3.9 and current;
- packed direct install and legacy-name npm alias install;
- 100% core coverage, `publint`, AreTheTypesWrong, production audit, registry
  signatures, CI, and CodeQL;
- identical release tarball, CycloneDX SBOM, checksums, GitHub release, public
  documentation, catalog entry, and six URLs in each aggregate sitemap.

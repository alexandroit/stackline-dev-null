# Dependency Decisions

## Runtime

`@stackline/dev-null` has no runtime dependencies. The only runtime primitive is
Node's built-in `Writable` stream.

This avoids an unpublish or compromise event in another npm package affecting
the production dependency graph.

## Development

Development dependencies are pinned exactly in `package.json` and locked in
`package-lock.json`. They provide linting, coverage, package-shape analysis,
TypeScript compatibility checks, and a frozen `dev-null@0.1.1` differential
oracle. They are not installed by consumers.

CI actions are pinned to complete commit SHAs. Release artifacts include a
CycloneDX SBOM and SHA-256/SHA-512 checksums.

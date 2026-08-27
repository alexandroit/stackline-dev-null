# Contributing

Contributions are welcome when they preserve the compatibility contract and
the package's zero-runtime-dependency scope.

## Development

```bash
npm ci
npm run verify
```

Changes to `index.js`, package exports, or declarations require regression
coverage and differential evidence when behavior could diverge from
`dev-null@0.1.1`.

## Scope

This package discards Node stream chunks. Transforming, collecting, parsing,
buffering outside normal `Writable` backpressure, browser stream adapters, and
pipeline orchestration belong elsewhere.

By contributing, you agree that your contribution is licensed under the MIT
License in [LICENSE](LICENSE).

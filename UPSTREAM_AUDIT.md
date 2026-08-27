# Upstream Audit

Audit date: 2026-08-26

## Identity and maintenance

| Field | Evidence |
| --- | --- |
| npm package | `dev-null@0.1.1` |
| Repository | https://github.com/thlorenz/dev-null |
| License | MIT |
| npm latest publish | 2013-09-10 |
| Last upstream commit | 2013-09-10 |
| Repository | Public, unarchived, default branch `master` |
| Current open work | One issue; no open pull requests |

The repository `pushed_at` timestamp reflects a closed pull-request branch from
2017; the default branch's latest commit remains from 2013.

## Current distribution and usage

Official npm observations:

- 1,334,023 downloads for the complete week 2026-08-19 through 2026-08-25.
- 5,186,790 downloads for the 30 days ending 2026-08-25.
- 40,486,996 downloads for the year ending 2026-08-25.

Current repositories inspected include Axios, Uptime Kuma, Instana's Node.js
agent, GCHQ Bailo, and Instructure Canvas RCE API. Axios imports `dev-null` in
its current HTTP adapter tests. Canvas uses it as the request-log sink in test
environments. Bailo carries a local ambient declaration because neither the
package nor DefinitelyTyped publishes types.

## Issues and pull requests

- Issue #3 reports object writes failing in default byte mode. Passing
  `{ objectMode: true }` already provides the standard Node behavior; enabling
  object mode globally would be a breaking change. Documentation and regression
  coverage now make the correct contract explicit.
- Closed PR #2 correctly observes that the local `setImmediate` declaration is
  hoisted and therefore always selects the timer fallback. Upstream rejected
  the change based on an incorrect REPL comparison. Because timer versus
  immediate ordering is observable, Stackline records and preserves the actual
  published behavior rather than silently changing it.

## Baseline verification

- The complete upstream suite passed three assertions on the current runtime
  and on Node.js 0.10.48 through its historical `nave` task.
- The baseline has zero runtime dependencies and `npm audit --omit=dev`
  returned zero findings.
- Installing its 2013 development tree reported six high and one critical
  finding from obsolete tooling.
- The npm artifact contains tests, fixtures, examples, Travis metadata, and no
  declarations or ESM entry.

## Alternatives

| Alternative | Assessment |
| --- | --- |
| `new Writable({ write() {} })` | Best choice for new code that needs no dependency-compatible package |
| `noop-stream` | Broader API, ESM-only distribution, and different package contract |
| OS-specific `/dev/null` paths | Not a JavaScript stream factory and not portable across platforms |

Modern Node primitives reduce the need for a new abstraction, but they do not
replace an existing package key in active dependency graphs. The large and
growing install base, current high-profile consumers, missing declarations,
and dormant release infrastructure establish a real compatibility-maintenance
need.

## Decision

GO: preserve the tiny implementation and its observable stream semantics, add
first-party module/type surfaces and modern release evidence, and explicitly
recommend the native primitive for greenfield code.

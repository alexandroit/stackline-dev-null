# Adoption Targets

The safest adoption path is an npm alias because it preserves source imports:

```json
{
  "devDependencies": {
    "dev-null": "npm:@stackline/dev-null@^1.0.0"
  }
}
```

Verified public usage patterns include:

| Consumer | Observed contract |
| --- | --- |
| Axios | ESM default import in HTTP adapter tests |
| Uptime Kuma | Direct dependency under the historical key |
| Instana Node.js agent | Exact-version development dependency |
| GCHQ Bailo | Runtime dependency plus a local missing-type shim |
| Canvas RCE API | ESM default import as a Morgan logging sink |

Outreach must be specific, evidence-based, and rate-limited. Do not open bulk
issues or claim a security vulnerability where none has been demonstrated.

# Migration

## Direct scoped import

Install the maintained package:

```bash
npm install @stackline/dev-null
```

Then update the package specifier:

```js
const devNull = require('@stackline/dev-null');
```

```js
import devNull from '@stackline/dev-null';
```

## No source changes

Use an npm alias when application or dependency source must keep the historical
package name:

```bash
npm install dev-null@npm:@stackline/dev-null
```

Existing code remains unchanged:

```js
const devNull = require('dev-null');
source.pipe(devNull());
```

The alias belongs in `dependencies` or `devDependencies`, matching the old
package's role in the consumer. Commit the resulting lockfile.

## Behavioral boundary

No option rename or stream wrapper is required. All options are forwarded to
Node's `Writable` constructor. Code writing objects must continue to request
`objectMode: true`; silently enabling it would change validation and
backpressure units.

See [COMPATIBILITY_CONTRACT.md](COMPATIBILITY_CONTRACT.md) for the complete
contract.

import assert from 'node:assert/strict'
import { once } from 'node:events'
import { Writable } from 'node:stream'
import devNull, { DevNull, devNull as namedDevNull } from '../index.mjs'

assert.equal(devNull, DevNull)
assert.equal(devNull, namedDevNull)

const sink = devNull({ objectMode: true })
assert.equal(sink instanceof Writable, true)
assert.equal(sink.write({ id: 1 }), true)
sink.end({ id: 2 })
await once(sink, 'finish')

console.log('Native ESM checks passed.')

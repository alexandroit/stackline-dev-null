import { Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import devNull from '@stackline/dev-null'

await pipeline(
  Readable.from([{ id: 1 }, { id: 2 }], { objectMode: true }),
  devNull({ objectMode: true })
)

console.log('All objects discarded.')

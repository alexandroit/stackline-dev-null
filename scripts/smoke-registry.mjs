import assert from 'node:assert/strict'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

const registry = process.env.STACKLINE_REGISTRY || 'http://127.0.0.1:4873'
const version = process.env.STACKLINE_VERSION || '1.0.0'
const temporary = await mkdtemp(path.join(os.tmpdir(), 'stackline-dev-null-registry-'))

try {
  await writeFile(path.join(temporary, 'package.json'), JSON.stringify({
    private: true,
    dependencies: {
      '@stackline/dev-null': version,
      'dev-null': `npm:@stackline/dev-null@${version}`
    }
  }))

  const installed = spawnSync('npm', [
    'install',
    '--ignore-scripts',
    '--no-audit',
    '--no-fund',
    '--registry',
    registry
  ], { cwd: temporary, encoding: 'utf8' })
  assert.equal(installed.status, 0, installed.stderr)

  const checked = spawnSync(process.execPath, ['-e', [
    "const direct = require('@stackline/dev-null');",
    "const alias = require('dev-null');",
    "const a = direct({ objectMode: true });",
    "const b = alias({ objectMode: true });",
    "if (a.writableHighWaterMark !== b.writableHighWaterMark) process.exit(1);",
    "a.end({ id: 1 }); b.end({ id: 2 });"
  ].join('')], { cwd: temporary, encoding: 'utf8' })
  assert.equal(checked.status, 0, checked.stderr)
} finally {
  await rm(temporary, { force: true, recursive: true })
}

console.log(`Registry direct and legacy-alias checks passed against ${registry}.`)

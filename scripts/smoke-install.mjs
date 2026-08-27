import assert from 'node:assert/strict'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

const root = path.resolve(new URL('..', import.meta.url).pathname)
const temporary = await mkdtemp(path.join(os.tmpdir(), 'stackline-dev-null-'))
let tarball

try {
  const packed = spawnSync('npm', ['pack', '--json', '--ignore-scripts'], {
    cwd: root,
    encoding: 'utf8'
  })
  assert.equal(packed.status, 0, packed.stderr)
  const packResult = JSON.parse(packed.stdout)[0]
  tarball = path.join(root, packResult.filename)

  const paths = packResult.files.map((file) => file.path)
  assert.equal(paths.some((file) => file.startsWith('test/')), false)
  assert.equal(paths.some((file) => file.startsWith('scripts/')), false)
  assert.equal(paths.includes('LICENSE'), true)
  assert.equal(paths.includes('NOTICE'), true)
  assert.equal(paths.includes('index.d.ts'), true)

  await writeFile(path.join(temporary, 'package.json'), JSON.stringify({
    private: true,
    type: 'module',
    dependencies: {
      '@stackline/dev-null': `file:${tarball}`
    },
    devDependencies: {
      '@types/node': '14.18.63'
    }
  }))

  const installed = spawnSync('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund'], {
    cwd: temporary,
    encoding: 'utf8'
  })
  assert.equal(installed.status, 0, installed.stderr)

  const commonjs = spawnSync(process.execPath, ['--input-type=commonjs', '-e', [
    "const direct = require('@stackline/dev-null');",
    "const deep = require('@stackline/dev-null/index.js');",
    "if (!(direct() instanceof require('stream').Writable)) process.exit(1);",
    "if (typeof deep !== 'function') process.exit(1);"
  ].join('')], { cwd: temporary, encoding: 'utf8' })
  assert.equal(commonjs.status, 0, commonjs.stderr)

  const esm = spawnSync(process.execPath, ['--input-type=module', '-e', [
    "import direct, { DevNull, devNull } from '@stackline/dev-null';",
    "if (direct !== DevNull || direct !== devNull) process.exit(1);",
    "if (typeof direct !== 'function') process.exit(1);"
  ].join('')], { cwd: temporary, encoding: 'utf8' })
  assert.equal(esm.status, 0, esm.stderr)

  await writeFile(path.join(temporary, 'consumer.mts'), [
    "import sink, { type DevNullStream } from '@stackline/dev-null'",
    'const output: DevNullStream = sink({ objectMode: true })',
    'output.end({ id: 1 })'
  ].join('\n'))
  await writeFile(path.join(temporary, 'tsconfig.json'), JSON.stringify({
    compilerOptions: {
      module: 'nodenext',
      moduleResolution: 'nodenext',
      noEmit: true,
      skipLibCheck: true,
      strict: true,
      target: 'es2022',
      types: ['node']
    },
    files: ['consumer.mts']
  }))

  const typeChecked = spawnSync(process.execPath, [
    path.join(root, 'node_modules', 'typescript', 'bin', 'tsc'),
    '-p',
    path.join(temporary, 'tsconfig.json')
  ], { cwd: temporary, encoding: 'utf8' })
  assert.equal(typeChecked.status, 0, typeChecked.stdout + typeChecked.stderr)

  const manifest = JSON.parse(await readFile(path.join(
    temporary,
    'node_modules',
    '@stackline',
    'dev-null',
    'package.json'
  ), 'utf8'))
  assert.equal(manifest.name, '@stackline/dev-null')
  assert.deepEqual(manifest.dependencies, undefined)
} finally {
  if (tarball) await rm(tarball, { force: true })
  await rm(temporary, { force: true, recursive: true })
}

console.log('Packed scoped-install and deep-import checks passed.')

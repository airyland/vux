const { existsSync } = require('fs-extra')
const { join } = require('path')
const execa = require('execa')

async function buildTypeDeclarations() {
  const tsConfig = join(process.cwd(), 'tsconfig.declaration.json');

  if (existsSync(tsConfig)) {
    await execa('tsc', ['-p', tsConfig]);
  }
}

buildTypeDeclarations()
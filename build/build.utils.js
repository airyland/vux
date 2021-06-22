/* eslint-disable */
const path = require('path')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const rollup = require('rollup')
const typescript = require('rollup-plugin-typescript2')
const glob = require('fast-glob')
const ora = require('ora')
const chalk = require('chalk')
const { normalizePath, PACKAGE_DEPENDENCIES, ROOT } = require('./common')

async function getPackagesSync () {
  return await glob(normalizePath(`${ROOT}/utils/**`))
}

function defaultOpts(filePath) {
  return {
    onwarn() { // 警告信息不要出现
      return
    },
    input: filePath,
    plugins: [
      nodeResolve(),
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: true,
            rootDir: ROOT,
            declarationDir: path.resolve(__dirname, '../es')
          },
          include: ["packages/utils/*"],
        },
        useTsconfigDeclarationDir: true,
        abortOnError: false,
      }),
    ],
    external(id) {
      return /^vue/.test(id)
        || /^@vue/.test(id)
        || PACKAGE_DEPENDENCIES.some(k => new RegExp('^' + k).test(id))
    }
  }
}

const run = async (name, filePath) => {
  const esm = {
    format: 'es',
    file: `es${name}`,
  };
  const cjs = {
    format: 'cjs',
    file: `lib${name}`,
    exports: 'auto',
  }

  const bundle = await rollup.rollup(defaultOpts(filePath));
  await Promise.all([bundle.write(esm), bundle.write(cjs)]);
}

const spinner = ora(`${chalk.blue('utils Building...')}`).start()
getPackagesSync().then(async(fileList) => {
  for(let i = 0; i < fileList.length; i++) {
    const filePath = fileList[i]
    const name = filePath.replace(normalizePath(ROOT), '').replace('.ts', '.js')
    await run(name, filePath)
  }
  spinner.succeed(`${chalk.green('utils Build done. Exit code ')}`)
}).catch(err => {
  spinner.fail(`${chalk.red(`utils Build fail, ${err}`)}`)
})


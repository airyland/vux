/* eslint-disable */
const path = require('path')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const vue = require('rollup-plugin-vue')
const rollup = require('rollup')
const typescript = require('rollup-plugin-typescript2')
const glob = require('fast-glob')
const { normalizePath, ROOT, PACKAGE_DEPENDENCIES, NO_VUX_PREFIX_FILE } = require('./common')
const ora = require('ora')
const chalk = require('chalk')

async function getPackagesSync () {
  const paths = await glob(normalizePath(`${ROOT}/**/package.json`));
  return paths
    .map(path => require(path))
}

async function build(name) {
  if (!name) return
  const inputOptions = {
    onwarn() { // 警告信息不要出现
      return
    },
    input: path.resolve(__dirname, `${ROOT}/${name.split('@vux/')[1]}/index.ts`),
    plugins: [
      nodeResolve(),
      vue({
        target: 'browser',
        css: false,
      }),
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: true,
            rootDir: ROOT,
            declarationDir: path.resolve(__dirname, '../es')
          },
          include: ["packages/**/*.ts", "packages/**/*.d.ts", "packages/**/*.vue", "./*.d.ts", "website/**/*.d.ts"],
          exclude: [
            'node_modules',
            '__tests__',
            'packages/utils/*'
          ],
        },
        useTsconfigDeclarationDir: true,
        abortOnError: false,
      })
    ],
    external(id) { // vue和依赖包里面存在的就不需要额外引入了
      return /^vue/.test(id)
        || /^@vux/.test(id)
        || PACKAGE_DEPENDENCIES.some(k => new RegExp('^' + k).test(id))
    },
  }
  const getOutFile = (prefix) => { // 获取输出路径
    const compName = name.split('@vux/')[1]
    return `${prefix}/${compName}/index.js`
  }
  const esm = {
    format: 'es',
    file: getOutFile('es'),
    name: `${name.split('@vux/')[1]}`,
    paths(id) {
      if (/^@vux/.test(id)) { // 说明是框架自带的工具函数，@vux替换成..(绝对路径换成相对路径)
        if (NO_VUX_PREFIX_FILE.test(id)) {
          return id.replace('@vux', '..')
        }
        return id.replace('@vux/', '../vux-')
      }
    },
  }

  const cjs = {
    format: 'cjs',
    file: getOutFile('lib'),
    exports: 'named',
    paths(id) {
      if (/^@vux/.test(id)) { // 说明是框架自带的工具函数，@vux替换成..(绝对路径换成相对路径)
        if (NO_VUX_PREFIX_FILE.test(id)) {
          return id.replace('@vux', '..')
        }
        return id.replace('@vux/', '../vux-')
      }
    },
  }

  const bundle = await rollup.rollup(inputOptions)
  await Promise.all([bundle.write(esm), bundle.write(cjs)])
}

const spinner = ora(`${chalk.blue('components Building...')}`).start()
getPackagesSync().then(async pkgs => {
  const inputs = pkgs
    .map(pkg => pkg.name)
    .filter(name =>
      name.includes('@vux')
    )
  for (let i = 0; i < inputs.length; i++) {
    await build(inputs[i])
    spinner.info(`${chalk.blue(`${inputs[i]} done`)}`)
  }
  spinner.succeed(`${chalk.green('components building done, exit')}`)
})

/**
 * 暂时废弃打包方式，未来会开启多线程进行打包组件，加快速度
 */

const cp = require('child_process')
const ora = require('ora')
const chalk = require('chalk')
const glob = require('fast-glob')
const path = require('path')
const { normalizePath, ROOT } = require('./common')
async function getPackagesSync () {
  const mds = await glob(normalizePath(`${ROOT}/**/package.json`));
  return mds
  .map(item => {
    return require(item)
  })
}
const spinner = ora(`${chalk.blue('Building...')}`).start()
let index = 0
const buildChild = async () => { 
  const getPkgs = await getPackagesSync()
  const pkgs = getPkgs.map(pkg => pkg.name).filter(name => name.includes('@vux'))
  const c1 = cp.spawn('node', ['../vux/build/build.component.js'])
  index++
  c1.stdout.on('data', function (data) {
    spinner.info(`${chalk.blue(data)}`)
  })

  c1.stderr.on('data', function (data) {
    spinner.warn(`${chalk.red(data)}`)
  })

  c1.on('close', function (code) {
    if (index > pkgs.length) {
      spinner.succeed(`${chalk.green('Build done. Exit code ' + code)}`)
      return
    }
    buildChild()
  })
}

buildChild().then(() => {
  // spinner.succeed(`${chalk.green('Build done. Exit code ')}`)
})

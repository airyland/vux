'use strict'
process.env.NODE_ENV = 'production'

/**
 * --locale='zh-CN'
 * --namespace='vux'
 * --components=Group,Cell
 */

var argv = require('yargs').argv
var namespace = argv.namespace || 'vux'

var isBuildAll = !argv.components
var buildComponents = argv.components ? argv.components.split(',') : []

let config = require('./webpack.prod.conf.js')
const vuxConfig = require('./vux-config')
vuxConfig.plugins.forEach(function (plugin) {
  if (plugin.name === 'i18n') {
    plugin.vuxStaticReplace = true
    plugin.vuxLocale = argv['locale'] || 'zh-CN'
  }
})

const webpack = require('webpack')
const mkdirp = require('mkdirp')
const fs = require('fs')
const touch = require('touch')
const path = require('path')

mkdirp.sync(path.resolve(__dirname, '../dist/plugins'))
mkdirp.sync(path.resolve(__dirname, '../dist/styles'))

let list = require(path.resolve(__dirname, '../src/datas/vux_component_list.json'))
const maps = require(path.resolve(__dirname, '../src/components/map.json'))

// 查找在maps里但不在list里的组件
let others = []
for (let i in maps) {
  let match = list.filter(function (one) {
    return _camelCase(one.name) === i
  })
  if (match.length === 0 && !/Plugin|Data|Directive|Filter|Item|NOTICE|Demo|Dev|Tool|String|Number|md5|base64|cookie/.test(i)) {
    others.push({
      name: toDash(i),
      importName: i,
      path: maps[i]
    })
  }
}

others.push({
  name: 'swiper-item',
  importName: 'SwiperItem',
  path: maps['SwiperItem']
})

var ExtractTextPlugin = require('extract-text-webpack-plugin')
var co = require('co')
var thunkify = require('thunkify')
var pkg = require(path.resolve(__dirname, '../package.json'))

var build = thunkify(function (config, name, cb) {
  let start = new Date().getTime()
  console.log(`start:${name}`)
  webpack(config, function (err, stats) {
    if (!config.entry.vux) {
      mkdirp.sync(path.resolve(config.output.path))
        // touch.sync(path.resolve(config.output.path, './index.min.css'))
    }
    var jsonStats = stats.toJson()
    var assets = jsonStats.assets[0]
    var size = assets.size / 1024
    size = size.toFixed(2) + 'k'
    console.log('size', size)
    console.log('time', (new Date().getTime() - start) / 1000 + 's')
    console.log('----------------')
    cb && cb(err)
  })
})

var utils = require('./utils')
config.devtool = false
config.plugins = config.plugins.slice(0, -2)
config.plugins.forEach((one, index) => {
  if (one.constructor.name === 'HtmlWebpackPlugin') {
    config.plugins.splice(index, 1)
  }
  if (one.constructor.name === 'ExtractTextPlugin') {
    config.plugins.splice(index, 1)
  }
})

config.output.assetsPublicPath = '/'

let isBuilding = false

co(function* () {
  if (!isBuildAll) {
    return
  }
  try {
    for (let n = 0; n < others.length; n++) {
      yield build(buildConfig(others[n]), others[n].name)
    }
  } catch (e) {}
})

co(function* () {
  if (!isBuildAll) {
    return
  }
  try {
    yield build(buildMainConfig(), 'vux')
  } catch (e) {
    console.log(e)
  }
})

co(function* () {
  if (!isBuildAll) {
    return
  }
  try {
    const pluginList = ['Confirm', 'Toast', 'Device', 'Alert', 'Loading', ' Wechat', 'Ajax']
    for (let j = 0; j < pluginList.length; j++) {
      yield build(buildPlugin(pluginList[j]), `Plugin ${pluginList[j]}`)
    }
  } catch (e) {
    console.log(e)
  }
})

co(function* () {

  if (buildComponents.length) {
    list = list.filter(function (one) {
      return buildComponents.indexOf(_camelCase(one.name)) > -1
    })
  }

  try {
    for (let i = 0; i < list.length; i++) {
      let one = list[i]
      const name = list[i].name
      if (one.items) {
        // build a commonjs bundle
        yield build(buildConfig({
          name: list[i].name + '-pack',
          importName: _camelCase(list[i].name),
          path: `src/components/${name}/index.js`
        }), `pack: ${list[i].name}`)

        for (let j = 0; j < one.items.length; j++) {
          one.name = one.items[j]
          yield build(buildConfig(one), one.items[j])
        }
      } else {
        yield build(buildConfig(one), one.name)
      }
    }
  } catch (e) {
    console.log(e)
  }

})

function camelCase(input) {
  let str = input.toLowerCase().replace(/-(.)/g, function (match, group1) {
    return group1.toUpperCase();
  })
  str = str.replace(/_(.)/g, function (match, group1) {
    return group1.toUpperCase()
  });
  return str
}

function _camelCase(input) {
  let str = camelCase(input)
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}

function buildMainConfig() {

  // list all components
  const list = require('../src/components/map.json')
  let code = 'const vux = {}\n'
  code += `/* only for building vux.css */
import Style from '../styles/index.vue'\n`

  delete list['NOTICE']
  delete list['ChinaAddressV1Data']

  for (let i in list) {
    const name = `${namespace}${i}`
    code += `import ${name} from '${list[i]}'\n
vux['${name}'] = ${name}\n`
  }

  code += `
if (!!window) {
  for (let i in vux) {
    window[i] = vux[i]
  }
}\n`
  code += `module.exports = vux`

  fs.writeFileSync(path.resolve(__dirname, '../src/components/index.js'), code)

  delete config.entry

  config.plugins.forEach((one, index) => {
    if (one.constructor.name === 'ExtractTextPlugin') {
      config.plugins.splice(index, 1)
    }
  })

  config.plugins.push(new ExtractTextPlugin({
    filename: `vux.min.css`
  }))

  config.entry = config.entry || {}
  config.entry['vux'] = 'src/components/index.js'
  config.output = {}
  config.output.libraryTarget = 'umd'
  config.output.library = `vux`
  config.output.filename = `vux.min.js`
  config.output.path = path.resolve(__dirname, `../dist/`)
  delete config.__vueOptions__
  return config
}

// build plugins
function buildPlugin(name) {
  delete config.entry

  config.plugins.forEach((one, index) => {
    if (one.constructor.name === 'ExtractTextPlugin') {
      config.plugins.splice(index, 1)
    }
  })

  config.plugins.push(new ExtractTextPlugin({
    filename: 'index.min.css'
  }))
  config.entry = config.entry || {}
  config.entry['plugin'] = `src/plugins/${name.toLowerCase()}/index.js`
  config.output = {}
  config.output.libraryTarget = 'umd'
  config.output.library = `${namespace}${name}Plugin`
  config.output.filename = `index.min.js`
  config.output.path = path.resolve(__dirname, `../dist/plugins/${name.toLowerCase()}`)
  delete config.__vueOptions__
  return config
}

function buildConfig(one, opts) {
  opts = opts || {}
  one.importName = one.importName || _camelCase(one.name)
  one.path = path.resolve(__dirname, '../' + (one.path || maps[one.importName]))

  delete config.entry

  config.plugins.forEach((one, index) => {
    if (one.constructor.name === 'ExtractTextPlugin') {
      config.plugins.splice(index, 1)
    }
  })

  config.plugins.push(new ExtractTextPlugin({
    filename: 'index.min.css'
  }))

  config.entry = {}
  config.entry[one.name] = one.path
  config.output = {}
  config.output.libraryTarget = 'umd'
  config.output.library = `${namespace}${one.importName}`
  config.output.filename = `index.min.js`
  config.output.path = path.resolve(__dirname, `../dist/components/${one.name}/`)
  delete config.__vueOptions__
  return config
}

function toDash(str) {
  return str.replace(/([A-Z])/g, function (m, w) {
    return '-' + w.toLowerCase();
  }).replace('-', '')
}
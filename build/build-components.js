'use strict'

/**
* --locale='zh-CN'
* --namespace='vux'
*/

var argv = require('yargs').argv
var namespace = argv.namespace || 'vux'

let config = require('./webpack.prod.conf.js')
config.vux.plugins.forEach(function(plugin) {
  if (plugin.name === 'i18n') {
    plugin.vuxStaticReplace = true
    plugin.vuxLocale = argv['locale'] || 'zh-CN'
  }
})
config.vux.options.env = 'production'

const touch = require('touch')
const path = require('path')
const list = require(path.resolve(__dirname, '../src/datas/vux_component_list.json'))
const webpack = require('webpack')
const mkdirp = require('mkdirp')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var co = require('co')
var thunkify = require('thunkify')
var pkg = require(path.resolve(__dirname, '../package.json'))

var build = thunkify(function (config, name, cb) {
  let start = new Date().getTime()
  console.log(`start:${name}`)
  webpack(config, function (err, stats) {
    if (!config.entry.vux) {
      touch.sync(path.resolve(config.output.path, './index.min.css'))
    }
    var jsonStats = stats.toJson()
    var assets = jsonStats.assets[0]
    var size = assets.size / 1024
    size = size.toFixed(2) + 'k'
    console.log('size', size)
    console.log('time', (new Date().getTime() - start) / 1000 + 's')
    console.log('----------------')
    cb()
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

const maps = require(path.resolve(__dirname, '../src/components/map.json'))

let isBuilding = false
co(function* () {
  try {
    for (let i = 0; i < list.length; i++) {
      let one = list[i]
      if(one.items) {
        for(let j = 0; j < one.items.length; j++) {
          one.name = one.items[j]
          one.importName = _camelCase(one.items[j])
          one.path = maps[one.importName]
          yield build(buildConfig(one), one.items[j])
        }
      } else {
        yield build(buildConfig(one), one.name)
      }
    }
    yield build(buildMainConfig(), 'vux')
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

  delete config.entry

  config.plugins.forEach((one, index) => {
    if (one.constructor.name === 'ExtractTextPlugin') {
      config.plugins.splice(index, 1)
    }
  })

  config.plugins.push(new ExtractTextPlugin(`vux.min.css`))

  config.entry = config.entry || {}
  config.entry['vux'] = 'src/components/index.js'
  config.output = {}
  config.output.libraryTarget = 'umd'
  config.output.library = `vux`
  config.output.filename = `vux.min.js`
  config.output.path = path.resolve(__dirname, `../dist/`)
  return config
}

function buildConfig(one) {
  one.importName = _camelCase(one.name)
  one.path = path.resolve(__dirname, '../' + maps[one.importName])

  delete config.entry

  config.plugins.forEach((one, index) => {
    if (one.constructor.name === 'ExtractTextPlugin') {
      config.plugins.splice(index, 1)
    }
  })

  config.plugins.push(new ExtractTextPlugin(`index.min.css`))

  config.entry = config.entry || {}
  config.entry[one.name] = one.path
  config.output = {}
  config.output.libraryTarget = 'umd'
  config.output.library = `${namespace}${one.importName}`
  config.output.filename = `index.min.js`
  config.output.path = path.resolve(__dirname, `../dist/components/${one.name}/`)
  return config
}

'use strict'
var path = require('path')
var fs = require('fs')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var buildConfig = require(path.resolve(__dirname, './components'))

var getConfig = function () {
  var config = {
    entry: {},
    output: {
      path: path.resolve(__dirname, '../dist/components/'),
      filename: 'index.js'
    },
    resolve: {
      extensions: ['', '.js', '.vue'],
      alias: {
        'src': path.resolve(__dirname, '../src')
      }
    },
    resolveLoader: {
      root: path.join(__dirname, 'node_modules')
    },
    module: {
      loaders: [{
        test: /\.vue$/,
        loader: 'vue'
      }, {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      }, {
        test: /\.json$/,
        loader: 'json'
      }, {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash:7]'
        }
      }]
    },
    vue: {
      loaders: {
        js: 'babel',
        css: ExtractTextPlugin.extract('vue-style-loader', generateExtractLoaders(['css'])),
        less: ExtractTextPlugin.extract('vue-style-loader', generateExtractLoaders(['css', 'less'])),
        sass: ExtractTextPlugin.extract('vue-style-loader', generateExtractLoaders(['css', 'sass'])),
        stylus: ExtractTextPlugin.extract('vue-style-loader', generateExtractLoaders(['css', 'stylus']))
      }
    },
    eslint: {
      formatter: require('eslint-friendly-formatter')
    }
  }

  // whether to generate source map for production files.
  // disabling this can speed up the build.
  var SOURCE_MAP = false

  config.devtool = SOURCE_MAP ? 'source-map' : false

  // generate loader string to be used with extract text plugin
  function generateExtractLoaders (loaders) {
    return loaders.map(function (loader) {
      return loader + '-loader' + (SOURCE_MAP ? '?sourceMap' : '')
    }).join('!')
  }

  config.plugins = (config.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ])
  return config
}

var list = ''
process.argv.forEach(function (val, index, array) {
  if (index === 2) {
    list = val
  }
})

if (list) {
  list.split(',').forEach(function (name) {
    build(name)
  })
} else {
  var p = path.resolve(__dirname, '../src/components/')

  fs.readdir(p, function (err, files) {
    if (err) {
      throw err
    }
    files.filter(function (file) {
      return fs.statSync(path.join(p, file)).isDirectory()
    }).forEach(function (file) {
      build(file)
    })
  })
  build('date-formatter', '../src/components/datetime/format')
  build('friendly-time', '../src/filters/friendly-time')
  build('inview', '../src/directives/inview')

  // multi entry
  buildConfig.multi_entry.forEach(function (one) {
    build(one, `../src/components/${one}/${one}`, true)
    build(`${one}-item`, `../src/components/${one}/${one}-item`, true)
  })
}

var number = 0
function build (name, _path, isMulti) {
  let _config = getConfig()
  _config.plugins = _config.plugins.concat([new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new ExtractTextPlugin('style.css')])

  if (!isMulti) {
    if (buildConfig.multi_entry.indexOf(name) > -1 || buildConfig.multi_entry.indexOf(name.replace('-item', '')) > -1) {
      return
    }
  }

  if (buildConfig.ignore.indexOf(name) > -1) {
    return
  }

  let _name = name
  let file = _path || `../src/components/${name}/index`
  let _start = new Date().getTime()
  _config.output.libraryTarget = 'umd'
  _config.entry = {}
  _config.entry[name] = [path.resolve(__dirname, file)]
  _config.output.library = converName(name)
  _config.output.path = path.resolve(__dirname, '../dist/components/' + name.toLowerCase() + '/')

  webpack(_config, function (err, stats) {
    var jsonStats = stats.toJson()
    var assets = jsonStats.assets[0]
    var offset = Math.round((new Date().getTime() - _start) / 1000)
    var index = ++number
    console.log(`[${index < 10 ? ('0' + index) : index}]  `, addWhiteSpace(`${offset}s`, 10), addWhiteSpace('umd ' + _name, 25), `${(_name, assets.size / 1024).toFixed(2)}k`)
    if (err) {
      throw err
    }
  })
  setTimeout(function () {
    buildCommon(name, _path, isMulti)
  })
}

function buildCommon (name, _path, isMulti) {
  let _config = getConfig()

  _config.plugins = _config.plugins.concat([new webpack.optimize.UglifyJsPlugin({
    compress: false,
    mangle: false,
    beautify: {
      beautify: true,
      'indent-level': 2,
      'quote_style': 1,
      semicolons: false
    }
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new ExtractTextPlugin('style.css')])

  if (!isMulti) {
    if (buildConfig.multi_entry.indexOf(name) > -1 || buildConfig.multi_entry.indexOf(name.replace('-item', '')) > -1) {
      return
    }
  }

  if (buildConfig.ignore.indexOf(name) > -1) {
    return
  }

  let _name = name
  let file = _path || `../src/components/${name}/index`
  let _start = new Date().getTime()
  _config.entry = {}
  _config.entry[name] = [path.resolve(__dirname, file)]
  _config.output.libraryTarget = 'commonjs2'
  _config.output.filename = 'index.js'
  _config.output.path = path.resolve(__dirname, '../dist/components-commonjs/' + name.toLowerCase() + '/')
  webpack(_config, function (err, stats) {
    var jsonStats = stats.toJson()
    var assets = jsonStats.assets[0]
    var offset = Math.round((new Date().getTime() - _start) / 1000)
    var index = ++number
    console.log(`[${index < 10 ? ('0' + index) : index}]  `, addWhiteSpace(`${offset}s`, 10), addWhiteSpace('commonjs ' + _name, 25), `${(_name, assets.size / 1024).toFixed(2)}k`)
    if (err) {
      throw err
    }
  })
}

function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function converName (name) {
  return ('vux-' + name).split('-').map(function (one, index) {
    return index === 0 ? one : capitalizeFirstLetter(one)
  }).join('')
}

function addWhiteSpace (str, number) {
  if (str.length < number) {
    var rs = str
    for (var i = 0; i < number - str.length; i++) {
      rs += ' '
    }
    return rs
  }
  return str
}

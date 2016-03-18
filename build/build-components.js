'use strict'

var path = require('path')
var fs = require('fs')
var Spinner = require('cli-spinner').Spinner

var config = {
  entry: {},
  output: {
    path: path.resolve(__dirname, '../components/'),
    filename: 'index.js',
    libraryTarget: 'umd'
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
      js: 'babel'
    }
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  }
}

var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

// naming output files with hashes for better caching.
// dist/index.html will be auto-generated with correct URLs.
config.output.chunkFilename = '[id].js'

// whether to generate source map for production files.
// disabling this can speed up the build.
var SOURCE_MAP = false

config.devtool = SOURCE_MAP ? 'source-map' : false

// generate loader string to be used with extract text plugin
function generateExtractLoaders(loaders) {
  return loaders.map(function (loader) {
    return loader + '-loader' + (SOURCE_MAP ? '?sourceMap' : '')
  }).join('!')
}

config.vue.loaders = {
  js: 'babel',
  css: ExtractTextPlugin.extract('vue-style-loader', generateExtractLoaders(['css'])),
  less: ExtractTextPlugin.extract('vue-style-loader', generateExtractLoaders(['css', 'less'])),
  sass: ExtractTextPlugin.extract('vue-style-loader', generateExtractLoaders(['css', 'sass'])),
  stylus: ExtractTextPlugin.extract('vue-style-loader', generateExtractLoaders(['css', 'stylus']))
}

config.plugins = (config.plugins || []).concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new ExtractTextPlugin('style.css')
])

var webpack = require("webpack")

var walk = require('walk')
var walker = walk.walk(path.resolve(__dirname, '../src/components'), {
  followLinks: false
})

walker.on("directory", function (root, dirStatsArray, next) {
  var name = dirStatsArray.name
  let spinner = new Spinner(`building ${name}`)
  spinner.setSpinnerString('←↖↑↗→↘↓↙')
  spinner.start()

  config.entry = {}
  config.entry[name] = [path.resolve(__dirname, `../src/components/${name}/index`)]
  config.output.library = `vux${capitalizeFirstLetter(name)}`
  config.output.path = path.resolve(__dirname, '../components/' + name + '/')
  webpack(config, function (err, stats) {
    var jsonStats = stats.toJson()
    spinner.setSpinnerString(stats.endTime - stats.startTime)
    spinner.stop()
    if (err) {
      throw err
    } else {
      next()
    }
  })
})

walker.on("end", function () {
  console.log("\n build done")
})

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
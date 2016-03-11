var webpack = require('webpack')
var config = require('./webpack.npm.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// naming output files with hashes for better caching.
// dist/index.html will be auto-generated with correct URLs.
config.output.filename = '[name].js'
config.output.chunkFilename = '[id].[chunkhash].js'

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

config.vue.loaders = {
  js: 'babel!eslint'
}

config.plugins = (config.plugins || []).concat([
  // http://vuejs.github.io/vue-loader/workflow/production.html
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
  new webpack.optimize.OccurenceOrderPlugin()
])

module.exports = config

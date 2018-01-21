'use strict'

const webpack = require('webpack')
const mkdirp = require('mkdirp')
const fs = require('fs')
const touch = require('touch')
const path = require('path')
var co = require('co')
var thunkify = require('thunkify')

var build = thunkify(function (config, name, cb) {
  let start = new Date().getTime()
  console.log(`start:${name}`)
  webpack(config, function (err, stats) {
    if (!config.entry.vux) {
      mkdirp.sync(path.resolve(config.output.path))
      touch.sync(path.resolve(config.output.path, './index.min.css'))
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

var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  build,
  ExtractTextPlugin
}
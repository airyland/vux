'use strict'
const querystring = require('querystring')

// anonymous-tracking, do no harm to your computer and privacy
module.exports = function (options) {
  try {
    const pkg = require('../../package.json')
    const version = pkg.version
    const uuid = require('uuid')
    const now = new Date().getTime()
    const Config = require('node-cli-config')
    const platform = process.platform
    const https = require('https')
    const config = Config({
      dir: '.vuxrc',
      file: 'config'
    })
    let user = config.get('uuid')
    if (!user) {
      user = uuid.v1()
      config.set('uuid', user)
    }
    let firstTime = config.get('start')
    if (!firstTime) {
      firstTime = now
      config.set('start', firstTime)
    }
    let count = config.get('count')
    if (!count) {
      count = 1
    } else {
      count = count * 1 + 1
    }
    config.set('count', count)

    const report = function () {
      const data = {
        vux_version: options.vuxVersion,
        vue_version: options.vueVersion,
        vue_loader_version: options.vueLoaderVersion,
        version: version,
        platform: platform,
        uuid: user,
        start: firstTime,
        count: count
      }
      const query = querystring.stringify(data)
      try {
        const url = `/vux-loader-anonymous-tracking.html?${query}`
        const res = https.get({
          hostname: 'vux.li',
          path: url
        })
        res.on('error', function (err) {})
      } catch (e) {}
    }
    report()
    global.reportInterval = setInterval(report, 1200000)
  } catch (e) {}
}
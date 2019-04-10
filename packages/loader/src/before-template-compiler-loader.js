'use strict'

const utils = require('loader-utils')
const parseXIcon = require('./libs/parse-x-icon')

module.exports = function (source) {
  this.cacheable()
  const _this = this
  const config = this.vux || utils.getLoaderConfig(this, 'vux')

  if (!config.plugins || !config.plugins.length) {
    return source
  }

  if (config.options.useVuxUI && source.indexOf('</x-icon>') > -1) {
    source = parseXIcon(source, config)
  }

  config.plugins.forEach(function (plugin) {
    // style-parser
    if (plugin.name === 'before-template-compiler-parser') {
      if (plugin.fn) {
        source = plugin.fn.call(_this, source)
      }
    }
  })

  return source
}

'use strict'

const utils = require('loader-utils')

module.exports = function (source) {
  this.cacheable()
  const _this = this
  let config = this.vux || utils.getLoaderConfig(this, 'vux')

  if (this['thread-loader']) {
    const configFile = require.resolve('vux/.config.cache.json')
    config = require(configFile)
  }

  if (!config.plugins || !config.plugins.length) {
    return source
  }

  config.plugins.forEach(function (plugin) {
    // style-parser
    if (plugin.name === 'style-parser') {
      if (plugin.fn) {
        source = plugin.fn.call(_this, source)
      }
    }
  })

  if (config.options.vuxDev) {
    if (/App\.vue$/.test(this.resourcePath)) {
      source = source.replace(/~vux\/src/g, '.')
    } else {
      if (config.options.resolveVuxDir) {
        // if (_this.resourcePath.includes('pages') && _this.resourcePath.includes('IconLoading') )
        // source = source.replace(/~vux\/src/g, config.options.resolveVuxDir).replace('//', '/')
        // if (_this.resourcePath.includes('pages') && _this.resourcePath.includes('IconLoading') )
      } else {
        source = source.replace(/~vux\/src/g, '..')
      }
    }
  }

  return source
}

'use strict'

const utils = require('loader-utils')
const fs = require('fs')
const i18nReplaceForScript = require('../libs/replace-i18n-for-script').replace
const getI18nBlockWithLocale = require('../libs/get-i18n-block').getWithLocale
const path = require('path')
const parser = require('./libs/import-parser-v2')


module.exports = function (source) {
  this.cacheable()
  const _this = this
  let config = this.vux || utils.getLoaderConfig(this, 'vux')

  // no config found when using thread-loader
  if (this['thread-loader']) {
    const configFile = require.resolve('vux/.config.cache.json')
    config = require(configFile)
  }

  let i18nPlugin
  const i18nPluginsMatch = config.plugins.filter(function (one) {
    return one.name === 'i18n'
  })
  if (i18nPluginsMatch.length) {
    i18nPlugin = i18nPluginsMatch[0]
  }
  let isVuxVueFile = this.resourcePath.replace(/\\/g, '/').indexOf('vux/src/components') > -1
  if (config.options.vuxDev && this.resourcePath.replace(/\\/g, '/').indexOf('src/components') > -1) {
    isVuxVueFile = true
  }

  const isVuxComponent = this.resourcePath.replace(/\\/g, '/').indexOf('/vux/src/components') > -1

  if (config.plugins.length) {
    config.plugins.forEach(function (plugin) {
      // script-parser
      if (plugin.name === 'script-parser') {
        if (plugin.fn) {
          source = plugin.fn.call(_this, source)
        }
      }
    })
  }

  if (config.options.useVuxUI && /}\s+from(.*?)('|")vux/.test(source)) {
    const maps = this.vuxMaps || utils.getLoaderConfig(this, 'vuxMaps')
    // source = parser(source, function (opts) {
    //   let str = ''
    //   opts.components.forEach(function (component) {
    //     let file = `vux/${maps[component.originalName]}`
    //     if (config.options.vuxDev) {
    //       if (/App\.vue/.test(_this.resourcePath)) {
    //         file = file.replace(/vux\/src/g, '.')
    //       } else {
    //         let relative = '..'
    //         // component file import other functions
    //         if (isVuxComponent && !/components/.test(file)) {
    //           relative = '../..'
    //         }

    //         if (/demos/.test(_this.resourcePath)) {
    //           const splits = _this.resourcePath.split('demos')[1].split(path.sep).length - 1
    //           let dir = []
    //           for (let i = 0; i < splits; i++) {
    //             dir.push('..')
    //           }
    //           relative = dir.join('/')
    //         }

    //         if (config.options.resolveVuxDir) {
    //           relative = config.options.resolveVuxDir
    //         }

    //         file = file.replace(/vux\/src/g, relative)
    //       }
    //     }
    //     str += `import ${component.newName} from '${file}'\n`
    //   })
    //   return str
    // }, 'vux')
    try {
      source = parser(source)
    } catch (e) {
      console.log(e)
    }
  }

  if (config.options.vuxWriteFile === true) {
    fs.writeFileSync(this.resourcePath + '.vux.js', source)
  }

  if (i18nPlugin && !isVuxVueFile && source.indexOf(`$t('`) > -1 && i18nPlugin.staticReplace === true) {
    const rs = getI18nBlockWithLocale({
      code: _this.resourcePath,
      isFile: true,
      locale: i18nPlugin.vuxLocale || 'zh-CN'
    })
    source = i18nReplaceForScript(source, rs)
  }

  return source
}

function camelCaseToDash(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()
}
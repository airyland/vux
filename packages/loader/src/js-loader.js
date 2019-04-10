'use strict'

const utils = require('loader-utils')
const path = require('path')
const pkg = require('../package')

const parser = require('./libs/import-parser-v2')
const fs = require('fs')

module.exports = function (source) {

  if (!/\.js$/.test(this.resourcePath)) {
    return source
  }
  
  this.cacheable()
  const _this = this
  const vuxConfig = this.vux || utils.getLoaderConfig(this, 'vux')
 
  // 打包时无法获取选项，默认为使用 vux ui
  if (/}\s+from(.*?)('|")vux/.test(source)) {
    
    const maps = this.vuxMaps || utils.getLoaderConfig(this, 'vuxMaps')
    // source = parser(source, function (opts) {
    //   let str = ''
    //   opts.components.forEach(function (component) {
    //     let file = `vux/${maps[component.originalName]}`
    //     if (vuxConfig.options.vuxDev) {
    //       if (vuxConfig.options.resolveVuxDir) {
    //         file = file.replace('vux/src/', vuxConfig.options.resolveVuxDir)
    //       } else {
    //         file = file.replace('vux/src/', './')
    //       }
    //     }
    //     str += `import ${component.newName} from '${file}'\n`
    //   })
    //   return str
    // }, 'vux')    
  }

  source = parser(source)

  if(/** vuxConfig.options.vuxDev && **/ /main\.js/.test(this.resourcePath)) {
    source = source.replace(/!vux\/src/g, '!.')
  }

  if (vuxConfig && vuxConfig.plugins && vuxConfig.plugins.length) {
    vuxConfig.plugins.forEach(function (plugin) {
      // js-parser
      if (plugin.name === 'js-parser') {
        if (plugin.fn) {
          if (plugin.test && plugin.test.test(_this.resourcePath)) {
            source = plugin.fn.call(_this, source)
          } else if (!plugin.test) {
            source = plugin.fn.call(_this, source)
          }
        }
      }
    })
  }

  /**
  if (/main\.js/.test(this.resourcePath) && process.env.NODE_ENV === 'development') {
    if (this.options && this.options.context) {
      const pkgPath = vuxConfig.options.vuxDev ? path.join(this.options.context, 'package.json') : path.join(this.options.context, 'node_modules/vux/package.json')
      const vuxPkg = require(pkgPath)
      const webpackPath = path.join(this.options.context, 'node_modules/webpack/package.json')
      const webpackPkg = require(webpackPath)
      const nodeVersion = process.version.match(/^v(\d+\.\d+)/)[1]
      const style = 'background: #35495e; color: yellow;'
      if (typeof vuxConfig.options.showVuxVersionInfo === 'undefined' || vuxConfig.options.showVuxVersionInfo === true) {
        source += `\n;console.info('[VUX] %cvux@${vuxPkg.version}, vux-loader@${pkg.version}, webpack@${webpackPkg.version}, node@${nodeVersion}\\n%c[VUX] 建议反馈请访问 https://github.com/airyland/vux/issues \\n[VUX] 关闭该提示请在 vux-loader 配置  options: { showVuxVersionInfo: false }', '${style}', '')`
      }
    }
  }
  **/

  return source
}
'use strict'

const parseVirtualComponent = require('./parse-virtual-component')
const path = require('path')
const fs = require('fs')

module.exports = function (source, config) {
  source = parseVirtualComponent(source, 'x-icon', function (query) {
    let size = query.objectList.size || 24
    let type = query.objectList.type
    let svgPath = path.resolve(config.options.projectRoot, `node_modules/vux/src/icons/${type}.svg`)
    if (config.options.vuxDev) {
      svgPath = path.resolve(config.options.projectRoot, `src/icons/${type}.svg`)
    }

    // merge classname
    let className = `vux-x-icon vux-x-icon-${type}`
    if (query.objectList.class) {
      className += ` ${query.objectList.class}`
    }

    let props = ''
    for (let i in query.objectList) {
      if (i !== 'class') {
        props += ` ${i}="${query.objectList[i]}"`
      }
    }

    const content = fs.readFileSync(svgPath, 'utf-8')
    return content.replace('width="512"', `width="${size}"`)
    .replace('height="512"', `height="${size}"`)
    .replace('<svg', `<svg class="${className}" ${props}`)
  })
  return source
}

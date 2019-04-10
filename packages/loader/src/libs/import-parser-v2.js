const babel = require('@babel/core')
const transformPlugin = require('./babel-transform-imports/index')

const map = require('vux/src/components/map.json')

function transform (code) {
	const rs = babel.transform(code, {
    plugins: [[transformPlugin, {
      vux: {
        preventFullImport: true,
        libraryName: 'vux',
        camelCase: false,
        kebabCase: false,
        snakeCase: false,
        transform: function (importName, matches) {
          return `vux/${map[importName]}`
        }
      }
    }]]
	}).code.replace(/\s\/\/\sCOMMENT";/g, `" // this line is trasformed by vux-loader`)

  return `/* this file is transformed by vux-loader */
/* eslint-disable */
${rs}`
}

module.exports = transform

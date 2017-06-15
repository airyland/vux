'use strict'

const fs = require('fs')
const path = require('path')

const maps = require(path.resolve(__dirname, '../src/components/map.json'))
delete maps.NOTICE

const target = path.resolve(__dirname, '../index.js')

let str = `// THIS FILE IS ONLY FOR IDE ENTRY CHECKING NOT FOR REAL USAGE\n\n`
str += `console.warn('VUX: 如果你看到这一行，说明 vux-loader 配置有问题或者代码书写规范的原因导致无法解析成按需引入组件，会导致打包体积过大。请升级到最新版本 vux-loader，建议开启 eslint(standard)。')\n\n`
for (let i in maps) {
  str += `import ${i} from './${maps[i]}'\n`
}

str += '\nexport {\n'
for (let i in maps) {
  str += `  ${i}${i === 'XTextarea' ? '' : ','}\n`
}
str += '}'

fs.writeFileSync(target, str)

'use strict'

const fs = require('fs')
const path = require('path')

const maps = require(path.resolve(__dirname, '../src/components/map.json'))
delete maps.NOTICE

const target = path.resolve(__dirname, '../index.js')

let str = `// THIS FILE IS ONLY FOR IDE ENTRY CHECKING NOT FOR REAL USAGE\n\n`
for (let i in maps) {
  str += `import ${i} from './${maps[i]}'\n`
}

str += '\nexport {\n'
for (let i in maps) {
  str += `  ${i}${i === 'XTextarea' ? '' : ','}\n`
}
str += '}'

fs.writeFileSync(target, str)

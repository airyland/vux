const less = require('less')
const path = require('path')
const fs = require('fs')
const file = path.resolve(__dirname, '../src/styles/reset.less')

less.render(fs.readFileSync(file, 'utf8'), {
  paths: [path.resolve(__dirname, '../src/styles')]
},function (e, output) {
  console.log(e, output)
})
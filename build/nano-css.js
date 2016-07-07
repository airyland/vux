const cssnano = require('cssnano')
const fs = require('fs')
const path = require('path')

const code = fs.readFileSync(path.resolve(__dirname, '../dist/vux.css'))
cssnano.process(code.toString(), {zindex: false}).then(function (result) {
  fs.writeFileSync(path.resolve(__dirname, '../dist/vux.css'), result.css)
})
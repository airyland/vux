/**
* Usage:
* node build/common-nano-css.js dist/static
* if you want to run after `npm run build`, add `&& node build/common-nano-css.js dist/static` to the end of  build command.
*/
'use strict'

const cssnano = require('cssnano')
const fs = require('fs')
const path = require('path')

let PATH = path.join(__dirname, '../', process.argv[2]) || 'dist/static/css'

fs.readdir(PATH, function(err, files) {
  if (err) {
    throw err
  }
  files.filter(function(file) {
    return !fs.statSync(path.join(PATH, file)).isDirectory() && /\.css$/.test(file)
  }).forEach(function(file) {
    let filePath = path.join(PATH, file)
    const code = fs.readFileSync(filePath)
    console.log('\ncssnano start:', filePath)
    cssnano.process(code.toString(), {
      zindex: false
    }).then(function(result) {
      console.log('cssnano result:', size(code.toString().length), '=>', size(result.css.length))
      fs.writeFileSync(path.resolve(filePath), result.css)
    })
  })
})

function size(size) {
  return Math.ceil(size / 1024).toFixed(2) + 'k'
}

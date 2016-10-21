const postcss = require('postcss')
const syntax = require('postcss-less')
const path = require('path')
const fs = require('fs')

var pkg = require(path.join(__dirname, '../package.json'))

const p = path.resolve(__dirname, '../src/styles/')

fs.readdir(p, function (err, files) {
  if (err) {
    throw err
  }
  files.filter(function (file) {
    return !fs.statSync(path.join(p, file)).isDirectory() && /less/.test(file) && !/index|variable/.test(file)
  }).forEach(function (file) {
    parse(file)
  })
})

const getPath = function (name) {
  return path.resolve(__dirname, `../dist/styles/${name}`)
}

function parse (file) {
  var code = fs.readFileSync(path.resolve(__dirname, `../src/styles/${file}`))
  code = code.toString()
  postcss([require('autoprefixer')(['iOS >= 7', 'Android >= 4.1'])])
    .process(code, {
      syntax: syntax
    })
    .then(function (result) {
      const dist = getPath(file.replace('less', 'css'));
      fs.writeFileSync(dist, `/*!
 * Vux v0.1.3-rc5 (https://vux.li)
 * Licensed under the MIT license
 */
 ` + result.css);
    });
}
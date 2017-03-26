'use strict'

const glob = require("glob")
const path = require('path')
const yaml = require('js-yaml')
const fs = require('fs')

function getPath(dir) {
  return path.join(__dirname, dir)
}

glob(getPath('../src/**/metas.yml'), {}, function (err, files) {
  for(let file of files) {
    console.log(file)
    let content = fs.readFileSync(file, 'utf-8')
    let doc = yaml.safeLoad(content)
    for (let prop in doc.props) {
      console.log(prop)
      let info = doc.props[prop]
      if (!info['en'] || !info['zh-CN']) {
        throw('缺少多语言文档')
      }
    }
    
  }
})
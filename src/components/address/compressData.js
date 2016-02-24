"use strict"
const list = require('./address.json')
let rs = []
list.forEach(function(one) {
  // 省级
  console.log(one.name)
  rs.push({
    name: one.name,
    value: one.value
  })
  pushData(one.citys,one.value)
    // 市级
  one.citys.forEach(function(one) {
    // 区
    pushData(one.countys,one.value)
  })
})

function pushData(list, parent) {
  list.forEach(function(one) {
    rs.push({
      name: one.name,
      value: one.value,
      parent: parent
    })
  })
}

require('fs').writeFileSync('list.json',JSON.stringify(rs))
"use strict"
const list = require('china-area-data')
let rs = []

for (var i in list) {
  for (var j in list[i]) {
    var item = {
      name: 　list[i][j],
      value: j + '',
    }
    if (i !== '86') {
      item.parent = i
    }
    if (!/台湾|行政/.test(item.name)) {
      rs.push(item)
    }
  }
}

rs.push({
  name: '--',
  value: '--'
})

var _list = [460400, 469001, 469002, 469005, 469006, 469007, 469021, 469022, 469023, 469024, 469025, 469026, 469027, 469028, 469029, 469030]

_list.forEach(function (one) {
  rs.push({
    name: '--',
    value: one + '--',
    parent: one + ''
  })
})

require('fs').writeFileSync('../list.json', JSON.stringify(rs, null, 4))
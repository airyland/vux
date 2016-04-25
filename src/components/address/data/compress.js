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

var _list = [120200, 310200, 429004, 429005, 429006, 659001, 659002, 659003, 659004, 659005, 659006, 659007, 659008,500200, 429021, 419001, 460400, 469001, 469002, 469005, 469006, 469007, 469021, 469022, 469023, 469024, 469025, 469026, 469027, 469028, 469029, 469030]

_list.forEach(function (one) {
  rs.push({
    name: '--',
    value: one + '--',
    parent: one + ''
  })
})

require('fs').writeFileSync('../list.json', JSON.stringify(rs, null, 4))
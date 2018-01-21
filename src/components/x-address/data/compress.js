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

var _list = [110200, 120200, 139000, 139001, 139002, 310200, 419000, 419001, 429000, 429004, 429005, 429006, 429021, 441900, 442000, 469000, 469001, 469002, 469003, 469005, 469006, 469007, 469021, 469022, 469023, 469024, 469025, 469026, 469027, 469028, 469029, 469030, 500200, 620200, 659000, 659001, 659002, 659003, 659004]
_list.forEach(function (one) {
  rs.push({
    name: '--',
    value: '--',
    parent: one + ''
  })
})

require('fs').writeFileSync('../../../datas/china_address.json', JSON.stringify(rs, null, 4))
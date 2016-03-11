"use strict"
const co = require('co')
const request = require('co-request')
const fs = require('co-fs')
const path = require('path')
console.log('fetching issues')
const getByMilestone = function*(milestone) {
  let rs = yield request({
    url: `https://api.github.com/repos/airyland/vux/issues?milestone=${milestone}`,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36'
    }
  })
  const body = JSON.parse(rs.body)
  const list = body.map(function(one) {
    return {
      title: one.title,
      state: one.state
    }
  })
  return list
}

let result = []
co(function*() {
  const list = ['1', '2']
  const listMap = ['0.0.1', '0.1.0(Production Ready)']
  for (let i = 0; i < list.length; i++) {
    result.push({
      milestone: listMap[i],
      list: yield getByMilestone(list[i])
    })
  }
  yield fs.writeFile(path.resolve(__dirname, './milestone.json'), JSON.stringify(result, null, 4))
})
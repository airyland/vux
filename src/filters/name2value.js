import _ from 'lodash'
export default function (name, list) {
  let rs = _.map(name, function (one, index) {
    let parent = ''
    if (index === 2) {
      // 可能存在区名一样的情况，比如南山区
      parent = _.find(list, {
        name: name[1]
      })
      return _.find(list, {
        name: one,
        parent: parent.value
      })
    } else {
      return _.find(list, {
        name: one
      })
    }
  })
  return _.map(rs, function (one) {
    return one.value
  }).join(' ')
}

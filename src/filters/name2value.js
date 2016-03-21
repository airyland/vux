import map from 'lodash.map'
import find from 'lodash.find'

export default function (name, list) {
  let rs = map(name, function (one, index) {
    let parent = ''
    if (index === 2) {
      // 可能存在区名一样的情况，比如南山区
      parent = find(list, {
        name: name[1]
      })
      return find(list, {
        name: one,
        parent: parent.value
      })
    } else {
      return find(list, {
        name: one
      })
    }
  })
  return map(rs, function (one) {
    return one.value
  }).join(' ')
}

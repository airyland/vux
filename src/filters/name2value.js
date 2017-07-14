import map from 'array-map'
import find from 'array-find'

export default function (name, list) {
  let rs = map(name, (one, index) => {
    let parent = ''
    if (index === 2) {
      // 可能存在区名一样的情况，比如南山区
      parent = find(list, item => {
        return item.name === name[1]
      }) || { value: '__' }
      return find(list, item => {
        return item.name === one && item.parent === parent.value
      })
    } else {
      return find(list, item => {
        return item.name === one
      })
    }
  })
  return map(rs, one => {
    return one ? one.value : '__'
  }).join(' ')
}

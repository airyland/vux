import map from 'lodash.map'
import find from 'lodash.find'

export default function (value, list) {
  let rs = map(value, function (one, index) {
    return find(list, {
      value: one
    })
  })
  return map(rs, function (one) {
    return one.name
  }).join(' ').replace('--', '')
}

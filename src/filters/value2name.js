import _ from 'lodash'
export default function (value, list) {
  let rs = _.map(value, function (one, index) {
    return _.find(list, {
      value: one
    })
  })
  return _.map(rs, function (one) {
    return one.name
  }).join(' ')
}

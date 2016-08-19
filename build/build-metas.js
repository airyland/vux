'use strict'

export function getMetas (vux) {
  var rs = {}
  for (var i in vux) {
    rs[i] = {}
    let props = vux[i].props
    if (props) {
      for (var prop in props) {
        let item = props[prop]
        if (typeof item === 'function') {
          rs[i][prop] = {
            type: item.name
          }

          Object.assign(rs[i][prop], {
            default: '-',
            twoWay: false,
            required: false
          })
          if (item.name === 'Boolean') {
            rs[i][prop].default = false
          }
        } else {
          rs[i][prop] = {
            type: item.type ? item.type.name : 'no name',
            default: typeof item.default === 'object' ? JSON.stringify(item.default) : item.default,
            twoWay: item.twoWay === true,
            required: typeof item.required !== 'undefined' ? item.required : false
          }
        }
      }
    }
  }
  console.log(JSON.stringify(rs).length)
  return rs
}

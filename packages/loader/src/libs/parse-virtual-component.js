'use strict'

module.exports = function (source, name, cb) {
  source = replaceEnd(source, name)
  const reg1 = new RegExp(`<${name}([\\s\\S]*?)>.*?</${name}>`, 'g')
  source = source.replace(reg1, function (a, b) {
    let query = getAttributes(a)
    return cb(query, a)
  })
  // for <x-icon />
  const reg2 = new RegExp(`<${name}([\\s\\S]*?)\/>`, 'g')
  source = source.replace(reg2, function (a, b) {
    let query = getAttributes(a)
    return cb(query, a)
  })
  return source
}

function replaceEnd(str, name) {
  const list = str.split('')

  let start = false
  let end = false
  for (let i = 0; i < list.length; i++) {
    if (list[i] === '<' && list[i + 1] !== '/') {
      if (list.slice(i + 1, i + 1 + name.length).join('') === name) {
        start = true
      } else {
        start = false
      }
    }
    if (list[i] === '/' && list[i + 1] === '>') {
      if (start) {
        end = true
        list[i] = 'V'
        list[i + 1] = 'V'
      }
    }
  }

  return list.join('').replace(/VV/g, `></${name}>`)
}

function getAttributes (string) {
  let match = string.match(/\s+(.*?)="(.*?)"/g)

  let obj = {}
  let list = match.map(one => {
    return one.replace(/^\s+|\s+$/g, '').replace(/\.native/g, '')
  })

  for (let i = 0; i < list.length; i++) {
    const pair = list[i].split('=').map(one => {
      return one.replace(/"/g, '')
    })
    if (pair.length === 2) {
      obj[pair[0]] = pair[1]
    } else if (pair.length > 2) {
      obj[pair[0]] = pair.slice(1).join('=')
    }

  }
  return {
    stringList: list.join(' '),
    arrayList: list,
    objectList: obj
  }
}

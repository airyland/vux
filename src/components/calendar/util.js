export function toolClass (obj, sClass, type) {
  if (!sClass) return

  var nowClass = obj.className.replace(/\s+/g, ' ')
  nowClass = nowClass.split(' ')

  sClass = sClass.replace('^\s+|\s+$').replace(/\s+/, ' ').split(' ') // eslint-disable-line
  type = type || 'add'

  for (var i = 0; i < nowClass.length; i++) {
    switch (type) {
      case 'has':
        if (sClass[0] === nowClass[i]) return true
        break
      case 'add':
      case 'remove':
        for (var x = 0; x < sClass.length; x++) {
          if (sClass[x] === nowClass[i]) nowClass.splice(i, 1)
        }
        break
    }
  }

  if (type === 'add') nowClass = nowClass.concat(sClass)

  obj.className = nowClass.join(' ')
}

export function attr (obj, attr, val) {
  if (!obj) return null
  switch (arguments.length) {
    case 3:
      obj.setAttribute(attr, val)
      break
    case 2:
      return obj.getAttribute(attr)
  }
}

export function getDate (str, one) {
  str = str.replace(/[\'\s]+/g, '') // eslint-disable-line
  if (!str) return

  str = str.match(/(\d+[\/\-]\d+[\/\-]\d+)/g)

  var data = []

  for (var i = 0; i < str.length; i++) {
    var arr = str[i].match(/\d+/g)
    var result = {}

    if (arr.length === 3) {
      result['m'] = arr[1]

      if (arr[0].length === 4) {
        result['y'] = arr[0]
        result['d'] = arr[2]
      } else {
        result['d'] = arr[0]
        result['y'] = arr[2]
      }
    } else if (arr.length === 2) {
      if (arr[0].length === 4) {
        result['y'] = arr[0]
        result['m'] = arr[1]
      } else if (arr[0].length <= 2) {
        result['m'] = arr[0]
        result['d'] = arr[1]
      }
    }
    data.push(result)
  }

  return data
}

export function format (str, fmat) {
  if (!str) return false
  str = str.split('/')
  fmat = fmat || 'y/m/d'

  var n = fmat.charAt(0)
  var count = 0

  for (let i = 0; i < fmat.length; i++) {
    if (n.charAt(count) !== fmat.charAt(i)) {
      n += fmat.charAt(i)
      count++
    }
  }

  var data = {
    y: str[0],
    m: str[1],
    d: str[2]
  }
  var symbol = ''
  var result = ''

  if (/\//g.test(n)) {
    symbol = '/'
  } else if (/\-/g.test(n)) {
    symbol = '-'
  }

  n = n.split(symbol)

  for (var i = 0; i < n.length; i++) {
    result += data[n[i]]
    if (i < n.length - 1) result += symbol
  }

  return result
}

export function getElement (parent, str) {
  var result

  switch (str.charAt(0)) {
    case '#':
      result = parent.getElementById(str.substring(1))
      break
    case '.':
      result = parent.getElementsByClassName(str.substring(1))
      break
    default:
      result = parent.getElementsByTagName(str)
      break
  }

  return result
}

export function create (tagname, attr, html) {
  if (!tagname) return

  attr = attr || {}
  html = html || ''

  var element = document.createElement(tagname)

  for (var i in attr) {
    element.setAttribute(i, attr[i])
  }

  element.innerHTML = html
  return element
}

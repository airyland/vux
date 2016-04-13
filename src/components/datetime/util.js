import formater from './format'

export function each (obj, fn) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (fn.call(obj[key], key, obj[key]) === false) {
        break
      }
    }
  }
}

export function trimZero (val) {
  val = String(val)
  val = val ? parseFloat(val.replace(/^0+/g, '')) : ''
  val = val || 0
  val = val + ''
  return val
}

export function addZero (val) {
  val = String(val)
  return val.length < 2 ? '0' + val : val
}

export function isLeapYear (year) {
  return year % 100 !== 0 && year % 4 === 0 || year % 400 === 0
}

export function getMaxDay (year, month) {
  year = parseFloat(year)
  month = parseFloat(month)
  if (month === 2) {
    return isLeapYear(year) ? 29 : 28
  }
  return [4, 6, 9, 11].indexOf(month) >= 0 ? 30 : 31
}

export function parseRow (tmpl, value) {
  return tmpl.replace(/\{value\}/g, value)
}

// parse Date String
export function parseDate (format, value) {
  var formatParts = format.split(/[^A-Za-z]+/)
  var valueParts = value.split(/\D+/)
  if (formatParts.length !== valueParts.length) {
    // if it is error date, use current date
    var date = formater(new Date(), format)
    valueParts = date.split(/\D+/)
  }

  var result = {}

  for (var i = 0; i < formatParts.length; i++) {
    if (formatParts[i]) {
      result[formatParts[i]] = valueParts[i]
    }
  }
  return result
}

export function getElement (expr) {
  return (typeof expr === 'string') ? document.querySelector(expr) : expr
}

export function toElement (html) {
  var tempContainer = document.createElement('div')
  tempContainer.innerHTML = html
  return tempContainer.firstElementChild
}

export function removeElement (el) {
  el && el.parentNode.removeChild(el)
}

const indexof = function (arr, obj) {
  if (arr.indexOf) return arr.indexOf(obj)
  for (let i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i
  }
  return -1
}

const findClosest = function (target, points) {
  var diff = null
  var current = null
  var closest = points[0]

  for (let i = 0; i < points.length; i++) {
    diff = Math.abs(target - closest)
    current = Math.abs(target - points[i])
    if (current < diff) {
      closest = points[i]
    }
  }

  return closest
}

function getWidth (el) {
  let width = window.getComputedStyle(el, null)['width']
  if (width === '100%' || width === 'auto') {
    return 0
  }
  return parseInt(width, 10)
}

const percentage = {
  isNumber: function (num) {
    return typeof num === 'number'
  },

  of: function (perc, num) {
    if (percentage.isNumber(perc) && percentage.isNumber(num)) return (perc / 100) * num
  },

  from: function (part, target) {
    if (percentage.isNumber(part) && percentage.isNumber(target)) return (part / target) * 100
  }
}

export {
  indexof,
  findClosest,
  getWidth,
  percentage
}

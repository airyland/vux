var Event = {
  tap: function (element, callback) {
    if (!element) return console.error('tap对象不能为空')
    element.__tap = {}
    element.__tap.event = {
      start: function (e) {
        e.stopPropagation()
        element.__tap.clickabled = true
        element.__tap.starttime = e.timeStamp
        element.__tap.startPageX = e.changedTouches[0].pageX
        element.__tap.startPageY = e.changedTouches[0].pageY
      },
      move: function (e) {
        if (Math.abs(e.changedTouches[0].pageX - element.__tap.startPageX) >= 5 ||
          Math.abs(e.changedTouches[0].pageY - element.__tap.startPageY) >= 5) {
          element.__tap.clickabled = false
        }
      },
      end: function (e) {
        e.stopPropagation()
        e.preventDefault()
        if (e.timeStamp - element.__tap.starttime > 30 && e.timeStamp - element.__tap.starttime < 300 && element.__tap.clickabled) {
          callback && callback(e)
        }
      },
      click: function (e) {
        e.stopPropagation()
        callback && callback(e)
      }
    }
    if (/AppleWebKit.*Mobile.*/.test(navigator.userAgent.match())) {
      element.addEventListener('touchstart', element.__tap.event.start, false)
      element.addEventListener('touchmove', element.__tap.event.move, false)
      element.addEventListener('touchend', element.__tap.event.end, false)
    } else {
      element.addEventListener('click', element.__tap.event.click, false)
    }
    return element
  },
  untap: function (element) {
    if (!element) return console.error('untap对象不能为空')
    element.__tap = element.__tap || {}
    if (/AppleWebKit.*Mobile.*/.test(navigator.userAgent.match()) && !!element.__tap.event) {
      element.__tap.event.start && element.removeEventListener('touchstart', element.__tap.event.start, false)
      element.__tap.event.move && element.removeEventListener('touchmove', element.__tap.event.move, false)
      element.__tap.event.end && element.removeEventListener('touchend', element.__tap.event.end, false)
    } else if (element.__tap.event) {
      element.__tap.event.click && element.removeEventListener('click', element.__tap.event.click, false)
    }
    return element
  }

}
module.exports = Event

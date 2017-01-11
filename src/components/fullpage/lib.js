/*!
 * zepto.fullpage.js v0.5.0 (https://github.com/yanhaijing/zepto.fullpage)
 * API https://github.com/yanhaijing/zepto.fullpage/blob/master/doc/api.md
 * Copyright 2014 yanhaijing. All Rights Reserved
 * Licensed under MIT (https://github.com/yanhaijing/zepto.fullpage/blob/master/LICENSE)
 */

const BOX_CLASS = 'vux-fullpage-box'
const ANIM_CLASS = 'vux-fullpage-box-anim'
const ITEM_CLASS = 'vux-fullpage-item'
const DIR_CLASS = 'vux-fullpage-dir'

var d = {
  page: null,
  start: 0,
  duration: 500,
  loop: false,
  drag: false,
  dir: 'v',
  der: 0.1,
  change: function (data) {},
  beforeChange: function (data) {},
  afterChange: function (data) {},
  orientationchange: function (orientation) {}
}

function touchmove (e) {
  e.preventDefault()
}

function fix (cur, pagesLength, loop) {
  if (cur < 0) {
    return loop ? pagesLength - 1 : 0
  }

  if (cur >= pagesLength) {
    return loop ? 0 : pagesLength - 1
  }

  return cur
}

function move (ele, dir, dist) {
  var xPx = '0px'
  var yPx = '0px'
  if (dir === 'v') yPx = dist + 'px'
  else xPx = dist + 'px'
  ele.style.cssText += ('-webkit-transform : translate3d(' + xPx + ', ' + yPx + ', 0px);' +
    'transform : translate3d(' + xPx + ', ' + yPx + ', 0px)')
}

function init (option) {
  var o = option || {}
  for (var key in d) {
    if (!o.hasOwnProperty(key)) {
      o[key] = d[key]
    }
  }

  var that = this
  that.curIndex = -1
  that.o = o

  that.startY = 0
  that.movingFlag = false

  that.ele.classList.add(BOX_CLASS)
  that.parentEle = that.ele.parentNode

  var query = o.page
  if (query && query.indexOf('.') === 0) {
    query = query.substring(1, query.length)
    that.pageEles = that.ele.getElementsByClassName(query)
  }

  if (!query) {
    that.pageEles = that.ele.children
  }

  for (var i = 0; i < that.pageEles.length; i++) {
    var pageEle = that.pageEles[i]
    pageEle.classList.add(ITEM_CLASS)
    pageEle.classList.add(DIR_CLASS + o.dir)
  }

  that.pagesLength = that.pageEles.length
  that.update()
  that.initEvent()
  that.start()
}

function Fullpage (ele, option) {
  this.ele = ele
  init.call(this, option)
}

Fullpage.prototype.update = function () {
  let pageEle
  if (this.o.dir === 'h') {
    this.width = this.parentEle.offsetWidth
    for (let i = 0; i < this.pageEles.length; i++) {
      pageEle = this.pageEles[i]
      pageEle.style.width = this.width + 'px'
    }
    this.ele.style.width = (this.width * this.pagesLength) + 'px'
  }

  this.height = this.parentEle.offsetHeight
  for (let i = 0; i < this.pageEles.length; i++) {
    pageEle = this.pageEles[i]
    pageEle.style.height = this.height + 'px'
  }

  this.moveTo(this.curIndex < 0 ? this.o.start : this.curIndex)
}

Fullpage.prototype.initEvent = function () {
  var that = this
  var ele = that.ele

  ele.addEventListener('touchstart', function (e) {
    if (!that.status) {
      return 1
    }
    // e.preventDefault()
    if (that.movingFlag) {
      return 0
    }

    that.startX = e.targetTouches[0].pageX
    that.startY = e.targetTouches[0].pageY
  })
  ele.addEventListener('touchend', function (e) {
    if (!that.status) {
      return 1
    }
    // e.preventDefault()
    if (that.movingFlag) {
      return 0
    }

    var sub = that.o.dir === 'v' ? (e.changedTouches[0].pageY - that.startY) / that.height : (e.changedTouches[0].pageX - that.startX) / that.width
    var der = (sub > that.o.der || sub < -that.o.der) ? sub > 0 ? -1 : 1 : 0

    that.moveTo(that.curIndex + der, true)
  })
  if (that.o.drag) {
    ele.addEventListener('touchmove', function (e) {
      if (!that.status) {
        return 1
      }
      // e.preventDefault()
      if (that.movingFlag) {
        that.startX = e.targetTouches[0].pageX
        that.startY = e.targetTouches[0].pageY
        return 0
      }

      var y = e.changedTouches[0].pageY - that.startY
      if ((that.curIndex === 0 && y > 0) || (that.curIndex === that.pagesLength - 1 && y < 0)) y /= 2
      var x = e.changedTouches[0].pageX - that.startX
      if ((that.curIndex === 0 && x > 0) || (that.curIndex === that.pagesLength - 1 && x < 0)) x /= 2
      var dist = (that.o.dir === 'v' ? (-that.curIndex * that.height + y) : (-that.curIndex * that.width + x))
      ele.classList.remove(ANIM_CLASS)
      move(ele, that.o.dir, dist)
    })
  }

  window.addEventListener('orientationchange', function () {
    if (window.orientation === 180 || window.orientation === 0) {
      that.o.orientationchange('portrait')
    }
    if (window.orientation === 90 || window.orientation === -90) {
      that.o.orientationchange('landscape')
    }
  }, false)

  window.addEventListener('resize', function () {
    that.update()
  }, false)
}

Fullpage.prototype.holdTouch = function () {
  document.addEventListener('touchmove', touchmove)
}

Fullpage.prototype.unholdTouch = function () {
  document.removeEventListener('touchmove', touchmove)
}

Fullpage.prototype.start = function () {
  this.status = 1
  this.holdTouch()
}

Fullpage.prototype.stop = function () {
  this.status = 0
  this.unholdTouch()
}

Fullpage.prototype.getCurIndex = function () {
  return this.curIndex
}

Fullpage.prototype.moveTo = function (next, anim) {
  var that = this
  var ele = that.ele
  var cur = that.curIndex
  next = fix(next, that.pagesLength, that.o.loop)

  if (anim) {
    ele.classList.add(ANIM_CLASS)
  } else {
    ele.classList.remove(ANIM_CLASS)
  }

  if (next !== cur) {
    var flag = that.o.beforeChange({
      next: next,
      cur: cur
    })

    // beforeChange return false to stop scrolling
    if (flag === false) {
      return 1
    }
  }

  that.movingFlag = true
  that.curIndex = next
  move(ele, that.o.dir, -next * (that.o.dir === 'v' ? that.height : that.width))

  if (next !== cur) {
    that.o.change({
      prev: cur,
      cur: next
    })
  }

  window.setTimeout(function () {
    that.movingFlag = false
    if (next !== cur) {
      that.o.afterChange({
        prev: cur,
        cur: next
      })
      for (var i = 0; i < that.pageEles.length; i++) {
        var pageEle = that.pageEles[i]
        if (i === next) {
          pageEle.classList.add('cur')
        } else {
          pageEle.classList.remove('cur')
        }
      }
    }
  }, that.o.duration)
}

Fullpage.prototype.movePrev = function (anim) {
  this.moveTo(this.curIndex - 1, anim)
}

Fullpage.prototype.moveNext = function (anim) {
  this.moveTo(this.curIndex + 1, anim)
}

export default Fullpage


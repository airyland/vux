function Swiper (options) {
  this.version = '1.0.1'
  this._default = {
    container: '.swiper',
    item: '.item',
    direction: 'vertical',
    threshold: 50,
    duration: 300
  }
  this._options = extend(this._default, options)
  this._start = {}
  this._move = {}
  this._end = {}
  this._prev = 0
  this._current = 0
  this._offset = 0
  this._eventHandlers = {}

  this.$container = this._options.container.querySelector('.swiper')
  this.$items = this.$container.querySelectorAll(this._options.item)
  this.count = this.$items.length

  this._width = this.$container.offsetWidth
  this._height = this.$container.offsetHeight

  this._init()
  this._bind()
}

Swiper.prototype._init = function () {

  var width = this._width
  var height = this._height

  var w = width
  var h = height * this.count

  if (this._options.direction === 'horizontal') {
    w = width * this.count
    h = height
  }

  this.$container.style.width = w + 'px'
  this.$container.style.height = h + 'px'

  Array.prototype.forEach.call(this.$items, function ($item) {
    $item.style.width = width + 'px'
    $item.style.height = height + 'px'
  })
}

Swiper.prototype._bind = function () {
  var me = this

  this.$container.addEventListener('touchstart', function (e) {
    me._start.x = e.changedTouches[0].pageX
    me._start.y = e.changedTouches[0].pageY
  }, false)

  this.$container.addEventListener('touchmove', function (e) {
    me._move.x = e.changedTouches[0].pageX
    me._move.y = e.changedTouches[0].pageY

    var distance = me._move.y - me._start.y
    var transform = 'translate3d(0, ' + (distance - me._offset) + 'px, 0)'

    if (me._options.direction === 'horizontal') {
      distance = me._move.x - me._start.x
      transform = 'translate3d(' + (distance - me._offset) + 'px, 0, 0)'
    }

    me.$container.style['-webkit-transition'] = '0'
    me.$container.style.transition = '0'
    me.$container.style['-webkit-transform'] = transform
    me.$container.style.transform = transform

    e.preventDefault()
  }, false)

  this.$container.addEventListener('touchend', function (e) {
    me._end.x = e.changedTouches[0].pageX
    me._end.y = e.changedTouches[0].pageY
    var distance = me._end.y - me._start.y
    if (me._options.direction === 'horizontal') {
      distance = me._end.x - me._start.x
    }

    me._prev = me._current
    if (distance > me._options.threshold) {
      me._current = me._current === 0 ? 0 : --me._current
    } else if (distance < -me._options.threshold) {
      me._current = me._current < (me.count - 1) ? ++me._current : me._current
    }

    me._show(me._current)
  }, false)

  this.$container.addEventListener('transitionEnd', function (e) {
  }, false)

  this.$container.addEventListener('webkitTransitionEnd', function (e) {
    if (e.target !== me.$container) {
      return false
    }

    if (me._current !== me._prev) {
      var cb = me._eventHandlers.swiped
      if (cb) {
        cb.apply(me, [me._prev, me._current])
      }
    }

    e.preventDefault()
  }, false)
}

Swiper.prototype._show = function (index) {
  this._offset = index * this._height
  var transform = 'translate3d(0, -' + this._offset + 'px, 0)'

  if (this._options.direction === 'horizontal') {
    this._offset = index * this._width
    transform = 'translate3d(-' + this._offset + 'px, 0, 0)'
  }

  var duration = this._options.duration + 'ms'

  this.$container.style['-webkit-transition'] = duration
  this.$container.style.transition = duration
  this.$container.style['-webkit-transform'] = transform
  this.$container.style.transform = transform
}

Swiper.prototype.on = function (event, callback) {
  if (this._eventHandlers[event]) {
    console.error('event ' + event + ' is already register')
  }
  if (typeof callback !== 'function') {
    console.error('parameter callback must be a function')
  }

  this._eventHandlers[event] = callback

  return this
}

function extend (target, source) {
  for (var key in source) {
    target[key] = source[key]
  }
  return target
}

export default Swiper

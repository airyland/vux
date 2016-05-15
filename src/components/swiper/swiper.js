class Swiper {
  constructor (options) {
    this._default = {
      container: '.vux-swiper',
      item: '.vux-swiper-item',
      direction: 'vertical',
      activeClass: 'active',
      threshold: 50,
      duration: 300,
      auto: false,
      interval: 3000,
      height: 'auto',
      minMovingDistance: 0
    }
    this._options = extend(this._default, options)
    this._options.height = this._options.height.replace('px', '')
    this._start = {}
    this._move = {}
    this._end = {}
    this._eventHandlers = {}
    this._prev = this._current = this._offset = this._goto = 0
    this.$box = this._options.container
    this.$container = this._options.container.querySelector('.vux-swiper')
    this.$items = this.$container.querySelectorAll(this._options.item)
    this.count = this.$items.length
    if (!this.count) {
      return
    }

    this.timer = null
    this.updateItemWidth()
    this._init()
    this._auto()
    this._bind()
    this._onResize()
    return this
  }

  _auto () {
    let me = this
    me.stop()
    if (this._options.auto) {
      me.timer = setTimeout(() => {
        me.next()
      }, me._options.interval)
    }
  }

  updateItemWidth () {
    this._width = this.$box.offsetWidth
  }

  setStyle () {
    this._height = this._options.height === 'auto' ? 'auto' : this._options.height
    let width = this._width
    let height = this._height

    let w = width
    let h = height * this.count

    if (this._options.direction === 'horizontal') {
      w = width * this.count
      h = height
    }

    if (this._options.direction === 'vertical') {
      h = height * this.count
      this.$box.style.height = height + 'px'
    }

    this.$container.style.width = w + 'px'
    if (h > 0) {
      this.$container.style.height = h + 'px'
    }

    Array.prototype.forEach.call(this.$items, ($item, key) => {
      $item.style.width = width + 'px'
      if (height > 0) {
        $item.style.height = height + 'px'
      }
    })
  }

  _onResize () {
    this.resizeHandler = () => {
      setTimeout(() => {
        this.updateItemWidth()
        this.setStyle()
        this.next()
      }, 100)
    }
    window.addEventListener('orientationchange', this.resizeHandler, false)
  }

  stop () {
    this.timer && clearTimeout(this.timer)
  }

  _init () {
    this.setStyle()
    this._activate(this._current)
  }

  _bind () {
    let me = this
    this.touchstartHandler = (e) => {
      me.stop()
      me._start.x = e.changedTouches[0].pageX
      me._start.y = e.changedTouches[0].pageY

      me.$container.style['-webkit-transition'] = 'none'
      me.$container.style.transition = 'none'
    }

    this.touchmoveHandler = (e) => {
      me._move.x = e.changedTouches[0].pageX
      me._move.y = e.changedTouches[0].pageY

      let distance = me._move.y - me._start.y
      let transform = 'translate3d(0, ' + (distance - me._offset) + 'px, 0)'

      if (me._options.direction === 'horizontal') {
        distance = me._move.x - me._start.x
        transform = 'translate3d(' + (distance - me._offset) + 'px, 0, 0)'
      }

      if ((me._options.minMovingDistance && distance >= me._options.minMovingDistance) || !me._options.minMovingDistance) {
        me.$container.style['-webkit-transform'] = transform
        me.$container.style.transform = transform
      }

      e.preventDefault()
    }

    this.touchendHandler = (e) => {
      me._end.x = e.changedTouches[0].pageX
      me._end.y = e.changedTouches[0].pageY

      let distance = me._end.y - me._start.y
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
    }

    this.transitionEndHandler = (e) => {
      if (e.target !== me.$container) {
        return false
      }

      if (me._current !== me._prev || me._goto > -1) {
        me._activate(me._current)
        let cb = me._eventHandlers.swiped
        cb && cb.apply(me, [me._prev, me._current])
        me._goto = -1
      }

      if (me._options.auto) {
        me._auto()
      }

      e.preventDefault()
    }

    this.$container.addEventListener('touchstart', this.touchstartHandler, false)
    this.$container.addEventListener('touchmove', this.touchmoveHandler, false)
    this.$container.addEventListener('touchend', this.touchendHandler, false)
    this.$container.addEventListener('transitionEnd', (e) => {}, false)
    this.$container.addEventListener('webkitTransitionEnd', this.transitionEndHandler, false)
  }

  _show (index) {
    this._offset = index * this._height
    let transform = 'translate3d(0, -' + this._offset + 'px, 0)'

    if (this._options.direction === 'horizontal') {
      this._offset = index * this._width
      transform = 'translate3d(-' + this._offset + 'px, 0, 0)'
    }

    let duration = this._options.duration + 'ms'

    this.$container.style['-webkit-transition'] = duration
    this.$container.style.transition = duration
    this.$container.style['-webkit-transform'] = transform
    this.$container.style.transform = transform
  }

  _activate (index) {
    let clazz = this._options.activeClass
    Array.prototype.forEach.call(this.$items, ($item, key) => {
      $item.classList.remove(clazz)
      if (index === key) {
        $item.classList.add(clazz)
      }
    })
  }

  go (index) {
    if (index < 0 || index > this.count - 1 || index === this._current) {
      return
    }

    if (index === 0) {
      this._current = 0
      this._prev = 0
    } else {
      this._current = index
      this._prev = index - 1
    }

    this._goto = index
    this._show(this._current)

    return this
  }

  next () {
    if (this._current >= this.count - 1) {
      this._current = 0
      this._show(0)
      return this
    }
    this._prev = this._current
    this._show(++this._current)
    return this
  }

  on (event, callback) {
    if (this._eventHandlers[event]) {
      console.error('event ' + event + ' is already register')
    }
    if (typeof callback !== 'function') {
      console.error('parameter callback must be a function')
    }
    this._eventHandlers[event] = callback
    return this
  }

  _setTransfrom (x = 0) {
    this.$container.style['-webkit-transform'] = this.$container.style.transform = `translate3d(${x}px, 0, 0)`
  }

  destroy () {
    this.stop()
    this._current = 0
    this._setTransfrom(0)
    window.removeEventListener('orientationchange', this.resizeHandler, false)
    this.$container.removeEventListener('touchstart', this.touchstartHandler, false)
    this.$container.removeEventListener('touchmove', this.touchmoveHandler, false)
    this.$container.removeEventListener('touchend', this.touchendHandler, false)
    this.$container.removeEventListener('webkitTransitionEnd', this.transitionEndHandler, false)
  }

}

function extend (target, source) {
  for (let key in source) {
    target[key] = source[key]
  }
  return target
}

export default Swiper

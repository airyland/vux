import objectAssign from 'object-assign'
const arrayFrom = (nodeList) => Array.prototype.slice.call(nodeList)

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
      loop: false,
      interval: 3000,
      height: 'auto',
      minMovingDistance: 0
    }
    this._options = objectAssign(this._default, options)
    this._options.height = this._options.height.replace('px', '')
    this._start = {}
    this._move = {}
    this._end = {}
    this._eventHandlers = {}
    this._prev = this._current = this._goto = 0
    this._width = this._height = this._distance = 0
    this._offset = []
    this.$box = this._options.container
    this.$container = this._options.container.querySelector('.vux-swiper')
    this.$items = this.$container.querySelectorAll(this._options.item)
    this.count = this.$items.length
    this.realCount = this.$items.length // real items length
    this._position = [] // used by go event
    this._firstItemIndex = 0
    this._isMoved = false // used by minMovingDistance #2773
    if (!this.count) {
      return
    }
    this._init()
    this._auto()
    this._bind()
    this._onResize()
    return this
  }

  _auto () {
    const me = this
    me.stop()
    if (me._options.auto) {
      me.timer = setTimeout(() => {
        me.next()
      }, me._options.interval)
    }
  }

  updateItemWidth () {
    this._width = this.$box.offsetWidth || document.documentElement.offsetWidth
    this._distance = this._options.direction === 'horizontal' ? this._width : this._height
  }

  stop () {
    this.timer && clearTimeout(this.timer)
  }

  _loop () {
    return this._options.loop && this.realCount >= 3
  }

  _onResize () {
    const me = this
    this.resizeHandler = () => {
      setTimeout(() => {
        me.updateItemWidth()
        me._setOffset()
        me._setTransform()
      }, 100)
    }
    window.addEventListener('orientationchange', this.resizeHandler, false)
  }

  _init () {
    this._height = this._options.height === 'auto' ? 'auto' : this._options.height - 0
    this.updateItemWidth()
    this._initPosition()
    this._activate(this._current)
    this._setOffset()
    this._setTransform()
    if (this._loop()) {
      this._loopRender()
    }
  }

  _initPosition () {
    for (let i = 0; i < this.realCount; i++) {
      this._position.push(i)
    }
  }

  _movePosition (position) {
    const me = this
    if (position > 0) {
      let firstIndex = me._position.splice(0, 1)
      me._position.push(firstIndex[0])
    } else if (position < 0) {
      let lastIndex = me._position.pop()
      me._position.unshift(lastIndex)
    }
  }

  _setOffset () {
    let me = this
    let index = me._position.indexOf(me._current)
    me._offset = []
    arrayFrom(me.$items).forEach(function ($item, key) {
      me._offset.push((key - index) * me._distance)
    })
  }

  _setTransition (duration) {
    duration = duration || (this._options.duration || 'none')
    let transition = duration === 'none' ? 'none' : duration + 'ms'
    arrayFrom(this.$items).forEach(function ($item, key) {
      $item.style.webkitTransition = transition
      $item.style.transition = transition
    })
  }

  _setTransform (offset) {
    const me = this
    offset = offset || 0
    arrayFrom(me.$items).forEach(function ($item, key) {
      let distance = me._offset[key] + offset
      let transform = `translate3d(${distance}px, 0, 0)`
      if (me._options.direction === 'vertical') {
        transform = `translate3d(0, ${distance}px, 0)`
      }
      $item.style.webkitTransform = transform
      $item.style.transform = transform
      me._isMoved = true
    })
  }

  _bind () {
    const me = this
    me.touchstartHandler = (e) => {
      me.stop()
      me._start.x = e.changedTouches[0].pageX
      me._start.y = e.changedTouches[0].pageY
      me._setTransition('none')
      me._isMoved = false
    }
    me.touchmoveHandler = (e) => {
      if (me.count === 1) {
        return
      }
      me._move.x = e.changedTouches[0].pageX
      me._move.y = e.changedTouches[0].pageY
      let distanceX = me._move.x - me._start.x
      let distanceY = me._move.y - me._start.y
      let distance = distanceY
      let noScrollerY = Math.abs(distanceX) > Math.abs(distanceY)
      if (me._options.direction === 'horizontal' && noScrollerY) {
        distance = distanceX
      }
      /* set shorter distance for first and last item for better experience */
      if (!this._options.loop && (this._current === this.count - 1 || this._current === 0)) {
        distance = distance / 3
      }
      if ((((me._options.minMovingDistance && Math.abs(distance) >= me._options.minMovingDistance) || !me._options.minMovingDistance) && noScrollerY) || me._isMoved) {
        me._setTransform(distance)
      }

      noScrollerY && e.preventDefault()
    }

    me.touchendHandler = (e) => {
      if (me.count === 1) {
        return
      }
      me._end.x = e.changedTouches[0].pageX
      me._end.y = e.changedTouches[0].pageY

      let distance = me._end.y - me._start.y
      if (me._options.direction === 'horizontal') {
        distance = me._end.x - me._start.x
      }

      distance = me.getDistance(distance)
      if (distance !== 0 && me._options.minMovingDistance && Math.abs(distance) < me._options.minMovingDistance && !me._isMoved) {
        return
      }
      if (distance > me._options.threshold) {
        me.move(-1)
      } else if (distance < -me._options.threshold) {
        me.move(1)
      } else {
        me.move(0)
      }

      me._loopRender()
    }

    me.transitionEndHandler = (e) => {
      me._activate(me._current)
      let cb = me._eventHandlers.swiped
      cb && cb.apply(me, [me._prev % me.count, me._current % me.count])
      me._auto()
      me._loopRender()
      e.preventDefault()
    }
    me.$container.addEventListener('touchstart', me.touchstartHandler, false)
    me.$container.addEventListener('touchmove', me.touchmoveHandler, false)
    me.$container.addEventListener('touchend', me.touchendHandler, false)
    me.$items[1] && me.$items[1].addEventListener('webkitTransitionEnd', me.transitionEndHandler, false)
  }

  _loopRender () {
    const me = this
    if (me._loop()) {
      // issue #507 (delete cloneNode)
      if (me._offset[me._offset.length - 1] === 0) {
        me.$container.appendChild(me.$items[0])
        me._loopEvent(1)
      } else if (me._offset[0] === 0) {
        me.$container.insertBefore(me.$items[me.$items.length - 1], me.$container.firstChild)
        me._loopEvent(-1)
      }
    }
  }

  _loopEvent (num) {
    const me = this
    me._itemDestoy()
    me.$items = me.$container.querySelectorAll(me._options.item)
    me.$items[1] && me.$items[1].addEventListener('webkitTransitionEnd', me.transitionEndHandler, false)
    me._movePosition(num)
    me._setOffset()
    me._setTransform()
  }

  getDistance (distance) {
    if (this._loop()) {
      return distance
    } else {
      if (distance > 0 && this._current === 0) {
        return 0
      } else if (distance < 0 && this._current === this.realCount - 1) {
        return 0
      } else {
        return distance
      }
    }
  }

  _moveIndex (num) {
    if (num !== 0) {
      this._prev = this._current
      this._current += this.realCount
      this._current += num
      this._current %= this.realCount
    }
  }

  _activate (index) {
    let clazz = this._options.activeClass
    Array.prototype.forEach.call(this.$items, ($item, key) => {
      $item.classList.remove(clazz)
      if (index === Number($item.dataset.index)) {
        $item.classList.add(clazz)
      }
    })
  }

  go (index) {
    const me = this
    me.stop()

    index = index || 0
    index += this.realCount
    index = index % this.realCount
    index = this._position.indexOf(index) - this._position.indexOf(this._current)

    me._moveIndex(index)
    me._setOffset()
    me._setTransition()
    me._setTransform()
    me._auto()
    return this
  }

  next () {
    this.move(1)
    return this
  }

  move (num) {
    this.go(this._current + num)
    return this
  }

  on (event, callback) {
    if (this._eventHandlers[event]) {
      console.error(`[swiper] event ${event} is already register`)
    }
    if (typeof callback !== 'function') {
      console.error('[swiper] parameter callback must be a function')
    }
    this._eventHandlers[event] = callback
    return this
  }

  _itemDestoy () {
    this.$items.length && arrayFrom(this.$items).forEach(item => {
      item.removeEventListener('webkitTransitionEnd', this.transitionEndHandler, false)
    })
  }

  destroy () {
    this.stop()
    this._current = 0
    this._setTransform(0)
    window.removeEventListener('orientationchange', this.resizeHandler, false)
    this.$container.removeEventListener('touchstart', this.touchstartHandler, false)
    this.$container.removeEventListener('touchmove', this.touchmoveHandler, false)
    this.$container.removeEventListener('touchend', this.touchendHandler, false)
    this._itemDestoy()
    // remove clone item (used by loop only 2)
    if (this._options.loop && this.count === 2) {
      let $item = this.$container.querySelector(`${this._options.item}-clone`)
      $item && this.$container.removeChild($item)
      $item = this.$container.querySelector(`${this._options.item}-clone`)
      $item && this.$container.removeChild($item)
    }
  }
}

export default Swiper

import arrayFrom from 'array-from'
import objectAssign from 'object-assign'

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
    this._position = [] // used by go event
    this._firstItemIndex = 0
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
    this._width = this.$box.offsetWidth
    this._distance = this._options.direction === 'horizontal' ? this._width : this._height
  }

  stop () {
    this.timer && clearTimeout(this.timer)
  }

  _loop () {
    return this._options.loop && this.count >= 3
  }

  _onResize () {
    const me = this
    this.resizeHandler = () => {
      setTimeout(() => {
        me.updateItemWidth()
        let firstItemIndex = me._getZeroIndexByPosition()
        me._initOffset(firstItemIndex)
        me._setTransfrom()
      }, 100)
    }
    window.addEventListener('orientationchange', this.resizeHandler, false)
  }

  _init () {
    this._height = this._options.height === 'auto' ? 'auto' : this._options.height - 0
    this.updateItemWidth()
    this._initPosition()
    this._activate(this._current)
    this._initOffset()
    this._setTransfrom()
    if (this._loop()) {
      this._loopRender()
    }
  }

  _initPosition () {
    for (let i = 0; i < this.count; i++) {
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

  _initOffset (position) {
    position = position || 0
    for (let i = 0; i < this.count; i++) {
      this._offset[i] = (i - position) * this._distance
    }
  }

  _moveOffset (position) {
    position = position || 0
    for (let i = 0; i < this.count; i++) {
      this._offset[i] = this._offset[i] + position * this._distance
    }
  }

  _setTransition (duration) {
    duration = duration || (this._options.duration || 'none')
    let transition = duration === 'none' ? 'none' : duration + 'ms'
    arrayFrom(this.$items).forEach(function ($item, key) {
      $item.style.webkitTransition = transition
      $item.style.transition = transition
    })
  }

  _setTransfrom (offset) {
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
    })
  }

  _bind () {
    const me = this
    me.touchstartHandler = (e) => {
      me.stop()
      me._start.x = e.changedTouches[0].pageX
      me._start.y = e.changedTouches[0].pageY
      me._setTransition('none')
    }
    me.touchmoveHandler = (e) => {
      me._move.x = e.changedTouches[0].pageX
      me._move.y = e.changedTouches[0].pageY
      let distanceX = me._move.x - me._start.x
      let distanceY = me._move.y - me._start.y
      let distance = distanceY
      let noScrollerY = Math.abs(distanceX) > Math.abs(distanceY)
      if (me._options.direction === 'horizontal' && noScrollerY) {
        distance = distanceX
      }
      if (((me._options.minMovingDistance && distance >= me._options.minMovingDistance) || !me._options.minMovingDistance) && noScrollerY) {
        me._setTransfrom(distance)
      }

      noScrollerY && e.preventDefault()
    }

    me.touchendHandler = (e) => {
      me._end.x = e.changedTouches[0].pageX
      me._end.y = e.changedTouches[0].pageY

      let distance = me._end.y - me._start.y
      if (me._options.direction === 'horizontal') {
        distance = me._end.x - me._start.x
      }

      distance = me.getDistance(distance)
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
      cb && cb.apply(me, [me._prev, me._current])
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
      if (me._offset[me._offset.length - 1] === 0) {
        let firstChild = me.$items[0].cloneNode(true)
        me.$container.appendChild(firstChild)
        me.$container.removeChild(me.$items[0])
        me._loopEvent(1)
      } else if (me._offset[0] === 0) {
        let lastChild = me.$items[me.$items.length - 1].cloneNode(true)
        me.$container.insertBefore(lastChild, me.$container.firstChild)
        me.$container.removeChild(me.$items[me.$items.length - 1])
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
    me._moveOffset(num)
    me._setTransfrom()
  }

  getDistance (distance) {
    if (this._loop()) {
      return distance
    } else {
      if (distance > 0 && this._current === 0) {
        return 0
      } else if (distance < 0 && this._current === this.count - 1) {
        return 0
      } else {
        return distance
      }
    }
  }

  _moveIndex (num) {
    this._prev = this._current
    this._current += num
    this._current %= this.count
    this._current = this._current < 0 ? this.count + this._current : this._current
  }

  _activate (index) {
    let clazz = this._options.activeClass
    Array.prototype.forEach.call(this.$items, ($item, key) => {
      $item.classList.remove(clazz)
      if (index === this._position[key]) {
        $item.classList.add(clazz)
      }
    })
  }

  _getZeroIndexByPosition () {
    for (let i = 0; i < this._position.length; i++) {
      if (this._position[i] === 0) {
        return i
      } else if (i === this._position.length - 1) {
        return -1
      }
    }
  }

  _goOffset (index) {
    index = index || 0
    index = index % this.count
    const me = this
    let firstItemIndex = me._getZeroIndexByPosition()
    for (let i = 0; i < me._offset.length; i++) {
      if (me._offset[i] === 0) {
        return firstItemIndex - i
      }
    }
  }

  go (index) {
    const me = this
    me.stop()
    if (me._loop()) {
      let goOffset = me._goOffset(index)
      me._moveOffset(-goOffset)
      me._moveIndex(goOffset)
      me._setTransition()
      me._setTransfrom()
    } else {
      if (index < 0 || index > me.count - 1 || index === me._current) {
        return
      }

      me._prev = me._current
      me._current = index

      let distance = -(index - me._prev) * me._distance
      for (let i = 0; i < me._offset.length; i++) {
        me._offset[i] = me._offset[i] + distance
      }
      me._setTransition()
      me._setTransfrom()
    }
    me._auto()
    return this
  }

  next () {
    const me = this
    if (me._loop()) {
      me.move(1)
    } else {
      let index = me._current
      index = index === me.count - 1 ? 0 : index + 1
      me.go(index)
    }
    return this
  }

  move (num, noAnimate) {
    const me = this
    me._moveOffset(-num)
    me._movePosition(-num)
    me._moveIndex(num)
    me._setTransition(!noAnimate ? undefined : 'none')
    me._setTransfrom()
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
    for (let item of this.$items) {
      item.removeEventListener('webkitTransitionEnd', this.transitionEndHandler, false)
    }
  }
  destroy () {
    this.stop()
    this._current = 0
    this._setTransfrom(0)
    window.removeEventListener('orientationchange', this.resizeHandler, false)
    this.$container.removeEventListener('touchstart', this.touchstartHandler, false)
    this.$container.removeEventListener('touchmove', this.touchmoveHandler, false)
    this.$container.removeEventListener('touchend', this.touchendHandler, false)
    this._itemDestoy()
  }
}

export default Swiper

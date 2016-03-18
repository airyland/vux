
/**
 * dependencies.
 */

var emitter = require('./emitter')
var event = require('./event')

/**
 * export `Mouse`
 */

module.exports = function (el, obj) {
  return new Mouse(el, obj)
}

/**
 * initialize new `Mouse`.
 *
 * @param {Element} el
 * @param {Object} obj
 */

function Mouse (el, obj) {
  this.obj = obj || {}
  this.el = el
}

/**
 * mixin emitter.
 */

emitter(Mouse.prototype)

/**
 * bind mouse.
 *
 * @return {Mouse}
 */

Mouse.prototype.bind = function () {
  var obj = this.obj
  var self = this

  // up
  function up (e) {
    obj.onmouseup && obj.onmouseup(e)
    event.unbind(document, 'mousemove', move)
    event.unbind(document, 'mouseup', up)
    self.emit('up', e)
  }

  // move
  function move (e) {
    obj.onmousemove && obj.onmousemove(e)
    self.emit('move', e)
  }

  // down
  self.down = function (e) {
    obj.onmousedown && obj.onmousedown(e)
    event.bind(document, 'mouseup', up)
    event.bind(document, 'mousemove', move)
    self.emit('down', e)
  }

  // bind all.
  event.bind(this.el, 'mousedown', self.down)

  return this
}

/**
 * unbind mouse.
 *
 * @return {Mouse}
 */

Mouse.prototype.unbind = function () {
  event.unbind(this.el, 'mousedown', this.down)
  this.down = null
}

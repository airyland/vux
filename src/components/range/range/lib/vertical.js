/**
 * External dependencies.
 *
 */

var inherits = require('./lib/super')
var classes = require('./lib/classes')
var closest = require('./lib/closest-num')
var percentage = require('./lib/percentage-calc')

/**
 * Require main class.
 */

var Powerange = require('./main')

/**
 * Expose `Vertical`.
 */

module.exports = Vertical

/**
 * Create vertical slider object.
 *
 * @api public
 */

function Vertical () {
  Powerange.apply(this, arguments)
  classes(this.slider).add('vertical')
  if (this.options.step) this.step(this.slider.offsetHeight, this.handle.offsetHeight)
  this.setStart(this.options.start)
}

/**
 * Inherit the main class.
 */

inherits(Vertical, Powerange)

/**
 * Set vertical slider position.
 *
 * @param {Number} start
 * @api private
 */

Vertical.prototype.setStart = function (start) {
  var begin = (start === null) ? this.options.min : start
  var part = percentage.from(begin - this.options.min, this.options.max - this.options.min) || 0
  var offset = percentage.of(part, this.slider.offsetHeight - this.handle.offsetHeight)
  var position = (this.options.step) ? closest.find(offset, this.steps) : offset

  this.setPosition(position)
  this.setValue(this.handle.style.bottom, this.slider.offsetHeight - this.handle.offsetHeight)
}

/**
 * Set vertical slider current position.
 *
 * @param {Number} val
 * @api private
 */

Vertical.prototype.setPosition = function (val) {
  this.handle.style.bottom = val + 'px'
  this.slider.querySelector('.range-quantity').style.height = val + 'px'
}

/**
 * On mouse down.
 *
 * @param {Object} e
 * @api private
 */

Vertical.prototype.onmousedown = function (e) {
  if (e.touches) e = e.touches[0]
  this.startY = e.clientY
  this.handleOffsetY = this.slider.offsetHeight - this.handle.offsetHeight - this.handle.offsetTop
  this.restrictHandleY = this.slider.offsetHeight - this.handle.offsetHeight
  this.unselectable(this.slider, true)
}

/**
 * On vertical slider mouse move.
 *
 * @param {Object} e
 * @api private
 */

Vertical.prototype.onmousemove = function (e) {
  e.preventDefault()
  if (e.touches) e = e.touches[0]

  var bottomOffset = this.handleOffsetY + this.startY - e.clientY
  var position = (this.steps) ? closest.find(bottomOffset, this.steps) : bottomOffset

  if (bottomOffset <= 0) {
    this.setPosition(0)
  } else if (bottomOffset >= this.restrictHandleY) {
    this.setPosition(this.restrictHandleY)
  } else {
    this.setPosition(position)
  }

  this.setValue(this.handle.style.bottom, this.slider.offsetHeight - this.handle.offsetHeight)
}

/**
 * On mouse up.
 *
 * @param {Object} e
 * @api private
 */

Vertical.prototype.onmouseup = function (e) {
  this.unselectable(this.slider, false)
}

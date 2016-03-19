/**
 * External dependencies.
 *
 */

var inherits = require('./lib/super')
var closest = require('./lib/closest-num')
var percentage = require('./lib/percentage-calc')

/**
 * Require main class.
 */

var Powerange = require('./main')

/**
 * Expose `Horizontal`.
 */

module.exports = Horizontal

/**
 * Create horizontal slider object.
 *
 * @api public
 */

function Horizontal () {
  Powerange.apply(this, arguments)
  if (this.options.step) this.step(this.slider.offsetWidth, this.handle.offsetWidth)
  this.setStart(this.options.start)
}

/**
 * Inherit the main class.
 */

inherits(Horizontal, Powerange)

/**
 * Set horizontal slider position.
 *
 * @param {Number} start
 * @api private
 */

Horizontal.prototype.setStart = function (start) {
  var begin = (start === null) ? this.options.min : start
  var part = percentage.from(begin - this.options.min, this.options.max - this.options.min) || 0
  var offset = percentage.of(part, this.slider.offsetWidth - this.handle.offsetWidth)
  var position = (this.options.step) ? closest.find(offset, this.steps) : offset

  this.setPosition(position)
  this.setValue(this.handle.style.left, this.slider.offsetWidth - this.handle.offsetWidth)
}

/**
 * Set horizontal slider current position.
 *
 * @param {Number} val
 * @api private
 */

Horizontal.prototype.setPosition = function (val) {
  this.handle.style.left = val + 'px'
  this.slider.querySelector('.range-quantity').style.width = val + 'px'
}

/**
 * On slider mouse down.
 *
 * @param {Object} e
 * @api private
 */

Horizontal.prototype.onmousedown = function (e) {
  if (e.touches) e = e.touches[0]
  this.startX = e.clientX
  this.handleOffsetX = this.handle.offsetLeft
  this.restrictHandleX = this.slider.offsetWidth - this.handle.offsetWidth
  this.unselectable(this.slider, true)
}

/**
 * On slider mouse move.
 *
 * @param {Object} e
 * @api private
 */

Horizontal.prototype.onmousemove = function (e) {
  e.preventDefault()
  if (e.touches) e = e.touches[0]

  var leftOffset = this.handleOffsetX + e.clientX - this.startX
  var position = (this.steps) ? closest.find(leftOffset, this.steps) : leftOffset

  if (leftOffset <= 0) {
    this.setPosition(0)
  } else if (leftOffset >= this.restrictHandleX) {
    this.setPosition(this.restrictHandleX)
  } else {
    this.setPosition(position)
  }

  this.setValue(this.handle.style.left, this.slider.offsetWidth - this.handle.offsetWidth)
}

/**
 * On mouse up.
 *
 * @param {Object} e
 * @api private
 */

Horizontal.prototype.onmouseup = function (e) {
  this.unselectable(this.slider, false)
}

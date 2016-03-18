/**
 * Module dependencies.
 */

var events = require('./event')
var delegate = require('./delegate')

/**
 * Expose `Events`.
 */

module.exports = Events

/**
 * Initialize an `Events` with the given
 * `el` object which events will be bound to,
 * and the `obj` which will receive method calls.
 *
 * @param {Object} el
 * @param {Object} obj
 * @api public
 */

function Events (el, obj) {
  if (!(this instanceof Events)) return new Events(el, obj)
  if (!el) throw new Error('element required')
  if (!obj) throw new Error('object required')
  this.el = el
  this.obj = obj
  this._events = {}
}

/**
 * Subscription helper.
 */

Events.prototype.sub = function (event, method, cb) {
  this._events[event] = this._events[event] || {}
  this._events[event][method] = cb
}

/**
 * Bind to `event` with optional `method` name.
 * When `method` is undefined it becomes `event`
 * with the "on" prefix.
 *
 * Examples:
 *
 *  Direct event handling:
 *
 *    events.bind('click') // implies "onclick"
 *    events.bind('click', 'remove')
 *    events.bind('click', 'sort', 'asc')
 *
 *  Delegated event handling:
 *
 *    events.bind('click li > a')
 *    events.bind('click li > a', 'remove')
 *    events.bind('click a.sort-ascending', 'sort', 'asc')
 *    events.bind('click a.sort-descending', 'sort', 'desc')
 *
 * @param {String} event
 * @param {String|function} [method]
 * @return {Function} callback
 * @api public
 */

Events.prototype.bind = function (event, method) {
  var e = parse(event)
  var el = this.el
  var obj = this.obj
  var name = e.name
  method = method || 'on' + name
  var args = [].slice.call(arguments, 2)

  // callback
  var cb = function () {
    var a = [].slice.call(arguments).concat(args)
    obj[method].apply(obj, a)
  }

  // bind
  if (e.selector) {
    cb = delegate.bind(el, e.selector, name, cb)
  } else {
    events.bind(el, name, cb)
  }

  // subscription for unbinding
  this.sub(name, method, cb)

  return cb
}

/**
 * Unbind a single binding, all bindings for `event`,
 * or all bindings within the manager.
 *
 * Examples:
 *
 *  Unbind direct handlers:
 *
 *     events.unbind('click', 'remove')
 *     events.unbind('click')
 *     events.unbind()
 *
 * Unbind delegate handlers:
 *
 *     events.unbind('click', 'remove')
 *     events.unbind('click')
 *     events.unbind()
 *
 * @param {String|Function} [event]
 * @param {String|Function} [method]
 * @api public
 */

Events.prototype.unbind = function (event, method) {
  if (arguments.length === 0) return this.unbindAll()
  if (arguments.length === 1) return this.unbindAllOf(event)

  // no bindings for this event
  var bindings = this._events[event]
  if (!bindings) return

  // no bindings for this method
  var cb = bindings[method]
  if (!cb) return

  events.unbind(this.el, event, cb)
}

/**
 * Unbind all events.
 *
 * @api private
 */

Events.prototype.unbindAll = function () {
  for (var event in this._events) {
    this.unbindAllOf(event)
  }
}

/**
 * Unbind all events for `event`.
 *
 * @param {String} event
 * @api private
 */

Events.prototype.unbindAllOf = function (event) {
  var bindings = this._events[event]
  if (!bindings) return

  for (var method in bindings) {
    this.unbind(event, method)
  }
}

/**
 * Parse `event`.
 *
 * @param {String} event
 * @return {Object}
 * @api private
 */

function parse (event) {
  var parts = event.split(/ +/)
  return {
    name: parts.shift(),
    selector: parts.join(' ')
  }
}

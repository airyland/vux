;(function(){

/**
 * Require the given path.
 *
 * @param {String} path
 * @return {Object} exports
 * @api public
 */

function require(path, parent, orig) {
  var resolved = require.resolve(path);

  // lookup failed
  if (null == resolved) {
    orig = orig || path;
    parent = parent || 'root';
    var err = new Error('Failed to require "' + orig + '" from "' + parent + '"');
    err.path = orig;
    err.parent = parent;
    err.require = true;
    throw err;
  }

  var module = require.modules[resolved];

  // perform real require()
  // by invoking the module's
  // registered function
  if (!module._resolving && !module.exports) {
    var mod = {};
    mod.exports = {};
    mod.client = mod.component = true;
    module._resolving = true;
    module.call(this, mod.exports, require.relative(resolved), mod);
    delete module._resolving;
    module.exports = mod.exports;
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Registered aliases.
 */

require.aliases = {};

/**
 * Resolve `path`.
 *
 * Lookup:
 *
 *   - PATH/index.js
 *   - PATH.js
 *   - PATH
 *
 * @param {String} path
 * @return {String} path or null
 * @api private
 */

require.resolve = function(path) {
  if (path.charAt(0) === '/') path = path.slice(1);

  var paths = [
    path,
    path + '.js',
    path + '.json',
    path + '/index.js',
    path + '/index.json'
  ];

  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    if (require.modules.hasOwnProperty(path)) return path;
    if (require.aliases.hasOwnProperty(path)) return require.aliases[path];
  }
};

/**
 * Normalize `path` relative to the current path.
 *
 * @param {String} curr
 * @param {String} path
 * @return {String}
 * @api private
 */

require.normalize = function(curr, path) {
  var segs = [];

  if ('.' != path.charAt(0)) return path;

  curr = curr.split('/');
  path = path.split('/');

  for (var i = 0; i < path.length; ++i) {
    if ('..' == path[i]) {
      curr.pop();
    } else if ('.' != path[i] && '' != path[i]) {
      segs.push(path[i]);
    }
  }

  return curr.concat(segs).join('/');
};

/**
 * Register module at `path` with callback `definition`.
 *
 * @param {String} path
 * @param {Function} definition
 * @api private
 */

require.register = function(path, definition) {
  require.modules[path] = definition;
};

/**
 * Alias a module definition.
 *
 * @param {String} from
 * @param {String} to
 * @api private
 */

require.alias = function(from, to) {
  if (!require.modules.hasOwnProperty(from)) {
    throw new Error('Failed to alias "' + from + '", it does not exist');
  }
  require.aliases[to] = from;
};

/**
 * Return a require function relative to the `parent` path.
 *
 * @param {String} parent
 * @return {Function}
 * @api private
 */

require.relative = function(parent) {
  var p = require.normalize(parent, '..');

  /**
   * lastIndexOf helper.
   */

  function lastIndexOf(arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) return i;
    }
    return -1;
  }

  /**
   * The relative require() itself.
   */

  function localRequire(path) {
    var resolved = localRequire.resolve(path);
    return require(resolved, parent, path);
  }

  /**
   * Resolve relative to the parent.
   */

  localRequire.resolve = function(path) {
    var c = path.charAt(0);
    if ('/' == c) return path.slice(1);
    if ('.' == c) return require.normalize(p, path);

    // resolve deps by returning
    // the dep in the nearest "deps"
    // directory
    var segs = parent.split('/');
    var i = lastIndexOf(segs, 'deps') + 1;
    if (!i) i = 0;
    path = segs.slice(0, i + 1).join('/') + '/deps/' + path;
    return path;
  };

  /**
   * Check if module is defined at `path`.
   */

  localRequire.exists = function(path) {
    return require.modules.hasOwnProperty(localRequire.resolve(path));
  };

  return localRequire;
};
require.register("component-event/index.js", function(exports, require, module){
var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
    unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
    prefix = bind !== 'addEventListener' ? 'on' : '';

/**
 * Bind `el` event `type` to `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.bind = function(el, type, fn, capture){
  el[bind](prefix + type, fn, capture || false);
  return fn;
};

/**
 * Unbind `el` event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.unbind = function(el, type, fn, capture){
  el[unbind](prefix + type, fn, capture || false);
  return fn;
};
});
require.register("component-query/index.js", function(exports, require, module){
function one(selector, el) {
  return el.querySelector(selector);
}

exports = module.exports = function(selector, el){
  el = el || document;
  return one(selector, el);
};

exports.all = function(selector, el){
  el = el || document;
  return el.querySelectorAll(selector);
};

exports.engine = function(obj){
  if (!obj.one) throw new Error('.one callback required');
  if (!obj.all) throw new Error('.all callback required');
  one = obj.one;
  exports.all = obj.all;
  return exports;
};

});
require.register("component-matches-selector/index.js", function(exports, require, module){
/**
 * Module dependencies.
 */

var query = require('query');

/**
 * Element prototype.
 */

var proto = Element.prototype;

/**
 * Vendor function.
 */

var vendor = proto.matches
  || proto.webkitMatchesSelector
  || proto.mozMatchesSelector
  || proto.msMatchesSelector
  || proto.oMatchesSelector;

/**
 * Expose `match()`.
 */

module.exports = match;

/**
 * Match `el` to `selector`.
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */

function match(el, selector) {
  if (vendor) return vendor.call(el, selector);
  var nodes = query.all(selector, el.parentNode);
  for (var i = 0; i < nodes.length; ++i) {
    if (nodes[i] == el) return true;
  }
  return false;
}

});
require.register("discore-closest/index.js", function(exports, require, module){
var matches = require('matches-selector')

module.exports = function (element, selector, checkYoSelf, root) {
  element = checkYoSelf ? {parentNode: element} : element

  root = root || document

  // Make sure `element !== document` and `element != null`
  // otherwise we get an illegal invocation
  while ((element = element.parentNode) && element !== document) {
    if (matches(element, selector))
      return element
    // After `matches` on the edge case that
    // the selector matches the root
    // (when the root is not the document)
    if (element === root)
      return  
  }
}
});
require.register("component-delegate/index.js", function(exports, require, module){
/**
 * Module dependencies.
 */

var closest = require('closest')
  , event = require('event');

/**
 * Delegate event `type` to `selector`
 * and invoke `fn(e)`. A callback function
 * is returned which may be passed to `.unbind()`.
 *
 * @param {Element} el
 * @param {String} selector
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.bind = function(el, selector, type, fn, capture){
  return event.bind(el, type, function(e){
    var target = e.target || e.srcElement;
    e.delegateTarget = closest(target, selector, true, el);
    if (e.delegateTarget) fn.call(el, e);
  }, capture);
};

/**
 * Unbind event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @api public
 */

exports.unbind = function(el, type, fn, capture){
  event.unbind(el, type, fn, capture);
};

});
require.register("component-events/index.js", function(exports, require, module){

/**
 * Module dependencies.
 */

var events = require('event');
var delegate = require('delegate');

/**
 * Expose `Events`.
 */

module.exports = Events;

/**
 * Initialize an `Events` with the given
 * `el` object which events will be bound to,
 * and the `obj` which will receive method calls.
 *
 * @param {Object} el
 * @param {Object} obj
 * @api public
 */

function Events(el, obj) {
  if (!(this instanceof Events)) return new Events(el, obj);
  if (!el) throw new Error('element required');
  if (!obj) throw new Error('object required');
  this.el = el;
  this.obj = obj;
  this._events = {};
}

/**
 * Subscription helper.
 */

Events.prototype.sub = function(event, method, cb){
  this._events[event] = this._events[event] || {};
  this._events[event][method] = cb;
};

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

Events.prototype.bind = function(event, method){
  var e = parse(event);
  var el = this.el;
  var obj = this.obj;
  var name = e.name;
  var method = method || 'on' + name;
  var args = [].slice.call(arguments, 2);

  // callback
  function cb(){
    var a = [].slice.call(arguments).concat(args);
    obj[method].apply(obj, a);
  }

  // bind
  if (e.selector) {
    cb = delegate.bind(el, e.selector, name, cb);
  } else {
    events.bind(el, name, cb);
  }

  // subscription for unbinding
  this.sub(name, method, cb);

  return cb;
};

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

Events.prototype.unbind = function(event, method){
  if (0 == arguments.length) return this.unbindAll();
  if (1 == arguments.length) return this.unbindAllOf(event);

  // no bindings for this event
  var bindings = this._events[event];
  if (!bindings) return;

  // no bindings for this method
  var cb = bindings[method];
  if (!cb) return;

  events.unbind(this.el, event, cb);
};

/**
 * Unbind all events.
 *
 * @api private
 */

Events.prototype.unbindAll = function(){
  for (var event in this._events) {
    this.unbindAllOf(event);
  }
};

/**
 * Unbind all events for `event`.
 *
 * @param {String} event
 * @api private
 */

Events.prototype.unbindAllOf = function(event){
  var bindings = this._events[event];
  if (!bindings) return;

  for (var method in bindings) {
    this.unbind(event, method);
  }
};

/**
 * Parse `event`.
 *
 * @param {String} event
 * @return {Object}
 * @api private
 */

function parse(event) {
  var parts = event.split(/ +/);
  return {
    name: parts.shift(),
    selector: parts.join(' ')
  }
}

});
require.register("component-indexof/index.js", function(exports, require, module){
module.exports = function(arr, obj){
  if (arr.indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};

});
require.register("component-classes/index.js", function(exports, require, module){
/**
 * Module dependencies.
 */

var index = require('indexof');

/**
 * Whitespace regexp.
 */

var re = /\s+/;

/**
 * toString reference.
 */

var toString = Object.prototype.toString;

/**
 * Wrap `el` in a `ClassList`.
 *
 * @param {Element} el
 * @return {ClassList}
 * @api public
 */

module.exports = function(el){
  return new ClassList(el);
};

/**
 * Initialize a new ClassList for `el`.
 *
 * @param {Element} el
 * @api private
 */

function ClassList(el) {
  if (!el) throw new Error('A DOM element reference is required');
  this.el = el;
  this.list = el.classList;
}

/**
 * Add class `name` if not already present.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.add = function(name){
  // classList
  if (this.list) {
    this.list.add(name);
    return this;
  }

  // fallback
  var arr = this.array();
  var i = index(arr, name);
  if (!~i) arr.push(name);
  this.el.className = arr.join(' ');
  return this;
};

/**
 * Remove class `name` when present, or
 * pass a regular expression to remove
 * any which match.
 *
 * @param {String|RegExp} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.remove = function(name){
  if ('[object RegExp]' == toString.call(name)) {
    return this.removeMatching(name);
  }

  // classList
  if (this.list) {
    this.list.remove(name);
    return this;
  }

  // fallback
  var arr = this.array();
  var i = index(arr, name);
  if (~i) arr.splice(i, 1);
  this.el.className = arr.join(' ');
  return this;
};

/**
 * Remove all classes matching `re`.
 *
 * @param {RegExp} re
 * @return {ClassList}
 * @api private
 */

ClassList.prototype.removeMatching = function(re){
  var arr = this.array();
  for (var i = 0; i < arr.length; i++) {
    if (re.test(arr[i])) {
      this.remove(arr[i]);
    }
  }
  return this;
};

/**
 * Toggle class `name`, can force state via `force`.
 *
 * For browsers that support classList, but do not support `force` yet,
 * the mistake will be detected and corrected.
 *
 * @param {String} name
 * @param {Boolean} force
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.toggle = function(name, force){
  // classList
  if (this.list) {
    if ("undefined" !== typeof force) {
      if (force !== this.list.toggle(name, force)) {
        this.list.toggle(name); // toggle again to correct
      }
    } else {
      this.list.toggle(name);
    }
    return this;
  }

  // fallback
  if ("undefined" !== typeof force) {
    if (!force) {
      this.remove(name);
    } else {
      this.add(name);
    }
  } else {
    if (this.has(name)) {
      this.remove(name);
    } else {
      this.add(name);
    }
  }

  return this;
};

/**
 * Return an array of classes.
 *
 * @return {Array}
 * @api public
 */

ClassList.prototype.array = function(){
  var str = this.el.className.replace(/^\s+|\s+$/g, '');
  var arr = str.split(re);
  if ('' === arr[0]) arr.shift();
  return arr;
};

/**
 * Check if class `name` is present.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.has =
ClassList.prototype.contains = function(name){
  return this.list
    ? this.list.contains(name)
    : !! ~index(this.array(), name);
};

});
require.register("component-emitter/index.js", function(exports, require, module){

/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks[event] = this._callbacks[event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  var self = this;
  this._callbacks = this._callbacks || {};

  function on() {
    self.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks[event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks[event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks[event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks[event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

});
require.register("ui-component-mouse/index.js", function(exports, require, module){

/**
 * dependencies.
 */

var emitter = require('emitter')
  , event = require('event');

/**
 * export `Mouse`
 */

module.exports = function(el, obj){
  return new Mouse(el, obj);
};

/**
 * initialize new `Mouse`.
 * 
 * @param {Element} el
 * @param {Object} obj
 */

function Mouse(el, obj){
  this.obj = obj || {};
  this.el = el;
}

/**
 * mixin emitter.
 */

emitter(Mouse.prototype);

/**
 * bind mouse.
 * 
 * @return {Mouse}
 */

Mouse.prototype.bind = function(){
  var obj = this.obj
    , self = this;

  // up
  function up(e){
    obj.onmouseup && obj.onmouseup(e);
    event.unbind(document, 'mousemove', move);
    event.unbind(document, 'mouseup', up);
    self.emit('up', e);
  }

  // move
  function move(e){
    obj.onmousemove && obj.onmousemove(e);
    self.emit('move', e);
  }

  // down
  self.down = function(e){
    obj.onmousedown && obj.onmousedown(e);
    event.bind(document, 'mouseup', up);
    event.bind(document, 'mousemove', move);
    self.emit('down', e);
  };

  // bind all.
  event.bind(this.el, 'mousedown', self.down);

  return this;
};

/**
 * unbind mouse.
 * 
 * @return {Mouse}
 */

Mouse.prototype.unbind = function(){
  event.unbind(this.el, 'mousedown', this.down);
  this.down = null;
};

});
require.register("abpetkov-percentage-calc/percentage-calc.js", function(exports, require, module){

/**
 * Percentage-Calc 0.0.1
 * https://github.com/abpetkov/percentage-calc
 *
 * Authored by Alexander Petkov
 * https://github.com/abpetkov
 *
 * Copyright 2014, Alexander Petkov
 * License: The MIT License (MIT)
 * http://opensource.org/licenses/MIT
 *
 */

/**
 * Check if number.
 *
 * @param {Number} num
 * @returns {Boolean}
 * @api public
 */

exports.isNumber = function(num) {
  return (typeof num === 'number') ? true : false;
};

/**
 * Calculate percentage of a number.
 *
 * @param {Number} perc
 * @param {Number} num
 * @returns {Number} result
 * @api public
 */

exports.of = function(perc, num) {
  if (exports.isNumber(perc) && exports.isNumber(num)) return (perc / 100) * num;
};

/**
 * Calculate percentage of a number out ot another number.
 *
 * @param {Number} part
 * @param {Number} target
 * @returns {Number} result
 * @api public
 */

exports.from = function(part, target) {
  if (exports.isNumber(part) && exports.isNumber(target)) return (part / target) * 100;
};
});
require.register("abpetkov-closest-num/closest-num.js", function(exports, require, module){
/**
 * Closest-num 0.0.1
 * https://github.com/abpetkov/closest-num
 *
 * Author: Alexander Petkov
 * https://github.com/abpetkov
 *
 * Copyright 2014, Alexander Petkov
 * License: The MIT License (MIT)
 * http://opensource.org/licenses/MIT
 *
 */

/**
 * Get closest number in array.
 *
 * @param {Number} target
 * @param {Array} points
 * @returns {Number} closest
 * @api private
 */

exports.find = function(target, points) {
  var diff = null
    , current = null
    , closest = points[0];

  for (i = 0; i < points.length; i++) {
    diff = Math.abs(target - closest);
    current = Math.abs(target - points[i]);
    if (current < diff) closest = points[i];
  }

  return closest;
};
});
require.register("vesln-super/lib/super.js", function(exports, require, module){
/**
 * slice
 */

var slice = Array.prototype.slice;

/**
 * Primary export
 */

var exports = module.exports = super_;

/**
 * ### _super (dest, orig)
 *
 * Inherits the prototype methods or merges objects.
 * This is the primary export and it is recommended
 * that it be imported as `inherits` in node to match
 * the auto imported browser interface.
 *
 *     var inherits = require('super');
 *
 * @param {Object|Function} destination object
 * @param {Object|Function} source object
 * @name _super
 * @api public
 */

function super_() {
  var args = slice.call(arguments);
  if (!args.length) return;
  if (typeof args[0] !== 'function') return exports.merge(args);
  exports.inherits.apply(null, args);
};

/**
 * ### extend (proto[, klass])
 *
 * Provide `.extend` mechanism to allow extenion without
 * needing to use dependancy.
 *
 *     function Bar () {
 *       this._konstructed = true;
 *     }
 *
 *     Bar.extend = inherits.extend;
 *
 *     var Fu = Bar.extend({
 *       initialize: function () {
 *         this._initialized = true;
 *       }
 *     });
 *
 *     var fu = new Fu();
 *     fu.should.be.instanceof(Fu); // true
 *     fu.should.be.instanceof(Bar); // true
 *
 * @param {Object} properties/methods to add to new prototype
 * @param {Object} properties/methods to add to new class
 * @returns {Object} new constructor
 * @name extend
 * @api public
 */

exports.extend = function(proto, klass) {
  var self = this
    , child = function () { return self.apply(this, arguments); };
  exports.merge([ child, this ]);
  exports.inherits(child, this);
  if (proto) exports.merge([ child.prototype, proto ]);
  if (klass) exports.merge([ child, klass ]);
  child.extend = this.extend; // prevent overwrite
  return child;
};

/**
 * ### inherits (ctor, superCtor)
 *
 * Inherit the prototype methods from on contructor
 * to another.
 *
 * @param {Function} destination
 * @param {Function} source
 * @api private
 */

exports.inherits = function(ctor, superCtor) {
  ctor.super_ = superCtor;
  if (Object.create) {
    ctor.prototype = Object.create(superCtor.prototype,
      { constructor: {
            value: ctor
          , enumerable: false
          , writable: true
          , configurable: true
        }
    });
  } else {
    ctor.prototype = new superCtor();
    ctor.prototype.constructor = ctor;
  }
}

/**
 * Extends multiple objects.
 *
 * @param {Array} array of objects
 * @api private
 */

exports.merge = function (arr) {
  var main = arr.length === 2 ? arr.shift() : {};
  var obj = null;

  for (var i = 0, len = arr.length; i < len; i++) {
    obj = arr[i];
    for (var p in obj) {
      if (!obj.hasOwnProperty(p)) continue;
      main[p] = obj[p];
    }
  }

  return main;
};

});
require.register("powerange/lib/powerange.js", function(exports, require, module){
/**
 * Require classes.
 */

var Main = require('./main')
  , Horizontal = require('./horizontal')
  , Vertical = require('./vertical');

/**
 * Set default values.
 *
 * @api public
 */

var defaults = {
    callback: function() {}
  , decimal: false
  , disable: false
  , disableOpacity: 0.5
  , hideRange: false
  , klass: ''
  , min: 0
  , max: 100
  , start: null
  , step: null
  , vertical: false
};

/**
 * Expose proper type of `Powerange`.
 */

module.exports = function(element, options) {
  options = options || {};

  for (var i in defaults) {
    if (options[i] == null) {
      options[i] = defaults[i];
    }
  }

  if (options.vertical) {
    return new Vertical(element, options);
  } else {
    return new Horizontal(element, options);
  }
};
});
require.register("powerange/lib/main.js", function(exports, require, module){
/**
 * External dependencies.
 *
 */

var mouse = require('mouse')
  , events = require('events')
  , classes = require('classes')
  , percentage = require('percentage-calc');

/**
 * Expose `Powerange`.
 */

module.exports = Powerange;

/**
 * Create Powerange object.
 *
 * @constructor
 * @param {Object} element
 * @param {Object} options
 * @api public
 */

function Powerange(element, options) {
  if (!(this instanceof Powerange)) return new Powerange(element, options);

  this.element = element;
  this.options = options || {};
  this.slider = this.create('span', 'range-bar');

  if (this.element !== null && this.element.type === 'text') this.init();
}

/**
 * Bind events on handle element.
 *
 * @api private
 */

Powerange.prototype.bindEvents = function () {
  this.handle = this.slider.querySelector('.range-handle');
  this.touch = events(this.handle, this);
  this.touch.bind('touchstart', 'onmousedown');
  this.touch.bind('touchmove', 'onmousemove');
  this.touch.bind('touchend', 'onmouseup');
  this.mouse = mouse(this.handle, this);
  this.mouse.bind();
};

/**
 * Hide the target element.
 *
 * @api private
 */

Powerange.prototype.hide = function() {
  this.element.style.display = 'none';
};

/**
 * Append the target after the element.
 *
 * @api private
 */

Powerange.prototype.append = function() {
  var slider = this.generate();
  this.insertAfter(this.element, slider);
};

/**
 * Generate the appropriate type of slider.
 *
 * @returns {Object} this.slider
 * @api private
 */

Powerange.prototype.generate = function() {
  var elems = {
      'handle': {
          'type': 'span'
        , 'selector': 'range-handle'
      }
    , 'min': {
          'type': 'span'
        , 'selector': 'range-min'
      }
    , 'max': {
          'type': 'span'
        , 'selector': 'range-max'
      }
    , 'quantity': {
          'type': 'span'
        , 'selector': 'range-quantity'
      }
  };

  for (var key in elems) {
    if (elems.hasOwnProperty(key)) {
      var temp = this.create(elems[key].type, elems[key].selector);
      this.slider.appendChild(temp);
    }
  }

  return this.slider;
};

/**
 * Create HTML element.
 *
 * @param {String} type
 * @param {String} name
 * @returns {Object} elem
 * @api private
 */

Powerange.prototype.create = function(type, name) {
  var elem = document.createElement(type);
  elem.className = name;

  return elem;
};

/**
 * Insert element after another element.
 *
 * @param {Object} reference
 * @param {Object} target
 * @api private
 */

Powerange.prototype.insertAfter = function(reference, target) {
  reference.parentNode.insertBefore(target, reference.nextSibling);
};

/**
 * Add an additional class for extra customization.
 *
 * @param {String} klass
 * @api private
 */

Powerange.prototype.extraClass = function(klass) {
  if (this.options.klass) classes(this.slider).add(klass);
};

/**
 * Set min and max values.
 *
 * @param {Number} min
 * @param {Number} max
 * @api private
 */

Powerange.prototype.setRange = function(min, max) {
  if (typeof min === 'number' && typeof max === 'number' && !this.options.hideRange) {
    this.slider.querySelector('.range-min').innerHTML = min;
    this.slider.querySelector('.range-max').innerHTML = max;
  }
};

/**
 * Set slider current value.
 *
 * @param {Number} offset
 * @param {Number} size
 * @api private
 */

Powerange.prototype.setValue = function (offset, size) {
  var part = percentage.from(parseFloat(offset), size)
    , value = percentage.of(part, this.options.max - this.options.min) + this.options.min
    , changed = false;

  value = (this.options.decimal) ? (Math.round(value * 100) / 100) : Math.round(value);
  changed = (this.element.value != value) ? true : false;

  this.element.value = value;
  this.options.callback();
  if (changed) this.changeEvent();
};

/**
 * Set step.
 *
 * @param {Number} sliderSize
 * @param {Number} handleSize
 * @returns {Array} this.steps
 * @api private
 */

Powerange.prototype.step = function(sliderSize, handleSize) {
  var dimension = sliderSize - handleSize
    , part = percentage.from(this.checkStep(this.options.step), this.options.max - this.options.min)
    , interval = percentage.of(part, dimension)
    , steps = [];

  for (i = 0; i <= dimension; i += interval) {
    steps.push(i);
  }

  this.steps = steps;

  return this.steps;
};

/**
 * Check values.
 *
 * @param {Number} start
 * @api private
 */

Powerange.prototype.checkValues = function(start) {
  if (start < this.options.min) this.options.start = this.options.min;
  if (start > this.options.max) this.options.start = this.options.max;
  if (this.options.min >= this.options.max) this.options.min = this.options.max;
};

/**
 * Make sure `step` is positive.
 *
 * @param {Number} value
 * @returns {Number} this.options.step
 * @api private
 */

Powerange.prototype.checkStep = function(value) {
  if (value < 0) value = Math.abs(value);
  this.options.step = value;
  return this.options.step;
};

/**
 * Disable range slider.
 *
 * @api private
 */

Powerange.prototype.disable = function() {
  if (this.options.min == this.options.max || this.options.min > this.options.max || this.options.disable) {
    this.mouse.unbind();
    this.touch.unbind();
    this.slider.style.opacity = this.options.disableOpacity;
    classes(this.handle).add('range-disabled');
  }
};

/**
 * Make element unselectable.
 *
 * @param {Object} element
 * @param {Boolean} set
 * @api private
 */

Powerange.prototype.unselectable = function(element, set) {
  if (!classes(this.slider).has('unselectable') && set === true) {
    classes(this.slider).add('unselectable');
  } else {
    classes(this.slider).remove('unselectable');
  }
};

/**
 * Handle the onchange event.
 *
 * @param {Boolean} state
 * @api private
 */

Powerange.prototype.changeEvent = function(state) {
  if (typeof Event === 'function' || !document.fireEvent) {
    var event = document.createEvent('HTMLEvents');
    event.initEvent('change', false, true);
    this.element.dispatchEvent(event);
  } else {
    this.element.fireEvent('onchange');
  }
};

/**
 * Initialize main class.
 *
 * @api private
 */

Powerange.prototype.init = function() {
  this.hide();
  this.append();
  this.bindEvents();
  this.extraClass(this.options.klass);
  this.checkValues(this.options.start);
  this.setRange(this.options.min, this.options.max);
  this.disable();
};
});
require.register("powerange/lib/horizontal.js", function(exports, require, module){
/**
 * External dependencies.
 *
 */

var inherits = require('super')
  , closest = require('closest-num')
  , percentage = require('percentage-calc');

/**
 * Require main class.
 */

var Powerange = require('./main');

/**
 * Expose `Horizontal`.
 */

module.exports = Horizontal;

/**
 * Create horizontal slider object.
 *
 * @api public
 */

function Horizontal() {
  Powerange.apply(this, arguments);
  if (this.options.step) this.step(this.slider.offsetWidth, this.handle.offsetWidth);
  this.setStart(this.options.start);
}

/**
 * Inherit the main class.
 */

inherits(Horizontal, Powerange);

/**
 * Set horizontal slider position.
 *
 * @param {Number} start
 * @api private
 */

Horizontal.prototype.setStart = function(start) {
  var begin = (start === null) ? this.options.min : start
    , part = percentage.from(begin - this.options.min, this.options.max - this.options.min) || 0
    , offset = percentage.of(part, this.slider.offsetWidth - this.handle.offsetWidth)
    , position = (this.options.step) ? closest.find(offset, this.steps) : offset;

  this.setPosition(position);
  this.setValue(this.handle.style.left, this.slider.offsetWidth - this.handle.offsetWidth);
};

/**
 * Set horizontal slider current position.
 *
 * @param {Number} val
 * @api private
 */

Horizontal.prototype.setPosition = function(val) {
  this.handle.style.left = val + 'px';
  this.slider.querySelector('.range-quantity').style.width = val + 'px';
};

/**
 * On slider mouse down.
 *
 * @param {Object} e
 * @api private
 */

Horizontal.prototype.onmousedown = function(e) {
  if (e.touches) e = e.touches[0];
  this.startX = e.clientX;
  this.handleOffsetX = this.handle.offsetLeft;
  this.restrictHandleX = this.slider.offsetWidth - this.handle.offsetWidth;
  this.unselectable(this.slider, true);
};

/**
 * On slider mouse move.
 *
 * @param {Object} e
 * @api private
 */

Horizontal.prototype.onmousemove = function(e) {
  e.preventDefault();
  if (e.touches) e = e.touches[0];

  var leftOffset = this.handleOffsetX + e.clientX - this.startX
    , position = (this.steps) ? closest.find(leftOffset, this.steps) : leftOffset;

  if (leftOffset <= 0) {
    this.setPosition(0);
  } else if (leftOffset >= this.restrictHandleX) {
    this.setPosition(this.restrictHandleX);
  } else {
    this.setPosition(position);
  }

  this.setValue(this.handle.style.left, this.slider.offsetWidth - this.handle.offsetWidth);
};

/**
 * On mouse up.
 *
 * @param {Object} e
 * @api private
 */

Horizontal.prototype.onmouseup = function(e) {
  this.unselectable(this.slider, false);
};
});
require.register("powerange/lib/vertical.js", function(exports, require, module){
/**
 * External dependencies.
 *
 */

var inherits = require('super')
  , classes = require('classes')
  , closest = require('closest-num')
  , percentage = require('percentage-calc');

/**
 * Require main class.
 */

var Powerange = require('./main');

/**
 * Expose `Vertical`.
 */

module.exports = Vertical;

/**
 * Create vertical slider object.
 *
 * @api public
 */

function Vertical() {
  Powerange.apply(this, arguments);
  classes(this.slider).add('vertical');
  if (this.options.step) this.step(this.slider.offsetHeight, this.handle.offsetHeight);
  this.setStart(this.options.start);
}

/**
 * Inherit the main class.
 */

inherits(Vertical, Powerange);

/**
 * Set vertical slider position.
 *
 * @param {Number} start
 * @api private
 */

Vertical.prototype.setStart = function(start) {
  var begin = (start === null) ? this.options.min : start
    , part = percentage.from(begin - this.options.min, this.options.max - this.options.min) || 0
    , offset = percentage.of(part, this.slider.offsetHeight - this.handle.offsetHeight)
    , position = (this.options.step) ? closest.find(offset, this.steps) : offset;

  this.setPosition(position);
  this.setValue(this.handle.style.bottom, this.slider.offsetHeight - this.handle.offsetHeight);
};

/**
 * Set vertical slider current position.
 *
 * @param {Number} val
 * @api private
 */

Vertical.prototype.setPosition = function(val) {
  this.handle.style.bottom = val + 'px';
  this.slider.querySelector('.range-quantity').style.height = val + 'px';
};

/**
 * On mouse down.
 *
 * @param {Object} e
 * @api private
 */

Vertical.prototype.onmousedown = function(e) {
  if (e.touches) e = e.touches[0];
  this.startY = e.clientY;
  this.handleOffsetY = this.slider.offsetHeight - this.handle.offsetHeight - this.handle.offsetTop;
  this.restrictHandleY = this.slider.offsetHeight - this.handle.offsetHeight;
  this.unselectable(this.slider, true);
};

/**
 * On vertical slider mouse move.
 *
 * @param {Object} e
 * @api private
 */

Vertical.prototype.onmousemove = function(e) {
  e.preventDefault();
  if (e.touches) e = e.touches[0];

  var bottomOffset = this.handleOffsetY + this.startY - e.clientY
    , position = (this.steps) ? closest.find(bottomOffset, this.steps) : bottomOffset;

  if (bottomOffset <= 0) {
    this.setPosition(0);
  } else if (bottomOffset >= this.restrictHandleY) {
    this.setPosition(this.restrictHandleY);
  } else {
    this.setPosition(position);
  }

  this.setValue(this.handle.style.bottom, this.slider.offsetHeight - this.handle.offsetHeight);
};

/**
 * On mouse up.
 *
 * @param {Object} e
 * @api private
 */

Vertical.prototype.onmouseup = function(e) {
  this.unselectable(this.slider, false);
};
});














require.alias("component-events/index.js", "powerange/deps/events/index.js");
require.alias("component-events/index.js", "events/index.js");
require.alias("component-event/index.js", "component-events/deps/event/index.js");

require.alias("component-delegate/index.js", "component-events/deps/delegate/index.js");
require.alias("discore-closest/index.js", "component-delegate/deps/closest/index.js");
require.alias("discore-closest/index.js", "component-delegate/deps/closest/index.js");
require.alias("component-matches-selector/index.js", "discore-closest/deps/matches-selector/index.js");
require.alias("component-query/index.js", "component-matches-selector/deps/query/index.js");

require.alias("discore-closest/index.js", "discore-closest/index.js");
require.alias("component-event/index.js", "component-delegate/deps/event/index.js");

require.alias("component-classes/index.js", "powerange/deps/classes/index.js");
require.alias("component-classes/index.js", "classes/index.js");
require.alias("component-indexof/index.js", "component-classes/deps/indexof/index.js");

require.alias("ui-component-mouse/index.js", "powerange/deps/mouse/index.js");
require.alias("ui-component-mouse/index.js", "mouse/index.js");
require.alias("component-emitter/index.js", "ui-component-mouse/deps/emitter/index.js");

require.alias("component-event/index.js", "ui-component-mouse/deps/event/index.js");

require.alias("abpetkov-percentage-calc/percentage-calc.js", "powerange/deps/percentage-calc/percentage-calc.js");
require.alias("abpetkov-percentage-calc/percentage-calc.js", "powerange/deps/percentage-calc/index.js");
require.alias("abpetkov-percentage-calc/percentage-calc.js", "percentage-calc/index.js");
require.alias("abpetkov-percentage-calc/percentage-calc.js", "abpetkov-percentage-calc/index.js");
require.alias("abpetkov-closest-num/closest-num.js", "powerange/deps/closest-num/closest-num.js");
require.alias("abpetkov-closest-num/closest-num.js", "powerange/deps/closest-num/index.js");
require.alias("abpetkov-closest-num/closest-num.js", "closest-num/index.js");
require.alias("abpetkov-closest-num/closest-num.js", "abpetkov-closest-num/index.js");
require.alias("vesln-super/lib/super.js", "powerange/deps/super/lib/super.js");
require.alias("vesln-super/lib/super.js", "powerange/deps/super/index.js");
require.alias("vesln-super/lib/super.js", "super/index.js");
require.alias("vesln-super/lib/super.js", "vesln-super/index.js");
require.alias("powerange/lib/powerange.js", "powerange/index.js");if (typeof exports == "object") {
  module.exports = require("powerange");
} else if (typeof define == "function" && define.amd) {
  define([], function(){ return require("powerange"); });
} else {
  this["Powerange"] = require("powerange");
}})();

/**
 * Helpers
 */
var Utils = {
  extend (newObj, targetObj) {
    targetObj = JSON.parse(JSON.stringify(targetObj))
    if (typeof newObj === 'string') {
      return targetObj
    }

    var value
    for (var key in newObj) {
      value = newObj[key]
      if (newObj.hasOwnProperty(key) && value !== undefined) {
        targetObj[key] = value
      }
    }

    return targetObj
  },

  /**
   * Queues a function to be executed.
   */

  queue: (function () {
    var pending = []

    function next () {
      var fn = pending.shift()
      if (fn) {
        fn(next)
      }
    }

    return function (fn) {
      pending.push(fn)
      if (pending.length === 1) next()
    }
  })(),

  /**
   * Applies css properties to an element, similar to the jQuery
   * setcss method.
   *
   * While this helper does assist with vendor prefixed property names, it
   * does not perform any manipulation of values prior to setting styles.
   */
  setcss: (function () {
    var cssPrefixes = ['Webkit', 'O', 'Moz', 'ms']
    var cssProps = {}

    function camelCase (string) {
      return string.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function (match, letter) {
        return letter.toUpperCase()
      })
    }

    function getVendorProp (name) {
      var style = document.body.style
      if (name in style) return name

      var i = cssPrefixes.length
      var capName = name.charAt(0).toUpperCase() + name.slice(1)
      var vendorName
      while (i--) {
        vendorName = cssPrefixes[i] + capName
        if (vendorName in style) return vendorName
      }

      return name
    }

    function getStyleProp (name) {
      name = camelCase(name)
      return cssProps[name] || (cssProps[name] = getVendorProp(name))
    }

    function applyCss (element, prop, value) {
      prop = getStyleProp(prop)
      element.style[prop] = value
    }

    return function (element, properties) {
      var args = arguments
      var prop
      var value

      if (args.length === 2) {
        for (prop in properties) {
          value = properties[prop]
          if (value !== undefined && properties.hasOwnProperty(prop)) applyCss(element, prop, value)
        }
      } else {
        applyCss(element, args[1], args[2])
      }
    }
  })(),

  clamp (n, min, max) {
    if (n < min) return min
    if (n > max) return max
    return n
  },

  /**
   * converts a percentage (`0..1`) to a bar translateX
   * percentage (`-100%..0%`).
   */
  toBarPerc (n) {
    return (-1 + n) * 100
  },

  hasClass (element, name) {
    if (!element) {
      return false
    }
    var list = typeof element === 'string' ? element : Utils.classList(element)
    return list.indexOf(' ' + name + ' ') >= 0
  },

  addClass (element, name) {
    if (!element) {
      return
    }
    var oldList = Utils.classList(element)
    var newList = oldList + name

    if (Utils.hasClass(oldList, name)) return

    // Trim the opening space.
    element.className = newList.substring(1)
  },

  removeClass (element, name) {
    if (!element) return
    var oldList = Utils.classList(element)
    var newList

    if (!Utils.hasClass(element, name)) return

    // Replace the class name.
    newList = oldList.replace(' ' + name + ' ', ' ')

    // Trim the opening and closing spaces.
    element.className = newList.substring(1, newList.length - 1)
  },

  showEl (element) {
    Utils.setcss(element, {
      display: 'block'
    })
  },

  hideEl (element) {
    Utils.setcss(element, {
      display: 'none'
    })
  },

  classList (element) {
    if (!element) {
      return
    }
    return (' ' + (element.className || '') + ' ').replace(/\s+/gi, ' ')
  },

  /**
   * Removes an element from the DOM.
   */
  removeElement (element) {
    element && element.parentNode && element.parentNode.removeChild(element)
  }
}

export default Utils

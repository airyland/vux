/**
 * Require classes.
 */

import Horizontal from './horizontal'

/**
 * Set default values.
 *
 * @api public
 */

var defaults = {
  callback () {},
  decimal: false,
  disable: false,
  disableOpacity: null,
  hideRange: false,
  min: 0,
  max: 100,
  start: null,
  step: null,
  vertical: false
}

/**
 * Expose proper type of `Powerange`.
 */

export default function (element, options) {
  options = options || {}

  for (var i in defaults) {
    if (options[i] == null) {
      options[i] = defaults[i]
    }
  }

  return new Horizontal(element, options)
}

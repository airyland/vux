/**
 * Module Dependencies
 */

var matches = require('./matches-selector')

/**
 * Export Closest
 *
 * @param {Element} el
 * @param {String} selector
 * @param {Element} scope (optional)
 */

export default function (el, selector, scope) {
  scope = scope || document.documentElement

  // walk up the dom
  while (el && el !== scope) {
    if (matches(el, selector)) return el
    el = el.parentNode
  }

  // check scope for match
  return matches(el, selector) ? el : null
}

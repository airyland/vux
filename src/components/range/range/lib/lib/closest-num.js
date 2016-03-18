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

exports.find = function (target, points) {
  var diff = null
  var current = null
  var closest = points[0]

  for (var i = 0; i < points.length; i++) {
    diff = Math.abs(target - closest)
    current = Math.abs(target - points[i])
    if (current < diff) {
      closest = points[i]
    }
  }

  return closest
}

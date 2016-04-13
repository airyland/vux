/*!
 * HEX <=> RGB Conversion
 * Copyright(c) 2011 Daniel Lamb <daniellmb.com>
 * MIT Licensed
 */

export function toRGB (color) {
  let num = parseInt(color, 16)
  return [num >> 16, num >> 8 & 255, num & 255]
}

export function toHex (red, green, blue) {
  return ((blue | green << 8 | red << 16) | 1 << 24).toString(16).slice(1)
}

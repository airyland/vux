'use strict'

import pad from './pad'

export default function (start, end, padWidth = 2) {
  const rs = []
  while (start <= end) {
    rs.push(padWidth ? pad(start, padWidth) : start)
    start++
  }
  return rs
}

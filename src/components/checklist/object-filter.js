export const getValue = function (item) {
  return typeof item === 'object' ? item.value : item
}

export const getKey = function (item) {
  return typeof item === 'object' ? item.key : item
}

export const getInlineDesc = function (item) {
  return typeof item === 'object' ? item.inlineDesc : ''
}

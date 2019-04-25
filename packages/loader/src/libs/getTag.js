function getTag(content, tag, action='remove') {
  const reg = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\/${tag}>`, 'g')
  content = content.replace(reg, function (tag, text) {
    if (action ==='remove') {
      return ''
    } else if (action === 'reserve') {
      return text
    }
  })
  return content
}

function removeTagCode (content, tag) {
  return getTag(content, tag, 'remove')
}

function reserveTagCode (content, tag) {
  return getTag(content, tag, 'reserve')
}

module.exports = {
  removeTagCode: removeTagCode,
  reserveTagCode: reserveTagCode,
  getTag: getTag
}

const reg = /<i18n[^>]*>([\s\S]*?)<\/i18n>/
const fs = require('fs')
const yamlReader = require('js-yaml')

// @todo add global cache

// @todo try parse
function get (code, isFile = false) {
  let content = code
  if (isFile) {
    content = fs.readFileSync(code, 'utf-8')
  }
  const results = content.match(/<i18n[^>]*>([\s\S]*?)<\/i18n>/)
  try {
    const local = yamlReader.safeLoad(results[1])
    return local
  } catch (e) {
    return {}
  }
}

function getWithLocale ({ code = '', isFile = false, locale = ''}) {
  const rs = get(code, isFile)
  let _rs = {}
  for (let i in rs) {
    _rs[i] = typeof rs[i][locale] === 'undefined' ? i : rs[i][locale]
  }
  return _rs
}

exports.get = get
exports.getWithLocale = getWithLocale

const matchI18nReg = /this.\$t\('?(.*?)'?\)/g

function replace (code, map = {}, options = {}) {
  if (!code) {
    return
  }
  code = code.replace(matchI18nReg, function (a, b) {
    return addQuotes(map[b] || b)
  })
  return code
}

exports.replace = replace

function addQuotes (str) {
  return `'${str}'`
}

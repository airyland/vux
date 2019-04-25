const yamlReader = require('js-yaml')

module.exports = function (source, map) {
  let i18n = {}
  try {
    i18n = yamlReader.safeLoad(source)
  } catch (e) {
    console.log(e)
  }

  this.callback(
    null,
    `export default function (Component) {
      Component.options.__i18n = ${
        JSON.stringify(i18n)
      }
    }`,
    map
  )
}
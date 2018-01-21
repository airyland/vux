const watch = require('node-watch')
const path = require('path')
const dir = path.resolve(__dirname, '../src/components')

watch(dir, function (filename) {
  if (/metas\.yml/.test(filename)) {
    delete require.cache[require.resolve('./build-docs.js')]
    require('./build-docs.js')
  }
})
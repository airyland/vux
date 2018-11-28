const watch = require('node-watch')
const path = require('path')
const dir = path.resolve(__dirname, '../src/')

delete require.cache[require.resolve('./compile.js')]
require(require.resolve('./compile.js'))

watch(dir, { recursive: true }, function (filename) {
  if (/\.yml|\.md/.test(filename) && !/locales/.test(filename)) {
    try {
      delete require.cache[require.resolve('../build/build-docs.js')]
      require('../build/build-docs.js')
      delete require.cache[require.resolve('./compile.js')]
      require(require.resolve('./compile.js'))
    } catch (e) {
      console.log(e)
    }
  }
})

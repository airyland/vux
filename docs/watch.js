const watch = require('node-watch')
const path = require('path')
const dir = path.resolve(__dirname, '../src/')

delete require.cache[require.resolve('./compile.js')]
require(require.resolve('./compile.js'))

watch(dir, { recursive: true }, function (filename) {
  console.log(filename)
  if (/\.yml|\.md/.test(filename) && !/locales/.test(filename)) {

    console.log('changed:', filename)
    try {
      console.log('00')
      delete require.cache[require.resolve('../build/build-docs.js')]
      console.log(0)
    require('../build/build-docs.js')
    console.log(1)
    delete require.cache[require.resolve('./compile.js')]
    require(require.resolve('./compile.js'))
  }catch(e) {
    console.log(e)
  }
}
})
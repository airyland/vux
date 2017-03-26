const glob = require('glob')
const path = require('path')
const fs = require('fs')
function getPath(dir) {
  return path.join(__dirname, dir)
}
const argv = require('yargs').argv
console.log('argv', argv)
const version = argv.version
if (!version) {
  throw('no version specified')
}

glob(getPath('../src/**/**/metas.yml'), {}, function (err, files) {
  let rs = []
  files.forEach(function (file) {
    console.log(file)
    let content = fs.readFileSync(file, 'utf-8')
    content = content.split('\n')
    content = content.map(line => {
      console.log(line)
      if (/next:/.test(line)) {
        return line.replace('next', `${version}`)
      } else if (/version:\d*next/.test(line)) {
        return line.replace('next', `${version}`)
      }
      return line
    })
    fs.writeFileSync(file, content.join('\n'))
  })
})
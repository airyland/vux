const shell = require('shelljs')
const path = require('path')
shell.cd(path.join(__dirname + '../../'))
const glob = require('glob')
const fs = require('fs')
const _ = require('lodash')

const componentsPath = path.join(__dirname, '../src/components/**/metas.yml')
const components = glob.sync(componentsPath)

const format = JSON.stringify({
  hash: '%H',
  authorName: '%an',
  authorEmail: '%ae',
  date: '%aI',
  // subject: '%s'
})

components.map(one => one.replace('/metas.yml', '')).forEach(one => {
  const name = one.split('components/')[1]
  const metaFile = path.join(__dirname, `./zh-CN/components/${name}_git_metas.json`)
  const rs = shell.exec(`git log --pretty='format:${format},' -- ${one}`, {
    silent: true
  })
  let str = `[${rs.stdout.slice(0, -1).replace(/\n/g, ' ').replace(/"/g, '\"')}]`
  str = JSON.parse(str)
  const result = {
    commitCount: str.length,
    commitMembers: _.uniqBy(str, function (one) {
      return one.authorName.toLowerCase()
    }).map(one => {
      return {
        count: str.filter(_one => _one.authorName.toLowerCase() === one.authorName.toLowerCase()).length,
        authorName: one.authorName
      }
    })
  }

  result.commitUniqueCount = result.commitMembers.length

  fs.writeFileSync(metaFile, JSON.stringify(result, null, 2))
  fs.writeFileSync(metaFile.replace('zh-CN', 'en'), JSON.stringify(result, null, 2))
})

'use strict'

const path = require('path')
const fs = require('fs')
const demoPath = path.resolve(__dirname, '../src/demo_list.json')

const argv = require('yargs').argv
argv.simulate = argv.simulate || false

module.exports = {
  options: {
    vuxDev: !argv.simulate, // true
    vuxSetBabel: argv.simulate, // false
    vuxWriteFile: false,
    env: 'dev'
  },
  plugins: [
    'vux-ui', 'inline-manifest', 'progress-bar', 'duplicate-style',
    {
      name: 'js-parser',
      test: /main\.js/,
      fn: function (source) {
        this.addDependency(demoPath)
        let list = fs.readFileSync(demoPath, 'utf-8')
        list = JSON.parse(list)
        if (argv.demo) {
          list = list.filter(item => {
            return item.indexOf(argv.demo) > -1
          })
        }
        let str = []
        list.forEach(one => {
          let filename = one
          let path = `/component/${toDash(one)}`
          if (/#/.test(one)) {
            filename = one.split('#')[0]
            path = one.split('#')[1]
          }
          str.push(`{
  path: '${path}',
  component: function (resolve) {
    require(['./demos/${filename}.vue'], resolve)
  }
}`)
        })

         if (argv.platform === 'app') {
           str.push(`{
  path: '/test/app',
  component: function (resolve) {
    require(['./demos/AppTest.vue'], resolve)
  }
}`)
        }

        // 404 page
        str.push(`{
  path: '*',
  component: function (resolve) {
    require(['./demos/NotFoundComponent.vue'], resolve)
  }
}`)

        str = `[${str.join(',\n')}]`
        source = source.replace('const routes = []', 'const routes = ' + str)
        return source
      }
    },
    {
      name: 'i18n',
      vuxStaticReplace: false,
      staticReplace: false,
      extractToFiles: 'src/locales/components.yml',
      localeList: ['en', 'zh-CN']
    },
    {
      name: 'less-theme',
      path: 'src/theme.less'
    }
  ]
}

function toDash(str) {
  return str.replace(/([A-Z])/g, function (m, w) {
    return '-' + w.toLowerCase();
  }).replace('-', '')
}
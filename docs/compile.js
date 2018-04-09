'use strict'

const glob = require('glob')
const path = require('path')
const fs = require('fs')
const yaml = require('js-yaml')
const hljs = require('highlight.js')
const MD = require('markdown-it')
const argv = require('yargs').argv
let langs = ['en', 'zh-CN']

const getPath = function (dir) {
  return path.join(__dirname, dir)
}

// for faster test with few languages
if (argv.langs) {
  langs = argv.langs.split(',')
}

// filters routes
let include
if (argv.include) {
  include = argv.include
}

const customContainer = require('markdown-it-container')
const md = new MD({
  html: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(lang, str, true).value +
               '</code></pre>';
      } catch (__) {}
    }
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
})
.use(customContainer, 'tip', {
  validate: function(params) {
    return params.trim() === 'tip'
  }
})
.use(customContainer, 'warning', {
  validate: function(params) {
    return params.trim() === 'warning'
  }
})
.use(customContainer, 'danger', {
  validate: function(params) {
    return params.trim() === 'danger'
  }
})

function getComponentName(path) {
  let list = path.split('/')
  if (list[list.length - 1] === 'index.vue' || list[list.length - 1] === 'index.js') {
    return list[list.length - 2]
  } else if (list[list.length - 1] === 'metas.yml') {
    return list[list.length - 2]
  } else if (/\.json/.test(path)) {
    return list[list.length - 1].replace('.json', '')
  } else if (/\.js/.test(path)) {
    return list[list.length - 1].replace('.js', '')
  } else {
    return list[list.length - 1].replace('.vue', '')
  }
}

const faqs = glob.sync(getPath('./zh-CN/faq/*.md'))
const faqRoutes = []
const commonTitle = `VUX - 基于 WeUI 和 Vue 的移动端组件库`
let faqMd = `
---
title: 常见问题 - ${commonTitle}
---

# 常见问题
`
faqs.forEach(one => {
  one = '.' + one.replace(__dirname, '')
  const content = fs.readFileSync(getPath(one), 'utf-8')
  const titleRs = content.match(/\n#(.*?)\n/)
  if (titleRs && titleRs[1] && one.indexOf('index.md') === -1) {
    faqRoutes.push({
      title: titleRs[1].trim(),
      path: one.replace('./', '/').replace('.md', '.html')
    })
  }
})

faqRoutes.forEach(one => {
  faqMd += `
* <router-link to="${one.path}">${one.title}</router-link>
  `
})

let paths = []

fs.writeFileSync(getPath('./src/faq-routes.json'), JSON.stringify(faqRoutes, null, 2))

fs.writeFileSync(getPath('./zh-CN/faq/index.md'), faqMd)

/**
* tools
*/
let toolRoutes = []
const tools = glob.sync(getPath('./zh-CN/tools/*.md'))

tools.forEach(one => {
  one = '.' + one.replace(__dirname, '')
  const content = fs.readFileSync(getPath(one), 'utf-8')
  let titleRs = content.match(/\n#(.*?)\n/)
  if (titleRs && titleRs[1] && one.indexOf('index.md') === -1) {
    titleRs[1] = titleRs[1].replace(/#/g, '')
    toolRoutes.push({
      title: titleRs[1].trim(),
      path: one.replace('./', '/').replace('.md', '.html')
    })
  }
})
fs.writeFileSync(getPath('./src/tool-routes.json'), JSON.stringify(toolRoutes, null, 2))

let files = []
langs.forEach(lang => {
  files = files.concat(glob.sync(getPath(`./${lang}/**/*.md`)))
})

files = files.map(file => {
  return '.' + file.replace(__dirname, '')
})

if (include) {
  files = files.filter(file => {
    return file.includes(include)
  })
}

let str = `
routes.push({
  path: '/zh-CN/lab/index.html',
  component: () => import('../zh-CN/lab/index.md')
})
  routes.push({
    path: '/zh-CN/faq',
    component: () => import('../zh-CN/faq/index.md')
  })
  routes.push({
    path: '/zh-CN/',
    component: () => import('../zh-CN/README.md')
  })
  routes.push({
    path: '/zh-CN/about/contributors.html',
    component: () => import('../zh-CN/about/contributors.vue')
  })`
paths.push('/zh-CN/')
paths.push('/zh-CN/faq/')
paths.push('/zh-CN/about/contributors.html')
files.forEach(file => {
  let currentPath = `${file.replace(/^.\//, '/').replace('.md', '.html')}`

  if (!include || currentPath.includes(include)) {
    paths.push(currentPath)
    str += `
  routes.push({
    path: '${currentPath}',
    component: () => import('.${file}')
  })
      `
  }
})

// components
const components = glob.sync(getPath('../src/components/**/metas.yml'))

const colorCode = function (lang, code) {
  return '<pre class="hljs"><code>' +
               hljs.highlight(lang, code, true).value +
               '</code></pre>'
}

components.forEach((file) => {
  const rawMetas = fs.readFileSync(file, 'utf-8')
  const metas = yaml.safeLoad(rawMetas)
  const root = getPath('../')
  const componentName = file.replace(root, '').replace('src/components/', '').replace('/metas.yml', '')
  const importName = _camelCase(componentName)
  let importList = [{
    componentName: componentName,
    importName: importName
  }]

  if (/meta/.test(componentName)) {
    return
  }

  // demo 源码
  const demoPath = path.join(__dirname, `../src/demos/${importName}.vue`)
  let demoCode = ''
  try {
    demoCode = encodeURIComponent(colorCode('html', fs.readFileSync(demoPath, 'utf-8')))
  } catch (e) {}

  if (metas.items) {
    importList = []
    metas.items.forEach(one=> {
      importList.push({
        componentName: one,
        importName: _camelCase(one)
      })
    })
  }
  const parseReg = '`(.*?)`'
  const url = `https://vux.li/demos/v2/#/component/${componentName}`
  const urlWithNoTransition = `https://vux.li/demos/v2?transition=none/#/component/${componentName}`
  const localImportCode = colorCode('js', `// 单独组件引入\n\nimport { ${importList.map(one => one.importName).join(', ')} } from 'vux'

export default {
  components: {
    ${importList.map(one => one.importName).join(',\n    ')}
  }
}`)


  let _globalImportCode = `// 也可以在入口文件全局引入\n\nimport Vue from 'vue'\nimport { ${importList.map(one => one.importName).join(', ')} } from 'vux'

`
  importList.forEach(one => {
    _globalImportCode += `Vue.component('${one.componentName}', ${one.importName})\n`
  })

  const globalImportCode = colorCode('js', _globalImportCode)

  let exampleCode = ''
  if (metas.example) {
    exampleCode = colorCode('html', metas.example)
  }

  if (metas.tips) {
    langs.forEach(lang => {
      if (metas.tips[lang]) {
        for (let i = 0; i < metas.tips[lang].length; i++) {
          metas.tips[lang][i].a = metas.tips[lang][i].a
          .replace(/```\s+(css|js|bash|html)/g, '``` $1\n')
          .replace(/```/g, '\n```')
          metas.tips[lang][i].a = md.render(metas.tips[lang][i].a)
        }
      }
    })
  }

  langs.forEach(lang => {
    let str = `
  <template>
  <div class="component-box">

    <div style="min-height: 600px;">
    <h1 class="vux-component-name">${importName}</h1>

    <p class="component-extra-links">
      <a href="https://vux.li/demos/v2/#/component/${componentName}" target="_blank">demo 原始链接</a>
      <a href="https://github.com/airyland/vux/blob/v2/src/demos/${importName}.vue" target="_blank" @click.prevent="showSourceCode">demo源码</a>
      <a href="https://github.com/airyland/vux/blob/v2/src/components/${componentName}/metas.yml" target="_blank">编辑文档</a>

      <el-popover trigger="hover" v-if="hasReady">
        <div style="width:100%;text-align:center;">
          <img class="qr" width="100" src="https://qr.vux.li/api.php?text=${encodeURIComponent(url)}"/>
        </div>
        <a href="javascript:" slot="reference">
        二维码
        </a>
      </el-popover>
    </p>

    <div class="component-demo" style="width:377px;height:600px;display:inline-block;border:1px solid #ececec;border-radius:5px;overflow:hidden;z-index:2500;">
      <iframe src="${urlWithNoTransition}" width="375" height="600" border="0" frameborder="0"></iframe>
    </div>

    <div style="width:600px;">
      ${localImportCode}
    </div>

    <div style="width:600px;">
      ${globalImportCode}
    </div>

    <div class="tip" style="width:600px;" v-if="metas.tip">
      ${ metas.tip ? metas.tip.replace(/`(.*?)`/g, '<code>$1</code>') : '' }
    </div>

    <h3 v-if="metas.example">使用例子</h3>
    <div v-if="metas.example" style="width:600px;">
      ${exampleCode}
    </div>
    </div>

    <div v-if="metas.extra && metas.extra['${lang}']">
      ${ metas.extra && metas.extra[lang] ? md.render(metas.extra[lang] || '<div></div>') : '' }
    </div>
    <div v-if="metas.extra && !metas.extra['${lang}']">
      ${ metas.extra && !metas.extra[lang] && typeof metas.extra === 'string' ? md.render(metas.extra || '<div></div>') : '' }
    </div>

    <template v-for="component in componentList">
      <h2 v-show="componentList.length > 1">{{ component.name }}</h2>
      <h3 v-if="component.meta.props">属性</h3>
      <table v-if="component.meta.props">
        <thead>
          <tr>
            <td>名字</td>
            <td style="width:48px;">类型</td>
            <td style="width:120px;">默认</td>
            <td style="width:120px;">版本要求</td>
            <td>说明</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(prop, i) in component.meta.props">
            <td class="prop-name">{{ i }}</td>
            <td v-html="getTypeHTML(prop.type)"></td>
            <td>{{ prop.default}}</td>
            <td>{{ prop.version || '--'}}</td>
            <td v-html="prop['zh-CN'].replace(/${parseReg}/g, '<code>$1</code>')"></td>
          </tr>
        </tbody>
      </table>

      <h3 v-show="component.meta.events">事件</h3>

      <table v-show="component.meta.events">
        <thead>
          <tr>
            <td>事件</td>
            <td>参数</td>
            <td>说明</td>
            <td>版本要求</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(event, i) in component.meta.events">
            <td class="prop-name">{{ i }}</td>
            <td v-html="event.params ? event.params.replace(/${parseReg}/g, '<code>$1</code>') : '--'"></td>
            <td v-html="event['zh-CN'] ? event['zh-CN'].replace(/${parseReg}/g, '<code>$1</code>') : '--'"></td>
            <td>{{ event['version'] || '--' }}</td>
          </tr>
        </tbody>
      </table>

      <h3 v-if="component.meta.slots">Slots</h3>

      <table v-if="component.meta.slots">
        <thead>
          <tr>
            <td>名字</td>
            <td>说明</td>
            <td>版本要求</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(slot, i) in component.meta.slots" :class="{'slot-disabled': slot['status'] === 'deprecated'}">
            <td class="prop-name">{{ i }}</td>
            <td v-html="slot['zh-CN'] ? slot['zh-CN'].replace(/${parseReg}/g, '<code>$1</code>') : ''"></td>
            <td>{{ slot['version'] || '--' }}</td>
          </tr>
        </tbody>
      </table>

        <h3 v-if="component.meta.methods">方法</h3>
        <table v-if="component.meta.methods">
          <thead>
            <tr>
              <td>名字</td>
              <td>参数</td>
              <td>说明</td>
              <td>版本说明</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(method, i) in component.meta.methods">
              <td class="prop-name">{{ i }}</td>
              <td v-html="method['params'] ? method['params'].replace(/${parseReg}/g, '<code>$1</code>') : ''"></td>
              <td v-html="method['zh-CN'].replace(/${parseReg}/g, '<code>$1</code>')"></td>
              <td>{{ method['version'] }}</td>
            </tr>
          </tbody>
        </table>

        <h3 v-if="component.meta.tips && component.meta.tips['${lang}']">重要提示及已知问题</h3>
        <el-card v-if="component.meta.tips && component.meta.tips['${lang}']">
          <ul>
            <li v-for="tip in component.meta.tips['${lang}']">
            <el-tag size="mini" type="success">Q</el-tag> {{ tip.q }}
            <div v-html="tip.a" class="tip-answer-box"></div>
            </li>
          </ul>
        </el-card>
        <br>
    </template>

    <!--<h3>社区相关讨论</h3>
    [即将上线]
    -->

    <el-card v-if="issues.length">
      <div slot="header">
        <span>相关 issue</span>
      </div>
      <ul>
        <li v-for="issue in issues"><a target="_blank" :href="issue.html_url">#{{ issue.number}} <span style="color:#666;">{{ issue.title }}</span></a></li>
      </ul>
    </el-card>
    <br>

    <el-card v-if="gitMetas">
      <div slot="header">
        <span>贡献者</span>
      </div>
      <p>该组件(包含文档)迭代 {{gitMetas.commitCount}} 次，贡献人数 {{gitMetas.commitUniqueCount}} 人。
      <!--<span class="contributors-tip">（git log 显示用户可能和 Github 用户资料不符，可能无法正常访问）</span>-->
      </p>

      <a v-for="person in gitMetas.commitMembers" class="contributor-item" :href="'https://github.com/' + person.authorName" target="_blank" :title="'贡献' + person.count + '次'">{{person.authorName}}</a>
    </el-card>
    <br>
    <el-card v-if="metas.changes">
      <div slot="header">
        <span>版本更新</span>
      </div>
      <ul v-if="metas.changes">
        <template v-for="(changelog, version) in metas.changes">
          <li v-for="log in changelog['${lang}']">
            <router-link :to="'/${lang}/changelog/' + version + '.html'" class="changelog-version">{{version}}</router-link> {{log}}
          </li>
        </template>
      </ul>
    </el-card>

    <h3 v-if="metas.references">参考资料</h3>
    <ul v-if="metas.references">
      <li v-for="link in metas.references['zh-CN']">
        <a :href="link.link" target="_blank">{{link.title}}</a>
      </li>
    </ul>

    <el-dialog
      class="sourcec-code-dialog"
      top="0"
      width="80%"
      :visible.sync="sourceCodeDialogVisibility">
      <div class="code-box" v-html="demoCode"></div>
    </el-dialog>

  </div>
  </template>


  <script>
  import Axios from 'axios'

  // const metas = require('json-loader!yaml-loader!../../../src/components/${componentName}/metas.yml')
  const metas = ${JSON.stringify(metas, null, 2)}
  let componentList = []
  if (Array.isArray(metas.items)) {
    metas.items.forEach(item => {
      componentList.push({
        name: item,
        meta: metas[item]
      })
    })
  } else {
    componentList.push({
      meta: metas
    })
  }
  const gitMetas = require('./${componentName}_git_metas.json')
  const demoCode = decodeURIComponent(\`${demoCode}\`)

  export default {
    head: {
      title: '${importName} 组件使用教程 | VUX - Vue 移动端 UI 组件库'
    },
    filters: {
      parseCode (str) {
        return str.replace(/${parseReg}/g, '<code>$1</code>')
      }
    },
    async mounted () {
      const rs = await Axios.get('https://api.github.com/search/issues?q=repo:airyland/vux%20label:component/' + this.componentName)
      this.issues = rs.data.items
      this.hasReady = true
    },
    methods: {
      showSourceCode () {
        this.sourceCodeDialogVisibility = true
      },
      getTypeHTML (type) {
        type = type || 'String'
        if (/,/.test(type)) {
          const list = type.split(',').map(function (one) {
            return one.replace(/^\s+|\s+$/g, '')
          }).map(function (one) {
            const type = one ?  one.toLowerCase() : 'string'
            return '<span class="type">' + type + '</span>'
          })
          return list.join('<br>')
        } else {
          type = type ?  type.toLowerCase() : 'string'
          return '<span class="type">' + type + '</span>'
        }
      }
    },
    data () {
      return {
        hasReady: false,
        issues: [],
        componentName: '${componentName}',
        demoCode,
        sourceCodeDialogVisibility: false,
        showQr: false,
        metas: metas,
        gitMetas,
        componentList
      }
    }
  }
  </script>

  <style>
  .component-box {
    position: relative;
  }
  .component-demo {
    position: absolute;
    right: 5px;
    top: 15px;
  }
  .changelog-version {
    width: 110px;
    display: inline-block;
  }
  .component-extra-links {
    position: relative;
    font-size: 12px;
  }
  .component-extra-links a {
    padding-right: 10px;
    color: #999;
  }
  </style>
    `
    fs.writeFileSync(getPath(`./${lang}/components/${componentName}.vue`), str)
  })


})

langs.forEach(lang => {
  glob.sync(getPath(`./${lang}/components/*.vue`)).forEach(component => {
    component = '..' + component.replace(__dirname, '')
    const name = component.replace(`../${lang}/components/`, '').replace('.vue', '')
    if (!include || name.includes(include)) {
      str += `
    routes.push({
      path: '/${lang}/components/${name}.html',
      component: () => import('${component}')
    })
        `
      paths.push(`/zh-CN/components/${name}.html`)
    }
  })
})

if (include) {
  paths = paths.filter(path => {
    return path.includes(include)
  })
}

const ori = fs.readFileSync(getPath('./src/index.js'), 'utf-8')
fs.writeFileSync(getPath('./src/_index.js'), ori.replace('const routes = []', `const routes = []\n${str}`))
fs.writeFileSync(getPath('./src/routes.json'), JSON.stringify(paths, null, 2))

function camelCase(input) {
  let str = input.toLowerCase().replace(/-(.)/g, function (match, group1) {
    return group1.toUpperCase();
  });

  str = str.replace(/_(.)/g, function (match, group1) {
    return group1.toUpperCase();
  });
  return str
}

function _camelCase(input) {
  let str = camelCase(input)
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}

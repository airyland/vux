'use strict'

const glob = require('glob')
const path = require('path')
const fs = require('fs')
const yaml = require('js-yaml')
const hljs = require('highlight.js')
const MD = require('markdown-it')
const argv = require('yargs').argv
let langs = ['en', 'zh-CN']
const t = require('./i18n')
const pkg = require('../package.json')

const variables = {}
const variableMap = {}
const variablePath = path.join(__dirname, '../src/styles/variable.less')
const variableContent = fs.readFileSync(variablePath, 'utf-8').split('\n')

const isInclude = function (name, include) {
  let list = include.split(',')
  for (let i = 0; i < list.length; i++) {
    if (name.includes(list[i])) {
      return true
    }
  }
  return false
}

variableContent.forEach((line, index) => {
  if (/^@/.test(line)) {
    let temp = line.split(':')
    let component = temp[0].replace('@', '').split('-')[0]
    if (component === 'button' && /button-tab/.test(line)) {
      component = 'button-tab'
    }
    if (!variables[component]) {
      variables[component] = []
    }
    const name = temp[0].replace('@', '')
    let value = temp[1].replace(';', '').trim().replace(/\/\*(.*?)\*\//, '')
    if (value.includes('//')) {
      value = value.split(' ')[0].trim()
    }
    let inherited_name = ''
    let is_inherited = false

    if (/@/.test(value)) {
      is_inherited = true
      inherited_name = value
      value = variableMap[value.replace('@', '')]
    }
    let t = {}

    if (variableContent[index - 1] === '*/' && /:/.test(variableContent[index - 2])) {
      let stop = false
      let i = 2
      while (!stop) {
        const temp = variableContent[index - i]
        if (/:/.test(temp)) {
          let pair = temp.split(':')
          t[pair[0].replace('*', '').trim()] = pair[1].trim()
        } else {
          stop = true
        }
        i++
      }
    }

    variables[component].push({
      name, 
      value,
      is_inherited,
      inherited_name,
      desc: t
    })
    variableMap[name] = value
  }
})

let contents = []

const getAlternate = function (lang, route) {
  return langs.filter(_lang => _lang !== lang).map(_lang => {
    return {
      rel: 'alternate',
      hreflang: _lang,
      href: route.replace(lang, _lang)
    }
  })
}

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

let paths = []

langs.forEach(lang => {
  const faqs = glob.sync(getPath(`./${lang}/faq/*.md`))
  const faqRoutes = []
  const commonTitle = `${t('title', lang)}`
  let faqMd = `
---
title: ${t('faq', lang)} | ${commonTitle}
---

# ${t('faq', lang)}
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

      contents.push({
        lang,
        category: '常见问题',
        title: titleRs[1].trim(),
        url: one.replace('./', '/').replace('.md', '.html'),
        content: md.render(content)
      })
    }
  })

  faqRoutes.forEach(one => {
    faqMd += `
  * <router-link to="${one.path}">${one.title}</router-link>
    `
  })

  fs.writeFileSync(getPath('./src/faq-routes.json'), JSON.stringify(faqRoutes, null, 2))

  fs.writeFileSync(getPath(`./${lang}/faq/index.md`), faqMd)

})

/**
* tools
*/

langs.forEach(lang => {
  let toolRoutes = []
  const tools = glob.sync(getPath(`./${lang}/tools/*.md`))

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

      contents.push({
        lang,
        category: t('Toolkit', lang),
        title: t(titleRs[1].trim(), lang),
        url: one.replace('./', '/').replace('.md', '.html'),
        content: md.render(content)
      })
    }
  })
  fs.writeFileSync(getPath(`./src/tool-routes-${lang}.json`), JSON.stringify(toolRoutes, null, 2))
})


let files = []
langs.forEach(lang => {
  files = files.concat(glob.sync(getPath(`./${lang}/**/*.md`)))
})

files = files.map(file => {
  return '.' + file.replace(__dirname, '')
})

if (include) {
  files = files.filter(file => {
    return isInclude(file, include)
  })
}

let str = ''

langs.forEach(lang => {
  str += `
  routes.push({
    path: '/${lang}/lab/index.html',
    component: () => import('../${lang}/lab/index.md')
  })
  routes.push({
    path: '/${lang}/faq',
    component: () => import('../${lang}/faq/index.md')
  })
  routes.push({
    path: '/${lang}/',
    component: () => import('../${lang}/README.md')
  })
  routes.push({
    path: '/${lang}/about/contributors.html',
    component: () => import('../${lang}/about/contributors.vue')
  })`
  paths.push('/${lang}/')
  paths.push('/${lang}/faq/')
  paths.push('/${lang}/about/contributors.html')
})

files.forEach(file => {
  let currentPath = `${file.replace(/^.\//, '/').replace('.md', '.html')}`

  if (!include || isInclude(currentPath, include)) {
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

const routesList = require(getPath(`../src/demo_list.json`))
const map = {}
routesList.forEach(route => {
  if (/#/.test(route)) {
    let pair = route.split('#')
    map[pair[0]] = pair[1]
  }
})

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

  // 加入样式变量
  metas.variables = variables[componentName.replace('x-', '')]

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
  const _localImportCode = `import { ${importList.map(one => one.importName).join(', ')} } from 'vux'

export default {
  components: {
    ${importList.map(one => one.importName).join(',\n    ')}
  }
}`
  const localImportCode = colorCode('js', _localImportCode)

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

    // add tip on last component
    if (metas.items) {
      const keys = metas.items
      const last = keys[keys.length - 1]
      metas[last].tips = metas.tips
    }
  }

  // render child component description
  if (metas.items) {
    metas.items.forEach(item => {
      if (metas[item].description) {
        metas[item].description = md.render(metas[item].description)
      }
    })
  }

  langs.forEach(lang => {

    // find demos
    let demos = []
    const reg = /<demo[^>]*>([\s\S]*?)<\/demo>/g
    let demoHeight = '270px'
    let commonNoBackgroundColor = 'true'
    let demosDir = getPath(`../src/demos/${componentName}/`)
    if (fs.existsSync(demosDir)) {
      const list = glob.sync(demosDir + '/*.vue').filter(one => !one.includes('_index.vue'))
      .map(one => one.replace(getPath(`../src/demos/`), ''))
      .map(one => {
        const route = map[one.replace('.vue', '')]
        const code = fs.readFileSync(getPath(`../src/demos/`) + one, 'utf-8')
        let height = demoHeight
        let noBackgroundColor = commonNoBackgroundColor
        let order = 999
        const rs = code.match(reg)
        let title = 'EXAMPLE'
        if (rs) {
          let meta = yaml.safeLoad(rs[0].replace('<demo>\n', '').replace('</demo>', ''))
          if (typeof meta.title === 'string') {
            title = meta.title
          } else if (typeof meta.title === 'object') {
            title = meta.title[lang]
          }
          if (meta.height) {
            height = meta.height + 'px'
          }
          if (meta.noBackgroundColor ===  false) {
            noBackgroundColor === 'false'
          }
          if (meta.order) {
            order = meta.order * 1
          }
        }
        return {
          file: one.replace('.vue', ''),
          title,
          route: route,
          code: '<pre class="hljs"><code>' +
                 hljs.highlight('html', code.replace(reg, ''), true).value +
                 '</code></pre>',
          oriHeight: height,
          height: height,
          noBackgroundColor,
          order
        }
      })
      demos = list.sort((a, b) => {
        return a.order > b.order ? 1 : -1
      })
    }

    let url = `https://vux.li/demos/v2/#/component/${componentName}`
    if (demos.length) {
      url = `https://vux.li/demos/v2/#/components/${componentName}/home`
    }

    // toc
    let toc = []
    if (demos.length) {
      toc.push({
        title: t('Intro', lang),
        anchor: 'intro'
      })
      toc.push({
        title: t('Install', lang),
        anchor: 'install'
      })
      toc.push({
        title: t('Examples', lang),
        anchor: 'examples',
        list: demos.map(one => {
          return {
            title: one.title,
            anchor: 'examples:' + one.title
          }
        }).slice(0, 5)
      })
      if (metas.items) {
        toc.push({
          title: 'API',
          anchor: 'api',
          list: metas.items.map(item => {
            return {
              title: `<${item}>`,
              anchor: 'components:' + item
            }
          })
        })
      } else {
        toc.push({
          title: 'API',
          anchor: 'api'
        })
      }
      toc.push({
        title: t('Tips', lang),
        anchor: 'tips'
      })
      toc.push({
        title: t('Contributors', lang),
        anchor: 'contributors'
      })
      toc.push({
        title: t('Changelog', lang),
        anchor: 'changelog'
      })
    }

    const needImport = metas.need_import === false ? false : true

    const gitMetas = require(`./${lang}/components/${componentName}_git_metas.json`)

    // ldjson
    const ldjson = {
      "@context": "http://schema.org/",
      "@type": "SoftwareApplication",
      "name": `Vue Component ${componentName}`,
      "screenshot": "",
      "description": "Vue.js component for VUX",
      "url": `/${lang}/components/${componentName}.html`,
      "applicationCategory": t('Component', lang),
      "author": {
        "@type": "Organization",
        "name": "VUX",
        "url": "https://vux.li"
      },
      "downloadUrl": "https://vux.li",
      "softwareVersion": pkg.version,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 5,
        "reviewCount": gitMetas.commitCount
      },
      "operatingSystem": "iOS >= 7, Android >= 4.1",
      "offers": {
        "@type": "Offer",
        "price": 0,
        "priceCurrency": t('priceCurrency', lang),
        "availability": "http://schema.org/InStock"
      }
    }

    contents.push({
      lang: lang,
      category: t('Components', lang),
      title: importName,
      title_alias: componentName,
      url: `/${lang}/components/${componentName}.html`
    })

    const list = ['Props', 'Events', 'Slots', 'Functions']

    list.forEach(block => {
      const key = block.toLowerCase()
      if (metas[key]) {
        for (let prop in metas[key]) {
          contents.push({
            lang: lang,
            category: t('Component', lang) + ' ' + importName + ' ' + t(block.replace(/s$/, ''), lang),
            title: prop,
            url: `/${lang}/components/${componentName}.html#${key}-${prop}`,
            content: metas[key][prop][lang]
          })
        }
      }
    })


    let _globalImportCode = `// ${t('globally register', lang)}\n\nimport Vue from 'vue'\nimport { ${importList.map(one => one.importName).join(', ')} } from 'vux'\n\n`
    const urlWithNoTransition = `https://vux.li/demos/v2?locale=${lang}&transition=none/#/component/${componentName}`

    importList.forEach(one => {
      _globalImportCode += `Vue.component('${one.componentName}', ${one.importName})\n`
    })

    const globalImportCode = colorCode('js', _globalImportCode)


    let str = `
  <template>
    <div class="component-box" :class="demos.length ? 'components-with-toc' : ''">

      <div :class="demos.length ? 'component-header-v2' : 'component-header-v1'">
        <a class="anchor" id="intro">${importName}</a>
        <div class="title-box">

          <el-badge value="Beta" v-if="isBeta">
            <h1 class="vux-component-name">${importName}</h1>
          </el-badge>
          <h1 v-else class="vux-component-name">${importName}</h1>

          <p class="component-extra-links">
            <a href="${url}" target="_blank">${t('demo url', lang)}</a>
            <a v-if="!demos.length" href="https://github.com/airyland/vux/blob/v2/src/demos/${importName}.vue" target="_blank" @click.prevent="showSourceCode">${t('demo source code', lang)}</a>
            <a href="https://github.com/airyland/vux/blob/v2/src/components/${componentName}/metas.yml" target="_blank">${t('edit document', lang)}</a>
            <a href="https://github.com/airyland/vux/blob/v2/src/components/${componentName}/" target="_blank">${t('component source code', lang)}</a>
            <el-popover trigger="hover" v-if="hasReady">
              <div style="width:100%;text-align:center;">
                <img class="qr" width="100" src="https://qr.vux.li/api.php?text=${encodeURIComponent(url)}"/>
              </div>
              <a href="javascript:" slot="reference">
              ${t('qr', lang)}
              </a>
            </el-popover>
          </p>

          <div class="component-description">
            <template v-if="${!!metas.description}">
            ${md.render(metas.description || '')}
            </template>
          </div>

        </div>

        <div v-if="!demos.length" class="component-demo" style="width:377px;height:600px;display:inline-block;border:1px solid #ececec;border-radius:5px;overflow:hidden;z-index:2500;">
          <iframe src="${urlWithNoTransition}" width="375" height="600" border="0" frameborder="0"></iframe>
        </div>
        <div class="toc">
          <ul v-for="t in toc">
            <li>
              <a :href="'#' + (t.anchor || t.title)">{{ t.title }}</a>
              <ul v-if="t.list" v-for="_t in t.list">
                <li><a :href="'#' + _t.anchor">{{ _t.title.slice(0, 12) }}</a></li>
              </ul>
            </li>
          </ul>
        </div>
      
        <template v-if="needImport">
          <a class="anchor" id="install">Install</a>
          <h2>${t('Install', lang)}</h2>
          <el-tabs>
            <el-tab-pane label="${t('Local Registration', lang)}">
              <div class="import-code-box">
              <el-tooltip content="${t('click to copy', lang)}" placement="top">
                <span
                  v-clipboard:copy="localImportCode"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onCopyError">
                  <el-icon class="el-icon-document"></el-icon>
                </span>
              </el-tooltip>
              ${localImportCode}
            </div>
            </el-tab-pane>
            <el-tab-pane label="${t('Global Registration', lang)}">
              <div class="import-code-box">
                <el-tooltip content="${t('click to copy', lang)}" placement="top">
                  <span
                    v-clipboard:copy="globalImportCode"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onCopyError">
                    <el-icon class="el-icon-document"></el-icon>
                  </span>
                </el-tooltip>
                ${globalImportCode}
              </div> 
            </el-tab-pane>
          </el-tabs>   
        </template>

        <template v-else>
          <div class="tip">
            <p>${t('donot need import', lang)}</p>
          </div>
        </template>

        <div class="tip" style="width:600px;" v-if="metas.tip">
          ${ metas.tip ? metas.tip.replace(/`(.*?)`/g, '<code>$1</code>') : '' }
        </div>
      
        <h2 v-if="metas.example">${t('example', lang)}</h2>
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
      
      <a v-if="demos.length" class="anchor" id="examples">Examples</a>
      <br/>
      <template v-if="demos.length" v-for="demo in demos">
        <a class="anchor" :id="'examples:' + demo.title">{{ demo.title }}</a>
        <br/>
        <div class="demo-header">
          <span class="demo-title">{{ demo.title }}</span>
        </div>
        <div class="demos" :style="{height: demo.height}">
          <div class="demo-iframe-box">
            <lazy-component>
              <iframe
                :src="domain + '?no-background-color=' + demo.noBackgroundColor +'&locale=${lang}&transition=none&hide-nav=true&hide-tab-bar=true#/components/' + demo.file"
                width="375"
                height="600"
                border="0"
                frameborder="0"
                style="margin: 0 auto;"></iframe>
            </lazy-component>
          </div>
          <div class="demo-code-box" :style="{overflow: demo.height === demo.oriHeight ? 'hidden' : 'scroll'}">
            <div v-html="demo.code" contenteditable></div>
            <div v-if="demo.height === demo.oriHeight" class="demo-code-masker" @click="demo.height='auto'">
              <div>
                  <img class="demo-qr" width="100" :src="'https://qr.vux.li/api.php?text=' + encodeURIComponent(domain + '?locale=${lang}#/components/' + demo.file)"/>
                  <br/>
                  <span>
                    <el-icon class="el-icon-arrow-left"/>
                    <el-icon class="el-icon-arrow-right"/>
                    Show code
                  <br/>
                  <!--<span class="demo-path">src/demos/{{ demo.file }}.vue</span>-->
                </span>
              </div>
            </div>
            <span v-if="demo.height === 'auto'" class="hide-code" @click="demo.height=demo.oriHeight">
              <el-icon class="el-icon-close"></el-icon>
            </span>
          </div>
        </div>
      </template>

      <template v-for="component in componentList">
        <div>
          <a v-if="componentList.length > 1" class="anchor" :id="'components:' + component.name">{{ component.name }}</a>
          <a v-else class="anchor" id="api">API</a>
          <br/>
          <h2
            v-show="componentList.length > 1"
            class="vux-component-name-sub-item">{{ component.name }}</h2>
            
          <template v-if="component.meta.items && component.meta.description">
            <div v-html="component.meta.description"></div>
          </template>

          <template v-if="component.meta.props">
            <h2>${t('Props', lang)}</h2>
            <table>
              <thead>
                <tr>
                  <td>${t('name', lang)}</td>
                  <td style="width:48px;">${t('type', lang)}</td>
                  <td>${t('default value', lang)}</td>
                  <td>${t('description', lang)}</td>
                  <td>${t('required version', lang)}</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(prop, i) in component.meta.props">
                  <td class="prop-name">
                    <el-tooltip content="${t('click to copy', lang)}" placement="left" :hide-after="0" :open-delay="50">
                      <span
                      v-clipboard:copy="i"
                      v-clipboard:success="onCopy">{{ i }}</span>
                    </el-tooltip>
                  </td>
                  <td v-html="getTypeHTML(prop.type)"></td>
                  <td>{{ prop.default}}</td>
                  <td v-html="prop['${lang}'].replace(/${parseReg}/g, '<code>$1</code>')"></td>
                  <td>{{ prop.version || '--'}}</td>
                </tr>
              </tbody>
            </table>
          </template>

          <template v-if="component.meta.events">
            <h2>${t('Events', lang)}</h2>
            <table>
              <thead>
                <tr>
                  <td>${t('name', lang)}</td>
                  <td>${t('params', lang)}</td>
                  <td>${t('description', lang)}</td>
                  <td>${t('required version', lang)}</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(event, i) in component.meta.events">
                  <td class="prop-name">
                    <el-tooltip content="${t('click to copy', lang)}" placement="left" :hide-after="0" :open-delay="50">
                      <span
                      v-clipboard:copy="'@' + i"
                      v-clipboard:success="onCopy">@{{ i }}</span>
                    </el-tooltip>
                  </td>
                  <td v-html="event.params ? event.params.replace(/${parseReg}/g, '<code>$1</code>') : '--'"></td>
                  <td v-html="event['${lang}'] ? event['${lang}'].replace(/${parseReg}/g, '<code>$1</code>') : '--'"></td>
                  <td>{{ event['version'] || '--' }}</td>
                </tr>
              </tbody>
            </table>
          </template>
      

          <template v-if="component.meta.slots">
            <h2>${t('Slots', lang)}</h2>
            <table>
              <thead>
                <tr>
                  <td>${t('name', lang)}</td>
                  <td>${t('description', lang)}</td>
                  <td>${t('required version', lang)}</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(slot, i) in component.meta.slots" :class="{'slot-disabled': slot['status'] === 'deprecated'}">
                  <td class="prop-name">
                    <el-tooltip content="${t('click to copy', lang)}" placement="left" :hide-after="0" :open-delay="50">
                      <span
                      v-clipboard:copy="i"
                      v-clipboard:success="onCopy">{{ i === 'default' ? '${t('default slot', lang)}' : i }}</span>
                    </el-tooltip>
                  </td>
                  <td v-html="slot['${lang}'] ? slot['${lang}'].replace(/${parseReg}/g, '<code>$1</code>') : ''"></td>
                  <td>{{ slot['version'] || '--' }}</td>
                </tr>
              </tbody>
            </table>
          </template>
          
          <template v-if="component.meta.methods">
            <h2>${t('Functions', lang)}</h2>
            <table>
              <thead>
                <tr>
                  <td>${t('name', lang)}</td>
                  <td>${t('params', lang)}</td>
                  <td>${t('description', lang)}</td>
                  <td>${t('required version', lang)}</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(method, i) in component.meta.methods">
                  <td class="prop-name">
                    <el-tooltip content="${t('click to copy', lang)}" placement="left" :hide-after="0" :open-delay="50">
                      <span
                      v-clipboard:copy="i"
                      v-clipboard:success="onCopy">{{ i }}</span>
                    </el-tooltip>
                  </td>
                  <td v-html="method['params'] ? method['params'].replace(/${parseReg}/g, '<code>$1</code>') : ''"></td>
                  <td v-html="method['${lang}'].replace(/${parseReg}/g, '<code>$1</code>')"></td>
                  <td>{{ method['version'] }}</td>
                </tr>
              </tbody>
            </table>
          </template>

          <template v-if="component.meta.variables">
            <a class="anchor" id="variables">Variables</a>
            <br/>
            <h2>${t('Variables', lang)}</h2>
            <table>
              <thead>
                <tr>
                  <td>${t('name', lang)}</td>
                  <td>${t('default value', lang)}</td>
                  <td>${t('description', lang)}</td>
                  <td>${t('inherited name', lang)}</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(variable, i) in component.meta.variables">
                  <td class="prop-name">
                    <el-tooltip content="${t('click to copy', lang)}" placement="left" :hide-after="0" :open-delay="50">
                      <span
                      v-clipboard:copy="'@' + variable.name"
                      v-clipboard:success="onCopy">@{{ variable.name }}</span>
                    </el-tooltip>
                  </td>
                  <td>
                    <em
                      :ref="'propColor' + i"
                      v-if="!$refs['propColor' + i] || ($refs['propColor' + i][0] && $refs['propColor' + i][0].style.backgroundColor)"
                      class="prop-color"
                      :style="{ backgroundColor: variable.value }">
                    </em>
                    {{ variable.value }}
                  </td>
                  <td>{{ variable['desc']['${lang}'] || '--' }}</td>
                  <td>{{ variable.inherited_name }}</td>
                </tr>
              </tbody>
            </table>
          </template>
      
          <template v-if="component.meta.tips && component.meta.tips['${lang}']">
            <a class="anchor" id="tips">${t('Tips', lang)}</a>
            <br>
            <h2>${t('Tips', lang)}</h2>
            <div>
              <ul>
                <li v-for="tip in component.meta.tips['${lang}']">
                <el-tag size="mini" type="success" class="component-tip-tag">Q</el-tag> <span class="component-tip-question">{{ tip.q }}</span>
                <div v-html="tip.a" class="tip-answer-box"></div>
                </li>
              </ul>
            </div>
          </template>
        </div>
      </template>

      <!--<h2>社区相关讨论</h2>
      [即将上线]
      -->
    
      <br>
      <div v-if="issues.length">
        <a class="anchor" id="Issues">Issues</a>
        <br/>
        <h2>${t('Related issues', lang)}</h2>
        <ul>
          <li v-for="issue in issues"><a target="_blank" :href="issue.html_url">#{{ issue.number}} <span style="color:#666;">{{ issue.title }}</span></a></li>
        </ul>
      </div>
      <br>
    
      <div v-if="gitMetas">
        <a class="anchor" id="contributors">${t('Contributors', lang)}</a>
        <h2>${t('Contributors', lang)}</h2>
        <p>${t('Total commits quantity:', lang)} {{ gitMetas.commitCount }}，${t('Total contributors quantity:', lang)} {{gitMetas.commitUniqueCount}}
        </p>
        <a v-for="person in gitMetas.commitMembers" class="contributor-item" :href="'https://github.com/' + person.authorName" target="_blank" :title="'${t('contribute')}' + person.count">{{person.authorName}}</a>
      </div>
      <br>

      <div v-if="metas.changes">
        <a class="anchor" id="changelog">Changelog</a>
        <br/>
        <h2>${t('Releases', lang)}</h2>
        <ul v-if="metas.changes">
          <template v-for="(changelog, version) in metas.changes">
            <li v-for="log in changelog['${lang}']">
              <router-link :to="'/${lang}/changelog/' + version + '.html'" class="changelog-version">{{version}}</router-link> {{log}}
            </li>
          </template>
        </ul>
      </div>

      <h2 v-if="metas.references">${t('Referrences', lang)}</h2>
      <ul v-if="metas.references">
        <li v-for="link in metas.references['${lang}']">
          <a :href="link.link" target="_blank">{{link.title}}</a>
        </li>
      </ul>

      <el-dialog
        class="sourcec-code-dialog"
        top="0"
        width="80%"
        :visible.sync="sourceCodeDialogVisibility">
        <div class="code-box" contenteditable v-html="demoCode"></div>
      </el-dialog>

    </div>
  </template>


  <script>
  import Axios from 'axios'

  // const metas = require('json-loader!yaml-loader!../../../src/components/${componentName}/metas.yml')
  const metas = ${JSON.stringify(metas, null, 2)}
  const demos = ${JSON.stringify(demos, null, 2)}

  let componentList = []
  if (Array.isArray(metas.items)) {
    try {
      metas.items.forEach((item, index) => {
        const meta = {
          name: item,
          meta: metas[item]
        }
        if (meta.meta.props === null) {
          delete meta.meta.props
        }
        if (index === metas.items.length - 1) {
          if (meta.meta) {
            meta.meta.variables = metas.variables
          }
        }
        componentList.push(meta)
      })
    } catch (e) {
      console.log(e)
    }
  } else {
    componentList.push({
      meta: metas
    })
  }
  const gitMetas = require('./${componentName}_git_metas.json')
  const demoCode = decodeURIComponent(\`${demoCode}\`)

  const domainMap = {
    'development': 'http://localhost:8080/',
    'production': 'https://vux.li/demos/v2/'
  }

  export default {
    head: {
      title: '${importName} ${t('component tutorial', lang)} | ${t('title', lang)}',
      meta: [{
        name: 'description',
        content: 'Vue component ${componentName} for the VUX framework.'
      }, {
        name: 'keywords',
        content: '${componentName}, vue-${componentName}, vux-${componentName}, vue mobile components'
      }, {
        property: 'og:title',
        content: '${importName} ${t('component tutorial', lang)} | ${t('title', lang)}'
      }, {
        property: 'og:description',
        content: 'Vue component ${componentName} for the VUX framework.'
      }],
      // https://support.google.com/webmasters/answer/189077?hl=en
      link: ${JSON.stringify(getAlternate(lang, `/${lang}/components/${componentName}.html`))},
      script: [
        {
          innerHTML:'${JSON.stringify(ldjson)}',
          type: 'application/ld+json'
        }
      ],
      __dangerouslyDisableSanitizers: ['script']
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
    watch: {
      async sourceCodeDialogVisibility (val) {
        if (val) {
          await this.$nextTick()
          const mask = document.querySelector('.v-modal')
          mask && mask.addEventListener('click', () => {
            this.sourceCodeDialogVisibility = false
          })
        }
      }
    },
    methods: {
      onCopyError () {
        this.$message({
          type: 'error',
          message: '${t('copy fail!', lang)}'
        })
      },
      onCopy () {
        this.$message({
          type: 'success',
          message: '${t('copy done!', lang)}'
        })
      },
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
    computed: {
      lang () {
        if (this.$route.path.indexOf('/en/') !== -1) {
          return 'en'
        }
        if (this.$route.path.indexOf('/zh-CN/') !== -1) {
          return 'zh-CN'
        }
        return 'en'
      }
    },
    data () {
      return {
        demos,
        isBeta: ${metas.beta ? 'true' : 'false'},
        hasReady: false,
        issues: [],
        componentName: '${componentName}',
        demoCode,
        sourceCodeDialogVisibility: false,
        showQr: false,
        metas: metas,
        gitMetas,
        componentList,
        localImportCode: \`${_localImportCode}\`,
        globalImportCode: \`${_globalImportCode}\`,
        needImport: ${needImport},
        toc: ${JSON.stringify(toc)},
        domain: domainMap[process.env.NODE_ENV]
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
  .prop-color {
    display: inline-block;
    width: 10px;
    height: 10px;
    border: 1px solid #aaa;
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
    if (!include || isInclude(name, include)) {
      str += `
    routes.push({
      path: '/${lang}/components/${name}.html',
      component: () => import('${component}')
    })
        `
      paths.push(`/${lang}/components/${name}.html`)
    }
  })
})

if (include) {
  paths = paths.filter(path => {
    return isInclude(path, include)
  })
}

str += `
routes.push({
  path: '*',
  component: () => import('../404.md')
})
`

const ori = fs.readFileSync(getPath('./src/index.js'), 'utf-8')
fs.writeFileSync(getPath('./src/_index.js'), ori.replace('const routes = []', `const routes = []\n${str}`))
fs.writeFileSync(getPath('./src/routes.json'), JSON.stringify(paths, null, 2))
fs.writeFileSync(getPath('./sitemap.txt'), paths.map(path => `https://doc.vux.li${path}`).join('\n'))

fs.writeFileSync(getPath('./algolia.json'), JSON.stringify(contents, null, 2))

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

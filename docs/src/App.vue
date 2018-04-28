<template>
  <div id="app" class="app">
    <div class="vux-box">
      <div class="sidebar-inner">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="1024px" height="1024px" viewBox="0 0 1024 1024" enable-background="new 0 0 1024 1024" xml:space="preserve" style="width: 60px; height: 60px;"><path data-index="path_0" fill="#35495e" d="M512 816.64 51.2 985.6l460.8-947.2 460.8 947.2L512 816.64 512 816.64zM509.44 207.36 189.44 862.72l317.44-117.76L506.88 207.36 509.44 207.36zM509.44 207.36" class="svgpath"></path></svg>
        <br>
        <h1 class="vux-title">VUX</h1>
        <div>
          <a target="_blank" href="https://github.com/airyland/vux" class="vux-github">
            <svg viewBox="0 0 64 64" width="24" height="24">
              <path stroke-width="0" fill="currentColor" d="M32 0 C14 0 0 14 0 32 0 53 19 62 22 62 24 62 24 61 24 60 L24 55 C17 57 14 53 13 50 13 50 13 49 11 47 10 46 6 44 10 44 13 44 15 48 15 48 18 52 22 51 24 50 24 48 26 46 26 46 18 45 12 42 12 31 12 27 13 24 15 22 15 22 13 18 15 13 15 13 20 13 24 17 27 15 37 15 40 17 44 13 49 13 49 13 51 20 49 22 49 22 51 24 52 27 52 31 52 42 45 45 38 46 39 47 40 49 40 52 L40 60 C40 61 40 62 42 62 45 62 64 53 64 32 64 14 50 0 32 0 Z"></path>
            </svg>
            <br>
            <!--<img class="github-star" :src="githubStarBadge" alt="">-->
          </a>
          <p class="vux-center vux-sub-title vux-time-ago">Since <span>{{days}}</span> Days Ago</p>
          <br>
          <p v-if="/zh-CN/i.test($route.path)">
            <a href="https://wj.qq.com/s/1170299/9518/" target="_blank" class="survey"> VUX 开发者调查 <span class="el-icon-arrow-right
"></span></a>
          </p>
        </div>
        <div class="analytics">
          <p class="vux-center vux-sub-title vux-time-ago"><span>{{ analytics.total_quantity_within_30m.quantity }}</span><br>▴<br></p>
          <p style="font-size:12px;">{{ t('Online developers') }}
            <el-popover trigger="hover" v-if="hasReady && lang === 'zh-CN'">
              <i class="el-icon-info" slot="reference"></i>
              <p>该数值表示当前正在进行 VUX(Vue) 开发的唯一用户数，非文档站访问数。
                <br>数据来源于 vux-loader 发送的匿名统计，作为 webpack 配置工具仅在 development 发送统计，不对构建文件加入任何代码。</p>
            </el-popover>
          </p>
          <p class="vux-center vux-sub-title vux-time-ago"><span>{{ analytics.total_quantity_within_24h.quantity }}</span><br>▴</p>
          <p style="font-size:12px;" v-for="item in analytics.user_quantity_within_24h_group_by_city.list.slice(0, 8)">
            <span>{{ item.city }}</span> {{ item.quantity }}
          </p>
          <p class="vux-center vux-sub-title vux-time-ago" style="padding-top:0;">▴</p>
          <p class="vux-center" style="font-size:12px;">{{ t('Developers in 24h') }}</p>
        </div>
      </div>
    </div>
    <div class="summary">
      <div class="summary-inner" style="left:190px;">
        <div v-show="!isComponentPage" v-for="chapter in summary" :data-category="currentCategory" class="chapter">
          <p class="chapter-title">{{chapter.title}}</p>
          <ul class="chapter-page">
            <li class="chapter-page-item" v-for="page in chapter.pages">
              <router-link :to="getPath(page.path)" :data-current-category="currentCategory">{{page.title}}</router-link>
            </li>
          </ul>
        </div>

        <div class="chapter" v-show="isComponentPage">
          <p class="chapter-title">{{ t('Css') }}</p>
          <ul class="chapter-page">
            <li class="chapter-page-item">
              <router-link :to="`/${lang}/css/1px.html`">{{ t('1px') }}</router-link>
            </li>
            <li class="chapter-page-item">
              <router-link :to="`/${lang}/css/close.html`">{{ t('css-close-icon') }}</router-link>
            </li>
          </ul>
        </div>

        <div class="chapter" v-show="isComponentPage">
          <p class="chapter-title">{{ t('Directives') }}</p>
          <ul class="chapter-page">
            <li class="chapter-page-item">
              <router-link :to="`/${lang}/directives/v-transfer-dom.html`">v-transfer-dom</router-link>
            </li>
          </ul>
        </div>

        <div class="chapter" v-show="isComponentPage">
          <p class="chapter-title">{{ t('Toolkit') }}</p>
          <ul class="chapter-page">
            <li v-for="route in toolRoutes[lang]" class="chapter-page-item">
              <router-link :to="route.path">{{ t(route.title) }}</router-link>
            </li>
          </ul>
        </div>

        <div class="chapter" v-show="isComponentPage" v-for="group in categoryComponents">
          <p class="chapter-title">{{ group['category_' + lang] }}</p>
          <ul class="chapter-page">
            <li
              class="chapter-page-item component-list-item"
              v-for="component in group.components"
              :id="`component-list-item-${component.name}`">
              <router-link :to="`/${lang}/components/${component.name}.html`">{{ component.name }}</router-link>
            </li>
          </ul>
        </div>

      </div>
    </div>
    <div class="content">
      <div class="header-nav">
        <ul class="nav-list">
          <li class="nav-item">
            <router-link :to="`/${lang}/`" :exact="true" :class="$route.path === `/${lang}/` || $route.path === `/${lang}`  ? 'link-active' : ''">{{ t('Guide') }}</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="`/${lang}/components/actionsheet.html`" :class="isComponentPage ? 'link-active' : ''">{{ t('Components') }}</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="`/${lang}/changelog/changelog.html`" :class="/changelog/.test($route.path) ? 'link-active' : ''">{{ t('Releases') }}</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="`/${lang}/contribution/donate.html`" :class="/donate/.test($route.path) ? 'link-active' : ''">{{ t('Donate') }}</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="`/${lang}/lab/index.html`" :class="/lab/.test($route.path) ? 'link-active' : ''">{{ t('Lab') }}</router-link>
          </li>
          <li class="nav-item" v-if="lang === 'zh-CN' && hide">
            <a href="https://cn.vuejs.org/v2/guide/" target="_blank"><span>Vue 中文文档</span><svg style="vertical-align:middle;padding-left:5px;" viewBox="0 0 1024 1024" width="12" height="12"><defs></defs><path d="M864 640a32 32 0 0 1 64 0v224.096A63.936 63.936 0 0 1 864.096 928H159.904A63.936 63.936 0 0 1 96 864.096V159.904C96 124.608 124.64 96 159.904 96H384a32 32 0 0 1 0 64H192.064A31.904 31.904 0 0 0 160 192.064v639.872A31.904 31.904 0 0 0 192.064 864h639.872A31.904 31.904 0 0 0 864 831.936V640z m-485.184 52.48a31.84 31.84 0 0 1-45.12-0.128 31.808 31.808 0 0 1-0.128-45.12L815.04 166.048l-176.128 0.736a31.392 31.392 0 0 1-31.584-31.744 32.32 32.32 0 0 1 31.84-32l255.232-1.056a31.36 31.36 0 0 1 31.584 31.584L924.928 388.8a32.32 32.32 0 0 1-32 31.84 31.392 31.392 0 0 1-31.712-31.584l0.736-179.392L378.816 692.48z" fill="#333333" p-id="5014"></path></svg></a>
          </li>
          <li class="nav-item" v-if="lang === 'zh-CN' && hide">
            <a href="https://vuex.vuejs.org/zh-cn/" target="_blank"><span>Vuex 中文文档</span><svg style="vertical-align:middle;padding-left:5px;" viewBox="0 0 1024 1024" width="12" height="12"><defs></defs><path d="M864 640a32 32 0 0 1 64 0v224.096A63.936 63.936 0 0 1 864.096 928H159.904A63.936 63.936 0 0 1 96 864.096V159.904C96 124.608 124.64 96 159.904 96H384a32 32 0 0 1 0 64H192.064A31.904 31.904 0 0 0 160 192.064v639.872A31.904 31.904 0 0 0 192.064 864h639.872A31.904 31.904 0 0 0 864 831.936V640z m-485.184 52.48a31.84 31.84 0 0 1-45.12-0.128 31.808 31.808 0 0 1-0.128-45.12L815.04 166.048l-176.128 0.736a31.392 31.392 0 0 1-31.584-31.744 32.32 32.32 0 0 1 31.84-32l255.232-1.056a31.36 31.36 0 0 1 31.584 31.584L924.928 388.8a32.32 32.32 0 0 1-32 31.84 31.392 31.392 0 0 1-31.712-31.584l0.736-179.392L378.816 692.48z" fill="#333333" p-id="5014"></path></svg></a>
          </li>
          <li class="nav-item">
            <a href="/en/" v-show="hide">English</a>
            <a @click="switchLang">{{ /zh-CN/.test($route.path) ? 'English(working)' : '中文' }}</a>
          </li>
          <li class="nav-item">
            <a href="https://github.com/airyland/vux" target="_blank"><span>Github</span><svg style="vertical-align:middle;padding-left:5px;" viewBox="0 0 1024 1024" width="12" height="12"><defs></defs><path d="M864 640a32 32 0 0 1 64 0v224.096A63.936 63.936 0 0 1 864.096 928H159.904A63.936 63.936 0 0 1 96 864.096V159.904C96 124.608 124.64 96 159.904 96H384a32 32 0 0 1 0 64H192.064A31.904 31.904 0 0 0 160 192.064v639.872A31.904 31.904 0 0 0 192.064 864h639.872A31.904 31.904 0 0 0 864 831.936V640z m-485.184 52.48a31.84 31.84 0 0 1-45.12-0.128 31.808 31.808 0 0 1-0.128-45.12L815.04 166.048l-176.128 0.736a31.392 31.392 0 0 1-31.584-31.744 32.32 32.32 0 0 1 31.84-32l255.232-1.056a31.36 31.36 0 0 1 31.584 31.584L924.928 388.8a32.32 32.32 0 0 1-32 31.84 31.392 31.392 0 0 1-31.712-31.584l0.736-179.392L378.816 692.48z" fill="#333333" p-id="5014"></path></svg></a>
          </li>
          <li class="search-item">
            <algolia-search
              :placeholder="t('Search documents')"
              :lang="lang"
              :emptyText="t('No search results')"></algolia-search>
          </li>
        </ul>
      </div>
      <div class="markdown-body">
        <router-view></router-view>
        <div>
          <router-link :to="`/${lang}/faq/`" v-if="/faq\//.test($route.path) && /\.html/.test($route.path)"> << {{ t('return FAQ') }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const langs = ['en', 'zh-CN']
const routes = require('./routes')
const faqRoutes = require('./faq-routes')
const toolRoutes = {
  en: require('./tool-routes-en'),
  'zh-CN': require('./tool-routes-zh-CN'),
}

const summary = require('./summary')
const t = require('../i18n')
// 组件列表
let components = require('../../src/datas/vux_component_list')
const Axios = require('axios')

// group components by category

let gComponents = components.filter(one => !!one.category_en).sort((a, b) => {
  return a.category_order > b.category_order ? 1 : -1
})

let _gComponentsList = {}

const orderMap = {}

gComponents.forEach(component => {
  if (typeof component.category_order !== 'undefined') {
    orderMap[component.category_en] = component.category_order
  }
  let categoryEn = component.category_en
  if (!_gComponentsList[categoryEn]) {
    _gComponentsList[categoryEn] = []
  }
  _gComponentsList[categoryEn].push(component)
})

let categoryComponents = []
for (let group in _gComponentsList) {
  categoryComponents.push({
    category_en: _gComponentsList[group][0]['category_en'],
    'category_zh-CN': _gComponentsList[group][0]['category_zh-CN'],
    components: _gComponentsList[group].sort((a, b) => {
      return a.name.slice(0, 1) > b.name.slice(0, 1) ? 1 : -1
    })
  })
}

categoryComponents.sort((a, b) => {
  return orderMap[a.category_en] > orderMap[b.category_en] ? 1 : -1
})

components = components.filter(one => !one.category_en)

import AlgoliaSearch from './algolia-search'

export default {
  components: {
    AlgoliaSearch
  },
  async mounted () {
    this.githubStarBadge = 'https://img.shields.io/github/stars/airyland/vux.svg?style=social&amp;label=Star'

    await this.fetchAnalytics()
    setInterval(async () => {
      await this.fetchAnalytics()
    }, 60000)
    this.hasReady = true

    // scroll current component nav into view
    if (/components\//.test(this.$route.path)) {
      try {
        const name = this.$route.path.split('components/')[1].replace('.html', '')
        const el = document.querySelector(`#component-list-item-${name}`)
        if (el) {
          setTimeout(() => {
            el.scrollIntoViewIfNeeded()
          })
        }
      } catch (e) {}
    }
  },
  methods: {
    getPath (path) {
      if (path.indexOf(`/${this.lang}/`) === -1) {
        return path.replace('zh-CN', this.lang)
      }
      return path
    },
    t (key) {
      return t(key, this.lang)
    },
    switchLang () {
      let path = ''
      if (/\/en/.test(this.$route.path)) {
        return this.$router.push(this.$route.path.replace('en', 'zh-CN'))
      }
      if (/\/zh-CN/.test(this.$route.path)) {
        return this.$router.push(this.$route.path.replace('zh-CN', 'en'))
      }
    },
    async fetchAnalytics () {
      // 获取统计
      const summary = await Axios.get('https://vux.li/analytics')
      this.analytics = summary.data
    },
    getLang () {
      if (this.$route.path.indexOf('/en/') !== -1) {
        return 'en'
      }
      if (this.$route.path.indexOf('/zh-CN/') !== -1) {
        return 'zh-CN'
      }
      return 'en'
    }
  },
  computed: {
    isComponentPage () {
      return ['components', 'directives', 'tools', 'css'].indexOf(this.currentCategory) !== -1
    },
    currentCategory () {
      return this.$route.path.split('/')[2]
    },
    lang () {
      return this.getLang()
    }
  },
  data () {
    return {
      hide: false,
      hasReady: false,
      analytics: {
        total_quantity_within_30m: {
          quantity: '--'
        },
        total_quantity_within_24h: {
          quantity: '--'
        },
        user_quantity_within_24h_group_by_city: {
          list: []
        }
      },
      showAd: false,
      components,
      githubStarBadge: null,
      summary,
      days: Math.ceil((new Date().getTime() - new Date('2016/02/14').getTime()) / (24 * 3600 * 1000)),
      height: '1000px',
      columnStyle: {
      },
      routes,
      toolRoutes,
      categoryComponents
    }
  },
  head: {
    title: 'VUX'
  }
}
</script>

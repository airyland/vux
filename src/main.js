import objectAssign from 'object-assign'

import Vue from 'vue'

import App from './App'

import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import vuxLocales from './locales/all.yml'
import componentsLocales from './locales/components.yml'

Vue.use(VueRouter)
Vue.use(Vuex)

require('es6-promise').polyfill()

/** i18n **/
let store = new Vuex.Store({
  modules: {
    i18n: vuexI18n.store
  }
})

Vue.use(vuexI18n.plugin, store)

// no transitoin in demo site
const shouldUseTransition = !/transition=none/.test(location.href)

const finalLocales = {
  'en': objectAssign(vuxLocales['en'], componentsLocales['en']),
  'zh-CN': objectAssign(vuxLocales['zh-CN'], componentsLocales['zh-CN'])
}

for (let i in finalLocales) {
  Vue.i18n.add(i, finalLocales[i])
}

import { DatetimePlugin, CloseDialogsPlugin, ConfigPlugin, BusPlugin, LocalePlugin, DevicePlugin, ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin, WechatPlugin, AjaxPlugin, AppPlugin } from 'vux'

Vue.use(LocalePlugin)
const nowLocale = Vue.locale.get()
if (/zh/.test(nowLocale)) {
  Vue.i18n.set('zh-CN')
} else {
  Vue.i18n.set('en')
}

store.registerModule('vux', {
  state: {
    demoScrollTop: 0,
    isLoading: false,
    direction: shouldUseTransition ? 'forward' : ''
  },
  mutations: {
    updateDemoPosition (state, payload) {
      state.demoScrollTop = payload.top
    },
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection (state, payload) {
      if (!shouldUseTransition) {
        return
      }
      state.direction = payload.direction
    }
  },
  actions: {
    updateDemoPosition ({commit}, top) {
      commit({type: 'updateDemoPosition', top: top})
    }
  }
})

// global VUX config
Vue.use(ConfigPlugin, {
  $layout: 'VIEW_BOX' // global config for VUX, since v2.5.12
})

// plugins
Vue.use(DevicePlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(AjaxPlugin)
Vue.use(BusPlugin)
Vue.use(DatetimePlugin)

// test
if (process.env.platform === 'app') {
  Vue.use(AppPlugin, store)
}

const wx = Vue.wechat
const http = Vue.http

/**
* -------------------------- 微信分享 ----------------------
* 请不要直接复制下面代码
*/

if (process.env.NODE_ENV === 'production') {
  wx.ready(() => {
    console.log('wechat ready')
    wx.onMenuShareAppMessage({
      title: 'VUX', // 分享标题
      desc: '基于 WeUI 和 Vue 的移动端 UI 组件库',
      link: 'https://vux.li?x-page=wechat_share_message',
      imgUrl: 'https://static.vux.li/logo_520.png'
    })

    wx.onMenuShareTimeline({
      title: 'VUX', // 分享标题
      desc: '基于 WeUI 和 Vue 的移动端 UI 组件库',
      link: 'https://vux.li?x-page=wechat_share_timeline',
      imgUrl: 'https://static.vux.li/logo_520.png'
    })
  })

  const permissions = JSON.stringify(['onMenuShareTimeline', 'onMenuShareAppMessage'])
  const url = document.location.href
  http.post('https://vux.li/jssdk?url=' + encodeURIComponent(url.split('#')[0]) + '&jsApiList=' + permissions).then(res => {
    wx.config(res.data.data)
  })
}

const FastClick = require('fastclick')
FastClick.attach(document.body)

// The following line will be replaced with by vux-loader with routes in ./demo_list.json
const routes = []

const router = new VueRouter({
  routes
})

Vue.use(CloseDialogsPlugin, router)

sync(store, router)

// simple history management
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)
let isPush = false
let endTime = Date.now()
let methods = ['push', 'go', 'replace', 'forward', 'back']

document.addEventListener('touchend', () => {
  endTime = Date.now()
})
methods.forEach(key => {
  let method = router[key].bind(router)
  router[key] = function (...args) {
    isPush = true
    method.apply(null, args)
  }
})

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})

  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', {direction: 'forward'})
    } else {
      // 判断是否是ios左滑返回
      if (!isPush && (Date.now() - endTime) < 377) {
        store.commit('updateDirection', {direction: ''})
      } else {
        store.commit('updateDirection', { direction: 'reverse' })
      }
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('updateDirection', {direction: 'forward'})
  }

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

router.afterEach(function (to) {
  isPush = false
  store.commit('updateLoadingStatus', {isLoading: false})
  if (process.env.NODE_ENV === 'production') {
    ga && ga('set', 'page', to.fullPath)
    ga && ga('send', 'pageview')
  }
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

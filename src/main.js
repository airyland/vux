import Vue from 'vue'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'

Vue.use(VueRouter)
import App from './App'
import Vuex from 'vuex'
Vue.use(Vuex)

import vuexI18n from 'vuex-i18n'

/**
* you can add your module here
*/
let store = new Vuex.Store({
  modules: {
    i18n: vuexI18n.store
  }
})

store.registerModule('vux', {
  state: {
    demoScrollTop: 0
  },
  mutations: {
    updateDemoPosition (state, payload) {
      state.demoScrollTop = payload.top
    }
  },
  actions: {
    updateDemoPosition ({commit}, top) {
      commit({type: 'updateDemoPosition', top: top})
    }
  }
})

Vue.use(vuexI18n.plugin, store)

// plugins
import { DevicePlugin, ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin, WechatPlugin, AjaxPlugin } from 'vux'
Vue.use(DevicePlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(AjaxPlugin)

const wx = WechatPlugin.$wechat
const http = AjaxPlugin.$http

/**
* -------------------------- 微信分享 ----------------------
* 请不要直接复制下面代码
*/

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
  const body = JSON.parse(this.responseText)
  wx.config(body.data)
})

import objectAssign from 'object-assign'

const vuxLocales = require('json!yaml!vux/src/locales/all.yml')
const componentsLocales = require('json!yaml!src/locales/components.yml')
const globalLocales = require('json!yaml!src/locales/global_locales.yml') || {en: {}, 'zh-CN': {}}

const finalLocales = {
  'en': objectAssign(vuxLocales['en'], componentsLocales['en'], globalLocales['en']),
  'zh-CN': objectAssign(vuxLocales['zh-CN'], componentsLocales['zh-CN'], globalLocales['zh-CN'])
}

for (let i in finalLocales) {
  Vue.i18n.add(i, finalLocales[i])
}
Vue.i18n.set('zh-CN')

const FastClick = require('fastclick')
FastClick.attach(document.body)

// The following line will be replaced with by vux-loader with routes in ./demo_list.json
const routes = []

const router = new VueRouter({
  routes
})

sync(store, router)

router.beforeEach(function (to, from, next) {
  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

router.afterEach(function (to) {
  ga && ga('set', 'page', to.fullPath)
  ga && ga('send', 'pageview')
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

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
import { DevicePlugin, ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin } from 'vux'
Vue.use(DevicePlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)

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

// The following line will be replaced with component list by vux-loader
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

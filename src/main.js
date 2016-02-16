import Vue from 'vue'
import Router from 'vue-router'
import App from './App'
import Wechat from './Wechat'
import Home from './Home'
import Yi from './yi'

/* eslint-disable no-new */
Vue.use(Router)
var router = new Router()

router.map({
  '/': {
    component: Home
  },
  '/demo/wechat': {
    component: Wechat
  },
  '/demo/yi': {
    component: Yi
  }
})

router.start(App, '#app')

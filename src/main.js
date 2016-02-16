import Vue from 'vue'
import Router from 'vue-router'
import App from './App'
import Demo from './Demo'
import Home from './Home'
import Yi from './yi'

/* eslint-disable no-new */
Vue.use(Router)
var router = new Router()

router.map({
  '/home': {
    component: Home
  },
  '/demos': {
    component: Demo
  },
  '/demo/yi': {
    component: Yi
  }
})

router.redirect({
  '*': '/news/1'
})

router.start(App, '#app')

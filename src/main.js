import Vue from 'vue'
import Router from 'vue-router'
import App from './App'
import Wechat from './Wechat'
import Home from './Home'
import Yi from './yi'
import Icon from './demos/Icon'
import Switch from './demos/Switch'
import Radio from './demos/Radio'
import Input from './demos/Input'
import Number from './demos/Number'
import Checklist from './demos/Checklist'
import Selector from './demos/Selector'
import Tip from './demos/Tip'
import Button from './demos/Button'
import Textarea from './demos/Textarea'
import Date from './demos/Date'
import Flexbox from './demos/Flexbox'
import Tab from './demos/Tab'
import Swiper from './demos/Swiper'
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
  },
  '/component/icon': {
    component: Icon
  },
  '/component/switch': {
    component: Switch
  },
  '/component/radio': {
    component: Radio
  },
  '/component/input': {
    component: Input
  },
  '/component/number': {
    component: Number
  },
  '/component/checklist': {
    component: Checklist
  },
  '/component/selector': {
    component: Selector
  },
  '/component/tip': {
    component: Tip
  },
  '/component/button': {
    component: Button
  },
  '/component/textarea': {
    component: Textarea
  },
  '/component/date': {
    component: Date
  },
  '/component/flexbox': {
    component: Flexbox
  },
  '/component/tab': {
    component: Tab
  },
  '/component/swiper': {
    component: Swiper
  }
})

router.start(App, '#app')

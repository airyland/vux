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
import Flexbox from './demos/Flexbox'
import Tab from './demos/Tab'
import Swiper from './demos/Swiper'
import Sticky from './demos/Sticky'
import Picker from './demos/Picker'
import Datetime from './demos/Datetime'
import Popup from './demos/Popup'
import Range from './demos/Range'
import Actionsheet from './demos/Actionsheet'
import Clocker from './demos/Clocker'
import Rater from './demos/Rater'
import PopupPicker from './demos/Popup-picker'
import Address from './demos/Address'
import Toast from './demos/Toast'
import Loading from './demos/Loading'
import Alert from './demos/Alert'
import Confirm from './demos/Confirm'
import Progress from './demos/Progress'
import XImg from './demos/XImg'
import Onepx from './demos/1px'
import Orientation from './demos/Orientation'
import Shake from './demos/Shake'
import Cell from './demos/Cell'
import Demo from './demos/Demo'
import Emotion from './demos/Wechat-emotion'
import Search from './demos/Search'
import Donate from './demos/Donate'
import Thanks from './demos/Thanks'
import Spinner from './demos/Spinner'
import Calendar from './demos/Calendar'
import Milestone from './demos/Milestone'
import Circle from './demos/Circle'
import Countup from './demos/Countup'
import ColorPicker from './demos/Color-picker'
import Blur from './demos/Blur'
import Scroller from './demos/Scroller'

Vue.use(Router)

var router = new Router({
  history: false, // use history=false when testing
  saveScrollPosition: true
})

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
  '/component/flexbox': {
    component: Flexbox
  },
  '/component/tab': {
    component: Tab
  },
  '/component/swiper': {
    component: Swiper
  },
  '/component/sticky': {
    component: Sticky
  },
  '/component/picker': {
    component: Picker
  },
  '/component/datetime': {
    component: Datetime
  },
  '/component/popup': {
    component: Popup
  },
  '/component/range': {
    component: Range
  },
  '/component/actionsheet': {
    component: Actionsheet
  },
  '/component/clocker': {
    component: Clocker
  },
  '/component/rater': {
    component: Rater
  },
  '/component/popup-picker': {
    component: PopupPicker
  },
  '/component/address': {
    component: Address
  },
  '/component/toast': {
    component: Toast
  },
  '/component/loading': {
    component: Loading
  },
  '/component/alert': {
    component: Alert
  },
  '/component/confirm': {
    component: Confirm
  },
  '/component/progress': {
    component: Progress
  },
  '/component/x-img': {
    component: XImg
  },
  '/component/1px': {
    component: Onepx
  },
  '/component/orientation': {
    component: Orientation
  },
  '/component/shake': {
    component: Shake
  },
  '/component/cell': {
    component: Cell
  },
  '/demo': {
    component: Demo
  },
  '/component/emotion': {
    component: Emotion
  },
  '/component/search': {
    component: Search
  },
  '/project/donate': {
    component: Donate
  },
  '/project/thanks': {
    component: Thanks
  },
  '/project/milestone': {
    component: Milestone
  },
  '/component/spinner': {
    component: Spinner
  },
  '/component/calendar': {
    component: Calendar
  },
  '/component/circle': {
    component: Circle
  },
  '/component/countup': {
    component: Countup
  },
  '/component/color-picker': {
    component: ColorPicker
  },
  '/component/blur': {
    component: Blur
  },
  '/component/scroller': {
    component: Scroller
  }
})

router.beforeEach(function (transition) {
  if (/\/http/.test(transition.to.path)) {
    let url = transition.to.path.split('http')[1]
    location.href = `http${url}`
  } else {
    transition.next()
  }
})

router.afterEach(function (transition) {
  if (transition.to.fullPath !== '/demo') {
    window.scrollTo(0, 0)
  }
})

router.start(App, '#app')

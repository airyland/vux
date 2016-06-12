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
import XButton from './demos/X-button'
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
import XImgScroller from './demos/X-img-scroller'
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
import Circle from './demos/Circle'
import Countup from './demos/Countup'
import ColorPicker from './demos/Color-picker'
import Blur from './demos/Blur'
import Scroller from './demos/Scroller'
import Comment from './demos/Comment'
import Pulldown from './demos/Pulldown'
import Pullup from './demos/Pullup'
import PulldownPullup from './demos/PulldownPullup'
import Masker from './demos/Masker'
import Countdown from './demos/Countdown'
import XHeader from './demos/X-header'
import Inview from './demos/Inview'
import InlineCalendar from './demos/Inline-calendar'
import Checker from './demos/Checker'
import ScrollerFull from './demos/Scroller-full'
import NumberRoller from './demos/Number-roller'
import Timeline from './demos/Timeline'
import Steps from './demos/Steps'
import Tabbar from './demos/Tabbar'
import TabbarLink from './demos/TabbarLink'
import Panel from './demos/Panel'
import Reddot from './demos/Reddot'
import ButtonTab from './demos/Button-tab'
import ScrollerSwiper from './demos/Scroller-swiper'
import ScrollerHeader from './demos/Scroller-header'
import Qrcode from './demos/Qrcode'
import Badge from './demos/Badge'
import Close from './demos/Close'
import Dialog from './demos/Dialog'
import DateFormatter from './demos/Date-formatter'
import Card from './demos/Card'

const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.use(Router)
Vue.config.devtools = true

const router = new Router()

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
  '/component/x-button': {
    component: XButton
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
  '/component/x-img-scroller': {
    component: XImgScroller
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
  },
  '/component/comment': {
    component: Comment
  },
  '/component/pulldown': {
    component: Pulldown
  },
  '/component/pullup': {
    component: Pullup
  },
  '/component/pulldown-pullup': {
    component: PulldownPullup
  },
  '/component/masker': {
    component: Masker
  },
  '/component/countdown': {
    component: Countdown
  },
  '/component/inview': {
    component: Inview
  },
  '/component/x-header': {
    component: XHeader
  },
  '/component/inline-calendar': {
    component: InlineCalendar
  },
  '/component/checker': {
    component: Checker
  },
  '/component/scroller/full': {
    component: ScrollerFull
  },
  '/component/scroller/header': {
    component: ScrollerHeader
  },
  '/component/number-roller': {
    component: NumberRoller
  },
  '/component/timeline': {
    component: Timeline
  },
  '/component/steps': {
    component: Steps
  },
  '/component/tabbar': {
    component: Tabbar
  },
  '/component/tabbar-link': {
    component: TabbarLink
  },
  '/component/panel': {
    component: Panel
  },
  '/component/reddot': {
    component: Reddot
  },
  '/component/button-tab': {
    component: ButtonTab
  },
  '/component/scroller-swiper': {
    component: ScrollerSwiper
  },
  '/component/qrcode': {
    component: Qrcode
  },
  '/component/badge': {
    component: Badge
  },
  '/component/close': {
    component: Close
  },
  '/component/dialog': {
    component: Dialog
  },
  '/component/date-formatter': {
    component: DateFormatter
  },
  '/component/card': {
    component: Card
  }
})

router.on('/component/center', {
  component: require('./demos/Center')
})

// save position for demo page
let demoScrollTop = 0
function saveDemoScrollTop () {
  demoScrollTop = window.scrollY
}

router.beforeEach(function (transition) {
  if (transition.to.fullPath !== '/demo') {
    window.removeEventListener('scroll', saveDemoScrollTop, false)
  }
  if (/\/http/.test(transition.to.path)) {
    let url = transition.to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    if (/\/demo\/component\/\w+/.test(transition.to.path)) {
      router.go({
        replace: true,
        path: transition.to.path.replace('/demo', ''),
        append: false
      })
    } else {
      transition.next()
    }
  }
})

router.afterEach(function (transition) {
  if (transition.to.path !== '/demo') {
    window.scrollTo(0, 0)
  } else {
    window.removeEventListener('scroll', saveDemoScrollTop, false)
    // if from component page
    if (demoScrollTop && /component/.test(transition.from.path)) {
      setTimeout(function () {
        window.scrollTo(0, demoScrollTop)
      }, 100)
    }
    setTimeout(function () {
      window.addEventListener('scroll', saveDemoScrollTop, false)
    }, 1000)
  }
})

router.start(App, '#app')

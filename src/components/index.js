/* only for building vux.css */
import Style from '../styles/index.vue' // eslint-disable-line

import Radio from './radio'
import DevTip from './dev-tip'
import XInput from './x-input'
import XNumber from './x-number'
import Cell from './cell'
import InlineDesc from './inline-desc'
import Checklist from './checklist'
import Switch from './switch'
import XTextarea from './x-textarea'
import Group from './group'
import GroupTitle from './group-title'
import Box from './box'
import Tip from './tip'
import Selector from './selector'
import XButton from './x-button'
import Swiper from './swiper'
import SwiperItem from './swiper-item'
import Sticky from './sticky'
import Picker from './picker'
import Datetime from './datetime'
import Popup from './popup'
import Range from './range'
import Actionsheet from './actionsheet'
import Clocker from './clocker'
import Rater from './rater'
import PopupPicker from './popup-picker'
import Address from './address'
import Toast from './toast'
import Loading from './loading'
import Alert from './alert'
import Confirm from './confirm'
import Progress from './progress'
import XImg from './x-img'
import Spinner from './spinner'
import Calendar from './calendar'
import Icon from './icon'
import Circle from './circle'
import ColorPicker from './color-picker'
import AddressChinaData from './address/list.json'
import Divider from './divider'
import Blur from './blur'
import Countup from './countup'
import Scroller from './scroller'
import Shake from './shake'
import WechatEmotion from './wechat-emotion'
import Search from './search'
import DateFormatter from './datetime/format'
import Masker from './masker'
import Countdown from './countdown'
import FriendlyTime from '../filters/friendly-time'
import XHeader from './x-header'
import Panel from './panel'
import InlineCalendar from './inline-calendar'
import Badge from './badge'
import Dialog from './dialog'
import Card from './card'
import Previewer from './previewer'
import NumberRoller from './number-roller'
import ViewBox from './view-box'
import Popover from './popover'

import { ButtonTab, ButtonTabItem } from './button-tab'
import { Checker, CheckerItem } from './checker'
import { Flexbox, FlexboxItem } from './flexbox'
import { Step, StepItem } from './step'
import { Timeline, TimelineItem } from './timeline'
import { Tabbar, TabbarItem } from './tabbar'
import { Tab, TabItem } from './tab'

const vux = {
  Radio,
  Group,
  DevTip,
  XInput,
  GroupTitle,
  XNumber,
  Checklist,
  Switch,
  Box,
  Tip,
  Selector,
  Cell,
  InlineDesc,
  XButton,
  XTextarea,
  Flexbox,
  FlexboxItem,
  Tab,
  TabItem,
  Swiper,
  SwiperItem,
  Sticky,
  Picker,
  Datetime,
  Popup,
  Range,
  Actionsheet,
  Clocker,
  Rater,
  PopupPicker,
  Address,
  Toast,
  Loading,
  Alert,
  Confirm,
  Progress,
  XImg,
  Spinner,
  Calendar,
  Icon,
  Circle,
  ColorPicker,
  AddressChinaData,
  Divider,
  Blur,
  Countup,
  Scroller,
  Shake,
  WechatEmotion,
  Search,
  DateFormatter,
  Masker,
  Countdown,
  FriendlyTime,
  XHeader,
  Checker,
  CheckerItem,
  Timeline,
  TimelineItem,
  Step,
  StepItem,
  Tabbar,
  TabbarItem,
  Panel,
  ButtonTab,
  ButtonTabItem,
  InlineCalendar,
  Badge,
  Dialog,
  Card,
  Previewer,
  NumberRoller,
  ViewBox,
  Popover
}

if (DEV) { // eslint-disable-line
  const { getMetas } = require('../../build/build-metas')
  const metas = getMetas(vux)
  if (window.fetch) {
    window.fetch(`http://${window.location.hostname}:8899/api/doc`, {
      method: 'POST',
      body: JSON.stringify(metas),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }
}

module.exports = vux

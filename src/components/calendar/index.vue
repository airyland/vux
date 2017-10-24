<template>
  <div class="vux-calendar">
    <cell :title="title" primary="content" @click.native="onClick" is-link>
      <span class="vux-cell-placeholder" v-if="shouldShowPlaceholder">{{ placeholder }}</span>
      <span class="vux-cell-value" v-if="showValue">{{ displayFormat(showValue, getType(showValue)) }}</span>
    </cell>
    <div v-transfer-dom="shouldTransferDom">
      <popup
      v-model="show"
      @on-show="onPopupShow"
      @on-hide="onPopupHide">

        <popup-header
        v-if="showPopupHeader || getType(value) === 'array'"
        @on-click-left="onClickLeft"
        @on-click-right="onClickRight"
        :title="popupHeaderTitle"
        :left-text="$t('cancel_text')"
        :right-text="$t('confirm_text')"></popup-header>

        <slot name="popup-before-calendar"></slot>

        <inline-calendar
        v-model="currentValue"
        @on-change="onSelect"
        :render-month="renderMonth"
        :start-date="startDate"
        :end-date="endDate"
        :show-last-month="showLastMonth"
        :show-next-month="showNextMonth"
        :highlight-weekend="highlightWeekend"
        :return-six-rows="returnSixRows"
        :hide-header="hideHeader"
        :hide-week-list="hideWeekList"
        :replace-text-list="replaceTextList"
        :weeks-list="weeksList"
        :render-function="renderFunction"
        :render-on-value-change="renderOnValueChange"
        :disable-past="disablePast"
        :disable-future="disableFuture"
        ></inline-calendar>

      </popup>
    </div>
  </div>
</template>

<i18n>
cancel_text:
  en: cancel
  zh-CN: 取消
confirm_text:
  en: done
  zh-CN: 确定
</i18n>

<script>
import InlineCalendar from '../inline-calendar'
import Popup from '../popup'
import Cell from '../cell'
import props from '../inline-calendar/props'
import TransferDom from '../../directives/transfer-dom'
import PopupHeader from '../popup-header'
import format from '../../tools/date/format'

const getType = (value) => {
  if (typeof value === 'string') {
    return 'string'
  }
  if (Object.prototype.toString.call(value) === '[object Array]') {
    return 'array'
  }
}

const pure = function (value) {
  const type = getType(value)
  if (type === 'string') {
    return value
  } else if (type === 'array') {
    return JSON.parse(JSON.stringify(value))
  }
}

const Props = {
  ...props(),
  title: {
    type: String,
    required: true
  },
  placeholder: String,
  showPopupHeader: Boolean,
  popupHeaderTitle: String,
  displayFormat: {
    type: Function,
    default: (value) => {
      return typeof value === 'string' ? value : value.join(', ')
    }
  },
  // for test only
  shouldTransferDom: {
    type: Boolean,
    default: true
  }
}

export default {
  name: 'calendar',
  directives: {
    TransferDom
  },
  components: {
    InlineCalendar,
    Popup,
    PopupHeader,
    Cell
  },
  computed: {
    shouldShowPlaceholder () {
      if (typeof this.showValue === 'string' && !this.showValue) {
        return true
      }
      if (getType(this.showValue) === 'array' && !this.showValue.length) {
        return true
      }
      return false
    }
  },
  created () {
    if (this.value === 'TODAY') {
      this.currentValue = this.showValue = this.tempValue = format(new Date(), 'YYYY-MM-DD')
      this.$emit('input', this.currentValue)
      this.$emit('on-change', this.currentValue)
    } else {
      this.currentValue = this.tempValue = this.value
      this.showValue = pure(this.currentValue)
    }
  },
  props: Props,
  methods: {
    onPopupShow () {
      this.$emit('on-show')
    },
    onPopupHide () {
      this.$emit('on-hide')
      // reset value to show value
      this.currentValue = pure(this.showValue)
    },
    getType,
    onClickLeft () {
      this.currentValue = pure(this.showValue)
      this.show = false
    },
    onClickRight () {
      this.show = false
      if (this.tempValue) {
        this.showValue = pure(this.tempValue)
        this.$emit('input', this.tempValue)
        this.$emit('on-change', this.tempValue)
      }
    },
    onClick () {
      this.show = true
    },
    onSelect (val) {
      if (!this.showPopupHeader && getType(this.value) !== 'array') {
        this.show = false
        this.showValue = pure(val)
      } else {
        this.tempValue = pure(val)
      }
    }
  },
  watch: {
    value (val) {
      this.currentValue = val
    },
    currentValue (val) {
      if (!this.showPopupHeader) {
        this.$emit('input', val)
        this.$emit('on-change', val)
      }
    }
  },
  data () {
    return {
      show: false,
      currentValue: '',
      tempValue: '',
      showValue: ''
    }
  }
}
</script>

<style lang="less">
@import '../../styles/weui/base/fn';
@import '../../styles/weui/base/mixin/setOnepx.less';

.vux-calendar {
  position: relative;
  &:before {
    .setTopLine(@weuiCellBorderColor);
    left: @weuiCellGapH;
  }
}
</style>
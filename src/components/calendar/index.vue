<template>
  <div>
    <cell :title="title" primary="content" @click.native="onClick" is-link>
      <span class="vux-cell-placeholder" v-if="!showValue || placeholder">{{ placeholder }}</span>
      <span class="vux-cell-value" v-if="showValue">{{ showValue }}</span>
    </cell>
    <div v-transfer-dom>
      <popup v-model="show">

        <popup-header
        v-if="showPopupHeader"
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

const Props = {
  ...props(),
  title: {
    type: String,
    required: true
  },
  placeholder: String,
  showPopupHeader: Boolean,
  popupHeaderTitle: String
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
  created () {
    if (this.value === 'TODAY') {
      this.currentValue = this.showValue = this.tempValue = format(new Date(), 'YYYY-MM-DD')
      this.$emit('input', this.currentValue)
      this.$emit('on-change', this.currentValue)
    } else {
      this.currentValue = this.tempValue = this.showValue = this.value
    }
  },
  props: Props,
  methods: {
    onClickLeft () {
      this.currentValue = this.showValue
      this.show = false
    },
    onClickRight () {
      this.show = false
      if (this.tempValue) {
        this.showValue = this.tempValue
        this.$emit('input', this.tempValue)
        this.$emit('on-change', this.tempValue)
      }
    },
    onClick () {
      this.show = true
    },
    onSelect (val) {
      if (!this.showPopupHeader) {
        this.show = false
        this.showValue = val
      } else {
        this.tempValue = val
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
<template>
  <div class="vux-calendar">
    <cell
      :title="title"
      primary="content"
      @click.native="onClick"
      :is-link="!readonly">
      <span class="vux-cell-placeholder" v-if="shouldShowPlaceholder">{{ placeholder }}</span>
      <span class="vux-cell-value" v-if="!shouldShowPlaceholder">{{ displayFormat(value, getType(value)) }}</span>
    </cell>
    <div v-transfer-dom="shouldTransferDom">
      <popup
        v-model="show"
        @on-show="onPopupShow"
        @on-hide="onPopupHide">

        <popup-header
          v-if="shouldConfirm"
          @on-click-left="onClickLeft"
          @on-click-right="onClickRight"
          :title="popupHeaderTitle"
          :left-text="$t('cancel_text')"
          :right-text="$t('confirm_text')"></popup-header>

        <slot name="popup-before-calendar"></slot>

        <inline-calendar
          v-model="currentValue"
          @on-change="onCalendarValueChange"
          @on-select-single-date="onSelectSingleDate"
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
          :marks="marks"
          :disable-weekend="disableWeekend"
          :disable-date-function="disableDateFunction"
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
  },
  readonly: Boolean
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
    shouldConfirm () {
      return this.showPopupHeader || this.getType(this.value) === 'array'
    },
    shouldShowPlaceholder () {
      if (typeof this.value === 'string' && !this.value) {
        return true
      }
      if (getType(this.value) === 'array' && !this.value.length) {
        return true
      }
      return false
    }
  },
  created () {
    if (this.value === 'TODAY') {
      this.currentValue = format(new Date(), 'YYYY-MM-DD')
      this.$emit('input', this.currentValue)
    } else {
      if (this.getType(this.value) === 'string') {
        this.currentValue = this.value
      } else {
        this.currentValue = pure(this.value)
      }
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
      this.currentValue = pure(this.value)
    },
    getType,
    onClickLeft () {
      this.show = false
      this.currentValue = pure(this.value)
    },
    onClickRight () {
      this.show = false
      const value = pure(this.currentValue)
      this.$emit('input', value)
    },
    onClick () {
      if (!this.readonly) {
        this.show = true
      }
    },
    onCalendarValueChange (val) {
      if (!this.shouldConfirm) {
        this.show = false
        this.$emit('input', pure(val))
      }
    },
    onSelectSingleDate () {
      if (!this.shouldConfirm) {
        this.show = false
      }
    }
  },
  watch: {
    value (newVal, oldVal) {
      if (this.getType(this.value) === 'string') {
        this.currentValue = newVal
        this.$emit('on-change', newVal)
      } else {
        if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
          this.$emit('on-change', pure(newVal))
        }
        this.currentValue = pure(newVal)
      }
    }
  },
  data () {
    return {
      show: false,
      currentValue: ''
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
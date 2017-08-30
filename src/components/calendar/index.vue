<template>
  <div>
    <cell :title="title" primary="content" @click.native="onClick" is-link>
      <span class="vux-cell-placeholder" v-if="!currentValue || placeholder">{{ placeholder }}</span>
      <span class="vux-cell-value" v-if="currentValue">{{ currentValue }}</span>
    </cell>
    <div v-transfer-dom>
      <popup v-model="show">
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

<script>
import InlineCalendar from '../inline-calendar'
import Popup from '../popup'
import Cell from '../cell'
import props from '../inline-calendar/props'
import TransferDom from '../../directives/transfer-dom'

const Props = {
  ...props(),
  title: {
    type: String,
    required: true
  },
  placeholder: String
}

export default {
  name: 'calendar',
  directives: {
    TransferDom
  },
  components: {
    InlineCalendar,
    Popup,
    Cell
  },
  created () {
    this.currentValue = this.value
  },
  props: Props,
  methods: {
    onClick () {
      this.show = true
    },
    onSelect (val) {
      this.show = false
      this.currentValue = val
    }
  },
  watch: {
    value (val) {
      this.currentValue = val
    },
    currentValue (val) {
      this.$emit('input', val)
      this.$emit('on-change', val)
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
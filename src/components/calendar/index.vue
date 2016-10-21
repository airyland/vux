<template>
  <cell :title="title" primary="content" :value="value" @click="onClick" is-link></cell>
  <popup :show.sync="show">
    <inline-calendar
    :value.sync="value"
    @on-change="onSelect"
    :render-month="renderMonth"
    :start-date="startDate",
    :end-date="endDate"
    :show-last-month="showLastMonth"
    :show-next-month="showNextMonth"
    :highlight-weekend="highlightWeekend"
    :return-six-rows="returnSixRows"
    :hide-header="hideHeader"
    :hide-week-list="hideWeekList"
    :replace-text-list="replaceTextList"
    :weeks-list="weeksList"
    :custom-slot-fn="customSlotFn"
    :render-on-value-change="renderOnValueChange"
    :disable-past="disablePast"
    :disable-future="disableFuture"
    ></inline-calendar>
  </popup>
</template>

<script>
import InlineCalendar from '../inline-calendar'
import Popup from '../popup'
import Cell from '../cell'
import props from '../inline-calendar/props'

const Props = props()
Props.title = {
  type: String,
  required: true
}

export default {
  components: {
    InlineCalendar,
    Popup,
    Cell
  },
  props: Props,
  methods: {
    onClick () {
      this.show = true
    },
    onSelect () {
      this.show = false
    }
  },
  data () {
    return {
      show: false
    }
  }
}
</script>

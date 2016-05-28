<template>
<div>
  <inline-calendar
  class="inline-calendar-demo"
  :show.sync="show"
  :value.sync="value"
  start-date="2016-04-01"
  end-date="2017-06-18"
  :range="range"
  :show-last-month="showLastMonth"
  :show-next-month="showNextMonth"
  :highlight-weekend="highlightWeekend"
  :return-six-rows="return6Rows"
  :hide-header="hideHeader"
  :hide-week-list="hideWeekList"
  :replace-text-list="replaceTextList"
  :weeks-list="weeksList"
  :custom-slot-fn="buildSlotFn"
  :disable-past="disablePast">
  </inline-calendar>
  <group title="control days" style="margin-top: 350px;">
    <switch :value.sync="disablePast" title="Disable Past"></switch>
    <switch :value.sync="showLastMonth" title="Show Last Month"></switch>
    <switch :value.sync="showNextMonth" title="Show Next Month"></switch>
    <switch :value.sync="return6Rows" inline-desc="if not, the calendar's height would change" title="Always show 6 rows"></switch>
    <switch :value.sync="highlightWeekend" title="highlight weekend"></switch>
    <cell title="current value" :value="value"></cell>
  </group>
  <group title="control navs">
    <switch :value.sync="hideHeader" title="Hide header"></switch>
    <switch :value.sync="hideWeekList" title="Hide week list"></switch>
    <switch :value.sync="changeWeeksList" title="Change weeks list"></switch>
  </group>
  <group title="replace text">
    <switch :value.sync="replace" title="Replace date text"></switch>
  </group>
  <br>
  <div style="margin: 15px;">
    <x-button type="primary" @click="value='2020-11-11'">Set time to 2020-11-11</x-button>
    <x-button type="primary" @click="value='2020-11-22'">Set time to 2020-11-22</x-button>
    <x-button type="primary" @click="value='2016-08-09'">Set time to 2016-08-09</x-button>
    <x-button type="primary" @click="value='TODAY'">Set time to today</x-button>
    <x-button type="primary" @click="value='2016-06-05'">Set time to 2016-06-05</x-button>
  </div>
  <br>
  <group title="custom every day cell">
    <switch :value.sync="useCustomFn" inline-desc="Add red dot for dates with 8" title="add custom contents in day cell"></switch>
  </group>

  <br>
  <divider>We can render a list of calendars order by month</divider>
  <group>
    <cell title="current value" :value="listValue"></cell>
  </group>
  <br>
  <div v-for="i in 5" v-if="i >= 1">
    <divider>2016 / {{i}}</divider>
    <inline-calendar
    :render-month="[2016, i]"
    hide-header
    :return-six-rows="false"
    :value.sync="listValue"
    :show-last-month="false"
    :show-next-month="false"
    :render-on-value-change="false"></inline-calendar>
  </div>
</div>
</template>

<script>
import InlineCalendar from '../components/inline-calendar'
import { Group, Switch, Radio, XButton, Cell, Divider } from '../components'

module.exports = {
  data () {
    return {
      show: true,
      value: '',
      listValue: '',
      range: false,
      showLastMonth: true,
      showNextMonth: true,
      highlightWeekend: false,
      return6Rows: true,
      hideHeader: false,
      hideWeekList: false,
      replaceTextList: {},
      replace: false,
      changeWeeksList: false,
      weeksList: [],
      useCustomFn: false,
      buildSlotFn: () => '',
      disablePast: false
    }
  },
  watch: {
    replace (val) {
      this.replaceTextList = val ? {
        'TODAY': '今'
      } : {}
    },
    useCustomFn (val) {
      this.buildSlotFn = val ? (line, index, data) => {
        return /8/.test(data.day) ? '<div style="font-size:12px;text-align:center;"><span style="display:inline-block;width:5px;height:5px;background-color:red;border-radius:50%;"></span></div>' : ''
      } : () => ''
    },
    changeWeeksList (val) {
      this.weeksList = val ? ['日', '一', '二', '三', '四', '五', '六 '] : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    }
  },
  components: {
    InlineCalendar,
    Group,
    Switch,
    Radio,
    XButton,
    Cell,
    Divider
  }
}
</script>

<style lang="less" scoped>
.inline-calendar-demo {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(5px);
}
</style>
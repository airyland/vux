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
  :replace-text-list="replaceTextList">
  </inline-calendar>
  <group title="control days" style="margin-top: 285px;">
    <switch :value.sync="showLastMonth" title="Show Last Month"></switch>
    <switch :value.sync="showNextMonth" title="Show Next Month"></switch>
    <switch :value.sync="return6Rows" inline-desc="if not, the calendar's height would change" title="Always show 6 rows"></switch>
    <switch :value.sync="highlightWeekend" title="highlight weekend"></switch>
    <cell title="current value" :value="value"></cell>
  </group>
  <group title="hide navs">
    <switch :value.sync="hideHeader" title="Hide header"></switch>
    <switch :value.sync="hideWeekList" title="Hide week list"></switch>
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
</div>
</template>

<script>
import InlineCalendar from '../components/inline-calendar'
import { Group, Switch, Radio, XButton, Cell } from '../components'

module.exports = {
  data: function () {
    return {
      show: true,
      value: '',
      range: false,
      showLastMonth: true,
      showNextMonth: true,
      highlightWeekend: false,
      return6Rows: true,
      hideHeader: false,
      hideWeekList: false,
      replaceTextList: {},
      replace: false
    }
  },
  watch: {
    replace (val) {
      this.replaceTextList = val ? {
        'TODAY': '今'
      } : {}
    }
  },
  components: {
    InlineCalendar,
    Group,
    Switch,
    Radio,
    XButton,
    Cell
  }
}
</script>

<style scoped>
.inline-calendar-demo {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(5px);
}
</style>
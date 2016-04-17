<template>
<div>
  <inline-calendar :show.sync="show" :value.sync="value" start-date="2016-06-04" end-date="2017-06-18" :range="range" :show-last-month="showLastMonth" :show-next-month="showNextMonth" :highlight-weekend="highlightWeekend"></inline-calendar>
  <group>
    <switch :value.sync="showLastMonth" title="Show Last Month"></switch>
    <switch :value.sync="showNextMonth" title="Show Next Month"></switch>
    <switch :value.sync="highlightWeekend" title="highlight weekend"></switch>
    <cell title="current value" :value="value"></cell>
  </group>
  <br>
  <div style="margin: 15px;">
    <x-button type="primary" @click="value='2020-11-11'">Set time to 2020-11-11</x-button>
    <x-button type="primary" @click="value='2020-11-22'">Set time to 2020-11-22</x-button>
    <x-button type="primary" @click="value='2016-08-09'">Set time to 2016-08-09</x-button>
    <x-button type="primary" @click="value=''">Set time to today</x-button>
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
      value: '2016-06-05',
      range: false, // 是否多选,
      showLastMonth: true,
      showNextMonth: true,
      highlightWeekend: false
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
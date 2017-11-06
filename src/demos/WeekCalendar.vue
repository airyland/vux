<template>
  <div>
    <week-calendar
    v-model="value"
    ref="calendar"
    :marks="marks"
    @on-view-change="onWeekViewChange"
    @on-year-month-change="onYearMonthChange">
      <template slot="header" slot-scope="props"><!-- use scope="props" when vue < 2.5.0 -->
        <divider>{{ props.currentMonth }}</divider>
      </template>
      <div></div>
    </week-calendar>

    <group>
      <cell title="value" :value="value"></cell>
    </group>
    <button class="demo-week-calendar-btn" @click="value='2017-10-03'"> change value 2017-10-03</button>
    <button class="demo-week-calendar-btn" @click="value='2017-11-03'"> change value 2017-11-03</button>
    <button class="demo-week-calendar-btn" @click="$refs.calendar.switchViewToCurrentValue()">switchViewToCurrentValue</button>
    <button class="demo-week-calendar-btn" @click="$refs.calendar.switchViewToToday()">switchViewToToday</button>
    <button class="demo-week-calendar-btn" @click="$refs.calendar.switchViewToMonth('2017', '07')">2017-07</button>
    <button class="demo-week-calendar-btn" @click="$refs.calendar.switchViewToMonth('2017', '10')">2017-10</button>
    <button class="demo-week-calendar-btn" @click="showMarks">show marks demo</button>
    <br>

    <inline-calendar
    v-model="value"
    :marks="marks"
    ref="inlineCalendar"
    @on-view-change="onViewChange"></inline-calendar>

  </div>
</template>

<script>
import { WeekCalendar, InlineCalendar, Divider, Group, Cell } from 'vux'

export default {
  components: {
    Group,
    Cell,
    WeekCalendar,
    InlineCalendar,
    Divider
  },
  data () {
    return {
      value: '',
      marks: [{
        date: '2017-09-10',
        bottomDot: true
      }, {
        date: '2017-09-11',
        color: 'red'
      }, {
        date: '2017-09-12',
        border: '1px solid black',
        backgroundColor: 'yellow',
        color: 'black'
      }, {
        date: '2017-09-13',
        backgroundColor: 'yellow',
        color: 'black'
      }, {
        date: '2017-09-14',
        topTip: {
          text: '节',
          color: 'red'
        }
      }, {
        date: '2017-09-15',
        border: '1px solid red'
      }]
    }
  },
  methods: {
    onYearMonthChange (data) {
      console.log(data)
    },
    showMarks () {
      this.value = '2017-09-10'
      this.$nextTick(() => {
        this.$refs.calendar.switchViewToCurrentValue()
      })
    },
    onWeekViewChange (data, index) {
      console.log(data, index)
    },
    onViewChange (data, index) {
      console.log(data)
      index > 0 && this.$refs.calendar.switchViewToMonth(data.year, data.month)
    }
  }
}
</script>

<style scoped>
.demo-week-calendar-btn {
  color: green;
  background-color: #fff;
  border-radius: 3px;
  border: 1px solid green;
  padding: 3px 3px;
  margin: 3px;
}
</style>

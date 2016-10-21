<template>
  <div class="inline-calendar" :class="{'is-weekend-highlight': highlightWeekend}">
    <div class="calendar-header" v-show="!hideHeader">
      <div class="calendar-year">
        <a class="year-prev vux-prev-icon" href="javascript:" @click="go(year - 1, month)"></a>
        <a class="calendar-year-txt calendar-title" href="javascript:">{{year}}</a>
        <a class="year-next vux-next-icon" href="javascript:" @click="go(year + 1, month)"></a>
      </div>

      <div class="calendar-month">
        <a @click="prev" class="month-prev vux-prev-icon" href="javascript:"></a>
        <a class="calendar-month-txt calendar-title" href="javascript:">{{months[month]}}</a>
        <a @click="next" class="month-next vux-next-icon" href="javascript:"></a>
      </div>
    </div>

    <table>
      <thead v-show="!hideWeekList">
        <tr>
          <th v-for="(index, week) in weeksList" class="week is-week-list-{{index}}">{{week}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(k1,day) in days">
          <td
          :data-date="formatDate(year, month, child)"
          :data-current="value"
          v-for="(k2,child) in day"
          :class="buildClass(k2, child, formatDate(year, month, child) === value && !child.isLastMonth && !child.isNextMonth)"
          @click="select(k1,k2,$event)">
            <span
            v-show="(!child.isLastMonth && !child.isNextMonth ) || (child.isLastMonth && showLastMonth) || (child.isNextMonth && showNextMonth)">{{replaceText(child.day, formatDate(year, month, child))}}</span>
            {{{customSlotFn(k1, k2, child)}}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import format from '../datetime/format'
import { getDays, zero } from './util'
import props from './props'

export default {
  props: props(),
  data () {
    return {
      year: 0,
      month: 0,
      days: [],
      current: [],
      today: format(new Date(), 'YYYY-MM-DD'),
      months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    }
  },
  ready () {
    this.value = this.convertDate(this.value)
    this.render(this.renderMonth[0], this.renderMonth[1] - 1)
  },
  computed: {
    _replaceTextList () {
      const rs = {}
      for (let i in this.replaceTextList) {
        rs[this.convertDate(i)] = this.replaceTextList[i]
      }
      return rs
    }
  },
  watch: {
    value (val) {
      this.value = this.convertDate(val)
      if (this.renderOnValueChange) {
        this.render(null, null, val)
      } else {
        this.render(this.year, this.month, this.value)
      }
      this.$emit('on-change', val)
    },
    returnSixRows (val) {
      this.render(this.year, this.month, this.value)
    },
    disablePast () {
      this.render(this.year, this.month, this.value)
    },
    disableFuture () {
      this.render(this.year, this.month, this.value)
    }
  },
  methods: {
    replaceText (day, formatDay) {
      return this._replaceTextList[formatDay] || day
    },
    convertDate (date) {
      return date === 'TODAY' ? this.today : date
    },
    buildClass (index, child, isCurrent) {
      const className = {
        current: child.current || isCurrent,
        'is-disabled': child.disabled,
        'is-today': child.isToday
      }
      className[`is-week-${index}`] = true
      return className
    },
    render (year, month) {
      let data = getDays({
        year: year,
        month: month,
        value: this.value,
        rangeBegin: this.convertDate(this.startDate),
        rangeEnd: this.convertDate(this.endDate),
        returnSixRows: this.returnSixRows,
        disablePast: this.disablePast,
        disableFuture: this.disableFuture
      })
      this.days = data.days
      this.year = data.year
      this.month = data.month
    },
    formatDate: (year, month, child) => {
      return [year, zero(child.month + 1), zero(child.day)].join('-')
    },
    prev () {
      if (this.month === 0) {
        this.month = 11
        this.year = this.year - 1
      } else {
        this.month = this.month - 1
      }
      this.render(this.year, this.month)
    },
    next () {
      if (this.month === 11) {
        this.month = 0
        this.year = this.year + 1
      } else {
        this.month = this.month + 1
      }
      this.render(this.year, this.month)
    },
    go (year, month) {
      this.render(year, month)
    },
    select (k1, k2) {
      if (this.current.length > 0) {
        this.days[this.current[0]][this.current[1]].isCurrent = false
      }
      this.days[k1][k2].current = true
      this.current = [k1, k2]
      this.value = [this.year, zero(this.month + 1), zero(this.days[k1][k2].day)].join('-')
    }
  }
}
</script>
 
<style>
.vux-prev-icon, .vux-next-icon {
  position: absolute;
  left: 0;
  top: 15px;
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 1px solid #04be02;
  border-radius: 0;
  border-top: none;
  border-right: none;
  transform: rotate(45deg);
  margin-left: 15px;
  line-height: 40px;
}
.vux-next-icon {
  transform: rotate(-135deg);
  left: auto;
  top: 14px;
  right: 15px;
}
.vux-prev-icon:before {
  display: block;
  width: 12px;
  height: 12px;
  border: 1px solid #04be02;
  border-width: 1px 0 0 1px;
  transform: rotate(315deg)
}
.is-weekend-highlight td.is-week-list-0,
.is-weekend-highlight td.is-week-list-6,
.is-weekend-highlight td.is-week-0,
.is-weekend-highlight td.is-week-6 {
  color: #E59313;
}
.inline-calendar a {
  text-decoration: none;
  tap-highlight-color: rgba(0, 0, 0, 0);
}
.calendar-year, .calendar-month {
  position: relative;
}
.calendar-header {
  line-height: 40px;
  font-size: 1.2em;
  overflow: hidden;
}
.calendar-header > div {
  float: left;
  width: 50%;
  text-align: center;
  overflow: hidden;
}
.calendar-header a:last-of-type {
  float: right;
  vertical-align: bottom;
}
.switch-btn, .calendar-title {
  display: inline-block;
  border-radius: 4px;
  line-height: 30px;
}
.switch-btn {
  width: 30px;
  margin: 5px;
  color: #39b5b8;
  font-family: "SimSun";
}
.calendar-title {
  padding: 0 6%;
  color: #333;
}
.switch-btn:active, .calendar-title:active, .calendar-header a.active {
  background-color: #39b5b8;
  color: #fff;
}
.calendar-week {
  overflow: hidden;
}
.calendar-week span {
  float: left;
  width: 14.28%;
  font-size: 1.6em;
  line-height: 34px;
  text-align: center;
}
.inline-calendar {
  width: 100%;
  background: #fff;
  border-radius: 2px;
  transition: all .5s ease;
}
.inline-calendar td.is-today, .inline-calendar td.is-today.is-disabled {
  color: #04be02;
}
.calendar-enter, .calendar-leave {
  opacity: 0;
  transform: translate3d(0,-10px, 0);
}
.calendar:before {
  position: absolute;
  left:30px;
  top: -10px;
  content: "";
  border:5px solid rgba(0, 0, 0, 0);
  border-bottom-color: #DEDEDE;
}
.calendar:after {
  position: absolute;
  left:30px;
  top: -9px;
  content: "";
  border:5px solid rgba(0, 0, 0, 0);
  border-bottom-color: #fff;
}
.calendar-tools{
  height:32px;
  font-size: 20px;
  line-height: 32px;
  color: #04be02;
}
.calendar-tools .float.left{
  float:left;
}
.calendar-tools .float.right{
  float:right;
}
.calendar-tools input{
  font-size: 20px;
  line-height: 32px;
  color: #04be02;
  width: 70px;
  text-align: center;
  border:none;
  background-color: transparent;
}
.calendar-tools>i{
  margin:0 16px;
  line-height: 32px;
  cursor: pointer;
  color:#707070;
}
.calendar-tools>i:hover{
  color:#5e7a88;
}
.inline-calendar table {
  clear: both;
  width: 100%;
  border-collapse: collapse;
  color: #444444;
}
.inline-calendar td {
  padding:5px 0;
  text-align: center;
  vertical-align: middle;
  font-size:16px;
  position: relative;
}
.inline-calendar td.week{
  pointer-events:none !important;
  cursor: default !important;
}
.inline-calendar td.is-disabled {
  color: #c0c0c0;
  pointer-events:none !important;
  cursor: default !important;
}
.inline-calendar td > span {
  display: inline-block;
  width: 26px;
  height: 26px;
  line-height: 26px;
  border-radius: 50%;
  text-align: center;
}
.inline-calendar td.placeholder {

}
.vux-calendar-range.inline-calendar td.current {
  background-color: #04be02;
}
.vux-calendar-range table {
  margin-bottom: 10px;
}
.inline-calendar td.current > span {
  background-color: #04be02;
  color: #fff;
}
.inline-calendar .timer{
  margin:10px 0;
  text-align: center;
}
.inline-calendar .timer input{
  border-radius: 2px;
  padding:5px;
  font-size: 14px;
  line-height: 18px;
  color: #5e7a88;
  width: 50px;
  text-align: center;
  border:1px solid #efefef;
}
.inline-calendar .timer input:focus{
  border:1px solid #5e7a88;
}
.calendar-button{
  text-align: center;
}
.calendar-button button{
  border:none;
  cursor: pointer;
  display: inline-block;
  min-height: 1em;
  min-width: 8em;
  vertical-align: baseline;
  background:#5e7a88;
  color:#fff;
  margin: 0 .25em 0 0;
  padding: .8em 2.5em;
  font-size: 1em;
  line-height: 1em;
  text-align: center;
  border-radius: .3em;
}
.calendar-button button.cancel{
  background:#efefef;
  color:#666;
}
</style>

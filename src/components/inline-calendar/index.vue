<template>
  <div class="inline-calendar" :class="{'is-weekend-highlight': highlightWeekend}">
    <div class="calendar-header" v-show="!hideHeader">
      <div class="calendar-year">
        <span @click="go(year - 1, month)">
          <a class="year-prev vux-prev-icon" href="javascript:"></a>
        </span>
        <a class="calendar-year-txt calendar-title" href="javascript:">{{year}}</a>
        <span class="calendar-header-right-arrow" @click="go(year + 1, month)">
          <a class="year-next vux-next-icon" href="javascript:"></a>
        </span>
      </div>

      <div class="calendar-month">
        <span @click="prev">
          <a class="month-prev vux-prev-icon" href="javascript:"></a>
        </span>
        <a class="calendar-month-txt calendar-title" href="javascript:">{{months[month]}}</a>
        <span @click="next" class="calendar-header-right-arrow">
          <a class="month-next vux-next-icon" href="javascript:"></a>
        </span>
      </div>
    </div>

    <table>
      <thead v-show="!hideWeekList">
        <tr>
          <th v-for="(week, index) in _weeksList" class="week" :class="`is-week-list-${index}`">{{week}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(day,k1) in days">
          <td
          v-for="(child,k2) in day"
          :data-date="formatDate(year, month, child)"
          :data-current="currentValue"
          :class="buildClass(k2, child)"
          @click="select(k1,k2,child)">
            <slot
            :year="year"
            :month="month"
            :child="child"
            :row="k1"
            :col="k2"
            :raw-date="formatDate(year, month, child)"
            :show-date="replaceText(child.day, formatDate(year, month, child))"
            :is-show="showChild(year, month, child)"
            name="each-day">
              <span
              class="vux-calendar-each-date"
              v-show="showChild(year, month, child)">{{replaceText(child.day, formatDate(year, month, child))}}</span>
              <div v-html="renderFunction(k1, k2, child)" v-show="showChild(year, month, child)"></div>
            </slot>
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
  name: 'inline-calendar',
  props: props(),
  data () {
    return {
      multi: false,
      year: 0,
      month: 0,
      days: [],
      today: format(new Date(), 'YYYY-MM-DD'),
      months: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      currentValue: ''
    }
  },
  created () {
    this.currentValue = this.value
    this.multi = Object.prototype.toString.call(this.currentValue) === '[object Array]'
  },
  mounted () {
    if (this.multi) {
      for (let i = 0; i < this.currentValue.length; i++) {
        this.$set(this.currentValue, i, this.convertDate(this.currentValue[i]))
      }
    } else {
      this.currentValue = this.convertDate(this.currentValue)
    }

    this.render(this.renderMonth[0], this.renderMonth[1] - 1)
  },
  computed: {
    _weeksList () {
      if (!this.weeksList || !this.weeksList.length) {
        return ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
      } else {
        return this.weeksList
      }
    },
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
      this.currentValue = this.multi ? val : this.convertDate(val)
    },
    currentValue (val) {
      const value = this.multi ? this.currentValue[this.currentValue.length - 1] : this.currentValue
      if (this.renderOnValueChange) {
        this.render(null, null, value)
      } else {
        this.render(this.year, this.month, value)
      }
      this.$emit('input', this.currentValue)
      this.$emit('on-change', this.currentValue)
    },
    renderFunction () {
      this.render(this.year, this.month, this.currentValue)
    },
    renderMonth (val) {
      if (val && val.length === 2) {
        this.render(val[0], val[1] - 1)
      }
    },
    returnSixRows (val) {
      this.render(this.year, this.month, this.currentValue)
    },
    startDate (val) {
      this.render(this.year, this.month, this.currentValue)
    },
    endDate (val) {
      this.render(this.year, this.month, this.currentValue)
    },
    disablePast () {
      this.render(this.year, this.month, this.currentValue)
    },
    disableFuture () {
      this.render(this.year, this.month, this.currentValue)
    }
  },
  methods: {
    replaceText (day, formatDay) {
      let text = this._replaceTextList[formatDay]
      if (!text && typeof text === 'undefined') {
        return day
      } else {
        return text
      }
    },
    convertDate (date) {
      return date === 'TODAY' ? this.today : date
    },
    buildClass (index, child) {
      let isCurrent = false
      if (!child.isLastMonth && !child.isNextMonth) {
        if (this.multi && this.currentValue.length > 0) {
          isCurrent = this.currentValue.indexOf(this.formatDate(this.year, this.month, child)) > -1
        } else {
          isCurrent = this.currentValue === this.formatDate(this.year, this.month, child)
        }
      }
      const className = {
        current: child.current || isCurrent,
        'is-disabled': child.disabled,
        'is-today': child.isToday
      }
      className[`is-week-${index}`] = true
      return className
    },
    render (year, month) {
      let data = null
      const value = this.multi ? this.currentValue[this.currentValue.length - 1] : this.currentValue
      data = getDays({
        year: year,
        month: month,
        value,
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
    select (k1, k2, data) {
      if (data.isLastMonth && !this.showLastMonth) {
        return
      }
      if (data.isNextMonth && !this.showNextMonth) {
        return
      }
      if (!data.isBetween) {
        return
      }
      let _currentValue = null
      if (!data.isLastMonth && !data.isNextMonth) {
        this.days[k1][k2].current = true
        _currentValue = [this.year, zero(this.month + 1), zero(this.days[k1][k2].day)].join('-')
      } else {
        _currentValue = [data.year, zero(data.month + 1), zero(data.day)].join('-')
      }
      if (this.multi) {
        let index = this.currentValue.indexOf(_currentValue)
        if (index > -1) {
          this.currentValue.splice(index, 1)
        } else {
          this.currentValue.push(_currentValue)
        }
      } else {
        this.currentValue = this.currentValue === _currentValue ? '' : _currentValue
      }

      this.currentValueChange()
    },
    currentValueChange () {
      if (this.multi) {
        for (let i = 0; i < this.currentValue.length; i++) {
          this.$set(this.currentValue, i, this.convertDate(this.currentValue[i]))
        }
      } else {
        this.currentValue = this.convertDate(this.currentValue)
      }
      const value = this.multi ? this.currentValue[this.currentValue.length - 1] : this.currentValue
      if (this.renderOnValueChange) {
        this.render(null, null, value)
      } else {
        this.render(this.year, this.month, value)
      }
      this.$emit('input', this.currentValue)
      this.$emit('on-change', this.currentValue)
    },
    showChild (year, month, child) {
      if (this.replaceText(child.day, this.formatDate(year, month, child))) {
        return (!child.isLastMonth && !child.isNextMonth) || (child.isLastMonth && this.showLastMonth) || (child.isNextMonth && this.showNextMonth)
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="less">
@import '../../styles/variable.less';

.calendar-year > span, .calendar-month > span {
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  padding: 8px;
  width: 24px;
  height: 24px;
}

.calendar-year > span.calendar-header-right-arrow, .calendar-month > span.calendar-header-right-arrow {
  left: auto;
  right: 0;
}
.vux-prev-icon, .vux-next-icon {
  position: absolute;
  left: 0;
  top: 15px;
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 1px solid @calendar-arrow-color;
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
.is-weekend-highlight td.is-week-list-0,
.is-weekend-highlight td.is-week-list-6,
.is-weekend-highlight td.is-week-0,
.is-weekend-highlight td.is-week-6 {
  color: @calendar-highlight-color;
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
.calendar-header span:last-of-type {
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
  color: @calendar-today-font-color;
}
.calendar-enter, .calendar-leave-active {
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
  font-size: @calendar-date-item-font-size;
  position: relative;
}
.inline-calendar td.week{
  pointer-events:none !important;
  cursor: default !important;
}
.inline-calendar td.is-disabled {
  color: @calendar-disabled-font-color;
}
.inline-calendar td > span.vux-calendar-each-date {
  display: inline-block;
  width: 26px;
  height: 26px;
  line-height: 26px;
  border-radius: 50%;
  text-align: center;
}
.inline-calendar td.current > span.vux-calendar-each-date {
  background-color: @calendar-selected-bg-color;
  color: #fff!important;
}
</style>

<template>
  <div class="vux-week-calendar">

    <slot name="header" :current-month="currentMonth"></slot>

    <swiper
      class="vux-week-calendar"
      v-model="index"
      :show-dots="false"
      :height="height"
      @on-index-change="onIndexChange"
      loop>

        <template v-for="(item, index) in [lastWeekList, currentWeekList, nextWeekList]">

          <swiper-item :data-start="item[0].format" :id="`x000${index}`">
            
            <slot :name="`header-day-list-${index}`">
              <flexbox :gutter="0">
                <flexbox-item
                class="vux-week-calendar-day-item"
                v-for="(i, index) in ['日', '一', '二', '三', '四', '五', '六']"
                :key="index">
                {{ i }}</flexbox-item>
              </flexbox>
            </slot>

            <flexbox :gutter="0">
              <flexbox-item
              class="vux-week-calendar-date-item"
              @click.native="onClick(i)"
              :class="{
                'is-weekend': i.isWeekend,
                'vux-week-calendar-is-today': i.isToday,
                'vux-week-calendar-is-selected': i.format === value
              }"
              v-for="(i, itemIndex) in item"
              :key="itemIndex"
              :data-date="i.format">
                <div class="vux-week-calendar-each-day-box">
                  <slot
                  :name="`each-item-${index}`"
                  :str="i.str"
                  :formatedDate="i.format"
                  :is-weekend="i.isWeekend"
                  :is-today="i.isToday"
                  :is-selected="i.format === value"
                  >
                    <span class="vux-week-calendar-each-day" :style="getMarkStyle(i)">
                    {{ i.str }}
                      <span class="vux-week-calendar-top-tip" v-if="isShowTopTip(i)" :style="isShowTopTip(i, 'style')">
                        <span>{{ isShowTopTip(i, 'text') }}</span>
                      </span>
                    </span>
                    <span class="vux-calendar-dot" v-show="isShowBottomDot(i)"></span>
                  </slot>
                </div>
              </flexbox-item>
            </flexbox>

          </swiper-item>
          
        </template>
        
      </swiper>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem } from '../flexbox'
import { Swiper, SwiperItem } from '../swiper'
import dateFormat from '../../tools/date/format'
import calendarMarksMixin from '../../mixins/calendar-marks'

/**
import { Flexbox, FlexboxItem, Swiper, SwiperItem, dateFormat } from 'vux'
**/

const getNextIndex = (index) => {
  if (index === 2) {
    return 0
  }
  if (index === 0) {
    return 1
  }
  return 2
}

const getPrevIndex = index => {
  if (index === 2) {
    return 1
  }
  if (index === 1) {
    return 0
  }
  if (index === 0) {
    return 2
  }
}

const indexMap = {
  0: 'last',
  1: 'current',
  2: 'next'
}

export default {
  mixins: [calendarMarksMixin],
  components: {
    Swiper,
    SwiperItem,
    Flexbox,
    FlexboxItem
  },
  props: {
    value: String,
    height: {
      type: String,
      default: '65px'
    },
    marks: {
      type: Array,
      default () {
        return []
      }
    }
  },
  created () {
    [0, 7, -7].forEach(item => {
      this.getThisWeekRange(item)
    })
  },
  mounted () {
    this.index = 1
  },
  watch: {
    value (val) {
      this.currentValue = val
      this.changeData(null, this.index, val)
    },
    currentValue (val) {
      this.$emit('input', val)
      this.$emit('on-change', val)
    },
    currentMonth (val) {
      const value = this.currentMonth.split('-')
      const data = {
        year: value[0],
        month: value[1]
      }
      this.$emit('on-year-month-change', data)
    }
  },
  data () {
    return {
      currentValue: this.value,
      index: 0,
      lastWeekList: [],
      currentWeekList: [],
      nextWeekList: [],
      startDate: dateFormat(new Date(), 'YYYY-MM-DD'),
      currentMonth: '',
      changeCount: -1,
      hasRender: false
    }
  },
  methods: {
    switchViewToCurrentValue () {
      if (this.currentValue) {
        this.changeData(null, this.index, this.currentValue)
      }
    },
    switchViewToMonth (year, month) {
      this.changeData(null, this.index, `${year}-${month}-01`)
    },
    switchViewToToday () {
      const today = dateFormat(new Date(), 'YYYY-MM-DD')
      this.changeData(null, this.index, today)
    },
    onClick (i) {
      this.currentValue = i.format
    },
    onIndexChange (newIndex) {
      let el = document.querySelector('#x000' + newIndex)
      const start = el.getAttribute('data-start')
      const date = new Date(start)
      this.changeData(date, newIndex)
    },
    changeData (date, index, value) {
      // if has value, reset start
      if (value) {
        const _date = new Date(value.replace(/-/g, '/'))
        date = new Date(_date.setDate(_date.getDate() - _date.getDay()))
        this[indexMap[index] + 'WeekList'] = this.getWeekRange(new Date(date.setDate(date.getDate())))
      }

      this.startDate = dateFormat(date, 'YYYY-MM-DD')

      const lastMonth = dateFormat(date.getTime() + 6 * 24 * 3600 * 1000, 'YYYY-MM')
      this.currentMonth = lastMonth

      const nextIndex = getNextIndex(index)
      const nextKey = indexMap[nextIndex]
      this[nextKey + 'WeekList'] = this.getWeekRange(new Date(date.setDate(date.getDate() + 7)))
      const lastIndex = getPrevIndex(index)
      const lastKey = indexMap[lastIndex]
      this[lastKey + 'WeekList'] = this.getWeekRange(new Date(date.setDate(date.getDate() - 14)))

      this.$nextTick(() => {
        this.changeCount++
        this.$emit('on-view-change', {
          allDates: this[indexMap[this.index] + 'WeekList']
        }, this.changeCount)
      })
    },
    getCurrentDates () {
      return this[indexMap[this.index] + 'WeekList']
    },
    getCurrentYearMonth () {
      const value = this.currentMonth.split('-')
      return {
        year: value[0],
        month: value[1]
      }
    },
    isToday (date) {
      return dateFormat(date, 'YYYY-MM-DD') === dateFormat(new Date(), 'YYYY-MM-DD')
    },
    isSelected (date) {
      return dateFormat(date, 'YYYY-MM-DD') === this.date
    },
    isWeekend (date) {
      return date.getDay() === 0 || date.getDay() === 6
    },
    getWeekRange (start) {
      let rs = [{
        format: dateFormat(start, 'YYYY-MM-DD'),
        formatedDate: dateFormat(start, 'YYYY-MM-DD'),
        date: start,
        str: dateFormat(start, 'D'),
        isWeekend: this.isWeekend(start),
        isToday: this.isWeekend(start),
        isSelected: this.isSelected(start),
        _date: start.getDate()
      }]
      for (let i = 1; i < 7; i++) {
        let current = start
        current.setDate(current.getDate() + 1)
        rs.push({
          format: dateFormat(current, 'YYYY-MM-DD'),
          date: current,
          str: dateFormat(current, 'D'),
          formatedDate: dateFormat(current, 'YYYY-MM-DD'),
          isWeekend: this.isWeekend(current),
          isToday: this.isToday(current),
          isSelected: this.isSelected(current),
          _date: current.getDate()
        })
      }
      return rs
    },
    getThisWeekRange (day = 0, start) {
      const now = start || new Date()
      const firstday = new Date(now.setDate(now.getDate() - now.getDay() + day))
      if (day === 0) {
        this.currentWeekList = this.getWeekRange(firstday)
      }
      if (day === 7) {
        this.nextWeekList = this.getWeekRange(firstday)
      }
      if (day === -7) {
        this.lastWeekList = this.getWeekRange(firstday)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/variable.less';

.vux-week-calendar {
  background-color: @week-calendar-bg;
}
.vux-week-calendar-day-item, .vux-week-calendar-date-item {
  text-align: center;
}
.vux-week-calendar-day-item {
  color: @week-calendar-header-day-item-color;
}
.vux-week-calendar-each-day-box {
  padding: 5px 0;
}
.vux-week-calendar-each-day-box {
  position: relative;
}
.vux-week-calendar-each-day {
  position: relative;
  background-color: transparent;
  border: 1px solid transparent;
  display: inline-block;
  font-size: 16px;
  color: @week-calendar-each-date-item-color;
  width: @week-calendar-each-date-item-size;
  height: @week-calendar-each-date-item-size;
  line-height: @week-calendar-each-date-item-line-height;
  text-align: center;
  border-radius: 50%;
  box-sizing: border-box;
}
.vux-week-calendar-is-selected .vux-week-calendar-each-day {
  background-color: @week-calendar-selected-item-bg-color;
  color: @week-calendar-selected-item-text-color;
}
.vux-calendar-dot {
  display: block;
  text-align: center;
  width: 5px;
  height: 5px;
  position: absolute;
  left: 50%;
  bottom: 0px;
  margin-left: -2.5px;
  background-color: @week-calendar-dot-color;
  border-radius: 50%;
}
.vux-week-calendar-top-tip {
  position: absolute;
  left: -10px;
  top: 0;
  font-size: 20px;
  transform: scale(0.5);
  transform-origin: top left;
}
</style>

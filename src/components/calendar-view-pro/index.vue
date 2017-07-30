<template>
  <div>
    <swiper
    direction="horizontal"
    v-model="index"
    :show-dots="false"
    height="270px"
    loop
    @on-index-change="onIndexChange">
      <swiper-item>
        <calendar return-six-rows hide-header v-model="currentValue" :renderOnValueChange="false" :render-month="lastMonth" ></calendar>
      </swiper-item>
      <swiper-item>
        <calendar return-six-rows hide-header v-model="currentValue" :renderOnValueChange="false" :render-month="currentMonth" ></calendar>
      </swiper-item>
      <swiper-item>
        <calendar return-six-rows hide-header v-model="currentValue" :renderOnValueChange="false" :render-month="nextMonth" ></calendar>
      </swiper-item>
    </swiper>
    {{ currentValue }}
    {{ currentViewMonth }}
  </div>
</template>

<script>
import { Swiper, SwiperItem } from '../swiper'
import Calendar from '../inline-calendar'
import { currentYearMonth, lastYearMonth, nextYearMonth } from './utils'

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
  props: {
    value: String
  },
  mounted () {
    this.currentMonth = currentYearMonth()
    this.lastMonth = lastYearMonth()
    this.nextMonth = nextYearMonth()
    this.currentViewMonth = this.currentMonth
    this.$nextTick(() => {
      this.index = 1
    })
  },
  components: {
    Swiper,
    SwiperItem,
    Calendar
  },
  methods: {
    onIndexChange (index) {
      const lastIndex = getPrevIndex(index)
      const nextIndex = getNextIndex(index)

      const currentKey = indexMap[index]
      const currentMonth = this[currentKey + 'Month']
      this.currentViewMonth = currentMonth

      const nextKey = indexMap[nextIndex]
      this[nextKey + 'Month'] = nextYearMonth(currentMonth[0], currentMonth[1])

      const lastKey = indexMap[lastIndex]
      this[lastKey + 'Month'] = lastYearMonth(currentMonth[0], currentMonth[1])
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
      index: 0,
      currentValue: '',
      lastMonth: [],
      currentMonth: [],
      currentViewMonth: [],
      nextMonth: []
    }
  }
}
</script>

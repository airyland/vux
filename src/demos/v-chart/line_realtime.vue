<template>
  <div>
    <v-chart :data="data" ref="demo">
      <v-scale x type="timeCat" :tick-count="3" mask="hh:mm:ss" />
      <v-scale y :min="8" :tick-count="5" />
      <v-tooltip :show-item-marker="false" show-x-value />
      <v-guide type="html" :options="guide1" />
      <v-guide type="html" :options="guide2" />
      <v-line />
    </v-chart>
  </div>
</template>

<script>
import { VChart, VTooltip, VLine, VScale, VGuide } from 'vux'

const data = []

// 添加数据，模拟数据，可以指定当前时间的偏移的秒
function getRecord (offset) {
  offset = offset || 0
  return {
    time: new Date().getTime() + offset * 1000,
    value: Math.random() + 10
  }
}

data.push(getRecord(-2))
data.push(getRecord(-1))
data.push(getRecord())

export default {
  components: {
    VChart,
    VTooltip,
    VLine,
    VScale,
    VGuide
  },
  mounted () {
    this.timer = setInterval(() => {
      data.push(getRecord())
    }, 2000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  data () {
    return {
      guide1: {
        position (xScale, yScales) {
          const xValues = xScale.values
          const yValues = yScales[0].values
          const xMax = xValues[xValues.length - 1]
          const yMax = yValues[yValues.length - 1]
          return [ xMax, yMax ]
        },
        html: '<div style="border-radius: 100%;border: none;width: 12px;height: 12px;background-color: rgb(24, 144, 255);transition: top 0.35s cubic-bezier(0.23, 1, 0.32, 1);"></div>'
      },
      guide2: {
        position (xScale, yScales) {
          const xValues = xScale.values
          const yValues = yScales[0].values
          const xMax = xValues[xValues.length - 1]
          const yMax = yValues[yValues.length - 1]
          return [ xMax, yMax ]
        },
        html: '<div style="border-radius: 100%;border: none;width: 20px;height: 20px;background-color: rgba(24, 144, 255, 0.5);transition: top 0.35s cubic-bezier(0.23, 1, 0.32, 1);"></div>'
      },
      data
    }
  }
}
</script>

<demo>
order: 1
title: 动态数据：实时折线
</demo>

<template>
  <div>
    <v-chart :data="data">
      <v-scale y :min="0" /> <!-- 默认 y 轴数值从数据的最小值到最大值，此处重置为从 0 开始 -->
      <v-point :styles="{
        stroke: '#fff',
        lineWidth: 1
      }"/>
      <v-tooltip :show-item-marker="false" :on-show="onShow" /> <!-- onShow 为 F2 属性而非事件-->
      <v-line />
    </v-chart>
  </div>
</template>

<script>
import { VChart, VPoint, VTooltip, VLine, VScale } from 'vux'

export default {
  components: {
    VChart,
    VPoint,
    VTooltip,
    VLine,
    VScale
  },
  data () {
    return {
      onShow (ev) {
        const { items } = ev
        items[0].name = null
        items[0].value = '$ ' + items[0].value
      },
      data: [
        { day: '周一', value: 300 },
        { day: '周二', value: 400 },
        { day: '周三', value: 350 },
        { day: '周四', value: 500 },
        { day: '周五', value: 490 },
        { day: '周六', value: 600 },
        { day: '周日', value: 900 }
      ]
    }
  }
}
</script>

<style lang='css'>
</style>

<demo>
order: 1
title: '折线图：显示点'
</demo>
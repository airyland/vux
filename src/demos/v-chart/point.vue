<template>
  <v-chart :data="data">
    <v-scale x field="height" />
    <v-scale y field="weight" />
    <v-tooltip disabled />
    <v-point
      series-field="gender"
      :styles="{
        fillOpacity: 0.65
      }"></v-point>
  </v-chart>
</template>

<script>
import { VChart, VPoint, VAxis, VTooltip, VScale } from 'vux'

/**
* [
*   {"gender":"female","height":161.2,"weight":51.6},
*   {"gender":"female","height":167.5,"weight":59}
* ]
*/
import data from './point.json'

export default {
  components: {
    VChart,
    VPoint,
    VAxis,
    VTooltip,
    VScale
  },
  data () {
    return {
      data
    }
  }
}
</script>

<demo>
title: 散点图
</demo>
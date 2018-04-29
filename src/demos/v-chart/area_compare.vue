<template>
  <div>
    <v-chart :data="data">
      <v-scale x field="year" />
      <v-scale y field="value" :min="0" :tick-count="5" />
      <v-area shape="smooth" series-field="country" />
      <v-line shape="smooth" series-field="country" />
      <v-tooltip show-value-in-legend />
      <v-axis y :label="labelFormat"/>
    </v-chart>
  </div>
</template>

<script>
import { VChart, VLine, VArea, VTooltip, VScale, VAxis } from 'vux'

/**
* [
*  {"country":"USSR/Russia","value":4500,"year":2016},
*  {"country":"USSR/Russia","value":4500,"year":2017}
* ]
*/
import data from './area_compare.json'

export default {
  components: {
    VChart,
    VLine,
    VArea,
    VTooltip,
    VScale,
    VAxis
  },
  data () {
    return {
      labelFormat: function (text) {
        return {
          text: text / 1000 + 'k'
        }
      },
      data
    }
  }
}
</script>

<demo>
title: 对比面积图：美国、苏联核储备对比
</demo>
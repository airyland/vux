<template>
  <div>
    <v-chart :data="data">
      <v-tooltip show-crosshairs />
      <v-area series-field="type" shape="smooth"/>
      <v-legend disabled />
      <v-line series-field="type" shape="smooth"/>
    </v-chart>
  </div>
</template>

<script>
import { VChart, VLine, VArea, VTooltip, VLegend } from 'vux'

/**
*[
* {"year":"1986","type":"ACME","value":162},
* {"year":"1986","type":"Compitor","value":42}
*]
*/
import data from './area_empty.json'

export default {
  components: {
    VChart,
    VLine,
    VArea,
    VTooltip,
    VLegend
  },
  data () {
    return {
      data
    }
  }
}
</script>

<demo>
title: 区域图（存在空值）
</demo>
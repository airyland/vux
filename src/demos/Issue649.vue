<template>
    <div class="record-component">
        <div>{{number}}</div>
        <range class="value-range" v-model="number" :min="min" :max="max" :step="step" :range-bar-height="rangeBarHeight" decimal></range>
    </div>
</template>

<script>
import { Range } from 'vux'

export default {
  data () {
    return {
      number: 10,
      min: 0,
      max: 250,
      step: 1,
      rangeBarHeight: 4,
      error: null
    }
  },
  components: {
    Range
  }
}
</script>

<style scoped>
.record-component {
  padding: 10px 0 0;
}
.value-range {
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 40px !important;
  margin-left: 40px !important;
}
</style>
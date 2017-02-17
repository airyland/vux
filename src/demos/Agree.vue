<template>
  <div>
    <agree>阅读并同意<a href="javascript:void(0);">《相关条款》</a></agree>
    <agree v-model="valueTrue">阅读并同意<a href="javascript:void(0);">《相关条款》</a></agree>
  </div>
</template>

<script>
import { Agree } from 'vux'

export default {
  components: {
    Agree
  },
  data () {
    return {
      valueTrue: true
    }
  }
}
</script>
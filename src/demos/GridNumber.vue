<template>
  <div>
    <grid :data="list1" :value.sync="value1"></grid>
    {{ value1 }}
  </div>
</template>

<script>
import Grid from './GridComponent'

export default {
  components: {
    Grid
  },
  data () {
    return {
      list1: Array.from(Array(13).keys()).slice(1).map(one => one + '月'),
      value1: ['1月']
    }
  }
}
</script>
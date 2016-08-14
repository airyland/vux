<template>
  <div>
    <img src="../assets/demo/filter_bg.jpg" style="width: 100%">
    <br>
    <search @on-submit="onSubmit" :auto-fixed="autoFixed"></search>
    <divider>set value</divider>
    <search @on-submit="onSubmit" :auto-fixed="false" :value.sync="value2"></search>
  </div>
</template>

<script>
import { Search, Divider } from '../components'

export default {
  components: {
    Search,
    Divider
  },
  methods: {
    resultClick (item) {
      alert('you click the result item: ' + JSON.stringify(item))
    },
    getResult (val) {
      this.results = val ? getResult(this.value) : []
    },
    onSubmit (val) {
      alert('on submit' + val)
    }
  },
  data () {
    return {
      results: [],
      autoFixed: false,
      value: '',
      value1: 'hello',
      value2: 'vux'
    }
  }
}

function getResult (val) {
  let rs = []
  for (let i = 0; i < 8; i++) {
    rs.push({
      title: `${val} result: ${i + 1} `,
      other: i
    })
  }
  return rs
}
</script>

<style scoped>
p {
  padding: 10px 15px;
  font-size: 14px;
  color: #888;
}
</style>

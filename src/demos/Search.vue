<template>
  <div>
    <img src="../assets/demo/filter_bg.jpg" style="width: 100%">
    <search @result-click="resultClick" @on-change="getResult" :results="results" v-model="value" position="absolute" auto-scroll-to-top top="46px" @on-focus="onFocus"></search>
    <br>
    <group>
      <cell title="static position demo" is-link link="/component/search-static"></cell>
    </group>
  </div>
</template>

<script>
import { Search, Group, Cell } from 'vux'

export default {
  components: {
    Search,
    Group,
    Cell
  },
  methods: {
    resultClick (item) {
      window.alert('you click the result item: ' + JSON.stringify(item))
    },
    getResult (val) {
      this.results = val ? getResult(this.value) : []
    },
    onFocus () {
      console.log('on focus')
    }
  },
  data () {
    return {
      results: [],
      value: 'test'
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

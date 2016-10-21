<template>
  <div>
    <img src="../assets/demo/filter_bg.jpg" style="width: 100%">
    <search @result-click="resultClick" @on-change="getResult" :results="results" :value.sync="value" top="46px"></search>
    <br>
    <group>
      <cell title="static position demo" is-link link="/component/search-static"></cell>
    </group>
  </div>
</template>

<script>
import { Search, Group, Cell } from '../components'

export default {
  components: {
    Search,
    Group,
    Cell
  },
  methods: {
    resultClick (item) {
      alert('you click the result item: ' + JSON.stringify(item))
    },
    getResult (val) {
      this.results = val ? getResult(this.value) : []
    }
  },
  data () {
    return {
      results: [],
      value: ''
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

<template>
  <div>
    <img src="https://ws1.sinaimg.cn/large/663d3650gy1fq685v5csyj208c06ygm0.jpg" style="width: 100%">
    <search
    @result-click="resultClick"
    @on-change="getResult"
    :results="results"
    v-model="value"
    position="absolute"
    auto-scroll-to-top top="46px"
    @on-focus="onFocus"
    @on-cancel="onCancel"
    @on-submit="onSubmit"
    ref="search"></search>
    <group>
      <cell title="keyword">{{value}}</cell>
    </group>

    <div style="padding:15px;">
      <x-button @click.native="setFocus" type="primary">set focus</x-button>
    </div>
    <group>
      <cell title="static position demo" is-link link="/component/search-static"></cell>
    </group>
  </div>
</template>

<script>
import { Search, Group, Cell, XButton } from 'vux'

export default {
  components: {
    Search,
    Group,
    Cell,
    XButton
  },
  methods: {
    setFocus () {
      this.$refs.search.setFocus()
    },
    resultClick (item) {
      window.alert('you click the result item: ' + JSON.stringify(item))
    },
    getResult (val) {
      console.log('on-change', val)
      this.results = val ? getResult(this.value) : []
    },
    onSubmit () {
      this.$refs.search.setBlur()
      this.$vux.toast.show({
        type: 'text',
        position: 'top',
        text: 'on submit'
      })
    },
    onFocus () {
      console.log('on focus')
    },
    onCancel () {
      console.log('on cancel')
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
  for (let i = 0; i < 20; i++) {
    rs.push({
      title: `${val} result: ${i + 1} `,
      other: i
    })
  }
  return rs
}
</script>

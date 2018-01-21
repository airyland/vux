<template>
  <div>
    <group>
      <popup-picker title="Select" :inline-desc="value" :data="list" v-model="value" show-name ref="picker"></popup-picker>
    </group>
    <div style="padding:15px;">
      <x-button @click.native="getValue" type="primary">Get names</x-button>
    </div>
  </div>
</template>

<script>
import { Group, PopupPicker, XButton } from 'vux'

export default {
  components: {
    Group,
    PopupPicker,
    XButton
  },
  methods: {
    getValue () {
      alert(this.$refs.picker.getNameValues())
    }
  },
  data () {
    return {
      value: ['', ''],
      list: [
        [
          {name: '全部', value: ''},
          {name: '相关性', value: 'relative'},
          {name: '入驻时间', value: 'time_asc'},
          {name: '新店推荐', value: 'time_desc'},
          {name: '店铺评价', value: 'rate_desc'},
          {name: '评价数', value: 'ratecount_desc'}
        ],
        [
          {name: '全部', value: ''},
          {name: '相关性', value: 'relative'},
          {name: '入驻时间', value: 'time_asc'},
          {name: '新店推荐', value: 'time_desc'},
          {name: '店铺评价', value: 'rate_desc'},
          {name: '评价数', value: 'ratecount_desc'}
        ]
      ]
    }
  }
}
</script>
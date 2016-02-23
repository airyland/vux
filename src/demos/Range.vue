<template>
  <div>
    <group title="default range">
      <cell title="默认" :inline_desc="'当前选择'+data1">
        <range slot="value" :value.sync="data1"></range>
      </cell>
      <cell title="允许小数" :inline_desc="'当前选择'+data2">
        <range slot="value" :value.sync="data2" decimal></range>
      </cell>
      <cell title="设置默认值20" :inline_desc="'当前选择'+data3">
        <range slot="value" :value.sync="data3"></range>
      </cell>
    </group>
    <group title="最小最大值">
      <cell title="设置最小值8" :inline_desc="'当前选择'+data4">
        <range slot="value" :value.sync="data4" :min=8></range>
      </cell>
      <cell title="设置最大值88" :inline_desc="'当前选择'+data5">
        <range slot="value" :value.sync="data5" :max=88></range>
      </cell>
      <cell title="同时设置最小和最大" :inline_desc="'当前选择'+data6">
        <range slot="value" :value.sync="data6" :min=7 :max=77></range>
      </cell>
    </group>

    <group title="设置step">
      <cell title="step为10" :inline_desc="'当前选择'+data7">
        <range slot="value" :value.sync="data7" :min=7 :max=77 :step=10></range>
      </cell>
    </group>

     <group title="disabled状态">
      <cell title="不可更改哦" :inline_desc="'当前选择'+data8">
        <range slot="value" :value.sync="data8" disabled></range>
      </cell>
       <cell title="透明度为0.2" :inline_desc="'当前选择'+data8">
        <range slot="value" :value.sync="data8" disabled :disabled_opacity=0.1></range>
      </cell>
    </group>

    <group title="bar height">
      <cell title="亮度" :inline_desc="'当前选择'+data9">
        <range slot="value" :value.sync="data9" :range_bar_height=4></range>
      </cell>
    </group>

  </div>
</template>

<script>
import { Range, Group, GroupTitle, Cell } from '../components/'
export default {
  components: {
    Range,
    Group,
    GroupTitle,
    Cell
  },
  data () {
    return {
      data1: 0,
      data2: 0,
      data3: 20,
      data4: 18,
      data5: 28,
      data6: 37,
      data7: 17,
      data8: 25,
      data9: 50
    }
  }
}
</script>

<style>
  
</style>
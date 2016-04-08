<template>
  <div>
    <group title="default range">
      <cell title="Default" :inline-desc="'value: '+data1" primary="content">
        <range slot="value" :value.sync="data1"></range>
      </cell>
      <cell title="allow decimals" :inline-desc="'value is: '+data2" primary="content">
        <range slot="value" :value.sync="data2" decimal></range>
      </cell>
      <cell title="value=20" :inline-desc="'value is: '+data3" primary="content">
        <range slot="value" :value.sync="data3"></range>
      </cell>
    </group>
    <group title="min and max">
      <cell title="min=8" :inline-desc="'value is: '+data4" primary="content">
        <range slot="value" :value.sync="data4" :min=8></range>
      </cell>
      <cell title="max=88" :inline-desc="'value is: '+data5" primary="content">
        <range slot="value" :value.sync="data5" :max=88></range>
      </cell>
      <cell title="min and max" :inline-desc="'value is: '+data6" primary="content">
        <range slot="value" :value.sync="data6" :min=7 :max=77></range>
      </cell>
    </group>

    <group title="Step">
      <cell title="step=10" :inline-desc="'valus is: '+data7" primary="content">
        <range slot="value" :value.sync="data7" :min=7 :max=77 :step=10></range>
      </cell>
    </group>

    <group title="disabled">
      <cell title="disabled=true" :inline-desc="'valus is: '+data8" primary="content">
        <range slot="value" :value.sync="data8" disabled></range>
      </cell>
      <cell title="Opacity" :inline-desc="'valus is: '+data8" primary="content">
        <range slot="value" :value.sync="data8" disabled :disabled-opacity=0.1></range>
      </cell>
    </group>

    <group title="bar height">
      <cell title="Line width" :inline-desc="'value is: '+data9" primary="content">
        <range slot="value" :value.sync="data9" :range-bar-height=4></range>
      </cell>
    </group>

    <group title="custom min and max html">
      <cell title="文字大小" :inline-desc="'font size: ' + data10" primary="content">
        <range slot="value" :value.sync="data10" :min="12" :max="22" min-HTML="<span style='font-size:12px;'>小</span>" max-HTML="<span style='font-size:22px;'>大</span>"></range>
      </cell>
      <cell title="bcontentness" :inline-desc="'value is: ' + data11 + '%'" primary="content">
        <range slot="value" :value.sync="data11" min-HTML="<span style='font-size:16px;color:#F90;'>☼</span>" max-HTML="<span style='font-size:30px;color:#F90;'>☼</span>"></range>
      </cell>
    </group>

    <group title="two way binding">
      <cell title="Default" :inline-desc="'value: '+data12" primary="content">
        <range slot="value" :value.sync="data12"></range>
      </cell>
      <cell title="Default" :inline-desc="'value: '+data12" primary="content">
        <range slot="value" :value.sync="data12"></range>
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
      data9: 50,
      data10: 14,
      data11: 30
    }
  }
}
</script>

<style>

</style>

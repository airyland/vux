<template>
  <div>
    <group title="Normal Usage">
      <cell title="set default score = 5" inline-desc="total 5 stars if not specified">
        <rater v-model="data3"></rater>
      </cell>
      <cell title="change color">
        <rater v-model="data3" :max="6" active-color="#04BE02"></rater>
      </cell>
    </group>

    <group title="disabled = true">
      <cell title="Your history score">
        <rater v-model="data4" disabled></rater>
      </cell>
      <cell :title="'Decimal score ' + data41 ">
        <rater v-model="data41" active-color="#04BE02" disabled></rater>
      </cell>
      <cell title="custom font-size(15px)">
        <rater v-model="data42" active-color="#04BE02" :font-size="15" disabled></rater>
      </cell>
    </group>

    <group title="custom star, some symbols like ♥ ❤ are not proper.">
      <cell title="loving">
        <rater v-model="data4" star="♡" active-color="red" :margin="15"></rater>
      </cell>
      <cell title="Use html">
        <rater v-model="data41" star="<span>X</span>" active-color="red" :margin="15"></rater>
      </cell>
      <cell title="Sunshine">
        <rater v-model="data5" star="☼" active-color="#FF9900" :margin="4"></rater>
      </cell>
      <cell title="Smilies">
        <rater v-model="data5" star="☻" active-color="#FF9900" :margin="4"></rater>
      </cell>
      <cell title="Different stars">
        <rater v-model="data5" star="✩" active-color="#FF9900" :margin="4"></rater>
      </cell>
      <cell title="How embarrass">
        <rater v-model="data5" star="囧" active-color="#FF9900" :margin="4"></rater>
      </cell>
    </group>

    <group title="two way binding">
      <cell title="Your history score">
        <rater v-model="data6" active-color="#04BE02"></rater>
      </cell>
      <cell title="range" primary="content" :inline-desc="data6 + ''">
        <range v-model="data6" :step="1" :min="0" :max="5"></range>
      </cell>
    </group>

    <group title="set min">
      <cell title="min = 3">
        <rater v-model="data7" :min="3"></rater>
      </cell>
    </group>

  </div>
</template>

<script>
import { Rater, Group, Cell, Range } from 'vux'

export default {
  components: {
    Rater,
    Group,
    Cell,
    Range
  },
  data () {
    return {
      data1: 0,
      data2: 5,
      data3: '5',
      data4: 3,
      data41: 3.7,
      data42: 3.5,
      data5: 3,
      data6: 3,
      data7: 0
    }
  }
}
</script>

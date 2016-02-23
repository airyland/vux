<template>
  <div>
    <rater :value.sync="data1"></rater>
    <br/>
    <rater :max=10 :value.sync="data2"></rater>
    <br/>
    <group title="和cell一起使用">
      <cell title="给个好评呗">
        <rater :value.sync="data3" slot="value"></rater>
      </cell>
      <cell title="给个好评呗">
        <rater :value.sync="data3" slot="value" :max=6 active-color="#04BE02"></rater>
      </cell>
      <cell title="给个好评呗">
        <rater :value.sync="data3" slot="value" :max=8></rater>
      </cell>
    </group>

    <group title="不可点击">
      <cell title="用户评分">
        <rater :value.sync="data4" slot="value" disabled></rater>
      </cell>
    </group>

    <group title="自定义图形,注意部分图形无法使用，比如♥ ❤">
      <cell title="爱心指数">
        <rater :value.sync="data4" slot="value" star="♡" active-color="red"></rater>
      </cell>
      <cell title="晴天指数">
        <rater :value.sync="data5" slot="value" star="☼" active-color="#FF9900" :padding="4"></rater>
      </cell>
      <cell title="心情怎么样">
        <rater :value.sync="data5" slot="value" star="☻" active-color="#FF9900" :padding="8"></rater>
      </cell>
      <cell title="其他星星">
        <rater :value.sync="data5" slot="value" star="✩" active-color="#FF9900" :padding="5"></rater>
      </cell>
      <cell title="尴尬指数">
        <rater :value.sync="data5" slot="value" star="囧" active-color="#FF9900" :padding="5"></rater>
      </cell>
      <cell title="就举上面这些例子，其他自由发挥">
      </cell>
    </group>

  </div>
</template>

<script>
import { Rater, Group, Cell } from '../components/'
export default {
  components: {
    Rater,
    Group,
    Cell
  },
  data () {
    return {
      data1: 0,
      data2: 5,
      data3: 5,
      data4: 3,
      data5: 3
    }
  }
}
</script>

<style>
  
</style>
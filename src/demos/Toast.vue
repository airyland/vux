<template>
  <div>
    <group>
      <switch title="默认提示" :value.sync="show1"></switch>
      <switch title="文字提示" :value.sync="show2"></switch>
      <switch title="提示取消" :value.sync="show3"></switch>
      <switch title="提示禁止" :value.sync="show4"></switch>
      <switch title="设置出现时间1s" :value.sync="show5"></switch>
      <switch title="long text" :value.sync="show6"></switch>
    </group>
    <toast :show.sync="show1" >默认提示</toast>
    <toast :show.sync="show2" type="text">处理成功</toast>
    <toast :show.sync="show3" type="cancel">取消操作</toast>
    <toast :show.sync="show4" type="warn">禁止操作</toast>
    <toast :show.sync="show5" :time="1000">1s关闭</toast>
    <toast :show.sync="show6" type="text" width="20em">Talk is cheap, show me the code.</toast>
  </div>
</template>

<script>
import { Toast, Group, Switch } from '../components'
export default {
  components: {
    Toast,
    Group,
    Switch
  },
  data () {
    return {
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      show6: false
    }
  }
}
</script>

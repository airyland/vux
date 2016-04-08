<template>
  <div>
    <group>
      <switch title="默认" :value.sync="show"></switch>
      <switch title="显示取消" :value.sync="show2"></switch>
      <switch title="显示禁止" :value.sync="show3"></switch>
      <switch title="设置出现时间1s" :value.sync="show1"></switch>
    </group>
    <toast :show.sync="show">处理成功</toast>
    <toast :show.sync="show2" type="cancel">取消操作</toast>
    <toast :show.sync="show3" type="warn">禁止操作</toast>
    <toast :show.sync="show1" :time=1000>1s关闭</toast>
  </div>
</template>

<script>
import { Toast, Group, Switch } from '../components/'
export default {
  components: {
    Toast,
    Group,
    Switch
  },
  data () {
    return {
      show: false,
      show1: false,
      show2: false,
      show3: false
    }
  }
}
</script>

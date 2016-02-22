<template>
<div>
  <group>
    <switch title="Show" :value.sync="show"></switch>
  </group>
  <actionsheet :show.sync="show" :menus="menus"></actionsheet>
</div>
</template>

<script>
  import { Actionsheet, Group, Switch } from '../components/'
  export default {
    components: {
      Actionsheet,
      Group,
      Switch
    },
    data () {
      return {
        show: false,
        menus: {
          menu1: '示例菜单',
          menu2: '示例菜单',
          menu3: '示例菜单',
          menu4: '示例菜单'
        }
      }
    }
  }
</script>

<style>
.popup0 {
  padding-bottom:15px;
  height:200px;
}
.popup1 {
  width:100%;
  height:100%;
}
</style>
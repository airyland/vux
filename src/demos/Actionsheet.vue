<template>
<div>
  <group>
    <switch title="Show" :value.sync="show"></switch>
  </group>
  <actionsheet :show.sync="show" :menus="menus" @menu-click="click"></actionsheet>
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
          menu1: '发送给朋友',
          menu2: '分享到朋友圈'
        }
      }
    },
    methods: {
      click: function (key) {
        console.log(key)
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
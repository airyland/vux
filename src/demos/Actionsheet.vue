<template>
  <div>
    <group>
      <switch title="Normal Usage" :value.sync="show1"></switch>
      <switch title="Show cancel menu" :value.sync="show2"></switch>
    </group>
    <actionsheet :show.sync="show1" :menus="menus1" @menu-click="click"></actionsheet>
    <actionsheet :show.sync="show2" :menus="menus2" @menu-click="click" show-cancel></actionsheet>
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
      show1: false,
      menus1: {
        menu1: 'Share to friends',
        menu2: 'Share to timeline'
      },
      show2: false,
      menus2: {
        menu1: 'Take Photo',
        menu2: 'Choose from photos'
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

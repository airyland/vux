<template>
  <div>
    <group>
      <switch title="Normal Usage" :value.sync="show1"></switch>
      <switch title="Show cancel menu" :value.sync="show2"></switch>
      <switch title="menu as tips" :value.sync="show3"></switch>
    </group>
    <actionsheet :show.sync="show1" :menus="menus1" @on-click-menu="click"></actionsheet>
    <actionsheet :show.sync="show2" :menus="menus2" @on-click-menu="click" show-cancel></actionsheet>
    <actionsheet :show.sync="show3" :menus="menus3" @on-click-menu="click" @on-click-menu-delete="onDelete" show-cancel></actionsheet>
    <toast :show.sync="showSuccess">Deleted~</toast>
  </div>
</template>

<script>
import { Actionsheet, Group, Switch, Toast } from '../components'

export default {
  components: {
    Actionsheet,
    Group,
    Switch,
    Toast
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
      },
      show3: false,
      showSuccess: false,
      menus3: {
        'title.noop': 'Are you sure?<br/><span style="color:#666;font-size:12px;">Once deleted, you will never find it.</span>',
        delete: '<span style="color:red">Delete</span>'
      }
    }
  },
  methods: {
    click (key) {
      console.log(key)
    },
    onDelete () {
      this.showSuccess = true
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

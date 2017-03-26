<template>
  <div>
    <group>
      <x-switch :title="$t('Basic Usage')" v-model="show1"></x-switch>
      <x-switch :title="$t('Show cancel menu')" v-model="show2"></x-switch>
      <x-switch :title="$t('menu as tips')" v-model="show3"></x-switch>
      <x-switch :title="$t('Array menu')" v-model="show5"></x-switch>
    </group>

    <group :title="$t('prevent closing when clicking mask')">
      <x-switch :title="$t('Basic Usage')" v-model="show4"></x-switch>
    </group>

    <actionsheet v-model="show4" :menus="menus1" :close-on-clicking-mask="false" show-cancel></actionsheet>

    <actionsheet v-model="show1" :menus="menus1" @on-click-menu="click"></actionsheet>

    <actionsheet v-model="show2" :menus="menus2" @on-click-menu="click" show-cancel></actionsheet>

    <actionsheet v-model="show3" :menus="menus3" @on-click-menu="click" @on-click-menu-delete="onDelete" show-cancel></actionsheet>

    <actionsheet v-model="show5" :menus="menus5" show-cancel @on-click-menu="click"></actionsheet>
    
    <toast v-model="showSuccess">{{$t('Deleted~') }}</toast>
  </div>
</template>

<i18n>
Basic Usage:
  zh-CN: 基本使用
Show cancel menu:
  zh-CN: 显示取消菜单
menu as tips:
  zh-CN: 显示提示文字
prevent closing when clicking mask:
  zh-CN: 点击遮罩区域不自动关闭
Share to friends:
  zh-CN: 分享给朋友
Share to timeline:
  zh-CN: 分享到朋友圈
Take Photo:
  zh-CN: 拍照
Choose from photos:
  zh-CN: 从相册选择
'Are you sure?<br/><span style="color:#666;font-size:12px;">Once deleted, you will never find it.</span>':
  zh-CN: '确定咩?<br/><span style="color:#666;font-size:12px;">删除后就无法撤消了哦</span>'
'<span style="color:red">Delete</span>':
  zh-CN: '<span style="color:red">删除</span>'
Array menu:
  zh-CN: 使用数组定义菜单
</i18n>

<script>
import { Actionsheet, Group, XSwitch, Toast } from 'vux'

export default {
  components: {
    Actionsheet,
    Group,
    XSwitch,
    Toast
  },
  mounted () {
    document.title = 'actionsheet'
    setTimeout(() => {
      document.title = 'actionsheet again'
    }, 5000)
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
      show4: false,
      show5: false,
      menus5: [{
        label: 'Are you sure?<br/><span style="color:#666;font-size:12px;">Once deleted, you will never find it.</span>',
        type: 'info'
      }, {
        label: 'Primary',
        type: 'primary',
        value: 'primary'
      }, {
        label: 'Warn',
        type: 'warn'
      }, {
        label: 'Disabled',
        type: 'disabled'
      }, {
        label: 'Default'
      }],
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

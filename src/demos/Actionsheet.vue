<template>
  <div>
    <group>
      <x-switch :title="$t('Basic Usage')" v-model="show1"></x-switch>
      <x-switch :title="$t('Android Theme')" v-model="show7"></x-switch>
      <x-switch :title="$t('Show cancel menu')" v-model="show2"></x-switch>
      <x-switch :title="$t('Array menu')" v-model="show5"></x-switch>
    </group>

    <group :title="$t('Prevent closing when clicking mask')">
      <x-switch :title="$t('Basic Usage')" v-model="show4"></x-switch>
    </group>

    <group>
      <x-switch :title="$t('Menu as tips')" v-model="show3"></x-switch>
      <x-switch :title="$t('Slot: header')" v-model="show6"></x-switch>
      <x-switch :title="$t('Prevent auto closing')" v-model="show8"></x-switch>
    </group>

    <actionsheet v-model="show4" :menus="menus1" :close-on-clicking-mask="false" show-cancel @on-click-mask="console('on click mask')"></actionsheet>

    <actionsheet v-model="show1" :menus="menus1" @on-click-menu="click"></actionsheet>

    <actionsheet v-model="show2" :menus="menus2" @on-click-menu="click" show-cancel></actionsheet>

    <actionsheet v-model="show3" :menus="menus3" @on-click-menu="click" @on-click-menu-delete="onDelete" show-cancel></actionsheet>

    <actionsheet v-model="show5" :menus="menus5" show-cancel @on-click-menu="click5"></actionsheet>

    <actionsheet v-model="show6" :menus="menus1">
      <p slot="header" v-html="$t('Actionsheet header')"></p>
    </actionsheet>

    <actionsheet v-model="show7" :menus="menu7" theme="android" @on-click-menu="click">
    </actionsheet>

    <toast v-model="showSuccess">{{ $t('Deleted~') }}</toast>

    <div v-transfer-dom>
      <actionsheet v-model="show8" :menus="menus8" @on-click-menu="demo8doClose" :close-on-clicking-mask="false" :close-on-clicking-menu="false">
      </actionsheet>
    </div>
  </div>
</template>

<i18n>
Prevent auto closing:
  zh-CN: 不自动关闭
Close me:
  zh-CN: 点我关闭
Deleted~:
  zh-CN: 删除成功
'Slot: header':
  zh-CN: 使用 header slot
Basic Usage:
  zh-CN: 基本使用
Android Theme:
  zh-CN: 安卓风格
Show cancel menu:
  zh-CN: 显示取消菜单
Menu as tips:
  zh-CN: 显示提示文字
Prevent closing when clicking mask:
  zh-CN: 点击遮罩区域不自动关闭
Share to friends:
  zh-CN: 分享给朋友
Share to timeline:
  zh-CN: 分享到朋友圈
Take Photo:
  zh-CN: 拍照
Choose from photos:
  zh-CN: 从相册选择
Actionsheet header:
  en: 'Are you sure?<br/><span style="color:#666;font-size:12px;">Once deleted, you will never find it.</span>'
  zh-CN: '确定咩?<br/><span style="color:#666;font-size:12px;">删除后就无法撤消了哦</span>'
'<span style="color:red">Delete</span>':
  zh-CN: '<span style="color:red">删除</span>'
Array menu:
  zh-CN: 使用数组定义菜单
</i18n>

<script>
import { TransferDom, Actionsheet, Group, XSwitch, Toast } from 'vux'

export default {
  components: {
    Actionsheet,
    Group,
    XSwitch,
    Toast
  },
  directives: {
    TransferDom
  },
  data () {
    return {
      show1: false,
      menus1: {
        menu1: this.$t('Share to friends'),
        menu2: this.$t('Share to timeline')
      },
      show2: false,
      menus2: {
        menu1: this.$t('Take Photo'),
        menu2: this.$t('Choose from photos')
      },
      show3: false,
      show4: false,
      show5: false,
      show6: false,
      show7: false,
      show8: false,
      menus5: [{
        label: this.$t('Actionsheet header'),
        type: 'info'
      }, {
        label: 'Primary',
        type: 'primary',
        value: 'primary',
        otherProp: 'hey'
      }, {
        label: 'Warn',
        type: 'warn'
      }, {
        label: 'Disabled',
        type: 'disabled'
      }, {
        label: 'Default'
      }],
      menu7: {
        menu1: '北京烤鸭',
        menu2: '陕西油泼面',
        menu3: '西安肉夹馍'
      },
      showSuccess: false,
      menus3: {
        'title.noop': this.$t('Actionsheet header'),
        delete: '<span style="color:red">Delete</span>'
      },
      menus8: {
        menu1: this.$t('Close me'),
        menu2: this.$t('Close me')
      }
    }
  },
  methods: {
    demo8doClose () {
      this.$vux.loading.show({
        text: 'processing'
      })
      setTimeout(() => {
        this.$vux.loading.hide()
        this.show8 = false
      }, 1000)
    },
    console (msg) {
      console.log(msg)
    },
    click (key) {
      console.log(key)
    },
    click5 (key, item) {
      console.log(key, item)
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

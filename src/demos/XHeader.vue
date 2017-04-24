<template>
  <div>
    <br>
    <x-header>This is the page title.</x-header>
    <br>
    <x-header :left-options="{showBack: false}">do not show Back</x-header>
    <br>
    <x-header :left-options="{backText: ''}">set empty back text</x-header>
    <br>
    <x-header :right-options="{showMore: true}" @on-click-more="showMenus = true">with more menu</x-header>
    <br>
    <x-header>with right link<a slot="right">Feedback</a></x-header>
    <br>
    <x-header>long long long long long long long text<a slot="right">Feedback</a></x-header>
    <br>
    <x-header>with left slot<a slot="left">Close</a></x-header>
    <br>
    <x-header>
      <span>overwrite-left</span>
      <x-icon slot="overwrite-left" type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
    </x-header>
    <br>
    <x-header style="background-color:#000;">custom background color</x-header>
    <div v-transfer-dom>
      <actionsheet :menus="menus" v-model="showMenus" show-cancel></actionsheet>
    </div>
  </div>
</template>

<script>
import { XHeader, Actionsheet, TransferDom } from 'vux'

export default {
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    Actionsheet
  },
  data () {
    return {
      menus: {
        menu1: 'Take Photo',
        menu2: 'Choose from photos'
      },
      showMenus: false
    }
  }
}
</script>
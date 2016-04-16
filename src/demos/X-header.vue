<template>
  <div>
    <x-header>This is the page title.</x-header>
    <br>
    <x-header :right-options="{showMore: true}" @on-click-more="showMenus = true">with more menu</x-header>
    <br>
    <x-header>with right link<a slot="right">Feedback</a></x-header>
    <br>
    <x-header>long long long long long long long text<a slot="right">Feedback</a></x-header>
    <br>
    <x-header>with left slot<a slot="left">Close</a></x-header>
    <br>
    <x-header style="background-color:#000;">custom background color</x-header>
    <actionsheet :menus="menus" :show.sync="showMenus" show-cancel></actionsheet>
  </div>
</template>

<script>
import XHeader from '../components/x-header'
import { Actionsheet } from '../components'

export default {
  components: {
    XHeader,
    Actionsheet
  },
  props: {
    leftOptions: {
      type: Object,
      default () {
        return {
          showBackArrow: true,
          backText: 'Back'
        }
      }
    },
    rightOptions: {
      type: Object,
      default () {
        return {
          showMore: false
        }
      }
    }
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
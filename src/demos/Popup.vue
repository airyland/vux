<template>
  <div>
    <group>
      <switch title="Default popup" :value.sync="show"></switch>
      <switch title="Full popup" :value.sync="show1"></switch>
      <switch title="with a Scroller" :value.sync="show2"></switch>
      <switch title="Multi popup (first)" :value.sync="show3"></switch>
      <switch title="Mask disable" :value.sync="show5"></switch>
      <switch title="Popup address" :value.sync="show6"></switch>
    </group>
    <popup :show.sync="show" @on-hide="log('hide')" @on-show="log('show')">
      <div class="popup0">
        <group>
          <switch title="Another Switcher" :value.sync="show"></switch>
          <switch title="Show Toast" :value.sync="showToast"></switch>
        </group>
      </div>
    </popup>

    <toast :show.sync="showToast">You did it!</toast>

    <popup :show.sync="show1" height="100%">
      <div class="popup1">
        <group>
          <switch title="Another Switcher" :value.sync="show1"></switch>
        </group>
      </div>
    </popup>

    <popup :show.sync="show2" height="200px" @on-first-show="resetScroller">
      <scroller height="100px" lock-x style="border:1px solid red;" v-ref:scroller>
        <div>
          <p v-for="i of 10">{{i}}</p>
        </div>
      </scroller>
    </popup>

    <popup :show.sync="show3">
      <div class="popup2">
        <group>
          <switch title="Multi Popup (first)" :value.sync="show3"></switch>
          <switch title="Multi Popup (second)" :value.sync="show4"></switch>
        </group>
        this is the first popup
      </div>
    </popup>

    <popup :show.sync="show4">
      <div class="popup2">
        <group>
          <switch title="Multi Popup (second)" :value.sync="show4"></switch>
        </group>
        this is the second popup
      </div>
    </popup>

    <popup :show.sync="show5" :hide-on-blur=false>
      <div class="popup2">
        <group>
          <switch title="Mask disable" :value.sync="show5"></switch>
        </group>
        The mask cannot be clicked!
      </div>
    </popup>

    <popup :show.sync="show6">
      <div class="popup1">
        <group>
          <switch title="Popup address" :value.sync="show6"></switch>
        </group>
        <group>
          <address :title="title6" :value.sync="value6" :list="addressData" placeholder="请选择地址" inline-desc="可以设置placeholder"></address>
        </group>
      </div>
    </popup>

  </div>
</template>

<script>
import { Popup, Group, Switch, Scroller, Toast, Address, AddressChinaData } from '../components'

export default {
  components: {
    Popup,
    Group,
    Switch,
    Scroller,
    Toast,
    Address
  },
  data () {
    return {
      addressData: AddressChinaData,
      show: false,
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      show6: false,
      title6: '默认空的',
      value6: [],
      showToast: false
    }
  },
  methods: {
    resetScroller () {
      this.$refs.scroller.reset()
    },
    log (str) {
      console.log(str)
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
.popup2 {
  padding-bottom:15px;
  height:400px;
}
</style>

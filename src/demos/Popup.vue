<template>
  <div>
    <group>
      <x-switch title="Default popup" v-model="show"></x-switch>
      <x-switch title="Full popup" v-model="show1"></x-switch>
      <x-switch title="Multi popup (first)" v-model="show3"></x-switch>
      <x-switch title="Mask disable" v-model="show5"></x-switch>
      <x-switch title="Popup address" v-model="show6"></x-switch>
      <x-switch title="default max-height=100%" v-model="show12"></x-switch>
      <x-switch title="set max-height=50%" v-model="show13"></x-switch>
    </group>
    
    <div v-transfer-dom>
      <popup v-model="show" @on-hide="log('hide')" @on-show="log('show')">
        <div class="popup0">
          <group>
            <x-switch title="Another XSwitcher" v-model="show"></x-switch>
            <x-switch title="Show Toast" v-model="showToast"></x-switch>
          </group>
        </div>
      </popup>
    </div>

    <toast v-model="showToast">You did it!</toast>
    
    <div v-transfer-dom>
      <popup v-model="show1" height="100%">
        <div class="popup1">
          <group>
            <x-switch title="Another XSwitcher" v-model="show1"></x-switch>
          </group>
        </div>
      </popup>
    </div>
    
    <div v-transfer-dom>
      <popup v-model="show3">
        <div class="popup2">
          <group>
            <x-switch title="Multi Popup (first)" v-model="show3"></x-switch>
            <x-switch title="Multi Popup (second)" v-model="show4"></x-switch>
          </group>
          this is the first popup
        </div>
      </popup>
    </div>
    
    <div v-transfer-dom>
      <popup v-model="show4">
        <div class="popup2">
          <group>
            <x-switch title="Multi Popup (second)" v-model="show4"></x-switch>
          </group>
          this is the second popup
        </div>
      </popup>
    </div>
    
    <div v-transfer-dom>
      <popup v-model="show5" :hide-on-blur=false>
        <div class="popup2">
          <group>
            <x-switch title="Mask disable" v-model="show5"></x-switch>
          </group>
          The mask cannot be clicked!
        </div>
      </popup>
    </div>
    
    <div v-transfer-dom>
      <popup v-model="show6">
        <div class="popup1">
          <group>
            <x-switch title="Popup address" v-model="show6"></x-switch>
          </group>
          <group>
            <x-address :title="title6" v-model="value6" :list="addressData" placeholder="请选择地址" inline-desc="可以设置placeholder" :popup-style="{zIndex: 502}"></x-address>
          </group>
        </div>
      </popup>
    </div>

    <group>
      <x-switch title="transparent background" v-model="show7"></x-switch>
    </group>
    
    <div v-transfer-dom>
      <popup v-model="show7" height="270px" is-transparent>
        <div style="width: 95%;background-color:#fff;height:250px;margin:0 auto;border-radius:5px;padding-top:10px;">
         <group>
          <cell title="Product" value="Donate"></cell>
          <cell title="Total" value="$10.24"></cell>
         </group>
         <div style="padding:20px 15px;">
          <x-button type="primary">Pay</x-button>
          <x-button @click.native="show7 = false">Cancel</x-button>
         </div>
        </div>
      </popup>
    </div>

    <group title="set position">
      <x-switch title="left(100% width)" v-model="show8"></x-switch>
      <x-switch title="right" v-model="show9"></x-switch>
      <x-switch title="top(no mask)" v-model="show10"></x-switch>
      <x-switch title="bottom" v-model="show11"></x-switch>
    </group>

    <div v-transfer-dom>
      <popup v-model="show8" position="left" width="100%">
        <div class="position-horizontal-demo">
          <span class="vux-close" @click="show8 = false"></span>
        </div>
      </popup>
    </div>
    
    <div v-transfer-dom>
      <popup v-model="show9" position="right">
        <div style="width:200px;">
        </div>
      </popup>
    </div>

    <div v-transfer-dom>
      <popup v-model="show10" position="top" :show-mask="false">
        <div class="position-vertical-demo">
        I'm on top. Hide in 1s.
        </div>
      </popup>
    </div>

    <div v-transfer-dom>
      <popup v-model="show11" position="bottom">
        <div class="position-vertical-demo">
        I'm on bottom.
        </div>
      </popup>
    </div>

    <div v-transfer-dom>
      <popup v-model="show12" position="bottom">
        <group>
          <cell v-for="i in 20" :key="i" :title="i"></cell>
        </group>
        <div style="padding: 15px;">
          <x-button @click.native="show12 = false" plain type="primary"> Close Me </x-button>
        </div>
      </popup>
    </div>

    <div v-transfer-dom>
      <popup v-model="show13" position="bottom" max-height="50%">
        <group>
          <cell v-for="i in 20" :key="i" :title="i"></cell>
        </group>
        <div style="padding: 15px;">
          <x-button @click.native="show13 = false" plain type="primary"> Close Me </x-button>
        </div>
      </popup>
    </div>

  </div>
</template>

<script>
import { TransferDom, Popup, Group, Cell, XButton, XSwitch, Toast, XAddress, ChinaAddressData } from 'vux'

export default {
  directives: {
    TransferDom
  },
  components: {
    Popup,
    Group,
    Cell,
    XSwitch,
    Toast,
    XAddress,
    XButton
  },
  data () {
    return {
      addressData: ChinaAddressData,
      show: false,
      show1: false,
      show3: false,
      show4: false,
      show5: false,
      show6: false,
      title6: '默认空的',
      value6: [],
      show7: false,
      showToast: false,
      show8: false,
      show9: false,
      show10: false,
      show11: false,
      show12: false,
      show13: false
    }
  },
  methods: {
    log (str) {
      console.log(str)
    }
  },
  watch: {
    show10 (val) {
      if (val) {
        setTimeout(() => {
          this.show10 = false
        }, 1000)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~vux/src/styles/close.less';

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
.position-vertical-demo {
  background-color: #ffe26d;
  color: #000;
  text-align: center;
  padding: 15px;
}
.position-horizontal-demo {
  position: relative;
  height: 100%;
  .vux-close {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%) scale(4);
    color: #000;
  }
}
</style>

<template>
  <div>
    <div style="padding:15px;">
      <x-button @click.native="showPosition('top')" type="primary">Top</x-button>
      <x-button @click.native="showPosition('middle')" type="primary">Middle</x-button>
      <x-button @click.native="showPosition('bottom')" type="primary">Bottom</x-button>
      <x-button @click.native="showPosition('')" type="primary">Default</x-button>  
    </div>

    <toast v-model="showPositionValue" type="text" :time="800" is-show-mask text="Hello World" :position="position">{{ $t('Basic Usage') }}</toast>
    <group>
      <x-switch :title="$t('Basic Usage')" v-model="show1"></x-switch>
      <x-switch :title="$t('type:text')" v-model="show2"></x-switch>
      <x-switch :title="$t('type:cancel')" v-model="show3"></x-switch>
      <x-switch :title="$t('type:warn')" v-model="show4"></x-switch>
      <x-switch :title="$t('time:1s')" v-model="show5"></x-switch>
      <x-switch :title="$t('long text')" v-model="show6"></x-switch>
    </group>

    <toast v-model="show1" @on-hide="onHide">{{ $t('Basic Usage') }}</toast>
    <toast v-model="show2" type="text">{{$t('success')}}</toast>
    <toast v-model="show3" type="cancel">{{$t('type:cancel')}}</toast>
    <toast v-model="show4" type="warn">{{$t('type:warn')}}</toast>
    <toast v-model="show5" :time="1000">{{$t('time:1s')}}</toast>
    <toast v-model="show6" type="text" width="20em">{{$t('show me code')}}</toast>

    <group :title="$t('prop:text')">
      <x-switch :title="$t('type:success')" v-model="show7"></x-switch>
      <x-switch :title="$t('type:text')" v-model="show8"></x-switch>
    </group>

    <toast v-model="show7" text="Hello World"></toast>
    <toast v-model="show8" type="text" text="Hello World"></toast>

    <group :title="$t('As a plugin(>=v0.1.3)')">
      <x-switch :title="$t('default')" v-model="show9" @on-change="onChange"></x-switch>
    </group>
    <div style="padding:15px;">
      <x-button type="primary" @click.native="$vux.toast.text('How are you~', 'top')">use text function</x-button> 
    </div>
  </div>
</template>

<i18n>
type:text:
  zh-CN: type为text
type:cancel:
  zh-CN: type为cancel
type:success:
  zh-CN: type为success
type:warn:
  zh-CN: type为警告
time:1s:
  zh-CN: 显示时间1s
long text:
  zh-CN: 很长的文字
success:
  zh-CN: 成功啦~
show me code:
  zh-CN: Talk is cheap, show me the code.
prop:text:
  zh-CN: 设置text
default:
  zh-CN: 默认
As a plugin(>=v0.1.3):
  zh-CN: 插件形式调用
position:
  zh-CN: 位置
</i18n>

<script>
import { Toast, Group, XSwitch, XButton } from 'vux'
export default {
  components: {
    Toast,
    Group,
    XSwitch,
    XButton
  },
  methods: {
    showPosition (position) {
      this.position = position
      this.showPositionValue = true
    },
    onHide () {
      console.log('on hide')
    },
    onChange (val) {
      const _this = this
      if (val) {
        this.$vux.toast.show({
          text: 'Hello World',
          onShow () {
            console.log('Plugin: I\'m showing')
          },
          onHide () {
            console.log('Plugin: I\'m hiding')
            _this.show9 = false
          }
        })
      } else {
        this.$vux.toast.hide()
      }
    }
  },
  data () {
    return {
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      show6: false,
      show7: false,
      show8: false,
      show9: false,
      position: 'default',
      showPositionValue: false
    }
  }
}
</script>

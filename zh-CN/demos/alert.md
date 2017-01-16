---
nav: zh-CN
---


### Alert_COM

<img width="100" src="http://qr.topscan.com/api.php?text=http%3A%2F%2Fvux.li%2Fdemos%2Fv2%2F%23%2Fcomponent%2Falert"/>

#### Demo

 <div style="width:377px;height:667px;display:inline-block;border:1px dashed #ececec;border-radius:5px;overflow:hidden;">
   <iframe src="http://vux.li/demos/v2/#/component/alert" width="375" height="667" border="0" frameborder="0"></iframe>
 </div>

#### demo 代码

<p class="tip">下面的$t是Demo的i18n使用的翻译函数，一般情况下可以直接使用字符串。另外，下面代码隐藏了i18n标签部分的代码。</p>

``` html
<template>
  <div>
    <group>
      <x-switch :title="$t('Show Me')" v-model="show"></x-switch>
    </group>
    <alert v-model="show" :title="$t('Congratulations')" @on-show="onShow" @on-hide="onHide"> {{ $t('Your Message is sent successfully~') }}</alert>
    <group :title="$t('Use as a plugin')">
      <cell :title="$t('Show Me')" @click.native="showPlugin" is-link></cell>
      <cell :title="$t('will auto close in 3s')" @click.native="showPluginAuto" is-link></cell>
    </group>
  </div>
</template>



<script>
import { Alert, Group, XSwitch, Cell } from 'vux'

export default {
  components: {
    Alert,
    Group,
    XSwitch,
    Cell
  },
  data () {
    return {
      show: false,
      show1: false
    }
  },
  methods: {
    onHide () {
      console.log('on hide')
    },
    onShow () {
      console.log('on show')
    },
    showPlugin () {
      this.$vux.alert.show({
        title: 'Vux is Cool',
        content: this.$t('Do you agree?'),
        onShow () {
          console.log('Plugin: I\'m showing')
        },
        onHide () {
          console.log('Plugin: I\'m hiding now')
        }
      })
    },
    showPluginAuto () {
      this.showPlugin()
      setTimeout(() => {
        this.$vux.alert.hide()
      }, 3000)
    }
  }
}
</script>

```
#### 文档

#### Github Issue
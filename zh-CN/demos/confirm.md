---
nav: zh-CN
---


### Confirm_COM

<img width="100" src="http://qr.topscan.com/api.php?text=http%3A%2F%2Fvux.li%2Fdemos%2Fv2%2F%23%2Fcomponent%2Fconfirm"/>

#### Demo

 <div style="width:377px;height:667px;display:inline-block;border:1px dashed #ececec;border-radius:5px;overflow:hidden;">
   <iframe src="http://vux.li/demos/v2/#/component/confirm" width="375" height="667" border="0" frameborder="0"></iframe>
 </div>

#### demo 代码

<p class="tip">下面的$t是Demo的i18n使用的翻译函数，一般情况下可以直接使用字符串。另外，下面代码隐藏了i18n标签部分的代码。</p>

``` html
<template>
  <div>
    <group>
      <x-switch :title="$t('Toggle')" v-model="show"></x-switch>
    </group>
    <confirm v-model="show" :title="$t('confirm deleting the item')"
    @on-cancel="onCancel"
    @on-confirm="onConfirm"
    @on-show="onShow"
    @on-hide="onHide">
      <p style="text-align:center;">{{ $t('Are you sure?') }}</p>
    </confirm>
    <br>
    <div style="padding:15px;">
      <x-button @click.native="showPlugin" type="primary">Show</x-button>
    </div>
    <div style="padding:15px;">
      <x-button @click.native="showPlugin2" type="primary">Hide after 3s</x-button>
    </div>
    <div style="padding:15px;">
      <x-button @click.native="showPlugin3" type="primary">Hide On Blur</x-button>
    </div>
  </div>
</template>



<script>
import { Confirm, Group, XSwitch, XButton } from 'vux'
export default {
  components: {
    Confirm,
    Group,
    XSwitch,
    XButton
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    onCancel () {
      console.log('on cancel')
    },
    onConfirm () {
      console.log('on confirm')
    },
    onHide () {
      console.log('on hide')
    },
    onShow () {
      console.log('on show')
    },
    showPlugin () {
      this.$vux.confirm.show({
        title: 'Title',
        content: 'Content',
        onShow () {
          console.log('plugin show')
        },
        onHide () {
          console.log('plugin hide')
        },
        onCancel () {
          console.log('plugin cancel')
        },
        onConfirm () {
          console.log('plugin confirm')
        }
      })
    },
    showPlugin2 () {
      this.showPlugin()
      setTimeout(() => {
        this.$vux.confirm.hide()
      }, 3000)
    },
    showPlugin3 () {
      this.$vux.confirm.show({
        title: 'Title',
        content: 'Content',
        hideOnBlur: true
      })
    }
  }
}
</script>

```
#### 文档

#### Github Issue
<template>
  <div>
  <div class="vux-1px-t">
    
    <swipeout>

      <swipeout-item @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow">
        <div slot="right-menu">
          <swipeout-button @click.native="onButtonClick('fav')" type="primary">{{$t('Yes')}}</swipeout-button>
          <swipeout-button @click.native="onButtonClick('delete')" type="warn">{{$t('Right')}}</swipeout-button>
        </div>
        <div slot="content" class="demo-content vux-1px-t">
        {{$t('JavaScript is the best language')}}
        </div>
      </swipeout-item>

      <swipeout-item :threshold=".5" underlay-color="#ccc">
        <div slot="right-menu">
          <swipeout-button @click.native="onButtonClick('fav')" background-color="#336DD6">{{$t('Fav')}}</swipeout-button>
          <swipeout-button @click.native="onButtonClick('delete')" background-color="#D23934">{{$t('Delete')}}</swipeout-button>
        </div>
        <div slot="content" class="demo-content vux-1px-tb">
        {{$t('threshold = 0.5')}}
        </div>
      </swipeout-item>

      <swipeout-item :disabled="disabled" ref="swipeoutItem" :right-menu-width="210" :sensitivity="15">
        <div slot="right-menu">
          <swipeout-button @click.native="onButtonClick('fav')" type="primary" :width="70">{{$t('Fav')}}</swipeout-button>
          <swipeout-button @click.native="onButtonClick('delete')" type="warn" :width="70">{{$t('Delete')}}</swipeout-button>
          <swipeout-button @click.native="onButtonClick('ignore')" type="default" :width="70">{{$t('Ignore')}}</swipeout-button>
        </div>

        <div slot="left-menu">
          <swipeout-button @click.native="onButtonClick('fav')" type="primary">{{$t('Fav')}}</swipeout-button>
          <swipeout-button @click.native="onButtonClick('delete')" type="warn">{{$t('Delete')}}</swipeout-button>
        </div>

        <div slot="content" class="demo-content vux-1px-b">
        {{$t('now ' + (disabled ? 'disabled' : 'enabled'))}}
        </div>
      </swipeout-item>

    </swipeout>
  </div>
    

    <div style="padding:15px;">
      <x-button @click.native="disabled = false" type="primary" :disabled="!disabled">{{ $t('set Enabled') }}</x-button>
      <x-button @click.native="disabled = true" type="warn" :disabled="disabled">{{ $t('set Disabled') }}</x-button>
      <x-button @click.native="$refs.swipeoutItem.open('left')" type="primary">{{ $t('open left menu') }}</x-button>
      <x-button @click.native="$refs.swipeoutItem.open('right')" type="primary">{{ $t('open right menu') }}</x-button>
      <x-button @click.native="$refs.swipeoutItem.close()" type="warn">{{ $t('close menu') }}</x-button>
    </div>
  </div>
</template>

<i18n>
Fav:
  zh-CN: 收藏
Delete:
  zh-CN: 删除
JavaScript is the best language:
  zh-CN: JavaScript 是最好的语言
now enabled:
  zh-CN: 当前可操作
now disabled:
  zh-CN: 当前不可操作
set Enabled:
  zh-CN: 设置可操作
set Disabled:
  zh-CN: 设置不可操作
open left menu:
  zh-CN: 打开左菜单
open right menu:
  zh-CN: 打开右菜单
close menu:
  zh-CN: 关闭菜单
threshold = 0.5:
  zh-CN: 设置滑动阙值为 0.5
Yes:
  zh-CN: 是的
Right:
  zh-CN: 正确
Ignore:
  zh-CN: 忽略
</i18n>

<script>
import { Swipeout, SwipeoutItem, SwipeoutButton, XButton } from 'vux'

export default {
  components: {
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    XButton
  },
  methods: {
    onButtonClick (type) {
      console.log('on button click', type)
    },
    handleEvents (type) {
      console.log('event: ', type)
    }
  },
  data () {
    return {
      disabled: false
    }
  }
}
</script>

<style lang="less">
.demo-content {
  padding: 10px 10px;
}
</style>

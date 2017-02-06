<template>
  <div>
    <swipeout class="demo-swipeout">
      <swipeout-item class="demo-swipeout-item" @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')">
        <div slot="button">
          <swipeout-button @click.native="onButtonClick('fav')" background-color="#336DD6">{{$t('Fav')}}</swipeout-button>
          <swipeout-button @click.native="onButtonClick('delete')" background-color="#D23934">{{$t('Delete')}}</swipeout-button>
        </div>
        <div slot="content">
        {{$t('JavaScript is the best language')}}
        </div>
      </swipeout-item>
      <swipeout-item :disabled="disabled" class="demo-swipeout-item">
        <div slot="button">
          <swipeout-button @click.native="onButtonClick('fav')" background-color="#336DD6">{{$t('Fav')}}</swipeout-button>
          <swipeout-button @click.native="onButtonClick('delete')" background-color="#D23934">{{$t('Delete')}}</swipeout-button>
        </div>
        <div slot="content">
        {{$t('disabled')}}
        </div>
      </swipeout-item>
    </swipeout>
    <div style="padding:15px;">
      <x-button @click.native="disabled = false" type="primary" :disabled="!disabled">{{ $t('Enable') }}</x-button>
      <x-button @click.native="disabled = true" type="warn" :disabled="disabled">{{ $t('Disable') }}</x-button>
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
      disabled: true
    }
  }
}
</script>

<style lang="less">
.demo-swipeout {
  border-top: 1px solid #ececec;
}
.demo-swipeout-item {
  border-bottom: 1px solid #ececec;
}
</style>

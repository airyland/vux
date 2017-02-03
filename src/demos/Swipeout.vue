<template>
  <div>
    <swipeout class="demo-swipeout">
     <swipeout-item v-for="i in 5" class="demo-swipeout-item" @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')">
       <div slot="button">
          <swipeout-button @click.native="onButtonClick('fav ' + i)" background-color="#336DD6">{{$t('Fav')}}</swipeout-button>
          <swipeout-button @click.native="onButtonClick('delete ' + i)" background-color="#D23934">{{$t('Delete')}}</swipeout-button>
       </div>
       <div slot="content">
        {{$t('JavaScript is the bese language')}} {{i}}
       </div>
     </swipeout-item>
    </swipeout>
  </div>
</template>

<i18n>
Fav:
  zh-CN: 收藏
Delete:
  zh-CN: 删除
JavaScript is the bese language:
  zh-CN: JavaScript 是最好的语言
</i18n>

<script>
import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'

export default {
  components: {
    Swipeout,
    SwipeoutItem,
    SwipeoutButton
  },
  methods: {
    onButtonClick (type) {
      console.log('on button click', type)
    },
    handleEvents (type) {
      console.log('event: ', type)
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

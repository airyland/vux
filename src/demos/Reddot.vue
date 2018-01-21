<template>
  <div style="padding:15px;">
    <br>
    <div class="reddot-demo vux-reddot">{{ $t('Hi, you got a new message') }} </div>
    <br>
    <div class="reddot-demo vux-reddot-s">{{ $t('small dot') }}</div>
  </div>
</template>

<i18n>
Hi, you got a new message:
  zh-CN: 新消息
small dot:
  zh-CN: 小点
</i18n>

<style scoped>
.reddot-demo {
  display: inline-block
}
</style>

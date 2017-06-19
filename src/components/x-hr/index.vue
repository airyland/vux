<template>
  <p class="vux-x-hr"></p>
</template>

<script>
export default {
  name: 'x-hr'
}
</script>

<style lang="less">
@import '../../styles/weui/base/mixin/setOnepx.less';

.vux-x-hr {
  padding-top: 15px;
  margin-bottom: 15px;
  position: relative;
  &:before {
    .setBottomLine()
  }
}
</style>
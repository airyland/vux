<template>
  <span class="vux-close" style="width:14px;height:14px;"></span>
  <span class="vux-close"></span>
  <span class="vux-close" style="width:30px;height:30px;color:#ccc;"></span>
  <span class="vux-close vux-close-2px" style="width:40px;height:40px;color:#ccc;"></span>
</template>

<style lang="less">
@import '../styles/close.less';

.vux-close-2px{
  &::before,
  &::after {
    height: 2px;
    margin-top: -1px;
    background-color: green;
  }
}
</style>

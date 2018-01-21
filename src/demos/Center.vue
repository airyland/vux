<template>
  <div>
    <div style="margin:15px;border:1px solid green;height:100px;border-radius:5px;" :class="item" v-for="item in ['vux-center-h', 'vux-center-v', 'vux-center']">
      <div style="text-align:center;">
        <div style="color:red;">.{{item}}</div>
        <div>Be Cool with Vue and WeUI</div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
@import '~vux/src/styles/center';
</style>
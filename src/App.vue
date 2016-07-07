<template>
  <div>
    <router-view
    transition
    transition-mode="out-in"></router-view>
  </div>
</template>

<script>
</script>

<style lang="less">
@import 'styles/index.less';
@import './styles/weui/base/reset';

body {
  background-color: #fbf9fe;
}
</style>

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

body {
  font-family: Helvetica, sans-serif;
  background-color: #fbf9fe;
  padding-bottom:50px;
}
</style>

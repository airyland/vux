<template>
  <div><slot></slot></div>
</template>

<script>
import sticky from './sticky'

export default {
  ready () {
    sticky(this.$el)
  }
}
</script>

<style>
.vux-sticky {
  width: 100%;
  position: sticky;
  top: 0;
}
.vux-fixed {
  width: 100%;
  position: fixed;
  top: 0;
}
</style>


<template>
  <div class="vux-swiper-item"><slot></slot></div>
</template>

<script>
export default {
  ready () {
    this.$emit('swiper-item:created')
  }
}
</script>
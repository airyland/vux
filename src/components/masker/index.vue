<template>
  <div class="vux-masker-box">
    <slot></slot>
    <div class="vux-masker" :style="{backgroundColor: 'rgba(0,0,0,' + opacity +')'}">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    opacity: {
      type: Number,
      default: 0.5
    }
  }
}
</script>

<style>
.vux-masker-box {
  position: relative;
}
.vux-masker {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: inherit;
}
</style>
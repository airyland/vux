<template>
  <div class="vux-group-tip" :style="{'text-align':align}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'tip',
  props: {
    align: {
      type: String,
      default: 'left'
    }
  }
}
</script>

<style>
.vux-group-tip, .vux-group-tip p {
  font-size:14px;
  color:#888;
  text-align:center;
  padding-top:0.3em;
  padding-left:10px;
  padding-right:5px;
}
.vux-group-tip .weui-icon {
  padding-right: 3px;
}
</style>

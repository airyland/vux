
<template>
  <div class="demo">
    <h2>基础用法</h2>
    <vux-cell>
      <vux-loading></vux-loading>
      <vux-loading size="25"></vux-loading>
      <vux-loading type="circle"></vux-loading>
      <vux-loading type="circle" color="#409EFE"></vux-loading>
      <vux-loading type="circle" size="22" color="red"></vux-loading>
    </vux-cell>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'demo-loading',
  props: {},
  setup() {
    return {};
  }
});
</script>
  
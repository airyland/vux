<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'app'
});
</script>

<style>
::selection {
  background: var(--doc-default-color);
  color: #fff;
}
#doc {
  font-family: PingFangSC-Regular, -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: none;
  -ms-text-size-adjust: 100%;
  background: #fff;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: var(--doc-header-height);
}
</style>

<template>
  <Iphone class="doc-demo-preview">
    <iframe :src="url" frameborder="0"></iframe>
  </Iphone>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Iphone from "./Iphone.vue";
export default defineComponent({
  components: { Iphone },
  name: 'doc-demo-preview',
  props: {
    url: String
  }
});
</script>

<style lang="scss">
.doc {
  &-demo-preview {
    position: fixed;
    right: 30px;
    top: 100px;
    overflow: hidden;
    width:400px;
    height:800px;
    background: #fff;
    border-radius: 30px;
    iframe {
      position: absolute;
      left: 13px;
      top: 35px;
      width: calc(100% - 25px);
      height: calc(100% - 70px);
    }
  }
}
</style>

<template>
  <div id="loadingToast" class="weui_loading_toast" v-show="show">
    <div class="weui_mask_transparent"></div>
    <div class="weui_toast">
      <spinner class="weui_loading" style="position:absolute"></spinner>
      <p class="weui_toast_content">{{text}}<slot></slot></p>
    </div>
  </div>
</template>

<script>
import Spinner from './Spinner'
export default {
  components: {
    Spinner
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: 'Loading'
    }
  }
}
</script>

<template>
  <div id="loadingToast" class="weui_loading_toast" v-show="show">
    <div class="weui_mask_transparent"></div>
    <div class="weui_toast">
      <div class="weui_loading">
        <div class="weui_loading_leaf" v-for="i in 12" :class="['weui_loading_leaf_' + i]"></div>
      </div>
      <p class="weui_toast_content">{{text}}<slot></slot></p>
    </div>
  </div>
</template>

<script>
export default {
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

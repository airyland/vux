<template>
  <a href="javascript:;" class="weui_tabbar_item" :class="{'weui_bar_item_on': $parent.index === index}" @click="onItemClick">
    <div class="weui_tabbar_icon" :class="{'vux-reddot': showDot}">
      <slot name="icon"></slot>
    </div>
    <p class="weui_tabbar_label">
      <slot name="label"></slot>
    </p>
  </a>
</template>

<script>
import { childMixin } from '../../mixins/multi-items'

export default {
  mixins: [childMixin],
  props: {
    showDot: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<template>
  <a href="javascript:;" class="weui_tabbar_item" :class="{'weui_bar_item_on': $parent.index === currentIndex}" @click="onItemClick(true)">
    <div class="weui_tabbar_icon" :class="[iconClass || $parent.iconClass, {'vux-reddot': showDot}]">
      <slot name="icon"></slot>
      <sup><badge v-if="badge" :text="badge"></badge></sup>
    </div>
    <p class="weui_tabbar_label">
      <slot name="label"></slot>
    </p>
  </a>
</template>

<script>
import { childMixin } from '../../mixins/multi-items'
import Badge from '../badge'

export default {
  components: {
    Badge
  },
  mixins: [childMixin],
  props: {
    showDot: {
      type: Boolean,
      default: false
    },
    badge: String,
    link: [String, Object],
    iconClass: String
  }
}
</script>

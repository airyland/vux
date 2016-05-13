<template>
  <div class="weui_cell" :class="{'vux-tap-active': isLink}">
    <div class="weui_cell_hd">
      <slot name="icon"></slot>
    </div>
    <div class="weui_cell_bd" :class="{'weui_cell_primary':primary==='title'}">
      <p>
        {{title}}
        <slot name="after-title"></slot>
      </p>
      <inline-desc>{{inlineDesc}}</inline-desc>
    </div>
    <div class="weui_cell_ft" :class="{'weui_cell_primary':primary==='content', 'with_arrow': isLink}" v-html="value">
      <slot name="value"></slot>
    </div>
  </div>
</template>

<script>
import InlineDesc from '../inline-desc/'

export default {
  components: {
    InlineDesc
  },
  props: {
    title: {
      type: String
    },
    value: {
      type: String
    },
    isLink: {
      type: Boolean,
      default: false
    },
    inlineDesc: {
      type: String
    },
    primary: {
      type: String,
      default: 'title'
    }
  }
}
</script>

<style>
.vux-tap-active {
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
.vux-tap-active:active {
  background-color: #ECECEC;
}
</style>

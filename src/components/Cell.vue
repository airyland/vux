<template>
	<div class="weui_cell" v-if="!isLink">
    <div class="weui_cell_hd">
      <slot name="icon"></slot>
    </div>
  	<div class="weui_cell_bd weui_cell_primary">
    	<p>
        {{title}}
        <slot name="after-title"></slot>
      </p>
    	<inline-desc>{{inlineDesc}}</inline-desc>
  	</div>
  	<div class="weui_cell_ft">
      {{value}}
      <slot name="value"></slot>
    </div>
	</div>
	<a class="weui_cell" href="javascript:" v-if="isLink" v-link="link">
    <div class="weui_cell_hd">
      <slot name="icon"></slot>
    </div>
    <div class="weui_cell_bd weui_cell_primary">
      <p>{{title}}</p>
      <inline-desc v-if="inlineDesc">{{inlineDesc}}</inline-desc>
    </div>
    <div class="weui_cell_ft with_arrow">
      {{value}}
      <slot name="value"></slot>
    </div>
  </a>
</template>

<script>
import InlineDesc from './Inline-desc'
export default {
  components: {
    InlineDesc
  },
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: String
    },
    isLink: {
      type: Boolean,
      default: false
    },
    link: {
      type: String
    },
    inlineDesc: {
      type: String
    }
  }
}
</script>

<style>
</style>

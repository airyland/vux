<template>
	<div class="weui_cell" v-if="!isLink">
    <div class="weui_cell_hd">
      <slot name="icon"></slot>
    </div>
  	<div class="weui_cell_bd" :class="{'weui_cell_primary':primary==='left'}">
    	<p>
        {{title}}
        <slot name="after-title"></slot>
      </p>
    	<inline-desc>{{inlineDesc}}</inline-desc>
  	</div>
  	<div class="weui_cell_ft" :class="{'weui_cell_primary':primary==='right'}">
      {{{value}}}
      <slot name="value"></slot>
    </div>
	</div>
	<a class="weui_cell" :href="link" v-if="isLink" v-link="link">
    <div class="weui_cell_hd">
      <slot name="icon"></slot>
    </div>
    <div class="weui_cell_bd" :class="{'weui_cell_primary':primary==='left'}">
      <p>{{title}}</p>
      <inline-desc v-if="inlineDesc">{{inlineDesc}}</inline-desc>
    </div>
    <div class="weui_cell_ft with_arrow" :class="{'weui_cell_primary':primary==='right'}">
      {{{value}}}
      <slot name="value"></slot>
    </div>
  </a>
</template>

<script>
import InlineDesc from './Inline-desc'
export default {
  created () {
    if (this.link) {
      this.isLink = true
    }
  },
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
    link: {
      type: String
    },
    inlineDesc: {
      type: String
    },
    primary: {
      type: String,
      default: 'left'
    }
  },
  data () {
    return {
      isLink: false
    }
  }
}
</script>

<style>
</style>

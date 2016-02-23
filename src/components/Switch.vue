<template>
	<div class="weui_cell weui_cell_switch">
	    <div class="weui_cell_hd weui_cell_primary">
	    	<label class="weui_label" :style="{width:title.length+1+'em'}">{{title}}</label>
	    	<span class="label_desc" v-if="inlineDesc">{{inlineDesc}}</span>
	    </div>
	    <div class="weui_cell_ft">
	        <input class="weui_switch" type="checkbox" :disabled="disabled" v-model="value"/>
	    </div>
	</div>
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
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: Boolean,
      twoWay: true
    },
    inlineDesc: {
      type: String
    }
  },
  ready: function () {},
  watch: {
    value: function (newVal) {
      this.$dispatch('change', newVal)
    }
  }
}
</script>

<style>
.weui_cell_switch .weui_cell_ft {
	font-size: 0;
}
</style>
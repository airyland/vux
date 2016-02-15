<template>
	<div class="weui_cell weui_cell_switch">
	    <div class="weui_cell_hd weui_cell_primary">{{title}}</div>
	    <div class="weui_cell_ft">
	        <input class="weui_switch" type="checkbox" :disabled="disabled" v-model="value"/>
	    </div>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			required: true
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		value: {
			type: Boolean
		}
	},
	ready: function(){
		console.log('ready');
	},
	watch :{
		value: function(newVal){
			console.log(newVal)
		}
	}
}
</script>

<style>

</style>
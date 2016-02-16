<template>
	<div class="weui_cell">
        <div class="weui_cell_hd">
        	<label class="weui_label" :style="{width:title.length+1+'em'}">{{title}}</label>
        	<span class="label_desc" v-if="inline_desc">{{inline_desc}}</span>
        </div>
        <div class="weui_cell_bd weui_cell_primary">
            <input class="weui_input" type="text" :pattern="keyboard==='number'?'[0-9]*':''" placeholder="{{placeholder}}" v-model="value"/>
        </div>
    </div>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				reqired: true
			},
			placeholder: {
				type: String
			},
			value: {
				type: String,
				default: '',
				twoWay: true
			},
			keyboard: {
				type: String,
			},
			inline_desc: {
				type: String
			}
		},
		computed: {

		}
	}
</script>

<style>
</style>
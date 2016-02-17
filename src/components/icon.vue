<template>
	<i class="{{className}}"></i>
</template>

<script>
	export default {
		props: {
			type: String
		},
		computed: {
			className: function () {
				return 'weui_icon_'+this.type
			} 
		}
	}
</script>

<style>
	.icon_big:before {
		font-size: 104px;
	}
</style>

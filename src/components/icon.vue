<template>
	<!--
	<i class="weui_icon_success"></i>
	<i class="weui_icon_success_circle"></i>
    <i class="weui_icon_success_no_circle"></i>
    <i class="weui_icon_info"></i>
    <i class="weui_icon_waiting"></i>
    <i class="weui_icon_waiting_circle"></i>
    <i class="weui_icon_circle"></i>
    <i class="weui_icon_warn"></i>
    <i class="weui_icon_download"></i>
    <i class="weui_icon_info_circle"></i>
    <i class="weui_icon_cancel"></i>
    <i class="weui_icon_search"></i>
    <i class="weui_icon_clear"></i>
    <i class="weui_icon_safe_success"></i>
	<i class="weui_icon_safe_warn"></i>
	-->
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

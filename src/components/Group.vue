<template>
	<div>
		<div class="weui_cells_title" v-show="title">{{title}}</div>
	    <div class="weui_cells">
	   		<slot></slot>
	    </div>
	</div>
</template>

<script>
import GroupTitle from './Group-title'
export default {
	components: {
    	GroupTitle
  	},
	props: {
		title: String
	}
}
</script>

<style>

</style>
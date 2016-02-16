<template>
	<div>
		<div class="weui_cells_title" v-if="title">{{title}}</div>
	    <div class="weui_cells" :class="{'no_group_title':!title}">
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
.no_group_title {
	margin-top:15px;
}
</style>
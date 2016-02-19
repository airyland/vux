<template>
	<div>
		<div class="weui_cells_title" v-if="title" :style="{color:title_color}">{{title}}</div>
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
    title: String,
    title_color: String
  },
  events: {
    'class.add': function (value) {
      console.log(this.$el.querySelector('.weui_cells').classList)
      this.$el.querySelector('.weui_cells').classList.add(value)
    }
  }
}
</script>

<style>
.no_group_title {
	margin-top:15px;
}
</style>
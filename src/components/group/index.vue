<template>
  <div>
    <div class="weui_cells_title" v-if="title" :style="{color:titleColor}" v-html="title"></div>
    <div class="weui_cells" :class="{'vux-no-group-title':!title}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import GroupTitle from '../group-title'

export default {
  components: {
    GroupTitle
  },
  props: {
    title: String,
    titleColor: String
  }
}
</script>

<style>
.vux-no-group-title {
  margin-top:15px;
}
</style>

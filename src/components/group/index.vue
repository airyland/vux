<template>
  <div>
    <div class="weui_cells_title" v-if="title" :style="{color:titleColor}">{{title}}</div>
    <div class="weui_cells" :class="{'no_group_title':!title}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import GroupTitle from '../group-title/'

export default {
  components: {
    GroupTitle
  },
  props: {
    title: String,
    titleColor: String
  },
  events: {
    'group.class.add': function (value) {
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
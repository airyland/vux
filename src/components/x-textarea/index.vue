<template>
  <div class="weui_cell">
    <div class="weui_cell_bd weui_cell_primary">
      <textarea class="weui_textarea" placeholder="{{placeholder}}" :rows="rows" :cols="cols" v-model="value" :style="textareaStyle"></textarea>
      <div class="weui_textarea_counter" v-show="showCounter && max"><span>{{count}}</span>/{{max}}</div>
    </div>
  </div>
</template>

<script>
import Base from '../../libs/base'
import GroupTitle from '../group-title'

export default {
  minxins: [Base],
  components: {
    GroupTitle
  },
  props: {
    showCounter: {
      type: Boolean,
      default: true
    },
    max: Number,
    value: {
      type: String,
      default: '',
      twoWay: true
    },
    placeholder: {
      type: String,
      default: ''
    },
    rows: {
      type: Number,
      default: 3
    },
    cols: {
      type: Number,
      default: 30
    },
    height: Number
  },
  watch: {
    value (newVal) {
      if (this.max && this.value.length > this.max) {
        this.value = newVal.slice(0, this.max)
      }
      this.$emit('on-change', this.value)
    }
  },
  computed: {
    count () {
      return this.value.length
    },
    textareaStyle () {
      if (this.height) {
        return {
          height: `${this.height}px`
        }
      }
    }
  }
}
</script>

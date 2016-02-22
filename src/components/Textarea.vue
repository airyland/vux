<template>
  <div class="weui_cell">
      <div class="weui_cell_bd weui_cell_primary">
          <textarea class="weui_textarea" placeholder="{{placeholder}}" rows="3" v-model="value"></textarea>
          <div class="weui_textarea_counter" v-show="showCounter && max"><span>{{count}}</span>/{{max}}</div>
      </div>
  </div>
</template>

<script>
import Base from '../libs/base'
import GroupTitle from './Group-title'
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
    max: {
      type: Number
    },
    value: {
      type: String,
      default: '',
      twoWay: true
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  watch: {
    value: function (newVal) {
      if (this.max && this.value.length > this.max) {
        this.value = newVal.slice(0, this.max)
      }
      this.$dispatch('change', this.value)
    }
  },
  computed: {
    count: function () {
      return this.value.length
    }
  },
  data () {
    return {

    }
  }
}
</script>
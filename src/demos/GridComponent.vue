<template>
  <grid
    :cols="4"
    class="grid-picker">
    <grid-item
      v-for="(item, index) in data"
      :class="{selected: value.indexOf(item) !== -1}"
      :key="index"
      class="grid-picker__item"
      @click.native="select(item)">
      {{ item }}
    </grid-item>
  </grid>
</template>

<script>
import { Grid, GridItem } from 'vux'

export default {
  components: {
    Grid,
    GridItem
  },
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    },
    type: {
      type: String,
      default: 'month'
    },
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      selections: []
    }
  },
  methods: {
    select (item) {
      if (this.value.indexOf(item) === -1) {
        const _value = this.value.slice()
        _value.push(item)
        this.$emit('update:value', _value)
      } else {
        const _value = this.value.filter(one => {
          return one !== item
        })
        this.$emit('update:value', _value)
      }
      // this.selections.push(item)
    }
  }
}
</script>

<style>
.selected {
  background: red;
}
</style>
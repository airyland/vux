<template>
  <div class="weui_cell" :class="{'weui_select_after':title, 'weui_cell_select':!readonly}">
    <div class="weui_cell_hd" v-show="title" :class="{'weui_cell_primary':readonly}">{{title}}</div>
    <div class="weui_cell_bd weui_cell_primary" v-if="!readonly">
      <select class="weui_select" v-model="value">
        <option value="" v-if="placeholder" :selected="placeholder && !value">{{placeholder}}</option>
        <option :value="one.key" v-for="one in processOptions">{{one.value}}</option>
      </select>
    </div>
    <div class="weui_cell_ft" v-else>
      {{value | findByKey processOptions}}
    </div>
  </div>
</template>

<script>
import find from 'lodash.find'

const findByKey = function (key, options) {
  const _rs = find(options, function (item) {
    return item.key === key
  })
  return _rs ? _rs.value : key
}

export default {
  computed: {
    processOptions: function () {
      if (this.options.length && this.options[0].key) {
        return this.options
      } else {
        return this.options.map(function (item) {
          return {
            key: item,
            value: item
          }
        })
      }
    }
  },
  filters: {
    findByKey
  },
  watch: {
    value: function (newValue) {
      this.$dispatch('on-change', newValue)
    }
  },
  props: {
    title: {
      type: String,
      required: false
    },
    options: {
      type: Array,
      required: true
    },
    placeholder: {
      type: String
    },
    readonly: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      twoWay: true
    }
  }
}
</script>

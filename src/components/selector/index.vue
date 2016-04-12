<template>
  <div class="weui_cell" :class="{'weui_select_after':title, 'weui_cell_select':!readonly}">
    <div class="weui_cell_hd" v-show="title" :class="{'weui_cell_primary':readonly}">{{title}}</div>
    <div class="weui_cell_bd weui_cell_primary" v-if="!readonly">
      <select class="weui_select" v-model="value">
        <option value="" v-if="placeholder" :selected="placeholder && !value">{{placeholder}}</option>
        <option :value="one.value" v-for="one in processOptions" :data-text="one.text" :data-value="value" :selected="one.value === value">{{one.text}}</option>
      </select>
    </div>
    <div class="weui_cell_ft" v-else>
      {{value | findByValue processOptions}}
    </div>
  </div>
</template>

<script>
import find from 'lodash.find'

const findByValue = function (value, options) {
  const _rs = find(options, function (item) {
    return item.value === value
  })
  return _rs ? _rs.text : value
}

export default {
  computed: {
    processOptions: function () {
      if (this.options.length && this.options[0].text) {
        return this.options
      } else {
        return this.options.map(function (item) {
          return {
            text: item,
            value: item
          }
        })
      }
    }
  },
  filters: {
    findByValue
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

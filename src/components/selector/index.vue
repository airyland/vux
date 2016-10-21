<template>
  <div class="weui_cell" :class="{'weui_select_after':title, 'weui_cell_select':!readonly}">
    <div class="weui_cell_hd" v-if="title" :class="{'weui_cell_primary':readonly}">
      <label for="" class="weui_label" :style="{width: $parent.labelWidth, textAlign: $parent.labelAlign, marginRight: $parent.labelMarginRight}">{{title}}</label>
    </div>
    <div class="weui_cell_bd weui_cell_primary" v-if="!readonly">
      <select class="weui_select" :class="{'vux-selector-no-padding':!title}" :name="name" v-model="value" :style="{direction: direction}">
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
import find from 'array-find'

const findByKey = function (key, options) {
  const _rs = find(options, function (item) {
    return item.key === key
  })
  return _rs ? _rs.value : key
}

export default {
  computed: {
    processOptions () {
      if (this.options.length && {}.hasOwnProperty.call(this.options[0], 'key')) {
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
    value (newValue) {
      this.$emit('on-change', newValue)
    }
  },
  props: {
    title: String,
    direction: String,
    options: {
      type: Array,
      required: true
    },
    name: String,
    placeholder: String,
    readonly: Boolean,
    value: String
  }
}
</script>

<style lang="less">
@import '../../styles/weui/widget/weui_cell/weui_access';
@import '../../styles/weui/widget/weui_cell/weui_cell_global';
@import '../../styles/weui/widget/weui_cell/weui_form/weui_form_common';
@import '../../styles/weui/widget/weui_cell/weui_form/weui_select_after';
.vux-selector-no-padding {
  padding-left: 0;
}
</style>

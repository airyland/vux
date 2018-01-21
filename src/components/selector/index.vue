<template>
   <div class="vux-selector weui-cell" :class="{'weui-cell_select':!readonly, 'weui-cell_select-after':title}">
    <div class="weui-cell__hd" v-if="title">
      <label for="" class="weui-label" :style="{width: $parent.labelWidth, textAlign: $parent.labelAlign, marginRight: $parent.labelMarginRight}">{{title}}</label>
    </div>
    <div class="weui-cell__bd" v-if="!readonly">
      <select class="weui-select" v-model="currentValue" :style="{direction: direction}">
        <option value="" v-if="typeof value === 'undefined' && placeholder" :selected="typeof value === 'undefined' && placeholder">{{placeholder}}</option>
        <option disabled v-if="!placeholder && typeof value === 'undefined' && isIOS && title"></option>
        <option :value="one.key" v-for="one in processOptions">{{one.value}}</option>
      </select>
    </div>
    <div class="weui-cell__ft vux-selector-readonly" v-else>
      {{value | findByKey(processOptions)}}
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
  created () {
    if (typeof this.value !== 'undefined') {
      this.currentValue = this.value
    }
  },
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
    value (val) {
      this.currentValue = val
    },
    currentValue (val) {
      this.$emit('on-change', val)
      this.$emit('input', val)
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
    value: [String, Number, Object]
  },
  data () {
    return {
      currentValue: '',
      isIOS: /iPad|iPhone|iPod/.test(window.navigator.userAgent)
    }
  }
}
</script>

<style lang="less">
@import '../../styles/weui/widget/weui_cell/weui_access';
@import '../../styles/weui/widget/weui_cell/weui_cell_global';
@import '../../styles/weui/widget/weui_cell/weui_form/weui_form_common';
@import '../../styles/weui/widget/weui_cell/weui_form/weui_select';

.vux-selector-no-padding {
  padding-left: 0;
}
.vux-selector.weui-cell_select {
  padding: 0;
}
.vux-selector.weui-cell_select-after {
  padding-left: 15px;
}
.vux-selector-readonly {
  width: 100%;
}
</style>

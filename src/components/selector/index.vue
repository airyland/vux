<template>
   <div class="vux-selector weui-cell" :class="{'weui-cell_select':!readonly, 'weui-cell_select-after':title}">
    <div class="weui-cell__hd" v-if="title">
      <label :for="`vux-selector-${uuid}`" class="weui-label" :class="labelClass" :style="{width: $parent.labelWidth, textAlign: $parent.labelAlign, marginRight: $parent.labelMarginRight}">{{title}}</label>
    </div>
    <div class="weui-cell__bd" v-if="!readonly">
      <select :id="`vux-selector-${uuid}`" style="color:red;" class="weui-select" v-model="currentValue" :name="name"
      :style="{
        direction: direction,
        color: color
      }">
        <option value="" v-if="showPlaceholder" :selected="typeof value === 'undefined' && placeholder">{{placeholder}}</option>
        <option disabled v-if="fixIos"></option>
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
import uuidMixin from '../../mixins/uuid'

const findByKey = function (key, options) {
  const _rs = find(options, function (item) {
    return item.key === key
  })
  return _rs ? _rs.value : key
}

export default {
  name: 'selector',
  mixins: [uuidMixin],
  created () {
    if (typeof this.value !== 'undefined') {
      this.currentValue = this.value
    }
  },
  computed: {
    fixIos () {
      return !this.placeholder && (typeof this.value === 'undefined' || this.value === '') && this.isIOS && this.title
    },
    color () {
      return this.showPlaceholder ? '#A9A9A9' : ''
    },
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
    },
    showPlaceholder () {
      if ((typeof this.value === 'undefined' || this.value === '') && this.placeholder) {
        return true
      }
      return false
    },
    labelClass () {
      return {
        'vux-cell-justify': this.$parent.labelAlign === 'justify' || this.$parent.$parent.labelAlign === 'justify'
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
      this.$emit('input', val)
      this.$emit('on-change', val)
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
    value: [Boolean, String, Number, Object]
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

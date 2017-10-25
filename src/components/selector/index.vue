<template>
   <div class="vux-selector weui-cell" :class="{'weui-cell_select':!readonly, 'weui-cell_select-after':title}">
    <div class="weui-cell__hd" v-if="title">
      <label
      :for="`vux-selector-${uuid}`"
      class="weui-label"
      :class="labelClass"
      :style="cleanStyle({
        width: $parent.labelWidth,
        textAlign: $parent.labelAlign,
        marginRight: $parent.labelMarginRight
      })">{{ title }}</label>
    </div>
    <div class="weui-cell__bd" v-if="!readonly">
      <select :id="`vux-selector-${uuid}`" style="color:red;" class="weui-select" v-model="currentValue" :name="name"
      :style="cleanStyle({
        direction: direction,
        color: color
      })">
        <option :value="value === null ? 'null' : ''" v-if="showPlaceholder" :selected="isEmptyValue(value) && !!placeholder">{{ placeholder }}</option>
        <v-no-ssr>
          <option disabled v-if="fixIos"></option>
        </v-no-ssr>
        <option :value="one.key" v-for="one in processOptions">{{ one.value }}</option>
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
import cleanStyle from '../../libs/clean-style'

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
  beforeMount () {
    this.isIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent)
  },
  computed: {
    fixIos () {
      return !this.placeholder && this.isEmptyValue(this.value) && this.isIOS && this.title
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
      if (this.isEmptyValue(this.value) && this.placeholder) {
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
  methods: {
    isEmptyValue (val) {
      return typeof val === 'undefined' || val === '' || val === null
    },
    cleanStyle
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
      isIOS: false
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

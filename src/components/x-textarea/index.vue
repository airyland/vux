<template>
  <div class="weui-cell">
    <div class="weui-cell__hd">
      <div :style="labelStyles" v-if="hasRestrictedLabel">
        <slot name="restricted-label"></slot>
      </div>
      <slot name="label">
        <label class="weui-label" :style="{width: $parent.labelWidth || (labelWidth + 'em'), textAlign: $parent.labelAlign, marginRight: $parent.labelMarginRight}" v-if="title" v-html="title"></label>
        <inline-desc v-if="inlineDesc">{{inlineDesc}}</inline-desc>
      </slot>
    </div>
    <div class="weui-cell__bd">
      <textarea
        class="weui-textarea"
        :autocomplete="autocomplete"
        :autocapitalize="autocapitalize"
        :autocorrect="autocorrect"
        :spellcheck="spellcheck"
        :placeholder="placeholder"
        :readonly="readonly"
        :name="name"
        :rows="rows"
        :cols="cols"
        v-model="currentValue"
        @focus="$emit('on-focus')"
        @blur="$emit('on-blur')"
        :style="textareaStyle"
        :maxlength="max"
        ref="textarea"></textarea>
      <div class="weui-textarea-counter" v-show="showCounter && max" @click="focus"><span>{{count}}</span>/{{max}}</div>
    </div>
  </div>
</template>

<script>
  import Base from '../../libs/base'
  import InlineDesc from '../inline-desc'

  export default {
    minxins: [Base],
    mounted () {
      if (this.$slots && this.$slots['restricted-label']) {
        this.hasRestrictedLabel = true
      }
    },
    components: {
      InlineDesc
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      inlineDesc: String,
      showCounter: {
        type: Boolean,
        default: true
      },
      max: Number,
      value: {
        type: String,
        default: ''
      },
      name: String,
      placeholder: String,
      readonly: {
        type: Boolean,
        default: false
      },
      rows: {
        type: Number,
        default: 3
      },
      cols: {
        type: Number,
        default: 30
      },
      height: Number,
      // https://github.com/yisibl/blog/issues/3
      autocomplete: {
        type: String,
        default: 'off'
      },
      autocapitalize: {
        type: String,
        default: 'off'
      },
      autocorrect: {
        type: String,
        default: 'off'
      },
      spellcheck: {
        type: String,
        default: 'false'
      }
    },
    created () {
      this.currentValue = this.value
    },
    watch: {
      value (val) {
        this.currentValue = val
      },
      currentValue (newVal) {
        if (this.max && newVal > this.max) {
          this.currentValue = newVal.slice(0, this.max)
        }
        this.$emit('on-change', this.currentValue)
        this.$emit('input', this.currentValue)
      }
    },
    data () {
      return {
        hasRestrictedLabel: false,
        currentValue: ''
      }
    },
    computed: {
      count () {
        let len = 0
        if (this.currentValue) {
          len = this.currentValue.replace(/\n/g, 'aa').length
        }
        return len > this.max ? this.max : len
      },
      textareaStyle () {
        if (this.height) {
          return {
            height: `${this.height}px`
          }
        }
      },
      labelStyles () {
        return {
          width: this.$parent.labelWidth || (this.labelWidth + 'em'),
          textAlign: this.$parent.labelAlign,
          marginRight: this.$parent.labelMarginRight
        }
      },
      labelWidth () {
        return this.title.replace(/[^x00-xff]/g, '00').length / 2 + 1
      }
    },
    methods: {
      focus () {
        this.$refs.textarea.focus()
      }
    }
  }
</script>

<style lang="less">
  @import '../../styles/weui/widget/weui_cell/weui_cell_global';
  @import '../../styles/weui/widget/weui_cell/weui_form/weui_form_common';
</style>

<template>
  <div
    class="weui-cell"
    :class="{
      'vux-tap-active': isLink || !!link,
      'weui-cell_access': isLink || !!link,
      'vux-cell-no-border-intent': !borderIntent,
      'vux-cell-disabled': disabled
    }"
    :style="style"
    @click="onClick">
    <div class="weui-cell__hd">
      <slot name="icon"></slot>
    </div>
    <div class="vux-cell-bd" :class="{'vux-cell-primary': primary === 'title' && valueAlign !== 'left'}">
      <p>
        <label class="vux-label" :style="getLabelStyles()" :class="labelClass" v-if="title || hasTitleSlot">
          <slot name="title">{{ title }}</slot>
        </label>
        <slot name="after-title"></slot>
      </p>
      <inline-desc>
        <slot name="inline-desc">{{ inlineDesc }}</slot>
      </inline-desc>
    </div>
    <div class="weui-cell__ft" :class="valueClass">
      <slot name="value"></slot>
      <slot>{{ value }}</slot>
      <i class="weui-loading" v-if="isLoading"></i>
    </div>
    <slot name="child"></slot>
  </div>
</template>

<script>
import InlineDesc from '../inline-desc'
import { go } from '../../libs/router'
import props from './props'

export default {
  name: 'cell',
  components: {
    InlineDesc
  },
  props: props(),
  beforeMount () {
    this.hasTitleSlot = !!this.$slots.title
  },
  computed: {
    valueClass () {
      return {
        'vux-cell-primary': this.primary === 'content' || this.valueAlign === 'left',
        'vux-cell-align-left': this.valueAlign === 'left',
        'vux-cell-arrow-transition': !!this.arrowDirection,
        'vux-cell-arrow-up': this.arrowDirection === 'up',
        'vux-cell-arrow-down': this.arrowDirection === 'down'
      }
    },
    labelClass () {
      return {
        'vux-cell-justify': this.$parent.labelAlign === 'justify' || this.$parent.$parent.labelAlign === 'justify'
      }
    },
    style () {
      if (this.alignItems) {
        return {
          alignItems: this.alignItems
        }
      }
    }
  },
  methods: {
    getLabelStyles () {
      return {
        width: this.$parent.labelWidth || this.$parent.$parent.labelWidth,
        textAlign: this.$parent.labelAlign || this.$parent.$parent.labelAlign,
        marginRight: this.$parent.labelMarginRight || this.$parent.$parent.labelMarginRight
      }
    },
    onClick () {
      !this.disabled && go(this.link, this.$router)
    }
  },
  data () {
    return {
      hasTitleSlot: false
    }
  }
}
</script>

<style lang="less">
@import '../../styles/variable.less';
@import '../../styles/tap.less';
@import '../../styles/weui/base/mixin/setArrow.less';
@import '../../styles/weui/widget/weui_cell/weui_cell_global';
@import '../../styles/weui/widget/weui-loading/weui-loading.less';

.vux-cell-primary {
  flex: 1;
}
.vux-label {
  display: block;
  word-wrap: break-word;
  word-break: break-all;
}
.weui-cell__ft .weui-loading {
  display: block;
}
.weui-cell__ft.vux-cell-align-left {
  text-align: left;
}
.weui-cell.vux-cell-no-border-intent:before {
  left: 0;
}
.weui-cell_access .weui-cell__ft.vux-cell-arrow-down:after {
  transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(90deg);
}
.weui-cell_access .weui-cell__ft.vux-cell-arrow-up:after {
  transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(-90deg);
}
.vux-cell-arrow-transition:after {
  transition: transform 300ms;
}
.vux-cell-disabled {
  .vux-label {
    color: #b2b2b2;
  }
  &.weui-cell_access .weui-cell__ft:after {
    border-color: @cell-disabled-arrow-color;
  }
}
</style>

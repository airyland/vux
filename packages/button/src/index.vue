<template>
  <a :class="classes" :style="getStyle" @click="handleClick">
    <vux-loading type="circle" v-if="loading"></vux-loading>
    <vux-icon :name="icon" v-if="icon && !loading"></vux-icon>
    <slot></slot>
  </a>
</template>

<script lang="ts">
import { PropType, CSSProperties, toRefs, computed, defineComponent } from 'vue';
import { ButtonType, ButtonSize, ButtonShape } from './button'

export default defineComponent({
  name: 'vux-button',
  props: {
    color: {
      type: String
    },
    shape: {
      type: String as PropType<ButtonShape>,
      default: 'round'
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String as PropType<ButtonType>,
      default: 'default'
    },
    size: {
      type: String as PropType<ButtonSize>
    },
    block: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    }
  },
  emits: ['click'],
  setup(props, { emit, slots }) {
    const {
      type,
      size,
      shape,
      disabled,
      loading,
      color,
      block
    } = toRefs(props);

    const handleClick = (event: MouseEvent) => {
      if (!loading.value && !disabled.value) {
        emit('click', event);
      }
    };

    const classes = computed(() => {
      const prefixCls = 'weui-btn';
      return {
        [prefixCls]: true,
        [`${prefixCls}_${type.value}`]: type.value,
        [`${prefixCls}_${size.value}`]: size.value,
        [`${prefixCls}_${shape.value}`]: shape.value,
        [`${prefixCls}_disabled`]: disabled.value,
        [`${prefixCls}_loading`]: loading.value
      };
    });

    const getStyle = computed(() => {
      const style: CSSProperties = {};
      if (color?.value) {
        style.color = color.value;
        style.background = '#fff';
        style.borderColor = color.value;
      }

      return style;
    });

    return {
      handleClick,
      classes,
      getStyle
    };
  }
});
</script>

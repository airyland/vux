<template>
  <span :class="classes" :style="getStyle">
    <span class="weui-primary-loading__dot" v-if="!isSpinner"></span>
  </span>
</template>

<script lang="ts">
import { computed, CSSProperties, PropType } from 'vue';
import { defineComponent } from 'vue';
import { LoadingType } from './loading';
import { pxCheck } from '@vux/utils/pxUtil';

export default defineComponent({
  name: 'vux-loading',
  props: {
    type: {
      type: String as PropType<LoadingType>,
      default: 'spinner'
    },
    color: {
      type: String
    },
    size: {
      type: [String, Number]
    }
  },
  components: {},

  setup(props, { slots }) {
    const isSpinner = computed(() => props.type === 'spinner')
    const getStyle = computed(() => {
      const style: CSSProperties = {};
      if (props.color) {
        style.color = props.color
      }
      if (props.size) {
        style.width = pxCheck(props.size)
        style.height = pxCheck(props.size)
        style.fontSize = pxCheck(props.size)
      }
      return style;
    });
    const classes = computed(() => {
      return [
        isSpinner.value ? 'weui-loading' : 'weui-primary-loading'
      ]
    })
    return {
      classes,
      getStyle,
      isSpinner
    }
  }
});
</script>
  
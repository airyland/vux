
<script lang="ts">
import { pxCheck } from '@vux/utils/pxUtil';
import { defineComponent, h, PropType } from 'vue';
import { IconName, IconType } from './icon';

export default defineComponent({
  name: 'vux-icon',
  props: {
    name: { type: String as PropType<IconName>, default: '' },
    type: { type: String as PropType<IconType> },
    size: { type: [String, Number], default: '' },
    color: { type: String, default: '' },
    tag: { type: String as PropType<keyof HTMLElementTagNameMap>, default: 'i' }
  },
  emits: ['click'],

  setup(props, { emit, slots }) {
    const handleClick = (event: Event) => {
      emit('click', event);
    };

    return () => {
      return h(
        props.tag,
        {
          class: [
          `weui-icon-${props.name}`
          ],
          style: {
            color: props.color,
            fontSize: pxCheck(props.size),
            width: pxCheck(props.size),
            height: pxCheck(props.size)
          },
          onClick: handleClick
        },
        slots.default?.()
      )
    };
  }
});
</script>
  
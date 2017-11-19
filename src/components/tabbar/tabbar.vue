<template>
  <div class="weui-tabbar">
    <slot></slot>
  </div>
</template>

<script>
import { parentMixin } from '../../mixins/multi-items'

export default {
  mounted () {
    if (process.env.NODE_ENV === 'development') {
      this.$nextTick(() => {
        const $el = this.$el
        const position = window.getComputedStyle($el).position
        if (position === 'fixed') {
          return
        } else if (position === 'absolute') {
          if (document.documentElement.offsetHeight !== window.innerHeight) {
            console.warn('[VUX warn] tabbar 定位默认为 absolute，如果你没有使用 100% 布局(view-box)，需要手动设置 style position 为 fixed')
          }
        }
      })
    }
  },
  name: 'tabbar',
  mixins: [parentMixin],
  props: {
    iconClass: String
  }
}
</script>

<style lang="less">
@import '../../styles/weui/widget/weui_tab/vux-tabbar.less';
@import '../../styles/reddot.less';

.weui-tabbar__icon {
  position: relative;
}
.weui-tabbar__icon > sup {
  position: absolute;
  top: -8px;
  left: 100%;
  transform: translateX(-50%);
  z-index: 101;
}
.weui-tabbar__item.vux-tabbar-simple {
  padding: 0;
  height: 50px;
  line-height: 50px;
}
.vux-tabbar-simple .weui-tabbar__label {
  font-size: 14px;
  line-height: 50px;
}
</style>

<template>
  <div v-click-outside="onClickedOutside">
    <span v-el:trigger>
      <slot>
      </slot>
    </span>
    <div class="vux-popover"
      :class="{
      'top':placement === 'top',
      'left':placement === 'left',
      'right':placement === 'right',
      'bottom':placement === 'bottom'
      }"
      v-el:popover
      v-show="show">
        <div :class="arrowClass"></div>
        <div @click="$emit('on-click-content')">
          <slot name="content">
              <div v-html="content"></div>
          </slot>
        </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from '../../directives/click-outside'

export default {
  ready () {
    const triger = this.$els.trigger.children[0]
    triger.addEventListener('click', (e) => {
      this.toggle()
    })
    const popover = this.$els.popover
    switch (this.placement) {
      case 'top' :
        this.position.left = triger.offsetLeft - popover.offsetWidth / 2 + triger.offsetWidth / 2
        this.position.top = triger.getBoundingClientRect().top - popover.offsetHeight - this.gutter
        break
      case 'left':
        this.position.left = triger.offsetLeft - popover.offsetWidth - this.gutter
        this.position.top = triger.getBoundingClientRect().top + triger.offsetHeight / 2 - popover.offsetHeight / 2
        break
      case 'right':
        this.position.left = triger.offsetLeft + triger.offsetWidth + this.gutter
        this.position.top = triger.getBoundingClientRect().top + triger.offsetHeight / 2 - popover.offsetHeight / 2
        break
      case 'bottom':
        this.position.left = triger.offsetLeft - popover.offsetWidth / 2 + triger.offsetWidth / 2
        this.position.top = triger.getBoundingClientRect().top + triger.offsetHeight + this.gutter
        break
      default:
        console.warn('Wrong placement prop')
    }
    popover.style.top = this.position.top + 'px'
    popover.style.left = this.position.left + 'px'
    popover.style.display = 'none'
    this.show = false
  },
  directives: {
    ClickOutside
  },
  props: {
    content: String,
    placement: String,
    gutter: {
      type: Number,
      default: 5
    }
  },
  methods: {
    onClickedOutside () {
      if (this.show) {
        this.show = false
        this.$emit('on-hide')
      }
    },
    toggle () {
      this.show = !this.show
      this.$emit(`on-${this.show === true ? 'show' : 'hide'}`)
    }
  },
  data () {
    return {
      position: {
        top: 0,
        left: 0
      },
      show: true
    }
  },
  computed: {
    arrowClass () {
      return {
        'vux-popover-arrow': true,
        'vux-popover-arrow-up': this.placement === 'bottom',
        'vux-popover-arrow-right': this.placement === 'left',
        'vux-popover-arrow-left': this.placement === 'right',
        'vux-popover-arrow-down': this.placement === 'top'
      }
    }
  }
}
</script>

<style lang="less">
@import '../../styles/variable.less';

.vux-popover {
  position: absolute;
  left: 0;
  top: 0;
  background-color: @popover-bg-color;
  color: @popover-font-color;
  border-radius: @popover-border-radius;
  z-index: 500;
}
.vux-popover-arrow {
  position: absolute;
  width: 0;
  height: 0;
}
.vux-popover-arrow-up {
 border-left: @popover-border-width solid transparent;
 border-right: @popover-border-width solid transparent;
 border-bottom: @popover-border-width solid @popover-bg-color;
 left: 50%;
 transform: translateX(-50%);
 top: -@popover-border-width;
}
.vux-popover-arrow-down {
  border-left: @popover-border-width solid transparent;
  border-right: @popover-border-width solid transparent;
  border-top: @popover-border-width solid @popover-bg-color;
  left: 50%;
  transform: translateX(-50%);
  bottom: -@popover-border-width;
}
.vux-popover-arrow-left {
  border-top: @popover-border-width solid transparent;
  border-bottom: @popover-border-width solid transparent;
  border-right: @popover-border-width solid @popover-bg-color;
  top: 50%;
  transform: translateY(-50%);
  left: -@popover-border-width;
}
.vux-popover-arrow-right {
  border-top: @popover-border-width solid transparent;
  border-bottom: @popover-border-width solid transparent;
  border-left: @popover-border-width solid @popover-bg-color;
  top: 50%;
  transform: translateY(-50%);
  right: -@popover-border-width;
}
</style>

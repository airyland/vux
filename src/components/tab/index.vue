<template>
  <div class="vux-tab" :class="{'vux-tab-no-animate': !animate}">
    <slot></slot>
    <div v-if="animate" class="vux-tab-ink-bar" :class="barClass" :style="barStyle"></div>
  </div>
</template>

<script>
export default {
  ready () {
    const tabList = this.$el.querySelectorAll('.vux-tab-item')
    this.tabNumber = tabList.length
    let n = 0
    for (let i of tabList) {
      if (i.classList.contains('vux-tab-selected')) {
        this.index = n
      }
      i.setAttribute('data-index', n)
      n++
    }
  },
  props: {
    lineWidth: {
      type: Number,
      required: false,
      default: 3
    },
    activeColor: {
      type: String,
      required: false,
      default: '#04be02'
    },
    defaultColor: {
      type: String,
      required: false,
      default: '#666'
    },
    animate: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    barLeft: function () {
      return `${this.index * (100 / this.tabNumber)}%`
    },
    barRight: function () {
      return `${(this.tabNumber - this.index - 1) * (100 / this.tabNumber)}%`
    },
    barStyle: function () {
      return {
        left: this.barLeft,
        right: this.barRight,
        display: 'block',
        backgroundColor: this.activeColor,
        height: this.lineWidth + 'px'
      }
    },
    barClass: function () {
      return {
        'vux-tab-ink-bar-transition-forward': this.direction === 'forward',
        'vux-tab-ink-bar-transition-backward': this.direction === 'backward'
      }
    }
  },
  watch: {
    index: function (newIndex, oldIndex) {
      this.direction = newIndex > oldIndex ? 'forward' : 'backward'
    }
  },
  data () {
    return {
      direction: 'forward',
      right: '100%',
      index: -1
    }
  }
}
</script>


<style lang="less">
@prefixClass: vux-tab;
@easing-in-out: cubic-bezier(0.35, 0, 0.25, 1);
@effect-duration: .3s;

.@{prefixClass} {

  &-ink-bar {
    position: absolute;
    height: 2px;
    bottom: 0;
    left: 0;

    &-transition-forward {
      transition: right @effect-duration @easing-in-out,
      left @effect-duration @easing-in-out @effect-duration * 0.3;
    }
    &-transition-backward {
      transition: right @effect-duration @easing-in-out @effect-duration * 0.3,
      left @effect-duration @easing-in-out;
    }
  }

}

.vux-tab {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  background-color: #fff;
  height: 44px;
  position: relative;
}
.vux-tab button {
  padding: 0;
  border: 0;
  outline: 0;
  background: 0 0;
  -webkit-appearance: none;
}
.vux-tab .vux-tab-item {
  display: block;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  width: 100%;
  height: 100%;
  -webkit-box-sizing: border-box;
  background: -webkit-gradient(linear, left top, left bottom, from(#e5e5e5), to(#e5e5e5)) bottom left no-repeat;
  background: -webkit-linear-gradient(270deg, #e5e5e5, #e5e5e5, rgba(229, 229, 229, 0)) bottom left no-repeat;
  background: linear-gradient(180deg, #e5e5e5, #e5e5e5, rgba(229, 229, 229, 0)) bottom left no-repeat;
  -webkit-background-size: 100% 1px;
  font-size: 14px;
  text-align: center;
  line-height: 44px;
  color: #666;
}
.vux-tab .vux-tab-item.vux-tab-selected {
  color: #04be02;
  border-bottom: 3px solid #04be02;
}

.vux-tab.vux-tab-no-animate .vux-tab-item.vux-tab-selected {
  background: 0 0;
}
</style>

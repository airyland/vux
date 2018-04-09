<template>
  <div class="vux-circle">
    <svg viewBox="0 0 100 100">
      <defs v-if="isGradient">
        <linearGradient id="orange_red" x1="10%" y1="45%" x2="50%" y2="0%">
          <stop offset="0%" :style="{'stop-color': strokeColor[0], 'stop-opacity': 1}"/>
          <stop offset="100%" :style="{'stop-color': strokeColor[1], 'stop-opacity': 1}"/>
        </linearGradient>
      </defs>
      <path :d="pathString"
            :stroke="trailColor"
            :stroke-width="trailWidth"
            :fill-opacity="0"/>
      <path :d="pathString"
            :stroke-linecap="strokeLinecap"
            :stroke="isGradient ? 'url(#orange_red)' : strokeColor"
            :stroke-width="strokeWidth"
            fill-opacity="0" :style="pathStyle"/>
    </svg>
    <div class="white" v-if="hasWhite" :style="whiteStyle"></div>
    <div class="vux-circle-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  /**
   * Fork from https://github.com/react-component/progress
   * MIT license
   */

  export default {
    name: 'x-circle',
    props: {
      // 线条宽度
      strokeWidth: {
        type: Number,
        default: 1
      },
      // 线条颜色-数组支持渐变色
      strokeColor: {
        type: [Array, String]
      },
      // 起点的位置是否有白点
      hasWhite: {
        type: Boolean,
        default: true
      },
      // 外圈宽度
      trailWidth: {
        type: Number,
        default: 1
      },
      // 外圈颜色
      trailColor: {
        type: String,
        default: '#D9D9D9'
      },
      // 百分比
      percent: {
        type: Number,
        default: 0
      },
      // 结束类型
      strokeLinecap: {
        type: String,
        default: 'round'
      }
    },
    computed: {
      radius () {
        return 50 - this.strokeWidth / 2
      },
      pathString () {
        return `M 50,50 m 0,-${this.radius}
      a ${this.radius},${this.radius} 0 1 1 0,${2 * this.radius}
      a ${this.radius},${this.radius} 0 1 1 0,-${2 * this.radius}`
      },
      len () {
        return Math.PI * 2 * this.radius
      },
      pathStyle () {
        return {
          'stroke-dasharray': `${this.len}px ${this.len}px`,
          'stroke-dashoffset': `${((100 - this.percent) / 100 * this.len)}px`,
          'transition': 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
        }
      },
      whiteStyle () {
        return {
          'width': `${this.strokeWidth}px`,
          'height': `${this.strokeWidth}px`,
          'top': `${this.strokeWidth / 4}px`
        }
      },
      isGradient () {
        return typeof this.strokeColor !== 'string'
      }
    }
  }
</script>

<style>
  .white {
    position: absolute;
    left: 50%;
    margin-left: -2px;
    background: #fff;
    border-radius: 50%;
  }

  .vux-circle {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .vux-circle-content {
    width: 100%;
    text-align: center;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
</style>

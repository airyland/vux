<template>
  <div class="vux-circle">
    <svg viewBox="0 0 100 100">
      <path :d="pathString" :stroke="trailColor" :stroke-width="trailWidth" :fill-opacity="0"/>
      <path :d="pathString" stroke-linecap="round" :stroke="strokeColor" :stroke-width="strokeWidth" fill-opacity="0" :style="pathStyle"/>
    </svg>
    <div class="vux-circle-content"><slot></slot></div>
  </div>
</template>

<script>
/**
* Fork from https://github.com/react-component/progress
* MIT license
*/

export default {
  props: {
    strokeWidth: {
      type: Number,
      default: 1
    },
    strokeColor: {
      type: String,
      default: '#3FC7FA'
    },
    trailWidth: {
      type: Number,
      default: 1
    },
    trailColor: {
      type: String,
      default: '#D9D9D9'
    },
    percent: {
      type: Number,
      default: 0
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
    }
  }
}
</script>

<style>
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

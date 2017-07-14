<template>
  <div class="vux-marquee" :style="{height: height + 'px'}">
    <ul class="vux-marquee-box" ref="box" :style="{transform: `translate3d(0,${currenTranslateY}px,0)`, transition: `transform ${noAnimate ? 0 : duration}ms`}">
      <slot></slot>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    interval: {
      type: Number,
      default: 2000
    },
    duration: {
      type: Number,
      default: 300
    },
    direction: {
      type: String,
      default: 'up'
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.init()
      this.start()
    })
  },
  beforeDestroy () {
    this.timer && clearInterval(this.timer)
  },
  data () {
    return {
      currenTranslateY: 0,
      height: '',
      length: 0,
      currentIndex: 0,
      noAnimate: false
    }
  },
  methods: {
    init () {
      let cloneNode
      let firstItem = this.$refs.box.firstElementChild
      this.length = this.$refs.box.children.length
      this.height = firstItem.offsetHeight
      if (this.direction === 'up') {
        cloneNode = firstItem.cloneNode(true)
        this.$refs.box.appendChild(cloneNode)
      } else {
        cloneNode = this.$refs.box.lastElementChild.cloneNode(true)
        this.$refs.box.insertBefore(cloneNode, firstItem)
      }
    },
    start () {
      if (this.direction === 'down') this.go(false)
      this.timer = setInterval(() => {
        if (this.direction === 'up') {
          this.currentIndex += 1
          this.currenTranslateY = -this.currentIndex * this.height
        } else {
          this.currentIndex -= 1
          this.currenTranslateY = -(this.currentIndex + 1) * this.height
        }
        if (this.currentIndex === this.length) {
          setTimeout(() => {
            this.go(true)
          }, this.duration)
        } else if (this.currentIndex === -1) {
          setTimeout(() => {
            this.go(false)
          }, this.duration)
        } else {
          this.noAnimate = false
        }
      }, this.interval + this.duration)
    },
    go (toFirst) {
      this.noAnimate = true
      if (toFirst) {
        this.currentIndex = 0
        this.currenTranslateY = 0
      } else {
        this.currentIndex = this.length - 1
        this.currenTranslateY = -(this.currentIndex + 1) * this.height
      }
    }
  }
}
</script>
<style lang="less">
.vux-marquee {
  width: 100%;
  overflow: hidden;
}
.vux-marquee-box {
  padding: 0;
  margin: 0;
  width: 100%;
  height: auto;
  
  li {
    margin: 0;
    width: 100%;
  }
}
</style>
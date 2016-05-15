<template>
  <div class="vux-slider">
    <div class="vux-swiper" :style="swiperStyle">
      <slot></slot>
      <div class="vux-swiper-item" v-for="item in list" @click="clickListItem(item)">
        <a :href="item.url">
          <div class="vux-img" :style="{backgroundImage: buildBackgroundUrl(item.img)}"></div>
          <p class="vux-swiper-desc">{{item.title}}</p>
        </a>
      </div>
    </div>
    <div class="vux-indicator" v-show="show_dots && list.length > 1">
      <a href="javascript:" v-for="(index, item) in list">
        <i class="vux-icon-dot" :class="{'active':index === current}"></i>
      </a>
    </div>
  </div>
</template>

<script>
import Swiper from './swiper'
export default {
  ready () {
    if (!(this.list && this.list.length === 0)) {
      this.render()
    }
  },
  methods: {
    clickListItem: function (item) {
      this.$emit('on-click-list-item', JSON.parse(JSON.stringify(item)))
    },
    buildBackgroundUrl: function (url) {
      return `url(${url})`
    },
    render: function () {
      this.swiper = new Swiper({
        container: this.$el,
        direction: this.direction,
        auto: this.auto,
        interval: this.interval,
        threshold: this.threshold,
        duration: this.duration,
        height: this.height,
        minMovingDistance: this.minMovingDistance
      })
      .on('swiped', (prev, current) => {
        this.current = current
      })
    },
    rerender: function () {
      this.$nextTick(() => {
        this.current = 0
        this.destroy()
        this.render()
      })
    },
    destroy: function () {
      this.swiper && this.swiper.destroy()
    }
  },
  props: {
    list: {
      type: Array,
      required: false,
      default () {
        return []
      }
    },
    direction: {
      type: String,
      default: 'horizontal'
    },
    show_dots: {
      type: Boolean,
      default: true
    },
    auto: {
      type: Boolean,
      default: false
    },
    interval: {
      type: Number,
      default: 3000
    },
    threshold: {
      type: Number,
      default: 50
    },
    duration: {
      type: Number,
      default: 300
    },
    height: {
      type: String,
      default: 'auto'
    },
    minMovingDistance: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      current: 0
    }
  },
  computed: {
    swiperStyle () {
      return {
        height: this.height || 'auto'
      }
    }
  },
  watch: {
    list (val) {
      this.rerender()
    },
    current (index) {
      this.$emit('on-index-change', index)
    }
  },
  beforeDestroy () {
    this.destroy()
  },
  events: {
    'swiper-item:created' () {
      this.rerender()
    }
  }
}

</script>

<style lang="less">
@pre: vux;

.@{pre}-slider {
  overflow: hidden;
  position: relative;

  > .@{pre}-indicator {
    position: absolute;
    right: 15px;
    bottom: 10px;

    > a {
      float: left;
      margin-left: 6px;

      > .@{pre}-icon-dot {
        display: inline-block;
        vertical-align: middle;
        width: 6px;
        height: 6px;
        border-radius: 3px;
        background-color: #d0cdd1;
      }
      > .@{pre}-icon-dot.active {
        background-color: #04BE02;
      }

    }
  }
  
  > .@{pre}-swiper {
    overflow: hidden;
    position: relative;

    > .@{pre}-swiper-item {
      float: left;
      position: relative;
      height: 100%;

      > a {
        display: block;
        width: 100%;
        height: 100%;

        > .@{pre}-img {
          display: block;
          width: 100%;
          height: 100%;
          background: center center no-repeat;
          background-size: cover;
        }

        > .@{pre}-swiper-desc {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1.4em;
          font-size: 16px;
          padding: 20px 50px 12px 13px;
          background-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, .7) 100%);
          background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, .7) 100%);
          color: #fff;
          text-shadow: 0 1px 0 rgba(0, 0, 0, .5);
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
        }

      }
    }
  }
}
</style>

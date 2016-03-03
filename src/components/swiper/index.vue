<template>
  <div class="slider">
    <div class="swiper" :style="{height: height+'px'}">
      <slot></slot>
      <div class="item" v-for="item in list">
        <a :href="item.url">
          <div class="img" :data-x="item.img" :style="{backgroundImage:'url('+item.img+')'}"></div>
          <p class="desc">{{item.title}}</p>
        </a>
      </div>
    </div>
    <div class="indicator" v-show="show_dots">
      <a href="javascript:" v-for="(index,item) in list">
        <i class="icon_dot" :class="{'active':index===current}"></i>
      </a>
    </div>
  </div>
</template>

<script>
  import Swiper from './swiper'
  export default {
    ready () {
      const _this = this
      this.swiper = new Swiper({
        container: _this.$el,
        direction: _this.direction,
        auto: _this.auto,
        interval: _this.interval,
        threshold: _this.threshold,
        duration: _this.duration,
        height: _this.height
      })
      .on('swiped', function (prev, current) {
        _this.current = current
      })
    },
    props: {
      list: {
        type: Array,
        required: false
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
        type: Number,
        default: 180
      }
    },
    data () {
      return {
        current: 0
      }
    },
    beforeDestroy () {
      this.swiper.destroy()
    }
  }

</script>

<style type="text/css">
.slider {
  overflow: hidden;
  position: relative;
}
.swiper {
  overflow: hidden;
  position: relative;
}
.swiper .item {
  float: left;
  position: relative;
}
.swiper .item a {
  display: block;
  width: 100%;
  height: 100%;
}
.swiper .item .img {
  display: block;
  width: 100%;
  height: 100%;
  background: center center no-repeat;
  background-size: cover;
}
.swiper .item .desc {
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
.indicator {
  position: absolute;
  right: 15px;
  bottom: 10px;
}
.indicator a {
  float: left;
  margin-left: 6px;
}
.icon_dot {
  display: inline-block;
  vertical-align: middle;
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: #d0cdd1;
}
.icon_dot.active {
  background-color: #04BE02;
}
</style>
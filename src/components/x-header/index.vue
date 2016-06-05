<template>
  <div class="vux-header">
    <div class="vux-header-left">
      <a class="vux-header-back" @click.preventDefault v-show="leftOptions.showBack" @click="onClickBack">{{leftOptions.backText}}</a>
      <slot name="left"></slot>
    </div>
    <h1 class="vux-header-title"><slot></slot></h1>
    <div class="vux-header-right">
      <a class="vux-header-more" @click.preventDefault @click="$emit('on-click-more')" v-if="rightOptions.showMore"></a>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    leftOptions: {
      type: Object,
      default () {
        return {
          showBack: true,
          backText: 'Back',
          preventGoBack: false
        }
      }
    },
    rightOptions: {
      type: Object,
      default () {
        return {
          showMore: false
        }
      }
    }
  },
  methods: {
    onClickBack () {
      if (this.leftOptions.preventGoBack) {
        this.$emit('on-click-back')
      } else {
        history.back()
      }
    }
  }
}
</script>

<style>
.vux-header {
  position: relative;
  padding: 3px 0;
  box-sizing: border-box;
  background-color: #35495e;
}
.vux-header .vux-header-title,.vux-header h1 {
  margin: 0 88px;
  margin-left: 100px;
  line-height: 40px;
  text-align: center;
  height: 40px;
  font-size: 18px;
  font-weight: 400;
  width: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #fff
}
.vux-header .vux-header-title a,.vux-header .vux-header-title a:active,.vux-header h1 a,.vux-header h1 a:active {
  color: #fff
}
.vux-header .vux-header-left,.vux-header .vux-header-right {
  position: absolute;
  top: 14px;
  display: block;
  font-size: 14px;
  line-height: 21px;
  color: #ccc
}
.vux-header .vux-header-left a,.vux-header .vux-header-left button,.vux-header .vux-header-right a,.vux-header .vux-header-right button {
  float: left;
  margin-right: 8px;
  color: #ccc
}
.vux-header .vux-header-left a:active,.vux-header .vux-header-left button:active,.vux-header .vux-header-right a:active,.vux-header .vux-header-right button:active {
  opacity: .5
}
.vux-header .vux-header-left {
  left: 18px
}
.vux-header .vux-header-left .vux-header-back {
  padding-left: 16px
}
.vux-header .vux-header-left .vux-header-back:before {
  content: "";
  position: absolute;
  display: block;
  top: 2px;
  left: 0;
  width: 12px;
  height: 12px;
  border: 1px solid #ccc;
  border-width: 1px 0 0 1px;
  margin-left: 3px;
  margin-top: 1px;
  transform: rotate(315deg)
}
.vux-header .vux-header-right {
  right: 15px
}
.vux-header .vux-header-right a,.vux-header .vux-header-right button {
  margin-left: 8px;
  margin-right: 0
}
.vux-header .vux-header-right .vux-header-more:after {
  content: "\2022\0020\2022\0020\2022\0020";
  font-size: 16px;
}
</style>

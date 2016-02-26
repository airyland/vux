<template>
  <div>
    <div class="center">
      <h1 class="vux-title">Vux</h1>
      <p class="vux-notice">Beta. Not Production Ready.</p>
    </div>
    <group title="Form" title-color="#04be02">
      <cell title="Radio" is-link link="component/radio">
        <span class="demo-icon" slot="icon">&#xe60f;</span>
      </cell>
      <cell title="Checklist" is-link link="component/checklist">
        <span class="demo-icon" slot="icon">&#xe61d;</span>
      </cell>
      <cell title="Selector" is-link link="component/selector">
        <span class="demo-icon" slot="icon">&#xe607;</span>
      </cell>
      <cell title="Button" is-link link="component/button">
        <span class="demo-icon" slot="icon">&#xe616;</span>
      </cell>
      <cell title="Textarea" is-link link="component/textarea">
        <span class="demo-icon" slot="icon">&#xe611;</span>
      </cell>
      <cell title="Datetime" is-link link="component/datetime">
        <span class="demo-icon" slot="icon">&#xe60a;</span>
      </cell>
      <cell title="Switch" is-link link="component/switch">
        <span class="demo-icon" slot="icon">&#xe61c;</span>
      </cell>
      <cell title="Input" is-link link="component/input">
        <span class="demo-icon" slot="icon">&#xe614;</span>
      </cell>
      <cell title="Number" is-link link="component/number">
        <span class="demo-icon" slot="icon">&#xe605;</span>
      </cell>
      <cell title="Range" is-link link="component/range">
        <span class="demo-icon" slot="icon">&#xe60b;</span>
      </cell>
      <cell title="Rater" is-link link="component/rater">
        <span class="demo-icon" slot="icon">&#xe606;</span>
      </cell>
      <cell title="Address" is-link link="component/address">
        <span class="demo-icon" slot="icon">&#xe61b;</span>
      </cell>
    </group>

    <group title="UI" title-color="#04be02">
      <cell title="Icon" is-link link="component/icon">
        <span class="demo-icon" slot="icon">&#xe619;</span>
      </cell>
      <cell title="Box" is-link link="component/box">
        <span class="demo-icon" slot="icon">&#xe60d;</span>
      </cell>
      <cell title="Flexbox" is-link link="component/flexbox">
        <span class="demo-icon" slot="icon">&#xe61f;</span>
      </cell>
      <cell title="Tab" is-link link="component/tab">
        <span class="demo-icon" slot="icon">&#xe615;</span>
      </cell>
      <cell title="Swiper" is-link link="component/swiper">
        <span class="demo-icon" slot="icon">&#xe612;</span>
      </cell>
      <cell title="Sticky" is-link link="component/sticky">
        <span class="demo-icon" slot="icon">&#xe623;</span>
      </cell>
      <cell title="Picker" is-link link="component/picker">
        <span class="demo-icon" slot="icon">&#xe627;</span>
      </cell>
      <cell title="Popup" is-link link="component/popup">
        <span class="demo-icon" slot="icon">&#xe61e;</span>
      </cell>
      <cell title="Popup Picker" is-link link="component/popup-picker">
        <span class="demo-icon" slot="icon">&#xe626;</span>
      </cell>
      <cell title="Actionsheet" is-link link="component/actionsheet">
        <span class="demo-icon" slot="icon">&#xe624;</span>
      </cell>
      <cell title="Clocker" is-link link="component/clocker">
        <span class="demo-icon" slot="icon">&#xe620;</span>
      </cell>
      <cell title="Toast" is-link link="component/toast">
        <span class="demo-icon" slot="icon">&#xe625;</span>
      </cell>
      <cell title="Loading" is-link link="component/loading">
        <span class="demo-icon" slot="icon">&#xe610;</span>
      </cell>
      <cell title="Alert" is-link link="component/alert">
        <span class="demo-icon" slot="icon">&#xe603;</span>
      </cell>
      <cell title="Confirm" is-link link="component/confirm">
        <span class="demo-icon" slot="icon">&#xe608;</span>
      </cell>
      <cell title="Progress" is-link link="component/progress">
        <span class="demo-icon" slot="icon">&#xe618;</span>
      </cell>
    </group>

    <group title="优化" title-color="#04be02">
      <cell title="X-img" value="延迟加载及webp切换支持" is-link link="component/x-img">
        <span class="demo-icon" slot="icon">&#xe602;</span>
      </cell>
      <cell title="1px" value="1px解决方案(FrozenUI)" is-link link="component/1px">
        <span class="demo-icon" slot="icon">&#xe621;</span>
      </cell>
      <cell title="Orientation" value="横竖屏切换提示" is-link link="component/orientation">
        <span class="demo-icon" slot="icon">&#xe628;</span>
      </cell>
      <cell title="Shake" value="摇一摇" is-link link="component/shake">
        <span class="demo-icon" slot="icon">&#xe629;</span>
      </cell>
    </group>

    <group title="TODO" title-color="#04be02" v-if="showTodo">
      <cell title="短信验证组件" is-link link="component/address"></cell>
      <cell title="图片验证码" is-link link="component/rater"></cell>
      <cell title="Calendar" is-link link="component/calendar"></cell>
    </group>

    <group title="Demo" title-color="#04be02">
      <cell title="微信设置页面" is-link link="demo/wechat">
        <span class="demo-icon" slot="icon">&#xe600;</span>
      </cell>
      <cell title="小蚁摄像设置" is-link link="demo/yi">
        <span class="demo-icon" slot="icon">&#xe622;</span>
      </cell>
    </group>
  </div>
</template>

<script>
import { Cell, Group } from './components/'
export default {
  components: {
    Cell,
    Group
  },
  data: function () {
    return {
    }
  }
}
</script>

<style>
@import './demos/style.css';
.center {
  margin-top: 15px;
  text-align: center;
}
.vux-notice {
  color: #666;
  line-height: 40px;
}
.vux-title {
  vertical-align: middle;
  text-align: center;
  color: #04BE02;
  display: inline-block;
  width: 75px;
  height: 75px;
  line-height: 75px;
  border-radius: 50%;
  background-color: #35495e;
}
body {
  font-family: Helvetica, sans-serif;
  background-color: #fbf9fe;
  padding-bottom: 50px;
}
.weui_cell_box.weui_cell {
  padding: 0
}
.weui_cell_ft.with_arrow:after {
  content: " ";
  display: inline-block;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  height: 6px;
  width: 6px;
  border-width: 2px 2px 0 0;
  border-color: #C8C8CD;
  border-style: solid;
  position: relative;
  top: -2px;
  top: -1px;
  margin-left: .3em;
}
.weui_cells > a {
    color: #000;
}
</style>

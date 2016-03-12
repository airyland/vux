<template>
  <div>
    <group title="Form" title-color="#04be02">
      <cell title="Radio" link="component/radio">
        <span class="demo-icon" slot="icon">&#xe60f;</span>
      </cell>
      <cell title="Checklist" link="component/checklist">
        <span class="demo-icon" slot="icon">&#xe61d;</span>
      </cell>
      <cell title="Selector" link="component/selector">
        <span class="demo-icon" slot="icon">&#xe607;</span>
      </cell>
      <cell title="Button" link="component/button">
        <span class="demo-icon" slot="icon">&#xe616;</span>
      </cell>
      <cell title="Textarea" link="component/textarea">
        <span class="demo-icon" slot="icon">&#xe611;</span>
      </cell>
      <cell title="Datetime" link="component/datetime">
        <span class="demo-icon" slot="icon">&#xe60a;</span>
      </cell>
      <cell title="Calendar" link="component/calendar">
        <span class="demo-icon" slot="icon">&#xe62b;</span>
      </cell>
      <cell title="Switch" link="component/switch">
        <span class="demo-icon" slot="icon">&#xe61c;</span>
      </cell>
      <cell title="Input" link="component/input">
        <span class="demo-icon" slot="icon">&#xe614;</span>
      </cell>
      <cell title="Cell" link="component/cell">
        <span class="demo-icon" slot="icon">&#xe62a;</span>
      </cell>
      <cell title="Number" link="component/number">
        <span class="demo-icon" slot="icon">&#xe605;</span>
      </cell>
      <cell title="Range" link="component/range">
        <span class="demo-icon" slot="icon">&#xe60b;</span>
      </cell>
      <cell title="Rater" link="component/rater">
        <span class="demo-icon" slot="icon">&#xe606;</span>
      </cell>
      <cell title="Address" link="component/address">
        <span class="demo-icon" slot="icon">&#xe61b;</span>
      </cell>
      <cell title="Color Picker" link="component/color-picker">
        <span class="demo-icon" slot="icon" style="color:#f2c400;">&#xe63f;</span>
      </cell>
    </group>

    <group title="UI" title-color="#04be02">
      <cell title="Icon" link="component/icon">
        <span class="demo-icon" slot="icon">&#xe619;</span>
      </cell>
      <cell title="Flexbox" link="component/flexbox">
        <span class="demo-icon" slot="icon">&#xe61f;</span>
      </cell>
      <cell title="Tab" link="component/tab">
        <span class="demo-icon" slot="icon">&#xe615;</span>
      </cell>
      <cell title="Swiper" link="component/swiper">
        <span class="demo-icon" slot="icon">&#xe612;</span>
      </cell>
      <cell title="Sticky" link="component/sticky">
        <span class="demo-icon" slot="icon">&#xe623;</span>
      </cell>
      <cell title="Picker" link="component/picker">
        <span class="demo-icon" slot="icon">&#xe627;</span>
      </cell>
      <cell title="Popup" link="component/popup">
        <span class="demo-icon" slot="icon">&#xe61e;</span>
      </cell>
      <cell title="Popup Picker" link="component/popup-picker">
        <span class="demo-icon" slot="icon">&#xe626;</span>
      </cell>
      <cell title="Actionsheet" link="component/actionsheet">
        <span class="demo-icon" slot="icon">&#xe624;</span>
      </cell>
      <cell title="Clocker" link="component/clocker">
        <span class="demo-icon" slot="icon">&#xe620;</span>
      </cell>
      <cell title="Toast" link="component/toast">
        <span class="demo-icon" slot="icon">&#xe625;</span>
      </cell>
      <cell title="Loading" link="component/loading">
        <span class="demo-icon" slot="icon">&#xe610;</span>
      </cell>
      <cell title="Alert" link="component/alert">
        <span class="demo-icon" slot="icon">&#xe603;</span>
      </cell>
      <cell title="Confirm" link="component/confirm">
        <span class="demo-icon" slot="icon">&#xe608;</span>
      </cell>
      <cell title="Progress" link="component/progress">
        <span class="demo-icon" slot="icon">&#xe618;</span>
      </cell>
      <cell title="Search" link="component/search">
        <span class="demo-icon" slot="icon">&#xe63b;</span>
      </cell>
      <cell title="Spinner" link="component/spinner">
        <span class="demo-icon" slot="icon">&#xe610;</span>
      </cell>
      <cell title="Circle" link="component/circle">
        <span class="demo-icon" slot="icon">&#xe63d;</span>
      </cell>
      <cell title="Countup" link="component/countup">
        <span class="demo-icon" slot="icon">&#xe63e;</span>
      </cell>
      <cell title="Blur" link="component/blur">
        <span class="demo-icon" slot="icon">&#xe640;</span>
      </cell>
      <cell title="Scroller" link="component/scroller">
        <span class="demo-icon" slot="icon">&#xe641;</span>
      </cell>
    </group>

    <group title="优化" title-color="#04be02">
      <cell title="X-img" value="延迟加载及webp切换支持" link="component/x-img">
        <span class="demo-icon" slot="icon">&#xe602;</span>
      </cell>
      <cell title="1px" value="1px解决方案(FrozenUI)" link="component/1px">
        <span class="demo-icon" slot="icon">&#xe621;</span>
      </cell>
      <cell title="Orientation" value="横竖屏切换提示" link="component/orientation">
        <span class="demo-icon" slot="icon">&#xe628;</span>
      </cell>
      <cell title="Shake" value="摇一摇" link="component/shake">
        <span class="demo-icon" slot="icon">&#xe629;</span>
      </cell>
      <cell title="Emotion" value="微信表情" link="component/emotion">
        <span class="demo-icon" slot="icon">&#xe63c;</span>
      </cell>
    </group>

    <group title="TODO" title-color="#04be02" v-if="showTodo">
      <cell title="短信验证组件" link="component/address"></cell>
      <cell title="图片验证码" link="component/rater"></cell>
      <cell title="Calendar" link="component/calendar"></cell>
    </group>

    <group title="Demo" title-color="#04be02">
      <cell title="微信设置页面" link="demo/wechat">
        <span class="demo-icon" slot="icon">&#xe600;</span>
      </cell>
      <cell title="小蚁摄像设置" link="demo/yi">
        <span class="demo-icon" slot="icon">&#xe622;</span>
      </cell>
    </group>

    <group title="Todo" title-color="#04be02" style="display: none;">
      <cell title="Step" link="component/radio">
        <span class="demo-icon" slot="icon">&#xe62c;</span>
      </cell>
    </group>

  </div>
</template>

<script>
import { Cell, Group } from '../components/'
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
@import './style.css';
.center {
  margin-top: 15px;
  text-align: center;
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

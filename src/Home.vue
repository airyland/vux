<template>
  <div>
    <group title="Form" title_color="#04be02">
      <cell title="Radio" is-link link="component/radio"></cell>
      <cell title="Checklist" is-link link="component/checklist"></cell>
      <cell title="Selector" is-link link="component/selector"></cell>
      <cell title="Button" is-link link="component/button"></cell>
      <cell title="Textarea" is-link link="component/textarea"></cell>
      <cell title="Datetime" is-link link="component/datetime"></cell>
      <cell title="Switch" is-link link="component/switch"></cell>
      <cell title="Input" is-link link="component/input"></cell>
      <cell title="Number" is-link link="component/number"></cell>
      <cell title="Range" is-link link="component/range"></cell>
      <cell title="Rater" is-link link="component/rater"></cell>
      <cell title="Address" is-link link="component/address"></cell>
    </group>

    <group title="UI" title_color="#04be02">
      <cell title="Icon" is-link link="component/icon"></cell>
      <cell title="Box" is-link link="component/box"></cell>
      <cell title="Flexbox" is-link link="component/flexbox"></cell>
      <cell title="Tab" is-link link="component/tab"></cell>
      <cell title="Swiper" is-link link="component/swiper"></cell>
      <cell title="Sticky" is-link link="component/sticky"></cell>
      <cell title="Picker" is-link link="component/picker"></cell>
      <cell title="Popup" is-link link="component/popup"></cell>
      <cell title="Popup Picker" is-link link="component/popup-picker"></cell>
      <cell title="Actionsheet" is-link link="component/actionsheet"></cell>
      <cell title="Clocker倒计时" is-link link="component/clocker"></cell>
      <cell title="Toast" is-link link="component/toast"></cell>
    </group>

    <group title="TODO" title_color="#04be02">
      <cell title="短信验证组件" is-link link="component/address"></cell>
      <cell title="图片验证码" is-link link="component/rater"></cell>
      <cell title="Calendar" is-link link="component/calendar"></cell>
      <cell title="Progress" is-link link="component/progress"></cell>
      <cell title="Dialog" is-link link="component/dialog"></cell>
    </group>

    <group title="Demo" title_color="#04be02">
      <cell title="微信设置页面" is-link link="demo/wechat"></cell>
      <cell title="小蚁摄像设置" is-link link="demo/yi"></cell>
    </group>

    <router-view></router-view>
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

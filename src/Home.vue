<template>
  <div>
    <group title="Form" title_color="#04be02">
      <cell title="Radio" :is_link=true link="component/radio"></cell>
      <cell title="Checklist" :is_link=true link="component/checklist"></cell>
      <cell title="Selector" :is_link=true link="component/selector"></cell>
      <cell title="Button" :is_link=true link="component/button"></cell>
      <cell title="Textarea" :is_link=true link="component/textarea"></cell>
      <cell title="Datetime" :is_link=true link="component/datetime"></cell>
      <cell title="Switch" :is_link=true link="component/switch"></cell>
      <cell title="Input" :is_link=true link="component/input"></cell>
      <cell title="Number" :is_link=true link="component/number"></cell>
      <cell title="Range" :is_link=true link="component/range"></cell>
    </group>

    <group title="UI" title_color="#04be02">
      <cell title="Icon" :is_link=true link="component/icon"></cell>
      <cell title="Box" :is_link=true link="component/box"></cell>
      <cell title="Flexbox" :is_link=true link="component/flexbox"></cell>
      <cell title="Tab" :is_link=true link="component/tab"></cell>
      <cell title="Swiper" :is_link=true link="component/swiper"></cell>
      <cell title="Sticky" :is_link=true link="component/sticky"></cell>
      <cell title="Picker" :is_link=true link="component/picker"></cell>
      <cell title="Popup" :is_link=true link="component/popup"></cell>
    </group>

    <group title="Demo" title_color="#04be02">
      <cell title="微信设置页面" :is_link=true link="demo/wechat"></cell>
      <cell title="小蚁摄像设置" :is_link=true link="demo/yi"></cell>
    </group>

    <group title="TODO" title_color="#04be02">
      <cell title="Address" :is_link=true link="component/address"></cell>
      <cell title="Rater" :is_link=true link="component/rater"></cell>
      <cell title="短信验证组件" :is_link=true link="component/address"></cell>
      <cell title="图片验证码" :is_link=true link="component/rater"></cell>
      <cell title="Clocker倒计时" :is_link=true link="component/time"></cell>
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

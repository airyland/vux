<template>
  <div>
    <group title="Form" title-color="#04be02">
      <cell title="Radio" is-link v-link="'component/radio'">
        <span class="demo-icon" slot="icon">&#xe60f;</span>
      </cell>
      <cell title="Checklist" is-link v-link="'component/checklist'">
        <span class="demo-icon" slot="icon">&#xe61d;</span>
      </cell>
      <cell title="Selector" is-link v-link="'component/selector'">
        <span class="demo-icon" slot="icon">&#xe607;</span>
      </cell>
      <cell title="Button" is-link v-link="'component/button'">
        <span class="demo-icon" slot="icon">&#xe616;</span>
      </cell>
      <cell title="Textarea" is-link v-link="'component/textarea'">
        <span class="demo-icon" slot="icon">&#xe611;</span>
      </cell>
      <cell title="Datetime" is-link v-link="'component/datetime'">
        <span class="demo-icon" slot="icon">&#xe60a;</span>
      </cell>
      <cell title="Calendar" is-link v-link="'component/calendar'">
        <span class="demo-icon" slot="icon">&#xe62b;</span>
      </cell>
      <cell title="Switch" is-link v-link="'component/switch'">
        <span class="demo-icon" slot="icon">&#xe61c;</span>
      </cell>
      <cell title="Input" is-link v-link="'component/input'">
        <span class="demo-icon" slot="icon">&#xe614;</span>
      </cell>
      <cell title="Cell" is-link v-link="'component/cell'">
        <span class="demo-icon" slot="icon">&#xe62a;</span>
      </cell>
      <cell title="Number" is-link v-link="'component/number'">
        <span class="demo-icon" slot="icon">&#xe605;</span>
      </cell>
      <cell title="Range" is-link v-link="'component/range'">
        <span class="demo-icon" slot="icon">&#xe60b;</span>
      </cell>
      <cell title="Rater" is-link v-link="'component/rater'">
        <span class="demo-icon" slot="icon">&#xe606;</span>
      </cell>
      <cell title="Address" is-link v-link="'component/address'">
        <span class="demo-icon" slot="icon">&#xe61b;</span>
      </cell>
      <cell title="Color Picker" is-link v-link="'component/color-picker'">
        <span class="demo-icon" slot="icon" style="color:#f2c400;">&#xe63f;</span>
      </cell>
    </group>

    <group title="UI" title-color="#04be02">
      <cell title="Icon" is-link v-link="'component/icon'">
        <span class="demo-icon" slot="icon">&#xe619;</span>
      </cell>
      <cell title="Flexbox" is-link v-link="'component/flexbox'">
        <span class="demo-icon" slot="icon">&#xe61f;</span>
      </cell>
      <cell title="Tab" is-link v-link="'component/tab'">
        <span class="demo-icon" slot="icon">&#xe615;</span>
      </cell>
      <cell title="Swiper" is-link v-link="'component/swiper'">
        <span class="demo-icon" slot="icon">&#xe612;</span>
      </cell>
      <cell title="Sticky" is-link v-link="'component/sticky'">
        <span class="demo-icon" slot="icon">&#xe623;</span>
      </cell>
      <cell title="Picker" is-link v-link="'component/picker'">
        <span class="demo-icon" slot="icon">&#xe627;</span>
      </cell>
      <cell title="Popup" is-link v-link="'component/popup'">
        <span class="demo-icon" slot="icon">&#xe61e;</span>
      </cell>
      <cell title="Popup Picker" is-link v-link="'component/popup-picker'">
        <span class="demo-icon" slot="icon">&#xe626;</span>
      </cell>
      <cell title="Actionsheet" is-link v-link="'component/actionsheet'">
        <span class="demo-icon" slot="icon">&#xe624;</span>
      </cell>
      <cell title="Clocker" is-link v-link="'component/clocker'">
        <span class="demo-icon" slot="icon">&#xe620;</span>
      </cell>
      <cell title="Toast" is-link v-link="'component/toast'">
        <span class="demo-icon" slot="icon">&#xe625;</span>
      </cell>
      <cell title="Loading" is-link v-link="'component/loading'">
        <span class="demo-icon" slot="icon">&#xe610;</span>
      </cell>
      <cell title="Alert" is-link v-link="'component/alert'">
        <span class="demo-icon" slot="icon">&#xe603;</span>
      </cell>
      <cell title="Confirm" is-link v-link="'component/confirm'">
        <span class="demo-icon" slot="icon">&#xe608;</span>
      </cell>
      <cell title="Progress" is-link v-link="'component/progress'">
        <span class="demo-icon" slot="icon">&#xe618;</span>
      </cell>
      <cell title="Search" is-link v-link="'component/search'">
        <span class="demo-icon" slot="icon">&#xe63b;</span>
      </cell>
      <cell title="Spinner" is-link v-link="'component/spinner'">
        <span class="demo-icon" slot="icon">&#xe610;</span>
      </cell>
      <cell title="Circle" is-link v-link="'component/circle'">
        <span class="demo-icon" slot="icon">&#xe63d;</span>
      </cell>
      <cell title="Countup" is-link v-link="'component/countup'">
        <span class="demo-icon" slot="icon">&#xe63e;</span>
      </cell>
      <cell title="Blur" is-link v-link="'component/blur'">
        <span class="demo-icon" slot="icon">&#xe640;</span>
      </cell>
      <cell title="Scroller" is-link v-link="'component/scroller'">
        <span class="demo-icon" slot="icon">&#xe641;</span>
      </cell>
      <cell title="Pulldown" is-link v-link="'component/pulldown'">
        <span class="demo-icon" slot="icon">&#xe64f;</span>
      </cell>
      <cell title="Pullup" is-link v-link="'component/pullup'">
        <span class="demo-icon" slot="icon">&#xe650;</span>
      </cell>
    </group>

    <group title="优化" title-color="#04be02">
      <cell title="X-img" value="延迟加载及webp切换支持" is-link v-link="'component/x-img'">
        <span class="demo-icon" slot="icon">&#xe602;</span>
      </cell>
      <cell title="1px" value="1px解决方案(FrozenUI)" is-link v-link="'component/1px'">
        <span class="demo-icon" slot="icon">&#xe621;</span>
      </cell>
      <cell title="Orientation" value="横竖屏切换提示" is-link v-link="'component/orientation'">
        <span class="demo-icon" slot="icon">&#xe628;</span>
      </cell>
      <cell title="Shake" value="摇一摇" is-link v-link="'component/shake'">
        <span class="demo-icon" slot="icon">&#xe629;</span>
      </cell>
      <cell title="Emotion" value="微信表情" is-link v-link="'component/emotion'">
        <span class="demo-icon" slot="icon">&#xe63c;</span>
      </cell>
      <cell title="Comment" value="评论" is-link v-link="'component/comment'">
        <span class="demo-icon" slot="icon">&#xe652;</span>
      </cell>
      <cell title="Masker" is-link v-link="'component/masker'">
        <span class="demo-icon" slot="icon">&#xe651;</span>
      </cell>
    </group>

    <group title="TODO" title-color="#04be02" v-if="showTodo">
      <cell title="短信验证组件" is-link v-link="'component/address'"></cell>
      <cell title="图片验证码" is-link v-link="'component/rater'"></cell>
      <cell title="Calendar" is-link v-link="'component/calendar'"></cell>
    </group>

    <group title="Demo" title-color="#04be02">
      <cell title="微信设置页面" is-link v-link="'demo/wechat'">
        <span class="demo-icon" slot="icon">&#xe600;</span>
      </cell>
      <cell title="小蚁摄像设置" is-link v-link="'demo/yi'">
        <span class="demo-icon" slot="icon">&#xe622;</span>
      </cell>
    </group>

    <group title="Todo" title-color="#04be02" style="display: none;">
      <cell title="Step" is-link v-link="'component/radio'">
        <span class="demo-icon" slot="icon">&#xe62c;</span>
      </cell>
    </group>

  </div>
</template>

<script>
import { Cell, Group } from '../components/'

/**
* fix firefox cell bottom border missing
*/

if (/firefox/i.test(navigator.userAgent)) {
  document.querySelector('body').classList.add('firefox')
}

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

.firefox .weui_cells:after {
  transform-origin: 50% 50%;
}
</style>

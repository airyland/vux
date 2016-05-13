<template>
  <div>
    <group title="Form" title-color="#04be02">
      <cell title="address" is-link v-link="'component/address'">
        <span class="demo-icon" slot="icon">&#xe61b;</span>
      </cell>
      <cell title="calendar" value="deprecated" is-link v-link="'component/calendar'">
        <span class="demo-icon" slot="icon">&#xe62b;</span>
      </cell>
      <cell title="cell" is-link v-link="'component/cell'">
        <span class="demo-icon" slot="icon">&#xe62a;</span>
      </cell>
      <cell title="checklist" is-link v-link="'component/checklist'">
        <span class="demo-icon" slot="icon">&#xe61d;</span>
      </cell>
      <cell title="checker" is-link v-link="'component/checker'">
        <span class="demo-icon" slot="icon">&#xe655;</span>
      </cell>
      <cell title="color-picker" is-link v-link="'component/color-picker'">
        <span class="demo-icon" slot="icon" style="color:#f2c400;">&#xe63f;</span>
      </cell>
      <cell title="datetime" is-link v-link="'component/datetime'">
        <span class="demo-icon" slot="icon">&#xe60a;</span>
      </cell>
      <cell title="inline-calendar" is-link v-link="'component/inline-calendar'">
        <span class="demo-icon" slot="icon">&#xe62b;</span>
      </cell>
      <cell title="radio" is-link v-link="'component/radio'">
        <span class="demo-icon" slot="icon">&#xe60f;</span>
      </cell>
      <cell title="range" is-link v-link="'component/range'">
        <span class="demo-icon" slot="icon">&#xe60b;</span>
      </cell>
      <cell title="rater" is-link v-link="'component/rater'">
        <span class="demo-icon" slot="icon">&#xe606;</span>
      </cell>
      <cell title="selector" is-link v-link="'component/selector'">
        <span class="demo-icon" slot="icon">&#xe607;</span>
      </cell>
      <cell title="switch" is-link v-link="'component/switch'">
        <span class="demo-icon" slot="icon">&#xe61c;</span>
      </cell>
      <cell title="x-button" is-link v-link="'component/button'">
        <span class="demo-icon" slot="icon">&#xe616;</span>
      </cell>
      <cell title="x-input" is-link v-link="'component/input'">
        <span class="demo-icon" slot="icon">&#xe614;</span>
      </cell>
      <cell title="x-textarea" is-link v-link="'component/textarea'">
        <span class="demo-icon" slot="icon">&#xe611;</span>
      </cell>
      <cell title="x-number" is-link v-link="'component/number'">
        <span class="demo-icon" slot="icon">&#xe605;</span>
      </cell>
    </group>

    <group title="UI" title-color="#04be02">
      <cell title="alert" is-link v-link="'component/alert'">
        <span class="demo-icon" slot="icon">&#xe603;</span>
      </cell>
      <cell title="actionsheet" is-link v-link="'component/actionsheet'">
        <span class="demo-icon" slot="icon">&#xe624;</span>
      </cell>
      <cell title="blur" is-link v-link="'component/blur'">
        <span class="demo-icon" slot="icon">&#xe640;</span>
      </cell>
      <cell title="button-tab" is-link v-link="'component/button-tab'">
        <span class="demo-icon" slot="icon" style="font-size: 15px;vertical-align: 6px;">&#xe659;</span>
      </cell>
      <cell title="circle" is-link v-link="'component/circle'">
        <span class="demo-icon" slot="icon">&#xe63d;</span>
      </cell>
      <cell title="countup" is-link v-link="'component/countup'">
        <span class="demo-icon" slot="icon">&#xe63e;</span>
      </cell>
      <cell title="countdown" is-link v-link="'component/countdown'">
        <span class="demo-icon" slot="icon">&#xe653;</span>
      </cell>
      <cell title="confirm" is-link v-link="'component/confirm'">
        <span class="demo-icon" slot="icon">&#xe608;</span>
      </cell>
      <cell title="clocker" is-link v-link="'component/clocker'">
        <span class="demo-icon" slot="icon">&#xe620;</span>
      </cell>
      <cell title="flexbox" is-link v-link="'component/flexbox'">
        <span class="demo-icon" slot="icon">&#xe61f;</span>
      </cell>
      <cell title="icon" is-link v-link="'component/icon'">
        <span class="demo-icon" slot="icon">&#xe619;</span>
      </cell>
      <cell title="loading" is-link v-link="'component/loading'">
        <span class="demo-icon" slot="icon">&#xe610;</span>
      </cell>
      <cell title="panel" is-link v-link="'component/panel'">
        <span class="demo-icon" slot="icon">&#xe658;</span>
      </cell>
      <cell title="picker" is-link v-link="'component/picker'">
        <span class="demo-icon" slot="icon">&#xe627;</span>
      </cell>
      <cell title="popup" is-link v-link="'component/popup'">
        <span class="demo-icon" slot="icon">&#xe61e;</span>
      </cell>
      <cell title="popup-picker" is-link v-link="'component/popup-picker'">
        <span class="demo-icon" slot="icon">&#xe626;</span>
      </cell>
      <cell title="progress" is-link v-link="'component/progress'">
        <span class="demo-icon" slot="icon">&#xe618;</span>
      </cell>
      <cell title="reddot" is-link v-link="'component/reddot'">
        <span class="demo-icon" slot="icon" style="color:#f74c31;">&#xe63f;</span>
      </cell>
      <cell title="swiper" is-link v-link="'component/swiper'">
        <span class="demo-icon" slot="icon">&#xe612;</span>
      </cell>
      <cell title="sticky" is-link v-link="'component/sticky'">
        <span class="demo-icon" slot="icon">&#xe623;</span>
      </cell>
      <cell title="search" is-link v-link="'component/search'">
        <span class="demo-icon" slot="icon">&#xe63b;</span>
      </cell>
      <cell title="spinner" is-link v-link="'component/spinner'">
        <span class="demo-icon" slot="icon">&#xe610;</span>
      </cell>
      <cell title="tab" is-link v-link="'component/tab'">
        <span class="demo-icon" slot="icon">&#xe615;</span>
      </cell>
      <cell title="tabbar" is-link v-link="'component/tabbar'">
        <span class="demo-icon" slot="icon">&#xe657;</span>
      </cell>
      <cell title="timeline" is-link v-link="'component/timeline'">
        <span class="demo-icon" slot="icon">&#xe656;</span>
      </cell>
      <cell title="toast" is-link v-link="'component/toast'">
        <span class="demo-icon" slot="icon">&#xe625;</span>
      </cell>
      <cell title="x-header" is-link v-link="'component/x-header'">
        <span class="demo-icon" slot="icon">&#xe654;</span>
      </cell>
    </group>

    <group title="Scroller" title-color="#04be02">
      <cell title="pulldown" is-link v-link="'component/pulldown'">
        <span class="demo-icon" slot="icon">&#xe64f;</span>
      </cell>
      <cell title="pullup" is-link v-link="'component/pullup'">
        <span class="demo-icon" slot="icon">&#xe650;</span>
      </cell>
      <cell title="scroller" is-link v-link="'component/scroller'">
        <span class="demo-icon" slot="icon">&#xe641;</span>
      </cell>
      <cell title="multi full-height scroller" is-link v-link="'component/scroller/full'">
        <span class="demo-icon" slot="icon">&#xe641;</span>
      </cell>
      <cell title="Swiper within Scroller" is-link v-link="'component/scroller-swiper'">
        <span class="demo-icon" slot="icon">&#xe641;</span>
      </cell>
    </group>

    <group title="Other" title-color="#04be02">
      <cell title="comment" value="评论" is-link v-link="'component/comment'">
        <span class="demo-icon" slot="icon">&#xe652;</span>
      </cell>
      <cell title="emotion" value="微信表情" is-link v-link="'component/emotion'">
        <span class="demo-icon" slot="icon">&#xe63c;</span>
      </cell>
      <cell title="masker" is-link v-link="'component/masker'">
        <span class="demo-icon" slot="icon">&#xe651;</span>
      </cell>
      <cell title="orientation" value="横竖屏切换提示" is-link v-link="'component/orientation'">
        <span class="demo-icon" slot="icon">&#xe628;</span>
      </cell>
      <cell title="shake" value="摇一摇" is-link v-link="'component/shake'">
        <span class="demo-icon" slot="icon">&#xe629;</span>
      </cell>
      <cell title="x-img" value="延迟加载及webp切换支持" is-link v-link="'component/x-img'">
        <span class="demo-icon" slot="icon">&#xe602;</span>
      </cell>
      <cell title="1px" value="1px解决方案(FrozenUI)" is-link v-link="'component/1px'">
        <span class="demo-icon" slot="icon">&#xe621;</span>
      </cell>
      <cell title="qrcode" is-link v-link="'component/qrcode'">
        <span class="demo-icon" slot="icon">&#xe65a;</span>
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

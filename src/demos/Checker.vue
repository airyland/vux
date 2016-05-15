<template>
  <div style="padding: 15px 0;">
    <divider>no default value</divider>
    <checker :value.sync="demo1" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
      <checker-item value="1">1</checker-item>
      <checker-item value="2">2</checker-item>
      <checker-item value="3">3</checker-item>
    </checker>
    <br>
    <span>current value is: {{demo1}}</span>
    <br>
    <divider>default value 2</divider>
    <checker :value.sync="demo2" default-item-class="demo2-item" selected-item-class="demo2-item-selected">
      <checker-item value="1">1</checker-item>
      <checker-item value="2">2</checker-item>
      <checker-item value="3">3</checker-item>
    </checker>
    <br>
    <span>current value is: {{demo2}}</span>
    <br>
    <divider>custom anything</divider>
    <checker :value.sync="demo3" default-item-class="demo3-item" selected-item-class="demo3-item-selected">
      <checker-item value="one">
        <img src="http://placeholder.qiniudn.com/80x50/FF3B3B/ffffff" alt="">
      </checker-item>
      <checker-item value="two">
        <img src="http://placeholder.qiniudn.com/80x50/FFEF7D/ffffff" alt="">
      </checker-item>
      <checker-item value="three">
        <img src="http://placeholder.qiniudn.com/80x50/8AEEB1/ffffff" alt="">
      </checker-item>
    </checker>
    <br>
    <span>current value is: {{demo3}}</span>
    <br>
    <divider>used in a popup</divider>
    <group>
      <cell title="select color" :value="demo4" is-link @click="showPopup=true"></cell>
    </group>
    <popup :show.sync="showPopup" class="checker-popup">
      <div style="padding:10px 10px 40px 10px;">
        <p style="padding: 5px 5px 5px 2px;color:#888;">Colors</p>
        <checker
        :value.sync="demo4"
        default-item-class="demo4-item"
        selected-item-class="demo4-item-selected"
        disabled-item-class="demo4-item-disabled"
        @on-item-click="showPopup=false">
          <checker-item value="花跟叶">花跟叶</checker-item>
          <checker-item value="鸟与树">鸟与树</checker-item>
          <checker-item value="我和你">我和你</checker-item>
          <checker-item value="全套礼品装" disabled>全套礼品装</checker-item>
        </checker>
      </div>
    </popup>

    <divider>A real world example {{demo5}}</divider>
    <checker
    :value.sync="demo5"
    default-item-class="demo5-item"
    selected-item-class="demo5-item-selected"
    >
      <checker-item v-for="i in [1, 2, 3]" :value="i">￥{{i*300}}</checker-item>
    </checker>
  </div>
</template>

<script>
import { Checker, CheckerItem, Divider, Group, Cell, Popup } from '../components'

export default {
  components: {
    Checker,
    CheckerItem,
    Divider,
    Group,
    Cell,
    Popup
  },
  data () {
    return {
      demo1: '',
      demo2: '2',
      demo3: '',
      demo4: '花跟叶',
      showPopup: false,
      demo5: 1
    }
  }
}
</script>

<style scoped>
.checker-popup {
  background: rgba(255,255,255,0.5);
}
.demo1-item {
  border: 1px solid #ececec;
  padding: 5px 15px;
}
.demo1-item-selected {
  border: 1px solid green;
}
.demo2-item {
  width: 40px;
  height: 40px;
  border: 1px solid #ccc;
  display: inline-block;
  border-radius: 50%;
  line-height: 40px;
  text-align: center;
}
.demo2-item-selected {
  border-color: green;
}
.demo3-item {
  padding: 5px 5px;
  font-size: 0;
}
.demo3-item-selected {
  outline: 1px solid #8B8AEE;
}
.demo4-item {
  background-color: #ddd;
  color: #222;
  font-size: 14px;
  padding: 5px 10px;
  margin-right: 10px;
  line-height: 18px;
  border-radius: 15px;
}
.demo4-item-selected {
  background-color: #FF3B3B;
  color: #fff;
}
.demo4-item-disabled {
  color: #999;
}
.demo5-item {
  width: 100px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin-right: 6px;
}
.demo5-item-selected {
  background: #ffffff url(../assets/demo/checker/active.png) no-repeat right bottom;
  border-color: #ff4a00;
}
</style>
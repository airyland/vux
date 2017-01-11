---
nav: zh-CN
---


### Checker_COM

<img width="100" src="http://qr.topscan.com/api.php?text=https%3A%2F%2Fvux.li%2Fdemos%2Fv2%2F%23%2Fcomponent%2Fchecker"/>

#### Demo

 <div style="width:377px;height:667px;display:inline-block;border:1px dashed #ececec;border-radius:5px;overflow:hidden;">
   <iframe src="https://vux.li/demos/v2/#/component/checker" width="375" height="667" border="0" frameborder="0"></iframe>
 </div>

#### demo 代码

<p class="tip">下面的$t是Demo的i18n使用的翻译函数，一般情况下可以直接使用字符串。另外，下面代码隐藏了i18n标签部分的代码。</p>

``` html
<template>
  <div style="padding: 15px 0;">
    <divider>{{ $t('radio:no default value') }}</divider>
    <div class="box">
      <checker v-model="demo1" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
      <checker-item value="1">{{ $t('潘') }}</checker-item>
      <checker-item value="2">{{ $t('闲') }}</checker-item>
      <checker-item value="3">{{ $t('邓') }}</checker-item>
      <checker-item value="4">{{ $t('小') }}</checker-item>
      <checker-item value="5">{{ $t('驴') }}</checker-item>
      </checker>
      <br>
      <span>{{ $t('current value is') }}: {{demo1}}</span>
      <br>
    </div>

    <divider>{{ $t('radio: object value') }}</divider>
    <div class="box">
      <checker v-model="demo11" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
        <checker-item :value="item" v-for="item in items1">{{item.value}}</checker-item>
      </checker>
      <br>
      <span>{{ $t('current value is') }}: {{demo11}}</span>
      <br>
      <br>
      <checker v-model="demo12" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
        <checker-item :value="item" v-for="item in items1">{{item.value}}</checker-item>
      </checker>
      <br>
      <span>{{ $t('current value is') }}: {{demo12}}</span>
      <br>
    </div>

    <divider>{{ $t('checkbox: object value') }}</divider>
    <div class="box">
      <checker v-model="demo21" type="checkbox" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
        <checker-item :value="item" v-for="item in items1">{{item.value}}</checker-item>
      </checker>
      <br>
      <span>{{ $t('current value is') }}: {{demo21}}</span>
      <br>
      <br>
      <checker v-model="demo22" type="checkbox" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
        <checker-item :value="item" v-for="item in items1">{{item.value}}</checker-item>
      </checker>
      <br>
      <span>{{ $t('current value is') }}: {{demo22}}</span>
       <br>
      <br>
      <checker v-model="demo23" type="checkbox" default-item-class="demo1-item" selected-item-class="demo1-item-selected" :max="2">
        <checker-item :value="item" v-for="item in items1">{{item.value}}</checker-item>
      </checker>
      <br>
      <span>{{ $t('current value is') }}: {{demo23}}</span>
      <br>
    </div>

    
    <divider>{{ $t('checkbox') }}</divider>
    <div class="box">
       <checker v-model="demo1Checkbox" type="checkbox" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
        <checker-item :value="1">{{ $t('白') }}</checker-item>
        <checker-item :value="2">{{ $t('富') }}</checker-item>
        <checker-item :value="3">{{ $t('美') }}</checker-item>
      </checker>
      <br>
      <span>{{ $t('current value is') }}: {{demo1Checkbox}}</span>
      <br>
    </div>
   
    <divider>{{ $t('checkbox with max limit 2') }}</divider>
    <div class="box">
      <checker v-model="demo1CheckboxMax" :max="2" type="checkbox" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
        <checker-item value="1">1</checker-item>
        <checker-item value="2">2</checker-item>
        <checker-item value="3">3</checker-item>
      </checker>
      <br>
      <span>{{ $t('current value is') }}: {{demo1CheckboxMax}}</span>
      <br>
    </div>
    
    <divider>{{ $t('default value 2') }}</divider>
    <div class="box">
      <checker v-model="demo2" default-item-class="demo2-item" selected-item-class="demo2-item-selected">
        <checker-item value="1">1</checker-item>
        <checker-item value="2">2</checker-item>
        <checker-item value="3">3</checker-item>
      </checker>
      <br>
      <span>{{ $t('current value is') }}: {{demo2}}</span>
      <br>
    </div>
    
    <divider>{{ $t('custom styles') }}</divider>
    <div class="box">
       <checker v-model="demo3" default-item-class="demo3-item" selected-item-class="demo3-item-selected">
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
      <span>{{ $t('current value is') }}: {{demo3}}</span>
      <br>
    </div>
   
    <divider>{{ $t('used in a popup') }}</divider>
    <group>
      <cell :title="$t('select color')" :value="demo4" is-link @click.native="showPopup=true"></cell>
    </group>
    <popup v-model="showPopup" class="checker-popup">
      <div style="padding:10px 10px 40px 10px;">
        <p style="padding: 5px 5px 5px 2px;color:#888;">Colors</p>
        <checker
        v-model="demo4"
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

    <divider>{{ $t('A real world radio example') }} {{demo5}}</divider>
    <checker
    v-model="demo5"
    default-item-class="demo5-item"
    selected-item-class="demo5-item-selected"
    >
      <checker-item v-for="i in [1, 2, 3]" :value="i">￥{{i*300}}</checker-item>
    </checker>
    <br/>
    <divider>{{ $t('A real world checkbox example') }} {{demo6}}</divider>
    <checker
    v-model="demo6"
    type="checkbox"
    default-item-class="demo5-item"
    selected-item-class="demo5-item-selected"
    >
      <checker-item v-for="i in [1, 2, 3]" :value="i">{{[$t('good'), $t('nice'),$t('awesome')][i - 1]}}</checker-item>
    </checker>
  </div>
</template>



<script>
import { Checker, CheckerItem, Divider, Group, Cell, Popup } from 'vux'

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
      items1: [{
        key: '1',
        value: 'A'
      }, {
        key: '2',
        value: 'B'
      }, {
        key: '3',
        value: 'C'
      }],
      demo1: '',
      demo11: null,
      demo12: {key: '2', value: 'B'},
      demo21: null,
      demo22: [{key: '2', value: 'B'}],
      demo23: null,
      demo1Checkbox: [2, 1],
      demo1CheckboxMax: ['2', '3'],
      demo2: '2',
      demo3: '',
      demo4: '花跟叶',
      showPopup: false,
      demo5: 1,
      demo6: [2, 3]
    }
  }
}
</script>

<style scoped>
.box {
  padding: 0 15px;
}
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
```
#### 文档

#### Github Issue
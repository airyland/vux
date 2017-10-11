<template>
  <div style="padding: 15px 0;">
    <divider>{{ $t('Radio: no default value') }}</divider>
    <div class="box">
      <checker v-model="demo1" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
      <checker-item value="1">{{ $t('潘') }}</checker-item>
      <checker-item value="2">{{ $t('闲') }}</checker-item>
      <checker-item value="3">{{ $t('邓') }}</checker-item>
      <checker-item value="4">{{ $t('小') }}</checker-item>
      <checker-item value="5">{{ $t('驴') }}</checker-item>
      </checker>
      <br>
      <span>{{ $t('Current value is') }}: {{ demo1 }}</span>
      <br>
    </div>

    <divider>{{ $t('radioRequired') }}</divider>
    <div class="box">
      <checker v-model="demo1Required" radio-required default-item-class="demo1-item" selected-item-class="demo1-item-selected">
      <checker-item value="1">{{ $t('潘') }}</checker-item>
      <checker-item value="2">{{ $t('闲') }}</checker-item>
      <checker-item value="3">{{ $t('邓') }}</checker-item>
      <checker-item value="4">{{ $t('小') }}</checker-item>
      <checker-item value="5">{{ $t('驴') }}</checker-item>
      </checker>
      <br>
      <span>{{ $t('Current value is') }}: {{ demo1Required }}</span>
      <br>
    </div>

    <divider>{{ $t('Radio: object value') }}</divider>
    <div class="box">
      <checker v-model="demo11" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
        <checker-item :value="item" v-for="(item, index) in items1" :key="index">{{item.value}}</checker-item>
      </checker>
      <br>
      <span>{{ $t('Current value is') }}: {{demo11}}</span>
      <br>
      <br>
      <checker v-model="demo12" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
        <checker-item :value="item" v-for="(item, index) in items1" :key="index">{{item.value}}</checker-item>
      </checker>
      <br>
      <span>{{ $t('Current value is') }}: {{demo12}}</span>
      <br>
    </div>

    <divider>{{ $t('Checkbox: object value') }}</divider>
    <div class="box">
      <checker v-model="demo21" type="checkbox" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
        <checker-item :value="item" v-for="(item, index) in items1" :key="index">{{item.value}}</checker-item>
      </checker>
      <br>
      <span>{{ $t('Current value is') }}: {{demo21}}</span>
      <br>
      <br>
      <checker v-model="demo22" type="checkbox" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
        <checker-item :value="item" v-for="(item, index) in items1" :key="index">{{item.value}}</checker-item>
      </checker>
      <br>
      <span>{{ $t('Current value is') }}: {{demo22}}</span>
       <br>
      <br>
      <checker v-model="demo23" type="checkbox" default-item-class="demo1-item" selected-item-class="demo1-item-selected" :max="2">
        <checker-item :value="item" v-for="(item, index) in items1" :key="index">{{item.value}}</checker-item>
      </checker>
      <br>
      <span>{{ $t('Current value is') }}: {{demo23}}</span>
      <br>
    </div>


    <divider>{{ $t('Checkbox') }}</divider>
    <div class="box">
       <checker v-model="demo1Checkbox" type="checkbox" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
        <checker-item :value="1">{{ $t('白') }}</checker-item>
        <checker-item :value="2">{{ $t('富') }}</checker-item>
        <checker-item :value="3">{{ $t('美') }}</checker-item>
      </checker>
      <br>
      <span>{{ $t('Current value is') }}: {{demo1Checkbox}}</span>
      <br>
    </div>

    <divider>{{ $t('Checkbox with max limit 2') }}</divider>
    <div class="box">
      <checker v-model="demo1CheckboxMax" :max="2" type="checkbox" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
        <checker-item value="1">1</checker-item>
        <checker-item value="2">2</checker-item>
        <checker-item value="3">3</checker-item>
      </checker>
      <br>
      <span>{{ $t('Current value is') }}: {{demo1CheckboxMax}}</span>
      <br>
    </div>

    <divider>{{ $t('Default value 2') }}</divider>
    <div class="box">
      <checker v-model="demo2" default-item-class="demo2-item" selected-item-class="demo2-item-selected">
        <checker-item value="1">1</checker-item>
        <checker-item value="2">2</checker-item>
        <checker-item value="3">3</checker-item>
      </checker>
      <br>
      <span>{{ $t('Current value is') }}: {{demo2}}</span>
      <br>
    </div>

    <divider>{{ $t('Custom styles') }}</divider>
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
      <span>{{ $t('Current value is') }}: {{demo3}}</span>
      <br>
    </div>

    <divider>{{ $t('Used in a popup') }}</divider>
    <group>
      <cell :title="$t('Select color')" :value="demo4" is-link @click.native="showPopup=true"></cell>
    </group>
    <div v-transfer-dom>
      <popup v-model="showPopup" class="checker-popup">
        <div style="padding:10px 10px 40px 10px;">
          <p style="padding: 5px 5px 5px 2px;color:#888;">Colors</p>
          <checker
          v-model="demo4"
          default-item-class="demo4-item"
          selected-item-class="demo4-item-selected"
          disabled-item-class="demo4-item-disabled">
            <checker-item :value="$t('花跟叶')" @on-item-click="onItemClick"> {{ $t('花跟叶') }} </checker-item>
            <checker-item :value="$t('鸟与树')" @on-item-click="onItemClick"> {{ $t('鸟与树') }} </checker-item>
            <checker-item :value="$t('我和你')" @on-item-click="onItemClick"> {{ $t('我和你') }} </checker-item>
            <checker-item :value="$t('全套礼品装')" disabled @on-item-click="onItemClick"> {{ $t('全套礼品装') }} </checker-item>
          </checker>
        </div>
      </popup>
    </div>

    <divider>{{ $t('A real world radio example') }} {{demo5}}</divider>
    <checker
    v-model="demo5"
    default-item-class="demo5-item"
    selected-item-class="demo5-item-selected"
    >
      <checker-item v-for="i in [1, 2, 3]" :key="i" :value="i">￥{{i*300}}</checker-item>
    </checker>
    <br/>
    <divider>{{ $t('A real world checkbox example') }} {{demo6}}</divider>
    <checker
    v-model="demo6"
    type="checkbox"
    default-item-class="demo5-item"
    selected-item-class="demo5-item-selected"
    >
      <checker-item v-for="i in [1, 2, 3]" :key="i" :value="i">{{[$t('good'), $t('nice'),$t('awesome')][i - 1]}}</checker-item>
    </checker>
  </div>
</template>

<i18n>
'Radio: no default value':
  zh-CN: 单选，默认不选中任何项
潘:
  en: A
闲:
  en: B
邓:
  en: C
小:
  en: D
驴:
  en: E
白:
  en: White
富:
  en: Rich
美:
  en: Beautiful
花跟叶:
  en: Red
鸟与树:
  en: Blue
我和你:
  en: Green
全套礼品装:
  en: Yellow
Checkbox:
  zh-CN: 多选
Checkbox with max limit 2:
  zh-CN: 多选，最多只能选2个
Current value is:
  zh-CN: 当前值为
Default value 2:
  zh-CN: 默认值 2
Custom styles:
  zh-CN: 自定义样式
Select color:
  zh-CN: 选择颜色
Used in a popup:
  zh-CN: Popup 组件中使用
A real world radio example:
  zh-CN: 单选常见例子
A real world checkbox example:
  zh-CN: 多选常见例子
good:
  zh-CN: 好
nice:
  zh-CN: 很好
awesome:
  zh-CN: 特别好
'Radio: object value':
  zh-CN: 单选：object类型
'Checkbox: object value':
  zh-CN: 多选：object类型
</i18n>

<script>
import { Checker, CheckerItem, Divider, Group, Cell, Popup, TransferDom } from 'vux'

export default {
  directives: {
    TransferDom
  },
  components: {
    Checker,
    CheckerItem,
    Divider,
    Group,
    Cell,
    Popup
  },
  methods: {
    onItemClick (value, disabled) {
      console.log(value, disabled)
      if (!this.disabled) {
        this.showPopup = false
      }
    }
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
      demo1Required: '',
      demo11: null,
      demo12: {key: '2', value: 'B'},
      demo21: null,
      demo22: [{key: '2', value: 'B'}],
      demo23: null,
      demo1Checkbox: [2, 1],
      demo1CheckboxMax: ['2', '3'],
      demo2: '2',
      demo3: '',
      demo4: this.$t('花跟叶'),
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

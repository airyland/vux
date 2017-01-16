---
nav: zh-CN
---


### Datetime_COM

<img width="100" src="http://qr.topscan.com/api.php?text=http%3A%2F%2Fvux.li%2Fdemos%2Fv2%2F%23%2Fcomponent%2Fdatetime"/>

#### Demo

 <div style="width:377px;height:667px;display:inline-block;border:1px dashed #ececec;border-radius:5px;overflow:hidden;">
   <iframe src="http://vux.li/demos/v2/#/component/datetime" width="375" height="667" border="0" frameborder="0"></iframe>
 </div>

#### demo 代码

<p class="tip">下面的$t是Demo的i18n使用的翻译函数，一般情况下可以直接使用字符串。另外，下面代码隐藏了i18n标签部分的代码。</p>

``` html
<template>
  <div>
    <group :title="$t('default format: YYYY-MM-DD')">
      <datetime v-model="value1" @on-change="change" :title="$t('Birthday')"></datetime>
    </group>

    <p class="center" @click="value1 = '2017-11-11'">{{ $t('click to change value to: 2017-11-11') }}</p>

    <group :title="$t('format: YYYY-MM-DD HH:mm')">
      <datetime v-model="value2" format="YYYY-MM-DD HH:mm" @on-change="change" :title="$t('start time')"></datetime>
    </group>

    <group :title="$t('Placeholder')">
      <datetime v-model="value3" format="YYYY-MM-DD" :placeholder="$t('Please select')" @on-change="change" :title="$t('start time')"></datetime>
    </group>

    <group :title="$t('set min-year and max-year')">
      <datetime v-model="value4" :placeholder="$t('Please select')" :min-year=2000 :max-year=2016 format="YYYY-MM-DD HH:mm" @on-change="change" :title="$t('years after 2000')"></datetime>
    </group>

    <group :title="$t('specified template text in Chinese')">
      <datetime v-model="value5" :placeholder="$t('Please select')" :min-year=2000 :max-year=2016 format="YYYY-MM-DD HH:mm" @on-change="change" :title="$t('Chinese')" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分" confirm-text="完成" cancel-text="取消"></datetime>
    </group>

    <group :title="$t('show center button and clear the value')">
      <datetime v-model="value6" @on-change="change" :title="$t('Birthday')" clear-text="clear" @on-clear="clearValue"></datetime>
    </group>

    <group :title="$t('show center button to set date to today')">
      <datetime v-model="value7" @on-change="change" :title="$t('Birthday')" clear-text="today" @on-clear="setToday"></datetime>
    </group>

     <group :title="$t('custom trigger slot')">
      <datetime v-model="value7" @on-change="change" :title="$t('Birthday')" clear-text="today" @on-clear="setToday">
        <x-button>{{$t('Click me')}}</x-button>
      </datetime>
    </group>
  </div>
</template>



<script>
import { Datetime, Group, XButton } from 'vux'

export default {
  components: {
    Datetime,
    Group,
    XButton
  },
  data () {
    return {
      value1: '2016-02-11',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      value6: '2016-08-18',
      value7: ''
    }
  },
  methods: {
    change (value) {
      console.log('change', value)
    },
    clearValue (value) {
      this.$data.value6 = ''
    },
    setToday (value) {
      let now = new Date()
      let cmonth = now.getMonth() + 1
      let day = now.getDate()
      if (cmonth < 10) cmonth = '0' + cmonth
      if (day < 10) day = '0' + day
      this.$data.value7 = now.getFullYear() + '-' + cmonth + '-' + day
      console.log('set today ok')
    }
  }
}
</script>

<style scoped lang="less">
.center {
  padding-top: 10px;
  padding-left: 15px;
  color: green;
}
</style>

```
#### 文档

#### Github Issue
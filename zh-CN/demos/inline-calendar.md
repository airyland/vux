---
nav: zh-CN
---


### InlineCalendar_COM

<img width="100" src="http://qr.topscan.com/api.php?text=https%3A%2F%2Fvux.li%2Fdemos%2Fv2%2F%23%2Fcomponent%2Finline-calendar"/>

#### Demo

 <div style="width:377px;height:667px;display:inline-block;border:1px dashed #ececec;border-radius:5px;overflow:hidden;">
   <iframe src="https://vux.li/demos/v2/#/component/inline-calendar" width="375" height="667" border="0" frameborder="0"></iframe>
 </div>

#### demo 代码

<p class="tip">下面的$t是Demo的i18n使用的翻译函数，一般情况下可以直接使用字符串。另外，下面代码隐藏了i18n标签部分的代码。</p>

``` html
<template>
<div>
  <inline-calendar
  class="inline-calendar-demo"
  :show.sync="show"
  v-model="value"
  start-date="2016-04-01"
  end-date="2017-06-18"
  :range="range"
  :show-last-month="showLastMonth"
  :show-next-month="showNextMonth"
  :highlight-weekend="highlightWeekend"
  :return-six-rows="return6Rows"
  :hide-header="hideHeader"
  :hide-week-list="hideWeekList"
  :replace-text-list="replaceTextList"
  :weeks-list="weeksList"
  :render-function="buildSlotFn"
  :disable-past="disablePast"
  :disable-future="disableFuture">
  </inline-calendar>

  <group>
    <cell title="current value" :value="value"></cell>
  </group>

  <group title="control days" style="margin-top: 30px;">
    <x-switch v-model="disablePast" title="Disable Past"></x-switch>
    <x-switch v-model="disableFuture" title="Disable Future"></x-switch>
    <x-switch v-model="showLastMonth" title="Show Last Month"></x-switch>
    <x-switch v-model="showNextMonth" title="Show Next Month"></x-switch>
    <x-switch v-model="return6Rows" inline-desc="if not, the calendar's height would change" title="Always show 6 rows"></x-switch>
    <x-switch v-model="highlightWeekend" title="highlight weekend"></x-switch>
    <cell title="current value" :value="value"></cell>
  </group>
  <group title="control navs">
    <x-switch v-model="hideHeader" title="Hide header"></x-switch>
    <x-switch v-model="hideWeekList" title="Hide week list"></x-switch>
    <x-switch v-model="changeWeeksList" title="Change weeks list"></x-switch>
  </group>
  <group title="replace text">
    <x-switch v-model="replace" title="Replace date text"></x-switch>
  </group>
  <br>
  <div style="margin: 15px;">
    <x-button type="primary" @click.native="value='2020-11-11'">Set time to 2020-11-11</x-button>
    <x-button type="primary" @click.native="value='2020-11-22'">Set time to 2020-11-22</x-button>
    <x-button type="primary" @click.native="value='2016-08-09'">Set time to 2016-08-09</x-button>
    <x-button type="primary" @click.native="value='TODAY'">Set time to today</x-button>
    <x-button type="primary" @click.native="value='2016-06-05'">Set time to 2016-06-05</x-button>
  </div>
  <br>
  <group title="custom every day cell">
    <x-switch v-model="useCustomFn" inline-desc="Add red dot for dates with 8" title="add custom contents in day cell"></x-switch>
  </group>

  <br>

  <divider>We can render a list of calendars order by month</divider>
  <group>
    <cell title="current value" :value="listValue"></cell>
  </group>
  <br>
  <div v-for="i in 5" v-if="i >= 1">
    <divider>2016 / {{i}}</divider>
    <inline-calendar
    :render-month="[2016, i]"
    hide-header
    :return-six-rows="false"
    v-model="listValue"
    :show-last-month="false"
    :show-next-month="false"
    :render-on-value-change="false"></inline-calendar>
  </div>
</div>
</template>

<script>
import { InlineCalendar, Group, XSwitch, Radio, XButton, Cell, Divider } from 'vux'

module.exports = {
  data () {
    return {
      show: true,
      value: '',
      listValue: '',
      range: false,
      showLastMonth: true,
      showNextMonth: true,
      highlightWeekend: false,
      return6Rows: true,
      hideHeader: false,
      hideWeekList: false,
      replaceTextList: {},
      replace: false,
      changeWeeksList: false,
      weeksList: [],
      useCustomFn: false,
      buildSlotFn: () => '',
      disablePast: false,
      disableFuture: false
    }
  },
  watch: {
    replace (val) {
      this.replaceTextList = val ? {
        'TODAY': '今'
      } : {}
    },
    useCustomFn (val) {
      this.buildSlotFn = val ? (line, index, data) => {
        return /8/.test(data.day) ? '<div style="font-size:12px;text-align:center;"><span style="display:inline-block;width:5px;height:5px;background-color:red;border-radius:50%;"></span></div>' : ''
      } : () => ''
    },
    changeWeeksList (val) {
      this.weeksList = val ? ['日', '一', '二', '三', '四', '五', '六 '] : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    }
  },
  components: {
    InlineCalendar,
    Group,
    XSwitch,
    Radio,
    XButton,
    Cell,
    Divider
  }
}
</script>

<style lang="less" scoped>
.inline-calendar-demo {
  background: rgba(255,255,255,0.9);
}
</style>

```
#### 文档

#### Github Issue
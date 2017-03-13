<template>
  <div>
    <group :title="$t('default format: YYYY-MM-DD')">
      <datetime v-model="value1" @on-change="change" :title="$t('Birthday')"></datetime>
    </group>

     <group :title="$t('format display value')">
      <datetime v-model="formatValue" :display-format="formatValueFunction" @on-change="change" :title="$t('Birthday')"></datetime>
    </group>

    <p class="center" @click="value1 = '2017-11-11'">{{ $t('click to change value to: 2017-11-11') }}</p>
    
    <group :title="$t('Limit hours')">
      <datetime v-model="limitHourValue" format="YYYY-MM-DD HH:mm" :min-hour=9 :max-hour=18 @on-change="change" :title="$t('Limit hours')" :inline-desc="$t('09-18')"></datetime>
    </group>

    <group :title="$t('set start-date and end-date') + ' 2015-11-11 ~ 2017-10-11'">
      <datetime v-model="limitHourValue" :start-date="startDate" :end-date="endDate" format="YYYY-MM-DD HH:mm" @on-change="change" :title="$t('start time')"></datetime>
    </group>

    <div style="padding:15px;">
      <x-button @click.native="reRender" type="primary">2016-11-11 ~ 2018-10-11</x-button>
    </div>

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
    <group :title="$t('required')">
      <datetime v-model="value8" :title="$t('Required')" clear-text="clear" @on-clear="clearValue8" :required="true"></datetime>
    </group>
  </div>
</template>

<i18n>
'default format: YYYY-MM-DD':
  zh-CN: 默认格式：YYYY-MM-DD
'format: YYYY-MM-DD HH:mm':
  zh-CN: 格式：YYYY-MM-DD HH:mm
start time:
  zh-CN: 开始时间
Placeholder:
  zh-CN: 提示文字
Please select:
  zh-CN: 请选择
set min-year and max-year:
  zh-CN: 设置开始和结束年份
years after 2000:
  zh-CN: 2000年以后时间
specified template text in Chinese:
  zh-CN: 自定义中文显示模板
show center button and clear the value:
  zh-CN: 显示中间的清除按钮
show center button to set date to today:
  zh-CN: 显示中间的设置日期为今天的按钮
Birthday:
  zh-CN: 生日
Chinese:
  zh-CN: 中文
Click me:
  zh-CN: 点我
custom trigger slot:
  zh-CN: 自定义触发内容
Limit hours:
  zh-CN: 限定小时范围
09-18:
  zh-CN: 工作时间 09-18
set start-date and end-date:
  zh-CN: 设置开始时间和结束日期
'click to change value to: 2017-11-11':
  zh-CN: 设置时间为 2017-11-11
format display value:
  zh-CN: 格式化显示
</i18n>

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
      value1: '2015-11-12',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      value6: '2016-08-18',
      value7: '',
      value8: '',
      limitHourValue: '',
      startDate: '2015-11-11',
      endDate: '2017-10-11',
      formatValue: '2017-10-11',
      formatValueFunction (val) {
        return val.replace(/-/g, '$')
      }
    }
  },
  methods: {
    reRender () {
      this.startDate = '2016-11-11'
      this.endDate = '2018-10-11'
    },
    change (value) {
      console.log('change', value)
    },
    clearValue (value) {
      this.$data.value6 = ''
    },
    clearValue8 (value) {
      this.$data.value8 = ''
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

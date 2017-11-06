<template>
  <div>
    <checklist :title="$t('Basic Usage')" :label-position="labelPosition" required :options="commonList" v-model="checklist001" @on-change="change"></checklist>
    <div style="padding:15px;">
      <x-button @click.native="labelPosition = labelPosition === 'left' ? '' : 'left'" type="primary"> {{ $t('Switch the position of labels') }} </x-button>
      <x-button @click.native="selectFirst" type="primary"> {{ $t('Select first option') }} </x-button>
      <x-button @click.native="selectFirstTwo" type="primary"> {{ $t('Select first two') }} </x-button>
      <x-button @click.native="selectLeft" type="primary"> {{ $t('Select the remaining values') }}</x-button>
    </div>

    <checklist :title="$t('Preselect China and Japan (disabled)')" disabled label-position="left" :options="commonList" v-model="checklist002" @on-change="change"></checklist>

    <checklist :title="$t('Set max=2')" :options="commonList" v-model="checklist003" :max=2 @on-change="change"></checklist>

    <checklist :title="$t('Set max=1 (radio mode)')" :options="commonList" v-model="radioValue" :max="1" @on-change="change"></checklist>

    <checklist :title="$t('Set random order')" random-order :options="checklist005" v-model="checklist005Value" @on-change="change"></checklist>

    <checklist ref="demoObject" :title="$t('Option Array with key and value (key must be string)')" :options="objectList" v-model="objectListValue" @on-change="change"></checklist>
    <group>
      <cell-box>{{ fullValues }}</cell-box>
    </group>
    <div style="padding:15px;">
      <x-button type="primary" @click.native="fullValues = $refs.demoObject.getFullValue()">getFullValue()</x-button>
    </div>

    <checklist :title="$t('Option is Object with InlineDesc')" :options="inlineDescList" v-model="inlineDescListValue" @on-change="change"></checklist>

    <checklist :title="$t('Async list')" :max="3" :options="asyncList" v-model="asyncListValue" @on-change="change"></checklist>

    <divider> {{ $t('Reference')}} </divider>
    <group :title="$t('See also')">
      <cell title="Checker" is-link link="/component/checker"></cell>
    </group>
  </div>
</template>

<i18n>
Switch the position of labels:
  zh-CN: 切换 label 位置
Select first option:
  zh-CN: 选择第1个值
Select first two:
  zh-CN: 选择前两个值
Select the remaining values:
  zh-CN: 选择剩下值
Preselect China and Japan (disabled):
  zh-CN: 默认选中 China 和 Japan (禁用操作)
Set max=2:
  zh-CN: 最多可选中2个
Set random order:
  zh-CN: 打乱选项顺序
'Option Array with key and value (key must be string)':
  zh-CN: 使用 Object 类型的选项列表，key 必须为字符串
Option is Object with InlineDesc:
  zh-CN: 包含 inlineDesc 属性的 Object 类型选项列表
Async list:
  zh-CN: 异步选项列表
Set max=1 (radio mode):
  zh-CN: max=1（单选模式）
Reference:
  zh-CN: 相关
See also:
  zh-CN: 参见
</i18n>

<script>
import { Group, CellBox, Checklist, Cell, Divider, XButton } from 'vux'
import _ from 'lodash'

export default {
  mounted () {
    setTimeout(() => {
      this.asyncList = ['A', 'B', 'C', 'D']
    }, 3000)
  },
  components: {
    Group,
    Checklist,
    Cell,
    Divider,
    XButton,
    CellBox
  },
  methods: {
    change (val, label) {
      console.log('change', val, label)
    },
    selectFirst () {
      this.checklist001 = ['China']
    },
    selectFirstTwo () {
      this.checklist001 = ['China', 'Japan']
    },
    selectLeft () {
      const left = _.without.apply(_, [this.commonList].concat(this.checklist001))
      this.checklist001 = left
    }
  },
  data () {
    return {
      fullValues: [],
      labelPosition: '',
      error: '',
      commonList: [ 'China', 'Japan', 'America' ],
      checklist001: [],
      checklist0011: [],
      checklist002: [ 'China', 'Japan' ],
      checklist003: [ 'China', 'Japan' ],
      checklist005: [ '01', '02', '03' ],
      checklist005Value: [],
      objectList: [{key: '1', value: '001 value'}, {key: '2', value: '002 value'}, {key: '3', value: '003 value'}],
      objectListValue: ['1', '2'],
      inlineDescList: [
        {key: '1', value: 'Tiger is good', inlineDesc: 'Tiger is the king of mountain'},
        {key: '2', value: 'Lion is better', inlineDesc: 'Lion is the king of woods'},
        {key: '3', value: 'Camel is best, no inline-desc'}
      ],
      inlineDescListValue: [1],
      asyncList: [],
      asyncListValue: [],
      radioValue: ['China']
    }
  }
}
</script>

<style scoped>
.error {
  padding-left: 15px;
  line-height: 28px;
  color: #888;
  font-size: 12px;
}
</style>

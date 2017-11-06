<template>
  <div>
    <group>
      <x-address @on-hide="logHide" @on-show="logShow" :title="title" v-model="value" :list="addressData" @on-shadow-change="onShadowChange" placeholder="请选择地址" inline-desc="可以设置placeholder" :show.sync="showAddress"></x-address>
      <cell title="上面value值" :value="value"></cell>
    </group>

    <div style="padding: 15px;">
      <x-address style="display:none;" :popup-title="$t('selecte address')" :title="title" v-model="value" :list="addressData" placeholder="请选择地址" :show.sync="showAddress"></x-address>
      <x-button type="primary" @click.native="doShowAddress">单独控制显示(2s后关闭)</x-button>
    </div>

    <group>
    <x-address :title="title" @on-hide="logHide" v-model="value_0_1" :list="addressData" placeholder="请选择地址">
      <template slot="title" slot-scope="props"><!-- use scope="props" when vue < 2.5.0 -->
        <span :class="props.labelClass" :style="props.labelStyle" style="height:24px;">
          <span class="demo-icon demo-icon-big" style="font-size:20px;vertical-align:middle;"></span>
          <span style="vertical-align:middle;">地址</span>
        </span>
      </template>
    </x-address>
    </group>

    <br>
    <group label-width="5em" label-align="left">
      <x-address :title="title2" v-model="value2" raw-value :list="addressData" value-text-align="left"></x-address>
    </group>
    <br/>
    <div style="padding: 0 15px;">
      <x-button type="primary" @click.native="changeData">改变数据（通过 id）</x-button>
      <x-button type="primary" @click.native="changeDataByLabels">改变数据（通过文字值）</x-button>
      <x-button type="primary" @click.native="changeDataByLabels2">改变数据（两级，通过文字值）</x-button>
    </div>
    <br/>

    <group>
      <x-address title="二级省市" v-model="value3" raw-value :list="addressData"></x-address>
    </group>
    <group>
      <x-address title="只显示省市" v-model="value4" raw-value :list="addressData" hide-district></x-address>
      <cell title="value值" :value="value4"></cell>
      <cell title="转换成文字值" :value="getName(value4)"></cell>
    </group>

    <br/>
    <group title="错误的地址将不能正确渲染到相应位置">
      <x-address title="错误的值" v-model="value5" raw-value :list="addressData" inline-desc="广东省, 深圳 市, 南山区"></x-address>
    </group>
  </div>
</template>

<i18n>
select address:
  zh-CN: 选择地址
</i18n>

<script>
import { Group, XAddress, ChinaAddressV4Data, XButton, Cell, Value2nameFilter as value2name } from 'vux'

export default {
  components: {
    Group,
    XAddress,
    XButton,
    Cell
  },
  data () {
    return {
      title: '默认为空',
      value_0_1: [],
      value: [],
      title2: '设置值',
      value2: ['天津市', '市辖区', '和平区'],
      value3: ['广东省', '中山市', '--'],
      addressData: ChinaAddressV4Data,
      value4: [],
      value5: ['广东省', '深圳 市', '南山区'],
      showAddress: false
    }
  },
  methods: {
    doShowAddress () {
      this.showAddress = true
      setTimeout(() => {
        this.showAddress = false
      }, 2000)
    },
    onShadowChange (ids, names) {
      console.log(ids, names)
    },
    changeData () {
      this.value2 = ['430000', '430400', '430407']
    },
    changeDataByLabels () {
      this.value2 = ['广东省', '广州市', '天河区']
    },
    changeDataByLabels2 () {
      this.value2 = ['广东省', '中山市', '--']
    },
    getName (value) {
      return value2name(value, ChinaAddressV4Data)
    },
    logHide (str) {
      console.log('on-hide', str)
    },
    logShow (str) {
      console.log('on-show')
    }
  }
}
</script>

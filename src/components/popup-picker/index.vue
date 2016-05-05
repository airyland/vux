<template>
  <cell :title="title" primary="content" is-link :inline-desc="inlineDesc">
    <span class="vux-popup-picker-value" slot="value" @click="show=true" v-if="!showName">{{value | array2string}}</span>
    <span class="vux-popup-picker-value" slot="value" @click="show=true" v-else>{{value | value2name data}}</span>
  </cell>

  <popup :show.sync="show" class="vux-popup-picker" :id="'vux-popup-picker-'+uuid">
    <div class="vux-container">
      <div class="vux-header">
        <flexbox>
          <flexbox-item style="text-align:left;padding-left:15px;line-height:44px;" @click="show=false">取消</flexbox-item>
          <flexbox-item style="text-align:right;padding-right:15px;line-height:44px;" @click="show=false">完成</flexbox-item>
        </flexbox>
      </div>
      <picker :data="data" :value.sync="value" :columns="columns" :container="'#vux-popup-picker-'+uuid"></picker>
    </div>
  </popup>
</template>

<script>
import Picker from '../picker'
import Cell from '../cell'
import Popup from '../popup'
import Flexbox from '../flexbox'
import FlexboxItem from '../flexbox-item'
import array2string from '../../filters/array2String'
import value2name from '../../filters/value2name'
import Base from '../../libs/base'

export default {
  mixins: [Base],
  components: {
    Picker,
    Cell,
    Popup,
    Flexbox,
    FlexboxItem
  },
  filters: {
    array2string,
    value2name
  },
  props: {
    title: {
      type: String
    },
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    columns: {
      type: Number,
      default: 0
    },
    value: {
      type: Array,
      default: function () {
        return []
      },
      twoWay: true
    },
    showName: {
      type: Boolean,
      default: false
    },
    inlineDesc: String
  },
  data () {
    return {
      show: false
    }
  }
}
</script>

<style>
.vux-popup-picker {
  border-top: 1px solid #04BE02;
}
.vux-header {
  height: 44px;
  color: #04BE02;
}
.vux-popup-picker-value {
  display: inline-block;
}
</style>

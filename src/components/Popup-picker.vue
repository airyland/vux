<template>
  <cell :title="title">
    <span slot="value" @click="show=true" v-if="!showName">{{value | array2string}}</span>
    <span slot="value" @click="show=true" v-else>{{value | value2name data}}</span>
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
import uuid from '../libs/uuid'
import Picker from './picker/'
import Cell from './Cell'
import Popup from './popup'
import Flexbox from './Flexbox'
import FlexboxItem from './Flexbox-item'
import array2string from '../filters/array2String'
import value2name from '../filters/value2name'
export default {
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
  ready () {
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
      default: 999
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
    }
  },
  data () {
    return {
      show: false,
      uuid: uuid()
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
</style>
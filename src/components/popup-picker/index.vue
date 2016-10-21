<template>
  <cell v-show="showCell" :title="title" primary="content" is-link :inline-desc="inlineDesc" @click="onClick">
    <span class="vux-popup-picker-value" v-if="!showName && value.length">{{value | array2string}}</span>
    <span class="vux-popup-picker-value" v-else="showName && value.length">{{value | value2name data}}</span>
    <span v-if="!value.length && placeholder" v-html="placeholder"></span>
  </cell>
  <popup :show.sync="show" class="vux-popup-picker" :id="'vux-popup-picker-'+uuid" @on-hide="onPopupHide" @on-show="$emit('on-show')">
    <div class="vux-popup-picker-container">
      <div class="vux-popup-picker-header">
        <flexbox>
          <flexbox-item style="text-align:left;padding-left:15px;line-height:44px;" @click="onHide(false)">取消</flexbox-item>
          <flexbox-item style="text-align:right;padding-right:15px;line-height:44px;" @click="onHide(true)">完成</flexbox-item>
        </flexbox>
      </div>
      <picker
      :data="data"
      :value.sync="tempValue"
      @on-change="onPickerChange"
      :columns="columns"
      :fixed-columns="fixedColumns"
      :container="'#vux-popup-picker-'+uuid"></picker>
    </div>
  </popup>
</template>

<script>
import Picker from '../picker'
import Cell from '../cell'
import Popup from '../popup'
import { Flexbox, FlexboxItem } from '../flexbox'
import array2string from '../../filters/array2String'
import value2name from '../../filters/value2name'
import uuidMixin from '../../libs/mixin_uuid'

const getObject = function (obj) {
  return JSON.parse(JSON.stringify(obj))
}

export default {
  mixins: [uuidMixin],
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
    title: String,
    data: {
      type: Array,
      default () {
        return []
      }
    },
    placeholder: String,
    columns: {
      type: Number,
      default: 0
    },
    fixedColumns: {
      type: Number,
      default: 0
    },
    value: {
      type: Array,
      default () {
        return []
      }
    },
    showName: Boolean,
    inlineDesc: String,
    showCell: {
      type: Boolean,
      default: true
    },
    show: Boolean
  },
  methods: {
    getNameValues () {
      return value2name(this.value, this.data)
    },
    onClick () {
      this.show = true
    },
    onHide (type) {
      this.show = false
      if (type) {
        this.closeType = true
        this.value = getObject(this.tempValue)
      }
      if (!type) {
        this.closeType = false
        if (this.value.length > 0) {
          this.tempValue = getObject(this.value)
        }
      }
    },
    onPopupHide (val) {
      if (this.value.length > 0) {
        this.tempValue = getObject(this.value)
      }
      this.$emit('on-hide', this.closeType)
    },
    onPickerChange (val) {
      if (JSON.stringify(this.value) !== JSON.stringify(val)) {
        // if has value, replace it
        if (this.value.length) {
          const nowData = JSON.stringify(this.data)
          if (nowData !== this.currentData && this.currentData !== '[]') {
            this.value = getObject(val)
          }
          this.currentData = nowData
        } else { // if no value, stay quiet
          // if set to auto update, do update the value
        }
      }
      this.$emit('on-shadow-change', getObject(val))
    }
  },
  watch: {
    value (val) {
      if (JSON.stringify(val) !== JSON.stringify(this.tempValue)) {
        this.tempValue = getObject(val)
      }
    }
  },
  data () {
    return {
      tempValue: getObject(this.value),
      closeType: false,
      currentData: JSON.stringify(this.data) // used for detecting if it is after data change
    }
  }
}
</script>

<style>
.vux-popup-picker {
  border-top: 1px solid #04BE02;
}
.vux-popup-picker-header {
  height: 44px;
  color: #04BE02;
}
.vux-popup-picker-value {
  display: inline-block;
}
</style>

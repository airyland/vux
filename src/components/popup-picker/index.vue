<template>
  <div class="vux-cell-box">
    <cell v-show="showCell" :title="title" primary="content" is-link :inline-desc="inlineDesc" @click.native="onClick">
      <span class="vux-popup-picker-value" v-if="!showName && value.length">{{value | array2string}}</span>
      <span class="vux-popup-picker-value" v-else="showName && value.length">{{value | value2name(data)}}</span>
      <span v-if="!value.length && placeholder" v-html="placeholder"></span>
    </cell>
    <popup v-model="showValue" class="vux-popup-picker" :id="'vux-popup-picker-'+uuid" @on-hide="onPopupHide" @on-show="$emit('on-show')">
      <div class="vux-popup-picker-container">
        <div class="vux-popup-picker-header">
          <flexbox>
            <flexbox-item class="vux-popup-picker-header-menu" @click.native="onHide(false)">{{cancelText || $t('cancel_text')}}</flexbox-item>
            <flexbox-item class="vux-popup-picker-header-menu vux-popup-picker-header-menu-right" @click.native="onHide(true)">{{confirmText || $t('confirm_text')}}</flexbox-item>
          </flexbox>
        </div>
        <picker
        :data="data"
        v-model="tempValue"
        @on-change="onPickerChange"
        :columns="columns"
        :fixed-columns="fixedColumns"
        :container="'#vux-popup-picker-'+uuid"></picker>
      </div>
    </popup>
  </div>
</template>

<i18n>
cancel_text:
  en: cancel
  zh-CN: 取消
confirm_text:
  en: ok
  zh-CN: 完成
</i18n>

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
  created () {
    if (typeof this.show !== 'undefined') {
      this.showValue = this.show
    }
  },
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
    cancelText: String,
    confirmText: String,
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
      return value2name(this.currentValue, this.data)
    },
    onClick () {
      console.log('click')
      if (this.onShowProcess) {
        console.log('进程中')
      } else {
        this.showValue = true
        this.onShowProcess = true
        setTimeout(() => {
          this.onShowProcess = false
        }, 300)
      }
    },
    onHide (type) {
      this.showValue = false
      if (type) {
        this.closeType = true
        this.currentValue = getObject(this.tempValue)
        this.$emit('input', getObject(this.tempValue))
      }
      if (!type) {
        this.closeType = false
        if (this.value.length > 0) {
          this.tempValue = getObject(this.currentValue)
        }
      }
    },
    onPopupHide (val) {
      if (this.value.length > 0) {
        this.tempValue = getObject(this.currentValue)
      }
      this.$emit('on-hide', this.closeType)
    },
    onPickerChange (val) {
      if (JSON.stringify(this.currentValue) !== JSON.stringify(val)) {
        // if has value, replace it
        if (this.value.length) {
          const nowData = JSON.stringify(this.data)
          if (nowData !== this.currentData && this.currentData !== '[]') {
            // this.value = getObject(val)
            this.$emit('input', getObject(val))
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
    },
    currentValue (val) {
      this.$emit('input', val)
    },
    show (val) {
      this.showValue = val
    }
  },
  data () {
    return {
      onShowProcess: false,
      tempValue: getObject(this.value),
      closeType: false,
      currentData: JSON.stringify(this.data), // used for detecting if it is after data change
      showValue: false,
      currentValue: this.value
    }
  }
}
</script>

<style lang="less">
@import '../../styles/variable.less';

.vux-cell-box {
  position: relative;
}
.vux-cell-box:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 1px;
  border-top: 1px solid #D9D9D9;
  color: #D9D9D9;
  transform-origin: 0 0;
  transform: scaleY(0.5);
  left: 15px;
}
.vux-popup-picker {
  border-top: 1px solid #04BE02;
}
.vux-popup-picker-header {
  height: 44px;
  color: @popup-picker-header-text-color;
}
.vux-popup-picker-value {
  /* display: inline-block; */
}
.vux-popup-picker-header-menu {
  text-align: left;
  padding-left: 15px;
  line-height: 44px;
}
.vux-popup-picker-header-menu-right {
  text-align: right;
  padding-right: 15px;
}
</style>

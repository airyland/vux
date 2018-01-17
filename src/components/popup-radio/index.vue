<template>
  <cell @click.native="show" :title="title" :value="currentValue" :is-link="!readonly" :value-align="valueAlign" :border-intent="borderIntent">
    <span class="vux-cell-placeholder" v-if="!displayValue && placeholder">{{ placeholder }}</span>
    <span class="vux-cell-value" v-if="displayValue">{{ displayValue }}</span>
    <span slot="icon">
      <slot name="icon"></slot>
    </span>
    <div v-transfer-dom>
      <popup
      v-model="showPopup"
      style="background-color:#fff;"
      @on-hide="$emit('on-hide')"
      @on-show="$emit('on-show')">
        <slot name="popup-header" :options="options" :value="currentValue"></slot>
        <radio
        :options="options"
        v-model="currentValue"
        :fill-mode="false"
        @on-change="onValueChange">
          <template slot="each-item" slot-scope="props">
            <slot name="each-item" :icon="props.icon" :label="props.label" :index="props.index">
              <p>
                <img class="vux-radio-icon" :src="props.icon" v-show="props.icon">
                <span class="vux-radio-label">{{ props.label }}</span>
              </p>
            </slot>
          </template>
        </radio>
      </popup>
    </div>
  </cell>
</template>

<script>
import Cell from '../cell'
import Popup from '../popup'
import Radio from '../radio'
import radioProps from '../radio/props'
import cellProps from '../cell/props'
import TransferDom from '../../directives/transfer-dom'
import find from 'array-find'

const _cellProps = cellProps()
delete _cellProps.value

export default {
  name: 'popup-radio',
  components: {
    Popup,
    Radio,
    Cell
  },
  directives: {
    TransferDom
  },
  props: {
    placeholder: String,
    readonly: Boolean,
    ..._cellProps,
    ...radioProps()
  },
  computed: {
    displayValue () {
      if (!this.options.length) {
        return ''
      }
      if (typeof this.options[0] === 'object') {
        const match = find(this.options, option => {
          return option.key === this.currentValue
        })
        if (match) {
          return match.value
        }
      }
      return this.currentValue
    }
  },
  methods: {
    onValueChange (val) {
      this.hide()
    },
    show () {
      if (!this.readonly) {
        this.showPopup = true
      }
    },
    hide () {
      this.showPopup = false
    }
  },
  watch: {
    value (val) {
      this.currentValue = val
    },
    currentValue (val) {
      this.$emit('input', val)
      this.$emit('on-change', val)
    }
  },
  data () {
    return {
      showPopup: false,
      currentValue: this.value
    }
  }
}
</script>

<style>
.vux-popup-radio-popup {
  background-color: #fff;
}
</style>

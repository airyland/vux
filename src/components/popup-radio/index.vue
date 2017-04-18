<template>
  <cell @click.native="show" :title="title" :value="currentValue" is-link :value-align="valueAlign">
    {{currentValue || placeholder}}
    <div v-transfer-dom>
      <popup v-model="showPopup" style="background-color:#fff;">
        <radio :options="options" v-model="currentValue" :fill-mode="false" @on-change="onValueChange"></radio>
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

export default {
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
    ...cellProps(),
    ...radioProps()
  },
  methods: {
    onValueChange (val) {
      this.hide()
    },
    show () {
      this.showPopup = true
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

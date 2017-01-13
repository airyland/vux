<template>
  <div class="weui_cell">
    <div class="weui_cell_bd weui_cell_primary">
      <p v-html="$t(title)"></p>
    </div>
    <div class="weui_cell_ft" v-show="!readonly" style="font-size:0">
      <a @click="sub" class="vux-number-selector vux-number-selector-sub":class="{'vux-number-disabled':disabledMin}">-</a>
      <input v-model.number="currentValue" :name="name" class="vux-number-input" :style="{width: width}" :readonly="!fillable" pattern="[0-9]*" type="number"/>
      <a @click="add" class="vux-number-selector vux-number-selector-plus" :class="{'vux-number-disabled':disabledMax}">+</a>
    </div>
    <div class="weui_cell_ft" v-show="readonly">
      {{value}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    min: Number,
    max: Number,
    readonly: Boolean,
    step: {
      type: Number,
      default: 1
    },
    value: {
      type: Number,
      default: 0
    },
    name: String,
    title: String,
    fillable: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '50px'
    }
  },
  created () {
    this.currentValue = this.value
  },
  data () {
    return {
      currentValue: 0
    }
  },
  computed: {
    disabledMin () {
      return typeof this.min === 'undefined' ? false : this.currentValue <= this.min
    },
    disabledMax () {
      return typeof this.max === 'undefined' ? false : this.currentValue >= this.max
    }
  },
  watch: {
    currentValue (newValue, old) {
      if (this.min && this.currentValue < this.min) {
        this.currentValue = this.min
      }
      if (this.max && this.currentValue > this.max) {
        this.currenValue = this.max
      }
      this.$emit('on-change', this.currentValue)
      this.$emit('input', this.currentValue)
    },
    value (newValue) {
      this.currentValue = newValue
    }
  },
  methods: {
    add () {
      if (!this.disabledMax) {
        this.currentValue += this.step
      }
    },
    sub () {
      if (!this.disabledMin) {
        this.currentValue -= this.step
      }
    }
  }
}
</script>

<style lang="less">
@import '../../styles/weui/widget/weui_cell/weui_cell_global';

.vux-number-input {
  float:left;
  height:20px;
  font-size:20px;
  color: @number-input-font-color;
  appearance: none;
  border:1px solid #ececec;
  padding:3px 0;
  text-align:center;
  border-radius: 1px;
}
.vux-number-selector {
  float:left;
  height:20px;
  font-size:25px;
  line-height:18px;
  color:@number-button-font-color;
  border:1px solid #ececec;
}
.vux-number-selector.vux-number-disabled{
  color:#ccc;
}
.vux-number-selector-sub {
  border-right:none;
  padding:3px 10px;
  border-radius:2px 0 0 2px;
}
.vux-number-selector-plus {
  border-left:none;
  margin-right: 5px;
  padding:3px 8px;
  border-radius:0 2px 2px 0;
}
</style>

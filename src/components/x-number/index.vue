<template>
  <div class="weui_cell">
    <div class="weui_cell_bd weui_cell_primary">
      <p>{{title}}</p>
    </div>
    <div class="weui_cell_ft" v-show="!readonly" style="font-size:0">
      <a @click="sub()" class="vux-number-selector vux-number-selector-sub needsclick":class="{'vux-number-disabled':disabledMin}">-</a>
      <input v-model="value" class="vux-number-input" :style="{width: width+'px'}" number :readonly="!fillable" pattern="[0-9]*"/>
      <a @click="add()" class="vux-number-selector vux-number-selector-plus needsclick" :class="{'vux-number-disabled':disabledMax}">+</a>
    </div>
    <div class="weui_cell_ft" v-else>
      {{value}}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    min: Number,
    max: Number,
    step: {
      type: Number,
      default: 1
    },
    value: {
      type: Number,
      default: 0
    },
    title: String,
    fillable: {
      type: Boolean,
      default: true
    },
    width: {
      type: Number,
      default: 50
    }
  },
  computed: {
    disabledMin () {
      return typeof this.min === 'undefined' ? false : this.value <= this.min
    },
    disabledMax () {
      return typeof this.max === 'undefined' ? false : this.value >= this.max
    }
  },
  ready () {
  },
  watch: {
    value (newValue, old) {
      if (this.min && this.value < this.min) {
        this.value = this.min
      }
      if (this.max && this.value > this.max) {
        this.value = this.max
      }
      this.$emit('on-change', this.value)
    }
  },
  methods: {
    add () {
      if (!this.disabledMax) {
        this.value += this.step
      }
    },
    sub () {
      if (!this.disabledMin) {
        this.value -= this.step
      }
    }
  }
}
</script>

<style lang="less">
.vux-number-input {
  float:left;
  height:20px;
  font-size:20px;
  color: #666;
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
  color:#3cc51f;
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

<template>
  <div class="weui_cell">
    <div class="weui_cell_bd weui_cell_primary">
      <p>{{title}}</p>
    </div>
    <div class="weui_cell_ft" v-show="!readonly" style="font-size:0">
      <a @click="sub()" class="number-selector number-selector-sub needsclick":class="{'number-disabled':disabled_min}">-</a>
      <input v-model="value" class="number-input" :style="{width: width+'px'}" number :readonly="!fillable" pattern="[0-9]*"/>
      <a @click="add()" class="number-selector number-selector-plus needsclick" :class="{'number-disabled':disabled_max}">+</a>
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
    title: {
      type: String
    },
    fillable: {
      type: Boolean,
      default: true
    },
    width: {
      type: Number,
      default: 50
    }
  },
  data: function () {
    return {

    }
  },
  computed: {
    disabled_min: function () {
      return typeof this.min === 'undefined' ? false : this.value <= this.min
    },
    disabled_max: function () {
      return typeof this.max === 'undefined' ? false : this.value >= this.max
    }
  },
  ready: function () {
  },
  watch: {
    value: function (newValue, old) {
      if (this.min && this.value < this.min) {
        this.value = this.min
      }
      if (this.max && this.value > this.max) {
        this.value = this.max
      }
      this.$dispatch('on-change', this.value)
    }
  },
  methods: {
    add: function () {
      if (!this.disabled_max) {
        this.value += this.step
      }
    },
    sub: function () {
      if (!this.disabled_min) {
        this.value -= this.step
      }
    }
  }
}
</script>
<style>
.number-input {
  float:left;
  height:20px;
  font-size:20px;
  color: #666;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border:1px solid #ececec;
  padding:3px 0;
  text-align:center;
  border-radius: 1px;
}
.number-selector {
  float:left;
  height:20px;
  font-size:25px;
  line-height:18px;
  color:#3cc51f;
  border:1px solid #ececec;
}
.number-selector.number-disabled{
  color:#ccc;
}
.number-selector-sub {
  border-right:none;
  padding:3px 10px;
  border-radius:2px 0 0 2px;
}
.number-selector-plus {
  border-left:none;
  margin-right: 5px;
  padding:3px 8px;
  border-radius:0 2px 2px 0;
}
</style>

<template>
  <div class="vux-rater">
    <input v-model="currentValue" style="display:none">
    <a class="vux-rater-box" v-for="i in max" @click="handleClick(i-1)" :class="{'is-active':currentValue > i-1}" :style="{color: colors && colors[i-1] ? colors[i-1] : '#ccc',marginRight:margin+'px',fontSize: fontSize + 'px', width: fontSize + 'px', height: fontSize + 'px', lineHeight: fontSize + 'px'}">
      <span class="vux-rater-inner"><span v-html="star"></span><span class="vux-rater-outer" :style="{color: activeColor, width: cutPercent + '%'}" v-if="cutPercent > 0 && cutIndex === i-1" v-html="star"></span></span>
    </a>
  </div>
</template>

<script>
export default {
  name: 'rater',
  created () {
    this.currentValue = parseInt(this.value)
  },
  mounted () {
    this.updateStyle()
  },
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 5
    },
    value: {
      type: [Number, String],
      default: 0
    },
    disabled: Boolean,
    star: {
      type: String,
      default: '★'
    },
    activeColor: {
      type: String,
      default: '#fc6'
    },
    margin: {
      type: Number,
      default: 2
    },
    fontSize: {
      type: Number,
      default: 25
    }
  },
  computed: {
    sliceValue () {
      const _val = this.currentValue.toFixed(2).split('.')
      return _val.length === 1 ? [_val[0], 0] : _val
    },
    cutIndex () {
      return this.sliceValue[0] * 1
    },
    cutPercent () {
      return this.sliceValue[1] * 1
    }
  },
  methods: {
    handleClick (i, force) {
      if (!this.disabled || force) {
        if (this.currentValue === i + 1) {
          this.currentValue = i < this.min ? this.min : i
          this.updateStyle()
        } else {
          this.currentValue = (i + 1) < this.min ? this.min : (i + 1)
        }
      }
    },
    updateStyle () {
      for (var j = 0; j < this.max; j++) {
        if (j <= this.currentValue - 1) {
          this.$set(this.colors, j, this.activeColor)
        } else {
          this.$set(this.colors, j, '#ccc')
        }
      }
    }
  },
  data () {
    return {
      colors: [],
      currentValue: 0
    }
  },
  watch: {
    currentValue (val) {
      this.updateStyle()
      this.$emit('input', val)
    },
    value (val) {
      this.currentValue = val
    }
  }
}
</script>

<style>
.vux-rater {
  text-align: left;
  display: inline-block;
  line-height: normal;
}
.vux-rater a {
  display: inline-block;
  text-align: center;
  cursor: pointer;
  color: #ccc;
}
.vux-rater a:last-child {
  padding-right: 2px!important;
  margin-right: 0px!important;
}
.vux-rater a:hover {
  color: #ffdd99;
}
.vux-rater a.is-disabled {
  color: #ccc !important;
  cursor: not-allowed;
}
.vux-rater-box {
  position: relative;
}
.vux-rater-inner {
  position: relative;
  display: inline-block;
}
.vux-rater-outer {
  position: absolute;
  left: 0;
  top: 0;
  display: inline-block;
  overflow: hidden;
}
</style>

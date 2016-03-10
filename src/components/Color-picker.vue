<template>
  <div class="vux-color-picker" :class="{'vux-color-picker-flex': isFlex}">
    <span v-for="color in colors" class="vux-color-item" :style="{borderRadius: width/2 + 'px',backgroundColor: color, width: width + 'px', height: width + 'px', marginRight: margin + 'px'}" @click="change(color)" :class="{'vux-color-white': color === '#fff' || color === '#fff', 'vux-color-picker-small': size === 'small', 'vux-color-picker-middle': size === 'middle'}">
      <icon v-if="color === value" class="vux-color-checked" :style="{lineHeight: width + 'px'}" type="success_no_circle"></icon>
    </span>
  </div>
</template>

<script>
import Icon from './Icon'
const sizeMap = {
  'large': 40,
  'middle': 30,
  'small': 20
}
export default {
  components: {
    Icon
  },
  props: {
    colors: {
      type: Array,
      required: true
    },
    size: {
      type: String,
      default: 'large'
    },
    margin: {
      type: Number,
      default: 8
    },
    value: {
      type: String,
      twoWay: true
    },
    isFlex: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    width: function () {
      return sizeMap[this.size]
    }
  },
  methods: {
    change: function (color) {
      this.value = color
      this.$dispatch('change', color)
    }
  }
}
</script>

<style>
.vux-color-picker {
  font-size: 0;
}
.vux-color-item {
  display: inline-block;
  text-align: center;
  box-sizing: border-box;
  position: relative
}
.vux-color-checked:before {
  color: #fff;
}
.vux-color-checked {
  width: 100%;
  position: absolute;
  left: 0;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}
.vux-color-white {
  border: 1px solid #ccc;
}
.vux-color-white .vux-color-checked:before {
  color: #ccc;
}
.vux-color-picker-small .vux-color-checked:before{
  font-size: 10px;
}
.vux-color-picker-middle .vux-color-checked:before{
  font-size: 18px;
}
</style>
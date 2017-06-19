<template>
  <div class="vux-color-picker">
    <flexbox>
      <flexbox-item v-for="color in colors" :key="color" class="vux-color-box">
        <span class="vux-color-item" :style="{borderRadius: width/2 + 'px',backgroundColor: color, width: width + 'px', height: width + 'px'}" @click="change(color)" :class="{'vux-color-white': color === '#fff' || color === '#fff', 'vux-color-picker-small': size === 'small', 'vux-color-picker-middle': size === 'middle'}">
          <icon v-if="color === value" class="vux-color-checked" :style="{lineHeight: width + 'px'}" type="success-no-circle"></icon>
        </span>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import Icon from '../icon'
import { Flexbox, FlexboxItem } from '../flexbox'

const sizeMap = {
  'large': 40,
  'middle': 30,
  'small': 20
}
export default {
  name: 'color-picker',
  components: {
    Icon,
    Flexbox,
    FlexboxItem
  },
  created () {
    this.currentValue = this.value
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
    value: String
  },
  computed: {
    width () {
      return sizeMap[this.size]
    }
  },
  data () {
    return {
      currentValue: ''
    }
  },
  watch: {
    value (val) {
      this.currentValue = val
    },
    currentValue (color) {
      this.$emit('on-change', color)
      this.$emit('input', color)
    }
  },
  methods: {
    change (color) {
      this.currentValue = color
    }
  }
}
</script>

<style lang="less">
@import '../../styles/weui/icon/weui_icon_font';

.vux-color-box {
  text-align: center;
}
.vux-color-picker {
  font-size: 0;
}
.vux-color-item {
  display: inline-block;
  text-align: center;
  box-sizing: border-box;
  position: relative
}
.vux-color-checked.weui-icon-success-no-circle:before {
  color: #fff;
}
.vux-color-checked {
  width: 100%;
  position: absolute;
  left: 0;
  top: 50%;
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

<template>
<div class="vux-step-item" :class=" { 'vux-step-item-with-tail' : !stepLast} ">
  <div :class="'vux-step-item-tail ' + 'vux-step-item-tail-' + status" v-show="!stepLast" :style="{right: $parent.gutter}"></div>
  <div :class="'vux-step-item-head ' + 'vux-step-item-head-' + status">
    <div class="vux-step-item-head-inner">
      <span v-if="!icon && status!='finish'" class="vux-step-item-icon">{{stepNumber}}</span>
      <span v-else :class="'vux-step-item-icon ' + 'vux-step-item-' + iconName">
        <icon type="success_no_circle" class="vux-step-item-checked"></icon>
      </span>
    </div>
  </div>
  <div :class="'vux-step-item-main ' + 'vux-step-item-main-' + status" :style="{backgroundColor: $parent.backgroundColor, paddingRight: stepLast ? 0 : $parent.gutter}">
    <span class="vux-step-item-title">{{title}}</span>
    <div class="vux-step-item-description">{{description}}</div>
  </div>
</div>
</template>

<script>
import Icon from '../icon'

export default {
  props: {
    title: String,
    description: String,
    stepNumber: {
      type: Number
    },
    stepLast: {
      type: Boolean,
      default: false
    },
    icon: String,
    status: String,
    tailWidth: {
      type: Object
    }
  },
  computed: {
    iconName () {
      return this.icon || 'check'
    }
  },

  components: {
    Icon
  }
}
</script>

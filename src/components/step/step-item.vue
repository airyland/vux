<template>
<div class="vux-step-item" :class=" { 'vux-step-item-with-tail' : !currentStepLast} ">
  <div :class="'vux-step-item-tail ' + 'vux-step-item-tail-' + currentStatus" v-show="!currentStepLast" :style="{right: $parent.gutter}"></div>
  <div :class="'vux-step-item-head ' + 'vux-step-item-head-' + currentStatus">
    <div class="vux-step-item-head-inner">
      <span v-if="!icon && currentStatus!='finish'" class="vux-step-item-icon">{{currentStepNumber}}</span>
      <span v-else :class="'vux-step-item-icon ' + 'vux-step-item-' + iconName">
        <icon type="success_no_circle" class="vux-step-item-checked"></icon>
      </span>
    </div>
  </div>
  <div :class="'vux-step-item-main ' + 'vux-step-item-main-' + currentStatus" :style="{backgroundColor: $parent.backgroundColor, paddingRight: currentStepLast ? 0 : $parent.gutter}">
    <span class="vux-step-item-title">{{title}}</span>
    <div class="vux-step-item-description">{{description}}</div>
  </div>
</div>
</template>

<script>
import Icon from '../icon'

export default {
  name: 'step-item',
  props: {
    title: String,
    description: String,
    stepNumber: Number,
    stepLast: Boolean,
    icon: String,
    status: String,
    tailWidth: Object
  },
  computed: {
    iconName () {
      return this.icon || 'check'
    }
  },
  created () {
    this.currentStatus = this.status
    this.currentStepLast = this.stepLast
    this.currentStepNumber = this.stepNumber
  },
  data () {
    return {
      currentStatus: '',
      currentStepLast: false,
      currentStepNumber: 0
    }
  },
  components: {
    Icon
  }
}
</script>

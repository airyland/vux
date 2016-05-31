<template>
<div class="v-onestep" :class=" { 'v-onestep-with-tail' : !stepLast} ">
  <div :class="'v-onestep-head ' + 'v-onestep-head-' + status">
    <div class="v-onestep-head-inner">
      <span v-if="!icon && status!='finish'" class="v-onestep-icon">{{stepNumber}}</span>
      <span v-else :class="'v-onestep-icon ' + 'v-onestep-' + iconName">
        <icon type="success_no_circle" class="v-onestep-checked"></icon>
      </span>
    </div>
  </div>
  <div :class="'v-onestep-main ' + 'v-onestep-main-' + status">
    <span class="v-onestep-title">{{title}}</span>
    <div class="v-onestep-description">{{description}}</div>
  </div>
  <div :class="'v-onestep-tail ' + 'v-onestep-tail-' + status" :style="tailWidth" v-show="!stepLast">
  </div>
</div>
</template>

<script>
import Icon from '../icon'

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    stepNumber: {
      type: Number
    },
    stepLast: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String
    },
    status: {
      type: String
    },
    tailWidth: {
      type: Object
    }
  },

  ready () {
    const el = this.$el
    const width = el.offsetWidth - el.children[0].offsetWidth - el.children[1].offsetWidth - 20 + 'px'
    this.tailWidth = {'width': width}
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

<style lang="less">
.v-onestep {
  display: inline-block;
  position: relative;
}

.v-onestep-with-tail {
  flex: 1;
}

.v-onestep-tail {
  height: 1px;
  position: absolute;
  right: 3px;
  top: 10px;
  padding: 0 10px;
  transition: all 0.4s ease 0s;
}

.v-onestep-tail-finish {
  background: #09bb07 none repeat scroll 0 0;
}

.v-onestep-tail-process, .v-onestep-tail-wait {
  background: #CCC none repeat scroll 0 0;
}

.v-onestep-checked::before {
  font-size: 15px;
  transform: translateY(-10%);
}

.v-onestep-title {
  font-size: 0.8rem;
}

.v-onestep-head {
  position: relative;
  display: inline-block;
  margin-right: 1px;
  background: #fff none repeat scroll 0 0;

  .v-onestep-head-inner {
    width: 20px;
    height: 20px;
    border-radius: 99px;
    text-align: center;
    font-size: 0.9rem;
    transition: all 0.4s ease 0s;
  }
}

.v-onestep-head-finish .v-onestep-head-inner{
  border: 1px solid #09bb07;
  color: #09bb07;
}

.v-onestep-head-process .v-onestep-head-inner{
  border: 1px solid #09bb07;
  color: #FFF;
  background: #09bb07 none repeat scroll 0 0;
}

.v-onestep-head-wait .v-onestep-head-inner {
  border: 1px solid #888;
  color: #888;
}


.v-onestep-main {
  display: inline-block;
  position: relative;
  vertical-align: top;
  color: #888;
}

.v-onestep-main-process {
  font-weight: bold;
  color: #666;
}

.v-onestep-icon {
  
}

</style>
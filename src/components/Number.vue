<template>
  <div class="weui_cells_title" v-show="description">{{description || '测试'}}</div>
  <div class="weui_cells" v-show="type!=='inline'">
      <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
              <p>{{title}}</p>
          </div>
          <div class="weui_cell_ft" v-show="!readonly">
            <a @click="sub()" class="number-selector":class="{'number-disabled':disabled_min}">-</a>
            <input v-model="value" class="number-input" v-bind:style="width+'px'"/>
            <a @click="add()" class="number-selector" :class="{'number-disabled':disabled_max}">+</a>
          </div>
          <div class="weui_cell_ft" v-else>
          {{value}}
          </div>
      </div>
  </div>
  <div class="weui_cell" v-else>
          <div class="weui_cell_bd weui_cell_primary">
              <p>{{title}}</p>
          </div>
          <div class="weui_cell_ft" v-show="!readonly">
            <a @click="sub()" class="number-selector":class="{'number-disabled':disabled_min}">-</a>
            <input v-model="value" class="number-input" v-bind:style="width+'px'"/>
            <a @click="add()" class="number-selector" :class="{'number-disabled':disabled_max}">+</a>
          </div>
          <div class="weui_cell_ft" v-else>
          {{value}}
          </div>
      </div>
  </div>
</template>

<style>
  .number-input {
    border:1px solid #ececec;
    padding:3px 3px;
    text-align:center;
  }
  .number-selector {
    font-size:16px;
    color:#3cc51f;
  }
  .number-selector.number-disabled{
    color:#ccc;
  }
</style>

<script>
export default {
  // 定义
  /* @todo readonly*/
  /* @todo disabled on_change*/
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
    readonly: {
      type: Boolean,
      default: false
    },
    description: {
      type: String
    },
    width: Number,
    type: {
      type: String
    }
  },
  data: function () {
    return {

    }
  },
  computed: {
    disabled_min: function () {
      return !this.min ? false : this.value <= this.min
    },
    disabled_max: function () {
      return !this.max ? false : this.value >= this.max
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
      this.$dispatch('change', this.value)
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
<template>
  <div class="vux-search-box">
    <div class="weui_search_bar" id="search_bar" :class="{weui_search_focusing: !isCancel}">
      <form class="weui_search_outer" @submit.prevent="$emit('on-submit', value)">
        <div class="vux-search-mask" @click="touch" v-show="!isFixed"></div>
        <div class="weui_search_inner">
          <i class="weui_icon_search"></i>
          <input type="text" class="weui_search_input" id="search_input" placeholder="{{placeholder}}" autocomplete="off" required v-model="value" v-el:input/>
          <a href="javascript:" class="weui_icon_clear" id="search_clear" @click="clear"></a>
        </div>
        <label for="search_input" class="weui_search_text" id="search_text">
          <i class="weui_icon_search"></i>
          <span>{{placeholder}}</span>
        </label>
      </form>
      <a href="javascript:" class="weui_search_cancel" id="search_cancel" @click="cancel">{{cancelText}}</a>
    </div>
    <div class="weui_cells weui_cells_access vux-search_show" id="search_show" v-show="isFixed && results.length && value">
      <div class="weui_cell" v-for="item in results" @click="handleResultClick(item)">
        <div class="weui_cell_bd weui_cell_primary">
          <p>{{item.title}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: 'Search'
    },
    cancelText: {
      type: String,
      default: 'cancel'
    },
    value: {
      type: String,
      twoWay: true,
      default: ''
    },
    results: {
      type: Array,
      default () {
        return []
      }
    },
    autoFixed: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    clear () {
      this.value = ''
      this.isFocus = true
      this.setFocus()
    },
    cancel () {
      this.value = ''
      this.isCancel = true
      this.isFixed = false
    },
    handleResultClick (item) {
      this.$emit('result-click', item)
      this.isCancel = true
      this.isFixed = false
    },
    touch () {
      this.isCancel = false
      if (this.autoFixed) {
        this.isFixed = true
      }
    },
    setFocus () {
      this.$els.input.focus()
    }
  },
  data () {
    return {
      isCancel: true,
      isFocus: false,
      isFixed: false
    }
  },
  watch: {
    isFixed (val) {
      if (val === true) {
        this.$el.classList.add('vux-search-fixed')
        this.setFocus()
        this.isFocus = true
      } else {
        this.$el.classList.remove('vux-search-fixed')
      }
    },
    value (val) {
      this.$emit('on-change', this.value)
    }
  }
}
</script>

<style>
.vux-search-fixed {
  position: fixed;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 5;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
}
.vux-search-box {
  width: 100%;
}
.vux-search_show {
  margin-top: 0;
  overflow-y: auto;
  height: 100%;
}
.vux-search-mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
}
</style>

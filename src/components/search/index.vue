<template>
  <div class="vux-search-box" :class="{'vux-search-fixed':isFixed}" :style="{top: isFixed ? top : ''}">
    <div class="weui_search_bar" id="search_bar" :class="{weui_search_focusing: !isCancel}">
      <form class="weui_search_outer" @submit.prevent="$emit('on-submit', value)">
        <div class="vux-search-mask" @click="touch" v-show="!isFixed && autoFixed"></div>
        <div class="weui_search_inner">
          <i class="weui_icon_search"></i>
          <input type="search" class="weui_search_input" id="search_input" :placeholder="placeholder" autocomplete="off" :required="required" v-model="currentValue" ref="input"
          @focus="isFocus = true"
          @blur="isFocus = false"/>
          <a href="javascript:" class="weui_icon_clear" id="search_clear" @click="clear"></a>
        </div>
        <label for="search_input" class="weui_search_text" id="search_text" v-show="!isFocus && !value">
          <i class="weui_icon_search"></i>
          <span>{{placeholder || $t('placeholder')}}</span>
        </label>
      </form>
      <a href="javascript:" class="weui_search_cancel" id="search_cancel" @click="cancel">{{cancelText || $t('cancel_text')}}</a>
    </div>
    <div class="weui_cells weui_cells_access vux-search_show" id="search_show" v-show="isFixed">
      <slot></slot>
      <div class="weui_cell" v-for="item in results" @click="handleResultClick(item)" v-on:touchmove.prevent>
        <div class="weui_cell_bd weui_cell_primary">
          <p>{{item.title}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n>
cancel_text:
  en: cancel
  zh-CN: 取消
placeholder:
  en: Search
  zh-CN: 搜索
</i18n>

<script>
export default {
  props: {
    required: {
      type: Boolean,
      default: false
    },
    placeholder: String,
    cancelText: String,
    value: {
      type: String,
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
    },
    top: {
      type: String,
      default: '0px'
    }
  },
  created () {
    if (this.value) {
      this.currentValue = this.value
    }
  },
  methods: {
    clear () {
      this.currentValue = ''
      this.isFocus = true
      this.setFocus()
    },
    cancel () {
      this.currentValue = ''
      this.isCancel = true
      this.isFixed = false
      this.$emit('on-cancel')
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
      this.$emit('on-touch')
    },
    setFocus () {
      this.$refs.input.focus()
    }
  },
  data () {
    return {
      currentValue: '',
      isCancel: true,
      isFocus: false,
      isFixed: false
    }
  },
  watch: {
    isFixed (val) {
      if (val === true) {
        this.setFocus()
        this.isFocus = true
      } else {
      }
    },
    value (val) {
      this.currentValue = val
    },
    currentValue (val) {
      this.$emit('on-change', val)
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less">
@import '../../styles/weui/icon/weui_icon_font';
@import '../../styles/weui/widget/weui_searchbar/weui_searchbar';

.vux-search-fixed {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 5;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
}
.vux-search-box {
  width: 100%;
}
.weui_cells.vux-search_show {
  margin-top: 0;
  overflow-y: auto;
}
.vux-search-mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
}
.vux-search-box .weui_cells:after {
  display: none;
}
</style>

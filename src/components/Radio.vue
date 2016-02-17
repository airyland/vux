<template>
         <div class="weui_cells_radio">
         <label class="weui_cell weui_check_label" for="radio_{{uuid}}_{{index}}" v-for="(index,one) in options">
             <div class="weui_cell_bd weui_cell_primary">
                 <p>{{one}}</p>
             </div>
             <div class="weui_cell_ft">
                 <input type="radio" class="weui_check" v-model="value" id="radio_{{uuid}}_{{index}}" value="{{one}}">
                 <span class="weui_icon_checked"></span>
             </div>
        </label>
        <div class="weui_cell" v-show="fill_mode">
          <div class="weui_cell_hd"><label for="" class="weui_label">{{fill_label}}</label></div>
          <div class="weui_cell_bd weui_cell_primary">
              <input class="weui_input needsclick" type="text" v-model="fillValue" placeholder="{{fill_placeholder}}" @blur="isFocus=false;" @focus="onFocus()">
          </div>
          <div class="weui_cell_ft" v-show="value==='' && !isFocus">
              <i class="weui_icon_warn"></i>
          </div>
        </div>
     </div>
</template>

<script>
export default {
  ready() {},
    props: {
      options: {
        type: Array,
        required: true
      },
      value: {
        type: String,
        required: false,
        twoWay: true
      },
      fill_mode: {
        type: Boolean,
        required: false,
        default: false
      },
      fill_placeholder: {
        type: String,
        required: false,
        default: '其他'
      },
      fill_label: {
        type: String,
        required: false,
        default: '其他'
      }
    },
    methods: {
      onFocus: function() {
        this.value = this.fillValue || '';
        this.isFocus = true
      }
    },
    watch: {
      value(newVal) {
        var isOption = contains(this.options, newVal);
        if (newVal !== '' && isOption) {
          this.fillValue = '';
        }
        this.$dispatch('change', newVal);
      },
      fillValue(newVal) {
        if (this.fill_mode && this.isFocus) {
          this.value = newVal;
        }
      }
    },
    data() {
      return {
        uuid: Math.random().toString(36).substring(3, 8),
        fillValue: '',
        isFocus: false
      }
    }
}

function contains(a, obj) {
  var i = a.length;
  while (i--) {
    if (a[i] === obj) {
      return true;
    }
  }
  return false;
}
</script>

<style>
</style>
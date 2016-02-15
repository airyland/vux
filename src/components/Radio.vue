<template>
    <div class="weui_cells_title" v-show="title">{{title}}</div>
         <div class="weui_cells weui_cells_radio">
         <label class="weui_cell weui_check_label" for="radio_{{uuid}}_{{index}}" v-for="(index,one) in options">
             <div class="weui_cell_bd weui_cell_primary">
                 <p>{{one}}</p>
             </div>
             <div class="weui_cell_ft">
                 <input type="radio" class="weui_check" v-model="value" id="radio_{{uuid}}_{{index}}" value="{{one}}">
                 <span class="weui_icon_checked"></span>
             </div>
         </label>
     </div>
</template>

<script>
export default {
  ready () {
    console.log('ready')
  },
  props: {
    title: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    value: {
      type: String,
      required: false
    }
  },
  watch: {
    value: function (newVal) {
      this.$dispatch('change', newVal)
    }
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      uuid: Math.random().toString(36).substring(3, 8)
    }
  }
}
</script>
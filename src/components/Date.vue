<template>
   <div class="weui_cell">
      <div class="weui_cell_hd">
        <label for="" class="weui_label">{{title}}</label>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
          <input class="weui_input" :type="type" v-model="value"/>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      twoWay: true
    },
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: false,
      default: 'date'
    }
  }
}
</script>

<style>

</style>
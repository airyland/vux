<template>
  <div>
    <group>
      <cell title="used in cell">
        <x-icon type="ios-plus" class="cell-x-icon" @click="console"></x-icon>
      </cell>
    </group>
    <div style="padding: 15px;">
      <x-icon type="ios-ionic-outline" size="30"></x-icon>
      <x-icon type="ios-arrow-back" size="30"></x-icon>
      <x-icon type="ios-arrow-forward" size="30"></x-icon>
      <x-icon type="ios-arrow-up" size="30"></x-icon>
      <x-icon type="ios-arrow-right" size="30"></x-icon>
      <x-icon type="ios-arrow-down" size="30"></x-icon>
      <x-icon type="ios-arrow-left" size="30"></x-icon>
      <x-icon type="ios-arrow-thin-up" size="30"></x-icon>
      <x-icon type="ios-arrow-thin-right" size="30"></x-icon>
      <x-icon type="ios-arrow-thin-down" size="30"></x-icon>
      <x-icon type="ios-arrow-thin-left" size="30"></x-icon>
      <x-icon type="ios-circle-filled" size="30"></x-icon>
      <x-icon type="ios-circle-outline" size="30"></x-icon>
      <x-icon type="ios-checkmark-empty" size="30"></x-icon>
      <x-icon type="ios-checkmark-outline" size="30"></x-icon>
      <x-icon type="ios-checkmark" size="30"></x-icon>
      <x-icon type="ios-plus-empty" size="30"></x-icon>
      <x-icon type="ios-plus-outline" size="30"></x-icon>
      <x-icon type="ios-plus" size="30"></x-icon>
      <x-icon type="ios-close-empty" size="30"></x-icon>
      <x-icon type="ios-close-outline" size="30"></x-icon>
      <x-icon type="ios-close" size="30"></x-icon>
      <x-icon type="ios-minus-empty" size="30"></x-icon>
      <x-icon type="ios-minus-outline" size="30"></x-icon>
      <x-icon type="ios-minus" size="30"></x-icon>
      <x-icon type="ios-information-empty" size="30"></x-icon>
      <x-icon type="ios-information-outline" size="30"></x-icon>
      <x-icon type="ios-information" size="30"></x-icon>
      <x-icon type="ios-help-empty" size="30"></x-icon>
      <x-icon type="ios-help-outline" size="30"></x-icon>
      <x-icon type="ios-help" size="30"></x-icon>
      <x-icon type="ios-search" size="30"></x-icon>
      <x-icon type="ios-search-strong" size="30"></x-icon>
      <x-icon type="ios-star" size="30"></x-icon>
      <x-icon type="ios-star-half" size="30"></x-icon>
      <x-icon type="ios-star-outline" size="30"></x-icon>
      <x-icon type="ios-heart" size="30"></x-icon>
      <x-icon type="ios-heart-outline" size="30"></x-icon>
    </div>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'

export default {
  components: {
    Group,
    Cell
  },
  methods: {
    console () {
      console.log('click')
    }
  }
}
</script>

<style>
.vux-x-icon {
  fill: #F70968;
}
.cell-x-icon {
  display: block;
  fill: green;
}
</style>
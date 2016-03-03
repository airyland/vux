<template>
  <div>
    <group>
      <cell title="Default">
        <div slot="value" style="position:relative;">
          <spinner class="vux-cell-loading"></spinner>
        </div>
      </cell>
      <cell title="Custom color">
        <div slot="value" style="position:relative;">
          <spinner class="red vux-cell-loading"></spinner>
        </div>
      </cell>
    </group>
    <br>
    <br>
    <p style="text-align:center">
      <spinner></spinner>
      <span style="display:block;padding-top:10px;">Loading</span>
    </p>
  </div>
</template>

<script>
import { Spinner, Group, Cell } from '../components/'
export default {
  components: {
    Spinner,
    Group,
    Cell
  }
}
</script>

<style>
.vux-cell-loading {
  position: absolute;
  top: 50%;
  right: 15px;
}
.red .weui_loading_leaf:before {
  background-color: red;
}
.loading-text span{
  padding-right: 20px;
}
</style>
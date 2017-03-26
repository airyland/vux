<template>
  <div>
    <group>
      <cell title="cell" value="hello" is-link></cell>
      <cell-box is-link>
        cell-box long long long long long long long
      </cell-box>
      <cell-box>
        cell-box hello world hello world hello world
      </cell-box>
      <cell title="cell" value="hello" is-link></cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell, CellBox } from 'vux'

export default {
  components: {
    Group,
    Cell,
    CellBox
  }
}
</script>
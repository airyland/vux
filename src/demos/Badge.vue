<template>
  <div>
    <badge text="1"></badge>
    <br>
    <badge text="123"></badge>
    <br>
    <group>
      <cell title="Used in a Cell" is-link>
        <p slot="value" class="vux-center-v">
          New Message &nbsp;
          <badge text="8"></badge>
        </p>
      </cell>
      <cell title="Used in a Cell" is-link>
        <p slot="value" class="vux-center-v">
          New Message &nbsp;
          <badge text="888"></badge>
        </p>
      </cell>
    </group>
  </div>
</template>

<script>
import { Badge, Group, Cell } from '../components'

export default {
  components: {
    Badge,
    Group,
    Cell
  }
}
</script>

<template>
  <div>
    <group-title>types: default, primary, warn</group-title>
    <box gap="10px 10px">
      <x-button>submit</x-button>
      <x-button type="primary">primary</x-button>
      <x-button type="warn">Delete</x-button>

      <group-title>disabled</group-title>
      <x-button disabled>disable submit</x-button>
      <x-button type="primary" disabled>disable primary</x-button>
      <x-button type="warn" disabled>disable Delete</x-button>

      <group-title>use :text and :disabled</group-title>
      <x-button :text="submit001" :disabled="disable001" @click="processButton001" type="primary"></x-button>

      <group-title>combined with flexbox</group-title>
      <flexbox>
        <flexbox-item>
          <x-button type="primary">primary</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button type="warn">Delete</x-button>
        </flexbox-item>
      </flexbox>
      <group-title>combined with flexbox</group-title>
      <flexbox>
        <flexbox-item>
          <x-button type="default">default</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button type="primary">primary</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button type="warn">Delete</x-button>
        </flexbox-item>
      </flexbox>

    </box>

  </div>
</template>

<script>
import { XButton, Box, GroupTitle, Group, Flexbox, FlexboxItem } from '../components/'

export default {
  components: {
    XButton,
    Box,
    GroupTitle,
    Group,
    Flexbox,
    FlexboxItem
  },
  methods: {
    change: function (value) {
      console.log('change:', value)
    },
    processButton001: function () {
      this.submit001 = 'processing'
      this.disable001 = true
    }
  },
  data: function () {
    return {
      submit001: 'click me',
      disable001: false
    }
  }
}
</script>

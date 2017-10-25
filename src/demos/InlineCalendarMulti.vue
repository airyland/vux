<template>
  <div>
    <inline-calendar v-model="value" @on-change="onChange"></inline-calendar>
    <br>
    {{ value }}
    <div style="padding:15px;">
      <x-button type="primary" @click.native="updateValue">update value</x-button>
    </div>
  </div>
</template>

<script>
import { InlineCalendar, dateFormat, XButton } from 'vux'

const today = dateFormat(new Date(), 'YYYY-MM-DD')
const yesterday = dateFormat(new Date().getTime() - 24 * 3600 * 1000, 'YYYY-MM-DD')

export default {
  components: {
    InlineCalendar,
    XButton
  },
  data () {
    return {
      value: [yesterday, today]
    }
  },
  methods: {
    onChange (val) {
      console.log('on-change', val)
    },
    updateValue () {
      if (this.value.length === 1) {
        this.value = [yesterday, today]
      } else {
        this.value = [today]
      }
    }
  }
}
</script>

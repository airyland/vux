<template>
  <div>
    <textarea v-model="code" style="display:block;width:100%;height:80px;font-size:14px;padding:10px;">
    </textarea>
    <div v-transfer-dom="dom">
      <x-dialog v-model="show1" v-if="insert">
        <span @click="show1=false">Close me</span>
      </x-dialog>
    </div>
    <div style="padding:15px;">
      <x-button type="primary" @click.native="show1=true">show1 = true</x-button>
      <x-button type="primary" @click.native="dom=true">transfer dom</x-button>
      <x-button type="primary" @click.native="dom=false">transfer back</x-button>
      <x-button type="primary" @click.native="insert=false">v-if false</x-button>
      <x-button type="primary" @click.native="insert=true">v-if true</x-button>
    </div>
  </div>
</template>

<script>
import { TransferDomDirective as transferDom, XDialog, XButton } from 'vux'

export default {
  components: {
    XDialog,
    XButton
  },
  directives: {
    transferDom
  },
  data () {
    return {
      show1: false,
      dom: true,
      insert: true,
      code: `<div v-transfer-dom="dom">
  <x-dialog v-model="show1" v-if="insert">
    <span @click="show1=false">Close me</span>
  </x-dialog>
</div>`
    }
  }
}
</script>
<template>
  <div>
    <canvas
    :style="{
      height: `${size}px`,
      width: `${size}px`
    }"
    :height="size"
    :width="size"
    v-show="type === 'canvas'"
    ref="canvas"></canvas>
    <img
    :src="imgData"
    v-if="type === 'img'"
    :style="{
      height: `${size}px`,
      width: `${size}px`
    }">
  </div>
</template>

<script>
import QRCodeImpl from 'qr.js/lib/QRCode'
import ErrorCorrectLevel from 'qr.js/lib/ErrorCorrectLevel'

export default {
  name: 'qrcode',
  props: {
    value: String,
    size: {
      type: Number,
      default: 160
    },
    level: {
      type: String,
      default: 'L'
    },
    bgColor: {
      type: String,
      default: '#FFFFFF'
    },
    fgColor: {
      type: String,
      default: '#000000'
    },
    type: {
      type: String,
      default: 'img'
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.render()
    })
  },
  data () {
    return {
      imgData: ''
    }
  },
  watch: {
    value () {
      this.render()
    },
    size () {
      this.render()
    },
    level () {
      this.render()
    },
    bgColor () {
      this.render()
    },
    fgColor () {
      this.render()
    }
  },
  methods: {
    render () {
      if (typeof this.value === 'undefined') {
        return
      }

      const qrcode = new QRCodeImpl(-1, ErrorCorrectLevel[this.level])
      qrcode.addData(this.value)
      qrcode.make()

      const canvas = this.$refs.canvas

      const ctx = canvas.getContext('2d')
      const cells = qrcode.modules
      const tileW = this.size / cells.length
      const tileH = this.size / cells.length
      const scale = (window.devicePixelRatio || 1) / getBackingStorePixelRatio(ctx)
      canvas.height = canvas.width = this.size * scale
      ctx.scale(scale, scale)

      cells.forEach((row, rdx) => {
        row.forEach((cell, cdx) => {
          ctx.fillStyle = cell ? this.fgColor : this.bgColor
          const w = (Math.ceil((cdx + 1) * tileW) - Math.floor(cdx * tileW))
          const h = (Math.ceil((rdx + 1) * tileH) - Math.floor(rdx * tileH))
          ctx.fillRect(Math.round(cdx * tileW), Math.round(rdx * tileH), w, h)
        })
      })
      if (this.type === 'img') {
        this.imgData = canvas.toDataURL('image/png')
      }
    }
  }
}

function getBackingStorePixelRatio (ctx) {
  return (
    ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio ||
    1
  )
}
</script>

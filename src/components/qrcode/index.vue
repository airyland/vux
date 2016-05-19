<template>
  <canvas
  :style="{height: size, width: size}"
  :height="size"
  width="size"></canvas>
</template>

<script>
import QRCodeImpl from 'qr.js/lib/QRCode'
import ErrorCorrectLevel from 'qr.js/lib/ErrorCorrectLevel'

export default {
  props: {
    value: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      default: 80
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
    }
  },
  ready () {
    this.render()
  },
  watch: {
    'value+size+level+bgColor+fgColor' () {
      this.render()
    }
  },
  methods: {
    render () {
      const qrcode = new QRCodeImpl(-1, ErrorCorrectLevel[this.level])
      qrcode.addData(this.value)
      qrcode.make()

      const canvas = this.$el

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

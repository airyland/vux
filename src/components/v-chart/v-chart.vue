<template lang="html">
  <div
    :style="{
      backgroundColor: backgroundColor,
      width: width + 'px',
      height: height + 'px'
    }"
    @touchstart="onTouchstart">
    <canvas height="260" class="noselect" ref="chart"></canvas>
    <slot></slot>
  </div>
</template>

<script>

// const shapeMap = {
//   point: ['circle', 'hollowCircle', 'rect'],
//   line: ['line', 'smooth', 'dash'],
//   area: ['area', 'smooth'],
//   interval: ['rect'],
//   polygon: ['polygon'],
//   schema: ['candle']
// }

import F2 from '@antv/f2'

export default {
  props: {
    width: Number,
    height: Number,
    backgroundColor: {
      type: String,
      default: '#fff'
    },
    data: {
      type: Array
    },
    tooltip: {
      type: Object
    },
    shape: {
      type: String,
      default: 'line'
    },
    preventRender: {
      type: Boolean,
      default: false
    },
    preventDefault: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      xField: '',
      yField: '',
      hasPoint: false,
      pointStyle: {},

      guideTags: [],

      areaOptions: null,
      lineOptions: null,
      tooltipOptions: null,
      legendOptions: null,

      barOptions: null,

      pieOptions: null,

      guideOptions: null,

      pointOptions: null,

      xFieldOptions: {},
      yFieldOptions: {},

      guides: [],

      seriesField: '',

      xAxisOptions: null,
      yAxisOptions: null,

      autoAlignXAxis: undefined
    }
  },
  computed: {
    currentData () {
      if (this.pieOptions) {
        return this.data.slice().map(item => {
          item.a = '1'
          return item
        })
      }
      return this.data
    },
    currentXFieldOptions (val) {
      const defaultOptions = {
        tickCount: 5
      }
      if (!this.barOptions) {
        defaultOptions.range = [0, 1]
      } else {
        defaultOptions.tickCount = 0
      }
      // auto detect if is timeCat
      if (!this.xFieldOptions) {
        if (/\d{4}-\d{2}-\d{2}/.test(this.data[0][this.xField])) {
          return Object.assign({}, defaultOptions, {
            type: 'timeCat',
            tickCount: 3
          })
        } else {
          return defaultOptions
        }
      }

      return Object.assign({}, defaultOptions, this.xFieldOptions)
    },
    currentYFieldOptions (val) {
      const defaultOptions = {
        tickCount: 5
      }
      if (!val) {
        return defaultOptions
      }

      return Object.assign({}, defaultOptions, this.yFieldOptions)
    }
  },
  watch: {
    data () {
      this.changeData(this.data)
    }
  },
  methods: {
    onTouchstart (e) {
      this.preventDefault && e.preventDefault()
    },
    set (name, options) {
      this[`${name}Options`] = options
    },
    changeData (data) {
      this.chart && this.chart.changeData(data)
    },
    setField (axis, item) {
      this[`${axis}Field`] = item
    },
    repaint () {
      this.chart.repaint()
    },
    rerender () {
      this.destroy()
      this.render()
    },
    destroy () {
      this.chart && this.chart.destroy()
    },
    addGuide (options) {
      this.guides.push(options)
    },
    setScale (options) {
      if (options.x) {
        this.xFieldOptions = options.x
      }
      if (options.y) {
        this.yFieldOptions = options.y
      }
    },
    setAxis (options) {
      if (options.x) {
        this.xAxisOptions = options
        if (typeof options.autoAlign !== 'undefined') {
          this.autoAlignXAxis = options.autoAlign
        }
      }
      if (options.y) {
        this.yAxisOptions = options
      }
    },
    buildColor (c) {
      let color = c || ''
      if (Array.isArray(c) && Array.isArray(c[0])) {
        const ctx = this.$refs.chart.getContext('2d')
        color = ctx.createLinearGradient(0, 0, window.innerWidth, 0)
        c.forEach(c => {
          color.addColorStop(c[0], c[1])
        })
      }
      return color
    },
    setPie (options = {}) {
      this.pieOptions = options
    },
    setBar (options = {}) {
      this.barOptions = options
    },
    setLegend (options) {
      this.legendOptions = options
    },
    setTooltip (options) {
      this.tooltipOptions = options
    },
    setArea (options) {
      this.areaOptions = options
    },
    setGuide (options) {
      this.guideOptions = options
    },
    setLine (options) {
      this.lineOptions = options
    },
    setPoint (options) {
      this.pointOptions = options
    },
    buildPosition () {
      return `${this.xField}*${this.yField}`
    },
    getFields () {
      if (this.xField && this.yField) {
        return
      }

      if (this.data && this.data.length) {
        const keys = Object.keys(this.data[0])
        if (keys.length >= 2) {
          let indexes = [0, 1]
          const type1 = typeof this.data[0][keys[0]]
          const type2 = typeof this.data[0][keys[1]]
          if (type1 === 'number' && type2 !== 'number') {
            indexes = [1, 0]
          } else if (type1 === 'string' && type2 === 'string' && keys[2] === 'value') {
            indexes = [0, 2]
          }
          this.xField = keys[indexes[0]]
          this.yField = keys[indexes[1]]
        }
      }
    },
    render () {
      const _this = this
      let autoAlignXAxis = this.autoAlignXAxis
      if (this.barOptions) {
        autoAlignXAxis = false
      }
      if (typeof autoAlignXAxis === 'undefined') {
        autoAlignXAxis = true
      }
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight
      const chart = new F2.Chart({
        el: this.$refs.chart,
        width: this.width || windowWidth,
        height: this.height ? this.height : (windowWidth > windowHeight ? (windowHeight - 54) : windowWidth * 0.707),
        pixelRatio: this.$devicePixelRatio || window.devicePixelRatio,
        ...this.$attrs
      })
      if (this.preventRender) {
        this.$emit('on-render', { chart })
        return
      }

      if (!this.data || !this.data.length) {
        return
      }

      this.getFields()

      chart.source(this.currentData)

      chart.scale(this.xField, this.currentXFieldOptions)
      chart.scale(this.yField, this.currentYFieldOptions)

      if (this.legendOptions) {
        if (this.legendOptions.disabled) {
          chart.legend(false)
        } else {
          chart.legend(this.legendOptions)
        }
      }

      if (this.tooltipOptions) {
        if (this.barOptions) {
          this.tooltipOptions.showCrosshairs = false
        }
        if (!this.tooltipOptions.disabled) {
          // handle show-value-in-legend
          if (this.tooltipOptions.showValueInLegend) {
            const customTooltip = {
              custom: true, // 自定义 tooltip 内容框
              onChange: function (obj) {
                const legend = _this.chart.get('legendController').legends.top[0]
                const tooltipItems = obj.items
                const legendItems = legend.items
                const map = {}
                legendItems.map(item => {
                  map[item.name] = JSON.parse(JSON.stringify(item))
                })
                tooltipItems.map(item => {
                  const { name, value } = item
                  if (map[name]) {
                    map[name].value = value
                  }
                })
                legend.setItems(Object.values(map))
              },
              onHide: function () {
                const VChart = _this.chart
                const legend = VChart.get('legendController').legends.top[0]
                legend.setItems(VChart.getLegendItems().type)
              }
            }
            this.tooltipOptions = {
              ...this.tooltipOptions,
              ...customTooltip
            }
          }
          chart.tooltip(this.tooltipOptions)
        } else {
          chart.tooltip(false)
        }
      } else {
        chart.tooltip({
          showCrosshairs: !this.barOption
        })
      }

      if (autoAlignXAxis) {
        chart.axis(this.xField, {
          label (text, index, total) {
            const textCfg = {}
            if (index === 0) {
              textCfg.textAlign = 'left'
            }
            if (index === total - 1) {
              textCfg.textAlign = 'right'
            }
            return textCfg
          }
        })
      }

      if (this.lineOptions) {
        const { shape, adjust } = this.lineOptions
        let seriesField = this.lineOptions.seriesField || ''
        let colors = this.buildColor(this.lineOptions.colors)
        let rs = chart.line().position(this.buildPosition()).shape(shape)

        if (!seriesField && colors) {
          rs.color(colors)
        }
        if (seriesField) {
          if (colors && colors.length) {
            rs.color(seriesField, colors)
          } else {
            rs.color(seriesField)
          }
        }
        if (adjust) {
          rs.adjust(adjust)
        }
      }

      if (this.guides.length) {
        this.guides.forEach(guide => {
          chart.guide()[guide.type](guide.options)
        })
      }

      if (this.areaOptions) {
        const { adjust, seriesField } = this.areaOptions
        let color = this.buildColor(this.areaOptions.colors)
        let rs = chart.area().position(this.buildPosition()).shape(this.areaOptions.shape || '')
        if (!seriesField && color) {
          rs.color(color)
        } else {
          rs.color(seriesField || '', color)
        }

        if (adjust) {
          rs.adjust(adjust)
        }
      }

      if (this.barOptions) {
        const { adjust, seriesField } = this.barOptions
        let color = this.buildColor(this.barOptions.colors)
        let rs = chart.interval().position(this.buildPosition())
        if (!seriesField && color) {
          rs.color(color)
        } else {
          rs.color(seriesField || '', color)
        }

        if (adjust) {
          rs.adjust(adjust)
        }
      }

      ['x', 'y'].forEach(axis => {
        if (this[`${axis}AxisOptions`]) {
          chart.axis(this[`${axis}Field`], this[`${axis}Field`].disabled ? false : this[`${axis}AxisOptions`])
        }
      })

      if (this.pieOptions) {
        chart.coord(this.pieOptions.coord, this.pieOptions)
        chart.axis(false)
        chart.interval()
        .position('a*percent')
        .color(this.pieOptions.seriesField, (this.pieOptions.colors && this.pieOptions.colors.length) ? this.pieOptions.colors : '')
        .adjust('stack')
        .style({
          lineWidth: 1,
          stroke: '#fff',
          lineJoin: 'round',
          lineCap: 'round'
        })
        .animate({
          appear: {
            duration: 1200,
            easing: 'bounceOut'
          }
        })
      }

      if (this.pointOptions) {
        const { seriesField } = this.pointOptions
        let rs = chart.point().position(this.buildPosition()).style(this.pointOptions.styles)

        let color = this.buildColor(this.pointOptions.colors)
        if (!seriesField && color) {
          rs.color(color)
        } else {
          rs.color(seriesField || '', color)
        }
      }
      chart.render()
      this.chart = chart
    }
  },
  async mounted () {
    await this.$nextTick()
    this.render()
    window.addEventListener('resize', this.render)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.render)
    this.destroy()
  }
}
</script>

<style lang="css">
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}
</style>

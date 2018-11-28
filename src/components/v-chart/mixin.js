import { camelAttrs } from './util'

const defaultShapeMap = {
  line: 'line',
  point: 'circle',
  area: 'area'
}

export default {
  props: {
    colors: [String, Array],
    seriesField: String,
    adjust: [String, Object]
  },
  created () {
    this.$parent.set(this.chartName, {
      shape: defaultShapeMap[this.chartName] || '',
      ...this.$props,
      ...camelAttrs(this.$attrs)
    })
  },
  render () {}
}

<script>
const camel = function (key) {
  return key.replace(/(-[a-z])/g, function ($1) { return $1.toUpperCase().replace('-', '') })
}
const camelBatch = function (attrs) {
  for (let i in attrs) {
    const key = camel(i)
    attrs[key] = attrs[i]
    if (key !== i) {
      delete attrs[i]
    }
  }
  return attrs
}
export default {
  props: {
    coord: {
      type: String,
      default: 'polar'
    },
    transposed: {
      type: Boolean,
      default: true
    },
    serialField: {
      type: String
    },
    colors: {
      type: Array
    }
  },
  created () {
    this.$parent.setPie({
      ...this.$props,
      ...camelBatch(this.$attrs)
    })
  },
  render () {}
}
</script>

export default function () {
  return {
    title: [String, Number],
    value: [String, Number, Array, Boolean],
    isLink: Boolean,
    isLoading: Boolean,
    inlineDesc: [String, Number],
    primary: {
      type: String,
      default: 'title'
    },
    link: [String, Object],
    valueAlign: [String, Boolean, Number],
    borderIntent: {
      type: Boolean,
      default: true
    },
    arrowDirection: String // down or up
  }
}

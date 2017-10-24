export default () => ({
  value: {
    type: [String, Array],
    default: ''
  },
  renderMonth: {
    type: Array, // [2018, 8]
    default () {
      return [null, null]
    }
  },
  startDate: {
    type: String
  },
  endDate: {
    type: String
  },
  showLastMonth: {
    type: Boolean,
    default: true
  },
  showNextMonth: {
    type: Boolean,
    default: true
  },
  highlightWeekend: {
    type: Boolean,
    default: false
  },
  returnSixRows: {
    type: Boolean,
    default: true
  },
  hideHeader: {
    type: Boolean,
    default: false
  },
  hideWeekList: {
    type: Boolean,
    default: false
  },
  replaceTextList: {
    type: Object,
    default () {
      return {}
    }
  },
  weeksList: {
    type: Array,
    validator (val) {
      if (val) {
        return val.length === 7 || val.length === 0
      }
      return true
    }
  },
  renderFunction: {
    type: Function,
    default: () => ''
  },
  renderOnValueChange: {
    type: Boolean,
    default: true
  },
  disablePast: {
    type: Boolean,
    default: false
  },
  disableFuture: {
    type: Boolean,
    default: false
  },
  disableWeekend: {
    type: Boolean,
    default: false
  },
  disableDateFunction: Function,
  marks: {
    type: Array,
    default () {
      return []
    }
  }
})

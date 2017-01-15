export default () => ({
  value: {
    type: String,
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
    default: () => ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  },
  customSlotFn: {
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
  }
})

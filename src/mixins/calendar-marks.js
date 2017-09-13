export default {
  methods: {
    isShowBottomDot (i) {
      if (!this.marks.length) {
        return
      }
      const match = this.marks.filter(one => one.date === i.formatedDate)
      if (match.length) {
        if (match[0].bottomDot) {
          return true
        }
      }
      return false
    },
    isShowTopTip (i, returnWhat) {
      if (!this.marks.length) {
        return
      }
      const match = this.marks.filter(one => one.date === i.formatedDate)
      if (match.length) {
        const item = match[0]
        if (item.topTip) {
          if (returnWhat === 'style') {
            return {
              color: item.topTip.color
            }
          }
          if (returnWhat === 'text') {
            return item.topTip.text
          }
          return true
        }
      }
      return false
    },
    getMarkStyle (i) {
      if (!this.marks.length) {
        return
      }
      const match = this.marks.filter(one => one.date === i.formatedDate)
      const isSelected = i.formatedDate === this.currentValue
      if (match.length) {
        return {
          backgroundColor: isSelected ? '' : match[0].backgroundColor,
          color: isSelected ? '' : match[0].color,
          border: isSelected ? '' : match[0].border
        }
      }
    }
  }
}


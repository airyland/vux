import filter from 'array-filter'

const Manager = class {
  constructor (data, count) {
    this.data = data
    this.count = count
  }

  getChildren (value) {
    return filter(this.data, one => {
      return one.parent === value
    })
  }

  getFirstColumn () {
    return filter(this.data, one => {
      return !one.parent || one.parent === 0
    })
  }

  getColumns (value) {
    var datas = []
    for (var i = 0; i < this.count; i++) {
      if (i === 0) {
        datas.push(this.getFirstColumn())
      } else {
        // 没有数据时，取得上一级的第一个
        if (!value[i]) {
          var topValue = datas[i - 1][0].value
          datas.push(this.getChildren(topValue))
        } else {
          datas.push(this.getChildren(value[i - 1]))
        }
      }
    }
    return datas
  }
}

export default Manager

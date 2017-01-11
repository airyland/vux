const Roller = class {
  constructor (opts) {
    this.container = typeof opts.container === 'string' ? document.querySelector(opts.container) : opts.container
    this.width = opts.width || 1
    if (!this.container) {
      throw Error('no container')
    }
    this.container.style.overflow = 'hidden'
    this.rollHeight = parseInt(window.getComputedStyle(this.container).height)

    if (this.rollHeight < 1) {
      this.container.style.height = '20px'
      this.rollHeight = 20
    }
    this.setWidth()
  }

  roll (n) {
    var self = this
    this.number = parseInt(n) + ''
    if (this.number.length < this.width) {
      this.number = new Array(this.width - this.number.length + 1).join('0') + this.number
    } else if (this.number.length > this.width) {
      this.width = this.number.length
      this.setWidth()
    }
    Array.prototype.forEach.call(this.container.querySelectorAll('.num'), function (item, i) {
      var currentNum = parseInt(item.querySelector('div:last-child').innerHTML)
      var goalNum = parseInt(self.number[i])
      var gapNum = 0
      var gapStr = ''
      if (currentNum === goalNum) {
        return
      } else if (currentNum < goalNum) {
        gapNum = goalNum - currentNum
        for (let j = currentNum; j < goalNum + 1; j++) {
          gapStr += '<div>' + j + '</div>'
        }
      } else {
        gapNum = 10 - currentNum + goalNum
        for (let j = currentNum; j < 10; j++) {
          gapStr += '<div>' + j + '</div>'
        }
        for (let j = 0; j < goalNum + 1; j++) {
          gapStr += '<div>' + j + '</div>'
        }
      }
      item.style.cssText += '-webkit-transition-duration:0;s-webkit-transform:translateY(0)'
      item.innerHTML = gapStr
      let time = gapNum * (1 / 9)
      setTimeout(() => {
        item.style.cssText += '-webkit-transition-duration:' + time + 's;-webkit-transform:translateY(-' + self.rollHeight * gapNum + 'px)'
      }, 50)
    })
  }

  setWidth (n) {
    n = n || this.width
    var str = ''
    for (var i = 0; i < n; i++) {
      str += '<div class="num" style="float:left;height:100%;line-height:' + this.rollHeight + 'px"><div>0</div></div>'
    }
    this.container.innerHTML = str
  }
}

export default Roller

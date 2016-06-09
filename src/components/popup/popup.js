const popupDialog = function (option) {
  this.params = {}
  if (Object.prototype.toString.call(option) === '[object Object]') {
    this.params = {
      input: option.input || '',
      container: document.querySelector(option.input) || '',
      innerHTML: option.innerHTML || '',
      onOpen: option.onOpen || function () {},
      onClose: option.onClose || function () {}
    }
  }
  if (!!document.querySelectorAll('.vux-popup-mask').length <= 0) {
    this.divMask = document.createElement('a')
    this.divMask.className = 'vux-popup-mask'
    this.divMask.href = 'javascript:void(0)'
    document.body.appendChild(this.divMask)
  }
  let div
  if (!option.container) {
    div = document.createElement('div')
  } else {
    div = option.container
  }
  div.className = 'vux-popup-dialog'

  if (!option.container) {
    document.body.appendChild(div)
  }
  this.mask = document.querySelector('.vux-popup-mask')
  this.container = document.querySelectorAll('.vux-popup-dialog')
  this.container = this.container[this.container.length - 1]
  this._bindEvents()
  option = null
  return this
}

popupDialog.prototype.onClickMask = function () {
  this.hide(false)
}

popupDialog.prototype._bindEvents = function () {
  this.mask.addEventListener('click', this.onClickMask.bind(this), false)
}

popupDialog.prototype.show = function () {
  this.mask.classList.add('vux-popup-show')
  this.container.classList.add('vux-popup-show')
  this.params.onOpen && this.params.onOpen(this)
}

popupDialog.prototype.hide = function (shouldCallback = true) {
  this.container.classList.remove('vux-popup-show')
  if (!document.querySelector('.vux-popup-dialog.vux-popup-show')) {
    this.mask.classList.remove('vux-popup-show')
  }
  shouldCallback === false && this.params.onClose && this.params.onClose(this)
}

popupDialog.prototype.html = function (html) {
  this.container.innerHTML = html
}

popupDialog.prototype.destroy = function () {
  this.mask.removeEventListener('click', this.onClickMask.bind(this), false)
  this.mask && this.mask.parentNode && this.mask.parentNode.removeChild(this.mask)
}

export default popupDialog

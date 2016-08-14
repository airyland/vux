// not a good way but works well
window.__$vuxPopups = window.__$vuxPopups || {}
const popupDialog = function (option) {
  this.uuid = Math.random().toString(36).substring(3, 8)
  this.params = {}
  this.isShow = false
  if (Object.prototype.toString.call(option) === '[object Object]') {
    this.params = {
      input: option.input || '',
      container: document.querySelector(option.input) || '',
      innerHTML: option.innerHTML || '',
      hideOnBlur: option.hideOnBlur,
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
  div.className = 'vux-popup-dialog vux-popup-dialog-' + this.uuid

  if (!option.container) {
    document.body.appendChild(div)
  }
  this.mask = document.querySelector('.vux-popup-mask')
  this.container = document.querySelector('.vux-popup-dialog-' + this.uuid)
  this._bindEvents()
  option = null
  return this
}

popupDialog.prototype.onClickMask = function () {
  if (this.params.hideOnBlur && this.isShow) {
    this.hide(false)
  }
}

popupDialog.prototype._bindEvents = function () {
  this.params.hideOnBlur && this.mask.addEventListener('click', this.onClickMask.bind(this), false)
}

popupDialog.prototype.show = function () {
  this.mask.classList.add('vux-popup-show')
  this.container.classList.add('vux-popup-show')
  this.params.onOpen && this.params.onOpen(this)
  this.isShow = true
  window.__$vuxPopups[this.uuid] = 1
}

popupDialog.prototype.hide = function (shouldCallback = true) {
  this.container.classList.remove('vux-popup-show')
  if (!document.querySelector('.vux-popup-dialog.vux-popup-show')) {
    this.mask.classList.remove('vux-popup-show')
  }
  shouldCallback === false && this.params.onClose && this.params.hideOnBlur && this.params.onClose(this)
  this.isShow = false
  delete window.__$vuxPopups[this.uuid]
}

popupDialog.prototype.html = function (html) {
  this.container.innerHTML = html
}

popupDialog.prototype.destroy = function () {
  this.mask.removeEventListener('click', this.onClickMask.bind(this), false)
  this.mask && this.mask.parentNode && this.mask.parentNode.removeChild(this.mask)
  delete window.__$vuxPopups[this.uuid]
}

export default popupDialog

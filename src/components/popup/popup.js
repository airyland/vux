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
    this.divMask.dataset.uuid = '' // 用于多个popup共享一个mask
    this.divMask.href = 'javascript:void(0)'
    document.body.appendChild(this.divMask)
  }
  let div
  if (!option.container) {
    div = document.createElement('div')
  } else {
    div = option.container
  }

  div.className = `vux-popup-dialog vux-popup-dialog-${this.uuid}`
  if (!this.params.hideOnBlur) {
    div.className += ' vux-popup-mask-disabled'
  }

  this.div = div

  if (!option.container) {
    document.body.appendChild(div)
  }
  this.container = document.querySelector('.vux-popup-dialog-' + this.uuid)
  this.mask = document.querySelector('.vux-popup-mask')
  this.mask.dataset.uuid += `,${this.uuid}`
  this._bindEvents()
  option = null
  this.containerHandler = () => {
    this.mask && !/show/.test(this.mask.className) && setTimeout(() => {
      !/show/.test(this.mask.className) && (this.mask.style['zIndex'] = -1)
    }, 200)
  }

  this.container.addEventListener('webkitTransitionEnd', this.containerHandler)
  this.container.addEventListener('transitionend', this.containerHandler)

  return this
}

popupDialog.prototype.onClickMask = function () {
  this.params.hideOnBlur && this.params.onClose()
}

popupDialog.prototype._bindEvents = function () {
  this.params.hideOnBlur && this.mask.addEventListener('click', this.onClickMask.bind(this), false)
}

popupDialog.prototype.show = function () {
  this.mask.classList.add('vux-popup-show')
  this.mask.style['zIndex'] = 500
  this.container.classList.add('vux-popup-show')
  if (this.container.classList.contains('vux-popup')) {
    this.container.classList.remove('vux-popup')
    this.container.classList.add('vux-popup-dialog')
    this.container.classList.add('vux-popup-dialog' + this.uuid)
  }
  this.params.onOpen && this.params.onOpen(this)
  this.isShow = true
  window.__$vuxPopups[this.uuid] = 1
}

popupDialog.prototype.hide = function (shouldCallback = true) {
  this.container.classList.remove('vux-popup-show')
  if (!document.querySelector('.vux-popup-dialog.vux-popup-show')) {
    this.mask.classList.remove('vux-popup-show')
    setTimeout(() => {
      this.mask && !/show/.test(this.mask.className) && (this.mask.style['zIndex'] = -1)
    }, 400)
  }
  if (this.container.classList.contains('vux-popup')) {
    this.container.classList.remove('vux-popup')
    this.container.classList.add('vux-popup-dialog')
    this.container.classList.add('vux-popup-dialog' + this.uuid)
  }
  shouldCallback === false && this.params.onClose && this.params.hideOnBlur && this.params.onClose(this)
  this.isShow = false
  delete window.__$vuxPopups[this.uuid]
}

popupDialog.prototype.html = function (html) {
  this.container.innerHTML = html
}

popupDialog.prototype.destroy = function () {
  this.mask.dataset.uuid = this.mask.dataset.uuid.replace(new RegExp(`,${this.uuid}`, 'g'), '')
  if (!this.mask.dataset.uuid) {
    this.mask.removeEventListener('click', this.onClickMask.bind(this), false)
    this.mask && this.mask.parentNode && this.mask.parentNode.removeChild(this.mask)
  } else {
    this.hide()
  }
  this.container.removeEventListener('webkitTransitionEnd', this.containerHandler)
  this.container.removeEventListener('transitionend', this.containerHandler)
  delete window.__$vuxPopups[this.uuid]
}

export default popupDialog

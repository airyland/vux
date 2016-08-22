export default {
  acceptStatement: true,
  priority: 700,
  bind: function () {
    document.addEventListener('click', this.handler, true)
  },
  update: function (onClickOutside) {
    if (!this.descriptor.raw) {
      onClickOutside = function () {}
    }
    this.unbind()
    var el = this.el
    this.handler = function (e) {
      if (el && !el.contains(e.target)) {
        onClickOutside(e)
      }
    }
    this.bind()
  },
  unbind: function () {
    document.removeEventListener('click', this.handler, true)
  }
}

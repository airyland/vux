import Inview from './inview'
export default {
  update (option) {
    if (!option || !option.id) {
      return console.error('no id specified')
    }
    const _this = this
    let id = option.id
    const vm = this.vm
    vm.$nextTick(function () {
      _this._inview = Inview(_this.el, function (isInView, data) {
        if (isInView) {
          vm.$emit('on-view-enter', id)
        } else {
          vm.$emit('on-view-leave', id)
        }
      })
    })
  },
  unbind () {}
}

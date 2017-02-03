import wx from 'we-jssdk'

module.exports = {
  install (Vue) {
    Vue.prototype.$wechat = wx
  }
}

module.exports.$wechat = wx

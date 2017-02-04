import wx from 'weixin-js-sdk'

module.exports = {
  install (Vue) {
    Vue.prototype.$wechat = wx
  }
}

module.exports.$wechat = wx

const ua = navigator.userAgent

const isAndroid = /(Android);?[\s\/]+([\d.]+)?/.test(ua)
const isIpad = /(iPad).*OS\s([\d_]+)/.test(ua)
const isIpod = /(iPod)(.*OS\s([\d_]+))?/.test(ua)
const isIphone = !isIpad && /(iPhone\sOS)\s([\d_]+)/.test(ua)
const isWechat = /micromessenger/i.test(ua)

export default function (Vue) {
  Vue.mixin({
    created: function () {
      this.$device = {
        isAndroid,
        isIpad,
        isIpod,
        isIphone,
        isWechat
      }
    }
  })
}

<template>
  <div v-if="html" style="display: none;">
    <div data-config="debug" v-if="debug === false || debug === true">{{debug}}</div>
    <div data-config="config" v-if="!!config">{{config | stringify}}</div>
    <div data-config="jsApiList" v-if="!!jsApiList">{{jsApiList}}</div>
    <div data-config="common" v-if="!!common">{{common | stringify}}</div>
    <div data-config="appMessage" v-if="!!appMessage">{{appMessage | stringify}}</div>
    <div data-config="timeline" v-if="!!timeline">{{timeline | stringify}}</div>
    <div data-config="qq" v-if="!!qq">{{qq | stringify}}</div>
    <div data-config="weibo" v-if="!!weibo">{{weibo | stringify}}</div>
    <div data-config="qzone" v-if="!!qzone">{{qzone | stringify}}</div>
    <slot style="display:none;"></slot>
  </div>
</template>

<script>
  import wx from 'weixin-js-sdk'
  export default {
    props: {
      debug: {
        type: Boolean,
        default: false
      },
      html: {
        type: Boolean,
        default: false
      },
      config: [Object, String],
      jsApiList: {
        type: Array,
        default () {
          return []
        }
      },
      common: Object,
      timeline: Object, // 朋友圈独立配置
      appMessage: Object, // 朋友独立配置
      qq: Object, // QQ独立配置
      weibo: Object, // 腾讯微博独立配置
      qzone: Object // QQ空间独立配置
    },
    events: {
      share () {
        let _this = this
        setTimeout(() => {
          _this.share()
        }, 50) // 外部更新数据进来需要时间
      }
    },
    filters: {
      stringify (json) {
        return JSON.stringify(json)
      }
    },
    methods: {
      share () {
        const _this = this
        // 存在微信签名配置时，由内部签名；没有则由外部去签名
        if (Object.prototype.toString.call(_this.config) === '[object Object]') {
          let config = {}
          for (let i in _this.config) {
            config[i] = _this.config[i]
          }
          config.jsApiList = _this.jsApiList
          config.debug = _this.debug
          wx.config(config)
        }
        wx.ready(() => {
          for (let type of _this.jsApiList) {
            let hook = {
              // jsApiList -> 分享的配置变量
              'menu:share:timeline': 'timeline',
              'menu:share:appmessage': 'appMessage',
              'menu:share:qq': 'qq',
              'menu:share:weiboApp': 'weibo',
              'menu:share:QZone': 'qzone',
              // 分享的配置变量 -> 分享事件
              'timeline': 'onMenuShareTimeline',
              'appMessage': 'onMenuShareAppMessage',
              'qq': 'onMenuShareQQ',
              'weibo': 'onMenuShareWeibo',
              'qzone': 'onMenuShareQZone'
            }
            let _type = hook[type]
            if (!!_type && !!hook[_type] && !!_this[_type]) {
              let conf = Object.assign({}, _this.common, _this[_type]) // 分享配置内容
              wx[hook[_type]](conf) // 分享配置
            }
          } // for jsApiList
        }) // wx.ready
      } // component.methods.share
    } // component.methods
  }
</script>
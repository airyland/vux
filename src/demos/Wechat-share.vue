<template>
  <div style="padding: 0 10px;">
    <wshare :html="true"
      :debug="false"
      :config="config"
      :js-api-list="jsApiList"
      :common="common"
      :app-message="appMessage"
      :timeline="timeline"
      :qq="qq"
      :weibo="weibo"
      :qzone="qzone"
    ></wshare>
    <x-button type="primary" @click="share">配置全部分享</x-button>
    <x-button type="primary" @click="share('appmessage')">独立配置朋友</x-button>
    <x-button type="primary" @click="share('timeline')">独立配置朋友圈</x-button>
    <x-button type="primary" @click="share('qq')">独立配置QQ</x-button>
    <x-button type="primary" @click="share('weibo')">独立配置腾讯微博</x-button>
    <x-button type="primary" @click="share('qzone')">独立配置QQ空间</x-button>
  </div>
</template>

<script>
// import wx from 'weixin-js-sdk'
import { WechatShare as Wshare, XButton } from '../components/'
export default {
  components: {
    XButton,
    Wshare
  },
  ready () {
    const _this = this
    const url = `/api/wx/ticket?url=${encodeURIComponent(window.location.href)}`
    const xhr = new XMLHttpRequest()
    xhr.open('get', url, true)
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        const data = JSON.parse(xhr.responseText)
        if (data.code === 0) {
          _this.config = {
            appId: data.data.appId, // 必填，公众号的唯一标识
            timestamp: data.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
            signature: data.data.signature // 必填，签名，见附录1
          }
        } else {
          console.log(data.error_message)
        }
        // 外部配置， 上面则由内部配置
        // wx.config({
        //   debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        //   appId: data.data.appId, // 必填，公众号的唯一标识
        //   timestamp: data.data.timestamp, // 必填，生成签名的时间戳
        //   nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
        //   signature: data.data.signature, // 必填，签名，见附录1
        //   jsApiList: _this.jsApiList
        //   // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        // })
        // _this.$broadcast('share')
      }
    }
    xhr.send(null)
  },
  data () {
    return {
      config: '',
      jsApiList: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onaaaMenubbbSharecccQZone',
        'onMenuShareQZone'
      ],
      common: {
        title: 'Common title',
        desc: 'Common desc',
        link: `${window.location.href}?x-from=demo`,
        imgUrl: 'https://avatars0.githubusercontent.com/u/10149074?v=3&s=460&x-from=c',
        success () {
          alert('Common success')
        },
        fail () {
          alert('Common fail')
        },
        cancel () {
          alert('Common cancel')
        },
        complete () {
          alert('Common complete')
        }
      },
      appMessage: {},
      timeline: {},
      qq: {},
      weibo: {},
      qzone: {}
    }
  },
  methods: {
    share (type) {
      switch (type) {
        case 'all':
          break
        case 'timeline':
          this.timeline = {
            title: 'Timelin title',
            imgUrl: 'http://img3.imgtn.bdimg.com/it/u=4037440904,2274963605&fm=15&gp=0.jpg',
            link: 'https://vux.li?x-component=wechatshare&x-platform=timline',
            complete () {
              alert('Timelin share complete')
            },
            success () {
              alert('Timelin share success')
            },
            cancel () {
              alert('Timelin share cancel')
            },
            fail () {
              alert('Timelin share fail')
            }
          }
          alert('绑定朋友圈分享内容')
          break
        case 'appmessage':
          this.appMessage = {
            title: 'AppMessage title',
            desc: 'AppMessage desc',
            imgUrl: 'http://img2.everychina.com/img/42/c6/8c18f9d9f4335e919e37aa8b33e4-600x400c1-a07c/oil_painting_hhyy100x100.jpg',
            link: 'https://vux.li?x-component=wechatshare&x-platform=appmessage',
            complete () {
              alert('AppMessage share complete')
            },
            success () {
              alert('AppMessage share success')
            },
            cancel () {
              alert('AppMessage share cancel')
            },
            fail () {
              alert('AppMessage share fail')
            }
          }
          alert('绑定朋友分享内容')
          break
        case 'qq':
          this.jsApiList = [
            'onMenuShareQQ'
          ]
          this.qq = {
            title: 'QQ title',
            desc: 'QQ desc',
            imgUrl: 'http://img2.imgtn.bdimg.com/it/u=2078367081,1230191327&fm=15&gp=0.jpg',
            link: 'https://vux.li?x-component=wechatshare&x-platform=qq',
            complete () {
              alert('QQ share complete')
            },
            success () {
              alert('QQ share success')
            },
            cancel () {
              alert('QQ share cancel')
            },
            fail () {
              alert('QQ share fail')
            }
          }
          alert('绑定QQ分享内容')
          break
        case 'weibo':
          this.jsApiList = [
            'onMenuShareWeibo'
          ]
          this.weibo = {
            title: 'Weibo title',
            desc: 'Weibo desc',
            imgUrl: 'http://img1.imgtn.bdimg.com/it/u=3989044782,1936981385&fm=15&gp=0.jpg',
            link: 'https://vux.li?x-component=wechatshare&x-platform=weibo',
            complete () {
              alert('Weibo share complete')
            },
            success () {
              alert('Weibo share success')
            },
            cancel () {
              alert('Weibo share cancel')
            },
            fail () {
              alert('Weibo share fail')
            }
          }
          alert('绑定腾讯微博分享内容')
          break
        case 'qzone':
          this.qzone = {
            title: 'QZone title',
            desc: 'QZone desc',
            imgUrl: 'http://img1.imgtn.bdimg.com/it/u=4041381879,2965534196&fm=21&gp=0.jpg',
            link: 'https://vux.li?x-component=wechatshare&x-platform=qzone',
            success () {
              alert('QZone share success')
            },
            complete () {
              alert('QZone share complete')
            },
            cancel () {
              alert('QZone share cancel')
            },
            fail () {
              alert('QZone share fail')
            }
          }
          alert('绑定QQ空间分享内容')
          break
        default:
          // all
          this.jsApiList = [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone'
          ]
          this.title = 'Common title'
          this.timeline = {}
          this.appMessage = {}
          this.qq = {}
          this.weibo = {}
          this.qzone = {}
          alert('绑定全部的公共分享内容')
      }
      this.$broadcast('share')
    }
  }
}
</script>

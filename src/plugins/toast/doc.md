## 引入

``` js
import ToastPlugin from 'vux/src/plugins/alert'
Vue.use(ToastPlugin)
```
## 使用

``` js
this.$vux.toast.show({
  text: 'Hello World',
  onShow () {
    console.log('Plugin: I\'m showing')
  },
  onHide () {
    console.log('Plugin: I\'m hiding')
  }
})
this.$vux.toast.hide()
```
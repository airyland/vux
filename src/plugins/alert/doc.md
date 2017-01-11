## 引入

``` js
import AlertPlugin from 'vux/src/plugins/alert'
Vue.use(AlertPlugin)
```
## 使用

``` js
this.$vux.alert.show({
  title: 'Vux is Cool',
  content: 'Do you agree?',
  onShow () {
    console.log('Plugin: I\'m showing')
  },
  onHide () {
    console.log('Plugin: I\'m hiding')
  }
})
this.$vux.alert.hide()
```
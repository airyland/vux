---
title: 页面切换时显示loading
---

# 页面切换显示loading

移动端如果使用异步组件加载那么还是需要一点等待时间的，在网络慢时等待时间会更长。显示`Loading`状态缓解一下用户等待情绪就十分重要。

如果你使用`vue-router`和`vuex`，那么可以很容易实现。

首先，注册一个`module`来保存状态

``` js
const store = new Vuex.Store({}) // 这里你可能已经有其他 module

store.registerModule('vux', { // 名字自己定义
  state: {
    isLoading: false
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    }
  }
})
```

然后使用`vue-router`的`beforeEach`和`afterEach`来更改`loading`状态

``` js
router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})
  next()
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
})
```

在`App.vue`里使用`loading`组件并从`vuex`获取`isLoading`状态

``` html
<loading v-model="isLoading"></loading>
```

``` js
import { Loading } from 'vux'
import { mapState } from 'vuex'

export default {
  components: {
    Loading
  },
  computed: {
    ...mapState({
      isLoading: state => state.vux.isLoading
    })
  }
}
```

done.

如果你觉得在加载比较快时`Loading`组件一闪而过体验也不大好，那么你可以延迟设置`loading=false`。
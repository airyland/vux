---
nav: zh-CN
---


### Scroller_COM

<img width="100" src="http://qr.topscan.com/api.php?text=http%3A%2F%2Fvux.li%2Fdemos%2Fv2%2F%23%2Fcomponent%2Fscroller"/>

#### Demo

 <div style="width:377px;height:667px;display:inline-block;border:1px dashed #ececec;border-radius:5px;overflow:hidden;">
   <iframe src="http://vux.li/demos/v2/#/component/scroller" width="375" height="667" border="0" frameborder="0"></iframe>
 </div>

#### demo 代码

<p class="tip">下面的$t是Demo的i18n使用的翻译函数，一般情况下可以直接使用字符串。另外，下面代码隐藏了i18n标签部分的代码。</p>

``` html
<template>
  <div>
    <divider>{{ $t('A Horizontal Scroller without Scrollbar') }}</divider>
    <scroller lock-y :scrollbar-x=false>
      <div class="box1">
        <div class="box1-item" v-for="i in 7"><span>{{' ' + i + ' '}}</span></div>
      </div>
    </scroller>

    <divider>{{ $t('A Horizontal Scroller with Scrollbar') }}</divider>
    <scroller lock-y scrollbar-x>
      <div class="box1">
        <div class="box1-item" v-for="i in 7"><span>{{' ' + i + ' '}}</span></div>
      </div>
    </scroller>

    <divider>{{ $t('A Horizontal Scroller without bounce effect') }}</divider>
    <scroller lock-y scrollbar-x :bounce=false>
      <div class="box1">
        <div class="box1-item" v-for="i in 7"><span>{{' ' + i + ' '}}</span></div>
      </div>
    </scroller>

    <divider>{{ $t('A Vertical Scroller') }}</divider>
    <scroller lock-x height="200px">
      <div class="box2">
        <p v-for="i in 80">placeholder {{i}}</p>
      </div>
    </scroller>

    <divider>{{ $t('A Vertical Scroller with scrollbar') }}</divider>
    <scroller lock-x scrollbar-y height="200px" ref="scroller">
      <div class="box2">
        <p v-for="i in 20" v-if="showList1">placeholder {{ i + '' + i }}</p>
        <p v-for="i in 10" v-if="!showList1">placeholder {{ i }}</p>
        <x-button style="margin:10px 0;" type="primary" @click.native="onClickButton">{{ $t('Button') }}</x-button>
      </div>
    </scroller>
    <x-button @click.native="changeList" type="primary">{{ $t('show another list') }}</x-button>
  </div>
</template>



<script>
import { Scroller, Divider, Spinner, XButton } from 'vux'

export default {
  components: {
    Scroller,
    Divider,
    Spinner,
    XButton
  },
  data () {
    return {
      showList1: true
    }
  },
  methods: {
    onClickButton () {
      window.alert('click')
    },
    changeList () {
      this.showList1 = false
      this.$nextTick(() => {
        this.$refs.scroller.reset({
          top: 0
        })
      })
    }
  }
}
</script>

<style scoped>
.box1 {
  height: 100px;
  position: relative;
  width: 1490px;
}
.box1-item {
  width: 200px;
  height: 100px;
  background-color: #ccc;
  display:inline-block;
  margin-left: 15px;
  float: left;
  text-align: center;
  line-height: 100px;
}
.box1-item:first-child {
  margin-left: 0;
}
.box2-wrap {
  height: 300px;
  overflow: hidden;
}
</style>

```
#### 文档

#### Github Issue
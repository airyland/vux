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

<i18n>
A Horizontal Scroller without Scrollbar:
  zh-CN: 不带滚动条的水平 scroller
A Horizontal Scroller with Scrollbar:
  zh-CN: 显示滚动条的水平 scroller 
A Horizontal Scroller without bounce effect:
  zh-CN: 没有边缘回滚效果的水平 scroller
A Vertical Scroller:
  zh-CN: 竖向 scroller
A Vertical Scroller with scrollbar:
  zh-CN: 显示滚动条的竖向 scroller
show another list:
  zh-CN: 改变显示的内容
Button:
  zh-CN: 按钮
</i18n>

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

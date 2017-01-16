---
nav: zh-CN
---


### Badge_COM

<img width="100" src="http://qr.topscan.com/api.php?text=http%3A%2F%2Fvux.li%2Fdemos%2Fv2%2F%23%2Fcomponent%2Fbadge"/>

#### Demo

 <div style="width:377px;height:667px;display:inline-block;border:1px dashed #ececec;border-radius:5px;overflow:hidden;">
   <iframe src="http://vux.li/demos/v2/#/component/badge" width="375" height="667" border="0" frameborder="0"></iframe>
 </div>

#### demo 代码

<p class="tip">下面的$t是Demo的i18n使用的翻译函数，一般情况下可以直接使用字符串。另外，下面代码隐藏了i18n标签部分的代码。</p>

``` html
<template>
  <div>
    <badge text="1"></badge>
    <br>
    <badge text="123"></badge>
    <br>
    <group :title="$t('Used in a Cell')">
      <cell :title="$t('single digit')" is-link>
        <div class="badge-value vux-center-v" slot="value">
          {{ $t('New Message') }} &nbsp;
          <badge text="8"></badge>
        </div>
      </cell>
      <cell :title="$t('Big Number')" is-link>
        <div class="badge-value vux-center-v" slot="value">
          {{ $t('New Message') }} &nbsp;
          <badge text="888"></badge>
        </div>
      </cell>
    </group>
  </div>
</template>



<script>
import { Badge, Group, Cell } from 'vux'

export default {
  components: {
    Badge,
    Group,
    Cell
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/center.less';

.badge-value {
  display: inline-block!important;
}
</style>

```
#### 文档

#### Github Issue
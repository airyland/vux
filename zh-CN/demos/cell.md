---
nav: zh-CN
---


### Cell_COM

<img width="100" src="http://qr.topscan.com/api.php?text=http%3A%2F%2Fvux.li%2Fdemos%2Fv2%2F%23%2Fcomponent%2Fcell"/>

#### Demo

 <div style="width:377px;height:667px;display:inline-block;border:1px dashed #ececec;border-radius:5px;overflow:hidden;">
   <iframe src="http://vux.li/demos/v2/#/component/cell" width="375" height="667" border="0" frameborder="0"></iframe>
 </div>

#### demo 代码

<p class="tip">下面的$t是Demo的i18n使用的翻译函数，一般情况下可以直接使用字符串。另外，下面代码隐藏了i18n标签部分的代码。</p>

``` html
<template>
  <div>
    <group>
      <cell :title="$t('My Account')" :value="$t('Protected')"></cell>
    </group>

    <group :title="$t('use is-link to show arrow')">
      <cell :title="$t('Notifications')" is-link></cell>
      <cell :title="$t('Privacy')" is-link></cell>
      <cell :title="$t('General')" is-link>
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=">
      </cell>
    </group>

    <group>
      <cell :title="$t('Notifications')" :value="$t('Enabled')"></cell>
    </group>

    <group :title="$t('use slot for complexed content')">
      <cell :title="$t('slot content')">
        <div slot="value">
          <span style="color: green">{{$t('Hi, I\'m Vux.')}}</span>
        </div>
      </cell>
    </group>

    <group :title="$t('isLink is set to true when link exists')">
      <cell :title="$t('Go to Radio Demo')" link="/component/radio" inline-desc='link="/component/radio"'></cell>
      <cell :title="$t('Go to Demo')" :link="{path:'/demo'}" inline-desc=':link={path:"/demo"}'></cell>
      <cell Ltitle="$t('http link')" link="https://vux.li" inline-desc='link="https://vux.li"'></cell>
    </group>
  </div>
</template>



<script>
import { Cell, Group } from 'vux'

export default {
  components: {
    Group,
    Cell
  }
}
</script>

```
#### 文档

#### Github Issue
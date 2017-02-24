<template>
  <div>
    <group>
      <cell :title="$t('My Account')" :value="$t('Protected')" @click.native="onClick"></cell>
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
      <cell :title="$t('http link')" link="https://vux.li" inline-desc='link="https://vux.li"'></cell>
    </group>
  </div>
</template>

<i18n>
My Account:
  zh-CN: 我的账号
Protected:
  zh-CN: 保护中
use is-link to show arrow:
  zh-CN: 使用 is-link 显示右边箭头
Notifications:
  zh-CN: 接收通知
Enabled:
  zh-CN: 已开启
Privacy:
  zh-CN: 隐私
General:
  zh-CN: 通用
use slot for complexed content:
  zh-CN: 使用slot显示复杂内容
slot content:
  zh-CN: slot 内容
Hi, I'm Vux.:
  zh-CN: 你好哇，感谢关注 Vux
isLink is set to true when link exists:
  zh-CN: 当有设置link属性时，isLink属性会设为true以显示箭头
Go to Radio Demo:
  zh-CN: 前往Radio页面
Go to Demo:
  zh-CN: 前往Demo页面
http link:
  zh-CN: 站外链接
</i18n>

<script>
import { Cell, Group } from 'vux'

export default {
  components: {
    Group,
    Cell
  },
  methods: {
    onClick () {
      console.log('on click')
    }
  }
}
</script>

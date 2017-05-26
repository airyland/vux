<template>
  <div>
    <group>
      <x-textarea :max="20" :placeholder="$t('placeholder')" @on-focus="onEvent('focus')" @on-blur="onEvent('blur')"></x-textarea>
    </group>
    <group :title="$t('used with input')">
      <x-input :placeholder="$t('title')"></x-input>
      <x-textarea :max="200" name="description" :placeholder="$t('placeholder')"></x-textarea>
    </group>
    <group :title="$t('hide counter')">
      <x-textarea :max="200" name="detail" :placeholder="$t('placeholder')" :show-counter="false"></x-textarea>
    </group>
    <group :title="$t('autosize')">
      <x-textarea :placeholder="$t('Type something')" :show-counter="false" :rows="1" autosize></x-textarea>
      <x-textarea :title="$t('title')" :placeholder="$t('Type something')" :show-counter="false" :rows="1" autosize></x-textarea>
    </group>
    <group :title="$t('set height=200')">
      <x-textarea :title="$t('title')" :max="200" :placeholder="$t('placeholder')" :show-counter="false" :height="200" :rows="8" :cols="30"></x-textarea>
    </group>
  </div>
</template>

<i18n>
placeholder:
  zh-CN: 提示
hide counter:
  zh-CN: 不显示计数器
used with input:
  zh-CN: 和input一起使用
title:
  zh-CN: 标题
Type something:
  zh-CN: 随便写点什么
autosize:
  zh-CN: 自动高度
set height=200:
  zh-CN: 设置高度为200像素
</i18n>

<script>
import { XTextarea, Group, XInput } from 'vux'

export default {
  components: {
    XTextarea,
    Group,
    XInput
  },
  methods: {
    onEvent (event) {
      console.log('on', event)
    }
  }
}
</script>

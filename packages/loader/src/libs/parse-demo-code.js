'use strict'

const parse = function (source, lang) {

}

const code = `
<template>
  <div>
    <group :title="$t('Default')">
      <x-number :name="$t('Quantity')" :title="$t('Quantity')">{{ $t('hello') }}</x-number>
    </group>
  </div>
</template>
<i18n>
Default:
  zh-CN: 默认
Quantity:
  zh-CN: 数量
hello:
  zh-CN: 你好
</i18n>
`
<template>
  <div>
    <badge text="1"></badge>
    <br>
    <badge text="123"></badge>
    <br>
    <group :title="$t('Used in a Cell')">
      <cell :title="$t('single digit')" is-link>
        <div class="badge-value" slot="value">
          <span class="vertical-middle">{{ $t('New Message') }} &nbsp;</span>
          <badge text="8"></badge>
        </div>
      </cell>
      <cell :title="$t('Big Number')" is-link>
        <div class="badge-value" slot="value">
          <span class="vertical-middle">{{ $t('New Message') }} &nbsp;</span>
          <badge text="888"></badge>
        </div>
      </cell>
    </group>
  </div>
</template>

<i18n>
Used in a Cell:
  zh-CN: 在 Cell 组件里使用
New Message:
  zh-CN: 新消息
single digit:
  zh-CN: 个位数
Big Number:
  zh-CN: 多位数
</i18n>

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
.badge-value {
  display: inline-block!important;
}
.vertical-middle {
  vertical-align: middle;
}
</style>

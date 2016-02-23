<template>
  <div>
    <p style="padding:15px;">
      <span>默认</span>
      <clocker time="2016-04-01"></clocker>
    </p>

    <group title="在cell中使用">
      <cell title="距离0401">
        <clocker time="2016-04-01" slot="value"></clocker>
      </cell>
    </group>

    <group title="自定义html">
      <cell title="距离0501">
        <clocker time="2016-05-01" slot="value">
          <span style="color:red">%D 天</span>
          <span style="color:green">%H 小时</span>
          <span style="color:blue">%M 分 %S 秒</span>
        </clocker>
      </cell>
      <cell title="分割两位数字">
        <clocker time="2016-05-01" slot="value">
          <span class="day">%_D1</span>
          <span class="day">%_D2</span>天
        </clocker>
      </cell>
    </group>

  </div>
</template>

<script>
import { Clocker, Cell, Group } from '../components/'
export default {
  components: {
    Clocker,
    Cell,
    Group
  }
}
</script>

<style>
.day {
  background-color:#000;
  color:#fff;
  text-align:center;
  display:inline-block;
  padding:0 3px;
  border-radius:3px;
}
</style>
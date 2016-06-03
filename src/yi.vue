<template>
  <div>
    <group title="Basic">
      <switch title="Camera" :value="true"></switch>
      <cell title="Camera Name" value="小蚁智能摄像机"></cell>
      <cell title="Settings" inline-desc="Status light, image rotation, newwork info, firmware etc." is-link></cell>
    </group>

    <group title="Security">
      <switch title="PIN Protection" inline-desc="Require PIN to access camera" :value="false"></switch>
    </group>

    <group title="Alerts">
      <switch title="Activity Alerts" inline-desc="Send alerts when activity is detected" :value="true"></switch>
      <cell title="Settings" inline-desc="Video alerts, frequency, more" is-link></cell>
      <cell title="Schedule" value="11:00-22:00"></cell>
    </group>

    <group title="Storage">
      <switch title="Activity Detection Recording" inline-desc="Videos will only be saved when activity is detected" :value="false"></switch>
      <cell title="Storage" value="In good condition"></cell>
    </group>
  </div>
</template>

<script>
import { DevTip, Number, Selector, Group, GroupTitle, Button as Btn, Tip, Switch, Radio, Checklist, Cell, Xinput } from './components'

export default {
  components: {
    Number,
    Selector,
    Group,
    Btn,
    Tip,
    Switch,
    GroupTitle,
    Radio,
    DevTip,
    Checklist,
    Cell,
    Xinput
  }
}
</script>

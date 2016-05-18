<template>
  <div>
    <group>
      <cell title="My Account" value="Protected"></cell>
    </group>

    <group title="use is-link to show arrow">
      <cell title="Notifications" is-link></cell>
      <cell title="Privacy" is-link></cell>
      <cell title="General" is-link></cell>
    </group>

    <group>
      <cell title="Notifications" value="Enabled"></cell>
    </group>

    <group title="use slot for complexed content">
      <cell title="slot content">
        <div slot="value">
          <span style="color: green">Hi, I'm Vux.</span>
        </div>
      </cell>
    </group>

    <group title="isLink is set to true when link exists">
      <cell title="Go to Radio" link="/component/radio" inline-desc='link="/component/radio"'></cell>
      <cell title="Go to Demo" :link="{path:'/demo'}" inline-desc=':link={path:"/demo"}'></cell>
      <cell title="http link" link="https://vux.li" inline-desc='link="https://vux.li"'></cell>
    </group>
  </div>
</template>

<script>
import { Cell, Group } from '../components/'

export default {
  components: {
    Group,
    Cell
  }
}
</script>

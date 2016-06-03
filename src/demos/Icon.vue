<template>
  <div>
    <box gap="10px 10px">
      <icon type="success"></icon>
      <icon type="info"></icon>
      <icon type="info_circle"></icon>
      <icon type="warn"></icon>
      <icon type="waiting"></icon>
      <icon type="waiting_circle"></icon>
      <icon type="safe_success"></icon>
      <icon type="safe_warn"></icon>
      <icon type="success_circle"></icon>
      <icon type="success_no_circle"></icon>
      <icon type="circle"></icon>
      <icon type="download"></icon>
      <icon type="cancel"></icon>
      <icon type="search"></icon>
      <icon type="clear"></icon>
      <br/>
      <icon type="success" class="icon_big"></icon>
      <icon type="info" class="icon_big"></icon>
      <icon type="safe_success" class="icon_big"></icon>
      <icon type="safe_warn" class="icon_big"></icon>
    </box>
  </div>
</template>

<script>
import { Box, Icon } from '../components'

export default {
  components: {
    Box,
    Icon
  }
}
</script>

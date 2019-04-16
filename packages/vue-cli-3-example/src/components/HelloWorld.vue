<template>
  <div class="hello">
    <img src="../assets/logo.png" alt=""/>
    <group>
      <cell title="hello world" @click.native="alert"></cell>
    </group>
  </div>
</template>

<script src="./HelloWorld.js">
</script>

<style scoped lang="less">
.hello {
  text-align: center;
}
</style>

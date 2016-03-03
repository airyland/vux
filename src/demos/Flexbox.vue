<template>
  <div>
    <flexbox>
      <flexbox-item><div class="flex-demo">1</div></flexbox-item>
      <flexbox-item><div class="flex-demo">2</div></flexbox-item>
    </flexbox>

    <flexbox>
      <flexbox-item><div class="flex-demo">1</div></flexbox-item>
      <flexbox-item><div class="flex-demo">2</div></flexbox-item>
      <flexbox-item><div class="flex-demo">3</div></flexbox-item>
    </flexbox>

    <flexbox>
      <flexbox-item><div class="flex-demo">1</div></flexbox-item>
      <flexbox-item><div class="flex-demo">2</div></flexbox-item>
      <flexbox-item><div class="flex-demo">3</div></flexbox-item>
      <flexbox-item><div class="flex-demo">4</div></flexbox-item>
    </flexbox>

    <flexbox>
      <flexbox-item><div class="flex-demo">1</div></flexbox-item>
      <flexbox-item><div class="flex-demo">2</div></flexbox-item>
      <flexbox-item><div class="flex-demo">3</div></flexbox-item>
      <flexbox-item><div class="flex-demo">4</div></flexbox-item>
      <flexbox-item><div class="flex-demo">5</div></flexbox-item>
    </flexbox>

    <flexbox>
      <flexbox-item><div class="flex-demo" style="margin-left:0">1</div></flexbox-item>
      <flexbox-item><div class="flex-demo" style="margin-left:0">2</div></flexbox-item>
      <flexbox-item><div class="flex-demo">3</div></flexbox-item>
      <flexbox-item><div class="flex-demo" style="margin-left:0">4</div></flexbox-item>
      <flexbox-item><div class="flex-demo" style="margin-left:0">5</div></flexbox-item>
      <flexbox-item><div class="flex-demo" style="margin-left:0">6</div></flexbox-item>
    </flexbox>

    <br/>
    <br/>
    <flexbox>
    </flexbox>

  </div>
</template>

<script>
  import { Flexbox, FlexboxItem } from '../components/'
  export default {
    components: {
      Flexbox,
      FlexboxItem
    }
  }
</script>

<style>
  .flex-demo {
    text-align: center;
    color: #fff;
    background-color: #20b907;
    margin-bottom: 8px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    -webkit-background-clip: padding-box;
  }
</style>
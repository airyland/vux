<template>
  <div>
    <divider>Horizontal</divider>
    <flexbox>
      <flexbox-item><div class="flex-demo">1</div></flexbox-item>
      <flexbox-item><div class="flex-demo">2</div></flexbox-item>
    </flexbox>
    <br>
    <flexbox>
      <flexbox-item><div class="flex-demo">1</div></flexbox-item>
      <flexbox-item><div class="flex-demo">2</div></flexbox-item>
      <flexbox-item><div class="flex-demo">3</div></flexbox-item>
    </flexbox>
    <br>
    <flexbox>
      <flexbox-item><div class="flex-demo">1</div></flexbox-item>
      <flexbox-item><div class="flex-demo">2</div></flexbox-item>
      <flexbox-item><div class="flex-demo">3</div></flexbox-item>
      <flexbox-item><div class="flex-demo">4</div></flexbox-item>
    </flexbox>
    <br>
    <flexbox>
      <flexbox-item><div class="flex-demo">1</div></flexbox-item>
      <flexbox-item><div class="flex-demo">2</div></flexbox-item>
      <flexbox-item><div class="flex-demo">3</div></flexbox-item>
      <flexbox-item><div class="flex-demo">4</div></flexbox-item>
      <flexbox-item><div class="flex-demo">5</div></flexbox-item>
    </flexbox>
    <br>
    <flexbox>
      <flexbox-item><div class="flex-demo">1</div></flexbox-item>
      <flexbox-item><div class="flex-demo">2</div></flexbox-item>
      <flexbox-item><div class="flex-demo">3</div></flexbox-item>
      <flexbox-item><div class="flex-demo">4</div></flexbox-item>
      <flexbox-item><div class="flex-demo">5</div></flexbox-item>
      <flexbox-item><div class="flex-demo">6</div></flexbox-item>
    </flexbox>
    <br>
    <divider>Honrizontal with no gutter</divider>
    <flexbox :gutter="0">
      <flexbox-item><div class="flex-demo">1</div></flexbox-item>
      <flexbox-item><div class="flex-demo">2</div></flexbox-item>
      <flexbox-item><div class="flex-demo">3</div></flexbox-item>
      <flexbox-item><div class="flex-demo">4</div></flexbox-item>
    </flexbox>
    <br>
    <divider>Vertical</divider>
    <flexbox orient="vertical">
      <flexbox-item><div class="flex-demo">1</div></flexbox-item>
      <flexbox-item><div class="flex-demo">2</div></flexbox-item>
    </flexbox>
    <br>
    <divider>Vertical with no gutter</divider>
    <flexbox orient="vertical" :gutter="0">
      <flexbox-item><div class="flex-demo">1</div></flexbox-item>
      <flexbox-item><div class="flex-demo">2</div></flexbox-item>
    </flexbox>
    <br>
    <divider>Grid support(12 columns)</divider>
    <flexbox>
      <flexbox-item :span="4"><div class="flex-demo">1/3</div></flexbox-item>
      <flexbox-item><div class="flex-demo">2/3</div></flexbox-item>
    </flexbox>
    <br>
    <flexbox>
      <flexbox-item :span="6"><div class="flex-demo">6/12</div></flexbox-item>
      <flexbox-item :span="2"><div class="flex-demo">2/12</div></flexbox-item>
      <flexbox-item ><div class="flex-demo">rest</div></flexbox-item>
    </flexbox>
    <br>
    <divider>flexiable grid</divider>
    <flexbox>
      <flexbox-item :span="1/3"><div class="flex-demo">1/3</div></flexbox-item>
      <flexbox-item :span="1/6"><div class="flex-demo">1/6</div></flexbox-item>
      <flexbox-item :span="1/8"><div class="flex-demo">1/8</div></flexbox-item>
      <flexbox-item :span="1/8"><div class="flex-demo">1/8</div></flexbox-item>
      <flexbox-item><div class="flex-demo">rest</div></flexbox-item>
    </flexbox>
    <br>
    <flexbox :gutter="0">
      <flexbox-item :span="1/3"><div class="flex-demo">1/3</div></flexbox-item>
      <flexbox-item :span="1/6"><div class="flex-demo">1/6</div></flexbox-item>
      <flexbox-item :span="1/8"><div class="flex-demo">1/8</div></flexbox-item>
      <flexbox-item :span="1/8"><div class="flex-demo">1/8</div></flexbox-item>
      <flexbox-item><div class="flex-demo">rest</div></flexbox-item>
    </flexbox>
    <br>
    <divider>flexiable grid</divider>
    <flexbox :gutter="0">
      <flexbox-item :span="1/3" :order="4"><div class="flex-demo">1</div></flexbox-item>
      <flexbox-item :span="1/6" order"3"><div class="flex-demo">2</div></flexbox-item>
      <flexbox-item :span="1/8" :order="2"><div class="flex-demo">3</div></flexbox-item>
      <flexbox-item :span="1/8" :order="1"><div class="flex-demo">4</div></flexbox-item>
      <flexbox-item :order="-99"><div class="flex-demo">5</div></flexbox-item>
    </flexbox>
    <br>
    <divider>flex-wrap</divider>
    <flexbox :gutter="0" wrap="wrap">
      <flexbox-item :span="1/3"><div class="flex-demo">1/3</div></flexbox-item>
      <flexbox-item :span="1/3"><div class="flex-demo">1/3</div></flexbox-item>
      <flexbox-item :span="1/3"><div class="flex-demo">1/3</div></flexbox-item>
      <flexbox-item :span="1/3"><div class="flex-demo">1/3</div></flexbox-item>
      <flexbox-item :span="1/3"><div class="flex-demo">1/3</div></flexbox-item>
      <flexbox-item :span="1/3"><div class="flex-demo">1/3</div></flexbox-item>
      <flexbox-item :span="1/3"><div class="flex-demo">1/3</div></flexbox-item>
      <flexbox-item :span="1/3"><div class="flex-demo">1/3</div></flexbox-item>
    </flexbox>
    
  </div>
</template>

<script>
import { Flexbox, FlexboxItem, Divider } from '../components'

export default {
  components: {
    Flexbox,
    FlexboxItem,
    Divider
  }
}
</script>

<style lang="less">
@import '../styles/1px.less';

.flex-demo {
  text-align: center;
  color: #fff;
  background-color: #20b907;
  border-radius: 4px;
  background-clip: padding-box;
}
</style>

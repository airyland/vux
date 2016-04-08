<template>
  <div>
    <divider>Horizontal</divider>
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
    <divider>Vertical</divider>
    <flexbox orient="vertical" :margin-left=0>
      <flexbox-item><div class="flex-demo" style="margin-left:0">1</div></flexbox-item>
      <flexbox-item><div class="flex-demo" style="margin-left:0">2</div></flexbox-item>
    </flexbox>

    <br/>
    <divider>Nested Flexbox</divider>
    <flexbox :margin-left=0 style="height: 200px; background-color: #fff;" class="ui-border-tb">
      <flexbox-item class="ui-border-r"></flexbox-item>
      <flexbox-item>
        <flexbox orient="vertical" :margin-left=0>
          <flexbox-item class="ui-border-b"></flexbox-item>
          <flexbox-item style="height: 100px;"><!--height: 100% doesnot work here-->
            <flexbox :margin-left=0>
              <flexbox-item class="ui-border-r"></flexbox-item>
              <flexbox-item></flexbox-item>
            </flexbox>
          </flexbox-item>
        </flexbox>
      </flexbox-item>
    </flexbox>

  </div>
</template>

<script>
import { Flexbox, FlexboxItem, Divider } from '../components/'

export default {
  components: {
    Flexbox,
    FlexboxItem,
    Divider
  }
}
</script>

<style>
@import '../components/1px.css';

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

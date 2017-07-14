<template>
	<div>
		<swiper height="150px" dots-position="center">
      <swiper-item>
        <p style="text-align:center;">1</p>
        <group>
          <cell title="TEST" :value="docType" @click="showPopupPicker = true"></cell>
        </group>
      </swiper-item>
      <swiper-item>
        <p style="text-align:center;">2</p>
      </swiper-item>
      <swiper-item>
        <p style="text-align:center;">3</p>
      </swiper-item>
    </swiper>
    <group>
      <popup-picker :show.sync="showPopupPicker" :show-cell="false" title="TEST" :data="docTypeList" :value.sync="docType"></popup-picker>
    </group>
	</div>
</template>

<script>
import { Group, Cell, Swiper, SwiperItem, PopupPicker } from 'vux'

export default {
  components: {
    Group,
    Cell,
    Swiper,
    SwiperItem,
    PopupPicker
  },
  data () {
    return {
      docTypeList: [['1', '2', '3', '4', '5']],
      docType: ['2'],
      showPopupPicker: false
    }
  }
}
</script>
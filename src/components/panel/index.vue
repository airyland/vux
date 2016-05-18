<template>
  <div class="weui_panel weui_panel_access">
    <div class="weui_panel_hd" v-if="header" @click="onClickHeader" v-html="header"></div>
    <div class="weui_panel_bd">
      <!--type==='1'-->
      <a :href="getUrl(item.url)" v-for="item in list" @click.prevent="onItemClick(item)" class="weui_media_box weui_media_appmsg" v-if="type === '1'">
        <div class="weui_media_hd" v-if="item.src">
          <img class="weui_media_appmsg_thumb" :src="item.src" alt="">
        </div>
        <div class="weui_media_bd">
          <h4 class="weui_media_title">{{item.title}}</h4>
          <p class="weui_media_desc">{{item.desc}}</p>
        </div>
      </a>
      <!--type==='2'-->
      <div class="weui_media_box weui_media_text" v-for="item in list" @click.prevent="onItemClick(item)" v-if="type === '2'">
          <h4 class="weui_media_title">{{item.title}}</h4>
          <p class="weui_media_desc">{{item.desc}}</p>
      </div>
      <!--type==='3'-->
      <div class="weui_media_box weui_media_small_appmsg">
          <div class="weui_cells weui_cells_access">
            <a class="weui_cell" :href="getUrl(item.url)" v-for="item in list" @click.prevent="onItemClick(item)" v-if="type === '3'">
              <div class="weui_cell_hd">
                <img :src="item.src" alt="" style="width:20px;margin-right:5px;display:block">
              </div>
              <div class="weui_cell_bd weui_cell_primary">
                <p>{{item.title}}</p>
              </div>
              <span class="weui_cell_ft"></span>
            </a>
          </div>
      </div>
    </div>
    <a class="weui_panel_ft" :href="getUrl(footer.url)" v-if="footer && type !== '3'" @click.prevent="onClickFooter" v-html="footer.title"></a>
  </div>
</template>

<script>
import { go, getUrl } from '../../libs/router'

export default {
  props: {
    header: String,
    footer: Object,
    list: Array,
    type: {
      type: String,
      default: '1'
    }
  },
  methods: {
    getUrl (url) {
      return getUrl(url, this.$router)
    },
    onClickFooter () {
      this.$emit('on-click-footer')
      go(this.footer.url, this.$router)
    },
    onClickHeader () {
      this.$emit('on-click-header')
    },
    onItemClick (item) {
      this.$emit('on-click-item', item)
      go(item.url, this.$router)
    }
  }
}
</script>
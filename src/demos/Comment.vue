<template>
  <div style="padding: 15px; background-color: #fff;">
    <ul class="discuss_list">
      <li class="discuss_item" v-for="comment in list">

        <div class="discuss_opr">
          <span class="media_tool_meta tips_global meta_praise" :class="{'praised': comment.has_praised}">
            <i class="icon_praise_gray" @click="praise(comment)"></i>
            <span class="praise_num">{{comment.like_num}}</span>
          </span>
        </div>

        <div class="user_info">
          <strong class="nickname">{{comment.name}}</strong>
          <img class="avatar" :src="comment.avatar">
        </div>

        <div class="discuss_message">
          <span class="discuss_status">{{comment.status}}</span>
          <div class="discuss_message_content">{{comment.content}}</div>
        </div>
        <p class="discuss_extra_info">{{comment.time}}

          <a v-if="comment.is_from_me" class="discuss_del js_del" href="javascript:;" data-my-id="<#=my_id#>" data-content-id="<#=content_id#>">删除</a>
        </p>

        <div class="reply_result" v-if="comment.reply_list && comment.reply_list.length">
          <div class="nickname">作者回复</div>
          <div class="discuss_message">
            <div class="discuss_message_content">{{comment.reply_list[0].content}}</div>
          </div>
          <p class="discuss_extra_info">{{comment.reply_list[0].time}}</p>
        </div>

      </li>
    </ul>
  </div>
</template>

<script>
const list = [{
  name: 'Airyland',
  avatar: 'static/demo/comment/1.jpg',
  time: '昨天',
  like_num: 99,
  content: '沙发',
  has_praised: true,
  reply_list: [{
    content: '恭喜~',
    time: '今天早上'
  }]
}, {
  name: 'Vux',
  avatar: 'static/demo/comment/2.jpg',
  time: '未来时间',
  like_num: 0,
  content: '板凳'
}, {
  name: 'Secret',
  avatar: 'static/demo/comment/3.jpg',
  time: '未来时间',
  like_num: 99,
  content: '居然没抢到沙发'
}]
export default {
  data () {
    return {
      list: list
    }
  },
  methods: {
    praise (item) {
      if (!item.has_praised) {
        item.like_num++
        item.has_praised = true
        console.log(JSON.stringify(item))
      }
    }
  }
}
</script>

<style>
.discuss_btn_wrp {
  display: none;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: right
}

.btn_discuss {
  padding-left: 1.5em;
  padding-right: 1.5em
}

.discuss_list {
  margin-top: -5px;
  padding-bottom: 20px;
  font-size: 16px
}

.discuss_item {
  position: relative;
  padding-left: 45px;
  margin-top: 15px;
}

.discuss_item:after {
  content: "\200B";
  display: block;
  height: 0;
  clear: both
}

.discuss_item .user_info {
  min-height: 20px;
  overflow: hidden
}

.discuss_item .nickname {
  display: block;
  font-weight: 400;
  font-style: normal;
  color: #727272;
  width: 9em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal
}

.discuss_item .avatar {
  position: absolute;
  top: 0;
  left: 0;
  top: 3px;
  width: 35px;
  height: 35px;
  background-color: #ccc;
  vertical-align: top;
  margin-top: 0;
  border-radius: 2px;
}

.discuss_item .discuss_message {
  color: #3e3e3e;
  line-height: 1.5
}

.discuss_item .discuss_extra_info {
  color: #8c8c8c;
  font-size: 12px
}

.discuss_item .discuss_extra_info a {
  margin-left: .5em
}

.discuss_item .discuss_status {
  color: #ff7a21;
  white-space: nowrap
}

.discuss_item .discuss_status i {
  font-style: normal;
  margin-right: 2px
}

.discuss_item .discuss_opr {
  float: right
}

.discuss_item .discuss_opr .meta_praise {
  display: inline-block;
  text-align: right;
  padding-top: 5px;
  margin-top: -5px
}

.discuss_item .discuss_del {
  margin-left: .5em
}

.discuss_icon_tips {
  margin-bottom: 20px
}

.discuss_icon_tips img {
  vertical-align: middle;
  margin-left: 3px;
  margin-top: -4px
}

.discuss_icon_tips .icon_edit {
  width: 12px
}

.discuss_icon_tips .icon_access {
  width: 13px
}

.reply_result {
  position: relative;
  margin-top: .5em;
  padding-top: .5em;
  padding-left: .4em
}

.reply_result:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 1px;
  border-top: 1px solid #dadada;
  transform-origin: 0 0;
  transform: scaleY(0.5)
}

.reply_result .nickname {
  position: relative;
  overflow: visible
}

.reply_result .nickname:before {
  content: " ";
  position: absolute;
  left: -0.4em;
  top: 50%;
  margin-top: -7px;
  width: 3px;
  height: 14px;
  background-color: #02bb00
}

.rich_tips.discuss_title_line {
  margin-top: 50px
}


.meta_praise {
  tap-highlight-color: rgba(0,0,0,0);
  outline: 0;
  min-width: 3.5em
}

.meta_praise .praise_num {
  display: inline-block;
  vertical-align: middle;
  font-size: 13px;
  color: #666;
}

.icon_praise_gray {
  background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAA+CAYAAAA1dwvuAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACd0lEQVRYhe2XMWhUMRjHfycdpDg4iJN26CQih4NUlFIc3iTasaAO+iZBnorIId2CDg6PLqWDXSy0p28TJ6ejILgoKiLFSeRcnASLnDf2HPKll8b3ah5NQPB+cHzJl0v+73J5Sf6NwWCAD6kqxoEV4BywCTwA2j59V9QlxrxUNJeBOSkfBtaAHvDcp/O+GkJHJd4H7kr5nm/nOkJHJH4FHkv5WAyhUxLfAgelvBlUKFXFBNCU6oYl+j6oEHohADwFtoDTUn8dTChVxX7gjlSfSJyS+CaYEDCPXs4d4IXkzDR+8BWqfI9SVUyil/ENST20ml8BF4Afu4z9HT3V80B/TAY9CxTABNAHxp1Oj4B1q34dWAamGa5Al0PALfSs3TS/aE1EcERWgQXgozPIN+Ai6O2ljFQVM8BLZJqN0KTEhgj9kvrViqf1wYz5BcoXQ38Pg9uckfiuSigU0xLXowmlqpgCjgNd4FM0IeCKxGcmEUtoRqLZScILpaqYA06iN9/tTTfGLzKvxLKdDCqUquIEcB59xK9GE2J4xLeBn3ZD1abaq/sQqSpmgWvo82rBbTdCPeAA4N69/noXS1XhphaBz27SPPVtapz/FXSBFsNDcgcN3wvkiBEjRoSndAtqLXXKvuvtYfMs+SP3T3tYm6ge1iaqh7UJ62HRTqNZko/mYV3CeVjA9rAuUTxsGd4edrcX1vWwddn2sHmWaA/bWuq4HnYLff3aC7U8bAiaMPyPJp3GhnxCUOlhQxPdwxrieViLbp4lUT2sIbqHNcTzsBYbeZZE9bCGeB7WIrqHNbTzLNnhYWMIlXpYI9Rz8gM8/GsFi3mW/Ace9jf8QZwIX5o4uQAAAABJRU5ErkJggg==) no-repeat 0 0;width: 13px;
  height: 13px;
  vertical-align: middle;
  display: inline-block;
  background-size: 100% auto
}

.icon_praise_gray.praised {
  background-position: 0 -18px
}

.praised .icon_praise_gray {
  background-position: 0 -18px
}
</style>

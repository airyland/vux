<template>
    <danmaku v-for="item in list" :item="item" track-by="_key"></danmaku>
</template>

<script lang="babel">
  import danmaku from '../components/danmaku'

  import Wilddog from 'wilddog'
  const AppId = 'wild-hare-52768'
  const MaxCount = 20
  const roadWidth = 80
  const AVATAR = [ 'https://avatars3.githubusercontent.com/u/1823279?v=3&s=140' ]
  let currentSite = document.domain.replace(/\./g, '-')
  let Site = new Wilddog('https://' + AppId + '.wilddogio.com/' + currentSite)
  let List = Site.child('list')

  let getRoadway = () => roadWidth * Math.floor(Math.random() * 10)

  let generateBullet = (obj, y = getRoadway(), item = obj.val()) => ({
    _key: obj.key() + Math.random(),
    key: obj.key(),
    avatar: AVATAR[ Math.floor(Math.random() * 4) ],
    show: false,
    flying: false,
    roadway: y,
    tick: item.tick,
    position: { 'top': y + 'px', 'color': item.color },
    nickname: item.nickname,
    word: item.word,
    color: item.color
  }
  )

  let addNewItem = (obj, self, realtime, newItem = generateBullet(obj)) => {
    if (realtime) {
      self.list.push(newItem)
      self.$nextTick(function () {
        self.render(newItem, true)
      })
    } else if (self.list.length > MaxCount) {
      self.preList.push(newItem)
    } else {
      self.list.push(newItem)
      self.$nextTick(function () {
        self.render(newItem, false)
      })
    }
  }

  let loadRealtime = (self) => {
    List.orderByChild('tick').on('child_added', (newObj) => {
      if (self.tick < 5) {
        addNewItem(newObj, self, false)
      } else {
        addNewItem(newObj, self, true)
      }
    })
  }

  export default {
    data () {
      return {
        input: {
          say: '',
          nickname: '路人',
          avatar: null
        },
        list: [],
        preList: [],
        timer: null,
        tick: 0,
        showInputing: true,
        showSetting: false
      }
    },
    components: {
      danmaku: danmaku
    },
    created () {
      this.timer = setInterval(() => {
        this.tick++
      }, 1000)
      loadRealtime(this)
    },
    methods: {
      render (item, realtime) {
        let wait = item.tick * 1000
        let outtime = 0

        item.show = true

        if (!realtime) {
          outtime = wait - this.tick * 1000
          outtime = outtime < 0 ? 0 : outtime
        } else {
          outtime = 500
        }
        setTimeout(function () {
          item.flying = true
        }, outtime)
        setTimeout(() => {
          this.list.$remove(item)
          if (this.list.length < MaxCount && this.preList.length > 0) {
            let preItem = this.preList.shift()
            this.list.push(preItem)
            this.$nextTick(function () {
              this.render(preItem, false)
            })
          }
        }, outtime + 12000)
      }
    }
  }
</script>

<style>
  html, body {
    height: 100%;
  }
</style>

<template>
  <div class="vux-rater">
    <a v-for="i in max" @click="handleClick(i)" :class="{'is-active':value > i}" :style="{color:colors[i],paddingRight:padding+'px'}">{{star}}</a>
  </div>
</template>

<script>
  export default {
    ready () {
      for(var i = 0; i < this.max; i++) {
        this.colors.push('#ccc')
      }
      if (this.value) {
        this.handleClick(this.value - 1, true)
      }
    },
    props: {
      max: {
        type: Number,
        default: 5
      },
      value: {
        type: Number,
        default: 0,
        twoWay: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      star: {
        type: String,
        default: '★'
      },
      active_color: {
        type: String,
        default: '#fc6'
      },
      padding: {
        type: Number,
        default: 2
      }
    },
    computed: {
    },
    methods: {
      handleClick (i, force) {
        if(!this.disabled || force){
          this.value = i + 1
          for (var j = 0; j < this.max; j++){
            if(j<=i){
              this.colors.$set(j, this.active_color)
            }else{
              this.colors.$set(j, '#ccc')
            }
          }
        }
      }
    },
    data () {
      return {
        colors: []
      }
    },
    watch: {
      value: function (val) {

      }
    }
  }
</script>

<style>
.vux-rater {
  text-align: left;
  display: inline-block;
  line-height: normal;
}
.vux-rater a {
  font-size: 25px;
  line-height: 25px;
  cursor: pointer;
  color: #ccc;
}
.vux-rater a:last-child {
  padding-right: 2px!important;
}
.vux-rater a:hover {
  color: #ffdd99; 
}
.vux-rater a.is-active {
  
}
.vux-rater a.is-disabled {
  color: #ccc !important;
  cursor: not-allowed; 
}
</style>
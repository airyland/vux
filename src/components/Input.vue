<template>
	<div class="weui_cell">
        <div class="weui_cell_hd">
        	<label class="weui_label" :style="{width: labelWidth + 'em'}">{{title}}</label>
        	<span class="label_desc" v-if="inline_desc">{{inline_desc}}</span>
        </div>
        <div class="weui_cell_bd weui_cell_primary">
            <input class="weui_input" type="text" :pattern="pattern" placeholder="{{placeholder}}" v-model="value" @blur="setTouched"/>
        </div>
        <div class="weui_cell_ft" v-show="touched && !valid">
            <i class="weui_icon_warn" title="{{!valid ? firstError : ''}}"></i>
        </div>
    </div>
</template>

<script>
  import Base from '../libs/base'
  import { isEmail, isIP, isURL, isMobilePhone } from 'validator'
  const validators = {
    'email': {
      fn: isEmail,
      msg: '邮箱格式'
    },
    'ip': {
      fn: isIP,
      msg: 'ip地址格式'
    },
    'url': {
      fn: isURL,
      msg: 'URL地址'
    },
    'china_mobile': {
      fn: function (str) {
        return isMobilePhone(str, 'zh-CN')
      },
      msg: '手机号码'
    },
    'china_name': {
      fn: function (str) {
        return str.length >= 2 && str.length <= 6
      },
      msg: '中文姓名'
    }
  }
	export default {
    mixins: [ Base ],
    ready: function () {
      this.errors = {}
    },
		props: {
			title: {
				type: String,
				reqired: true
			},
			placeholder: {
				type: String
			},
			value: {
				type: String,
				default: '',
				twoWay: true
			},
			keyboard: {
				type: String,
			},
			inline_desc: {
				type: String
			},
      is_type: {
        type: String
      },
      min: Number,
      max: Number
		},
		computed: {
      pattern: function () {
        if(this.keyboard==='number'){
          return '[0-9]*'
        }
      },
      labelWidth: function () {
        return this.title.replace(/[^x00-xff]/g,'00').length/2+1
      },
      hasErrors: function () {
        return Object.keys(this.errors).length
      }
		},
    methods: {
      getError: function () {
        this.firstError = this.errors[Object.keys(this.errors)[0]]
      }
    },
    data: function () {
      return {
        firstError: ''
      }
    },
    watch: {
      valid: function () {
        this.getError()
      },
      value: function () {
          this.errors = {}
          const validator = validators[this.is_type]
          if(validator){
            this.valid = validator['fn'](this.value)
            if(!this.valid) {
              this.errors.format = validator['msg']+'格式不对哦~'
              return
            }else{
              delete this.errors.format
            }
          }

          if(this.min) {
            if (this.value.length < this.min){
              this.errors.min = this.$interpolate('最少应该输入{{min}}个字符哦')
              this.valid = false
              return
            }else{
              delete this.errors.min
            }
          }

          if(this.max) {
            if (this.value.length > this.max){
              this.errors.max = this.$interpolate('最多可以输入{{max}}个字符哦')
              this.valid = false
              return
            }else{
              delete this.errors.max
            }
          }
          this.valid = true;
       }
    }
	}
</script>

<style>
</style>
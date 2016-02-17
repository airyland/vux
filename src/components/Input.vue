<template>
	<div class="weui_cell">
    <div class="weui_cell_hd">
    	<label class="weui_label" :style="{width: labelWidth + 'em'}">{{title}}</label>
    	<span class="label_desc" v-if="inline_desc">{{inline_desc}}</span>
    </div>
    <div class="weui_cell_bd weui_cell_primary">
      <input class="weui_input" type="text" :pattern="pattern" placeholder="{{placeholder}}" v-model="value" @blur="blur"/>
    </div>
    <div class="weui_cell_ft">
      <icon type="clear" v-show="show_clear && value" @click="value=''"></icon>
      <icon type="warn" title="{{!valid ? firstError : ''}}" v-show="(touched && !valid && firstError) || (forceShowError && !valid && firstError)"></>
    </div>
  </div>
</template>

<script>
  import Base from '../libs/base'
  import Icon from './Icon'
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
    components: {
      Icon
    },
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
      max: Number,
      show_clear: {
        type: Boolean,
        default: true
      }
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
      blur: function () {
        this.setTouched()
        this.validate()
      },
      getError: function () {
        this.firstError = this.errors[Object.keys(this.errors)[0]]
      },
      validate: function () {
        this.errors = {}
          
        if(!this.value && !this.required){
          this.valid = true
          return
        }

        if(!this.value && this.required){
          this.valid = false;
          this.errors.required = '必填哦'
        }

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
            this.forceShowError = true
            return
          }else{
            this.forceShowError = false
            delete this.errors.max
          }
        }

        this.valid = true;
      }
    },
    data: function () {
      return {
        firstError: '',
        forceShowError: false
      }
    },
    watch: {
      valid: function () {
        this.getError()
      },
      value: function (newVal) {
        this.validate()
      }
    }
	}
</script>

<style>
</style>
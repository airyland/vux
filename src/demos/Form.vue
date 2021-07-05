<template>
  <div id="app">
    <div class="form-demo">
      <group title="内置表单组件">
        <vux-form
          ref="form"
          :model="formData"
        >
          <vux-form-field
            type="input"
            title="Input"
            prop="aa"
            placeholder="please enter"
            required
            message="输入框是必填的噢"
            :props="{
              'text-align': 'right'
            }"
            :events="{
              'on-focus': handleInputFocus,
              'on-blur': handleInputBlur
            }"
          ></vux-form-field>
          <vux-form-field
            type="textarea"
            title="Textarea"
            prop="bb"
            v-model="formData.bb"
            placeholder="请输入多行文字"
            required
            :props="{
              max: 2000,
              readonly: true,
              autosize: true,
            }"
          ></vux-form-field>
          <vux-form-field
            type="number"
            title="Number"
            prop="cc"
            required
            :rules="[
              {
                validator(rules, value, cb) {
                  if (value > 0) {
                    cb()
                  } else {
                    cb('请输入大于0的数字')
                  }
                }
              },
            ]"
          ></vux-form-field>
          <vux-form-field
            type="datetime"
            title="Datetime"
            prop="ff"
            required
          ></vux-form-field>
          <vux-form-field
            type="radio"
            title="PopupRadio"
            required
            prop="dd"
            message="Radio是必填的噢"
            :props="{
              options,
            }"
          ></vux-form-field>
          <vux-form-field
            type="picker"
            title="PopupPicker"
            required
            prop="ee"
            message="Picker是必填的噢"
            :rules="pickerRules"
            :props="{
              data: pickerOptions
            }"
          ></vux-form-field>
          <!-- <vux-form-field
            type="uploader"
            title="Uploader"
            prop="gg"
            required
            message="请上传图片"
          ></vux-form-field> -->
          <div class="btn-group">
            <x-button
              type="primary"
              action-type="button"
              @click.native="submit"
            >Submit</x-button>
            <x-button
              type="primary"
              action-type="button"
              @click.native="reset"
            >Reset</x-button>
            <x-button
              type="primary"
              action-type="button"
              @click.native="clearValidate"
            >clearValidate</x-button>
          </div>
        </vux-form>
      </group>
      <group
        title="自定义表单组件"
        style="margin-top: 20px"
      >
        <vux-form
          ref="customForm"
          :model="customFormData"
        >
          <vux-form-field
            prop="aa"
            :rules="[
              {
                required: true,
                message: '请填写些文字'
              }
            ]"
          >
            <x-input
              title="Custom Field"
              text-align="right"
              v-model="customFormData.aa"
            ></x-input>
          </vux-form-field>
          <div class="btn-group">
            <x-button
              type="primary"
              action-type="button"
              @click.native="submitCustomForm"
            >Submit</x-button>
          </div>
        </vux-form>
      </group>
      <group
        title="插槽"
        style="margin-top: 20px"
      >
        <vux-form
          ref="slotForm"
          :model="slotFormData"
        >
          <vux-form-field
            type="input"
            title="named slot"
            prop="aa"
            placeholder="please enter"
          >
            <span slot="label">named slot label</span>
            <x-button
              slot="right"
              type="primary"
              action-type="button"
              mini
              @click.native="sendCode"
            >发送验证码</x-button>
          </vux-form-field>
          <vux-form-field
            type="radio"
            title="scope slot"
            prop="bb"
            :props="{
              options
            }"
          >
            <template
              slot-scope="props"
              slot="each-item"
            >
              <p>
                custom item
                <img
                  src="https://github.com/airyland/vux/blob/v2/logo.png?raw=true"
                  class="vux-radio-icon"
                />
                {{ props.label }}
                <br />
                <span style="color:#666;">{{ props.index + 1 }} another line</span>
              </p>
            </template>
          </vux-form-field>
        </vux-form>
      </group>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { Form as VuxForm, FormField as VuxFormField } from '../components/form'
import { XButton, Group, XInput } from 'vux'
export default {
  name: 'form',
  components: {
    VuxForm,
    VuxFormField,
    XButton,
    Group,
    XInput
  },
  data () {
    return {
      formData: {
        aa: '123',
        bb:
          'Talk is cheap, show me the code. \nTalk is cheap, show me the code. \nTalk is cheap, show me the code. \nTalk is cheap, show me the code. \nTalk is cheap, show me the code. \nTalk is cheap, show me the code. \nTalk is cheap, show me the code. \n',
        cc: 0,
        dd: '',
        ee: ['NBA'],
        ff: '2020-11-11',
        gg: [
          {
            url:
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605499999423&di=3ffe2cd6df76e52f7f7dc3647868ff2b&imgtype=0&src=http%3A%2F%2Fattachments.gfan.com%2Fforum%2F201503%2F19%2F211608ztcq7higicydxhsy.jpg'
          }
        ]
      },
      customFormData: {
        aa: ''
      },
      options: ['A', 'B', 'C'],
      pickerOptions: [['NBA', 'NFL', 'MLB']],
      pickerRules: [
        {
          transform (value) {
            if (Array.isArray(value)) {
              return value[0]
            }
            return value
          }
        }
      ],
      slotFormData: {
        aa: '',
        bb: ''
      }
    }
  },
  mounted () {},
  methods: {
    submit () {
      this.$refs.form.submit((valid, field) => {
        if (!valid) {
          console.log(field)
          const msg = Object.values(field)[0][0].message
          this.$vux.toast.text(msg)
        } else {
          this.$vux.toast.text('sumbit handler: valid success')
          console.log('formData:', JSON.parse(JSON.stringify(this.formData)))
        }
      })
    },
    reset () {
      this.$refs.form.resetFields()
    },
    clearValidate () {
      this.$refs.form.clearValidate()
    },
    submitCustomForm () {
      this.$refs.customForm.submit((valid, field) => {
        if (!valid) {
          const msg = Object.values(field)[0][0].message
          this.$vux.toast.text(msg)
        } else {
          this.$vux.toast.text(
            `sumbit handler: valid success \n ${JSON.stringify(
              this.customFormData
            )}`
          )
        }
      })
    },
    handleInputFocus (value, $event) {
      console.log('handle input focus:', value, $event)
    },
    handleInputBlur (value, $event) {
      console.log('handle input blur:', value, $event)
    },
    sendCode () {
      this.$vux.toast.text('验证码已发送')
    }
  }
}
</script>

<style>
</style>

<style lang="less">
@import '~vux/src/styles/reset.less';
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
#app {
  height: 100%;
  .form-demo {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .btn-group {
    padding: 10px 20px;
  }
}
</style>

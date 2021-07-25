<template>
  <div id="app">
    <div class="form-demo">
      <group title="common form components">
        <x-form
          ref="form"
          :model="formData"
        >
          <x-form-field
            prop="aa"
            required
            message="XInput is required"
          >
            <x-input
              title="XInput"
              v-model="formData.aa"
              placeholder="please enter"
              text-align="right"
            ></x-input>
          </x-form-field>
          <x-form-field
            prop="bb"
            required
            message="XTextarea is required"
          >
            <x-textarea
              title="XTextarea"
              v-model="formData.bb"
              :max="200"
              autosize
            ></x-textarea>
          </x-form-field>
          <x-form-field
            prop="cc"
            required
            message="XNumber is required"
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
          >
            <x-number
              title="XNumber"
              v-model="formData.cc"
            ></x-number>
          </x-form-field>
          <x-form-field
            prop="ff"
            required
            message="Datetime is required"
          >
            <datetime
              title="Datetime"
            ></datetime>
          </x-form-field>
          <x-form-field
            prop="dd"
            required
            message="PopupRadio is required"
          >
            <popup-radio
              title="PopupRadio"
              v-model="formData.dd"
              :options="options"
            ></popup-radio>
          </x-form-field>
          <x-form-field
            prop="ee"
            required
            message="PopupPicker is required"
            :rules="pickerRules"
          >
            <popup-picker
              title="PopupPicker"
              v-model="formData.ee"
              :data="pickerOptions"
            ></popup-picker>
          </x-form-field>
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
        </x-form>
      </group>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { XForm, XFormField } from '../components/x-form'
import { XButton, Group, XInput, XTextarea, XNumber, Datetime, PopupRadio, PopupPicker } from 'vux'
export default {
  components: {
    XForm,
    XFormField,
    XButton,
    Group,
    XInput,
    XTextarea,
    XNumber,
    Datetime,
    PopupRadio,
    PopupPicker
  },
  data () {
    return {
      formData: {
        aa: '',
        bb:
          'Talk is cheap, show me the code. \nTalk is cheap, show me the code. \nTalk is cheap, show me the code. \nTalk is cheap, show me the code. \nTalk is cheap, show me the code. \nTalk is cheap, show me the code. \nTalk is cheap, show me the code. \n',
        cc: 0,
        dd: '',
        ee: ['NBA'],
        ff: '2020-11-11'
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
      ]
    }
  },
  mounted () {},
  methods: {
    submit () {
      this.$refs.form.validate((valid, field) => {
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
    handleInputFocus (value, $event) {
      console.log('handle input focus:', value, $event)
    },
    handleInputBlur (value, $event) {
      console.log('handle input blur:', value, $event)
    }
  }
}
</script>
<style lang="less">
.form-demo {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .btn-group {
    padding: 10px 20px;
  }
}
</style>

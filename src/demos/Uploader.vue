<template>
  <div id="app">
    <uploader
      v-model="fileList"
      url="http://localhost:9090/upload"
      name="upload"
      title="自动上传"
      :params="{
        token: '13579',
        linkid: '2323',
        modelname: 'modelname'
      }"
      :headers="{
        'custom-header': 'custom-info',
      }"
      :limit="6"
      :limitPrompt="limit => `已经上传${limit}张图片嘞！`"
      withCredentials
      @before-upload="beforeUpload"
      @after-upload="afterUpload"
      @on-change="onChange"
      @on-cancel="onCancel"
      @on-success="onSuccess"
      @on-error="onError"
      @on-delete="onDelete"
    />
    <uploader
      title="手动上传"
      :autoUpload="false"
      v-model="fileList2"
    />
  </div>
</template>

<script>
import Uploader from '../components/uploader'

export default {
  name: 'app',
  components: {
    Uploader
  },
  data () {
    return {
      fileList: [
        {
          url: '../../assets/qr.png'
        }
      ],
      fileList2: []
    }
  },
  mounted () {
  },
  methods: {
    beforeUpload () {
      console.log('before upload')
      this.$vux.loading.show({
        text: 'Loading'
      })
    },
    afterUpload (action) {
      setTimeout(() => {
        this.$vux.loading.hide()
        action && action()
      }, 1000)
    },
    onChange (fileItem, fileList) {
      console.log('on-change: ', fileItem, fileList)
    },
    onCancel () {
      console.log('on-cancel: Sucess')
    },
    onSuccess (res, fileItem) {
      console.log('on-success: ', res)
      fileItem.fileid = res.data
    },
    onError (res) {
      console.log('on-error: ', res)
    },
    onDelete (deleteItem, cb) {
      console.log('on-delete: ', deleteItem)
      cb && cb()
    },
    submit () {
      const formData = new FormData()
      const url = 'http://www.abc.com/upload/'
      formData.append('file', this.fileList2[0].blob)
      fetch
        .post(url, formData)
        .then(() => {})
        .catch(() => {})
    }
  }
}
</script>

<style lang="less">
</style>

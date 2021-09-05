<template>
  <div class="vux-uploader">
    <div class="vux-uploader_hd">
      <p class="vux-uploader_title">{{ title }}</p>
      <div class="vux-uploader_info">{{ fileList.length }} / {{ limit }}</div>
    </div>
    <div class="vux-uploader_bd">
      <ul class="vux-uploader_files">
        <li
          :class="{
              'vux-uploader_file': true,
              'vux-uploader_file-status': !!item.fetchStatus && item.fetchStatus !== 'success'
            }"
          v-for="(item, index) in fileList"
          :key="item.url"
          :style="{
              backgroundImage: `url(${item.url})`
            }"
          @click="handleFileClick($event, item, index)"
        >
          <div
            v-if="!!item.fetchStatus && item.fetchStatus !== 'success'"
            class="vux-uploader_file-content"
          >
            {{ item.fetchStatus === 'progress' ? item.progress + '%' : '' }}
            <!-- progress !== 0 && progress < 100 -->
            <i
              v-if="item.fetchStatus === 'fail'"
              class="upload-error"
            ></i>
          </div>
        </li>
      </ul>
      <div
        class="vux-uploader_input-box"
        v-show="fileList.length < limit && !readonly"
      >
        <input
          class="vux-uploader_input"
          ref="input"
          type="file"
          name="uploadInput"
          accept="image/*"
          :capture="capture"
          :multiple="multiple"
          @change="change"
        />
      </div>
    </div>
    <priviewer
      ref="previewer"
      :list="fileList | filterList"
    >
      <template slot="wrap-after">
        <div class="vux-uploader_del" v-if="!readonly" @click="deleteImg"></div>
      </template>
    </priviewer>
  </div>
</template>
<script>
import Priviewer from '../previewer'
import { handleFile } from './utils'

// compatibility for window.URL
const URL =
  window.URL && window.URL.createObjectURL
    ? window.URL
    : window.webkitURL && window.webkitURL.createObjectURL
    ? window.webkitURL
    : null

export default {
  name: 'Uploader',
  components: {
    Priviewer
  },
  model: {
    prop: 'files',
    event: 'on-fileList-change'
  },
  props: {
    title: {
      type: String,
      default: '图片上传'
    },
    files: {
      type: Array,
      default: () => []
    },
    limit: {
      type: Number | String,
      default: 5
    },
    limitPrompt: {
      type: Function,
      default: (limit) => `不能上传超过${limit}张图片`
    },
    capture: {
      type: Boolean | String,
      default: false
    },
    enableCompress: {
      type: Boolean,
      default: true
    },
    maxWidth: {
      type: String | Number,
      default: 1024
    },
    quality: {
      type: String | Number,
      default: 0.92
    },
    url: {
      type: String
    },
    headers: {
      type: Object,
      default: () => {}
    },
    withCredentials: {
      type: Boolean,
      default: false
    },
    params: {
      type: Object
    },
    name: {
      type: String,
      default: 'file'
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: String | Boolean,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      fileList: this.files,
      currentIndex: 0
    }
  },
  filters: {
    filterList (list = []) {
      return list.map((item) => {
        const { url } = item
        return {
          src: url,
          msrc: url,
          w: 0,
          h: 0
        }
      })
    }
  },
  watch: {
    files: {
      deep: true,
      handler (files) {
        this.fileList = files
      }
    },
    fileList: {
      deep: true,
      handler (fileList) {
        this.$emit('on-fileList-change', fileList)
      }
    }
  },
  methods: {
    async change (e) {
      const {
        enableCompress,
        maxWidth,
        quality,
        limit,
        limitPrompt,
        fileList,
        autoUpload,
        uploadFile
      } = this
      const target = e.target || e.srcElement
      const inputChangeFiles = target.files
      if (inputChangeFiles.length > 0) {
        if (fileList.length + inputChangeFiles.length > limit) {
          alert(limitPrompt(limit))
          return
        }
        Promise.all(
          Array.prototype.map.call(inputChangeFiles, (file) => {
            const doSquash = file.type === 'image/jpeg'
            return handleFile(
              file,
              {
                maxWidth,
                quality,
                enableCompress
              },
              doSquash
            ).then((blob) => {
              const blobURL = URL.createObjectURL(blob)
              const fileItem = {
                url: blobURL,
                blob
              }
              for (let key in file) {
                if (['slice', 'webkitRelativePath'].indexOf(key) === -1) {
                  fileItem[key] = file[key]
                }
              }
              if (autoUpload) {
                this.$emit('before-upload')
                uploadFile(blob, fileItem)
                  .then((result) => {
                    const successAction = () => {
                      fileList.push(fileItem)
                      this.$emit('on-change', fileItem, fileList)
                    }
                    if (this.$listeners['after-upload']) {
                      this.$emit('after-upload', successAction)
                    } else {
                      successAction()
                    }
                  })
                  .catch((e) => {
                    const errorAction = () => fileList.push(fileItem)
                    if (this.$listeners['after-upload']) {
                      this.$emit('after-upload', errorAction)
                    } else {
                      errorAction()
                    }
                  })
              } else {
                fileList.push(fileItem)
                this.$emit('on-change', fileItem, fileList)
              }
            })
          })
        ).then(() => {
          this.$refs.input.value = ''
        })
      } else {
        this.$emit('on-cancel')
      }
    },
    handleFileClick (e, item, index) {
      this.$refs.previewer.show(index)
    },
    deleteImg () {
      const index = this.$refs.previewer.getCurrentIndex()
      const { fileList } = this
      const delAction = () => {
        const deleteItem = fileList[index]
        fileList.splice(index, 1)
        this.$nextTick(() => {
          this.$emit('on-change', deleteItem, fileList)
          this.$refs.previewer.close()
        })
      }
      if (this.$listeners['on-delete']) {
        this.$emit('on-delete', fileList[index], delAction)
      } else {
        delAction()
      }
    },
    uploadFile (blob, fileItem) {
      return new Promise((resolve, reject) => {
        const me = this
        const { url, params, name, headers, withCredentials } = me
        me.$set(fileItem, 'fetchStatus', 'progress')
        me.$set(fileItem, 'progress', 0)
        const formData = new FormData()
        const xhr = new XMLHttpRequest()
        formData.append(name, blob)
        if (params) {
          for (let key in params) {
            formData.append(key, params[key])
          }
        }
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              const result = JSON.parse(xhr.responseText)
              me.$emit('on-success', result, fileItem)
              me.$set(fileItem, 'fetchStatus', 'success')
              resolve(result)
            } else {
              me.$emit('on-error', xhr)
              me.$set(fileItem, 'fetchStatus', 'fail')
              reject(xhr)
            }
          }
        }
        xhr.upload.addEventListener(
          'progress',
          function (evt) {
            if (evt.lengthComputable) {
              const precent = Math.ceil((evt.loaded / evt.total) * 100)
              me.$set(fileItem, 'progress', precent)
            }
          },
          false
        )

        xhr.open('POST', url, true)

        for (let key in headers) {
          if (headers.hasOwnProperty(key) && headers[key] !== null) {
            xhr.setRequestHeader(key, headers[key])
          }
        }

        if (withCredentials && 'withCredentials' in xhr) {
          xhr.withCredentials = true
        }

        xhr.send(formData)
      })
    }
  }
}
</script>
<style lang="less">
@font-face {
  font-weight: normal;
  font-style: normal;
  font-family: 'weui';
  src: url('data:application/octet-stream;base64,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')
    format('truetype');
}

.vux-uploader {
  padding: 10px 15px;
  .vux-uploader_hd {
    display: flex;
    padding-bottom: 10px;
    .vux-uploader_title {
      flex: 1;
    }
    .vux-uploader_info {
      color: #b2b2b2;
    }
  }
  .vux-uploader_bd {
    overflow: hidden;
    margin-left: -9px;
    .vux-uploader_files {
      list-style: none;
      .vux-uploader_file {
        float: left;
        margin-left: 9px;
        margin-bottom: 9px;
        width: 79px;
        height: 79px;
        background: no-repeat center center;
        background-size: cover;
      }
      .vux-uploader_file-status {
        position: relative;
        &:before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.4);
        }
      }
      .vux-uploader_file-content {
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        color: #fff;
        .upload-error {
          display: inline-block;
          font-size: 23px;
          color: #f43530;
          font-family: 'weui';
          font-style: normal;
          &:before {
            content: '\EA0B';
          }
        }
      }
    }
    .vux-uploader_input-box {
      float: left;
      position: relative;
      margin-left: 9px;
      margin-bottom: 9px;
      width: 77px;
      height: 77px;
      border: 1px solid #d9d9d9;
      &:before,
      &:after {
        content: ' ';
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        background-color: #d9d9d9;
      }
      &:before {
        width: 2px;
        height: 39.5px;
      }
      &:after {
        width: 39.5px;
        height: 2px;
      }
      .vux-uploader_input {
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      }
    }
  }
  .vux-uploader_del {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #0d0d0d;
    color: #ffffff;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-family: 'weui';
    &:after {
      color: #ffffff;
      font-size: 22px;
      content: '\EA11';
    }
  }
}
</style>

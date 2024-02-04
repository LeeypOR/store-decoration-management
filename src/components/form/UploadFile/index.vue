<template>
<div>
  <slot name="customBtn"></slot>
  <a-upload
    name="file"
    :multiple="multiple"
    :action="`${BASE_URL}/upload`"
    :disabled="disabled"
    :accept="accept"
    @change="handleChange"
    @preview="handlePreview"
    :file-list="fileList"
    :beforeUpload="beforeUpload"
    :showUploadList="showUploadList"
    >
    <a-button :disabled="disabled" v-if="!isCustomBtn"><a-icon type="upload" />点击上传</a-button>
    <slot></slot>
  </a-upload>
</div>
</template>
<script>
import {BASE_URL} from '@/axios/config'
import {makeId} from '@/utils'
export default {
  name: 'upload-file',
  data () {
    return {
      BASE_URL,
      headers: {
        'Content-Type':'multipart/form-data',
        'Auth-Token': window.localStorage.storetoken
      },
      defaultFileList: [],
      fileList: [], // 格式[{url: "https://testsd.cicd.vpclub.cn/opo-mode/20210223/2021022315485363.jpg"}]
    }
  },
  props: {
    formKey: {// 表单项绑定的属性名，可用于当上传值发生变化时做回调处理
      type: String,
      required: false,
    }, 
    value: String, // 表单值 格式 'xxx,xxxx'
    limit: { // 最大上传数量，默认为1就是单文件上传，0代表不限制
      type: Number,
      default: 1
    },
    disabled:{ // 是否禁用
      type: Boolean,
      default: false
    },
    accept:{ // 允许的文件格式
      type: String,
      default: ''
    },
    fileSizeLimit: { // 文件大小限制单位byte
      type: Number,
      default: 5242880
    },
    isCustomBtn:{
      type:Boolean,
      default:false,
    },
    multiple:{
      type:Boolean,
      default:false,
    },
    showUploadList:{ // 是否展示上传文件列表，设置为false时可以自己在页面定义上传后文件的展示方式
      type: Boolean,
      default: true
    },
    isVideo:{ // 是否是上传视频，上传视频可以预览
      type:Boolean,
      default:false,
    },
  },
  watch: {
    value: {
      immediate: true,
      handler (value) {
        if (value && value.length) {
          this.fileList = value.split(',').map(item => ({
            name: item,
            url: item,
            uid: makeId('upload-file'),
            status: 'done'
          }))
        } else {
          this.fileList = []
        }
      }
    }
  },
  methods: {
    handlePreview (file) {
      if (this.isVideo) {
        this.$info({
          title:'预览视频',
          okText: '关闭',
          closable: true,
          maskClosable: true,
          width: 'fit-content',
          content: <video src={file.name} controls autoplay  style="max-width: 400px; max-height: 400px" />
        })
      } else {
        window.open(file.name)
      }
    },
    beforeUpload (file, fileList) {
      // console.log('beforeUploadfile-----', file)
      // console.log('beforeUploadfileList-----', fileList)
      return new Promise((resolve, reject)=> {
        const suffix = file.name.substring(file.name.lastIndexOf('.')).toLowerCase()
        if (this.fileSizeLimit && file.size > this.fileSizeLimit) {
          this.$message.warning(`文件大小超出${(this.fileSizeLimit / 1024 / 1024).toFixed(1)}M限制！`)
          reject()
        } else if (this.accept && this.accept.toLowerCase().split(',').indexOf(suffix) === -1) {
          this.$message.warning(`仅支持上传${this.accept}格式的文件！`)
          reject()
        } else {
          resolve()
        }
      })
    },
    handleChange ({file, fileList, e}) {
      // console.log('file-----', file)
      // console.log('fileList-----', fileList)
      if (file.status === 'done' || file.status === 'removed') {
        // 上传接口返回失败
        if (file && file.response && file.response.returnCode !== 1000) {
          this.fileList = fileList.filter(item => item.uid !== file.uid)
          this.$message.error(file.response.message)
          return
        }

        if (this.limit && fileList.length >= this.limit) {
          fileList.splice(0, fileList.length - this.limit)
        }
        const result = fileList.filter(item => item.status === 'done').map(item => {
          if (item.response && item.response.dataInfo && item.response.dataInfo.url) {
            return item.response.dataInfo.url
          }
          return item.name
        }).filter(item => item).join(',')
        this.$emit('change', result)
        this.$emit('input', result)
      }
      if (file.status === 'error') {
        this.$message.error('上传发生错误，请稍后重试！')
        fileList = fileList.filter(item => item.status === 'done')
      }
      this.fileList = fileList
    },
  }
}
</script>
<style lang="scss" scoped>

</style>
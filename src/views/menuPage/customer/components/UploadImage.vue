<template>
<a-upload
    name="file"
    :multiple="multiple"
    :action="`${BASE_URL}/upload`"
    :disabled="disabled"
    :accept="accept"
    :before-upload="beforeUpload"
    @change="handleChange"
    @preview="handlePreview"
    :file-list="fileList"
    :show-upload-list="showUploadList"
    list-type="picture-card"
  >
    <a-icon type="plus" v-if="!disabled && showUploadList" />
    
    <template v-if="!showUploadList">
      <img v-if="this.imgUrl || value" :src="imgUrl || value" alt="avatar" />
      <div v-else>
        <a-icon type="plus" />
      </div>
    </template>
  </a-upload>
</template>
<script>
import { BASE_URL } from '@/axios/config'
import { makeId } from '@/utils'
export default {
  name: 'UploadImage',
  data () {
    return {
      BASE_URL,
      headers: {
        'Auth-Token': window.localStorage.storetoken
      },
      fileList: [], // 格式[{url: "https://testsd.cicd.vpclub.cn/opo-mode/20210223/2021022315485363.jpg"}]
      imgUrl:'',
      uploadCount:0,
    }
  },
  props: {
    formKey: { // 表单项绑定的属性名，可用于当上传值发生变化时做回调处理
      type: String,
      required: false
    },
    value: String, // 表单值 格式 'xxx,xxxx'
    limit: { // 最大上传数量，默认为1就是单文件上传，0不限制数量
      type: Number,
      default: 1
    },
    disabled: { // 是否禁用
      type: Boolean,
      default: false
    },
    accept: { // 允许的文件格式
      type: String,
      default: 'image/gif,image/jpeg,image/png,image/jpg'
    },
    multiple:{
      type:Boolean,
      default:false,
    },
    showUploadList:{
      type:Boolean,
      default:true,
    },
    fileSizeLimit: { // 文件大小限制单位byte，默认5M
      type: Number,
      default: 5242880
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
            uid: makeId('upload-image'),
            status: 'done'
          }))
        } else {
          this.fileList = []
        }
      }
    }
  },
  methods: {
    beforeUpload(file,fileList){
      this.uploadCount=fileList.length+this.fileList.length;
    },
    handlePreview (file) {
      this.$info({
        title:'预览(点击图片可查看原图)',
        okText: '关闭',
        closable: true,
        maskClosable: true,
        width: 'fit-content',
        content: <img src={file.name} onClick={()=> window.open(file.name)} style="max-width: 400px; max-height: 400px" />
      })
    },
    handleChange ({ file, fileList, e }) {
      console.log('file-----', file)
      console.log('fileList-----', fileList)
      if(this.uploadCount>this.limit){
        this.$message.error(`最多上传${this.limit}张图片`)
        return;
      }
      if (this.fileSizeLimit && file.size > this.fileSizeLimit) {
        this.$message.warning(`文件大小超出${(this.fileSizeLimit / 1024 / 1024).toFixed(1)}M限制！`)
        return;
      }
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
        }).filter(item => item);
        const result_str=result.join(',')

        this.imgUrl=result_str;
        
        if(this.uploadCount==result.length || file.status=='removed'){
          console.log('=====result_str=====',result_str)
          this.$emit('change', result_str)
          this.$emit('input', result_str)
        }
      }
      this.fileList = fileList
    }
  }
}
</script>
<style lang="scss" scoped>

</style>

<template>
<a-upload
  name="file"
  :multiple="multiple"
  :disabled="disabled"
  :accept="accept"
  @preview="handlePreview"
  :file-list="fileList"
  :showUploadList="showUploadList"
  :customRequest="customRequest"
  :remove="handleRemove"
  >
  <!-- 
  :beforeUpload="beforeUpload"
  :action="`${BASE_URL}/upload`"
  @change="handleChange" -->
  <slot></slot>
  <a-space>
    <a-button :disabled="disabled" v-if="!isCustomBtn"><a-icon type="upload" />点击上传</a-button>
    <a-icon :type="loading ? 'loading' : ''" />
  </a-space>
</a-upload>
</template>
<script>
import {BASE_URL} from '@/axios/config'
import {makeId} from '@/utils'
export default {
  name: 'upload-file',
  data () {
    return {
      loading:false,
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
    fileSizeLimit: { // 文件大小限制单位byte，默认5M
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
    isAllow:{
      type:Boolean,
      default:true,
    },
      cardId:{
        type:String
      }
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
    handleRemove(file){
      if(this.isAllow){
        console.log(file)
        this.fileList.forEach((fileInfo,index)=>{
          if(fileInfo.uid==file.uid){
            this.fileList.splice(index,1);
          }
        });
        console.log(this.fileList);
        this.$emit('remove',file);
      }
      else {
        this.$message.error('不允许删除');
      }
    },
    async customRequest(file){
      console.log(this.accept,file,this.accept.includes(file.file.type))
      if(this.limit!==0 && this.fileList.length>=this.limit){
        this.$message.error(`最多上传${this.limit}个文件`)
        return;
      }
      if(this.accept && !this.accept.includes(file.file.type.split('/')[1])){
        this.$message.error('上传文件格式不在允许范围');
        return;
      }
      if(this.fileSizeLimit!==0 && file.file.size>this.fileSizeLimit){
        this.$message.warning(`文件大小超出${(this.fileSizeLimit / 1024 / 1024).toFixed(1)}M限制！`)
        return;
      }
      this.loading=true;
      console.log('customRequest',file);
      let form = new FormData();
      form.append('file',file.file);
      // form.append('cardId',this.cardId);
      // form.append('name',file.file.name);
      // form.append('type',file.file.type);
      // form.append('size',file.file.size);
      console.log(form)
      this.$emit('change',form);
/*      let res = await this.$post(`goldenhome/member/admin_/external/customer/import`,form);
      if(res && res.returnCode==1000){
        console.log(res)
        let fileInfo={
          name:file.file.name,
          type:file.file.type,
          size:file.file.size,
          url:(res.dataInfo || {}).url,
          uid:file.file.uid
        };
        this.fileList.push(fileInfo);
        this.loading=false;
        this.$emit('change',fileInfo, this.fileList);
      }
      else {
        this.loading=false;
      }*/
    },
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
    // beforeUpload (file, fileList) {
    //   // console.log('beforeUploadfile-----', file)
    //   // console.log('beforeUploadfileList-----', fileList)
    //   return new Promise((resolve, reject)=> {
    //     const suffix = file.name.substring(file.name.lastIndexOf('.')).toLowerCase()
    //     if (this.fileSizeLimit && file.size > this.fileSizeLimit) {
    //       this.$message.warning('文件大小超出限制！')
    //       reject()
    //     } else if (this.accept && this.accept.toLowerCase().split(',').indexOf(suffix) === -1) {
    //       this.$message.warning(`仅支持上传${this.accept}格式的文件！`)
    //       reject()
    //     } else {
    //       resolve()
    //     }
    //   })
    // },
    // handleChange ({file, fileList, e}) {
    //   // console.log('file-----', file)
    //   // console.log('fileList-----', fileList)
    //   if (file.status === 'done' || file.status === 'removed') {
    //     // 上传接口返回失败
    //     if (file && file.response && file.response.returnCode !== 1000) {
    //       this.fileList = fileList.filter(item => item.uid !== file.uid)
    //       this.$message.error(file.response.message)
    //       return
    //     }

    //     if (this.limit && fileList.length >= this.limit) {
    //       fileList.splice(0, fileList.length - this.limit)
    //     }
    //     const result = fileList.filter(item => item.status === 'done').map(item => {
    //       if (item.response && item.response.dataInfo && item.response.dataInfo.url) {
    //         return item.response.dataInfo.url
    //       }
    //       return item.name
    //     }).filter(item => item).join(',')
    //     this.$emit('change', result)
    //     this.$emit('input', result)
    //   }
    //   if (file.status === 'error') {
    //     this.$message.error('上传发生错误，请稍后重试！')
    //     fileList = fileList.filter(item => item.status === 'done')
    //   }
    //   this.fileList = fileList
    // },
  }
}
</script>
<style lang="scss" scoped>

</style>
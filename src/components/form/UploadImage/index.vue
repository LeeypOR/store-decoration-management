<template>
<span class="upload-image-component">
  <draggable :value="fileList" @end="dragEnd" animation="300" class="upload-image-list">
    <div 
      class="upload-image-list-item"
      v-for="item in fileList" 
      :key="item.id" >
        <video v-if="isVideo" preload="metadata" class="upload-image-list-item-img" :src="item.url" />
        <img v-else class="upload-image-list-item-img" :src="item.url" />
        <div class="upload-image-list-item-opration">
          <a-icon @click.stop="handlePreview(item)" class="pointer upload-image-list-item-opration-icon upload-image-list-item-opration-preview" type="eye" />
          <a-icon @click.stop="removeImage(item)" class="pointer upload-image-list-item-opration-icon" type="delete" v-if="!disabled" />
        </div>
    </div>
  </draggable>
  <a-upload
    name="file"
    :multiple="limit > 1"
    :disabled="disabled"
    :accept="accept"
    @preview="handlePreview"
    :file-list="fileList"
    list-type="picture-card"
    :beforeUpload="beforeUpload"
    :showUploadList="false"
    :customRequest="uploadImage"
  >
    <a-spin :spinning="uploading" v-if="!disabled && !customUploadBtn">
      <a-icon type="plus" />
      <div
        class="ant-upload-text"
        v-if="uploadTextHtml"
        v-html="uploadTextHtml"></div>
      <a-progress :showInfo="false" v-if="uploading" :percent="percent" :strokeWidth="3" size="small" />
    </a-spin>
  </a-upload>
  <slot name="uploadBtn"></slot>
</span>
</template>
<script>
import {makeId} from '@/utils'
import draggable from 'vuedraggable'
export default {
  name: 'upload-image',
  components: {
    draggable
  },
  data () {
    return {
      percent: 0,
      uploading: false,
      files:[],
      fileList: [], // 格式[{url: "https://testsd.cicd.vpclub.cn/opo-mode/20210223/2021022315485363.jpg"}]
    }
  },
  computed: {
    fileSizeLimitTip () {
      if (this.fileSizeLimit) {
        if (this.fileSizeLimit >= (1024 * 1024)) { // 大于1M
          return `最大限制: ${(this.fileSizeLimit / 1024 / 1024).toFixed(1)}M`
        } else {
          return `最大限制: ${(this.fileSizeLimit / 1024).toFixed()}k`
        }
      } else {
        return ''
      }
    }
  },
  props: {
    headParams: { // 更改请求头
      type: Object,
      default () {
        return {}
      }
    },
    otherParams: { // 其他参数
      type: Object,
      default () {
        return {}
      }
    },
    uploadUrl: { // 上传地址
      type: String,
      default: '/upload'
    },
    formKey: {// 表单项绑定的属性名，可用于当上传值发生变化时做回调处理
      type: String,
      required: false,
    }, 
    value: String, // 表单值 格式 'xxx,xxxx'
    limit: { // 最大上传数量，默认为1就是单文件上传
      type: Number,
      default: 1
    },
    fileSizeLimit: { // 文件大小限制单位byte，默认5M
      type: Number,
      default: 5242880
    },
    disabled:{ // 是否禁用
      type: Boolean,
      default: false
    },
    isVideo:{ // 是否时上传视频
      type: Boolean,
      default: false
    },
    accept:{  // 允许的文件格式(字母必须全小写)
      type: String,
      default: '.gif,.png,.jpg,.jpeg,.webp'
    },
    customUploadBtn:{
      type:Boolean,
      default:false,
    },
    uploadTextHtml: { // 提示文字
      type: String,
      default: ''
    },
    beforeUploadFun: { // 上传前图片处理
      type: Function
    },
    afterUploadFun: { // 上传完图片处理数据
      type: Function
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
    dragEnd (target) {
      if (target.newIndex !== target.oldIndex && !this.disabled) { // 拖拽成功了
        const valueList = this.value.split(',')
        // let temp = valueList[target.newIndex]
        // valueList[target.newIndex] = valueList[target.oldIndex]
        // valueList[target.oldIndex] = temp
        // const result = valueList.join(',')

        let temp=valueList[target.oldIndex];
        valueList.splice(target.oldIndex,1);
        valueList.splice(target.newIndex, 0, temp);
        const result = valueList.join(',');
        
        this.$emit('change', result)
        this.$emit('input', result)
        this.$emit('urls',result);//选中顺序与显示顺序一致添加的事件
        // console.log('拖拽结束，成功了----', result)
        // console.log('target',target);
        // console.log('valueList',valueList)
      }
    },
    // 删除一个图片，用于自定义的文件列表
    removeImage (target) {
      const index = this.fileList.findIndex(item => item === target)
      this.fileList.splice(index, 1)
      const result = this.fileList.map(item => item.url).join(',')
      
      this.files.splice(index,1);

      // console.log(this.files,this.fileList)

      this.$emit('change', result)
      this.$emit('input', result)
      this.$emit('urls',result);
    },
    handlePreview (file) {
      let title = '', content = ''
      if (this.isVideo) {
        title = '预览视频'
        content = <video autoplay src={file.name} controls style="max-width: 400px; max-height: 400px" />
      } else {
        title = '预览(点击图片可查看原图)'
        content = <img src={file.name} onClick={()=> window.open(file.name)} style="max-width: 400px; max-height: 400px" />
      }
      this.$info({
        title,
        okText: '关闭',
        closable: true,
        maskClosable: true,
        width: 'fit-content',
        content
      })
    },
    beforeUpload (file, fileList) {
      // console.log('beforeUploadfile-----', file)
      // console.log('beforeUploadfileList-----', fileList)
      if (this.beforeUploadFun && this.beforeUploadFun instanceof Function) {
        // this.beforeUploadFun(res.dataInfo)
        return this.beforeUploadFun(file)
      }
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
    onUploadProgress (e) {
      const percent = (e.loaded / e.total * 100).toFixed()
      this.percent = +percent
      if (this.percent !== 100) {
        this.uploading = true
      }
    },
    uploadImage (e) {
      const file = e.file
      this.files.push(file);
      // console.log('file',file);
      // console.log('fileList',this.fileList);
      // console.log('files',this.files);
      this.uploading = true
      this.$upload(this.uploadUrl,
        file,
        {
          ...this.headParams,
          ...this.otherParams,
          onUploadProgress: this.onUploadProgress
        }).then(res => {
        this.uploading = false
        if (res && res.returnCode === 1000) {
          if (this.afterUploadFun && this.afterUploadFun instanceof Function) {
            this.afterUploadFun(res.dataInfo)
          } else {
            const url = res.dataInfo.url
            let values = []
            if (this.limit > 1 && this.value) {
              values = this.value.split(',')
            }
            values.push(url)
            if (values.length > this.limit) {
              values.splice(0, values.length - this.limit)
            }
            const value = values.join(',')
            this.$emit('change', value)
            this.$emit('input', value)
            // console.log('value',value);
            // console.log('values',values);

            //选中顺序与显示顺序一致
            let count=0;
            this.files.forEach((f,i)=>{
              if(f.uid==file.uid){
                this.files[i].url=url;
              }
              if(this.files[i].url){
                count++;
              }
            });
            // console.log(count,this.files.length)
            if(count==this.files.length){
              let urls=[];
              this.files.forEach(file=>{
                urls.push(file.url);
              })
              this.$emit('urls',urls.join(','));
            }
          }
        }
      }).catch(err=> {
        this.uploading = false
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

        if (fileList.length >= this.limit) {
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
<style lang="less" scoped>
.upload-image-component {
  /deep/.ant-upload-picture-card-wrapper {
    width: auto;
  }
  display: flex;
  flex-wrap: wrap;
  .upload-image-list {
    // display: flex;
    // flex-wrap: wrap;
    margin-bottom: 4px;
    &-item {
      display: inline-block;
      width: 104px;
      height: 104px;
      padding: 8px;
      border:1px solid #d9d9d9;
      border-radius: 4px;
      margin-right: 8px;
      position: relative;
      overflow: hidden;
      &-img {
        width: 100%;
        height: 100%;
      }
      &:hover {
        .upload-image-list-item-opration {
          opacity: 1;
        }
      }
      &-opration {
        width: 86px;
        height: 86px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0,.5);
        justify-content: center;
        align-items: center;
        display: flex;
        opacity: 0;
        transition: opacity .2s linear;
        font-size: 14px;
        &-icon {
          color: #fff;
        }
        &-preview {
          margin-right: 8px;
        }

      }
    }
  }
}
/deep/.ant-upload-text{
  font-size: 10px !important;
}
</style>
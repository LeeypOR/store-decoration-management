<!--  -->
<template>
  <div class="image_upload">
    <a-upload
      name="file"
      list-type="picture-card"
      class="avatar-uploader"
      :accept="accept"
      :show-upload-list="false"
      :before-upload="beforeUpload"
      @change="handleChange"
    >
      <div class="image_wrap" v-if="imageUrl">
        <img class="image" :src="imageUrl" alt="avatar" />
        <div class="text">{{ changeUploadText }}</div>
      </div>
      <div v-else style="margin-top: 8px">
        <a-icon :type="loading ? 'loading' : 'plus'" />
        <div
          class="ant-upload-text"
          v-if="uploadTextHtml"
          v-html="uploadTextHtml"
        ></div>
        <div class="ant-upload-text" v-else>
          {{ uploadText }}
        </div>
      </div>
    </a-upload>

    <!-- modal -->
    <cropper-modal
      ref="CropperModal"
      :defaultScaleVal="defaultScaleVal"
      :scaleList="scaleList"
      @cropper-no="handleCropperClose"
      @cropper-ok="handleCropperSuccess"
      @scaleChange="scaleChange"></cropper-modal>
  </div>
</template>

<script>
import { BASE_URL } from "@/axios/config";
import CropperModal from './CropperModal'
// function getBase64 (file) {
// 	return new Promise((resolve, reject) => {
// 		const reader = new FileReader()
// 		reader.readAsDataURL(file)
// 		reader.onload = () => resolve(reader.result)
// 		reader.onerror = (error) => reject(error)
// 	})
// }

export default {
  name: "CropperUpload",
  components: {
    CropperModal
  },
  directives: {},
  filters: {},
  mixins: [],
  model: {
    prop: "imageUrl",
    event: "upload",
  },
  props: {
    // 图片地址
    imageUrl: {
      type: String,
      default: '',
    },
    // 上传前文字显示
    uploadText: {
      type: String,
      default: "上传",
    },
    // 
    uploadTextHtml: {
      type: String,
      default: "",
    },
    // 上传完毕文字显示
    changeUploadText: {
      type: String,
      default: "更换图片",
    },
    // 默认裁剪比例
    defaultScaleVal: {
      type: String,
      default: ''
    },
    // 裁剪比例集合
    scaleList: {
      type: Array,
      default() {
        return [
          { label: '3:2', value: '3-2', width: 180, height: 120, scale:[3, 2] },
          { label: '1:1', value: '1-1', width: 180, height: 180, scale:[1, 1] },
          { label: '3:4', value: '3-4', width: 180, height: 240, scale:[3, 4] },
          { label: '16:9', value: '16-9', width: 160, height: 90, scale:[16, 9] },
          { label: '自定义', value: 'diy' }
        ]
      }
    },
    //图片裁切配置
    options: {
      type: Object,
      default: function () {
        return {
          info: true, // 裁剪框的大小信息
          full: true, // 是否输出原图比例的截图
          original: false, // 上传图片按照原始比例渲染
          centerBox: true, // 截图框是否被限制在图片里面
          high: true, // 是否按照设备的dpr 输出等比例图片
          infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
          canScale: true, // 图片是否允许滚轮缩放
          autoCrop: true, // 是否默认生成截图框
          autoCropWidth: 100, // 默认生成截图框宽度
          autoCropHeight: 100, // 默认生成截图框高度
          enlarge: 1,// 图片根据截图框输出比例倍数
          fixed: true, // 是否开启截图框宽高固定比例
          fixedBox: false, // 是否固定截图框大小 不允许改变
          fixedNumber: [1,1], // 截图框的宽高比例
          previewsCircle: false, //预览图是否是原圆形
          title: '图片裁剪',
        }
      },
    },
    // 上传图片的大小，单位M
    imgSize: {
      type: Number,
      default: 5,
    },
    //图片存储在oss上的上级目录名
    imgType: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      // uploadText: '上传',
      BASE_URL,
      // uploadUrl: `${ BASE_URL }/upload`,
      loading: false,
      // imageUrl: '',
      accept: "image/jpeg,image/png,image/jpg",
    };
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
  // 方法集合
  methods: {
    handleChange({ file, fileList, e }) {
      if (this.isStopRun) {
        return
      }
      if (file.status === "uploading") {
        this.loading = true;
        return;
      }
      // console.log('file', file)

      const { options } = this
      this.getBase64(file.originFileObj, (imageUrl) => {
        const target = Object.assign({}, options, {
          img: imageUrl,
        })
        this.$refs.CropperModal.edit(target)
      })
    },
    beforeUpload(file) {
      this.isStopRun = false
      var fileType = file.type
      if (fileType.indexOf('image') < 0) {
        this.$message.warning('请上传图片')
        this.isStopRun = true
        return false
      }
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
      if (!isJpgOrPng) {
        // this.$message.error('你上传图片格式不正确!')
        this.$message.error('图片类型必须为.jpeg/.jpg/.png格式')
        this.isStopRun = true
        return false
      }
      const isLtSize = file.size < this.imgSize * 1024 * 1024
      if (!isLtSize) {
        this.$message.error('图片大小不能超过' + this.imgSize + 'MB!')
        this.isStopRun = true
        return false
      }
      return isJpgOrPng && isLtSize
    },
    //获取服务器返回的地址
    handleCropperSuccess(data) {
      //将返回的数据回显
      this.loading = false
      this.$emit('upload', data)
      // this.$emit('crop-upload-success', data)
    },
    // 取消上传
    handleCropperClose() {
      this.loading = false
      // this.$emit('crop-upload-close')
    },
    getBase64(img, callback) {
      const reader = new FileReader()
      reader.addEventListener('load', () => callback(reader.result))
      reader.readAsDataURL(img)
    },
    scaleChange(data) {
      this.$emit('scaleChange', data)
    }
  },
};
</script>
<style rel="stylesheet/less" lang="less" scoped>
//@import url();
.image_upload {
  /deep/.avatar-uploader {
    .ant-upload {
      // width: 1.04rem;
      // height: 1.04rem;
      display: block;
      width: 0.65rem;
      height: 0.65rem;
      padding: 0;
      .image_wrap {
        position: relative;
        width: 100%;
        height: 100%;
        // width: 0.6rem;
        // height: 0.6rem;
        .image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .text {
          width: 100%;
          background-color: rgba(0, 0, 0, 0.6);
          color: #fff;
          position: absolute;
          bottom: 0;
          text-align: center;
          // left: 50%;
          // transform: translateX(-50%);
          white-space: nowrap;
        }
      }
    }
    // width: 0.6rem;
    // height: 0.6rem;
  }
}
// /deep/ .avatar-uploader > .ant-upload {
//   width: 128px;
//   height: 128px;
// }
// .ant-upload-select-picture-card i {
// 	font-size: 32px;
// 	color: #999;
// }

// .ant-upload-select-picture-card .ant-upload-text {
// 	margin-top: 8px;
// 	color: #666;
// }
/deep/.ant-upload-text{
  font-size: 10px !important;
}
</style>

<!--  -->
<template>
  <div class="image_upload">
    <a-upload
      name="file"
      list-type="picture-card"
      class="avatar-uploader"
      :accept="accept"
      :show-upload-list="false"
      :action="`${BASE_URL}/upload`"
      :before-upload="beforeUpload"
      @change="handleChange"
    >
      <div class="image_wrap" v-if="imageUrl">
        <img class="image" :src="imageUrl" />
        <div class="text">{{ changeUploadText }}</div>
      </div>
      <div v-else>
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
  </div>
</template>

<script>
import { BASE_URL } from "@/axios/config";
// function getBase64 (file) {
// 	return new Promise((resolve, reject) => {
// 		const reader = new FileReader()
// 		reader.readAsDataURL(file)
// 		reader.onload = () => resolve(reader.result)
// 		reader.onerror = (error) => reject(error)
// 	})
// }

export default {
  name: "ImageUpload",
  components: {},
  directives: {},
  filters: {},
  mixins: [],
  model: {
    prop: "imageUrl",
    event: "upload",
  },
  props: {
    imageUrl: {
      type: String,
      default: "",
    },
    uploadText: {
      type: String,
      default: "上传图片",
    },
    uploadTextHtml: {
      type: String,
      default: "",
    },
    changeUploadText: {
      type: String,
      default: "更换图片",
    },
  },
  data() {
    return {
      // uploadText: '上传',
      BASE_URL,
      // uploadUrl: `${ BASE_URL }/upload`,
      loading: false,
      // imageUrl: '',
      accept: "image/gif,image/jpeg,image/png,image/jpg",
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
      if (file.status === "uploading") {
        this.loading = true;
        return;
      }
      // console.log('file', file)

      if (file.status === "done") {
        console.log("status", file.status);
        console.log("file.response", file.response);
        // 上传接口返回失败
        if (file && file.response && file.response.returnCode !== 1000) {
          // this.fileList = fileList.filter(item => item.uid !== file.uid)
          this.$message.error(file.response.message);
          return false;
        } else {
          console.log("success file", file);
          // this.imageUrl = file.response.dataInfo.url
          const imageUrl = file.response.dataInfo.url;
          this.loading = false;
          this.$emit("upload", imageUrl);
        }

        // getBase64(info.file.originFileObj)
        // 	.then((imageUrl) => {
        // 		this.imageUrl = imageUrl
        // 		this.loading = false
        // 	})
        // 	.catch((err) => console.log(err))
      }
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("你只能上传png或jpg图片!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("图像必须小于2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
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
      width: 0.8rem;
      height: 0.8rem;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
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
</style>

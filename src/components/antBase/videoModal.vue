
<template>
  <a-modal
    width="820px"
    :title="titleName"
    :visible="visible"
    :destroyOnClose="true"
    :maskClosable="false"
    :keyboard="false"
    @cancel="closeModal"
  >
    <template slot="footer">
      <div class="flex_between">
        <div>
          <!-- <a-upload list-type="picture" :action="`${BASE_URL}/upload`" @change="handleChange" :before-upload="beforeUpload" :accept="accept" :show-upload-list="false"> -->
          <a-button @click="uploadFile">{{ btnName }}</a-button>
          <a-button
            @click="dealImg"
            :loading="Btnloading"
            v-if="ContentType == 'image'"
            >裁切图片</a-button
          >
          <!-- </a-upload> -->
        </div>
        <div class>
          <a-button key="back" @click="confirmModal" :loading="Btnloading"
            >确定</a-button
          >
          <!-- <a-button key="submit" type="primary" @click="handleSubmit">确定</a-button> -->
        </div>
      </div>
    </template>
    <div class="seaction">
      <div class="disFlex">
        <div class="left">
          <div>{{ ContentType == "video" ? "视频分组" : "图片分组" }}</div>
          <div>
            <a-tree
              :replaceFields="{
                children: 'children',
                title: 'directoryName',
                key: 'id',
                value: 'id',
              }"
              :tree-data="treeData"
              :expandedKeys.sync="expandedKeys"
              @select="onSelect"
            >
              <!--  <template #title="{ key: treeKey, title }">
                <a-dropdown :trigger="['contextmenu']">
                  <span>{{ title }}</span>
                  <template #overlay>
                    <a-menu @click="({ key: menuKey }) => onContextMenuClick(treeKey, menuKey)">
                       <a-menu-item key="1">1st menu item</a-menu-item>
                      <a-menu-item key="2">2nd menu item</a-menu-item>
                      <a-menu-item key="3">3rd menu item</a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </template>-->
            </a-tree>
          </div>
        </div>
        <div class="list">
          <div class="disFlex list_card">
            <div v-for="(item, i) in list" :key="i">
              <div class="card" @click="checkActived(item, i)">
                <div class="one">
                  <div
                    v-if="ContentType == 'video'"
                    class="img"
                    :style="{
                      backgroundImage: 'url(' + item.video.coverPicture + ')',
                    }"
                  ></div>
                  <div
                    v-else
                    class="img"
                    :style="{ backgroundImage: 'url(' + item.fileUrl + ')' }"
                  ></div>
                  <div class="details">
                    <span v-if="ContentType == 'video'">{{
                      item.video.videoLength | timeFilter
                    }}</span>
                    <span>{{ item.fileSize | fileSizeFilter }}</span>
                  </div>
                </div>
                <div class="text">{{ item.fileName }}</div>
                <div
                  class="iconfont icon-selected"
                  v-if="item.checkRadio"
                ></div>
              </div>
            </div>
          </div>
          <a-pagination
            :current="current"
            @change="changePage"
            :total="listTotal"
            :pageSize="pageSize"
          />
        </div>
      </div>
    </div>
    <MaterialVideo
      :visible="uploadVideoShow"
      @cancel="handleUploadVideoCancel"
      @submit="closeUpImg"
    ></MaterialVideo>
    <MaterialImage
      :visible="uploadImgShow"
      :fileSize="imgFileSize"
      @cancel="handleUploadVideoCancel"
      @submit="closeUpImg"
    ></MaterialImage>

    <cropper-modal
      ref="CropperModal"
      :defaultScaleVal="defaultScaleVal"
      :scaleList="scaleList"
      @cropper-no="handleCropperClose"
      @cropper-ok="handleCropperSuccess"
      @scaleChange="scaleChange"
    ></cropper-modal>
  </a-modal>
</template>
<script>
import { BASE_URL } from "@/axios/config";
import MaterialVideo from "@views/menuPage/shop/material/components/MaterialUploadVideo.vue";
import MaterialImage from "@views/menuPage/shop/material/components/MaterialUploadImage.vue";
import CropperModal from "@/components/antBase/CropperModal";
const treeData = [
  {
    title: "全部视频",
    key: "0-0",
    children: [
      {
        title: "分类视频",
        key: "0-0-0",
      },
    ],
  },
];
export default {
  name: "VideoModal",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    ContentType: {
      type: String,
      default: "video",
    },
    imgFileSize: {
      type: Number,
      default: 3 * 1024 * 1024,
    },
    fileSize: {
      type: Number,
      default: 2,
    },
    videoData: {
      type: Object,
      default() {
        return {};
      },
    },
    // 默认裁剪比例
    defaultScaleVal: {
      type: String,
      default: "diy",
    },
    // 裁剪比例集合
    scaleList: {
      type: Array,
      default() {
        return [
          {
            label: "3:2",
            value: "3-2",
            width: 180,
            height: 120,
            scale: [3, 2],
          },
          {
            label: "1:1",
            value: "1-1",
            width: 180,
            height: 180,
            scale: [1, 1],
          },
          {
            label: "3:4",
            value: "3-4",
            width: 180,
            height: 240,
            scale: [3, 4],
          },
          {
            label: "4:3",
            value: "4-3",
            width: 240,
            height: 180,
            scale: [4, 3],
          },
          {
            label: "16:9",
            value: "16-9",
            width: 160,
            height: 90,
            scale: [16, 9],
          },
          { label: "自定义", value: "diy" },
        ];
      },
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
          enlarge: 1, // 图片根据截图框输出比例倍数
          fixed: true, // 是否开启截图框宽高固定比例
          fixedBox: false, // 是否固定截图框大小 不允许改变
          fixedNumber: [1, 1], // 截图框的宽高比例
          previewsCircle: false, //预览图是否是原圆形
          title: "图片裁剪",
        };
      },
    },
    dataIndex: {
      //下标
      type: String,
      default: "",
    },
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    MaterialVideo,
    MaterialImage,
    CropperModal,
  },
  filters: {
    fileSizeFilter(item) {
      return eval(item / 1024 / 1024).toFixed(2) + "MB";
    },
    timeFilter(item) {
      let result = parseInt(item);
      let m =
        Math.floor((result / 60) % 60) < 10
          ? "0" + Math.floor((result / 60) % 60)
          : Math.floor((result / 60) % 60);
      let s =
        Math.floor(result % 60) < 10
          ? "0" + Math.floor(result % 60)
          : Math.floor(result % 60);
      // let res = ''
      // if (m !== '00') res += `${ m }min`
      // res += `${ s }`
      return `${m}:${s}`;
    },
  },
  data() {
    return {
      treeData,
      BASE_URL,
      expandedKeys: ["0-0-0", "0-0-1"],
      accept:
        "video/mp4,video/mov,video/m4v,video/flv,video/x-flv,video/mkv,video/wmv,video/avi,video/rmvb,video/3gp",
      titleName: "",
      btnName: "",
      uploadVideoShow: false,
      uploadImgShow: false,
      listUrl: "",
      list: [],
      checkValue: {},
      imgValue: {},
      videoValue: {},
      current: 1,
      pageSize: 12,
      listTotal: 0,
      fileDirectoryId: "",
      Btnloading: false,
    };
  },
  created() {},
  mounted() {},
  watch: {
    visible(n, o) {
      console.log("fileDirectoryId", this.fileDirectoryId);
      if (n) {
        this.listUrl = "";
        this.list = [];
        this.checkValue = {};
        this.imgValue = {};
        this.videoValue = {};
        this.current = 1;
        this.listTotal = 0;
        this.fileDirectoryId = "";
        if (this.ContentType == "video") {
          this.btnName = "上传视频";
          this.titleName = "选择视频";
          this.videoValue = this.videoData;
          // this.accept =
          //   'video/mp4,video/mov,video/m4v,video/flv,video/x-flv,video/mkv,video/wmv,video/avi,video/rmvb,video/3gp'
          this.listUrl = "goldenhome/decoration/admin_/file/video/page";
          this.getTreeList(
            "goldenhome/decoration/admin_/file/directory/video/tree"
          );
        } else {
          this.getTreeList(
            "goldenhome/decoration/admin_/file/directory/image/tree"
          );
          this.btnName = "上传图片";
          this.titleName = "选择图片";
          this.listUrl = "goldenhome/decoration/admin_/file/image/page";
          this.imgValue = this.videoData;
          // this.accept = 'image/gif,image/jpeg,image/png,image/jpg'
        }
        this.getMaterialList();
      }
    },
    listTotal(n) {
      console.log(n, "2222222222222");
    },
  },
  methods: {
    onContextMenuClick(treeKey, menuKey) {
      console.log(`treeKey: ${treeKey}, menuKey: ${menuKey}`);
    },
    onSelect(e) {
      this.fileDirectoryId = e[0] ? e[0] : this.fileDirectoryId;
      this.current = 1;
      this.getMaterialList();
    },
    closeModal() {
      this.$emit("cancel");
    },
    getBase64(url, imgType) {
      return new Promise((resolve, reject) => {
        var Img = new Image();
        var dataURL = "";
        // var imgType = url.substring(url.lastIndexOf(".") + 1);
        Img.setAttribute("crossOrigin", "Anonymous");
        Img.src = url + "?v=" + Math.random();
        Img.onload = function () {
          // 要先确保图片完整获取到，这是个异步事件
          var canvas = document.createElement("canvas"); // 创建canvas元素
          var width = Img.width; // 确保canvas的尺寸和图片一样
          var height = Img.height;
          canvas.width = width;
          canvas.height = height;
          canvas.getContext("2d").drawImage(Img, 0, 0, width, height); // 将图片绘制到canvas中
          dataURL = canvas.toDataURL(`image/${imgType}`); // 转换图片为dataURL
          resolve(dataURL);
        };
      });
    },
    async baseCallback(url, imgType) {
      try {
        console.log("执行");
        const res = await this.getBase64(url, imgType);
        // console.log(res); // 获取到结果
        return res;
      } catch (err) {
        console.log(err);
      }
    },

    confirmModal() {
      if (!this.checkValue) return this.$emit("cancel");
      this.$emit("upload", this.checkValue, this.dataIndex);
      // this.Btnloading = true;
      // const imgurl = await this.baseCallback(
      //   this.checkValue.fileUrl,
      //   this.checkValue.fileExtension
      // );
      // const { options } = this;
      // const target = await Object.assign({}, options, {
      //   img: imgurl,
      // });
      // await this.$refs.CropperModal.edit(target);
      // this.Btnloading = false;
    },
    async dealImg() {
      if (!this.checkValue) return this.$emit("cancel");
      // this.$emit("upload", this.checkValue);
      if (JSON.stringify(this.checkValue) != "{}") {
        this.Btnloading = true;
        const imgurl = await this.baseCallback(
          this.checkValue.fileUrl,
          this.checkValue.fileExtension
        );
        const { options } = this;
        const target = await Object.assign({}, options, {
          img: imgurl,
        });
        await this.$refs.CropperModal.edit(target);
        this.Btnloading = false;
      } else {
        this.$message.warn("请先选择一张图片");
      }
    },
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
      const isJpgOrPng = this.accept.includes(file.type);
      // const isVideo = file.type == 'video/mp4' || file.type == 'video/m4v' || file.type == 'video/avi'
      // if (!isJpgOrPng) {
      //   this.$message.error('You can only upload JPG file!')
      // }
      const isLt2M = file.size / 1024 / 1024 < this.fileSize;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
    uploadFile() {
      if (this.ContentType == "video") {
        this.uploadVideoShow = true;
      } else {
        this.uploadImgShow = true;
      }
    },
    handleUploadVideoCancel() {
      this.uploadVideoShow = false;
      this.uploadImgShow = false;
    },
    // 获取素材列表
    getMaterialList() {
      const { current, fileDirectoryId, listUrl, pageSize } = this;
      this.$get(listUrl, {
        current: current,
        size: pageSize,
        fileDirectoryId: fileDirectoryId,
      }).then((res) => {
        if (res && res.returnCode == 1000) {
          this.listTotal = res.dataInfo.total;
          this.list = res.dataInfo.records.map((item) => {
            var obj = item;
            obj.checkRadio = false;
            return obj;
          });
        }
      });
    },
    handleUploadVideoSubmit() {},
    // 当前选中视频图片
    checkActived(val, i) {
      this.checkValue = val;
      this.list = this.list.map((item) => {
        item.checkRadio = false;
        if (val.id == item.id) item.checkRadio = true;
        return item;
      });
    },
    closeUpImg() {
      this.current = 1;
      this.getMaterialList();
      this.uploadImgShow = false;
      this.uploadVideoShow = false;
    },
    getTreeList(a) {
      this.$get(a, {}).then((res) => {
        if (res && res.returnCode == 1000) {
          this.treeData = res.dataInfo;
        }
      });
    },
    changePage(e) {
      this.current = e;
      this.getMaterialList();
    },
    afterClose() {
      // console.log('xiaohui')
      // this.listUrl='';
      // this.list= [];
      // this.checkValue={};
      // this.imgValue= {};
      // this.videoValue= {};
      // this.current= 1;
      // this.listTotal=0;
      // this.fileDirectoryId=''
    },

    //获取服务器返回的地址
    handleCropperSuccess(data) {
      //将返回的数据回显
      this.loading = false;
      this.checkValue.fileUrl = data;
      this.$emit("upload", this.checkValue, this.dataIndex);
      // this.$emit('crop-upload-success', data)
    },
    // 取消上传
    handleCropperClose() {
      this.loading = false;
      // this.$emit('crop-upload-close')
    },
    scaleChange(data) {
      this.$emit("scaleChange", data);
    },
  },
};
</script>
<style lang="less" scoped>
.seaction {
  height: 400px;
}
/deep/.flex_between {
  display: flex;
  justify-content: space-between;
}
.disFlex {
  display: flex;
  justify-content: space-between;
}
.list {
  flex: 1;
  padding: 5px;
  position: relative;
  /deep/.ant-pagination {
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
.left {
  width: 150px;
  height: 400px;
  padding: 0 5px;
  border-right: 1px solid #ddd;
}
.list_card {
  justify-content: flex-start;
  flex: 1;
  flex-wrap: wrap;
  align-content: space-between;

  > div {
    width: 25%;
    margin-bottom: 20px;
  }
}
.card {
  position: relative;
  width: 96%;
  height: 104px;
  cursor: pointer;
  margin: 0 auto;
  .icon-selected {
    display: inline-block;
    position: absolute;
    bottom: -1px;
    right: 3px;
    color: #016bff;
  }
  .details {
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    width: 100%;
    justify-content: space-between;
    height: 20px;
    line-height: 20px;
    background: rgba(0, 0, 0, 0.4);
    padding: 0 3px;
    > span {
      font-size: 12px;
      color: #ffffff;
    }
  }
  .text {
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    color: #333333;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .one {
    position: relative;
    height: 84px;
  }
  img {
    width: 100%;
    height: 100%;
  }
  .img {
    width: 100%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
}
</style>

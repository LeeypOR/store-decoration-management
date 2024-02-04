<template>
  <div>
    <div class="title">微信小程序路径</div>
    <div class="copy flex">
      <input type="text" id="copyUrl" :value="url" readonly />
      <div class="btn copyBtn" data-clipboard-target="#copyUrl">复制</div>
    </div>
    <div class="desc">用于微信公众号添加小程序</div>
    <div class="row">
      <a v-if="subNavIndex == 1" href="javascript:" @click="downLoadPoster"
        >下载海报&nbsp;|&nbsp;</a
      >

      <a href="javascript:;" @click="downloadIamge">下载小程序码</a>
    </div>
  </div>
</template>

<script>
import ClipboardJS from "clipboard";
export default {
  data() {
    return {
      // url: `pages/home/miniPage`,
    };
  },
  props: {
    qrcode: {
      type: String,
      default: "",
    },
    subNavIndex: {
      type: Number,
    },
    name: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "",
    },
  },
  mounted() {
    this.$nextTick(() => {
      new ClipboardJS(".copyBtn");
    });
  },
  methods: {
    // canvas 下载小程序码
    downloadIamge() {
      let imgsrc = this.qrcode;
      let name = this.name;
      console.log(imgsrc, name);
      //下载图片地址和图片名
      let image = new Image();
      // 解决跨域 Canvas 污染问题
      image.setAttribute("crossOrigin", "anonymous");
      image.onload = function () {
        let canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        let context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
        let a = document.createElement("a"); // 生成一个a元素
        let event = new MouseEvent("click"); // 创建一个单击事件
        a.download = name || "photo"; // 设置图片名称
        a.href = url; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
      };
      image.src = imgsrc;
    },
    downLoadPoster() {
      this.$emit("downLoadPoster");
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .ant-divider {
  background: #016bff;
}
a {
  color: #016bff;
}
.title {
}
.copy {
  margin-top: 10px;
  input {
    background: #f8f8f8;
    border: 1px solid #c8c8c8;
    flex: 1;
    line-height: 32px;
    outline: none;
    padding: 0 6px;
  }
  .btn {
    background: #006bff;
    width: 80px;
    text-align: center;
    color: #ffffff;
    line-height: 32px;
    cursor: pointer;
  }
}
.desc {
  color: #999999;
  margin-top: 5px;
}
.row {
  margin-top: 15px;
}
</style>
<template>
  <!-- destroyOnClose仅仅是清除了模态框里的dom，但是pagemodal这个组件里的数值没有清楚，导致初始化异常 -->
  <div>
    <a-modal
      class="choose_url"
      width="920px"
      title="我的图片"
      :visible="visible"
      :destroyOnClose="true"
      :maskClosable="false"
      :keyboard="false"
      @cancel="closeModal"
      :confirmLoading="confirmLoading"
    >
      <template slot="footer">
        <a-button key="back" @click="closeModal"> 取消 </a-button>
        <a-button key="submit" type="primary" @click="handleSubmit">
          确定
        </a-button>
      </template>
      <div class="mainText">
        <div class="leftMenu">
          <div class="upBtn" @click="uploadMydesk">上传图片</div>
          <MaterialAside
            :type="1"
            :show="false"
            style="margin-top: -20px"
            @select="choosegroupId"
            class="aside"
          ></MaterialAside>
        </div>
        <div class="rightImgs">
          <upImgList
            :dirId="dirId"
            ref="imgList"
          ></upImgList>
        </div>
      </div>
    </a-modal>
    <MaterialImage
      :visible="isShow"
      @cancel="closeInfoModal"
      @submit="comfirmUpload"
    ></MaterialImage>
  </div>
</template>

<script>
import MaterialImage from "@views/menuPage/shop/material/components/MaterialUploadImage.vue";
import MaterialAside from "@views/menuPage/shop/material/components/MaterialAside.vue";
import upImgList from "@views/menuPage/shop/material/components/upImgList.vue";
export default {
  name: "uploadModal",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    MaterialImage,
    MaterialAside,
    upImgList,
  },
  data() {
    return {
      confirmLoading: false,
      isShow: false,
      dirId: "",
    };
  },

  computed: {},

  watch: {
    visible(value) {
      console.log(value, "value");
      if (value) {
        // this.getPageArr();
      }
    },
  },
  methods: {
    // 取消  关闭模态框
    closeModal() {
      this.$emit("cancel");
    },
    handleSubmit() {
      if (this.$refs.imgList.comfirmSelectImge() == "") {
        this.$message.warning("请选择一张图片");
        return;
      }
      this.$emit("getImgUrl", this.$refs.imgList.comfirmSelectImge());
      this.$emit("cancel");
    },
    onSearch(value) {
      console.log(value);
    },
    uploadMydesk() {
      this.isShow = !this.isShow;
    },
    closeInfoModal() {
      this.isShow = false;
    },
    comfirmUpload() {
      this.isShow = false;
      this.$refs.imgList.getImgList();
    },
    choosegroupId(id) {
      this.dirId = id;
    },
  },
};
</script>

<style lang='less' scoped>
/deep/.ant-tabs-left-bar {
  width: 160px;
}
.upBtn {
  border: 1px solid #e6e6e6;
  text-align: center;
  line-height: 30px;
  width: 160px;
  cursor: pointer;
  margin-bottom: 10px;
}
.upBtn:hover {
  border: 1px solid #1890ff;
  color: #1890ff;
}
.mainText {
  display: flex;
  .leftMenu {
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    display: flex;
    flex-direction: column;
    .aside {
      flex-grow: 1;
    }
  }
  .rightImgs {
    flex-grow: 1;
  }
}
/deep/.img_list
  .list
  .list_item[data-v-6ecfed9a]
  .ant-card
  .ant-card-body
  .ant-checkbox-wrapper
  .ant-card-meta-title {
  line-height: 20px;
}
</style>

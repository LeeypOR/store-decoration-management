<template>
  <div class="editor-main">
    <div class="header_wrap">
      <h1 class="my-header">分享信息</h1>
    </div>
    <a-form-model
      ref="ruleForm"
      :model="mapshareInfo"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
      style="margin-top: 15px"
      :rules="rules"
    >
      <a-form-model-item label="分享标题" prop="shareTitle" ref="shareTitle">
        <a-input
          @blur="
            () => {
              $refs.shareTitle.onFieldBlur();
            }
          "
          placeholder="请输入标题名称"
          :max-length="15"
          v-model="mapshareInfo.shareTitle"
          style="width: 260px; padding-right: 40px"
        />
        <span class="limitWords" v-if="mapshareInfo.shareTitle"
          >{{ mapshareInfo.shareTitle.length }}/15</span
        >
      </a-form-model-item>
      <a-form-model-item label="分享描述" prop="shareDes" ref="shareDes">
        <a-input
          @blur="
            () => {
              $refs.shareDes.onFieldBlur();
            }
          "
          placeholder="请输入分享描述"
          :max-length="30"
          v-model="mapshareInfo.shareDes"
          type="textarea"
          :rows="3"
          style="width: 260px"
        />
        <span class="limitWords" v-if="mapshareInfo.shareDes"
          >{{ mapshareInfo.shareDes.length }}/30</span
        >
      </a-form-model-item>
      <a-form-model-item label="分享图片">
        <div class="shareImgBox">
          <div class="mini">
            <div
              class="image_wrap"
              :style="{
                background: mapshareInfo.miniImg
                  ? `url(${mapshareInfo.miniImg}) no-repeat 50% 50% /cover`
                  : '',
              }"
            >
              <!-- <img
                class="image"
                :src="mapshareInfo.miniImg"
                v-if="mapshareInfo.miniImg"
              /> -->
              <div class="hoverBox" v-if="mapshareInfo.miniImg">
                <a-popconfirm
                  title="是否确认删除？"
                  @confirm="() => deleteminiImg()"
                  :getPopupContainer="getPopupContainer()"
                >
                  <div class="delBtn">删除</div>
                </a-popconfirm>
                <div class="updatelBtn" @click="updateImgUrl('mini')">替换</div>
              </div>
              <div class="image addBox" v-else>
                <img
                  src="~@/assets/images/share/add.png"
                  style="width: 36px; height: 36px; margin-top: -10px"
                  @click="updateImgUrl('mini')"
                />
              </div>
              <div class="text">小程序</div>
            </div>
            <div style="text-align: center; color: #999; font-size: 10px">
              建议图片比例1:1
            </div>
          </div>
          <div class="h5">
            <div class="image_wrap" :style="{
                background: mapshareInfo.h5PosterImg
                  ? `url(${mapshareInfo.h5PosterImg}) no-repeat 50% 50% /cover`
                  : '',
              }">
              <!-- <img
                class="image"
                :src="mapshareInfo.h5PosterImg"
                v-if="mapshareInfo.h5PosterImg"
              /> -->
              <div class="hoverBox" v-if="mapshareInfo.h5PosterImg">
                <a-popconfirm
                  title="是否确认删除？"
                  @confirm="() => deleteh5PosterImg()"
                  :getPopupContainer="getPopupContainer()"
                >
                  <div class="delBtn">删除</div>
                </a-popconfirm>
                <div class="updatelBtn" @click="updateImgUrl('h5Poster')">
                  替换
                </div>
              </div>
              <div class="image addBox" v-else>
                <img
                  src="~@/assets/images/share/add.png"
                  style="width: 36px; height: 36px; margin-top: -10px"
                  @click="updateImgUrl('h5Poster')"
                />
              </div>
              <div class="text">h5/海报</div>
            </div>
            <div style="text-align: center; color: #999; font-size: 10px">
              建议图片比例1:1
            </div>
          </div>
        </div>
      </a-form-model-item>
    </a-form-model>
    <div class="action">
      <a-button
        class="btn release"
        type="primary"
        style="width: 100%; height: 45px"
        @click="submitShareInfo"
      >
        保存
      </a-button>
    </div>
    <upload-modal
      :visible="visible"
      @cancel="closeInfoModal"
      @getImgUrl="getImgUrl"
    ></upload-modal>
  </div>
</template>

<script>
import uploadModal from "@components/antBase/uploadModal.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      rules: {
        shareTitle: [
          { required: true, message: "请填写分享标题", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "标题长度在1到15个字符",
            trigger: "blur",
          },
        ],
        shareDes: [
          {
            min: 1,
            max: 30,
            message: "标题长度在1到30个字符",
            trigger: "blur",
          },
        ],
      },
      visible: false,
      imgType: "",
    };
  },
  components: {
    uploadModal,
  },
  props: {},
  watch: {
    // mapshareInfo: {
    //   handler(newVal, oldVal) {
    //     console.log(newVal);
    //   },
    //   deep: true,
    // },
  },
  computed: {
    ...mapState({
      mapshareInfo: (state) => state.shareSetting.shareInfo,
    }),
  },
  created() {
    console.log(this.mapshareInfo);
  },
  methods: {
    getPopupContainer() {
      return (triggerNode) => triggerNode.parentNode;
    },
    //分享配置信息新增、更新
    async updateShareInfo(params) {
      let res = await this.$post(
        "/share/setting/add",
        { ...params },
        { baseURL: `${location.origin}/goldenhome/decoration/admin` }
      );
      if (res && res.returnCode == 1000) {
        this.$message.success("保存成功");
      }
    },
    submitShareInfo() {
      let imageInfos = [];
      imageInfos.push(
        { shareType: 1, imageAddr: this.mapshareInfo.miniImg },
        { shareType: 2, imageAddr: this.mapshareInfo.h5PosterImg }
      );
      const params = {
        shareTitle: this.mapshareInfo.shareTitle,
        shareDes: this.mapshareInfo.shareDes,
        imageInfos: imageInfos,
      };
      if (this.mapshareInfo.pageId) {
        params.pageId = this.mapshareInfo.pageId;
      }
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.updateShareInfo(params);
        } else {
          this.$message.error("保存失败,分享标题不能为空");
          return false;
        }
      });
    },
    deleteminiImg() {
      let obj = JSON.parse(JSON.stringify(this.mapshareInfo));
      obj.miniImg = "";
      this.$store.dispatch("setShareInfo", obj);
    },
    deleteh5PosterImg() {
      let obj = JSON.parse(JSON.stringify(this.mapshareInfo));
      obj.h5PosterImg = "";
      this.$store.dispatch("setShareInfo", obj);
    },
    getImgUrl(value) {
      if (this.imgType == "mini") {
        let obj = JSON.parse(JSON.stringify(this.mapshareInfo));
        obj.miniImg = value;
        this.$store.dispatch("setShareInfo", obj);
      } else {
        let obj = JSON.parse(JSON.stringify(this.mapshareInfo));
        obj.h5PosterImg = value;
        this.$store.dispatch("setShareInfo", obj);
      }
    },
    closeInfoModal() {
      this.visible = false;
    },
    updateImgUrl(type) {
      this.imgType = type;
      this.visible = true;
    },
  },
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
.editor-main {
  margin: 0 auto;
  width: 375px;
  height: 100%;
  background: #ffffff;
  box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.1);
  position: relative;
  .header_wrap {
    height: 38px;
    width: 375px;
    position: relative;
    background: rgb(238, 240, 244);
    border-radius: 5px;
    .my-header {
      font-family: PingFangSC-Medium;
      font-size: 14px;
      font-weight: 700;
      line-height: 38px;
      color: #191919;
      position: absolute;
      // left: 50%;
      // transform: translateX(-50%);
      margin-bottom: 0;
      padding-left: 10px;
    }
  }
}
.limitWords {
  position: absolute;
  right: 5px;
  top: -10px;
  font-size: 10px;
  color: #eee;
}
.shareImgBox {
  display: flex;
  justify-content: space-around;
  width: 100%;
  .mini,
  .h5 {
    width: 120px;
    height: 120px;
    background: rgb(238, 240, 244);
    .image_wrap {
      width: 100%;
      height: 100%;
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background-color: #fff;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      .hoverBox {
        background: rgba(25, 25, 25, 0.4);
        border-radius: 4px;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 99999999;
        // display: flex;
        // justify-content: center;
        // align-items: center;
        // flex-direction: column;
        display: none;
        div {
          width: 50px;
          height: 26px;
          background: #ffffff;
          border-radius: 2px;
          border: 1px solid #979797;
          line-height: 26px;
          font-weight: 400;
          text-align: center;
          margin: auto;
        }
        .delBtn {
          color: #ff5253;
          margin-top: 25px;
        }
        .updatelBtn {
          margin-top: 15px;
          color: #666666;
        }
      }
      .image {
        width: 100%;
        height: 100%;
        border-radius: 4px;
      }
      .text {
        width: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        color: #fff;
        position: absolute;
        bottom: 0;
        text-align: center;
        white-space: nowrap;
        line-height: 30px !important;
        font-size: 16px;
      }
    }
    &:hover {
      .hoverBox {
        display: block;
      }
    }
  }
}
.action {
  width: 100%;
  padding: 0 10px;
  margin-top: 60px;
}
.addBox {
  display: flex;
  justify-content: center;
  align-items: center;
}
/deep/.ant-popover-buttons {
  display: flex;
}
</style>
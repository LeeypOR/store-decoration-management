<template>
  <div class="my-video-form">
    <div class="background_wrap">
      <div class="title">添加背景图</div>
      <div class="desc">建议宽度750像素，图片比例3:4为佳</div>

      <div class="background_upload">
        <a-radio-group
          class="image_type_choose"
          v-model="formDataObject.backgroundInfo.imageType"
        >
          <a-radio-button value="1"> 单链接 </a-radio-button>
          <a-radio-button value="2"> 热区 </a-radio-button>
        </a-radio-group>
        <div class="image_info_wrap">
          <!-- <ImageUpload
            class="upload_wrap"
            v-model="formDataObject.backgroundInfo.imageUrl"
            uploadText="上传图片"
          ></ImageUpload> -->
          <!-- <CropperUpload
            class="upload_wrap"
            :defaultScaleVal="formDataObject.scaleVal"
            :scaleList="formDataObject.scaleList"
            :options="cropperOptions"
            :imgSize="10"
            v-model="formDataObject.backgroundInfo.imageUrl"
            @scaleChange="scaleChange"
            uploadText="上传图片"
          /> -->
          <div
            v-if="formDataObject.backgroundInfo.imageUrl"
            @click="openUpload('image', 3, 1)"
            class="upload_wrap"
            :style="{
              background: `url(${formDataObject.backgroundInfo.imageUrl}) no-repeat 50% 50%/cover`,
            }"
          >
            <p class="updateImg">更换图片</p>
          </div>
          <div
            v-else
            class="upload_wrap uploadBox"
            @click="openUpload('image', 3, 1)"
          >
            <a-icon type="plus" />
            <p>上传图片</p>
          </div>
          <div
            class="right"
            style="display: flex; align-items: center; flex-direction: row"
          >
            <!-- <div class="top line">
              <div class="label">标题</div>
              <a-input
                placeholder="建议10个字以内，可不填"
                style="width: 100%"
                v-model="formDataObject.backgroundInfo.imageTitle"
              ></a-input>
            </div> -->
            <div class="bottom line">
              <div class="label">链接</div>
              <a
                v-show="formDataObject.backgroundInfo.imageType == '1'"
                @click="backgroundAddLinkPage(formDataObject.backgroundInfo)"
                >{{
                  formDataObject.backgroundInfo | backgroundJumpLinkTextFilter
                }}</a
              >
              <a
                v-show="formDataObject.backgroundInfo.imageType == '2'"
                @click="backgroundAddHotArea(formDataObject.backgroundInfo)"
                >{{
                  formDataObject.backgroundInfo | backgroundJumpLinkTextFilter
                }}</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <a-divider />

    <div class="video_wrap">
      <h3 class="title_one" @click="seachString">选择视频</h3>
      <div class="text_one">建议视频宽高比16:9</div>
      <div
        class="card_icon"
        @click="openUpload('video', 3)"
        v-if="!formDataObject.videoUrl"
      >
        <div class="inTheMiddle">
          <span class="iconfont icon-join"></span>
          <span class="add_txt">添加视频</span>
        </div>
      </div>
      <div class="card_icon hoverChange" v-else>
        <div class="haveVideo">
          <div class="changBtn" @click="openUpload('video', 3)">
            <i class="iconfont icon-change"></i>
            更换视频
          </div>
        </div>
        <video controls muted autoplay="autoplay" class="myVideo">
          <source :src="formDataObject.videoUrl" type="video/mp4" />
        </video>
      </div>
      <a-divider />
      <div class="disFlex surface">
        <div class="title_two">视频封面</div>
        <div class="my_btn">
          <span
            :class="{ my_actived: !formDataObject.customType }"
            @click="checkActived(false)"
            >原视频封面</span
          >
          <span
            :class="{ my_actived: formDataObject.customType }"
            @click="checkActived(true)"
            >自定义封面</span
          >
        </div>
      </div>
      <div v-if="formDataObject.customType">
        <div class="text_one">建议封面宽高比16:9</div>
        <div class="card_icon" v-if="!formDataObject.imgUrl">
          <div class="inTheMiddle" @click="openUpload('image', 2, 2)">
            <span class="iconfont icon-join"></span>
            <span class="add_txt">添加封面</span>
          </div>
        </div>
        <div class="img_foucs hoverChange card_icon" v-else>
          <div
            class="img"
            :style="{ backgroundImage: 'url(' + formDataObject.imgUrl + ')' }"
          ></div>
          <div class="haveVideo">
            <div class="changBtn" @click="openUpload('image', 3, 2)">
              <i class="iconfont icon-change"></i>
              更换图片
            </div>
          </div>
        </div>
      </div>
      <div class="line">
        <div class="text_wrap">
          <div class="label">视频位置</div>
        </div>
        <a-slider
          class="slider"
          v-model="formDataObject.videoHeight"
          :max="formDataObject.maxVideoHeight"
          style="width: 120px"
        />
        <a-input-number
          v-model="formDataObject.videoHeight"
          :max="formDataObject.maxVideoHeight"
          style="marginleft: 16px"
        />
      </div>
      <div class="disFlex margT10">
        <span>
          <span class="one">视频链接</span>
          <span class="two">{{
            formDataObject.isShowBtn ? "显示" : "不显示"
          }}</span>
        </span>
        <span class="check_radio">
          <span
            class="_check"
            @click="changeCheck('isShowBtn', true)"
            v-if="!formDataObject.isShowBtn"
          ></span>
          <span
            class="iconfont icon-Checkbox"
            v-else
            @click="changeCheck('isShowBtn', false)"
          ></span>
        </span>
      </div>
      <div class="margT10" v-if="formDataObject.isShowBtn">
        <div>
          <a-radio-group
            name="radioGroup"
            :default-value="1"
            @change="onChangeIcon"
          >
            <a-radio :value="1">显示图标</a-radio>
            <a-radio :value="2">显示文字</a-radio>
            <a-radio :value="3">显示图标和文字</a-radio>
          </a-radio-group>
        </div>
        <div
          class="margT10 disFlex"
          v-if="formDataObject.isBtnType == 2 || formDataObject.isBtnType == 3"
        >
          <span class="w100">
            <span class="redIcon">*</span>
            名称
          </span>
          <a-input
            type="text"
            :maxLength="4"
            v-model="formDataObject.title"
          ></a-input>
        </div>
        <div
          class="margT10"
          v-if="formDataObject.isBtnType == 1 || formDataObject.isBtnType == 3"
        >
          <div class="upload_wrap_line">
            <div>
              <span class="redIcon">*</span>
              图标
            </div>
            <!-- <span class="box_upload"> -->
            <ImageUpload
              class="upload_wrap"
              v-model="formDataObject.iconUrl"
            ></ImageUpload>
            <!-- </span> -->
          </div>
          <div class="iconTip">建议上传72*72像素的png图片</div>
        </div>
        <div class="margT10 disFlex">
          <span class="w100">
            <span class="redIcon">*</span>
            链接
          </span>
          <!-- <div class="bottom line">
          <div class="label">链接</div>-->

          <a class="jumpPageName" @click="addLinkPage(formDataObject)">{{
            formDataObject | videoJumpLinkTextFilter
          }}</a>
        </div>
      </div>
    </div>

    <HotAreaSelectedModal
      v-model="hotAreaShow"
      :dataSource="formDataObject.backgroundInfo"
    >
    </HotAreaSelectedModal>
    <video-modal
      :visible="visibleModal"
      @cancel="closeInfoModal"
      :ContentType="ContentType"
      :fileSize="fileSize"
      @upload="upload"
      :videoData="videoData"
    ></video-modal>

    <!-- <PageModal
			@cancel="backgroundCloseInfoModal"
			@confirm="backgroundSelectedPage"
			:visible="backgroundPageModalVisible"
		></PageModal> -->

    <PageModal
      @cancel="closeInfoModal"
      @confirm="selectedPage"
      :visible="pageModalVisible"
      :pageIndex="pageIndex"
      :pageModelId="pageModelId"
    ></PageModal>
  </div>
</template>
<script>
import HotAreaSelectedModal from "@components/antBase/HotAreaSelectedModal";
import videoModal from "@/components/antBase/videoModal";
import PageModal from "@components/antBase/PageModal";
import ImageUpload from "@components/antBase/ImageUpload";
import CropperUpload from "@components/antBase/CropperUpload";
import { cloneDeep } from "lodash";
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  name: "SceneVideoForm",
  components: {
    HotAreaSelectedModal,
    videoModal,
    PageModal,
    ImageUpload,
    CropperUpload,
  },
  props: {
    // 传入的原始数据
    formData: {},
  },
  filters: {
    backgroundJumpLinkTextFilter(item) {
      if (item.imageType == "1") {
        console.log("item.jumpPageId", item.jumpPageId, item.jumpPageName);
        if (item.jumpPageId) {
          return item.jumpPageType == "WXMAID"
            ? item.jumpPageUrl
            : item.jumpPageName;
        } else return "点击选择跳转到的页面";
      } else if (item.imageType == "2") {
        if (item.hotAreaConfigInfoList.length) {
          return `已添加${item.hotAreaConfigInfoList.length}个热区`;
        } else return "添加热区";
      }
    },

    videoJumpLinkTextFilter(item) {
      console.log(item);
      if (item.jumpPageId) {
        return item.jumpPageType == "WXMAID"
          ? item.jumpPageUrl
          : item.jumpPageName;
      } else return "点击选择跳转到的页面";
    },
  },
  data() {
    return {
      // backgroundPageModalVisible: false,
      changeType: "",
      hotAreaShow: false,
      loading: false,
      // imageUrl: '',
      actived: true,
      visibleModal: false,
      formDataObject: {},
      title: "",
      ContentType: "video",
      fileSize: 2,
      currentRecord: {},
      pageModalVisible: false,
      videoData: {},
      pageModelId: "",
      pageIndex: "MSPAGE",
      // 图片裁剪
      cropperOptions: {
        full: true,
        high: true,
        infoTrue: true,
        centerBox: true, // 截图框是否被限制在图片里面
        autoCrop: true, //是否默认生成截图框
        autoCropWidth: 125, //默认生成截图框宽度
        autoCropHeight: 150, //默认生成截图框高度
        enlarge: 1, // 图片根据截图框输出比例倍数
        fixed: true, // 是否开启截图框宽高固定比例
        fixedBox: false, //是否固定截图框大小 不允许改变
        fixedNumber: [5, 6], // 截图框的宽高比例
        previewsCircle: false, //预览图是否是圆形
      },
      tabType: 1, //1背景图 2视频封面
    };
  },
  created() {
    this.formDataObject = cloneDeep(this.formData);
  },
  methods: {
    // backgroundCloseInfoModal () {
    //   this.backgroundPageModalVisible = false
    // },
    // // 单链接和热区用的一个模态框，需要根据imagetype区分一下单链接和热区的数据格式。
    // backgroundSelectedPage ({ id, name, type }) {
    //   console.log(
    //     '收到的已选择信息为:',
    //     id,
    //     name,
    //     type,
    //     this.formDataObject.imageType
    //   )
    //   if (this.formDataObject.imageType == '1') {
    //     this.$set(this.formDataObject.backgroundInfo, 'jumpPageId', id)
    //     this.$set(this.formDataObject.backgroundInfo, 'jumpPageName', name)
    //     this.$set(this.formDataObject.backgroundInfo, 'jumpPageType', type)
    //   } else if (this.formDataObject.imageType == '2') {
    //     let target =
    //       this.formDataObject.hotAreaConfigInfoList[
    //         this.selectedHotAreaIndex
    //       ]
    //     this.$set(target, 'jumpPageId', id)
    //     this.$set(target, 'jumpPageName', name)
    //     this.$set(target, 'jumpPageType', type)
    //   } else {
    //     return false
    //   }
    //   console.log('收到的已选择信息后：', this.currentImageItem)
    //   this.pageModalVisible = false
    // },

    upload(val) {
      this.visibleModal = false;
      this.videoData = val;
      if (this.ContentType == "video") {
        this.$set(this.formDataObject, "videoUrl", val.fileUrl);
        this.$set(this.formDataObject, "imgUrl", val.video.coverPicture);
      } else {
        // this.formDataObject.imgUrl = url
        if (this.tabType == 1) {
          const imgInfo = this.formDataObject.backgroundInfo;
          this.formDataObject.backgroundInfo.imageUrl = val.fileUrl;
          this.$set(this.formDataObject, "backgroundInfo", imgInfo);
        } else {
          this.$set(this.formDataObject, "imgUrl", val.fileUrl);
        }
      }
    },
    seachString() {
      var a = "testsd.cicd.vpclub.cn";
      console.log(a.includes("test"));
    },
    checkActived(a) {
      // this.actived = a;
      this.$set(this.formDataObject, "customType", a);
    },
    // 打开上传组件
    openUpload(a, b, c) {
      if (a == "video") {
        this.checkValue = { videoUrl: this.formData.videoUrl };
      } else {
        if (c == 1) {
          this.tabType = 1;
          this.checkValue = { imgUrl: this.formData.backgroundInfo.imageUrl };
        } else {
          this.tabType = 2;
          this.checkValue = { imgUrl: this.formData.imgUrl };
        }
      }
      this.ContentType = a;
      this.fileSize = b;
      this.visibleModal = true;
    },
    // 关闭上传组件
    closeInfoModal() {
      this.visibleModal = false;
      this.pageModalVisible = false;
    },
    changeCheck(a, b) {
      const { formDataObject } = this;
      formDataObject[a] = b;
    },
    onChangeIcon(e) {
      this.formDataObject.isBtnType = e.target.value;
      console.log("radio checked", e.target.value);
    },
    backgroundAddHotArea(item) {
      if (!item.imageUrl) {
        this.$message.warning("请先上传图片！");
        return false;
      } else {
        this.currentImageItem = cloneDeep(item);
        // this.currentImageIndex = index
        // this.originImageItem = cloneDeep(item)
        this.hotAreaShow = true;
        // 移到热区组件内部
        // this.$nextTick((_) => {
        //   this.redrawDiv()
        // })
      }
    },
    backgroundAddLinkPage(item) {
      this.changeType = "backgroundLink";
      if (!item.imageUrl) {
        this.$message.warning("请先上传图片！");
        return false;
      } else {
        // 开启产品选择弹窗，以便配置跳转链接
        this.pageModelId = item.jumpPageId;
        this.pageIndex = item.jumpPageType;
        this.currentImageItem = item;
        this.pageModalVisible = true;
      }
    },

    addLinkPage(item) {
      this.changeType = "videoLink";
      // 开启产品选择弹窗，以便配置跳转链接
      // this.currentImageItem = item
      this.pageModalVisible = true;
    },
    selectedPage({ id, name, type, url }) {
      console.log("收到的已选择信息为:", id, name, type);

      if (this.changeType === "videoLink") {
        this.$set(this.formDataObject, "jumpPageId", id);
        this.$set(this.formDataObject, "jumpPageName", name);
        this.$set(this.formDataObject, "jumpPageUrl", url);
        this.$set(this.formDataObject, "jumpPageType", type);
      } else if (this.changeType === "backgroundLink") {
        this.$set(this.formDataObject.backgroundInfo, "jumpPageId", id);
        this.$set(this.formDataObject.backgroundInfo, "jumpPageName", name);
        this.$set(this.formDataObject.backgroundInfo, "jumpPageUrl", url);
        this.$set(this.formDataObject.backgroundInfo, "jumpPageType", type);
      }
      this.pageModalVisible = false;
    },
    // 获得最终图片比例信息
    scaleChange(data) {
      this.formDataObject.maxVideoHeight =
        (375 / data.width) * data.height - 200;
    },
    // closeInfoModal (type) {
    //   console.log(type, 'type')
    //   this.pageModalVisible = false
    // }
  },
  watch: {
    formDataObject: {
      handler(n, o) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          this.$emit("updateFormData", this.formDataObject);
        }, 300);
      },
      deep: true,
    },
  },
};
</script>
<style lang="less" scoped>
@labelColor: #999;
@resultColor: #333;
.my-video-form {
  .background_wrap {
    // .title {
    // }
    .desc {
      font-size: 12px;
      color: #999999;
      height: 18px;
      line-height: 18px;
      margin: 10px 0;
    }
    .background_upload {
      position: relative;
      background-color: #fff;
      box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
      border-radius: 2px;
      border-radius: 2px;
      padding: 12px;
      margin: 12px;
      // .image_type_choose {
      // }
      .image_info_wrap {
        margin-top: 13px;
        display: flex;
        // .upload_wrap {
        // }
        /deep/ .upload_wrap {
          .avatar-uploader .ant-upload {
            width: 60px;
            height: 60px;
            margin-right: 0;
            margin-bottom: 0;
            // .image_wrap {
            //   .image {
            //     // height: 60px;
            //     // width: unset;
            //   }
            // }
          }
        }
        .right {
          margin-left: 12px;
          flex: auto;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          // .top {
          //   .label {
          //   }
          // }
          .line {
            display: flex;
            align-items: center;
            margin-top: 0;
            .label {
              white-space: nowrap;
              margin-right: 16px;
            }
            a {
              width: 170px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
          // .bottom {
          //   .label {
          //   }
          //   a {
          //   }
          // }
        }
      }
      /deep/.image_type_choose {
        width: 100%;
        display: flex;
        .ant-radio-button-wrapper {
          flex: 1 1 50%;
          text-align: center;
        }
        .ant-radio-button-wrapper-checked {
          background: #e0edff;
          border-color: #016bff;
        }
      }
    }
  }
  .video_wrap {
    padding-right: 10px;
    // .title_one {
    // }
    // .text_one {
    // }
    // .card_icon {
    //   .inTheMiddle {
    //     .iconfont {
    //     }
    //     .icon-join {
    //     }
    //     .add_txt {
    //     }
    //   }
    // }
    // .card_icon {
    //   .haveVideo {
    //     .changBtn {
    //       .iconfont {
    //       }
    //       .icon-change {
    //       }
    //     }
    //   }
    //   .myVideo {
    //     source {
    //     }
    //   }
    // }
    // .hoverChange {
    // }
    // .disFlex {
    //   .title_two {
    //   }
    //   .my_btn {
    //     span {
    //     }
    //   }
    // }
    // .surface {
    // }
    // div {
    //   .text_one {
    //   }
    //   .card_icon {
    //     .inTheMiddle {
    //       .iconfont {
    //       }
    //       .icon-join {
    //       }
    //       .add_txt {
    //       }
    //     }
    //   }
    //   .img_foucs {
    //     img {
    //     }
    //     .haveVideo {
    //       .changBtn {
    //         .iconfont {
    //         }
    //         .icon-change {
    //         }
    //       }
    //     }
    //   }
    //   .hoverChange {
    //   }
    //   .card_icon {
    //   }
    // }
    // .line {
    //   .text_wrap {
    //     .label {
    //     }
    //   }
    //   .slider {
    //   }
    // }
    // .disFlex {
    //   span {
    //     .one {
    //     }
    //     .two {
    //     }
    //   }
    //   .check_radio {
    //     ._check {
    //     }
    //     .iconfont {
    //     }
    //     .icon-Checkbox {
    //     }
    //   }
    // }
    .margT10 {
      // div {
      // }
      // .margT10 {
      //   .w100 {
      //     .redIcon {
      //     }
      //   }
      // }
      // .disFlex {
      // }
      .margT10 {
        .upload_wrap_line {
          display: flex;
          align-items: flex-start;
          // span {
          //   .redIcon {
          //   }
          // }
          .upload_wrap {
            margin-left: 20px;
          }
        }
        // .upload_icon {
        //   .w100 {
        //     .redIcon {
        //     }
        //   }
        //   .box_upload {
        //     .upload_wrap {
        //     }
        //   }
        // }
        // .iconTip {
        // }
      }
      // .margT10 {
      //   .w100 {
      //     .redIcon {
      //     }
      //   }
      //   .jumpPageName {
      //   }
      // }
    }
    // .margT10 {
    //   div {
    //   }
    //   .margT10 {
    //     .w100 {
    //       .redIcon {
    //       }
    //     }
    //   }
    //   .disFlex {
    //   }
    //   .margT10 {
    //     .upload_icon {
    //       .w100 {
    //         .redIcon {
    //         }
    //       }
    //       .box_upload {
    //         .upload_wrap {
    //         }
    //       }
    //     }
    //     .iconTip {
    //     }
    //   }
    //   .margT10 {
    //     .w100 {
    //       .redIcon {
    //       }
    //     }
    //     .jumpPageName {
    //     }
    //   }
    // }
  }
  .upload_wrap {
    width: 60px;
    height: 60px;
    /deep/.avatar-uploader {
      .avatar-uploader {
        width: 60px;
        height: 60px;
      }
    }
  }
  .title_one {
    font-size: 14px;
    color: #333333;
    height: 18px;
    line-height: 18px;
    font-weight: 400;
    margin: 0;
  }
  .text_one {
    font-size: 12px;
    color: #999999;
    height: 18px;
    line-height: 18px;
    margin: 10px 0;
  }
  .card_icon {
    position: relative;
    display: inline-block;
    width: 346px;
    height: 194px;
    background: #f6f7f8;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    cursor: pointer;
    video {
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
    img {
      width: 100%;
      height: 100%;
    }
  }
  .icon-join {
    width: 48px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #016dff;
    letter-spacing: 0;
    font-weight: 400;
    margin-right: 5px;
  }
  .inTheMiddle {
    position: absolute;
    top: calc(50% - 9px);
    left: calc(50% - 35px);
    display: inline-block;
    width: 100px;
    font-size: 12px;
    color: #016dff;
    span {
      height: 18px;
      line-height: 18px;
      vertical-align: middle;
    }
  }
  .disFlex {
    display: flex;
    justify-content: space-between;
  }
  .title_two {
    width: 346px;
    height: 32px;
    line-height: 32px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #999999;
    letter-spacing: 0;
    line-height: 32px;
    font-weight: 400;
  }
  // .surface {
  //   // padding-right: 10px;
  // }
  .my_btn {
    display: flex;
    justify-content: flex-start;
    width: 200px;
    span {
      display: inline-block;
      cursor: pointer;
      width: 100px;
      height: 32px;
      line-height: 32px;
      border-radius: 2px;
      color: #333333;
      background: #ffffff;
      border: 1px solid #e6e6e6;
      font-size: 12px;
      text-align: center;
      border-radius: 2px;
    }
    .my_actived {
      background: #e0edff;
      border: 1px solid #016bff;
      color: #016bff;
    }
  }
  .line {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 12px;
    // padding-right: 10px;
    .text_wrap {
      display: flex;
      align-items: center;
      .label {
        color: @labelColor;
      }
      .result {
        color: @resultColor;
        margin-left: 16px;
      }
    }
    /deep/ .slider {
      &:hover {
        .ant-slider-track {
          background-color: #016bff;
        }
      }
      .ant-slider-track {
        background-color: #016bff;
      }
    }
  }
  .none {
    display: none;
  }
  .img_foucs:hover > span {
    display: inline-block;
  }
  .check_radio {
    height: 32px;
    line-height: 32px;
    ._check {
      display: inline-block;
      cursor: pointer;
      width: 16px;
      height: 16px;
      border: 1px solid #c8c8c8;
      border-radius: 2px;
    }
    .icon-Checkbox {
      font-size: 16px;
      color: #016bff;
    }
  }
  .one {
    color: #999;
  }
  .two {
    margin-left: 10px;
    font-size: 14px;
    color: #333333;
  }
  span {
    span {
      height: 32px;
      line-height: 32px;
      vertical-align: middle;
    }
  }
}
.myVideo {
  width: 100%;
  height: 206px;
}
.redIcon {
  color: #ff2121;
}
.w100 {
  display: inline-block;
  width: 80px;
  height: 32px;
  line-height: 32px;
}
.margT10 {
  margin-top: 10px;
}
.jumpPageName {
  height: 32px;
  line-height: 32px;
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.iconTip {
  margin-top: 15px;
  height: 17px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 17px;
}
.upload_icon {
  > span {
    display: inline-block;
    vertical-align: middle;
  }
}
.hoverChange {
  position: relative;
}
.haveVideo {
  display: none;
}
.hoverChange:hover {
  .haveVideo {
    display: inline-block;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 100;
    background: rgba(73, 73, 73, 0.4);
    width: 100%;
    height: 100%;
    .iconfont {
      color: #fff;
      font-size: 30px;
      vertical-align: middle;
    }
    > div {
      position: absolute;
      z-index: 200;
      top: calc(50% - 16px);
      right: calc(50% - 54px);
      width: 108px;
      height: 32px;
      line-height: 32px;
      font-size: 14px;
      color: #fff;
    }
  }
}
.uploadBox {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  p {
    text-align: center;
    font-size: 12px;
    margin-top: 4px;
  }
}
.upload_wrap {
  width: 60px;
  height: 60px;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  .updateImg {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    color: #fff;
    position: absolute;
    bottom: 0;
    text-align: center;
    white-space: nowrap;
    font-size: 12px;
  }
}
.upload_wrap:hover {
  border-color: skyblue;
}
</style>

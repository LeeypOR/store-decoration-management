<template>
  <div class="my-video-form">
    <div>
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
        <video
          controls
          muted
          autoplay="autoplay"
          class="myVideo"
          :src="formDataObject.videoUrl"
        >
          <!-- <source :src="formDataObject.videoUrl" type="video/mp4" /> -->
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
          <div class="inTheMiddle" @click="openUpload('image', 2)">
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
            <div class="changBtn" @click="openUpload('image', 3)">
              <i class="iconfont icon-change"></i>
              更换图片
            </div>
          </div>
        </div>
      </div>
      <div class="line">
        <div class="text_wrap">
          <div class="label">页面间距</div>
        </div>
        <a-slider
          class="slider"
          v-model="formDataObject.pagePadding"
          :max="30"
          style="width: 120px"
        />
        <a-input-number
          v-model="formDataObject.pagePadding"
          :max="30"
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
            :default-value="formDataObject.isShowBtn"
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
          <div class="upload_icon">
            <span class="w100">
              <span class="redIcon">*</span>
              图标
            </span>
            <span class="box_upload">
              <ImageUpload
                class="upload_wrap"
                v-model="formDataObject.iconUrl"
              ></ImageUpload>
            </span>
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
            formDataObject | jumpLinkTextFilter
          }}</a>
          <!-- <a v-show="item.imageType == '2'" @click="addHotArea(item, i)">
                        {{
                        item | jumpLinkTextFilter
                        }}
          </a>-->
          <!-- </div> -->
        </div>
      </div>
    </div>
    <video-modal
      :visible="visibleModal"
      @cancel="closeInfoModal"
      :ContentType="ContentType"
      :fileSize="fileSize"
      @upload="upload"
      :videoData="videoData"
    ></video-modal>
    <PageModal
      :record="currentRecord"
      @cancel="closeInfoModal"
      @confirm="selectedPage"
      :visible="pageModalVisible"
    ></PageModal>
  </div>
</template>
<script>
import videoModal from "@/components/antBase/videoModal";
import PageModal from "@components/antBase/PageModal";
import ImageUpload from "@components/antBase/ImageUpload";
import { cloneDeep } from "lodash";
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  name: "MyVideoForm",
  components: {
    videoModal,
    PageModal,
    ImageUpload,
  },
  props: {
    // 传入的原始数据
    formData: {},
  },
  filters: {
    jumpLinkTextFilter(item) {
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
    };
  },
  created() {
    this.formDataObject = cloneDeep(this.formData);
  },
  methods: {
    upload(val) {
      this.visibleModal = false;
      this.videoData = val;
      if (this.ContentType == "video") {
        this.$set(this.formDataObject, "videoUrl", val.fileUrl);
        this.$set(this.formDataObject, "imgUrl", val.video.coverPicture);
      } else {
        // this.formDataObject.imgUrl = url
        this.$set(this.formDataObject, "imgUrl", val.fileUrl);
      }
    },
    seachString() {
      var a = "testsd.cicd.vpclub.cn";
      console.log(a.includes("test"));
    },
    checkActived(a) {
      this.formDataObject.customType = a;
      this.actived = a;
    },
    // 打开上传组件
    openUpload(a, b) {
      if (a == "video") {
        this.checkValue = { videoUrl: this.formData.videoUrl };
      } else {
        this.checkValue = { imgUrl: this.formData.imgUrl };
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
    addLinkPage(item) {
      // 开启产品选择弹窗，以便配置跳转链接
      // this.currentImageItem = item
      this.pageModalVisible = true;
    },
    selectedPage({ id, name, type, url }) {
      console.log("收到的已选择信息为:", id, name, type);
      this.$set(this.formDataObject, "jumpPageId", id);
      this.$set(this.formDataObject, "jumpPageName", name);
      this.$set(this.formDataObject, "jumpPageUrl", url);
      this.$set(this.formDataObject, "jumpPageType", type);
      this.pageModalVisible = false;
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
  padding-right: 10px;
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
  width: 200px;
  height: 32px;
  line-height: 32px;
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
</style>

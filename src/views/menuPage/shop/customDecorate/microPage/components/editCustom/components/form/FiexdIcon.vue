
<template>
  <div class="title-text-form">
    <div class="title_nav">
      <div class="from_seaction">
        <div>
          <div class="listStyle">
            <span>悬浮模板</span>
            <div class="two">
              {{ formDataObject.listStyle | listStyleFilter }}
            </div>
          </div>
          <div class="listStyle margT10">
            <div
              :class="[
                'listCheck',
                formDataObject.listStyle == '0' ? 'icon_btn_check' : '',
              ]"
              @click="changeCheck('listStyle', '0')"
            >
              <span
                class="iconfont icon-icon_right_attributebar_xuanfu_yangshi01"
              ></span>
            </div>
            <div
              @click="changeCheck('listStyle', '1')"
              :class="[
                'listCheck',
                formDataObject.listStyle == '1' ? 'icon_btn_check' : '',
              ]"
            >
              <span
                class="iconfont icon-icon_right_attributebar_xuanfu_yangshi02"
              ></span>
            </div>
            <div
              @click="changeCheck('listStyle', '2')"
              :class="[
                'listCheck',
                formDataObject.listStyle == '2' ? 'icon_btn_check' : '',
              ]"
            >
              <span
                class="iconfont icon-icon_right_attributebar_xuanfu_yangshi03"
              ></span>
            </div>
            <div
              @click="changeCheck('listStyle', '3')"
              :class="[
                'listCheck',
                formDataObject.listStyle == '3' ? 'icon_btn_check' : '',
              ]"
            >
              <span
                class="iconfont icon-icon_right_attributebar_xuanfu_yangshi04"
              ></span>
            </div>
            <div
              @click="changeCheck('listStyle', '4')"
              :class="[
                'listCheck',
                formDataObject.listStyle == '4' ? 'icon_btn_check' : '',
              ]"
            >
              <span
                class="iconfont icon-icon_right_attributebar_xuanfu_zidingyi"
              ></span>
            </div>
          </div>
        </div>
        <!--  -->
        <!-- <div class="disFlex margT10">
          <span>
            <span class="one">背景颜色</span>
            <span class="two">{{ formDataObject.bgColor }}</span>
          </span>
          <span class="color_change">
            <div class="color_option">
              <span class="bgWhite"> </span>
            </div>
            <div class="color_option">
              <span class="bgBlack"> </span>
            </div>
            <div class="color_option">
              <input type="color" class="bgGray" />
            </div>
          </span>
        </div>-->
        <div class="disFlex margT10" v-if="formDataObject.listStyle == '0'">
          <span>
            <span class="one">背景颜色</span>
            <span class="two">{{ formDataObject.bgColor }}</span>
          </span>
          <span class="color_change">
            <span
              class="pointer text-primary"
              @click="changeCheck('bgColor', '#333333')"
              >重置</span
            >
            <a-input type="color" v-model="formDataObject.bgColor" />
          </span>
        </div>
        <div class="disFlex margT10" v-if="formDataObject.listStyle == '0'">
          <span>
            <span class="one">文字颜色</span>
            <span class="two">{{ formDataObject.color }}</span>
          </span>
          <span class="color_change">
            <span
              class="pointer text-primary"
              @click="changeCheck('color', '#333333')"
              >重置</span
            >
            <a-input type="color" v-model="formDataObject.color" />
          </span>
        </div>

        <div
          class="disFlex margT10"
          v-if="
            formDataObject.listStyle == '2' || formDataObject.listStyle == '3'
          "
        >
          <span>
            <span class="one">背景颜色</span>
            <span class="two">{{
              formDataObject.backgroundColorType | backgroundColor
            }}</span>
          </span>
          <span class="color_change bgcolor">
            <div
              class="styleOne"
              :class="formDataObject.backgroundColorType == 1 ? 'bgActive' : ''"
              @click="changeCheck('backgroundColorType', 1)"
            ></div>
            <div
              class="styleTwo"
              :class="formDataObject.backgroundColorType == 2 ? 'bgActive' : ''"
              @click="changeCheck('backgroundColorType', 2)"
            ></div>
            <div
              class="styleThree"
              :class="formDataObject.backgroundColorType == 3 ? 'bgActive' : ''"
              @click="changeCheck('backgroundColorType', 3)"
            ></div>
          </span>
        </div>
        <div
          class="margT10 bgupload"
          v-if="
            (formDataObject.listStyle == '2' ||
              formDataObject.listStyle == '3') &&
            formDataObject.backgroundColorType == 3
          "
        >
          <div class="bguploadArea">
            <!-- <ImageUpload
                class="upload_wrap"
                v-model="formDataObject.backgroundUrl"
                uploadText="上传图片"
              ></ImageUpload> -->
            <div
              v-if="formDataObject.backgroundUrl"
              @click="openUpload('image', formDataObject, 1)"
              class="upload_wrap"
              :style="{
                background: `url(${formDataObject.backgroundUrl}) no-repeat 50% 50%/cover`,
              }"
            >
              <p class="updateImg">更换图片</p>
            </div>
            <div
              v-else
              class="upload_wrap uploadBox"
              @click="openUpload('image', formDataObject, 1)"
            >
              <a-icon type="plus" />
              <p>上传图片</p>
            </div>
            <p class="uploadText" v-if="formDataObject.listStyle == '3'">
              建议上传269*114像素或同比例的背景透明图片
            </p>
            <p class="uploadText" v-if="formDataObject.listStyle == '2'">
              建议上传80*114像素或同比例的背景透明图片
            </p>
          </div>
        </div>

        <div class="disFlex margT10" v-if="formDataObject.listStyle == '3'">
          <span>
            <span class="one">文字颜色</span>
            <span class="two">{{ formDataObject.fontColor }}</span>
          </span>
          <span class="color_change">
            <span
              class="pointer text-primary"
              @click="changeCheck('fontColor', '#333333')"
              >重置</span
            >
            <a-input type="color" v-model="formDataObject.fontColor" />
          </span>
        </div>
        <!--  -->
        <a-divider />
        <div>
          <div class="listStyle">
            <span>悬浮位置</span>
            <div class="two">
              {{ formDataObject.floatPosition | floatPositionFilter }}
            </div>
          </div>
          <div class="listStyle margT10">
            <div
              :class="[
                'listCheck',
                formDataObject.floatPosition == '0' ? 'icon_btn_check' : '',
              ]"
              @click="changeCheck('floatPosition', '0')"
            >
              <span
                class="iconfont icon-icon_right_attributebar_xuanfu_zuoxifu"
              ></span>
            </div>
            <div
              @click="changeCheck('floatPosition', '1')"
              :class="[
                'listCheck',
                formDataObject.floatPosition == '1' ? 'icon_btn_check' : '',
              ]"
            >
              <span
                class="iconfont icon-icon_right_attributebar_xuanfu_youxifu"
              ></span>
            </div>
            <div
              @click="changeCheck('floatPosition', '2')"
              :class="[
                'listCheck',
                formDataObject.floatPosition == '2' ? 'icon_btn_check' : '',
              ]"
            >
              <span
                class="iconfont icon-icon_right_attributebar_xuanfu_zuoguding"
              ></span>
            </div>
            <div
              @click="changeCheck('floatPosition', '3')"
              :class="[
                'listCheck',
                formDataObject.floatPosition == '3' ? 'icon_btn_check' : '',
              ]"
            >
              <span
                class="iconfont icon-icon_right_attributebar_xuanfu_youguding"
              ></span>
            </div>
          </div>
        </div>
        <div class="margT10">
          <div class="move">
            <span>上下偏移</span>
            <span>
              <a-input-number
                :min="0"
                v-model="formDataObject.top"
                :max="maxNum"
                :style="{ width: text(formDataObject.top) }"
              ></a-input-number>
            </span>
            <span>输入0-{{ maxNum }}，数值越大越向下偏移</span>
          </div>
          <div class="move margT10">
            <span>左右偏移</span>
            <span>
              <a-input-number
                :min="0"
                :max="100"
                v-model="formDataObject.left"
                @change="getWidthNum"
                :style="{ width: text(formDataObject.left) }"
              ></a-input-number>
            </span>
            <span
              >输入0-100，数值越大越向{{
                formDataObject.floatPosition | floatTxtFilter
              }}偏移</span
            >
          </div>
        </div>
        <a-divider />
        <div>
          <div
            v-show="
              formDataObject.listStyle != '1' && formDataObject.listStyle != '2'
            "
          >
            <a-radio-group
              name="radioGroup"
              v-model="formDataObject.badgeType"
              @change="changeBadge"
            >
              <a-radio :value="1">自定义内容</a-radio>
              <a-radio :value="2" v-show="formDataObject.listStyle != '4'"
                >显示会员信息</a-radio
              >
              <a-radio :value="3" v-show="formDataObject.listStyle == '4'"
                >客服</a-radio
              >
              <a-radio :value="4" v-show="formDataObject.listStyle == '4'"
                >跳转微信公众号</a-radio
              >
            </a-radio-group>
          </div>
          <div
            v-show="
              formDataObject.badgeType == 1 || formDataObject.badgeType == 3
            "
          >
            <div class="image_info_wrap">
              <!-- <ImageUpload
                class="upload_wrap"
                v-model="formDataObject.imageUrl"
                uploadText="上传图片"
              ></ImageUpload> -->
              <div
                v-if="formDataObject.imageUrl"
                @click="openUpload('image', formDataObject, 2)"
                class="upload_wrap"
                :style="{
                  background: `url(${formDataObject.imageUrl}) no-repeat 50% 50%/cover`,
                }"
              >
                <p class="updateImg">更换图片</p>
              </div>
              <div
                v-else
                class="upload_wrap uploadBox"
                @click="openUpload('image', formDataObject, 2)"
              >
                <a-icon type="plus" />
                <p>上传图片</p>
              </div>
              <div class="right">
                <div class="top line">
                  <!-- <div class="label">标题</div>
                  <a-input
                    placeholder="建议10个字以内，可不填"
                    style="width: 100%"
                    v-model="formDataObject.imgTitle"
                  ></a-input>-->
                  <div class="label" v-if="formDataObject.badgeType !== 3">
                    链接
                  </div>
                  <a v-if="formDataObject.badgeType !== 3" @click="addLinkPage">
                    {{ formDataObject | jumpLinkTextFilter }}
                  </a>
                </div>
                <div class="bottom line">
                  <div class="label">建议上传60x60px或同等比例的图片</div>
                  <!-- <div class="label">链接</div>
                  <a @click="addLinkPage">{{
                    formDataObject | jumpLinkTextFilter
                  }}</a>-->
                </div>
              </div>
            </div>
            <div class="move margT10" v-if="formDataObject.listStyle == '4'">
              <span>图片宽度</span>
              <span>
                <a-input-number
                  :min="10"
                  :max="200"
                  v-model="formDataObject.imgWidth"
                ></a-input-number>
              </span>
              <span>px&nbsp;输入宽度数值，图片将等比例缩放</span>
            </div>
            <a-divider />
            <div
              class="image_title_input margT10"
              v-if="
                formDataObject.listStyle != '1' &&
                formDataObject.listStyle != '2' &&
                formDataObject.listStyle != '4'
              "
            >
              <div>
                <span class="title_tip">大标题</span>
                <span>
                  <a-input
                    @change="getWidthNum"
                    :maxLength="24"
                    v-model="formDataObject.imgTitle"
                    placeholder="请输入标题"
                  ></a-input>
                </span>
              </div>
              <div class="margT10">
                <span class="title_tip">小标题</span>
                <span>
                  <a-input
                    @change="getWidthNum"
                    :maxLength="28"
                    v-model="formDataObject.imgTitleS"
                    placeholder="请输入标题"
                  ></a-input>
                </span>
              </div>
            </div>
          </div>
          <div v-if="formDataObject.badgeType == 4">
            <div class="image_info_wrap">
              <!-- <ImageUpload
                class="upload_wrap"
                v-model="formDataObject.imageUrl"
                uploadText="上传图片"
              ></ImageUpload> -->
              <div
                v-if="formDataObject.imageUrl"
                @click="openUpload('image', formDataObject, 2)"
                class="upload_wrap"
                :style="{
                  background: `url(${formDataObject.imageUrl}) no-repeat 50% 50%/cover`,
                }"
              >
                <p class="updateImg">更换图片</p>
              </div>
              <div
                v-else
                class="upload_wrap uploadBox"
                @click="openUpload('image', formDataObject, 2)"
              >
                <a-icon type="plus" />
                <p>上传图片</p>
              </div>
              <div class="right">
                <div class="top line">
                  <!-- <div class="label">标题</div> -->
                  <a-input
                    placeholder="请输入"
                    style="width: 100%"
                    v-model="formDataObject.publicLink"
                  ></a-input>
                </div>
                <div class="bottom line">
                  <div class="label">请输入公众号链接</div>
                  <!-- <div class="label">链接</div>
                  <a @click="addLinkPage">{{
                    formDataObject | jumpLinkTextFilter
                  }}</a>-->
                </div>
              </div>
            </div>
            <div class="move margT10">
              <span>图片宽度</span>
              <span>
                <a-input-number
                  :min="10"
                  :max="200"
                  v-model="formDataObject.imgWidth"
                ></a-input-number>
              </span>
              <span>px&nbsp;输入宽度数值，图片将等比例缩放</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <video-modal
      :visible="visibleModal"
      @cancel="closeInfoModal"
      :ContentType="ContentType"
      @upload="upload"
      :videoData="videoData"
      :dataIndex="dataIndex"
    ></video-modal>
    <PageModal
      :record="currentRecord"
      @cancel="closeInfoModal"
      @confirm="selectedPage"
      :visible="pageModalVisible"
      :pageIndex="pageIndex"
      :pageModelId="pageModelId"
    ></PageModal>
  </div>
</template>
<script>
import ShopModal from "@/components/ShopList/ShopModalList";
import videoModal from "@/components/antBase/videoModal";
import ImageUpload from "@components/antBase/ImageUpload";
import PageModal from "@components/antBase/PageModal";
import { cloneDeep } from "lodash";
export default {
  name: "MyFiexdIconForm",
  components: {
    ShopModal,
    ImageUpload,
    PageModal,
    videoModal,
  },
  filters: {
    jumpLinkTextFilter(item) {
      if (item.jumpPageId) {
        return item.jumpPageType == "WXMAID"
          ? item.jumpPageUrl
          : item.jumpPageName;
      } else return "点击选择跳转到的页面";
    },
    scaleFilter(item) {
      switch (item) {
        case "0":
          return "3:2";
        case "1":
          return "1:1";
        case "2":
          return "3:4";
        default:
          return "16:9";
      }
    },
    listStyleFilter(item) {
      switch (item) {
        case "0":
          return "样式一";
        case "1":
          return "样式二";
        case "2":
          return "样式三";
        case "3":
          return "样式四";
        default:
          return "自定义";
      }
    },
    floatPositionFilter(item) {
      switch (item) {
        case "0":
          return "左吸附";
        case "1":
          return "右吸附";
        case "2":
          return "左固定";
        case "3":
          return "右固定";
      }
    },
    floatTxtFilter(item) {
      switch (item) {
        case "0":
        case "2":
          return "右";
        default:
          return "左";
      }
    },
    backgroundColor(item) {
      switch (item) {
        case 1:
          return "白色";
        case 2:
          return "金色";
        case 3:
          return "自定义";
        default:
          return "白色";
      }
    },
  },
  props: {
    // 传入的原始数据
    formData: {},
    domHeight: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    text() {
      return function (value) {
        if (value == "" || value == 0) {
          return "50px";
        } else {
          return (
            (String(value).length * 10 < 50
              ? "60"
              : String(value).length * 9.5 + 20) + "px"
          );
        }
      };
    },
  },
  created() {
    this.formDataObject = cloneDeep(this.formData);
    console.log(this.formDataObject);
  },
  mounted() {
    this.getDomH();
  },
  data() {
    return {
      timer: null,
      openlist: [],
      tabType: 1,
      pageModalVisible: false,
      currentRecord: {},
      formDataObject: {
        // shopType: "0", // 商品样式'0无边白底1卡片投影'
        // listStyle: "1", // 列表样式0大图模式1一行两个2一行三个
        // angleType: "0", // 商品倒角0直角1圆角
        // imgScale: "0", // 图片比例0 '3:4',1 '1:1',2 '3:4',3 '16:9'
        // imgFill: "1", // 图片填充 0填充,1周边留白（默认）
        // textAlign: "left", // 显示位置
        // titleThickness: "normal", // 标题粗细
        // shopDescription: false, // 商品描述
        // shopName: false, // 商品名称
        // shopPrices: false, // 商品价格
        // shopBadge: false, // 商品角标
        // shopBuyBtn: false, // 购买按钮
        // shopOriginalPrices: false, // 商品原价
        // pagePadding: 15, // 页面边距
        // imagePadding: 10, // 图片间距
        // imageList: [],
      },
      pageModelId: "",
      pageIndex: "MSPAGE",
      topHeight: 0,
      maxNum: 100,
      visibleModal: false,
      ContentType: "image",
      videoData: {},
      dataIndex: "",
      uploadType: 1,
    };
  },
  methods: {
    upload(val) {
      this.visibleModal = false;
      this.videoData = val;
      if (this.ContentType == "video") {
        // this.$set(this.formDataObject, "videoUrl", val.fileUrl);
        // this.$set(this.formDataObject, "imgUrl", val.video.coverPicture);
      } else {
        // this.formDataObject.imgUrl = url
        if (this.uploadType == 1) {
          this.$set(this.formDataObject, "backgroundUrl", val.fileUrl);
        } else {
          this.$set(this.formDataObject, "imageUrl", val.fileUrl);
        }
      }
    },
    // 打开上传组件
    openUpload(a, item, c) {
      if (a == "video") {
        // this.checkValue = { videoUrl: item.videoUrl };
      } else {
        if (c == 1) {
          this.uploadType = 1;
          this.checkValue = { imgUrl: item.backgroundUrl };
        } else {
          this.uploadType = 2;
          this.checkValue = { imgUrl: item.imageUrl };
        }
      }
      this.ContentType = a;
      this.visibleModal = true;
    },
    getDomH() {
      const { floatPosition, imgWidth } = this.formDataObject;
      var dom = document.querySelectorAll(".transition>.component-item");
      let custom_w = document.querySelector(
        ".current.component_absolute"
      ).offsetHeight;
      var h = 0;
      var arr = null;
      arr = Array.prototype.slice.call(dom, 0);
      arr.map((item) => {
        // h = h + item.offsetHeight
        if (!item.className.includes("component_absolute")) {
          h = h + item.offsetHeight;
        }
      });
      if (floatPosition == "0" || floatPosition == "1") {
        this.topHeight = h - custom_w < 0 ? 0 : h - custom_w;
        this.maxNum = h - custom_w < 0 ? 0 : h - custom_w;
      } else {
        this.maxNum = 100;
      }
      this.formDataObject.maxHeightNum = this.maxNum;
    },
    changeCheck(a, b) {
      this.$set(this.formDataObject, a, b);
      if (a == "listStyle") {
        this.$set(this.formDataObject, "badgeType", 1);
        this.$set(this.formDataObject, "imgWidth", 60);
        this.getWidthNum();
        this.getDomH();
      }
      if (a == "floatPosition") {
        this.getDomH();
        if (b == "0" || b == "1") {
          this.maxNum = this.topHeight;
        } else {
          this.maxNum = 100;
        }
      }
    },
    addLinkPage(item) {
      // 开启产品选择弹窗，以便配置跳转链接
      // this.currentImageItem = item
      this.pageModalVisible = true;
    },
    selectedPage(val) {
      if (JSON.stringify(val) == "{}") {
        val = [];
      }
      console.log(val, "val");
      this.formDataObject.jumpPageType = val.type;
      this.formDataObject.jumpPageId = val.id;
      this.formDataObject.jumpPageName = val.name;
      this.formDataObject.jumpPageUrl = val.url;
      this.pageModalVisible = false;
    },
    closeInfoModal(type) {
      this.pageModalVisible = false;
      this.visibleModal = false;
    },
    deleteImageInfo(index) {
      this.formDataObject.imageList.splice(index, 1);
    },
    deleteShopInfo(i) {
      this.formDataObject.shopList.splice(i, 1);
    },
    addImage() {
      if (this.formDataObject.shopList.length >= 15) {
        this.$message.warning("最多添加15个分组");
        return false;
      }
      this.tabType = 2;
      this.openModalAdd();

      // const initialConfig = {
      //   imageType: this.checkedValOne, //
      //   imageUrl: '', // 显示图片的链接
      //   imageTitle: '', // 标题
      //   jumpPageId: '', // 跳转的页面的id
      //   jumpPageName: '', // 跳转的页面的名称
      //   hotAreaConfigInfoList: [
      //     // 热区选区信息集合。
      //   ]
      // }
      // this.formDataObject.shopList.push(initialConfig)
    },
    openModalAdd() {
      if (this.tabType == 1) {
        this.openlist = this.formDataObject.imageList;
      } else {
        this.openlist = this.formDataObject.shopList;
      }
      this.pageModalVisible = true;
    },
    changeBadge(e) {
      console.log(this.formDataObject.badgeType);
      console.log(e.target.value);
      // this.formDataObject.badgeType=e.target.value;
      this.$set(this.formDataObject, "imgWidth", 60);
      this.$set(this.formDataObject, "badgeType", e.target.value);
    },
    changeAngleNum(e) {
      this.$set(this.formDataObject, "angleNum", e.target.value);
    },
    changeBtnType(e) {
      this.$set(this.formDataObject, "btnType", e.target.value);
    },
    changeShopShow(e) {
      console.log("this.showAllShop", e.target.value);
      this.$set(this.formDataObject, "showAllShop", e.target.value);
    },
    getWidthNum() {
      this.$nextTick(() => {
        const { left } = this.formDataObject;
        let w = document.querySelector(
          ".current.component_absolute"
        ).offsetWidth;
        console.log(w, "2");
        let newW = ((375 - w) * left) / 375;
        console.log(newW, "newW");
        this.formDataObject.correctLeft = newW;
      });
    },
  },
  beforeDestroy() {
    // if (this.formDataObject.shopListType == '1') {
    //   this.formDataObject.shopList = []
    // } else {
    //   this.formDataObject.imageList = []
    // }
  },
  watch: {
    formDataObject: {
      handler(n, o) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          // console.log(document.querySelector('.current.component_absolute'), '1234wre')

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
.btn_add {
  display: inline-block;
  background: #fff;
  width: 50px;
  height: 50px;
  text-align: center;
  margin: 10px;
  box-shadow: 0 0 4px 0;
  .iconfont {
    font-size: 32px;
    color: #016bff;
  }
}
.form_data {
  .iconfont {
    font-size: 24px;
  }
}
.line {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 12px;
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
.title-text-form {
  .title_nav {
    .from_seaction {
      .title_h3 {
        font-size: 14px;
        color: #333333;
      }
      .marT10 {
        margin-top: 10px;
      }
      .move {
        span {
          margin-right: 8px;
          font-size: 14px;
        }
        /deep/.ant-input-number {
          min-width: 50px;
        }
        /deep/.ant-input-number-handler-wrap {
          display: none;
        }
      }
      .image_info_wrap {
        margin-top: 13px;
        display: flex;
        .upload_wrap {
        }
        /deep/ .upload_wrap {
          .avatar-uploader .ant-upload {
            width: 60px;
            height: 60px;
            margin-right: 0;
            margin-bottom: 0;
            .image_wrap {
              .image {
                // height: 60px;
                // width: unset;
              }
            }
          }
        }
        .right {
          margin-left: 12px;
          flex: auto;
          // display: flex;
          // flex-direction: column;
          // justify-content: space-between;
          .top {
            .label {
            }
          }
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
          .line:last-child {
            margin-top: 10px;
            color: #999;
          }
        }
      }
      .image_title_input {
        /deep/.ant-input {
          width: 240px;
        }
        .title_tip {
          margin-right: 10px;
        }
      }
    }
    .icon_btn_check {
      background: #e0edff;
      border: 1px solid #016bff;
      color: #016bff;
      .iconfont {
        color: #016bff;
      }
    }
    .two {
      margin-left: 10px;
      font-size: 14px;
      color: #333333;
    }
    .disFlex {
      display: flex;
      justify-content: space-between;
    }
    .color_change {
      width: 100px;
      display: flex;
      justify-content: space-between;
      /deep/.ant-input {
        width: 60px;
        padding: 1px;
        border-radius: 0;
      }
      //   .color_option {
      //     display: inline-block;
      //     width: 30px;
      //     height: 30px;
      //     border-radius: 3px;
      //     border: 1px solid #e6e6e6;
      //     padding: 2px;
      //     > span,
      //     input {
      //       display: inline-block;
      //       width: 100%;
      //       height: 100%;
      //       border-radius: 3px;
      //       cursor: pointer;
      //     }
      //     .bgWhite {
      //       background: #fff;
      //     }
      //     .bgBlack {
      //       background: #000;
      //     }
      //     .bgGray {
      //       // background: #1C1C1C;
      //       border: 0;
      //     }
      //   }
    }
    .prompt {
      display: flex;
      justify-content: flex-start;
      margin-top: 10px;
      .prompt_txt {
        width: 120px;
        margin-right: 10px;
        /deep/.ant-input {
          border-radius: 0;
          font-size: 14px;
          color: #333333;
        }
      }
      .prompt_tip {
        height: 32px;
        line-height: 32px;
        font-size: 12px;
        color: #999999;
      }
    }
  }
  span {
    display: inline-block;
    font-size: 14px;
    color: #999999;
  }
  /deep/.ant-tabs-nav {
    width: 90%;
    margin: 0 auto;
    .ant-tabs-tab {
      text-align: center;
      width: 50%;
    }
  }
  /deep/.ant-divider-horizontal {
    margin: 18px 0;
  }
}
.iconfont {
  cursor: pointer;
}
.margT10 {
  margin-top: 10px;
}
.link {
  display: flex;
  justify-content: space-between;
}
.listStyle {
  display: flex;
  justify-content: flex-start;
  .listCheck {
    display: inline-block;
    text-align: center;
    width: 58px;
    height: 32px;
    line-height: 32px;
    border: 1px solid #e6e6e6;
  }
  .iconfont {
    font-size: 24px;
    color: #e6e6e6;
  }
  .two {
    margin-left: 5px;
  }
}
.icon_btn {
  cursor: pointer;
  width: 50px;
  border: 1px solid #e6e6e6;
  text-align: center;
  border-radius: 3px;
}
.wth100 {
  width: 90px;
}
.check_radio {
  height: 32px;
  line-height: 32px;
  ._check {
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
span {
  span {
    height: 32px;
    line-height: 32px;
    vertical-align: middle;
  }
}
.image_add_wrap {
  position: relative;
  background-color: #fff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  border-radius: 2px;
  // padding: 12px;
  margin: 10px;
  .shopImg {
    width: 50px;
    height: 50px;
    img {
      width: 100%;
    }
  }
  .delete_icon {
    width: 16px;
    height: 16px;
    position: absolute;
    top: -8px;
    right: -8px;
    cursor: pointer;
    display: none;
  }
  &:hover {
    .delete_icon {
      display: block;
    }
  }

  // .image_type_choose {
  // }
  .image_info_wrap {
    margin-top: 13px;
    display: flex;
    // .upload_wrap {
    // }
    /deep/ .upload_wrap {
      .avatar-uploader .ant-upload {
        width: 0.9rem;
        height: 0.9rem;
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
      }
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
  .treeList {
    position: relative;
    width: 100%;
    padding: 10px;
    span:last-child {
      margin-left: 12px;
    }
    // .title_add {
    // }
    .seaction_add {
      padding: 5px 0;
    }
  }
}
.add_btn {
  margin-top: 12px;
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  position: relative;
  text-align: center;
  font-family: MicrosoftYaHei;
  font-size: 14px;
  background-color: #fff;
  color: #016bff;
  border: 1px solid #016bff;
  .icon_add {
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
    width: 30px;
    height: 30px;
  }
  .text {
    color: #016bff;
  }
}
// /deep/ .ant-upload {
//   display: block;
//   width: 0.9rem !important;
//   height: 0.9rem !important;
// }
.bgcolor {
  display: flex;
  div {
    width: 30px;
    border-radius: 2px;
    height: 30px;
    border: 1px solid #e6e6e6;
  }
  .styleOne {
    background: #ffffff;
  }
  .styleTwo {
    background: #c8a579;
  }
  .styleThree {
    background: url("~@images/shop/icon_right_attributebar_xuanfu_bg_zidingyi.png")
      no-repeat 50% 50% / cover;
  }
  .bgActive {
    border: 1px solid #016bff;
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
.uploadText {
  font-size: 12px;
  font-family: MicrosoftYaHei;
  color: #999999;
  margin: 22px 0 0 14px;
}
.bgupload {
  background: #fafafa;
  padding: 10px;
}
.bguploadArea {
  display: flex;
  background: #ffffff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.2);
  padding: 10px;
  border-radius: 2px;
}
</style>

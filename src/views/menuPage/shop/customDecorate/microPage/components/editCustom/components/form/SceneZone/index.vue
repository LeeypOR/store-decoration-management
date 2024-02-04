<template>
  <div class="scene-zone">
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
    <div class="zone_model">
      <div class="title_wrap">
        <span class="label">专区模式</span>
        <span class="result">
          {{ formDataObject.zoneModelType | zoneModelTypeFilter }}
        </span>
      </div>
      <ImageRadioGroup
        class="image_radio_group"
        v-model="formDataObject.zoneModelType"
      >
        <ImageRadio
          tighten
          value="0"
          width="172px"
          height="32px"
          :checkedImage="checkedImage01"
          :uncheckedImage="uncheckedImage01"
        ></ImageRadio>
        <ImageRadio
          tighten
          value="1"
          width="172px"
          height="32px"
          :checkedImage="checkedImage02"
          :uncheckedImage="uncheckedImage02"
        ></ImageRadio>
      </ImageRadioGroup>
    </div>

    <a-divider />

    <div class="zone_wrap">
      <a-collapse accordion expandIconPosition="right" @change="changeZone">
        <template #expandIcon="props">
          <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
        </template>
        <a-collapse-panel
          :header="`专区${i + 1}`"
          v-for="(item, i) of formDataObject.zoneList"
          :key="i"
        >
          <div class="zone_style">
            <div class="title_wrap">
              <span class="label">专区样式</span>
              <span class="result">
                {{ item.zoneStyle | zoneStyleFilter }}
              </span>
            </div>
            <ImageRadioGroup
              class="image_radio_group"
              v-model="item.zoneStyle"
              @change="changeZoneStyle"
            >
              <ImageRadio
                tighten
                value="1"
                width="83px"
                height="32px"
                :checkedImage="
                  formDataObject.zoneModelType == 0
                    ? checkedImage08
                    : checkedImage08_cross
                "
                :uncheckedImage="
                  formDataObject.zoneModelType == 0
                    ? uncheckedImage08
                    : uncheckedImage08_cross
                "
              ></ImageRadio>
              <ImageRadio
                tighten
                value="2"
                width="83px"
                height="32px"
                :checkedImage="
                  formDataObject.zoneModelType == 0
                    ? checkedImage09
                    : checkedImage09_cross
                "
                :uncheckedImage="
                  formDataObject.zoneModelType == 0
                    ? uncheckedImage09
                    : uncheckedImage09_cross
                "
              ></ImageRadio>
              <ImageRadio
                tighten
                value="3"
                width="83px"
                height="32px"
                :checkedImage="
                  formDataObject.zoneModelType == 0
                    ? checkedImage10
                    : checkedImage10_cross
                "
                :uncheckedImage="
                  formDataObject.zoneModelType == 0
                    ? uncheckedImage10
                    : uncheckedImage10_cross
                "
              ></ImageRadio>
              <ImageRadio
                tighten
                value="4"
                width="83px"
                height="32px"
                :checkedImage="
                  formDataObject.zoneModelType == 0
                    ? checkedImage11
                    : checkedImage11_cross
                "
                :uncheckedImage="
                  formDataObject.zoneModelType == 0
                    ? uncheckedImage11
                    : uncheckedImage11_cross
                "
              ></ImageRadio>
            </ImageRadioGroup>
          </div>

          <div
            class="preview_wrap"
            :class="{
              vertical: formDataObject.zoneModelType === '0',
              horizontal: formDataObject.zoneModelType === '1',
            }"
          >
            <!-- <div></div> -->
            <div class="left">
              <SceneZoneImagePreview
                class="item"
                :class="{
                  active: currentZoneIndex == i && currentCellIndex === 0,
                }"
                @click="setCurrentIndex(0, i)"
                :imgUrl="getImageUrl(item.zoneImageList[0])"
                :sizeDesc="leftImageSizeDesc"
              />
            </div>
            <div class="right">
              <SceneZoneImagePreview
                class="item"
                :class="{
                  active: currentZoneIndex == i && currentCellIndex === j + 1,
                }"
                @click="setCurrentIndex(j + 1, i, j)"
                v-for="(imageItem, j) of otherProductImageList"
                :key="j"
                :imgUrl="getImageUrl(imageItem)"
                :sizeDesc="getSceneZoneSizeDesc(item.zoneStyle)"
              />
            </div>
          </div>

          <div class="add_type_wrap">
            <a-radio-group v-model="currentSelectedCellImageInfo.addType">
              <a-radio value="1"> 添加图片 </a-radio>
              <a-radio value="2"> 添加商品 </a-radio>
            </a-radio-group>
          </div>

          <div
            class="image_upload_wrap"
            v-if="currentSelectedCellImageInfo.addType == '1'"
          >
            <a-radio-group
              class="image_type_choose"
              v-model="currentSelectedCellImageInfo.imageType"
            >
              <a-radio-button value="1"> 单链接 </a-radio-button>
              <a-radio-button value="2"> 热区 </a-radio-button>
            </a-radio-group>
            <div class="image_info_wrap">
              <div
                v-if="currentSelectedCellImageInfo.imageUrl"
                @click="openUpload('image', 3, 2)"
                class="upload_wrap"
                :style="{
                  background: `url(${currentSelectedCellImageInfo.imageUrl}) no-repeat 50% 50%/cover`,
                }"
              >
                <p class="updateImg">更换图片</p>
              </div>
              <div
                v-else
                class="upload_wrap uploadBox"
                @click="openUpload('image', 3, 2)"
              >
                <a-icon type="plus" />
                <p>上传图片</p>
              </div>
              <!-- <ImageUpload
                class="upload_wrap"
                v-model="currentSelectedCellImageInfo.imageUrl"
                uploadText="上传图片"
              ></ImageUpload> -->
              <div
                class="right"
                style="display: flex; align-items: center; flex-direction: row"
              >
                <!-- <div class="top line">
                  <div class="label">标题</div>
                  <a-input
                    placeholder="建议10个字以内，可不填"
                    style="width: 100%"
                    v-model="currentSelectedCellImageInfo.imageTitle"
                  ></a-input>
                </div> -->
                <div class="bottom line">
                  <div class="label">链接</div>
                  <a
                    v-show="currentSelectedCellImageInfo.imageType == '1'"
                    @click="cellImageAddLinkPage(currentSelectedCellImageInfo)"
                    >{{
                      currentSelectedCellImageInfo
                        | backgroundJumpLinkTextFilter
                    }}</a
                  >
                  <a
                    v-show="currentSelectedCellImageInfo.imageType == '2'"
                    @click="cellImageAddHotArea(currentSelectedCellImageInfo)"
                    >{{
                      currentSelectedCellImageInfo
                        | backgroundJumpLinkTextFilter
                    }}</a
                  >
                </div>
              </div>
            </div>
          </div>

          <div
            class="product_add_wrap"
            v-if="currentSelectedCellImageInfo.addType == '2'"
          >
            <div class="title">添加商品</div>
            <div class="add_wrap">
              <div
                class="image_wrap"
                v-if="currentSelectedCellImageInfo.productList.length > 0"
              >
                <div class="product_image">
                  <img
                    class="delete_icon"
                    @click="deleteImageInfo(i)"
                    src="~@images/shop/icon_middle_modalbox_delete_s.png"
                    alt
                  />
                  <img
                    :src="
                      currentSelectedCellImageInfo.productList[0]
                        .productIdImageUrl
                    "
                    alt
                  />
                </div>
              </div>
              <div class="btn_add" @click="openProductAddModal" v-else>
                <span class="iconfont icon-join"></span>
              </div>
            </div>
          </div>

          <span
            slot="extra"
            type="setting"
            class="delete"
            @click="deteleZone($event, i)"
          >
            删除
          </span>
        </a-collapse-panel>
      </a-collapse>
    </div>
    <!-- 添加专区的按钮 -->
    <div class="add_btn" @click="addImage">
      <img
        class="icon_add"
        src="~@images/shop/icon_right_attributebar_jiahao.png"
      />
      <span class="text">添加专区</span>
    </div>

    <a-divider />

    <!-- 样式区域 -->
    <div class="style_wrap">
      <div class="line">
        <div class="text_wrap">
          <div class="label">点击按钮</div>
          <!-- <div class="result">
            {{ formDataObject.isShowBtn | styleTypeFilter }}
          </div> -->
        </div>
        <a-radio-group
          class="image_type_choose"
          v-model="formDataObject.isShowBtn"
        >
          <a-radio-button :value="true"> 显示 </a-radio-button>
          <a-radio-button :value="false"> 不显示 </a-radio-button>
        </a-radio-group>
      </div>

      <div class="line">
        <div class="text_wrap">
          <div class="label">间距</div>
          <!-- <div class="result">
            {{ formDataObject.isShowBtn | styleTypeFilter }}
          </div> -->
        </div>
        <a-radio-group
          class="image_type_choose"
          v-model="formDataObject.paddingShow"
        >
          <a-radio-button :value="true"> 显示 </a-radio-button>
          <a-radio-button :value="false"> 不显示 </a-radio-button>
        </a-radio-group>
      </div>

      <div class="line" v-if="formDataObject.paddingShow">
        <div class="text_wrap">
          <div class="label">透明度</div>
        </div>
        <a-slider
          class="slider"
          v-model="formDataObject.borderTransparency"
          :max="100"
          style="width: 120px"
        />
        <a-input-number
          v-model="formDataObject.borderTransparency"
          :max="100"
          style="marginleft: 16px"
        />
      </div>

      <div class="line">
        <div class="text_wrap">
          <div class="label">图片样式</div>
          <div class="result">
            {{ formDataObject.styleType | styleTypeFilter }}
          </div>
        </div>
        <ImageRadioGroup
          @change="changeRadio"
          v-model="formDataObject.styleType"
        >
          <ImageRadio
            tighten
            value="1"
            width="50px"
            height="32px"
            :checkedImage="checkedImage04"
            :uncheckedImage="uncheckedImage04"
          ></ImageRadio>
          <ImageRadio
            tighten
            value="2"
            width="50px"
            height="32px"
            :checkedImage="checkedImage05"
            :uncheckedImage="uncheckedImage05"
          ></ImageRadio>
        </ImageRadioGroup>
      </div>
      <div class="line">
        <div class="text_wrap">
          <div class="label">图片倒角</div>
          <div class="result">
            {{ formDataObject.borderType | borderTypeFilter }}
          </div>
        </div>
        <ImageRadioGroup
          @change="changeRadio"
          v-model="formDataObject.borderType"
        >
          <ImageRadio
            tighten
            value="1"
            width="50px"
            height="32px"
            :checkedImage="checkedImage06"
            :uncheckedImage="uncheckedImage06"
          ></ImageRadio>
          <ImageRadio
            tighten
            value="2"
            width="50px"
            height="32px"
            :checkedImage="checkedImage07"
            :uncheckedImage="uncheckedImage07"
          ></ImageRadio>
        </ImageRadioGroup>
      </div>
      <!-- <div class="line">
        <div class="text_wrap">
          <div class="label">外框边距</div>
        </div>
        <a-slider
          class="slider"
          v-model="formDataObject.pagePadding"
          :min="0"
          :max="30"
          style="width: 120px"
        />
        <a-input-number
          v-model="formDataObject.pagePadding"
          :min="0"
          :max="30"
          style="marginleft: 16px"
        />
      </div>
      <div class="line">
        <div class="text_wrap">
          <div class="label">商品间距</div>
        </div>
        <a-slider
          class="slider"
          v-model="formDataObject.itemPadding"
          :min="0"
          :max="30"
          style="width: 120px"
        />
        <a-input-number
          v-model="formDataObject.itemPadding"
          :min="0"
          :max="30"
          style="marginleft: 16px"
        />
      </div> -->
      <div class="line">
        <div class="text_wrap">
          <div class="label">商品位置</div>
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
    </div>

    <!-- 添加商品模态框 -->
    <ShopModal
      :list="currentSelectedCellImageInfo.productList"
      @cancel="productModalVisible = false"
      @confirm="addProduct"
      :visible="productModalVisible"
      selectedType="radio"
      :tabType="1"
    ></ShopModal>

    <!-- 专区小格子里的单链接和热区选择框 -->
    <PageModal
      @cancel="cellImageLinkModalVisible = false"
      @confirm="cellImageLinkSelectedPage"
      :visible="cellImageLinkModalVisible"
      :pageIndex="pageIndex"
      :pageModelId="pageModelId"
    ></PageModal>
    <HotAreaSelectedModal
      v-model="cellImageHotAreaShow"
      :dataSource="currentSelectedCellImageInfo"
    >
    </HotAreaSelectedModal>

    <video-modal
      :visible="visibleModal"
      @cancel="visibleModal = false"
      :ContentType="ContentType"
      @upload="upload"
      :videoData="videoData"
      :dataIndex="dataIndex"
    ></video-modal>
    <!-- 背景图的单链接和热区选择框 -->
    <PageModal
      @cancel="backgroundLinkPageModalVisible = false"
      @confirm="backgroundLinkSelectedPage"
      :visible="backgroundLinkPageModalVisible"
      :pageIndex="pageIndex"
      :pageModelId="pageModelId"
    ></PageModal>
    <HotAreaSelectedModal
      v-model="backgroundLinkHotAreaShow"
      :dataSource="formDataObject.backgroundInfo"
    >
    </HotAreaSelectedModal>
  </div>
</template>
<script>
import ShopModal from "@/components/ShopList/ShopModalList";
import HotAreaSelectedModal from "@components/antBase/HotAreaSelectedModal";
import PageModal from "@components/antBase/PageModal";
import ImageRadio from "@components/base/ImageRadio";
import ImageRadioGroup from "@components/base/ImageRadioGroup";
import ImageUpload from "@components/antBase/ImageUpload";
import videoModal from "@/components/antBase/videoModal";
import CropperUpload from "@components/antBase/CropperUpload";
import SceneZoneImagePreview from "@components/base/SceneZoneImagePreview.vue";
import { cloneDeep } from "lodash";
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  name: "SceneZoneForm",
  components: {
    ShopModal,
    SceneZoneImagePreview,
    HotAreaSelectedModal,
    ImageRadio,
    ImageRadioGroup,
    PageModal,
    ImageUpload,
    CropperUpload,
    videoModal,
  },
  props: {
    // 传入的原始数据
    formData: {},
  },
  filters: {
    zoneStyleFilter(val) {
      switch (val) {
        case "1":
          return "1图1商品";
        case "2":
          return "1图2商品";
        case "3":
          return "1图3商品";
        case "4":
          return "1图4商品";
        default:
          return `不存在的值${val}`;
      }
    },
    styleTypeFilter(val) {
      switch (val) {
        case "1":
          return "常规";
        case "2":
          return "阴影";
        default:
          return `不存在的值${val}`;
      }
    },
    borderTypeFilter(val) {
      switch (val) {
        case "1":
          return "直角";
        case "2":
          return "圆角";
        default:
          return `不存在的值${val}`;
      }
    },

    zoneModelTypeFilter(val) {
      switch (val) {
        case "0":
          return "竖图模式";
        case "1":
          return "横图模式";
        default:
          return `不存在的值${val}`;
      }
    },

    backgroundJumpLinkTextFilter(item) {
      if (item.imageType == "1") {
        // console.log('item.jumpPageId', item.jumpPageId, item.jumpPageName)
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
      productModalVisible: false,

      checkedImage01: require("@images/shop/icon_right_attributebar_shubanms_selected.png"),
      uncheckedImage01: require("@images/shop/icon_right_attributebar_shubanms_default.png"),
      checkedImage02: require("@images/shop/icon_right_attributebar_hengbanms_selected.png"),
      uncheckedImage02: require("@images/shop/icon_right_attributebar_hengbanms_default.png"),

      checkedImage04: require("@images/shop/icon_right_attributebar_wyy_selected.png"),
      uncheckedImage04: require("@images/shop/icon_right_attributebar_wyy_default.png"),
      checkedImage05: require("@images/shop/icon_right_attributebar_yinying_selected.png"),
      uncheckedImage05: require("@images/shop/icon_right_attributebar_yinying_default.png"),
      checkedImage06: require("@images/shop/icon_right_attributebar_zhijiao_selected.png"),
      uncheckedImage06: require("@images/shop/icon_right_attributebar_zhijiao_default.png"),
      checkedImage07: require("@images/shop/icon_right_attributebar_yuanjiao_selected.png"),
      uncheckedImage07: require("@images/shop/icon_right_attributebar_yuanjiao_default.png"),

      checkedImage08: require("@images/shop/icon_right_attributebar_zqys1_selected.png"),
      uncheckedImage08: require("@images/shop/icon_right_attributebar_zqys1_default.png"),
      checkedImage09: require("@images/shop/icon_right_attributebar_zqys2_selected.png"),
      uncheckedImage09: require("@images/shop/icon_right_attributebar_zqys2_default.png"),
      checkedImage10: require("@images/shop/icon_right_attributebar_zqys3_selected.png"),
      uncheckedImage10: require("@images/shop/icon_right_attributebar_zqys3_default.png"),
      checkedImage11: require("@images/shop/icon_right_attributebar_zqys4_selected.png"),
      uncheckedImage11: require("@images/shop/icon_right_attributebar_zqys4_default.png"),

      checkedImage08_cross: require("@images/shop/icon_right_attributebar_hb_1t1sp_selected.png"),
      uncheckedImage08_cross: require("@images/shop/icon_right_attributebar_hb_1t1sp_default.png"),
      checkedImage09_cross: require("@images/shop/icon_right_attributebar_hb_1t2sp_selected.png"),
      uncheckedImage09_cross: require("@images/shop/icon_right_attributebar_hb_1t2sp_default.png"),
      checkedImage10_cross: require("@images/shop/icon_right_attributebar_hb_1t3sp_selected.png"),
      uncheckedImage10_cross: require("@images/shop/icon_right_attributebar_hb_1t3sp__default.png"),
      checkedImage11_cross: require("@images/shop/icon_right_attributebar_hb_1t4sp_selected.png"),
      uncheckedImage11_cross: require("@images/shop/icon_right_attributebar_hb_1t4sp_default.png"),

      currentZoneIndex: 0,
      currentCellIndex: 0,

      // backgroundPageModalVisible: false,
      otherProductImageList: [],

      cellImageHotAreaShow: false,
      cellImageLinkModalVisible: false,
      backgroundLinkHotAreaShow: false,
      backgroundLinkPageModalVisible: false,
      loading: false,
      // imageUrl: '',
      actived: true,
      // visibleModal: false,
      formDataObject: {},
      title: "",
      ContentType: "video",
      fileSize: 2,
      currentRecord: {},
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
      tabType: 1, // 1背景图 // 2专区图
      visibleModal: false,
      ContentType: "image",
      videoData: {},
      dataIndex: "",
    };
  },
  computed: {
    leftImageSizeDesc() {
      if (this.formDataObject.zoneModelType === "0") {
        return "150X340";
      } else {
        return "300X145";
      }
    },
    currentActiveZoneInfo() {
      const length = this.formDataObject.zoneList.length;
      if (length === 0) {
        return {};
      }

      return this.formDataObject.zoneList[this.currentZoneIndex];

      // if (this.currentZoneIndex >= length) {
      //   // this.currentZoneIndex--
      //   return this.formDataObject.zoneList[this.currentZoneIndex]
      // } else {
      //   return this.formDataObject.zoneList[this.currentZoneIndex]
      // }
    },
    currentSelectedCellImageInfo() {
      if (Object.keys(this.currentActiveZoneInfo).length === 0) {
        return {};
      }
      return this.currentActiveZoneInfo.zoneImageList[this.currentCellIndex];
    },
    // SceneZoneItemSizeDesc () {
    // }
  },
  created() {
    this.formDataObject = cloneDeep(this.formData);
    this.initData();
  },
  methods: {
    getImageUrl(item) {
      // 添加图片时
      if (item.addType === "1") {
        return item.imageUrl;
      } else if (item.addType === "2") {
        // 添加商品时
        return item.productList[0] && item.productList[0].productIdImageUrl;
      }
    },
    deleteImageInfo(index) {
      this.currentSelectedCellImageInfo.productList.splice(0, 1);
    },

    addProduct(val) {
      this.currentSelectedCellImageInfo.productList = [];
      val.map((item) => {
        this.currentSelectedCellImageInfo.productList.push({
          id: item.id,
          // goodsName: item.goodsName,
          productIdImageUrl: item.goodsPicture,
          // salePrice: item.salePrice,
          // goodsTitle: item.goodsSellingPoint,
          // realSales: item.realSales
        });
      });
      this.productModalVisible = false;
    },

    openProductAddModal() {
      this.productModalVisible = true;
    },
    initData() {
      // 初始化数据
      const imageCellCount = +this.currentActiveZoneInfo.zoneStyle + 1;
      this.otherProductImageList =
        this.currentActiveZoneInfo.zoneImageList.slice(1, imageCellCount);
    },
    changeZoneStyle(zoneStyle) {
      console.log("changeZoneStyle", zoneStyle);
      const imageCellCount = +zoneStyle + 1;
      this.otherProductImageList =
        this.currentActiveZoneInfo.zoneImageList.slice(1, imageCellCount);
    },
    changeZone(key) {
      console.log("key");
      if (key) {
        this.currentZoneIndex = key;
        console.log("当前激活的专区下标为", this.currentZoneIndex);
      } else {
        console.log("无激活专区窗口");
      }

      const imageCellCount = +this.currentActiveZoneInfo.zoneStyle + 1;
      this.otherProductImageList =
        this.currentActiveZoneInfo.zoneImageList.slice(1, imageCellCount);
    },
    setCurrentIndex(index, i, j) {
      this.currentCellIndex = index;
      console.log("激活专区序号：", this.currentZoneIndex);
      console.log("激活格子编号：", this.currentCellIndex);
      console.log("i,j的值为", i, j);
      console.log("currentZoneIndex === i", this.currentZoneIndex == i);
      console.log("currentCellIndex === 0", this.currentCellIndex == 0);

      console.log(
        "this.currentCellIndex === j + 1",
        this.currentCellIndex === j + 1
      );

      // console.log('当前专区选择激活的图片为', index, this.currentCellIndex)
    },
    getSceneZoneSizeDesc(zoneStyle) {
      // 竖图模式
      if (this.formDataObject.zoneModelType === "0") {
        switch (zoneStyle) {
          case "1":
            return "100X340";
          case "2":
            return "100X165";
          case "3":
            return "100X106";
          case "4":
            return "100X78";
          default:
            return "不存在的专区样式";
        }
      } else if (this.formDataObject.zoneModelType === "1") {
        // 横图模式
        switch (zoneStyle) {
          case "1":
            return "300X145";
          case "2":
            return "145X145";
          case "3":
            return "93X145";
          case "4":
            return "67X145";
          default:
            return "不存在的专区样式";
        }
      }
    },
    deteleZone(event, index) {
      // If you don't want click extra trigger collapse, you can prevent this:
      event.stopPropagation();
      this.formDataObject.zoneList.splice(index, 1);

      const length = this.formDataObject.zoneList.length;
      if (this.currentZoneIndex >= length) {
        this.currentZoneIndex--;
      }
      if (this.currentZoneIndex < 0) {
        this.currentZoneIndex = 0;
      }
    },
    changeRadio(val) {
      console.log("val", val);
    },

    addImage() {
      const originData = {
        zoneStyle: "1", // 专区样式。1：1图1商品，2:1图2商品，3:1图3商品，4:1图4商品。
        imageOne: "", // 从左往右，从上往下，第1张图。
        zoneImageList: [
          // 每一个专区里的图片信息合计。从左往右，从上往下的顺序对应专区格子。
          {
            addType: "1", // 1是添加图片，2是添加商品。
            // zoneImageUrl: '', // 专区的1个格子里的图片地址。
            imageType: "1", // 1、单链接,2、热区
            imageUrl: "", // 显示图片的链接
            imageTitle: "", // 标题
            jumpPageId: "", // 跳转的页面的id，字符串
            jumpPageName: "", // 跳转的页面的名称，字符串
            jumpPageUrl: "", // 跳转的页面的地址，字符串
            jumpPageType: "",
            productList: [
              // 添加商品的商品信息，是个数组，这里是单独上传永远最多是1个。
              // {
              //   id: '', // 商品id，当addType为2的时候，添加的是商品，用这个id跳转。
              //   productIdImageUrl: '', // 商品图片地址，
              // }
            ],
            hotAreaConfigInfoList: [
              // 热区选区信息集合。
              // {
              //   id:'323123', // 随机的不重复id，字符串
              //   top: '0px', // 字符串，带单位px
              //   left: '0px', // 字符串，带单位px
              //   width: '0px', // 字符串，带单位px
              //   height: '0px', // 字符串，带单位px
              //   sort: 4,
              //   jumpPageId: '', // 跳转的页面的id，字符串
              //   jumpPageName: '', // 跳转的页面的名称，字符串
              //   jumpPageType: '' // 页面种类根据后端返回来
              // }
            ],
          },
          {
            addType: "1", // 1是添加图片，2是添加商品。
            imageType: "1", // 1、单链接,2、热区
            imageUrl: "", // 显示图片的链接
            imageTitle: "", // 标题
            jumpPageId: "", // 跳转的页面的id，字符串
            jumpPageName: "", // 跳转的页面的名称，字符串
            jumpPageUrl: "", // 跳转的页面的地址，字符串
            jumpPageType: "",
            productList: [
              // 添加商品的商品信息，是个数组，这里是单独上传永远最多是1个。
              // {
              //   id: '', // 商品id，当addType为2的时候，添加的是商品，用这个id跳转。
              //   productIdImageUrl: '', // 商品图片地址，
              // }
            ],
            hotAreaConfigInfoList: [
              // 热区选区信息集合。
            ],
          },
          {
            addType: "1", // 1是添加图片，2是添加商品。
            // zoneImageUrl: '', // 专区的1个格子里的图片地址。
            imageType: "1", // 1、单链接,2、热区
            imageUrl: "", // 显示图片的链接
            imageTitle: "", // 标题
            jumpPageId: "", // 跳转的页面的id，字符串
            jumpPageName: "", // 跳转的页面的名称，字符串
            jumpPageUrl: "", // 跳转的页面的地址，字符串
            jumpPageType: "",
            productList: [
              // 添加商品的商品信息，是个数组，这里是单独上传永远最多是1个。
              // {
              //   id: '', // 商品id，当addType为2的时候，添加的是商品，用这个id跳转。
              //   productIdImageUrl: '', // 商品图片地址，
              // }
            ],
            hotAreaConfigInfoList: [
              // 热区选区信息集合。
            ],
          },
          {
            addType: "1", // 1是添加图片，2是添加商品。
            // zoneImageUrl: '', // 专区的1个格子里的图片地址。
            imageType: "1", // 1、单链接,2、热区
            imageUrl: "", // 显示图片的链接
            imageTitle: "", // 标题
            jumpPageId: "", // 跳转的页面的id，字符串
            jumpPageName: "", // 跳转的页面的名称，字符串
            jumpPageUrl: "", // 跳转的页面的地址，字符串
            jumpPageType: "",
            productList: [
              // 添加商品的商品信息，是个数组，这里是单独上传永远最多是1个。
              // {
              //   id: '', // 商品id，当addType为2的时候，添加的是商品，用这个id跳转。
              //   productIdImageUrl: '', // 商品图片地址，
              // }
            ],
            hotAreaConfigInfoList: [
              // 热区选区信息集合。
            ],
          },
          {
            addType: "1", // 1是添加图片，2是添加商品。
            // zoneImageUrl: '', // 专区的1个格子里的图片地址。
            imageType: "1", // 1、单链接,2、热区
            imageUrl: "", // 显示图片的链接
            imageTitle: "", // 标题
            jumpPageId: "", // 跳转的页面的id，字符串
            jumpPageName: "", // 跳转的页面的名称，字符串
            jumpPageUrl: "", // 跳转的页面的地址，字符串
            jumpPageType: "",
            productList: [
              // 添加商品的商品信息，是个数组，这里是单独上传永远最多是1个。
              // {
              //   id: '', // 商品id，当addType为2的时候，添加的是商品，用这个id跳转。
              //   productIdImageUrl: '', // 商品图片地址，
              // }
            ],
            hotAreaConfigInfoList: [
              // 热区选区信息集合。
            ],
          },
        ],
      };
      this.formDataObject.zoneList.push(originData);
    },
    // upload (val) {
    // 	// this.visibleModal = false
    // 	this.videoData = val
    // 	if (this.ContentType == 'video') {
    // 		this.$set(this.formDataObject, 'videoUrl', val.fileUrl)
    // 		this.$set(this.formDataObject, 'imgUrl', val.video.coverPicture)
    // 	} else {
    // 		// this.formDataObject.imgUrl = url
    // 		this.$set(this.formDataObject, 'imgUrl', val.fileUrl)
    // 	}
    // },
    seachString() {
      var a = "testsd.cicd.vpclub.cn";
      console.log(a.includes("test"));
    },
    checkActived(a) {
      this.actived = a;
    },
    upload(val) {
      this.visibleModal = false;
      this.videoData = val;
      if (this.ContentType == "video") {
        // this.$set(this.formDataObject, "videoUrl", val.fileUrl);
        // this.$set(this.formDataObject, "imgUrl", val.video.coverPicture);
      } else {
        // this.formDataObject.imgUrl = url
        if (this.tabType == 1) {
          const imgInfo = this.formDataObject.backgroundInfo;
          this.formDataObject.backgroundInfo.imageUrl = val.fileUrl;
          this.$set(this.formDataObject, "backgroundInfo", imgInfo);
        } else {
          const zoneList = this.formDataObject.zoneList;
          zoneList[this.currentZoneIndex].zoneImageList[
            this.currentCellIndex
          ].imageUrl = val.fileUrl;
          this.$set(this.formDataObject, "zoneList", zoneList);
        }
      }
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
          this.checkValue = {
            imgUrl: this.currentSelectedCellImageInfo.imageUrl,
          };
        }
      }
      this.ContentType = a;
      this.fileSize = b;
      this.visibleModal = true;
    },
    // // 关闭上传组件
    // closeInfoModal () {
    // 	// this.visibleModal = false
    // 	this.backgroundLinkPageModalVisible = false
    // },
    // changeCheck (a, b) {
    // 	const { formDataObject } = this
    // 	formDataObject[a] = b
    // },
    // onChangeIcon (e) {
    // 	this.formDataObject.isBtnType = e.target.value
    // 	console.log('radio checked', e.target.value)
    // },

    cellImageAddHotArea(item) {
      if (!item.imageUrl) {
        this.$message.warning("请先上传图片！");
        return false;
      } else {
        // this.currentImageItem = cloneDeep(item)
        // this.currentImageIndex = index
        // this.originImageItem = cloneDeep(item)
        this.cellImageHotAreaShow = true;
        // 移到热区组件内部
        // this.$nextTick((_) => {
        //   this.redrawDiv()
        // })
      }
    },
    cellImageAddLinkPage(item) {
      if (!item.imageUrl) {
        this.$message.warning("请先上传图片！");
        return false;
      } else {
        // 开启产品选择弹窗，以便配置跳转链接
        // this.currentImageItem = item
        this.pageModelId = item.jumpPageId;
        this.pageIndex = item.jumpPageType;
        this.cellImageLinkModalVisible = true;
      }
    },
    cellImageLinkSelectedPage({ id, name, type, url }) {
      console.log("收到的已选择信息为:", id, name, type);
      this.$set(this.currentSelectedCellImageInfo, "jumpPageId", id);
      this.$set(this.currentSelectedCellImageInfo, "jumpPageName", name);
      this.$set(this.currentSelectedCellImageInfo, "jumpPageUrl", url);
      this.$set(this.currentSelectedCellImageInfo, "jumpPageType", type);
      this.cellImageLinkModalVisible = false;
    },

    backgroundAddHotArea(item) {
      if (!item.imageUrl) {
        this.$message.warning("请先上传图片！");
        return false;
      } else {
        // this.currentImageItem = cloneDeep(item)
        // this.currentImageIndex = index
        // this.originImageItem = cloneDeep(item)
        this.backgroundLinkHotAreaShow = true;
        // 移到热区组件内部
        // this.$nextTick((_) => {
        //   this.redrawDiv()
        // })
      }
    },
    backgroundAddLinkPage(item) {
      if (!item.imageUrl) {
        this.$message.warning("请先上传图片！");
        return false;
      } else {
        // 开启产品选择弹窗，以便配置跳转链接
        // this.currentImageItem = item
        this.pageModelId = item.jumpPageId;
        this.pageIndex = item.jumpPageType;
        this.backgroundLinkPageModalVisible = true;
      }
    },
    backgroundLinkSelectedPage({ id, name, type, url }) {
      console.log("收到的已选择信息为:", id, name, type);
      this.$set(this.formDataObject.backgroundInfo, "jumpPageId", id);
      this.$set(this.formDataObject.backgroundInfo, "jumpPageName", name);
      this.$set(this.formDataObject.backgroundInfo, "jumpPageUrl", url);
      this.$set(this.formDataObject.backgroundInfo, "jumpPageType", type);
      this.backgroundLinkPageModalVisible = false;
    },
    // 获得最终图片比例信息
    scaleChange(data) {
      this.formDataObject.maxVideoHeight =
        this.formDataObject.zoneModelType == 0
          ? (375 / data.width) * data.height - 390
          : (375 / data.width) * data.height - 350;
    },
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
    "formDataObject.backgroundInfo.imageUrl": {
      deep: true,
      handler(n, o) {
        console.log(n);
        var img = new Image();
        // 改变图片的src
        img.src = n;
        img.onload = function () {
          console.log("height" + img.height);
        };
      },
    },
  },
};
</script>
<style lang="less" scoped>
@labelColor: #999;
@resultColor: #333;
.scene-zone {
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
            // margin-bottom: 0;
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
  .zone_model {
    .title_wrap {
      margin-bottom: 10px;
      .label {
        margin-right: 20px;
        color: #999;
      }
      .result {
        color: #333;
      }
    }
    // .image_radio_group {
    // }
  }
  .zone_wrap {
    .zone_style {
      .title_wrap {
        margin-bottom: 20px;
        .label {
          margin-right: 20px;
          color: #999;
        }
        .result {
          color: #333;
        }
      }
      // .image_radio_group {
      // }
    }
    .preview_wrap {
      margin: 30px auto;
      background: #ecedfc;
      padding: 10px 10px 0 10px;
      .left {
        background: #f7f8ff;
        margin-bottom: 10px;
        margin-right: 10px;
        .item {
          cursor: pointer;
        }
      }
      .right {
        .item {
          background: #fff;
          margin-bottom: 10px;
          cursor: pointer;
        }
      }
      .active {
        border: 3px solid #016bff;
      }
    }

    .vertical {
      width: 280px;
      height: 360px;
      display: flex;
      .left {
        width: 150px;
        background: #f7f8ff;
        margin-bottom: 10px;
        margin-right: 10px;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        .item {
          cursor: pointer;
        }
      }
      .right {
        width: 100px;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        .item {
          flex: auto;
          background: #fff;
          margin-bottom: 10px;
          cursor: pointer;
        }
      }
    }
    .horizontal {
      width: 320px;
      height: 320px;
      display: flex;
      flex-flow: column nowrap;
      .left {
        width: 300px;
        height: 145px;
        background: #f7f8ff;
        margin-bottom: 10px;
        margin-right: 10px;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        .item {
          cursor: pointer;
        }
      }
      .right {
        // width: 300px;
        height: 145px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        .item {
          flex: 1;
          background: #fff;
          margin-right: 5px;
          cursor: pointer;
        }
      }
      .item:last-child {
        margin-right: 0;
      }
    }

    // .add_type_wrap {
    // }
    .image_upload_wrap {
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
    .product_add_wrap {
      .title {
        margin: 10px 0;
      }
      .add_wrap {
        margin-top: 10px;
        .image_wrap {
          // position: relative;
          .product_image {
            position: relative;
            width: 50px;
            height: 50px;
            .delete_icon {
              position: absolute;
              width: 16px;
              height: 16px;
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
            img {
              width: 100%;
            }
          }
        }
        .btn_add {
          display: inline-block;
          background: #fff;
          width: 50px;
          height: 50px;
          text-align: center;
          // margin: 10px;
          -webkit-box-shadow: 0 0 4px 0;
          box-shadow: 0 0 4px 0;
          .iconfont {
            font-size: 32px;
            color: #016bff;
          }
          // .icon-join {
          // }
        }
      }
    }

    /deep/ .ant-collapse-item {
      &:hover {
        .delete {
          display: inline-block;
        }
      }
    }

    // p {
    // }
    .delete {
      display: none;
      color: #016bff;
      font-size: 12px;
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
    // .text {
    // }
  }
  // .style_wrap {
  //   .line {
  //     .text_wrap {
  //       .label {
  //       }
  //       .result {
  //       }
  //     }
  //     .image_type_choose {
  //     }
  //   }
  //   .line {
  //     .text_wrap {
  //       .label {
  //       }
  //       .result {
  //       }
  //     }
  //   }
  //   .line {
  //     .text_wrap {
  //       .label {
  //       }
  //       .result {
  //       }
  //     }
  //   }
  //   .line {
  //     .text_wrap {
  //       .label {
  //       }
  //     }
  //     .slider {
  //     }
  //   }
  // }
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

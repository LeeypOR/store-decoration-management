<template>
  <div class="title-text-form">
    <div class="title_nav">
      <a-tabs
        :default-active-key="formDataObject.shopListType"
        @change="changeTabs"
      >
        <a-tab-pane :key="1" tab="基础设置">
          <div class="from_seaction">
            <div>
              <!-- <div>
                <span>*</span>
                <span>添加商品</span>
              </div> -->
              <div>
                <div class="add_icon">
                  <div
                    class="image_add_wrap"
                    v-for="(l, i) in formDataObject.shopList"
                    :key="i"
                  >
                    <img
                      class="delete_icon"
                      @click="deleteShopInfo(l, i)"
                      src="~@images/shop/icon_middle_modalbox_delete_s.png"
                      alt
                    />
                    <div class="shopImg">
                      <div class="left">
                        <div class="activeName" @click="openModalAdd">
                          {{ l.activityName }}，点击重新选择
                        </div>
                        <div>
                          <span class="goodsNum"
                            >共{{ l.goodsCount }}个商品</span
                          >
                          <span class="details" @click="goodsList(l)"
                            >查看详情</span
                          >
                        </div>
                      </div>
                      <div class="right">
                        活动{{ i + 1 > 9 ? i + 1 : "0" + (i + 1) }}
                      </div>
                    </div>
                  </div>
                  <a-button
                    type="primary"
                    ghost
                    class="btn_add"
                    @click="openModalAdd"
                  >
                    添加秒杀活动
                  </a-button>
                  <!-- <div class="btn_add"  @click="openModalAdd">添加秒杀活动</div> -->
                </div>
              </div>
            </div>
          </div>
          <div class="from_seaction">
            <a-divider />
            <div>
              <div class="listStyle">
                <span>列表样式</span>
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
                    class="iconfont icon-icon_right_attributebar_dtms_default"
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
                    class="iconfont icon-icon_right_attributebar_yhlt_default"
                  ></span>
                </div>
              </div>
            </div>
            <a-divider />
            <div class="form_data">
              <div class="disFlex">
                <span>
                  <span class="one">商品样式</span>
                  <span class="two">
                    {{
                      formDataObject.shopType == "0" ? "无边白底" : "卡片投影"
                    }}
                  </span>
                </span>
                <span>
                  <span
                    :class="[
                      'icon_btn wth100',
                      formDataObject.shopType == '0' ? 'icon_btn_check' : '',
                    ]"
                    @click="changeCheck('shopType', '0')"
                    >无边白底</span
                  >
                  <span
                    :class="[
                      'icon_btn wth100',
                      formDataObject.shopType == '1' ? 'icon_btn_check' : '',
                    ]"
                    @click="changeCheck('shopType', '1')"
                    >卡片投影</span
                  >
                </span>
              </div>
              <div class="disFlex margT10">
                <span>
                  <span class="one">商品倒角</span>
                  <span class="two">
                    {{ formDataObject.angleType == "0" ? "直角" : "圆角" }}
                  </span>
                </span>
                <span>
                  <span
                    :class="[
                      'icon_btn iconfont icon-icon_right_attributebar_zhijiao_default',
                      formDataObject.angleType == '0' ? 'icon_btn_check' : '',
                    ]"
                    @click="changeCheck('angleType', '0')"
                  ></span>
                  <span
                    :class="[
                      'icon_btn iconfont icon-icon_right_attributebar_yuanjiao_default',
                      formDataObject.angleType == '1' ? 'icon_btn_check' : '',
                    ]"
                    @click="changeCheck('angleType', '1')"
                  ></span>
                </span>
              </div>
              <div class="disFlex margT10">
                <span>
                  <span class="one">图片比例</span>
                  <span class="two">
                    {{ formDataObject.imgScale | scaleFilter }}
                  </span>
                </span>
                <span>
                  <span
                    :class="[
                      'icon_btn iconfont icon-a-icon_right_attributebar_img32_default',
                      formDataObject.imgScale == '0' ? 'icon_btn_check' : '',
                    ]"
                    @click="changeCheck('imgScale', '0')"
                    v-show="formDataObject.listStyle == 0"
                  ></span>
                  <span
                    :class="[
                      'icon_btn iconfont icon-a-icon_right_attributebar_img11_default',
                      formDataObject.imgScale == '1' ? 'icon_btn_check' : '',
                    ]"
                    @click="changeCheck('imgScale', '1')"
                  ></span>
                  <span
                    :class="[
                      'icon_btn iconfont icon-a-icon_right_attributebar_img34_default',
                      formDataObject.imgScale == '2' ? 'icon_btn_check' : '',
                    ]"
                    @click="changeCheck('imgScale', '2')"
                    v-show="formDataObject.listStyle == 0"
                  ></span>
                  <span
                    :class="[
                      'icon_btn iconfont icon-a-icon_right_attributebar_img169_default',
                      formDataObject.imgScale == '3' ? 'icon_btn_check' : '',
                    ]"
                    @click="changeCheck('imgScale', '3')"
                    v-show="formDataObject.listStyle == 0"
                  ></span>
                </span>
              </div>
              <div class="disFlex margT10">
                <span>
                  <span class="one">图片填充</span>
                  <span class="two">
                    {{ formDataObject.imgFill == "0" ? "填充" : "无边白底" }}
                  </span>
                </span>
                <span>
                  <span
                    :class="[
                      'icon_btn wth100',
                      formDataObject.imgFill == '0' ? 'icon_btn_check' : '',
                    ]"
                    @click="changeCheck('imgFill', '0')"
                    >填充</span
                  >
                  <span
                    :class="[
                      'icon_btn wth100',
                      formDataObject.imgFill == '1' ? 'icon_btn_check' : '',
                    ]"
                    @click="changeCheck('imgFill', '1')"
                    v-show="formDataObject.listStyle != '1'"
                    >周边留白</span
                  >
                </span>
              </div>
              <div class="disFlex margT10">
                <span>
                  <span class="one">文本样式</span>
                  <span class="two">
                    {{
                      formDataObject.titleThickness == "normal"
                        ? "常规体"
                        : "加粗体"
                    }}
                  </span>
                </span>
                <span>
                  <span
                    :class="[
                      'iconfont icon-icon_right_attributebar_wzdh_default icon_btn',
                      formDataObject.titleThickness == 'normal'
                        ? 'icon_btn_check'
                        : '',
                    ]"
                    @click="changeCheck('titleThickness', 'normal')"
                  ></span>
                  <span
                    :class="[
                      'iconfont icon-icon_right_attributebar_wzdh_default icon_btn fontBold',
                      formDataObject.titleThickness == 'bold'
                        ? 'icon_btn_check'
                        : '',
                    ]"
                    @click="changeCheck('titleThickness', 'bold')"
                  ></span>
                </span>
              </div>
              <div class="line">
                <div class="text_wrap">
                  <div class="label">页面边距</div>
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

              <div class="line">
                <div class="text_wrap">
                  <div class="label">商品间距</div>
                </div>
                <a-slider
                  class="slider"
                  v-model="formDataObject.imagePadding"
                  :max="30"
                  style="width: 120px"
                />
                <a-input-number
                  v-model="formDataObject.imagePadding"
                  :max="30"
                  style="marginleft: 16px"
                />
              </div>
            </div>
            <a-divider />
            <div>
              <div class="disFlex">
                <span>
                  <span class="one">商品名称</span>
                  <span class="two">
                    {{ formDataObject.shopName ? "显示" : "不显示" }}
                  </span>
                </span>
                <span class="check_radio">
                  <span
                    class="_check"
                    @click="changeCheck('shopName', true)"
                    v-if="!formDataObject.shopName"
                  ></span>
                  <span
                    class="iconfont icon-Checkbox"
                    v-else
                    @click="changeCheck('shopName', false)"
                  ></span>
                </span>
              </div>
              <div class="disFlex margT10">
                <span>
                  <span class="one">商品描述</span>
                  <span class="two">
                    {{ formDataObject.shopDescription ? "显示" : "不显示" }}
                  </span>
                </span>
                <span class="check_radio">
                  <span
                    class="_check"
                    @click="changeCheck('shopDescription', true)"
                    v-if="!formDataObject.shopDescription"
                  ></span>
                  <span
                    class="iconfont icon-Checkbox"
                    v-else
                    @click="changeCheck('shopDescription', false)"
                  ></span>
                </span>
              </div>
              <div class="disFlex margT10">
                <span>
                  <span class="one">商品价格</span>
                  <span class="two">
                    {{ formDataObject.seckillPrices ? "显示" : "不显示" }}
                  </span>
                </span>
                <span class="check_radio">
                  <span
                    class="_check"
                    @click="changeCheck('seckillPrices', true)"
                    v-if="!formDataObject.seckillPrices"
                  ></span>
                  <span
                    class="iconfont icon-Checkbox"
                    v-else
                    @click="changeCheck('seckillPrices', false)"
                  ></span>
                </span>
              </div>
              <div class="disFlex margT10">
                <span>
                  <span class="one">商品原价</span>
                  <span class="two">
                    {{ formDataObject.oldPrices ? "显示" : "不显示" }}
                  </span>
                </span>
                <span class="check_radio">
                  <span
                    class="_check"
                    @click="changeCheck('oldPrices', true)"
                    v-if="!formDataObject.oldPrices"
                  ></span>
                  <span
                    class="iconfont icon-Checkbox"
                    v-else
                    @click="changeCheck('oldPrices', false)"
                  ></span>
                </span>
              </div>
              <div class="disFlex margT10">
                <span>
                  <span class="one">剩余库存</span>
                  <span class="two">
                    {{ formDataObject.inventory ? "显示" : "不显示" }}
                  </span>
                </span>
                <span class="check_radio">
                  <span
                    class="_check"
                    @click="changeCheck('inventory', true)"
                    v-if="!formDataObject.inventory"
                  ></span>
                  <span
                    class="iconfont icon-Checkbox"
                    v-else
                    @click="changeCheck('inventory', false)"
                  ></span>
                </span>
              </div>
              <div class="disFlex margT10">
                <span>
                  <span class="one">购买按钮</span>
                  <span class="two">
                    {{ formDataObject.shopBuyBtn ? "显示" : "不显示" }}
                  </span>
                </span>
                <span class="check_radio">
                  <span
                    class="_check"
                    @click="changeCheck('shopBuyBtn', true)"
                    v-if="!formDataObject.shopBuyBtn"
                  ></span>
                  <span
                    class="iconfont icon-Checkbox"
                    v-else
                    @click="changeCheck('shopBuyBtn', false)"
                  ></span>
                </span>
              </div>
              <div v-if="formDataObject.shopBuyBtn" class="margT10">
                <a-radio-group
                  name="radioGroup"
                  :default-value="formDataObject.btnType"
                  @change="changeBtnType"
                >
                  <a-radio :value="1">样式一</a-radio>
                  <a-radio :value="2">样式二</a-radio>
                </a-radio-group>
              </div>
              <div
                style="display: flex; align-items: center"
                class="margT10"
                v-show="formDataObject.btnType == 2"
              >
                <div
                  style="position: relative; display: flex; align-items: center"
                >
                  <div style="font-size: 21px; margin: 4px 4px 0 0; color: red">
                    *
                  </div>
                  <a-input
                    placeholder="请输入提示语"
                    :style="{
                      width: '150px',
                      border: !formDataObject.shopBtnText
                        ? '1px solid red'
                        : '',
                    }"
                    :max-length="4"
                    v-model="formDataObject.shopBtnText"
                  />
                  <span class="limitWords"
                    >{{ formDataObject.shopBtnText.length || 0 }}/4</span
                  >
                </div>
                <div class="btnTextStyle">提示：样式提示语</div>
              </div>
              <div class="disFlex margT10">
                <span>
                  <span class="one">抢购进度条</span>
                  <span class="two">
                    {{ formDataObject.progressBar ? "显示" : "不显示" }}
                  </span>
                </span>
                <span class="check_radio">
                  <span
                    class="_check"
                    @click="changeCheck('progressBar', true)"
                    v-if="!formDataObject.progressBar"
                  ></span>
                  <span
                    class="iconfont icon-Checkbox"
                    v-else
                    @click="changeCheck('progressBar', false)"
                  ></span>
                </span>
              </div>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane :key="2" tab="高级设置" force-render>
          <div class="from_seaction">
            <div class="disFlex margT10">
              <span>
                <span class="one">抢购倒计时</span>
                <span class="two">
                  {{ formDataObject.countdownShow ? "显示" : "不显示" }}
                </span>
              </span>
              <span class="check_radio">
                <span
                  class="_check"
                  @click="changeCheck('countdownShow', true)"
                  v-if="!formDataObject.countdownShow"
                ></span>
                <span
                  class="iconfont icon-Checkbox"
                  v-else
                  @click="changeCheck('countdownShow', false)"
                ></span>
              </span>
            </div>
            <div
              style="background: #fafafa; padding: 8px"
              v-show="formDataObject.countdownShow"
            >
              <div class="disFlex margT10">
                <span class="one">展示样式</span>
                <div>
                  <a-radio-group v-model="formDataObject.showType">
                    <a-radio :value="0" style="margin-right: 20px">
                      系统样式
                    </a-radio>
                    <a-radio :value="1" style="margin-right: 10px">
                      自定义</a-radio
                    >
                  </a-radio-group>
                </div>
              </div>
              <div style="padding: 10px; background: #fff; margin-top: 10px">
                <div
                  class="disFlex margT10"
                  v-show="formDataObject.showType == 0"
                >
                  <span>
                    <span class="one">背景色</span>
                    <span class="two">
                      {{ formDataObject.systembgColor }}
                    </span>
                  </span>
                  <div class="colorBox">
                    <span class="reset_color" @click="resetColor">重置</span>
                    <a-input
                      class="color_select"
                      type="color"
                      v-model="formDataObject.systembgColor"
                      @change="setBgColor"
                    />
                  </div>
                </div>
                <div
                  class="disFlex margT10"
                  v-show="formDataObject.showType == 1"
                >
                  <!-- <ImageUpload
                    class="upload_wrap"
                    v-model="formDataObject.backgroundImgUrl"
                    uploadText="上传图片"
                  ></ImageUpload> -->
                  <div
                    v-if="formDataObject.backgroundImgUrl"
                    @click="openUpload('image', formDataObject)"
                    class="upload_wrap"
                    :style="{
                      background: `url(${formDataObject.backgroundImgUrl}) no-repeat 50% 50%/cover`,
                    }"
                  >
                    <p class="updateImg">更换图片</p>
                  </div>
                  <div
                    v-else
                    class="upload_wrap uploadBox"
                    @click="openUpload('image', formDataObject)"
                  >
                    <a-icon type="plus" />
                    <p>上传图片</p>
                  </div>
                </div>
                <div class="adviceText" v-show="formDataObject.showType == 1">
                  建议尺寸为750*88px，格式为png
                </div>
                <div
                  class="disFlex margT10"
                  v-show="formDataObject.showType == 0"
                >
                  <span>
                    <span class="one">描边色</span>
                    <span class="two">
                      {{ formDataObject.systemborderColor }}
                    </span>
                  </span>
                  <div class="colorBox">
                    <span class="reset_color" @click="resetBorderColor"
                      >重置</span
                    >
                    <a-input
                      class="color_select"
                      type="color"
                      v-model="formDataObject.systemborderColor"
                      @change="setBorderColor"
                    />
                  </div>
                </div>
                <div
                  class="disFlex margT10"
                  v-show="formDataObject.showType == 0"
                >
                  <span class="one">外观样式</span>
                  <div>
                    <a-radio-group
                      v-model="formDataObject.appearanceStyle"
                      @change="changeColor"
                    >
                      <a-radio :value="1" style="margin-right: 20px">
                        样式一
                      </a-radio>
                      <a-radio :value="2" style="margin-right: 10px">
                        样式二</a-radio
                      >
                    </a-radio-group>
                  </div>
                </div>
                <div class="line">
                  <div class="text_wrap">
                    <div class="label">透明度</div>
                  </div>
                  <a-slider
                    class="slider"
                    v-model="formDataObject.transparency"
                    :max="100"
                    style="width: 120px"
                  />
                  <a-input-number
                    v-model="formDataObject.transparency"
                    :max="100"
                    style="marginleft: 16px"
                  />
                </div>
                <div class="line">
                  <div class="text_wrap">
                    <div class="label">描边宽度</div>
                  </div>
                  <a-slider
                    class="slider"
                    v-model="formDataObject.strokeSize"
                    :max="12"
                    style="width: 120px"
                  />
                  <a-input-number
                    v-model="formDataObject.strokeSize"
                    :max="12"
                    style="marginleft: 16px"
                  />
                </div>
              </div>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
    <ShopModal
      :list="openlist"
      :record="currentRecord"
      @cancel="closeInfoModal"
      @confirm="selectedPage"
      :visible="pageModalVisible"
      :tabType="tabType"
      :groupActive="false"
      :spellType="formDataObject.spellType | dealSpellType"
      modeltitle="秒杀活动列表"
      groupType="2"
    ></ShopModal>

    <video-modal
      :visible="visibleModal"
      @cancel="closeInfoModal"
      :ContentType="ContentType"
      @upload="upload"
      :videoData="videoData"
    ></video-modal>
    <ShopModal
      :list="openlist"
      :record="currentRecord"
      @cancel="closeInfoModal1"
      @confirm="closeInfoModal1"
      :visible="pageModalVisible1"
      :tabType="tabType"
      :groupActive="false"
      :spellType="formDataObject.spellType | dealSpellType"
      modeltitle="查看详情"
      groupType="3"
      :activityId="activityId"
    ></ShopModal>
  </div>
</template>
<script>
import ShopModal from "@/components/ShopList/ShopModalList";
import videoModal from "@/components/antBase/videoModal";
import ImageUpload from "@components/antBase/ImageUpload";
import { cloneDeep } from "lodash";
export default {
  name: "MySeckillForm",
  components: {
    ShopModal,
    ImageUpload,
    videoModal,
  },
  filters: {
    jumpLinkTextFilter(item) {
      if (item.jumpPageId) {
        return item.jumpPageName;
      }
      // r
      return "点击选择跳转到的页面";
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
          return "大图模式";
        case "1":
          return "详情列表";
        default:
          return "";
      }
    },
    dealSpellType(item) {
      switch (item) {
        case 1:
          return "1";
        case 2:
          return "2";
        default:
          return "";
      }
    },
  },
  props: {
    // 传入的原始数据
    formData: {},
  },
  created() {
    this.formDataObject = cloneDeep(this.formData);
    console.log(this.formDataObject);
  },
  data() {
    return {
      timer: null,
      openlist: [],
      tabType: 1,
      pageModalVisible: false,
      pageModalVisible1: false,
      currentRecord: {},
      formDataObject: {},
      activityId: "",
      tabIndex: 0,
      visibleModal: false,
      ContentType: "image",
      videoData: {},
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
        this.$set(this.formDataObject, "backgroundImgUrl", val.fileUrl);
      }
    },
    // 打开上传组件
    openUpload(a, item) {
      if (a == "video") {
        // this.checkValue = { videoUrl: item.videoUrl };
      } else {
        this.checkValue = { imgUrl: item.backgroundImgUrl };
      }
      this.ContentType = a;
      this.visibleModal = true;
    },
    changeTabs(e) {
      console.log("change", e);
      this.tabType = parseInt(e);
      this.formDataObject.shopListType = parseInt(e);
    },
    changeCheck(a, b) {
      // const { formDataObject } = this;
      // formDataObject[a] = b;
      this.$set(this.formDataObject, a, b);
    },
    onChange(e) {
      console.log("radio checked", e.target.value);
    },
    // addLinkPage (item) {
    //   // 开启产品选择弹窗，以便配置跳转链接
    //   // this.currentImageItem = item
    //   this.pageModalVisible = true
    // },
    selectedPage(val) {
      if (this.tabType === 1) {
        this.formDataObject.shopList.forEach((item, index) => {
          if (item.active) {
            this.tabIndex = index;
          }
        });
        this.formDataObject.shopList = [];
        this.formDataObject.imageList = [];
        const tempPromiseList = [];
        val.map((item, index) => {
          this.formDataObject.shopList.push({
            id: item.id,
            activityName: item.activityName,
            activityTime: item.activityTime,
            endDate: item.endDate,
            startDate: item.startDate,
            goodsCount: item.goodsCount,
            active: index == this.tabIndex ? true : false,
          });
          const p = this.$get("goldenhome/seckill/admin_/seckill/goods/list", {
            activityId: item.id,
          });
          tempPromiseList.push(p);
        });
        Promise.all(tempPromiseList).then((res) => {
          res.forEach((item) => {
            this.formDataObject.imageList.push(item.dataInfo);
          });
        });
      }
      this.pageModalVisible = false;
    },
    closeInfoModal(type) {
      this.pageModalVisible = false;
      this.visibleModal = false;
    },
    closeInfoModal1() {
      this.pageModalVisible1 = false;
    },
    deleteImageInfo(index) {
      this.formDataObject.imageList.splice(index, 1);
    },
    deleteShopInfo(l, i) {
      this.formDataObject.shopList.splice(i, 1);
      this.formDataObject.imageList.splice(i, 1);
      let num = 0;
      this.formDataObject.shopList.forEach((item) => {
        if (item.active) {
          num++;
        }
      });
      if (num == 0 && this.formDataObject.shopList.length > 0) {
        this.formDataObject.shopList[0].active = true;
      }
      // let arr = [];
      // this.formDataObject.imageList.forEach((item, index) => {
      //   if (item.activityId != l.id) {
      //     arr.push(item);
      //   }
      // });
      // this.formDataObject.imageList = arr;
    },
    addImage() {
      if (this.formDataObject.shopList.length >= 15) {
        this.$message.warning("最多添加15个分组");
        return false;
      }
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
        this.openlist = this.formDataObject.shopList;
      }
      this.pageModalVisible = true;
    },
    goodsList(l) {
      this.activityId = l.id;
      this.pageModalVisible1 = true;
    },
    changeBadge(e) {
      // this.formDataObject.badgeType=e.target.value;
      this.$set(this.formDataObject, "badgeType", e.target.value);
    },
    changeBtnType(e) {
      this.$set(this.formDataObject, "btnType", e.target.value);
    },
    changeShopShow(e) {
      console.log("this.showAllShop", e.target.value);
      this.$set(this.formDataObject, "showAllShop", e.target.value);
    },
    resetColor() {
      // this.formDataObject.bgColorValue = "#ffffff";
      this.$set(this.formDataObject, "systembgColor", "#D1B085");
    },
    setBgColor(e) {
      // this.formDataObject.bgColorValue = e.target.value;
      this.$set(this.formDataObject, "systembgColor", e.target.value);
    },
    resetBorderColor() {
      this.$set(this.formDataObject, "systemborderColor", "#D1B085");
    },
    setBorderColor(e) {
      // this.formDataObject.bgColorValue = e.target.value;
      this.$set(this.formDataObject, "systemborderColor", e.target.value);
    },
    changeColor(e) {
      if (this.formDataObject.showType == 0) {
        if (e.target.value == 1) {
          this.$set(this.formDataObject, "systembgColor", "#D1B085");
          this.$set(this.formDataObject, "systemborderColor", "#D1B085");
        }
        if (e.target.value == 2) {
          this.$set(this.formDataObject, "systembgColor", "#3B414D");
          this.$set(this.formDataObject, "systemborderColor", "#3B414D");
        }
      }
    },
    spellTypeChange() {
      this.$set(this.formDataObject, "imageList", []);
    },
  },
  watch: {
    formDataObject: {
      handler(n, o) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        if (n.listStyle == 1) {
          this.formDataObject.imgScale = "1";
          this.formDataObject.imgFill = "0";
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
.add_icon {
  width: 100%;
  // height: 80px;
  background: #fafafa;
  border-radius: 2px;
  overflow-x: hidden;
  overflow-y: scroll;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  // padding:10px;
}

.TreeAdd {
  width: 100%;
  height: 160px;
  background: #fafafa;
  border-radius: 2px;
  overflow-x: hidden;
  overflow-y: scroll;
  // display: flex;
  // justify-content: flex-start;
  // flex-wrap: wrap;
  // align-items: center;
}
// .add_icon::-webkit-scrollbar {
//   display: none;
// }
.btn_add {
  // display: inline-block;
  background: #fff;
  width: 100%;
  height: 46px;
  line-height: 46px;
  text-align: center;
  margin: 10px;
  box-shadow: 0 0 3px 0;
  background: #ffffff;
  border-radius: 2px;
  border: 1px solid #016bff;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #016bff;
  cursor: pointer;
}
.form_data {
  .iconfont {
    font-size: 24px;
  }
}
.line {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
      // padding:10px;
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
    font-size: 32px;
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
  // min-width: 100px;
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
  width: 100%;
  height: 68px;
  background: #ffffff;
  border-radius: 2px;
  border: 1px solid #e6e6e6;
  .shopImg {
    width: 100%;
    height: 68px;
    padding: 12px;
    box-sizing: border-box;
    display: flex;
    .left {
      flex-grow: 1;
      .activeName {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #016bff;
        cursor: pointer;
        white-space: nowrap;
      }
      .goodsNum {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        margin-right: 10px;
      }
      .details {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        cursor: pointer;
        color: #016bff;
      }
    }
    .right {
      width: 20%;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
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
  .image_type_choose {
  }
  .image_info_wrap {
    margin-top: 13px;
    display: flex;
    .upload_wrap {
    }
    /deep/ .upload_wrap {
      /deep/.avatar-uploader .ant-upload {
        width: 70px !important;
        height: 70px !important;
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
      display: flex;
      flex-direction: column;
      justify-content: space-between;
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
    .title_add {
    }
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
.flex {
  display: flex;
  justify-content: space-between;
}
.colorBox {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  min-width: 100px;
  .reset_color {
    flex-shrink: 0;
    margin-right: 8px;
    font-family: Helvetica;
    color: #016bff !important;
    cursor: pointer;
  }
}
.adviceText {
  font-size: 12px;
  font-family: MicrosoftYaHei;
  color: #666666;
  line-height: 16px;
  margin-bottom: 20px;
}
.limitWords {
  position: absolute;
  right: 5px;
  top: 7px;
  font-size: 10px;
  color: #eee;
}
.btnTextStyle {
  display: inline-block;
  margin-left: 20px;
  color: #999;
}
.image_add_wrap:hover {
  border: 1px solid #016bff;
  background: #f2f8ff;
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

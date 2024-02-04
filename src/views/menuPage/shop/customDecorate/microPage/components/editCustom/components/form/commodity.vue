<template>
  <div class="title-text-form">
    <div class="title_nav">
      <a-tabs
        :default-active-key="formDataObject.shopListType"
        @change="changeTabs"
      >
        <a-tab-pane :key="1" tab="商品">
          <div class="from_seaction">
            <div>
              <div>
                <span>*</span>
                <span>添加商品</span>
              </div>
              <div>
                <div class="add_icon" v-if="formDataObject.checkType == '1'">
                  <!-- <div class="btn_add">
                    <span class="iconfont icon-join"></span>
                  </div>
                  <div class="btn_add">
                    <span class="iconfont icon-join"></span>
                  </div>-->
                  <draggable class="dragBox" :list="formDataObject.imageList">
                    <div
                      v-for="(item, i) of formDataObject.imageList"
                      :key="i"
                      class="image_add_wrap"
                    >
                      <img
                        class="delete_icon"
                        @click="deleteImageInfo(i)"
                        src="~@images/shop/icon_middle_modalbox_delete_s.png"
                        alt
                      />
                      <div
                        class="shopImg"
                        :style="{
                          background: `url(${item.goodsPicture}) no-repeat 50% 50% /cover`,
                        }"
                      >
                        <!-- <img :src="item.goodsPicture" alt /> -->
                      </div>
                    </div>
                  </draggable>
                  <!-- <div class="btn_add" @click="openModalAdd">
                    <span class="iconfont icon-join"></span>
                  </div> -->
                </div>
                <div v-else>
                  <div>
                    <div class="TreeAdd">
                      <!-- <div class="btn_add">
                    <span class="iconfont icon-join"></span>
                  </div>
                  <div class="btn_add">
                    <span class="iconfont icon-join"></span>
                      </div>-->
                      <div
                        v-for="(item, i) of formDataObject.imageList"
                        :key="i"
                        class="image_add_wrap"
                      >
                        <div class="treeList">
                          <img
                            class="delete_icon"
                            @click="deleteShopInfos(i)"
                            src="~@images/shop/icon_middle_modalbox_delete_s.png"
                            alt
                          />
                          <div class="title_add">
                            <span>商品分组:</span>
                            <span>{{ item.goodsName }}</span>
                          </div>
                          <!-- <div class="seaction_add">
                            <span>商品名称:</span>
                            <span>
                              <a-input v-model="item.groupTableName"></a-input>
                            </span>
                          </div> -->
                          <!-- <div class="footer_add">
                            <span>显示个数:</span>
                            <span>
                              <a-radio-group name="radioGroup" :default-value="item.showAllShop" v-model="item.showAllShop" @change="changeShopShow">
                                <a-radio :value="false">
                                  <a-input-number id="inputNumber" v-model="item.shopNumber" :min="4" :max="100" />
                                </a-radio>
                                <a-radio :value="true">全部</a-radio>
                              </a-radio-group>
                            </span>
                          </div> -->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="add_btn" @click="openModalAdd">
                  <img
                    class="icon_add"
                    src="~@images/shop/icon_right_attributebar_jiahao.png"
                  />
                  <span class="text">添加商品</span>
                </div>
              </div>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane :key="2" tab="商品分组" force-render>
          <div class="from_seaction">
            <div>
              <div>
                <span>*</span>
                <span>添加商品分组</span>
              </div>
              <div>
                <div class="TreeAdd">
                  <!-- <div class="btn_add">
                    <span class="iconfont icon-join"></span>
                  </div>
                  <div class="btn_add">
                    <span class="iconfont icon-join"></span>
                  </div>-->
                  <div
                    v-for="(item, i) of formDataObject.shopList"
                    :key="i"
                    class="image_add_wrap"
                  >
                    <div class="treeList">
                      <img
                        class="delete_icon"
                        @click="deleteShopInfo(i)"
                        src="~@images/shop/icon_middle_modalbox_delete_s.png"
                        alt
                      />
                      <div class="title_add">
                        <span>商品来源:</span>
                        <span>{{ item.groupName }}</span>
                      </div>
                      <div class="seaction_add">
                        <span>商品名称:</span>
                        <span>
                          <a-input v-model="item.groupTableName"></a-input>
                        </span>
                      </div>
                      <div class="footer_add">
                        <span>显示个数:</span>
                        <span>
                          <a-radio-group
                            name="radioGroup"
                            :default-value="item.showAllShop"
                            v-model="item.showAllShop"
                            @change="changeShopShow"
                          >
                            <a-radio :value="false">
                              <a-input-number
                                id="inputNumber"
                                v-model="item.shopNumber"
                                :min="4"
                                :max="100"
                              />
                            </a-radio>
                            <a-radio :value="true">全部</a-radio>
                          </a-radio-group>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="add_btn" @click="addImage">
                <img
                  class="icon_add"
                  src="~@images/shop/icon_right_attributebar_jiahao.png"
                />
                <span class="text">添加商品分组</span>
              </div>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
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
            <div
              @click="changeCheck('listStyle', '2')"
              :class="[
                'listCheck',
                formDataObject.listStyle == '2' ? 'icon_btn_check' : '',
              ]"
            >
              <span
                class="iconfont icon-icon_right_attributebar_yhsg_default"
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
                class="iconfont icon-icon_right_attributebar_yhsg_default"
              ></span>
            </div>
            <div
              @click="changeListCheck"
              :class="[
                'listCheck',
                formDataObject.listStyle == '4' ? 'icon_btn_check' : '',
              ]"
            >
              <span
                class="iconfont icon-icon_right_attributebar_ztyw_default"
                style="font-size: 22px"
              ></span>
            </div>
            <div
              @click="changeListCheck5"
              :class="[
                'listCheck',
                formDataObject.listStyle == '5' ? 'icon_btn_check' : '',
              ]"
            >
              <span
                class="
                  iconfont
                  icon-icon_right_attributebar_zbyangshisan_default
                "
              ></span>
            </div>
          </div>
        </div>
        <a-divider />
        <div class="form_data">
          <div class="disFlex">
            <span>
              <span class="one">商品样式</span>
              <span class="two">{{
                formDataObject.shopType == "0" ? "无边白底" : "卡片投影"
              }}</span>
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
              <span class="two">{{
                formDataObject.angleType == "0" ? "直角" : "圆角"
              }}</span>
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
          <!-- <div class="disFlex margT10" v-if="formDataObject.angleType == '1'">
            <span>
              <span class="one">倒角数量</span>
              <span class="two">{{
                formDataObject.angleNum == "1" ? "2个" : "4个"
              }}</span>
            </span>
            <span>
              <a-radio-group
                name="radioGroup"
                :default-value="formDataObject.angleNum"
                @change="changeAngleNum"
              >
                <a-radio :value="1">2个</a-radio>
                <a-radio :value="2">4个</a-radio>
              </a-radio-group>
            </span>
          </div> -->
          <div class="disFlex margT10">
            <span>
              <span class="one">图片比例</span>
              <span class="two">{{
                formDataObject.imgScale | scaleFilter
              }}</span>
            </span>
            <span>
              <span
                :class="[
                  'icon_btn iconfont icon-a-icon_right_attributebar_img32_default',
                  formDataObject.imgScale == '0' ? 'icon_btn_check' : '',
                ]"
                @click="changeCheck('imgScale', '0')"
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
              ></span>
              <span
                :class="[
                  'icon_btn iconfont icon-a-icon_right_attributebar_img169_default',
                  formDataObject.imgScale == '3' ? 'icon_btn_check' : '',
                ]"
                @click="changeCheck('imgScale', '3')"
              ></span>
            </span>
          </div>
          <div class="disFlex margT10">
            <span>
              <span class="one">图片填充</span>
              <span class="two">{{
                formDataObject.imgFill == "0" ? "填充" : "无边白底"
              }}</span>
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
                v-if="formDataObject.listStyle != 5"
                >周边留白</span
              >
            </span>
          </div>
          <!-- <div class="disFlex margT10">
                <span>
                  <span class="one">显示位置</span>
                  <span class="two">{{formDataObject.textAlign=='left'?'居左显示':'居中显示'}}</span>
                </span>
                <span>
                  <span :class="['iconfont', 'icon-icon_right_attributebar_wzjz_selected icon_btn',formDataObject.textAlign=='left'?'icon_btn_check':'']" @click="changeCheck('textAlign','left')"></span>
                  <span :class="['iconfont icon-icon_right_attributebar_wzjz_default icon_btn',formDataObject.textAlign=='right'?'icon_btn_check':'']" @click="changeCheck('textAlign','right')"></span>
                </span>
          </div>-->
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
              <span class="two">{{
                formDataObject.shopName ? "显示" : "不显示"
              }}</span>
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
              <span class="two">{{
                formDataObject.shopDescription ? "显示" : "不显示"
              }}</span>
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
              <span class="two">{{
                formDataObject.shopPrices ? "显示" : "不显示"
              }}</span>
            </span>
            <span class="check_radio">
              <span
                class="_check"
                @click="changeCheck('shopPrices', true)"
                v-if="!formDataObject.shopPrices"
              ></span>
              <span
                class="iconfont icon-Checkbox"
                v-else
                @click="changeCheck('shopPrices', false)"
              ></span>
            </span>
          </div>
          <div
            class="disFlex margT10"
            v-if="formDataObject.shopPrices && formDataObject.marketPrice"
          >
            <span>
              <span class="one">划线价格</span>
              <span class="two">{{
                formDataObject.marketPrice ? "显示" : "不显示"
              }}</span>
            </span>
            <span class="check_radio">
              <span
                class="_check"
                @click="changeCheck('marketPrice', true)"
                v-if="!formDataObject.marketPrice"
              ></span>
              <span
                class="iconfont icon-Checkbox"
                v-else
                @click="changeCheck('marketPrice', false)"
              ></span>
            </span>
          </div>
          <div class="disFlex margT10">
            <span>
              <span class="one">商品销量</span>
              <span class="two">{{
                formDataObject.shopOriginalPrices
                  ? "显示"
                  : formDataObject.listStyle == 4
                  ? "该样式下不支持该功能显示"
                  : "不显示"
              }}</span>
            </span>
            <span class="check_radio" v-if="formDataObject.listStyle != 4">
              <span
                class="_check"
                @click="changeCheck('shopOriginalPrices', true)"
                v-if="!formDataObject.shopOriginalPrices"
              ></span>
              <span
                class="iconfont icon-Checkbox"
                v-else
                @click="changeCheck('shopOriginalPrices', false)"
              ></span>
            </span>
            <span class="check_radio" v-else>
              <span class="_check disabledspan"></span>
            </span>
          </div>
          <div class="disFlex margT10">
            <span>
              <span class="one">购买按钮</span>
              <span class="two">{{
                formDataObject.shopBuyBtn
                  ? "显示"
                  : formDataObject.listStyle == 4
                  ? "该样式下不支持该功能显示"
                  : "不显示"
              }}</span>
            </span>
            <span class="check_radio" v-if="formDataObject.listStyle != 4">
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
            <span class="check_radio" v-else>
              <span class="_check disabledspan"></span>
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
          <div class="disFlex margT10">
            <span>
              <span class="one">商品角标</span>
              <span class="two">{{
                formDataObject.shopBadge
                  ? "显示"
                  : formDataObject.listStyle == 4
                  ? "该样式下不支持该功能显示"
                  : "不显示"
              }}</span>
            </span>
            <span class="check_radio" v-if="formDataObject.listStyle != 4">
              <span
                class="_check"
                @click="changeCheck('shopBadge', true)"
                v-if="!formDataObject.shopBadge"
              ></span>
              <span
                class="iconfont icon-Checkbox"
                v-else
                @click="changeCheck('shopBadge', false)"
              ></span>
            </span>
            <span class="check_radio" v-else>
              <span class="_check disabledspan"></span>
            </span>
          </div>
          <div v-if="formDataObject.shopBadge" class="margT10">
            <a-radio-group
              name="radioGroup"
              :default-value="formDataObject.badgeType"
              @change="changeBadge"
            >
              <a-radio :value="1">热销</a-radio>
              <a-radio :value="2">新品</a-radio>
              <a-radio :value="3">自定义</a-radio>
            </a-radio-group>
          </div>
          <div class="margT10" v-if="formDataObject.badgeType == 3">
            <ImageUpload
              class="upload_wrap"
              v-model="formDataObject.badgeImgUrl"
              uploadText="上传图片"
            ></ImageUpload>
          </div>
        </div>
      </div>
    </div>
    <ShopModal
      :list="openlist"
      :record="currentRecord"
      @cancel="closeInfoModal"
      @confirm="selectedPage"
      :visible="pageModalVisible"
      :tabType="tabType"
      :shopTabType="shopTabType"
      :checkType="formDataObject.checkType"
    ></ShopModal>
  </div>
</template>
<script>
import ShopModal from "@/components/ShopList/ShopModalList";
import ImageUpload from "@components/antBase/ImageUpload";
import draggable from "vuedraggable";
import { cloneDeep } from "lodash";
export default {
  name: "MyCommodityForm",
  components: {
    ShopModal,
    ImageUpload,
    draggable,
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
          return "一行两个";
        case "2":
          return "一行三个";
        case "3":
          return "横向滑动";
        case "4":
          return "横条模式";
        case "5":
          return "瀑布流";
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
      currentRecord: {},
      shopTabType: true,
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
    };
  },
  methods: {
    changeTabs(e) {
      // console.log('change', e)
      this.tabType = parseInt(e);
      this.formDataObject.shopListType = parseInt(e);
    },
    changeCheck(a, b) {
      // const { formDataObject } = this;
      // formDataObject[a] = b;
      this.$set(this.formDataObject, a, b);
    },
    changeListCheck() {
      this.$set(this.formDataObject, "listStyle", "4");
      this.$set(this.formDataObject, "shopOriginalPrices", false);
      this.$set(this.formDataObject, "shopBadge", false);
      this.$set(this.formDataObject, "shopBuyBtn", false);
    },
    changeListCheck5() {
      this.$set(this.formDataObject, "listStyle", "5");
      // this.$set(this.formDataObject, "shopOriginalPrices", false);
      // this.$set(this.formDataObject, "shopBadge", false);
      this.$set(this.formDataObject, "imgFill", 0);
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
      // console.log(val, 'val', JSON.stringify(val))
      // return
      if (JSON.stringify(val.value) == "{}") {
        val = [];
      }
      this.formDataObject.checkType = val.type;
      if (this.tabType === 1) {
        // this.formDataObject.imageList = []
        // const arr = []
        // 商品选择商品分组
        if (val.type == "2") {
          this.getShopList(val.value);
          return;
        }
        console.log(val);
        this.formDataObject.imageList = val.value.map((item) => {
          return {
            id: item.id,
            goodsName: item.goodsName,
            goodsPicture: item.goodsPicture,
            salePrice: item.salePrice,
            goodsTitle: item.goodsSellingPoint || item.goodsTitle,
            realSales: item.realSales,
            marketPrice: item.marketPrice || "",
          };
        });
      } else {
        this.formDataObject.shopList = val.map((item) => {
          return {
            id: item.id,
            groupName: item.groupName,
            goodsPicture: item.goodsPicture,
            groupTableName: item.groupName,
            shopNumber: 6,
            showAllShop: false,
          };
        });
      }
      this.pageModalVisible = false;
    },
    closeInfoModal(type) {
      this.pageModalVisible = false;
    },
    deleteImageInfo(index) {
      this.formDataObject.imageList.splice(index, 1);
    },
    deleteShopInfo(i) {
      this.formDataObject.shopList.splice(i, 1);
    },
    deleteShopInfos(i) {
      this.formDataObject.imageList.splice(i, 1);
    },
    addImage() {
      this.shopTabType = false;
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
        this.shopTabType = true;
        // if(checkType)
      } else {
        this.openlist = this.formDataObject.shopList;
      }
      this.pageModalVisible = true;
    },
    changeBadge(e) {
      // this.formDataObject.badgeType=e.target.value;
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
    // 获取分组下商品
    getShopList(val) {
      console.log(val, "imageList");
      var imageList = val.map((item) => {
        return {
          id: item.id,
          goodsName: item.groupName,
          goodsPicture: item.goodsPicture,
          groupTableName: item.groupName,
          showAllShop: false,
        };
      });
      this.$set(this.formDataObject, "imageList", imageList);
      this.pageModalVisible = false;
    },
  },
  beforeDestroy() {
    if (this.formDataObject.shopListType == "1") {
      this.formDataObject.shopList = [];
    } else {
      this.formDataObject.imageList = [];
    }
  },
  watch: {
    formDataObject: {
      handler(n, o) {
        console.log(n, "6666666666666666");
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
.add_icon {
  width: 100%;
  height: 120px;
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
  display: inline-block;
  background: #fff;
  width: 100%;
  height: 50px;
  text-align: center;
  margin: 10px;
  box-shadow: 0 0 4px 0;
  cursor: pointer;
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
.dragBox {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
}
.disabledspan {
  background: #f5f5f5;
  cursor: not-allowed !important;
}
</style>

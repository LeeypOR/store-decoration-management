<template>
  <div class="title-text-form">
    <div class="title_nav">
      <a-tabs :default-active-key="1">
        <a-tab-pane :key="1" tab="基础设置">
          <div class="from_seaction">
            <div class="title">添加背景图</div>
            <div class="desc">
              1图背景建议尺寸750*750，2图背景建议尺寸750*750，3图背景建议尺寸750*690
            </div>
            <div class="image_info_wrap">
              <!-- <ImageUpload
                class="upload_wrap"
                v-model="formDataObject.backgroundInfo.imageUrl"
                uploadText="上传图片"
              ></ImageUpload> -->
              <div
                v-if="formDataObject.backgroundInfo.imageUrl"
                @click="openUpload('image', formDataObject)"
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
                @click="openUpload('image', formDataObject)"
              >
                <a-icon type="plus" />
                <p>上传图片</p>
              </div>
              <div class="right">
                <div class="bottom line">
                  <div class="label">链接</div>
                  <a
                    @click="
                      backgroundAddLinkPage(formDataObject.backgroundInfo)
                    "
                  >
                    {{
                      formDataObject.backgroundInfo
                        | backgroundJumpLinkTextFilter
                    }}
                  </a>
                </div>
              </div>
            </div>
            <div class="disFlex margT10">
              <span>
                <span class="one">背景倒角</span>
                <span class="two">
                  {{
                    formDataObject.backgroundAnleType == "0" ? "直角" : "圆角"
                  }}
                </span>
              </span>
              <span>
                <span
                  :class="[
                    'icon_btn iconfont icon-icon_right_attributebar_zhijiao_default',
                    formDataObject.backgroundAnleType == '0'
                      ? 'icon_btn_check'
                      : '',
                  ]"
                  style="font-size: 24px"
                  @click="changeCheck('backgroundAnleType', '0')"
                ></span>
                <span
                  :class="[
                    'icon_btn iconfont icon-icon_right_attributebar_yuanjiao_default',
                    formDataObject.backgroundAnleType == '1'
                      ? 'icon_btn_check'
                      : '',
                  ]"
                  style="font-size: 24px"
                  @click="changeCheck('backgroundAnleType', '1')"
                ></span>
              </span>
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
                    formDataObject.listStyle == '1' ? 'icon_btn_check' : '',
                  ]"
                  @click="changeCheck('listStyle', '1')"
                >
                  <span
                    class="iconfont icon-icon_right_attributebar_dtms_default"
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
                    class="iconfont icon-icon_right_attributebar_yhlt_default"
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
              </div>
            </div>
            <a-divider />

            <div class="add_wrap">
              <div class="add_title">
                <span class="icon">*</span>
                <span class="text">添加商品</span>
              </div>
              <div class="add_item">
                <div class="add_icon">
                  <div
                    v-for="(item, i) of formDataObject.productList"
                    :key="i"
                    class="image_add_wrap"
                  >
                    <img
                      class="delete_icon"
                      @click="deleteImageInfo(i)"
                      src="~@images/shop/icon_middle_modalbox_delete_s.png"
                      alt
                    />
                    <div class="shopImg">
                      <img :src="item.goodsPicture" alt />
                    </div>
                  </div>
                  <div class="btn_add" @click="openModalAdd">
                    <span class="iconfont icon-join"></span>
                  </div>
                </div>
              </div>
            </div>

            <a-divider />
            <div class="form_data">
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

              <div class="disFlex margT10">
                <span>
                  <span class="one">文本对齐</span>
                  <span class="two">
                    {{
                      formDataObject.textAlign == "left" ? "左对齐" : "居中对齐"
                    }}
                  </span>
                </span>
                <span>
                  <span
                    :class="[
                      'iconfont icon_btn icon-icon_right_attributebar_wzjz_selected',
                      formDataObject.textAlign == 'left'
                        ? 'icon_btn_check'
                        : '',
                    ]"
                    @click="changeCheck('textAlign', 'left')"
                  ></span>
                  <span
                    :class="[
                      'iconfont icon-icon_right_attributebar_wzjz_default icon_btn fontBold',
                      formDataObject.textAlign == 'middle'
                        ? 'icon_btn_check'
                        : '',
                    ]"
                    @click="changeCheck('textAlign', 'middle')"
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
                  <span class="one">商品价格</span>
                  <span class="two">
                    {{ formDataObject.showShopPrice ? "显示" : "不显示" }}
                  </span>
                </span>
                <span class="check_radio">
                  <span
                    class="_check"
                    @click="changeCheck('showShopPrice', true)"
                    v-if="!formDataObject.showShopPrice"
                  ></span>
                  <span
                    class="iconfont icon-Checkbox"
                    v-else
                    @click="changeCheck('showShopPrice', false)"
                  ></span>
                </span>
              </div>

              <div class="disFlex margT10">
                <span>
                  <span class="one">购买按钮</span>
                  <span class="two">
                    {{ formDataObject.shopBuyBtn ? "显示" : "不显示" }}
                  </span>
                  <span style="margin-left: 10px"
                    >勾选后有利于提高商品成交</span
                  >
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

              <div class="disFlex margT10" v-show="formDataObject.shopBuyBtn">
                <a-radio-group
                  v-model="formDataObject.buyBtnStyle"
                  @change="onChange"
                >
                  <a-radio value="1">
                    <div class="radio_content">
                      <div class="text">样式1</div>
                      <img
                        src="~@images/shop/app_icon_gouwuche@2x.png"
                        alt=""
                        v-show="formDataObject.buyBtnStyle == '1'"
                      />
                    </div>
                  </a-radio>
                  <a-radio value="2">
                    <div class="radio_content">
                      <div class="text">样式2</div>
                      <div
                        class="preview"
                        v-show="formDataObject.buyBtnStyle == '2'"
                      >
                        马上抢
                      </div>
                    </div>
                  </a-radio>
                </a-radio-group>
              </div>

              <div class="disFlex margT10">
                <span>
                  <span class="one">商品原价</span>
                  <span class="two">
                    {{ formDataObject.showOldPrice ? "显示" : "不显示" }}
                  </span>
                </span>
                <span class="check_radio">
                  <span
                    class="_check"
                    @click="changeCheck('showOldPrice', true)"
                    v-if="!formDataObject.showOldPrice"
                  ></span>
                  <span
                    class="iconfont icon-Checkbox"
                    v-else
                    @click="changeCheck('showOldPrice', false)"
                  ></span>
                </span>
              </div>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane :key="2" tab="高级设置" force-render>
          <div class="advanced_wrap">
            <div class="title_wrap">
              <!-- <div class="title">活动标题</div> -->
              <div class="disFlex margT10">
                <span>
                  <span class="title">活动标题</span>
                  <span class="two">
                    {{ formDataObject.activeTitleShow ? "显示" : "不显示" }}
                  </span>
                </span>
                <span class="check_radio">
                  <span
                    class="_check"
                    @click="changeCheck('activeTitleShow', true)"
                    v-if="!formDataObject.activeTitleShow"
                  ></span>
                  <span
                    class="iconfont icon-Checkbox"
                    v-else
                    @click="changeCheck('activeTitleShow', false)"
                  ></span>
                </span>
              </div>

              <a-input
                placeholder="新品上市"
                v-model="formDataObject.activeTitle"
                :maxLength="8"
              />
              <div class="desc">默认展示：新品上市，可自行设置1-8字以内</div>
              <div class="line">
                <div class="text_wrap">
                  <div class="label">标题大小</div>
                </div>
                <a-slider
                  class="slider"
                  v-model="formDataObject.activeTitleSize"
                  :min="12"
                  :max="40"
                  style="width: 120px"
                />
                <a-input-number
                  v-model="formDataObject.activeTitleSize"
                  :min="12"
                  :max="40"
                  style="marginleft: 16px"
                />
              </div>

              <div class="disFlex margT10">
                <span>
                  <span class="one">标题颜色</span>
                  <span class="two">
                    {{ formDataObject.activeTitleColor }}
                  </span>
                </span>
                <div class="colorBox">
                  <span
                    class="reset_color"
                    @click="resetFontColor('activeTitleColor')"
                    >重置</span
                  >
                  <a-input
                    class="color_select"
                    type="color"
                    v-model="formDataObject.activeTitleColor"
                  />
                </div>
              </div>

              <div class="disFlex margT10 line">
                <span>
                  <span class="one">标题文本样式</span>
                  <span class="two">
                    {{
                      formDataObject.activeTitleStyle == "normal"
                        ? "常规体"
                        : "加粗体"
                    }}
                  </span>
                </span>
                <span>
                  <span
                    :class="[
                      'iconfont icon-icon_right_attributebar_wzdh_default icon_btn',
                      formDataObject.activeTitleStyle == 'normal'
                        ? 'icon_btn_check'
                        : '',
                    ]"
                    @click="changeCheck('activeTitleStyle', 'normal')"
                  ></span>
                  <span
                    :class="[
                      'iconfont icon-icon_right_attributebar_wzdh_default icon_btn fontBold',
                      formDataObject.activeTitleStyle == 'bold'
                        ? 'icon_btn_check'
                        : '',
                    ]"
                    @click="changeCheck('activeTitleStyle', 'bold')"
                  ></span>
                </span>
              </div>
              <a-divider />
            </div>

            <div class="desc_wrap">
              <!-- <div class="desc_title">活动描述</div> -->
              <div class="disFlex margT10">
                <span>
                  <span class="title">活动描述</span>
                  <span class="two">
                    {{ formDataObject.activeDescShow ? "显示" : "不显示" }}
                  </span>
                </span>
                <span class="check_radio">
                  <span
                    class="_check"
                    @click="changeCheck('activeDescShow', true)"
                    v-if="!formDataObject.activeDescShow"
                  ></span>
                  <span
                    class="iconfont icon-Checkbox"
                    v-else
                    @click="changeCheck('activeDescShow', false)"
                  ></span>
                </span>
              </div>

              <a-input
                placeholder="新品发售 抢先体验"
                v-model="formDataObject.description"
                :maxLength="15"
              />
              <div class="desc">
                默认展示：新品发售 抢先体验，可自行设置1-15字以内
              </div>
              <div class="line">
                <div class="text_wrap">
                  <div class="label">描述大小</div>
                </div>
                <a-slider
                  class="slider"
                  v-model="formDataObject.descriptionSize"
                  :min="12"
                  :max="20"
                  style="width: 120px"
                />
                <a-input-number
                  v-model="formDataObject.descriptionSize"
                  :min="12"
                  :max="20"
                  style="marginleft: 16px"
                />
              </div>

              <div class="disFlex margT10">
                <span>
                  <span class="one">描述颜色</span>
                  <span class="two">
                    {{ formDataObject.activeDescColor }}
                  </span>
                </span>
                <div class="colorBox">
                  <span
                    class="reset_color"
                    @click="resetFontColor('activeDescColor')"
                    >重置</span
                  >
                  <a-input
                    class="color_select"
                    type="color"
                    v-model="formDataObject.activeDescColor"
                  />
                </div>
              </div>

              <div class="disFlex margT10 line">
                <span>
                  <span class="one">标题文本样式</span>
                  <span class="two">
                    {{
                      formDataObject.descriptionStyle == "normal"
                        ? "常规体"
                        : "加粗体"
                    }}
                  </span>
                </span>
                <span>
                  <span
                    :class="[
                      'iconfont icon-icon_right_attributebar_wzdh_default icon_btn',
                      formDataObject.descriptionStyle == 'normal'
                        ? 'icon_btn_check'
                        : '',
                    ]"
                    @click="changeCheck('descriptionStyle', 'normal')"
                  ></span>
                  <span
                    :class="[
                      'iconfont icon-icon_right_attributebar_wzdh_default icon_btn fontBold',
                      formDataObject.descriptionStyle == 'bold'
                        ? 'icon_btn_check'
                        : '',
                    ]"
                    @click="changeCheck('descriptionStyle', 'bold')"
                  ></span>
                </span>
              </div>
              <a-divider />
            </div>

            <div class="other_wrap">
              <div class="disFlex margT10">
                <span>
                  <span class="one">活动时间</span>
                  <!-- <div class="disFlex margT10">
                    <span>
                      <span class="title">活动时间</span>
                      <span class="two">
                        {{ formDataObject.activeTimeShow ? "显示" : "不显示" }}
                      </span>
                    </span>
                    <span class="check_radio">
                      <span
                        class="_check"
                        @click="changeCheck('activeTimeShow', true)"
                        v-if="!formDataObject.activeTimeShow"
                      ></span>
                      <span
                        class="iconfont icon-Checkbox"
                        v-else
                        @click="changeCheck('activeTimeShow', false)"
                      ></span>
                    </span>
                  </div> -->

                  <span class="two">
                    {{ formDataObject.showActiveTime ? "显示" : "不显示" }}
                  </span>
                </span>
                <span class="check_radio">
                  <span
                    class="_check"
                    @click="changeCheck('showActiveTime', true)"
                    v-if="!formDataObject.showActiveTime"
                  ></span>
                  <span
                    class="iconfont icon-Checkbox"
                    v-else
                    @click="changeCheck('showActiveTime', false)"
                  ></span>
                </span>
              </div>
            </div>
            <div class="disFlex margT10">
              <span>
                <span class="one">底色</span>
                <span class="two">
                  {{ formDataObject.backgroundColor }}
                </span>
              </span>
              <div class="colorBox">
                <span class="reset_color" @click="resetBackgroundColor"
                  >重置</span
                >
                <a-input
                  class="color_select"
                  type="color"
                  v-model="formDataObject.backgroundColor"
                />
              </div>
            </div>

            <div class="line">
              <div class="text_wrap">
                <div class="label">时间大小</div>
              </div>
              <a-slider
                class="slider"
                v-model="formDataObject.timeSize"
                :min="12"
                :max="20"
                style="width: 120px"
              />
              <a-input-number
                v-model="formDataObject.timeSize"
                :min="12"
                :max="20"
                style="marginleft: 16px"
              />
            </div>

            <div class="disFlex margT10">
              <span>
                <span class="one">时间颜色</span>
                <span class="two">
                  {{ formDataObject.activeTimeColor }}
                </span>
              </span>
              <div class="colorBox">
                <span
                  class="reset_color"
                  @click="resetFontColor('activeTimeColor')"
                  >重置</span
                >
                <a-input
                  class="color_select"
                  type="color"
                  v-model="formDataObject.activeTimeColor"
                />
              </div>
            </div>

            <div class="disFlex margT10 line">
              <span>
                <span class="one">时间文本样式</span>
                <span class="two">
                  {{
                    formDataObject.timeStyle == "normal" ? "常规体" : "加粗体"
                  }}
                </span>
              </span>
              <span>
                <span
                  :class="[
                    'iconfont icon-icon_right_attributebar_wzdh_default icon_btn',
                    formDataObject.timeStyle == 'normal'
                      ? 'icon_btn_check'
                      : '',
                  ]"
                  @click="changeCheck('timeStyle', 'normal')"
                ></span>
                <span
                  :class="[
                    'iconfont icon-icon_right_attributebar_wzdh_default icon_btn fontBold',
                    formDataObject.timeStyle == 'bold' ? 'icon_btn_check' : '',
                  ]"
                  @click="changeCheck('timeStyle', 'bold')"
                ></span>
              </span>
            </div>

            <div class="line">
              <div class="text_wrap">
                <div class="label">底色透明度</div>
              </div>
              <a-slider
                class="slider"
                v-model="formDataObject.backgroundTransparency"
                :max="100"
                style="width: 120px"
              />
              <a-input-number
                v-model="formDataObject.backgroundTransparency"
                :max="100"
                style="marginleft: 16px"
              />
            </div>

            <a-divider />
            <div class="line">
              <div class="text_wrap">
                <div class="label">文本位置</div>
              </div>
              <a-slider
                class="slider"
                v-model="formDataObject.textTop"
                :max="350"
                style="width: 120px"
              />
              <a-input-number
                v-model="formDataObject.textTop"
                :max="350"
                style="marginleft: 16px"
              />
            </div>

            <div class="line" v-if="formDataObject.productList.length > 0">
              <div class="text_wrap">
                <div class="label">商品位置</div>
              </div>
              <a-slider
                class="slider"
                v-model="formDataObject.goodsBottom"
                :max="200"
                style="width: 120px"
              />
              <a-input-number
                v-model="formDataObject.goodsBottom"
                :max="200"
                style="marginleft: 16px"
              />
            </div>

            <div class="line">
              <div class="text_wrap">
                <div class="label">行间距</div>
              </div>
              <a-slider
                class="slider"
                v-model="formDataObject.textLineHeight"
                :max="30"
                style="width: 120px"
              />
              <a-input-number
                v-model="formDataObject.textLineHeight"
                :max="30"
                style="marginleft: 16px"
              />
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>

    <ActiveProductChooseModal
      :selectedProductList="formDataObject.productList"
      @cancel="closeInfoModal"
      @confirm="selectedPage"
      :visible="pageModalVisible"
    ></ActiveProductChooseModal>

    <!-- 背景图的单链接和热区选择框 -->
    <PageModal
      @cancel="backgroundLinkPageModalVisible = false"
      @confirm="backgroundLinkSelectedPage"
      :visible="backgroundLinkPageModalVisible"
      :pageIndex="pageIndex"
      :pageModelId="pageModelId"
    ></PageModal>

    <video-modal
      :visible="visibleModal"
      @cancel="closeInfoModal"
      :ContentType="ContentType"
      @upload="upload"
      :videoData="videoData"
    ></video-modal>
  </div>
</template>
<script>
import PageModal from "@components/antBase/PageModal";
import ActiveProductChooseModal from "./components/ActiveProductChooseModal";
import ImageUpload from "@components/antBase/ImageUpload";
import { cloneDeep } from "lodash";
import videoModal from "@/components/antBase/videoModal";

export default {
  name: "LimitSeckillForm",
  components: {
    ImageUpload,
    PageModal,
    ActiveProductChooseModal,
    videoModal,
  },
  filters: {
    backgroundJumpLinkTextFilter(item) {
      // console.log('item.jumpPageId', item.jumpPageId, item.jumpPageName)
      if (item.jumpPageId) {
        return item.jumpPageType == "WXMAID"
          ? item.jumpPageUrl
          : item.jumpPageName;
      } else return "点击选择跳转到的页面";
    },

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
        case "1":
          return "大图轮播";
        case "2":
          return "两图轮播";
        case "3":
          return "三图轮播";
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
    this.getProductList(this.formDataObject.productIds);
  },
  data() {
    return {
      timer: null,
      backgroundLinkPageModalVisible: false,
      pageIndex: "MSPAGE",
      pageModelId: "",

      tabType: 1,
      pageModalVisible: false,
      formDataObject: {
        // listStyle: "1", // 列表样式0大图模式1一行两个2一行三个
        // angleType: "0", // 商品倒角0直角1圆角
        // textAlign: "left", // 文本对齐，left，左对齐，middle，居中对齐
        // titleThickness: "normal", // 标题粗细
        // shopName: false, // 商品名称
        // shopPrices: false, // 商品价格
        // shopBuyBtn: false, // 购买按钮
        // shopOriginalPrices: false, // 商品原价
        // pagePadding: 15, // 页面边距
        // imagePadding: 10, // 图片间距
        // productList: [],
      },
      visibleModal: false,
      ContentType: "image",
      videoData: {},
      imgType: 1,
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
        let obj = JSON.parse(
          JSON.stringify(this.formDataObject.backgroundInfo)
        );
        obj.imageUrl = val.fileUrl;
        this.$set(this.formDataObject, "backgroundInfo", obj);
      }
    },
    // 打开上传组件
    openUpload(a, item, c) {
      if (a == "video") {
        // this.checkValue = { videoUrl: item.videoUrl };
      } else {
        this.checkValue = { imgUrl: item.backgroundInfo.imageUrl };
      }
      this.ContentType = a;
      this.visibleModal = true;
    },
    handleMenuClick(e) {
      console.log("e", e);
    },
    backgroundLinkSelectedPage({ id, name, type, url }) {
      console.log("收到的已选择信息为:", id, name, type);
      this.$set(this.formDataObject.backgroundInfo, "jumpPageId", id);
      this.$set(this.formDataObject.backgroundInfo, "jumpPageName", name);
      this.$set(this.formDataObject.backgroundInfo, "jumpPageUrl", url);
      this.$set(this.formDataObject.backgroundInfo, "jumpPageType", type);
      this.backgroundLinkPageModalVisible = false;
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
    changeCheck(a, b) {
      // const { formDataObject } = this;
      // formDataObject[a] = b;
      this.$set(this.formDataObject, a, b);
    },
    onChange(e) {
      console.log("radio checked", e.target.value);
    },
    async getProductList(selectedIds) {
      const productListRes = await this.$post(
        "goldenhome/seckill_/admin/discount/goods/id",
        selectedIds
      );
      console.log("productListRes", productListRes);
      if (productListRes.returnCode == 1000) {
        this.formDataObject.productList = productListRes.dataInfo.map(
          (item) => {
            return {
              activityType: item.activityType, // 活动类型，0秒杀，1限时活动。
              activityStatu: item.activityStatu, // 活动状态
              endDate: item.endDate, // 活动结束时间。
              startDate: item.startDate, // 活动开始时间。
              activityId: item.activityId, // 活动id
              activeDesc: item.activeDesc, // 活动描述
              activityName: item.activityName, // 活动名称。
              id: item.id, // 活动商品列表的id
              goodId: item.goodId, // 商品id。
              goodsStatus: item.goodsStatus, // 商品状态。1仓库中，2上家，3下架。
              goodsName: item.goodsName, // 商品名称
              goodsPicture: item.goodsPicture, // 商品图片 **
              salePrice: item.salePrice, // 商品原价。 **
              realSales: item.seckillPrice || item.discountPrice, // 商品实际售价。 **
              totalRemainStock: item.totalRemainStock, //商品剩余库存
            };
          }
        );
        this.formDataObject.productList =
          this.formDataObject.productList.filter(
            (item) => item.goodsStatus == 2
          );
      }
    },
    async selectedPage(selectedIds) {
      this.formDataObject.productIds = JSON.parse(JSON.stringify(selectedIds));
      if (selectedIds.length > 0) {
        // const productListRes = await this.$post('goldenhome/seckill_/admin/discount/goods/id', selectedIds)
        // console.log('productListRes', productListRes)
        // if (productListRes.returnCode == 1000) {
        //   this.formDataObject.productList = productListRes.dataInfo.map(item => {
        //     return {
        //       activityType: item.activityType, // 活动类型，0秒杀，1限时活动。
        //       activityStatu: item.activityStatu, // 活动状态
        //       endDate: item.endDate, // 活动结束时间。
        //       startDate: item.startDate, // 活动开始时间。
        //       activityId: item.activityId, // 活动id
        //       activeDesc: item.activeDesc, // 活动描述
        //       activityName: item.activityName, // 活动名称。
        //       id: item.id, // 活动商品列表的id
        //       goodId: item.goodId, // 商品id。
        //       goodsName: item.goodsName, // 商品名称
        //       goodsPicture: item.goodsPicture, // 商品图片 **
        //       salePrice: item.salePrice, // 商品原价。 **
        //       realSales: item.seckillPrice || item.discountPrice // 商品实际售价。 **
        //     }
        //   })
        // }
        await this.getProductList(selectedIds);
      } else {
        this.formDataObject.productList = [];
      }

      this.pageModalVisible = false;
    },
    closeInfoModal(type) {
      this.visibleModal = false;
      this.pageModalVisible = false;
    },
    deleteImageInfo(index) {
      this.formDataObject.productList.splice(index, 1);
      this.formDataObject.productIds.splice(index, 1);
    },
    addImage() {
      if (this.formDataObject.shopList.length >= 15) {
        this.$message.warning("最多添加15个分组");
        return false;
      }
      this.openModalAdd();
    },
    openModalAdd() {
      this.pageModalVisible = true;
    },
    setFontColor(e, property) {
      console.log("e");
      this.$set(this.formDataObject, property, e.target.selectedProductsue);
    },
    resetFontColor(property) {
      this.$set(this.formDataObject, property, "#333333");
    },
    resetBackgroundColor() {
      // this.formDataObject.bgColorValue = "#ffffff";
      this.$set(this.formDataObject, "backgroundColor", "#999999");
    },
    resetBorderColor() {
      this.$set(this.formDataObject, "systemborderColor", "#ff4444");
    },
    setBorderColor(e) {
      // this.formDataObject.bgColorValue = e.target.selectedProductsue;
      this.$set(
        this.formDataObject,
        "systemborderColor",
        e.target.selectedProductsue
      );
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
  },
};
</script>
<style lang="less" scoped>
@labelColor: #999;
@resultColor: #333;

.form_data {
  .iconfont {
    font-size: 24px;
  }
}
.line {
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
      .title {
        font-size: 14px;
        color: #333;
        line-height: 40px;
        height: 40px;
        font-weight: 700;
      }
      .desc {
        font-size: 12px;
        color: #999;
      }
      .image_info_wrap {
        margin-top: 13px;
        display: flex;
        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.2);
        padding: 10px;
        margin: 5px;
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
    }
    .from_seaction {
      // div {
      //   .listStyle {
      //     span {
      //     }
      //     .two {
      //     }
      //   }
      //   .listStyle {
      //     .listCheck {
      //       .iconfont {
      //       }
      //       .icon-icon_right_attributebar_dtms_default {
      //       }
      //     }
      //     .1 {
      //     }
      //     .icon_btn_check {
      //     }
      //     .listCheck {
      //       .iconfont {
      //       }
      //       .icon-icon_right_attributebar_yhlt_default {
      //       }
      //     }
      //     .2 {
      //     }
      //     .listCheck {
      //       .iconfont {
      //       }
      //       .icon-icon_right_attributebar_yhlt_default {
      //       }
      //     }
      //     .3 {
      //     }
      //   }
      //   .margT10 {
      //   }
      // }
      .add_wrap {
        // .add_title {
        //   .icon {
        //   }
        //   .text {
        //   }
        // }
        .add_item {
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
            .image_add_wrap {
              position: relative;
              background-color: rgb(2, 1, 1);
              box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
              border-radius: 2px;
              border-radius: 2px;
              // padding: 12px;
              margin: 10px;
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
              .shopImg {
                width: 50px;
                height: 50px;
                text-align: center;
                overflow: hidden;
                img {
                  // height: 100%;
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
              margin: 10px;
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
      }
      // .form_data {
      //   .disFlex {
      //     span {
      //       .one {
      //       }
      //       .two {
      //       }
      //     }
      //     span {
      //       .0 {
      //       }
      //       .icon_btn_check {
      //       }
      //       .1 {
      //       }
      //     }
      //   }
      //   .margT10 {
      //   }
      //   .disFlex {
      //     span {
      //       .one {
      //       }
      //       .two {
      //       }
      //     }
      //     span {
      //       .normal {
      //       }
      //       .icon_btn_check {
      //       }
      //       .bold {
      //       }
      //     }
      //   }
      //   .disFlex {
      //     span {
      //       .one {
      //       }
      //       .two {
      //       }
      //     }
      //     span {
      //       .left {
      //       }
      //       .icon_btn_check {
      //       }
      //       .middle {
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
      //   .line {
      //     .text_wrap {
      //       .label {
      //       }
      //     }
      //     .slider {
      //     }
      //   }
      // }
      div {
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
        // .margT10 {
        // }
        // .disFlex {
        //   span {
        //     .one {
        //     }
        //     .two {
        //     }
        //     span {
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
        .disFlex {
          .radio_content {
            display: inline-flex;
            height: 30px;
            line-height: 30px;

            .text {
              margin-right: 15px;
            }
            .preview {
              background-color: #c8a579;
              color: #fff;
              padding: 0 10px;
            }
          }
          // .radio_content {
          //   .text {
          //   }
          //   .preview {
          //   }
          // }
          // span {
          //   .one {
          //   }
          //   .two {
          //   }
          // }
          // .check_radio {
          //   ._check {
          //   }
          //   .iconfont {
          //   }
          //   .icon-Checkbox {
          //   }
          // }
        }
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
      }
    }
    .advanced_wrap {
      .title {
        color: #333333;
        font-size: 14px;
        font-weight: 700;
        height: 20px;
        line-height: 20px;
        // margin-bottom: 15px;
      }

      .title_wrap {
        // .title {
        //   color: #333333;
        //   font-size: 14px;
        //   font-weight: 700;
        //   height: 20px;
        //   line-height: 20px;
        //   // margin-bottom: 15px;
        // }
        .desc {
          font-size: 12px;
          color: #999999;
          margin-top: 10px;
        }
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
        //   .colorBox {
        //     .reset_color {
        //     }
        //     .color_select {
        //     }
        //   }
        // }
        // .margT10 {
        // }
        // .disFlex {
        //   span {
        //     .one {
        //     }
        //     .two {
        //     }
        //   }
        //   span {
        //     .normal {
        //     }
        //     .icon_btn_check {
        //     }
        //     .bold {
        //     }
        //   }
        // }
        // .line {
        // }
      }
      .desc_wrap {
        .desc_title {
          color: #333333;
          font-size: 14px;
          font-weight: 700;
          height: 20px;
          line-height: 20px;
          margin-bottom: 15px;
        }
        .desc {
          font-size: 12px;
          color: #999999;
          margin-top: 10px;
        }
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
        //   .colorBox {
        //     .reset_color {
        //     }
        //     .color_select {
        //     }
        //   }
        // }
        // .margT10 {
        // }
        // .disFlex {
        //   span {
        //     .one {
        //     }
        //     .two {
        //     }
        //   }
        //   span {
        //     .normal {
        //     }
        //     .icon_btn_check {
        //     }
        //     .bold {
        //     }
        //   }
        // }
        // .line {
        // }
      }
      // .other_wrap {
      //   .disFlex {
      //     span {
      //       .one {
      //       }
      //       .two {
      //       }
      //     }
      //     .check_radio {
      //       ._check {
      //       }
      //       .iconfont {
      //       }
      //       .icon-Checkbox {
      //       }
      //     }
      //   }
      //   .margT10 {
      //   }
      // }
      // .disFlex {
      //   span {
      //     .one {
      //     }
      //     .two {
      //     }
      //   }
      //   .colorBox {
      //     .reset_color {
      //     }
      //     .color_select {
      //     }
      //   }
      // }
      // .margT10 {
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
      //   .colorBox {
      //     .reset_color {
      //     }
      //     .color_select {
      //     }
      //   }
      // }
      // .disFlex {
      //   span {
      //     .one {
      //     }
      //     .two {
      //     }
      //   }
      //   span {
      //     .normal {
      //     }
      //     .icon_btn_check {
      //     }
      //     .bold {
      //     }
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
      // .line {
      //   .text_wrap {
      //     .label {
      //     }
      //   }
      //   .slider {
      //   }
      // }
    }
    .icon_btn_check {
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
    border: 1px solid #e6e6e6;
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

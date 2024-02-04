<template>
  <div class="coupon-form">
    <div class="seaction">
      <div class="header">
        <h3 class="title">添加优惠券</h3>
        <div class="add_nav">
          <div class="add_t">
            <div>优惠券</div>
            <!-- <div class="tip">最多添加十张优惠券</div> -->
          </div>
          <div class="list">
            <div
              class="icard"
              v-for="(item, i) of formDataObject.shopList"
              :key="i"
            >
              <img
                class="delete_icon"
                @click="deleteShopInfo(i)"
                src="~@images/shop/icon_middle_modalbox_delete_s.png"
                alt
              />
              <span class="iconfont icon-management"></span>
              <span>{{ item.couponName }}</span>
            </div>
            <!--  -->
            <!-- <div class="TreeAdd">
              <div v-for="(item, i) of formDataObject.shopList" :key="i" class="image_add_wrap">
                <div class="treeList">
                  <img class="delete_icon" @click="deleteShopInfo(i)" src="~@images/shop/icon_middle_modalbox_delete_s.png" alt />
                  <div class="title_add">
                    <span>商品来源:</span>
                    <span>{{item.groupName}}</span>
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
                      <a-radio-group name="radioGroup" :default-value="item.showAllShop" v-model="item.showAllShop" @change="changeShopShow">
                        <a-radio :value="false">
                          <a-input-number id="inputNumber" v-model="item.shopNumber" :min="4" :max="100" />
                        </a-radio>
                        <a-radio :value="true">全部</a-radio>
                      </a-radio-group>
                    </span>
                  </div>
                </div>
              </div>
            </div> -->
            <!--  -->
          </div>
          <div class="add_btn" @click="addImage">
            <img
              class="icon_add"
              src="~@images/shop/icon_right_attributebar_jiahao.png"
            />
            <span class="text">添加优惠券</span>
          </div>
        </div>
      </div>
      <div class="list_con">
        <a-divider />
        <div>
          <div class="listStyle flex_start">
            <span class="list_type">列表样式</span>
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
          </div>
          <div class="listStyle flex_btween margT10">
            <span>
              <span class="one_f">卡片样式</span>
              <!-- <span class="two">{{formDataObject.imgType==1?'系统样式':'自定义样式'}}</span> -->
            </span>
            <span>
              <span
                :class="[
                  'icon_btn   mSize',
                  formDataObject.cardType == 1 ? 'icon_btn_check' : '',
                ]"
                @click="changeCheck('cardType', 1)"
                >系统样式</span
              >
              <span
                :class="[
                  'icon_btn mSize',
                  formDataObject.cardType == 2 ? 'icon_btn_check' : '',
                ]"
                @click="changeCheck('cardType', 2)"
                >自定义样式</span
              >
            </span>
          </div>
          <div v-if="formDataObject.cardType == 1">
            <div class="listStyle flex_btween margT10">
              <span class="txt_one">
                <span class="one">样式</span>
                <span class="two">
                  {{ formDataObject.cardStyle == 1 ? "样式一" : "样式二" }}
                </span>
              </span>
              <div>
                <span
                  :class="[
                    'icon_btn iconfont icon-icon_right_attributebar_styleone_selected btn_s',
                    formDataObject.cardStyle == 1 ? 'icon_btn_check' : '',
                  ]"
                  @click="changeCheck('cardStyle', 1)"
                ></span>
                <span
                  :class="[
                    'icon_btn iconfont btn_s icon-icon_right_attributebar_styletwo_selected',
                    formDataObject.cardStyle == 2 ? 'icon_btn_check' : '',
                  ]"
                  @click="changeCheck('cardStyle', 2)"
                ></span>
              </div>
            </div>
            <div class="listStyle flex_btween margT10">
              <span class="txt_one">
                <span class="one">颜色</span>
                <span class="two">
                  {{ formDataObject.color | colorFilter }}
                </span>
              </span>
              <div class="s_cololr">
                <span
                  :class="[
                    'radio_b',
                    formDataObject.color == '1' ? 'check_color' : '',
                  ]"
                  @click="changeCheck('color', '1')"
                >
                  <span class="color_o"></span>
                </span>
                <span
                  :class="[
                    'radio_b',
                    formDataObject.color == '2' ? 'check_color' : '',
                  ]"
                  @click="changeCheck('color', '2')"
                >
                  <span class="color_t"></span>
                </span>
                <span
                  :class="[
                    'radio_b',
                    formDataObject.color == '3' ? 'check_color' : '',
                  ]"
                  @click="changeCheck('color', '3')"
                >
                  <span class="color_th"></span>
                </span>
                <span
                  :class="[
                    'radio_b radio_bs',
                    formDataObject.color == '4' ? 'check_color' : '',
                  ]"
                  @click="changeCheck('color', '4')"
                >
                  <span class="r_o"></span>
                  <span class="r_t"></span>
                </span>
              </div>
            </div>
          </div>
          <div v-else class="margT10">
            <div class="card_icon" v-if="!formDataObject.imgUrl">
              <div class="inTheMiddle" @click="openUpload('image', 2)">
                <span class="iconfont icon-join"></span>
                <span class="add_txt">添加封面</span>
              </div>
            </div>
            <div
              class="img_foucs hoverChange card_icon"
              :style="{
                background: `url('${formDataObject.imgUrl}') no-repeat`,
              }"
              v-else
            >
              <!-- <img :src="formDataObject.imgUrl" alt /> -->
              <div class="haveVideo">
                <div class="changBtn" @click="openUpload('image', 3)">
                  <i class="iconfont icon-change"></i>
                  更换图片
                </div>
              </div>
            </div>
          </div>
          <div>
            <a-divider />
            <div class="flex_btween check_list">
              <span>
                <span class="one">满减说明</span>
                <span class="two">{{
                  formDataObject.fullReduce != "0" ? "显示" : "不显示"
                }}</span>
              </span>
              <span class="check_radio">
                <span
                  class="_check"
                  @click="changeCheck('fullReduce', true)"
                  v-if="formDataObject.fullReduce == '0'"
                ></span>
                <span
                  class="iconfont icon-Checkbox"
                  v-else
                  @click="changeCheck('fullReduce', false)"
                ></span>
              </span>
            </div>
            <div
              class="flex_btween check_list margT10"
              v-if="formDataObject.listStyle == '0'"
            >
              <span>
                <span class="one">优惠券名称</span>
                <span class="two">{{
                  formDataObject.name != "0" ? "显示" : "不显示"
                }}</span>
              </span>
              <span class="check_radio">
                <span
                  class="_check"
                  @click="changeCheck('name', true)"
                  v-if="formDataObject.name == '0'"
                ></span>
                <span
                  class="iconfont icon-Checkbox"
                  v-else
                  @click="changeCheck('name', false)"
                ></span>
              </span>
            </div>
            <div
              class="flex_btween check_list margT10"
              v-if="formDataObject.listStyle != '2'"
            >
              <span>
                <span class="one">使用有效期</span>
                <span class="two">{{
                  formDataObject.deadline != "0" ? "显示" : "不显示"
                }}</span>
              </span>
              <span class="check_radio">
                <span
                  class="_check"
                  @click="changeCheck('deadline', true)"
                  v-if="formDataObject.deadline == '0'"
                ></span>
                <span
                  class="iconfont icon-Checkbox"
                  v-else
                  @click="changeCheck('deadline', false)"
                ></span>
              </span>
            </div>
            <div
              class="flex_btween check_list margT10"
              v-if="formDataObject.listStyle == '0'"
            >
              <span>
                <span class="one">使用规则</span>
                <span class="two">{{
                  formDataObject.regulation != "0" ? "显示" : "不显示"
                }}</span>
              </span>
              <span class="check_radio">
                <span
                  class="_check"
                  @click="changeCheck('regulation', true)"
                  v-if="formDataObject.regulation == '0'"
                ></span>
                <span
                  class="iconfont icon-Checkbox"
                  v-else
                  @click="changeCheck('regulation', false)"
                ></span>
              </span>
            </div>
            <a-divider />
            <div class="flex_btween check_list">
              <span>隐藏已抢完及失效的券</span>
              <span>
                <a-switch
                  v-model="formDataObject.invalid"
                  :default-checked="formDataObject.invalid"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ShopModal
      :list="openlist"
      @cancel="closeInfoModal"
      @confirm="selectedPage"
      :visible="pageModalVisible"
      :title="'选择优惠券'"
      :columns="modalColumns"
      :resUrl="resUrl"
      :listLength="10"
      :params="params"
    ></ShopModal>
    <video-modal
      :visible="visibleModal"
      @cancel="closeInfoModal"
      :ContentType="ContentType"
      :fileSize="fileSize"
      @upload="upload"
      :videoData="videoData"
    ></video-modal>
  </div>
</template>
<script>
import videoModal from "@/components/antBase/videoModal";
import ShopModal from "@/components/antBase/SelectListModal";
import { cloneDeep } from "lodash";
export default {
  name: "MyCouponForm",
  components: {
    ShopModal,
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
    colorFilter(item) {
      switch (item) {
        case "1":
          return "红色";
        case "2":
          return "黄色";
        case "3":
          return "绿色";
        default:
          return "双色";
      }
    },
    listStyleFilter(item) {
      switch (item) {
        case "0":
          return "大图模式 (*建议355*95像素尺寸)";
        case "1":
          return "一行两个 (*建议173*95像素尺寸)";
        case "2":
          return "一行三个 (*建议114*123像素尺寸)";
        case "3":
          return "横向滑动 (*建议200*80像素尺寸)";
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
  },
  data() {
    return {
      timer: null,
      openlist: [],
      tabType: 1,
      pageModalVisible: false,
      currentRecord: {},
      formDataObject: {},
      modalColumns: [
        { title: "优惠券名称", dataIndex: "couponName", key: "couponName" },
        {
          title: "优惠金额单位元",
          dataIndex: "couponAmount",
          key: "couponAmount",
          customRender: (text, row) => {
            if (text < 0) {
              if (row.mostDiscount * 1 > 0) {
                return (
                  row.discountRatio +
                  "折券" +
                  ",最多优惠" +
                  (row.mostDiscount * 1).toFixed(2) +
                  "元"
                );
              } else {
                return row.discountRatio + "折券" + ",无上限";
              }
            } else {
              return text;
            }
          },
        },
        {
          title: "优惠券库存",
          dataIndex: "couponStocks",
          key: "couponStocks",
          customRender: (text, row) => {
            if (text < 0) {
              return "不限量";
            } else {
              return text;
            }
          },
        },
        { title: "领取结束时间", dataIndex: "getEndTime", key: "getEndTime" },
      ],
      resUrl: "/coupon/mini/page",
      visibleModal: false,
      ContentType: "image",
      fileSize: 3,
      videoData: {},
      params: {
        // benefits: 1,
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
    onChange(e) {
      console.log("radio checked", e.target.value);
    },
    // addLinkPage (item) {
    //   // 开启产品选择弹窗，以便配置跳转链接
    //   // this.currentImageItem = item
    //   this.pageModalVisible = true
    // },
    selectedPage(val) {
      console.log("select", val);

      this.formDataObject.shopList = [];

      val.map((item) => {
        let nowD = new Date();
        let endD = new Date(item.getEndTime);
        let type = endD > nowD;
        this.formDataObject.shopList.push({
          id: item.id,
          couponName: item.couponName, // 优惠券名称
          couponDesc: item.couponDesc, // 优惠券说明
          useEndTime: item.useEndTime, // 使用结束时间
          getEndTime: item.getEndTime, // 结束时间
          getEndTimeType: type, // 优惠券领取时间状态
          couponFullMoney: item.couponFullMoney, // 使用门槛，订单金额满多少可使用，单位：元
          couponAmount: item.couponAmount, // 优惠券金额，单位：元
          couponOwnWay: item.couponOwnWay, // 优惠券领取方式
          getStartTime: item.getStartTime,
          useStartTime: item.useStartTime,
          couponStatus: item.couponStatus, //优惠券状态(0:未使用；1：已使用;2：已失效)
          useTimeType: item.useTimeType,
          receiveDaysAble: item.receiveDaysAble, //有效天数
          discountRatio: item.discountRatio, //折扣
          mostDiscount: item.mostDiscount, //折扣最多优惠多少钱
        });
      });

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
      // if (this.formDataObject.shopList.length >= 10) {
      //   this.$message.warning("最多添加10个优惠券");
      //   return false;
      // }
      this.openModalAdd();
    },
    openModalAdd() {
      this.openlist = this.formDataObject.shopList;
      this.pageModalVisible = true;
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
    upload(val) {
      this.visibleModal = false;
      this.videoData = val;
      // this.formDataObject.imgUrl = url
      this.$set(this.formDataObject, "imgUrl", val.fileUrl);
    },
    // 关闭上传组件
    // closeInfoModal () {
    //   this.visibleModal = false
    // }
    go() {
      let routeData = this.$router.resolve({
        name: "CustomerList",
      });
      window.open(routeData.href, "_blank");
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
.seaction {
  padding: 5px;
  .header {
    .title {
      height: 20px;
      font-size: 14px;
      font-family: Helvetica;
      color: #999999;
      line-height: 20px;
    }
    .add_nav {
      width: 100%;
      height: 180px;
      padding: 8px;
      background: #f0f2f5;
      border-radius: 2px;
      ::-webkit-scrollbar {
        width: 0;
        height: 0;
        background-color: transparent;
      }
      .list {
        width: 100%;
        height: 90px;
        overflow-x: hidden;
        overflow-y: scroll;
        background: #f0f2f5;
        padding: 5px;
        .icard {
          position: relative;
          width: 320px;
          margin: 0 auto;
          background: #ffffff;
          cursor: pointer;
          display: flex;
          justify-content: flex-start;
          margin-bottom: 5px;
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
          span {
            display: inline-block;
            height: 30px;
            line-height: 30px;
          }
          .iconfont {
            margin-right: 5px;
          }
        }
      }
      .add_t {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
        div {
          height: 20px;
          line-height: 20px;
          font-size: 12px;
        }
      }
      .tip {
        width: 108px;
        height: 17px;
        font-size: 12px;
        font-family: Helvetica;
        color: #cccccc;
        line-height: 14px;
      }
    }
  }
  .card_icon {
    position: relative;
    // display: inline-block;
    width: 320px;
    height: 95px;
    background: #f6f7f8;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    cursor: pointer;
    margin: 0 auto;
    overflow: hidden;
    background-size: 100% auto !important;
    background-position: 50% 50% !important;
    video {
      width: 100%;
      height: 100%;
    }
    img {
      width: 100%;
      // height: 100%;
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
.list_con {
  .one {
    display: inline-block;
    color: #999;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    margin-right: 20px;
  }
  .listStyle {
    .s_cololr {
      line-height: 30px;
      span {
        display: inline-block;
        border: 1px solid #ededed;
        span {
          border-radius: 20px;
          width: 14px;
          height: 14px;
        }
      }
      .radio_b {
        cursor: pointer;
        width: 22px;
        height: 22px;
        text-align: center;
        line-height: 23px;
        border-radius: 100%;
        margin-left: 5px;
        .color_o {
          background: #fb5324;
        }
        .color_t {
          background: #ff8c01;
        }
        .color_th {
          background: linear-gradient(137deg, #9fbfa7 0%, #799680 100%);
        }
      }
      .radio_bs {
        width: 32px;
        border-radius: 11px;
        .r_o {
          width: 13px;
          height: 14px;
          background: #2a2d4c;
          border-radius: 11px 0px 0px 11px;
          margin-right: -1px;
        }
        .r_t {
          width: 12px;
          height: 14px;
          background: #f7c86e;
          border-radius: 0px 11px 11px 0px;
          margin-left: -1px;
        }
      }
      .check_color {
        background: #e0edff;
        border: 1px solid #016dff;
        filter: blur(0px);
      }
    }
    .txt_one {
      display: inline-block;
      height: 30px;
      line-height: 30px;
    }
    .iconfont {
      cursor: pointer;
    }
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
    .list_type {
      color: #999999;
      margin-right: 5px;
    }
    .icon_btn_check {
      background: #e0edff;
      border: 1px solid #016bff;
      color: #016bff;
      .iconfont {
        color: #016bff;
      }
    }
    .one_f {
      height: 30px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 30px;
    }
    .btn_s {
      width: 58px;
      font-size: 26px;
      text-align: center;
    }
  }
  .icon_btn {
    display: inline-block;
    cursor: pointer;
    width: 40px;
    height: 28px;
    line-height: 28px;
    border: 1px solid #e6e6e6;
    text-align: center;
    font-size: 32px;
    border-radius: 3px;
  }
  .mSize {
    width: 100px;
    font-size: 12px;
    color: #333333;
    height: 30px;
    line-height: 28px;
    text-align: center;
  }
  .check_list {
    height: 32px;
    line-height: 32px;
  }
  .check_radio {
    height: 32px;
    line-height: 32px;
    display: flex;
    align-items: center;
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
}
.margT10 {
  margin-top: 15px;
}
.flex_btween {
  display: flex;
  justify-content: space-between;
}
.flex_start {
  display: flex;
  justify-content: flex-start;
}
</style>

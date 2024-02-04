<template>
  <div>
    <div class="my_tab" v-if="formData.shopListType == 2">
      <div>
        <!-- @prevClick="callback" @nextClick="callback" -->
        <a-tabs
          default-active-key="1"
          :tab-position="'top'"
          @change="changeTab"
        >
          <a-tab-pane
            v-for="(item, i) in formData.shopList"
            :key="i"
            :tab="item.groupName"
          ></a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <div class="myCommodity" :style="pageStyle">
      <div :class="formData.listStyle | imgStyleClass">
        <div
          v-for="(item, i) in list"
          :key="i"
          :class="[
            'icard',
            formData.shopType == '0' ? '' : 'shadow',
            formData.angleType == '0'
              ? ''
              : formData.angleType == '1' && formData.angleNum == '1'
              ? 'angleTypetwo'
              : formData.listStyle == '4'
              ? 'imgRadius1'
              : 'angleTypefour',
            ,
          ]"
          :style="imgStyle"
        >
          <div
            :class="[
              formData.angleType == '0'
                ? ''
                : formData.listStyle == '4'
                ? 'imgRadius1'
                : 'imgRadius',
              formData.angleType == '1' && formData.angleNum == '1'
                ? 'two'
                : 'four',
            ]"
            :style="cardBox"
          >
            <div
              class="icard_img"
              :style="icardStyle"
              :class="[
                formData.angleType == '0'
                  ? ''
                  : formData.listStyle == '4'
                  ? ''
                  : 'imgRadius1',
                formData.angleType == '1' && formData.angleNum == '1'
                  ? 'two'
                  : 'four',
              ]"
            >
              <div
                v-if="formData.badgeType == 1 && formData.shopBadge"
                class="orientation hotShop"
              >
                热
                <br />销
              </div>
              <div
                v-if="formData.badgeType == 2 && formData.shopBadge"
                class="orientation newShop"
              >
                新品
              </div>
              <div
                v-if="formData.badgeType == 3 && formData.shopBadge"
                class="orientation corner"
                :style="{
                  background: `url(${formData.badgeImgUrl}) no-repeat 50% 50% / cover`,
                }"
              ></div>
              <!-- <img
                :src="formData.badgeImgUrl"
                alt
                v-if="formData.badgeType == 3 && formData.shopBadge"
                class="orientation corner"
              />-->
              <div
                :class="[
                  'shop-img',
                  formData.angleType == '1'
                    ? formData.listStyle == '4'
                      ? ''
                      : 'imgRadius'
                    : '',
                ]"
                :style="{
                  backgroundImage: 'url(' + item.goodsPicture + ')',
                  backgroundSize:
                    formData.imgFill == '0' || formData.listStyle == '5'
                      ? 'cover'
                      : 'contain',
                }"
              ></div>
              <!-- <img
                :class="formData.angleType == '0' ? '' : 'imgRadius'"
                :src="item.goodsPicture"
                alt
              />-->
            </div>
            <div class="text" v-if="formData.listStyle != 4">
              <h3
                :class="[
                  'title',
                  formData.titleThickness == 'normal' ? '' : 'txtBold',
                ]"
                v-if="formData.shopName"
              >
                {{ item.goodsName }}
              </h3>
              <div
                :class="[
                  'tip',
                  formData.titleThickness == 'normal' ? '' : 'txtBold',
                ]"
                v-if="formData.shopDescription"
              >
                {{ item.goodsTitle }}
              </div>
              <div
                v-if="formData.shopOriginalPrices"
                :class="[
                  'tip',
                  formData.titleThickness == 'normal' ? '' : 'txtBold',
                ]"
              >
                {{ item.realSales }}
              </div>
              <div class="footer">
                <div>
                  <div v-if="formData.shopPrices">
                    &#165;{{ item.salePrice | salePriceFilters }}
                    <span class="marketPrice" v-if="formData.marketPrice">{{
                      item.marketPrice | marketPriceFilters
                    }}</span>
                  </div>
                </div>
                <div v-if="formData.shopBuyBtn">
                  <img
                    class="shopByBtn"
                    v-if="formData.btnType == 1"
                    src="@/assets/images/shop/app_icon_gouwuche@2x.png"
                    alt
                  />
                  <span v-if="formData.btnType == 2" class="shopTxt"
                    >马上抢</span
                  >
                </div>
              </div>
            </div>
            <div class="crosswise" v-else>
              <div class="titleHead">
                <div
                  :class="[
                    'title',
                    formData.titleThickness == 'normal' ? '' : 'txtBold',
                  ]"
                  v-if="formData.shopName"
                >
                  {{ item.goodsName }}
                </div>
                <div
                  :class="[
                    'tip',
                    formData.titleThickness == 'normal' ? '' : 'txtBold',
                  ]"
                  v-if="formData.shopDescription"
                >
                  {{ item.goodsTitle }}
                </div>
              </div>
              <div class="price">
                <div>
                  <div v-if="formData.shopPrices">
                    &#165;{{ item.salePrice | salePriceFilters }}
                    <span class="marketPrice" v-if="formData.marketPrice">{{
                      item.marketPrice | marketPriceFilters
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MyCommodity",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  filters: {
    salePriceFilters(item) {
      // var num = Math.floor(parseInt(item || 0) / 100);
      let num = (item * 1) / 100;
      return num.toFixed(2);
    },
    marketPriceFilters(item) {
      var num = parseInt(item || 0) / 100;
      return num.toFixed(2) > 0 ? num.toFixed(2) : "";
    },
    imgStyleClass(item) {
      switch (item) {
        case "0":
          return "";
        case "1":
          return "towImg";
        case "2":
          return "threeImg";
        case "4":
          return "";
        case "5":
          return "towImg";
        default:
          return "swiperImg";
      }
    },
  },
  computed: {
    formData() {
      return this.item.config.formData || {};
    },
    pageStyle() {
      this.computeImgWh(this.formData);
      return {
        padding: "5px " + this.formData.pagePadding + "px",
        // background: this.formData.listStyle == "4" ? "#ffffff" : "#f5f5f5",
      };
    },
    imgStyle() {
      this.computeImgWh(this.formData);
      if (this.formData.listStyle == "0" || this.formData.listStyle == "4") {
        return {
          marginBottom: this.formData.imagePadding + "px",
        };
      } else {
        return {
          padding: this.formData.imagePadding + "px",
        };
      }
    },
    icardStyle() {
      if (this.formData.listStyle != "4") {
        return {
          height: this.imgWh + "px",
        };
      } else if (this.formData.listStyle == "4") {
        let x;
        if (this.formData.imgScale == 0) {
          x = 90;
        } else if (this.formData.imgScale == 1) {
          x = 60;
        } else if (this.formData.imgScale == 2) {
          x = 45;
        } else if (this.formData.imgScale == 3) {
          x = 106;
        }
        return {
          height: this.imgWh + "px",
          width: x + "px",
          flexShrink: "0",
        };
      }
    },
    cardBox() {
      if (this.formData.listStyle == "4") {
        return {
          height: "70px",
          display: "flex",
          padding: "5px",
          // borderRadius: "0",
          background: "#F6F6F6",
          boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.1)",
        };
      }
    },
  },
  data() {
    return {
      imgWh: 108,
      list: [],
    };
  },
  created() {},
  mounted() {
    this.getList();
    // this.list = [
    //   {
    //     id: '',
    //     goodsName: '商品名称',
    //     goodsPicture: require('@images/shop/icon_middle_modalbox_banner_default.png'),
    //     salePrice: 0,
    //     goodsTitle: '商品描述占位符',
    //     realSales: 0
    //   },
    //    {
    //     id: '',
    //     goodsName: '商品名称',
    //     goodsPicture: require('@images/shop/icon_middle_modalbox_banner_default.png'),
    //     salePrice: 0,
    //     goodsTitle: '商品描述占位符',
    //     realSales: 0
    //   },
    //    {
    //     id: '',
    //     goodsName: '商品名称',
    //     goodsPicture: require('@images/shop/icon_middle_modalbox_banner_default.png'),
    //     salePrice: 0,
    //     goodsTitle: '商品描述占位符',
    //     realSales: 0
    //   }
    // ]
  },
  methods: {
    getList(i) {
      const { formData } = this;

      if (formData.shopListType == 1) {
        if (formData.checkType == "2") {
          this.list = [
            {
              id: "",
              goodsName: "商品名称",
              goodsPicture: require("@images/shop/icon_middle_modalbox_banner_default.png"),
              salePrice: 0,
              goodsTitle: "商品描述占位符",
              realSales: 0,
            },
            {
              id: "",
              goodsName: "商品名称",
              goodsPicture: require("@images/shop/icon_middle_modalbox_banner_default.png"),
              salePrice: 0,
              goodsTitle: "商品描述占位符",
              realSales: 0,
            },
            {
              id: "",
              goodsName: "商品名称",
              goodsPicture: require("@images/shop/icon_middle_modalbox_banner_default.png"),
              salePrice: 0,
              goodsTitle: "商品描述占位符",
              realSales: 0,
            },
          ];
        } else {
          if (formData.imageList && formData.imageList.length < 1) {
            this.list = [
              {
                id: "",
                goodsName: "商品名称",
                goodsPicture: require("@images/shop/icon_middle_modalbox_banner_default.png"),
                salePrice: 0,
                goodsTitle: "商品描述占位符",
                realSales: 0,
              },
            ];
          } else {
            this.list = formData.imageList;
          }
        }
        return;
      }
      if (formData.shopList && formData.shopList.length < 1) {
        this.list = [];
      } else {
        this.list = [
          {
            id: "",
            goodsName: "商品名称",
            goodsPicture: require("@images/shop/icon_middle_modalbox_banner_default.png"),
            salePrice: 0,
            goodsTitle: "商品描述占位符",
            realSales: 0,
          },
          {
            id: "",
            goodsName: "商品名称",
            goodsPicture: require("@images/shop/icon_middle_modalbox_banner_default.png"),
            salePrice: 0,
            goodsTitle: "商品描述占位符",
            realSales: 0,
          },
          {
            id: "",
            goodsName: "商品名称",
            goodsPicture: require("@images/shop/icon_middle_modalbox_banner_default.png"),
            salePrice: 0,
            goodsTitle: "商品描述占位符",
            realSales: 0,
          },
        ];
      }
      // if (formData.shopListType == 1) return
      // var pageSize = 1000
      // if (!formData.showAllShop) pageSize = formData.shopList[i].shopNumber
      // this.$get('goods/page', {
      //   current: 1,
      //   size: pageSize,
      //   goodsGroupId: formData.shopList[i].id
      // }).then((res) => {
      //   if (res && res.returnCode == 1000) {
      //     this.list = res.dataInfo.records.map((item) => {
      //       return {
      //         id: item.id,
      //         goodsName: item.goodsName,
      //         goodsPicture: item.goodsPicture,
      //         salePrice: item.salePrice,
      //         goodsTitle: item.goodsDetails,
      //         realSales: item.realSales
      //       }
      //     })
      //   }
      // })
    },
    // 计算图片高度
    computeImgWh(formData) {
      let pageWh = 108;
      switch (formData.listStyle) {
        case "0":
          pageWh = 375 - formData.pagePadding * 2;
          break;
        case "1":
          pageWh =
            (375 - formData.pagePadding * 2 - formData.imagePadding * 4) * 0.5;
          break;
        case "2":
          pageWh =
            (375 - formData.pagePadding * 2 - formData.imagePadding * 6) * 0.33;
          break;
        case "3":
          pageWh =
            (375 - formData.pagePadding * 2 - formData.imagePadding * 6) *
            0.33 *
            0.96;
          break;
        case "5":
          pageWh =
            (375 - formData.pagePadding * 2 - formData.imagePadding * 4) * 0.5;
          break;
      }
      switch (formData.imgScale) {
        case "0":
          this.imgWh = (pageWh / 3) * 2;
          break;
        case "1":
          this.imgWh = pageWh;
          break;
        case "2":
          this.imgWh = (pageWh / 3) * 4;
          break;
        case "3":
          this.imgWh = (pageWh / 16) * 9;
          break;
        default:
          this.imgWh = (pageWh / 3) * 2;
      }
      if (formData.listStyle == 4) {
        this.imgWh = 60;
      }
    },
    changeTab(e) {
      console.log(e);
      // this.getList(e - 1)
    },
  },
  watch: {
    item: {
      handler(n, o) {
        var formData = n.config.formData;
        console.log(formData);
        this.computeImgWh(formData);
        this.getList();
      },
      deep: true,
    },
  },
};
</script>
<style lang="less" scoped>
.myCommodity {
  min-height: 20px;
  // background: rgb(245, 245, 245);
  box-sizing: border-box;
  white-space: nowrap;
}
.icard {
  box-sizing: border-box;
  margin: 0 auto;
  flex-shrink: 0;
  // background: #fff;
  > div {
    height: 100%;
    background: #fff;
  }
}
.icard_img {
  position: relative;
  width: 100%;
  background: #fff;
  img {
    width: 100%;
    height: 100%;
  }
  .corner {
    width: 25px;
    height: 25px;
  }
}
.imgOne {
  height: calc(375px / 3 * 2);
}
.imgTwo {
  height: calc(375px * 0.45);
}
.imgThree {
  height: calc(375px * 0.45 / 3 * 4);
}
.imgfour {
  height: calc((375px-) * 0.45 / 16 * 9);
}
.towImg,
.threeImg,
.swiperImg {
  display: flex;
  justify-content: flex-start;
  // align-items:flex-start;
  flex: 1;
  flex-wrap: wrap;
  .shopByBtn {
    width: 16px;
    height: 16px;
  }
  .shopTxt {
    height: 18px;
    line-height: 18px;
    width: 50px;
    text-align: center;
    font-size: 12px;
  }
  .icard {
    margin: 0;
    width: 50%;
  }
  .title {
    font-size: 13px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .tip {
    font-size: 13px;
    height: 18px;
    line-height: 18px;
  }
  .footer {
    font-size: 13px;
    .marketPrice {
      font-size: 8px;
    }
  }
}
.threeImg {
  // flex-wrap: nowrap;
  overflow: hidden;
  .icard {
    width: 33%;
  }
  .title {
    font-size: 10px;
  }
  .tip {
    font-size: 10px;
    height: 16px;
    line-height: 16px;
  }
  .footer {
    font-size: 10px;
    .marketPrice {
      font-size: 8px;
    }
  }
  .shopTxt {
    font-size: 10px;
  }
}
.swiperImg {
  flex-wrap: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
  .icard {
    width: 33%;
    > div {
      width: 96%;
      margin: 0 auto;
    }
  }
  .title {
    font-size: 10px;
  }
  .tip {
    font-size: 10px;
    height: 16px;
    line-height: 16px;
  }
  .footer {
    font-size: 10px;
    .marketPrice {
      font-size: 8px;
    }
  }
}
.text {
  padding: 8px;
}
.title {
  font-size: 16px;
  color: #333333;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tip {
  font-size: 14px;
  color: #999999;
  letter-spacing: 0;
  line-height: 16px;
  // height:32px;
  // line-height:32px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.footer {
  font-size: 20px;
  color: #191919;
  display: flex;
  justify-content: space-between;
  .marketPrice {
    font-size: 12px;
  }
}
.shadow {
  box-shadow: 0 0 10px -3px #999;
}
.angleType {
  border-radius: 10px;
}
.angleTypetwo {
  // border-radius: 10px 10px 0 0;
  border-radius: 10px;
}
.angleTypefour {
  border-radius: 10px;
}
.imgRadius {
  border-radius: 10px 10px 0 0;
  &.two {
    // border-radius: 10px 10px 0 0;
    border-radius: 10px;
  }
  &.four {
    border-radius: 10px;
  }
}
.imgRadius1 {
  border-radius: 7px 7px 0 0;
  &.two {
    // border-radius: 7px 7px 0 0;
    border-radius: 7px;
  }
  &.four {
    border-radius: 7px;
  }
}
.txtBold {
  font-weight: 700 !important;
}
.shopByBtn {
  width: 24px;
  height: 24px;
}

.shopTxt {
  display: inline-block;
  width: 70px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  background: #191919;
  border-radius: 14px;
  color: #ffffff;
  font-size: 16px;
}
.orientation {
  position: absolute;
  top: 8px;
  left: 0px;
  text-align: center;
}
.shop-img {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.newShop {
  // width:30px;
  background: #191919;
  padding: 0 8px;
  border-radius: 0 20px 20px 0;
  color: #fff;
  height: 20px;
  line-height: 20px;
}
.hotShop {
  width: 20px;
  top: 8px;
  left: 4px;
  text-align: center;
  background: #d1b085;
  color: #fff;
  border-radius: 5px;
  // height:30px;
  font-size: 12px;
  // white-space: wra;
}
.upload_wrap {
  width: 80px;
  height: 80px;
}
.my_tab {
  /deep/.ant-tabs-bar {
    margin: 0;
  }
}
.crosswise {
  flex-grow: 1;
  padding: 10px 0 10px 10px;
  box-sizing: border-box;
  display: flex;
  .titleHead {
    flex-grow: 1;
    width: 0;
    .title {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 4px;
    }
    .tip {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .price {
    flex-shrink: 0;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 20px;
    margin-left: 4px;
    display: flex;
    align-items: center;
    .marketPrice {
      font-size: 12px;
    }
  }
}
.marketPrice {
  text-decoration: line-through;
  color: #999999;
}
</style>

<template>
  <div ref="mall" class="my_Mall" :style="Height">
    <div
      :class="formData.listStyle == 1 ? 'styleOne' : 'styleTwo'"
      :style="[
        {
          height:
            formData.goodsList.length > 0 && formData.listStyle == 1
              ? heightNum > heightNum2
                ? heightNum + 10 + 'px'
                : heightNum2 + 10 + 'px'
              : '',
        },
        Height,
      ]"
    >
      <div
        class="GoodsItem"
        v-for="(item, index) in formData.goodsList.length > 0
          ? formData.goodsList
          : defaultGoodsList"
        :key="index"
        :style="style"
      >
        <div class="ImgBox" :style="borderRadiusTop">
          <div style="background: #fff" :style="borderRadiusTop">
            <div
              class="goodsImg"
              :style="[
                {
                  background: `url(${item.goodsImgUrl}) no-repeat 50% 50%/cover`,
                },
                borderRadiusTop,
              ]"
            >
              <div class="coupontype" v-if="item.goodsType == 2">
                {{ item.couponType | couponType }}
              </div>
              <div class="couponRule" v-if="item.goodsType == 2">
                <div v-if="item.couponAmount * 1 > 0">
                  <div v-if="item.couponFullMoney > 0">
                    满{{ item.couponFullMoney | salePriceFilters }}元减{{
                      item.couponAmount | salePriceFilters
                    }}元
                  </div>
                  <div v-if="item.couponFullMoney <= 0">不限制</div>
                </div>
                <div v-else>
                  <div v-if="item.couponFullMoney > 0">
                    满{{ parseFloat(item.couponFullMoney) }}元享{{
                      item.discountRatio
                    }}折
                  </div>
                  <div v-if="item.couponFullMoney <= 0">
                    无门槛享受{{ item.discountRatio }}折扣
                  </div>
                </div>
              </div>
              <div class="tag" v-if="item.goodsType == 2">
                <div>{{ item.couponType | couponType }}兑换卡</div>
              </div>
            </div>
          </div>
        </div>
        <div class="goodText" :style="borderRadiusBottom">
          <div class="goodsName">
            {{ item.goodsName }}
          </div>
          <div class="goodsInfo">
            <div class="num" :style="width">
              <div class="integralNum" v-if="formData.integralNum">
                <div v-if="item.paymentWay == 2 && item.salePrice > 0">
                  ¥{{ parseFloat(((item.salePrice * 1) / 100).toFixed(2)) }}+{{
                    item.integralNum
                  }}
                  <span class="text">积分</span>
                </div>
                <div v-else>
                  {{ item.integralNum }} <span class="text">积分</span>
                </div>
              </div>
              <div
                class="goodsPrice"
                v-if="formData.originalPrice && item.goodsType == 1"
              >
                {{ parseFloat(((item.goodsPrice * 1) / 100).toFixed(2)) }}
              </div>
            </div>
            <div class="exchangeBtn" v-if="formData.exchangeBtn">兑换</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "IntegralMall",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  filters: {
    couponType(item) {
      switch (item) {
        case 0:
          return "满减券";
        case 1:
          return "满减券";
        case 2:
          return "折扣券";
        case 3:
          return "满减券";
        case 4:
          return "折扣券";
        default:
          return "满减券";
      }
    },
    salePriceFilters(item) {
      // console.log(item, "5555555555555555555555");
      // var num = parseInt(item || 0) / 100;
      // return num.toFixed(2);
      return item;
    },
  },
  computed: {
    formData() {
      this.initNum++;
      if (this.item.config.formData && this.initNum <= 1) {
        const PromiseList = [];

        if (this.item.config.formData.goodIds.length > 0) {
          const a = this.$post("/goods/queryGoodsByIds", {
            ids: this.item.config.formData.goodIds,
          });
          PromiseList.push(a);
        }
        if (this.item.config.formData.couponIds.length > 0) {
          let ids = "";
          this.item.config.formData.couponIds.forEach((item, index) => {
            if (index + 1 == this.item.config.formData.couponIds.length) {
              ids += item;
            } else {
              ids += item + ",";
            }
          });
          const b = this.$get("/coupon/querybyids", {
            ids: ids,
          });
          PromiseList.push(b);
        }
        Promise.all(PromiseList).then((res) => {
          res.forEach((item) => {
            if (item.dataInfo.type && item.dataInfo.type == "GOODS") {
              this.goodsInfo = item.dataInfo.goodsAndCouponResponseList;
            } else {
              this.couponInfo = item.dataInfo;
            }
          });

          this.item.config.formData.goodIds = this.goodsInfo.map((item) => {
            return item.id;
          });
          this.item.config.formData.couponIds = this.couponInfo.map((item) => {
            return item.id;
          });
          this.item.config.formData.goodsList.forEach((item) => {
            if (item.goodsType == 1) {
              this.goodsInfo.forEach((l) => {
                if (item.id == l.id) {
                  item.goodsType = 1;
                  item.goodsImgUrl = l.goodsPictures;
                  item.goodsName = l.goodsName;
                  item.integralNum = l.integralPrice || 0;
                  item.salePrice = l.salePrice || 0;
                  item.goodsPrice = l.marketPrice || 0;
                  item.paymentWay = l.paymentWay;
                  item.id = l.id;
                }
              });
            } else {
              this.couponInfo.forEach((l) => {
                if (
                  item.id == l.id &&
                  l.couponIngStatus == "进行中" &&
                  l.couponStatus == 0
                ) {
                  item.goodsType = 2;
                  item.goodsImgUrl = require("@/assets/images/default/qietu_xiangqing_manjianquan@2x.png");
                  item.goodsName = l.couponName;
                  item.couponType = l.couponType;
                  item.integralNum = l.redeemAmount;
                  item.id = l.id;
                  item.couponFullMoney = l.couponFullMoney;
                  item.couponAmount = l.couponAmount;
                  item.discountRatio = l.discountRatio;
                  item.mostDiscount = l.mostDiscount;
                }
              });
            }
          });
          let allIds = this.item.config.formData.goodIds.concat(
            this.item.config.formData.couponIds
          );
          this.item.config.formData.goodsList =
            this.item.config.formData.goodsList.filter((item) => {
              let num = 0;
              allIds.forEach((l) => {
                if (item.id == l) num++;
              });
              if (num > 0) {
                return true;
              } else {
                return false;
              }
            });
          this.item.config.formData.allIds =
            this.item.config.formData.goodsList.map((item) => {
              return item.id;
            });

          console.log(this.item.config.formData.allIds, "00000000000000");
        });
      }

      return this.item.config.formData || {};
    },
    Height() {
      const num = this.item.config.formData.goodsList.length;
      const obj = {...this.item.config.formData}
      if (this.formData.listStyle == 1) {
        // console.log("2222222222222222222222222");
        this.heightNum = 1;
        this.heightNum2 = 1;
        this.$nextTick(() => {
          const dom = this.$refs.mall;

          // const GoodsList = document.querySelectorAll(".GoodsItem");
          const GoodsList = dom.querySelectorAll(".GoodsItem");
          GoodsList.forEach((item, index) => {
            if (index % 2 === 0) {
              this.heightNum = this.heightNum + item.offsetHeight + 10;
            } else {
              this.heightNum2 = this.heightNum2 + item.offsetHeight + 10;
            }
          });
        });
      }
      return {};
    },
    style() {
      return { borderRadius: this.formData.listStyle == 1 ? "7px" : "" };
    },
    width() {
      if (this.formData.listStyle == 1) {
        if (this.formData.exchangeBtn) {
          return {
            width: "100px",
          };
        } else {
          return {
            width: "140px",
          };
        }
      } else {
        return {};
      }
    },
    borderRadiusTop() {
      if (this.formData.borderRounding == 2 && this.formData.listStyle == 1) {
        return {
          borderRadius: "7px 7px 0 0",
        };
      }
      if (this.formData.listStyle == 2) {
        return {
          borderRadius: "7px",
        };
      }
    },
    borderRadiusBottom() {
      if (this.formData.borderRounding == 2 && this.formData.listStyle == 1) {
        return {
          borderRadius: "0 0 7px 7px",
        };
      }
    },
  },
  data() {
    return {
      initNum: 0,
      goodsInfo: [],
      couponInfo: [],
      heightNum: 0,
      heightNum2: 0,
      defaultGoodsList: [
        {
          goodsImgUrl: require("@/assets/images/default/default_img_3_2@2x.png"),
          goodsName: "这里显示商品名称",
          integralNum: 999,
          goodsPrice: 9900,
          goodsType: 1,
        },
        {
          goodsImgUrl: require("@/assets/images/default/default_img_3_2@2x.png"),
          goodsName: "这里显示商品名称,最多显示两行",
          integralNum: 999,
          goodsType: 1,
          goodsPrice: 9900,
        },
        {
          goodsImgUrl: require("@/assets/images/default/default_img_3_2@2x.png"),
          goodsName: "这里显示商品名称,最多显示两行",
          integralNum: 999,
          goodsType: 1,
          goodsPrice: 9900,
        },
        {
          goodsImgUrl: require("@/assets/images/default/default_img_3_2@2x.png"),
          goodsName: "这里显示商品名称",
          integralNum: 999,
          goodsType: 1,
          goodsPrice: 9900,
        },
      ],
    };
  },
};
</script>
<style lang="less" scoped>
.my_Mall {
  width: 100%;
  .styleOne {
    display: flex;
    // flex-wrap: wrap;
    // justify-content: space-between;
    flex-flow: column wrap;
    align-content: space-between;
    height: 600px;
    padding: 0 16px;
    .GoodsItem {
      flex-shrink: 0;
      width: 160px;
      margin-top: 10px;
      .ImgBox {
        background: #fff;
        .goodsImg {
          width: 160px;
          height: 160px;
          position: relative;
          .tag {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 30px;
            text-align: center;
            font-size: 16px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            line-height: 30px;
            color: #ffffff;
            background: linear-gradient(180deg, #707070 0%, #464646 100%);
          }
          .coupontype {
            position: absolute;
            top: 46px;
            text-align: center;
            width: 100%;
            font-size: 15px;
            color: #fff;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
          }
          .couponRule {
            position: absolute;
            top: 76px;
            text-align: center;
            width: 100%;
            font-size: 12px;
            color: #fff;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            transform: scale(0.85);
          }
        }
      }
      .goodText {
        background: #fff;
        width: 100%;
        // height: 86px;
        padding: 5px 5px 22px 12px;
        .goodsName {
          width: 100%;
          font-size: 20px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 600;
          color: #333333;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .goodsInfo {
          margin-top: 10px;
          // height: 27px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          .num {
            display: flex;
            align-items: flex-end;
            flex-shrink: 0;
            width: 100px;
            flex-wrap: wrap;

            .integralNum {
              // width: 100%;
              font-size: 18px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #191919;
              display: flex;
              align-items: flex-end;
              white-space: nowrap;
              line-height: 18px;
              overflow: hidden;
              .text {
                font-size: 10px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #191919;
                margin-left: -5px;
                // margin-top: 2px;
              }
            }
            .goodsPrice {
              font-size: 10px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #999999;
              text-decoration: line-through;
              // margin-top: 2px;
              margin-left: 5px;
              vertical-align: bottom;
            }
          }
          .exchangeBtn {
            flex-shrink: 0;
            width: 40px;
            height: 20px;
            background: #d1b085;
            border-radius: 10px;
            font-size: 12px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #ffffff;
            line-height: 20px;
            text-align: center;
          }
        }
      }
    }
  }
}
.styleOne::before,
.styleOne::after {
  content: "";
  flex-basis: 100%;
  width: 0;
  order: 2;
}
.GoodsItem:nth-child(2n + 1) {
  order: 1;
}
.GoodsItem:nth-child(2n) {
  order: 2;
}
.styleTwo {
  width: 100%;
  .GoodsItem {
    width: 100%;
    padding: 15px 0 0 15px;
    display: flex;
    .ImgBox {
      padding-bottom: 15px;
      flex-shrink: 0;
      .goodsImg {
        width: 80px;
        height: 80px;
        border-radius: 7px;
        position: relative;
        .coupontype {
          position: absolute;
          top: 18px;
          text-align: center;
          width: 100%;
          font-size: 15px;
          color: #fff;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          transform: scale(0.55);
        }
        .couponRule {
          position: absolute;
          top: 33px;
          text-align: center;
          width: 100%;
          font-size: 12px;
          color: #fff;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          transform: scale(0.55);
        }
        .tag {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 20px;
          text-align: center;
          font-size: 12px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          line-height: 20px;
          color: #ffffff;
          background: linear-gradient(180deg, #707070 0%, #464646 100%);
          border-radius: 0 0 7px 7px;
          div {
            transform: scale(0.85);
          }
        }
      }
    }
    .goodText {
      margin-left: 15px;
      flex-grow: 1;
      width: 100%;
      // height: 86px;
      padding: 0 15px 15px 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-bottom: 1px solid #e6e6e6;
      .goodsName {
        width: 100%;
        font-size: 20px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: #333333;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .goodsInfo {
        margin-top: 10px;
        height: 27px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .num {
          display: flex;
          align-items: center;
          .integralNum {
            font-size: 20px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #191919;
            display: flex;
            align-items: center;
            .text {
              font-size: 10px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #191919;
              margin-left: -5px;
              margin-top: 2px;
            }
          }
          .goodsPrice {
            font-size: 10px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            text-decoration: line-through;
            margin-left: 5px;
            margin-top: 6px;
          }
        }
        .exchangeBtn {
          width: 40px;
          height: 20px;
          background: #d1b085;
          border-radius: 10px;
          font-size: 12px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
          line-height: 20px;
          text-align: center;
        }
      }
    }
  }
}
</style>
<template>
  <div class="my_coupon">
    <div class="card_list">
      <div :class="formData.cardType == 2 ? 'my_custom' : 'my_system'">
        <div :class="formData.listStyle | listFilter">
          <div
            v-show="
              formData.invalid ? (item.couponStatus == 0 ? true : false) : true
            "
            :class="[
              'oneImg',
              formData.cardStyle == 2 ? 'imgTypeTwo' : 'imgTypeOne',
            ]"
            v-for="(item, i) in formData.shopList"
            :key="i"
          >
            <!-- <div class="firstPart"> -->
            <div
              class="card"
              :class="formData.color | imgStyleClass"
              :style="{ background: bmImg ? `url(${bmImg}) no-repeat` : '' }"
            >
              <!-- <div class="bgImgBox" v-if="bmImg">
                <img :src="bmImg" class="bgImg" />
              </div> -->
              <div
                v-if="formData.cardType == 2 && formData.listStyle != '2'"
                class="card_ad"
                style="z-index: 55"
              >
                <span class="card_rt"></span>
                <span class="card_r"></span>
                <span class="card_rb"></span>
              </div>
              <div
                class="price"
                style="z-index: 55"
                v-if="item.couponAmount * 1 > 0"
              >
                &yen;{{ item | dealPrice }}
              </div>
              <div class="price" style="z-index: 55" v-else>
                {{ item | dealPrice }}
              </div>
              <div class="details" style="z-index: 55">
                <div class="name" v-if="formData.name == '1'">
                  {{ item.couponName }}
                </div>
                <div class="limitation" v-if="formData.deadline == '1'">
                  <template v-if="item.useTimeType == 2">
                    领取{{ item.receiveDaysAble }}天内有效
                  </template>
                  <template v-else-if="item.useTimeType == 3">
                    永久有效
                  </template>
                  <template v-else>
                    有效期至{{ item.useEndTime | dateFliter }}
                  </template>
                </div>
                <div v-if="item.couponAmount * 1 > 0">
                  <div
                    v-if="
                      formData.fullReduce == '1' && item.couponFullMoney > 0
                    "
                    class="fullReduce"
                  >
                    满{{ item.couponFullMoney | salePriceFilters }}元减{{
                      item.couponAmount | salePriceFilters
                    }}元
                  </div>
                  <div
                    v-if="
                      formData.fullReduce == '1' && item.couponFullMoney <= 0
                    "
                    class="fullReduce"
                  >
                    无门槛
                  </div>
                </div>
                <div v-else>
                  <div class="fullReduce" v-if="item.mostDiscount * 1 > 0">
                    最多优惠{{ (item.mostDiscount * 1).toFixed(2) }}元
                  </div>
                  <div v-else class="fullReduce">无上限</div>
                </div>
              </div>
              <div class="btn" style="z-index: 55">领取</div>
            </div>
            <div class="twoImg" v-if="formData.regulation == '1'">
              <div class="flex_between">
                <div class="title">使用规则</div>
                <div class="iconfont icon-arrow"></div>
              </div>
              <div class="marT10 ful_list">
                <div>{{ item.couponDesc }}</div>
                <!-- <div class="marT10">2、到店任意消费即可兑换使用</div> -->
              </div>
            </div>
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MyCoupon",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  filters: {
    salePriceFilters(item) {
      // console.log(item, "5555555555555555555555");
      // var num = parseInt(item || 0) / 100;
      // return num.toFixed(2);
      return item;
    },
    dealPrice(item) {
      if (item.couponAmount * 1 < 0) {
        return item.discountRatio + "折券";
      } else {
        return item.couponAmount;
      }
    },
    imgStyleClass(item) {
      console.log(item, "88888888888");
      switch (item) {
        case "1":
          return "redC";
        case "2":
          return "yollowC";
        case "3":
          return "greenC";
        case "4":
          return "twoC";
        case "4":
          return "yollowC";
        default:
          return "redC";
      }
    },
    listFilter(item) {
      switch (item) {
        case "0":
          return "big_list";
        case "1":
          return "two_list";
        case "2":
          return "three_list";
        case "3":
          return "swiper_list";
        default:
          return "big_list";
      }
    },
    dateFliter(item) {
      // let ndate = new Date(item);
      // let nyear = ndate.getFullYear();
      // let nMonth =
      //   ndate.getMonth() + 1 < 10
      //     ? "0" + (ndate.getMonth() + 1)
      //     : ndate.getMonth() + 1;
      // let nday = ndate.getDay() < 10 ? "0" + ndate.getDay() : ndate.getDay();
      // console.log(nyear, nMonth, nday);
      // return `${nyear}-${nMonth}-${nday}`;
      return item ? item.substring(0, 10) : item;
    },
  },
  computed: {
    formData() {
      console.log(this.item.config.formData);
      return this.item.config.formData || {};
    },
    pageStyle() {
      return {
        padding: "5px " + this.formData.pagePadding + "px",
      };
    },
    imgStyle() {
      return {
        marginBottom: this.formData.imagePadding + "px",
      };
    },
    bmImg() {
      const { cardType, imgUrl } = this.formData;
      let url = this.myImgUrl;
      if (cardType == 2) url = imgUrl;
      console.log(url);
      return url;
    },
  },
  data() {
    return {
      imgWh: 108,
      list: [],
      myImgUrl: "",
    };
  },
  created() {},
  mounted() {},
  methods: {
    getList(i) {},
    changeTab(e) {
      console.log(e);
      // this.getList(e - 1)
    },
  },
  watch: {
    item: {
      handler(n, o) {
        var formData = n.config.formData;
        var pageWh =
          formData.listStyle == "0"
            ? 375 - formData.pagePadding * 2
            : formData.listStyle == "1"
            ? (375 - formData.pagePadding * 2) * 0.48
            : 108;
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
        // this.getList()
      },
      deep: true,
    },
  },
};
</script>
<style lang="less" scoped>
.my_coupon {
  min-height: 50px;
  padding-top: 5px;
  .card_list {
    .oneImg {
      width: 100%;
      // margin: 0 auto;
      .card {
        position: relative;
        height: 95px;
        width: 100%;
        margin-bottom: 5px;
        // background: url('~@/assets/images/shop/coupon.png');
        // background-size: auto 150% !important;
        background-position: 50% 50% !important;
        background-size: cover !important;
        background-repeat: no-repeat;
        border-radius: 5px;
        .bgImgBox {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          border-radius: 6px;
          .bgImg {
            min-width: 100%;
            max-width: 200%;
          }
        }

        .price {
          position: absolute;
          left: 18px;
          top: calc(95px / 2 - 42px / 2);
          display: inline-block;
          width: 64px;
          height: 42px;
          line-height: 42px;
          font-size: 18px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
          z-index: 999999;
        }
        .details {
          position: absolute;
          top: 10px;
          left: 82px;
          display: flex;
          flex-flow: column;
          justify-content: space-around;
          // width: 140px;
          width: 43%;
          height: 75px;
          > div {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .name {
            height: 20px;
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #ffffff;
            line-height: 20px;
          }
          .limitation {
            height: 17px;
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ffffff;
            line-height: 17px;
          }
          .fullReduce {
            height: 16px;
            font-size: 11px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ffffff;
            line-height: 16px;
          }
        }
        .btn {
          position: absolute;
          top: calc(95px / 2 - 22px / 2);
          right: 10%;
          height: 22px;
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
          line-height: 22px;
        }
      }
    }
    .twoImg {
      width: 100%;
      // height: 90px;
      background: #ffffff;
      // margin: 0 auto;
      border-radius: 0px 0px 7px 7px;
      padding: 8px 12px;
      div {
        height: 16px;
        font-size: 11px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        line-height: 16px;
      }
      .iconfont {
        transform: rotate(90deg);
      }
      .ful_list {
        // height: 16px;
        font-size: 11px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        line-height: 16px;
      }
    }
    .two_list,
    .swiper_list {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      width: 95%;
      margin: 0 auto;
      .oneImg {
        width: 49%;
        margin: 0;
        .card {
          width: 100%;
          height: 95px;
          // margin: 0;
          margin-bottom: 5px;
          .price {
            top: 10px;
            left: 10px;
            height: 36px;
            line-height: 36px;
          }
          .details {
            display: inline-block;
            top: 45px;
            left: 10px;
            width: 72%;
            height: 30px;
            div {
              white-space: nowrap;
              overflow: hidden;
              font-size: 11px;
            }
          }
          .btn {
            width: 28px;
            height: auto;
            text-align: center;
            right: 6px;
            top: 25px;
          }
        }
      }
      .name {
        display: none;
      }
      .twoImg {
        display: none;
      }
    }
    .three_list {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      width: 95%;
      // margin: 0 auto;
      .oneImg {
        width: 33%;
        // margin: 0 auto;
        .card {
          width: 100%;
          height: 123px;
          // margin: 0;
          margin-bottom: 5px;
          .price {
            position: absolute;
            width: 100%;
            left: 0;
            top: 10px;
            text-align: center;
            height: 30px;
            line-height: 30px;
          }
          .details {
            position: static;
            text-align: center;
            display: block;
            width: 100%;
            height: 45px;
            .fullReduce {
              width: 100%;
              top: 45px;
              position: absolute;
            }
            div {
              white-space: nowrap;
              overflow: hidden;
              font-size: 11px;
            }
          }
          .btn {
            position: absolute;
            width: 100%;
            margin: 0 auto;
            padding: 8px 0;
            border-top: 1px dashed #fff;
            height: auto;
            text-align: center;
            right: 0;
            bottom: 0;
            top: unset;
          }
        }
      }
      .name {
        display: none;
      }
      .twoImg {
        display: none;
      }
      .limitation {
        display: none;
      }
    }
    .three_list::after {
      width: 33%;
      content: "";
    }
    .swiper_list {
      flex-wrap: nowrap;
      overflow-x: scroll;
      overflow-y: hidden;
      width: 95%;
      margin: 0 auto;
      .oneImg {
        width: 200px;
        margin-right: 5px;
        .card {
          width: 200px;
          height: 80px;
          margin: 0;
          .price {
            height: 24px;
            line-height: 24px;
            top: 10px;
          }
          .details {
            display: inline-block;
            top: 35px;
            left: 10px;
          }
          .btn {
            right: 12px;
            top: 18px;
          }
        }
      }
    }
    .my_system {
      width: 100%;
      display: flex;
      justify-content: center;
      .imgTypeOne {
        .redC {
          // background-position: -67px -46px;
          background: url("~@images/coupon/middle_modalbox_youhuiq1_default01.png");
          background-size: 100% 100%;
        }
        .yollowC {
          // background-position: -438px -46px;
          background: url("~@images/coupon/middle_modalbox_youhuiq1_default_02.png");
          background-size: 100% 100%;
        }
        .greenC {
          // background-position: -842px -46px;
          background: url("~@images/coupon/middle_modalbox_youhuiq1_default_03.png");
          background-size: 100% 100%;
        }
        .twoC {
          background-position: -1259px -46px;
          background: url("~@images/coupon/middle_modalbox_youhuiq1_default_04.png");
          background-size: 100% 100%;
        }
      }
      .imgTypeTwo {
        .redC {
          // background-position: -67px -196px;
          // background-position: -67px -46px;
          background: url("~@images/coupon/middle_modalbox_youhuiq2_default_01.png");
          background-size: 100% 100%;
        }
        .yollowC {
          // background-position: -438px -196px;
          // background-position: -67px -46px;
          background: url("~@images/coupon/middle_modalbox_youhuiq2_default_02.png");
          background-size: 100% 100%;
        }
        .greenC {
          // background-position: -842px -196px;
          // background-position: -67px -46px;
          background: url("~@images/coupon/middle_modalbox_youhuiq2_default_03.png");
          background-size: 100% 100%;
        }
        .twoC {
          // background-position: -1259px -196px;
          // background-position: -67px -46px;
          background: url("~@images/coupon/middle_modalbox_youhuiq2_default_04.png");
          background-size: 100% 100%;
        }
      }
      .two_list {
        .imgTypeOne {
          .redC {
            // background-position: -67px -345px;
            background: url("~@images/coupon/middle_modalbox_youhuiq3_default_01.png");
            background-size: 100% 100%;
          }
          .yollowC {
            // background-position: -303px -345px;
            background: url("~@images/coupon/middle_modalbox_youhuiq3_default_02.png");
            background-size: 100% 100%;
          }
          .greenC {
            // background-position: -538px -345px;
            background: url("~@images/coupon/middle_modalbox_youhuiq3_default_03.png");
            background-size: 100% 100%;
          }
          .twoC {
            // background-position: -773px -345px;
            background: url("~@images/coupon/middle_modalbox_youhuiq3_default_04.png");
            background-size: 100% 100%;
          }
        }
        .imgTypeTwo {
          .redC {
            // background-position: -67px -494px;
            background: url("~@images/coupon/middle_modalbox_youhuiq4_default_01.png");
            background-size: 100% 100%;
          }
          .yollowC {
            // background-position: -303px -494px;
            background: url("~@images/coupon/middle_modalbox_youhuiq4_default_02.png");
            background-size: 100% 100%;
          }
          .greenC {
            // background-position: -538px -494px;
            background: url("~@images/coupon/middle_modalbox_youhuiq4_default_03.png");
            background-size: 100% 100%;
          }
          .twoC {
            // background-position: -773px -494px;
            background: url("~@images/coupon/middle_modalbox_youhuiq4_default_03备份.png");
            background-size: 100% 100%;
          }
        }
      }
      .three_list {
        .imgTypeOne {
          .redC {
            // background-position: -67px -643px;
            background: url("~@images/coupon/middle_modalbox_youhuiq5_default_01.png");
            background-size: 100% 100%;
          }
          .yollowC {
            // background-position: -241px -643px;
            background: url("~@images/coupon/middle_modalbox_youhuiq5_default_02.png");
            background-size: 100% 100%;
          }
          .greenC {
            // background-position: -426px -643px;
            background: url("~@images/coupon/middle_modalbox_youhuiq5_default_03.png");
            background-size: 100% 100%;
          }
          .twoC {
            // background-position: -625px -643px;
            background: url("~@images/coupon/middle_modalbox_youhuiq5_default_04.png");
            background-size: 100% 100%;
          }
        }
        .imgTypeTwo {
          .redC {
            // background-position: -67px -819px;
            background: url("~@images/coupon/middle_modalbox_youhuiq6_default_01.png");
            background-size: 100% 100%;
          }
          .yollowC {
            // background-position: -241px -819px;
            background: url("~@images/coupon/middle_modalbox_youhuiq6_default_02.png");
            background-size: 100% 100%;
          }
          .greenC {
            // background-position: -426px -819px;
            background: url("~@images/coupon/middle_modalbox_youhuiq6_default_03.png");
            background-size: 100% 100%;
          }
          .twoC {
            // background-position: -625px -819px;
            background: url("~@images/coupon/middle_modalbox_youhuiq6_default_04.png");
            background-size: 100% 100%;
          }
        }
      }
      .swiper_list {
        .imgTypeOne {
          .redC {
            // background-position: -67px -997px;
            background: url("~@images/coupon/middle_modalbox_youhuiq7_default_01.png");
            background-size: 100% 100%;
          }
          .yollowC {
            // background-position: -314px -997px;
            background: url("~@images/coupon/middle_modalbox_youhuiq7_default_02.png");
            background-size: 100% 100%;
          }
          .greenC {
            // background-position: -593px -997px;
            background: url("~@images/coupon/middle_modalbox_youhuiq7_default_03.png");
            background-size: 100% 100%;
          }
          .twoC {
            // background-position: -872px -997px;
            background: url("~@images/coupon/middle_modalbox_youhuiq7_default_04.png");
            background-size: 100% 100%;
          }
        }
        .imgTypeTwo {
          .redC {
            // background-position: -67px -1131px;
            background: url("~@images/coupon/middle_modalbox_youhuiq8_default_01.png");
            background-size: 100% 100%;
          }
          .yollowC {
            // background-position: -314px -1131px;
            background: url("~@images/coupon/middle_modalbox_youhuiq8_default_02.png");
            background-size: 100% 100%;
          }
          .greenC {
            // background-position: -593px -1131px;
            background: url("~@images/coupon/middle_modalbox_youhuiq8_default_03.png");
            background-size: 100% 100%;
          }
          .twoC {
            // background-position: -872px -1131px;
            background: url("~@images/coupon/middle_modalbox_youhuiq8_default_04.png");
            background-size: 100% 100%;
          }
        }
      }
      .big_list {
        width: 95%;
      }
    }
    .my_custom {
      display: flex;
      justify-content: center;
      .oneImg {
        .card {
          background-size: 100% 100%;
        }
      }
      .card_ad {
        position: absolute;
        top: 0;
        right: 29.7%;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        width: 16px;
        height: 100%;
        text-align: center;
        span {
          display: inline-block;
        }
        .card_rt {
          background: #fff;
          width: 16px;
          height: 8px;
          border-radius: 0 0 16px 16px;
        }
        .card_r {
          display: block;
          height: 60px;
          width: 1px;
          border-left: 1px dashed #fff;
          margin: 0 auto;
        }
        .card_rb {
          background: #fff;
          width: 16px;
          height: 8px;
          border-radius: 16px 16px 0 0;
        }
      }
      .two_list {
        .card_ad {
          right: 16.5%;
        }
      }
      .swiper_list {
        .card_ad {
          right: 25%;
        }
      }
      .big_list {
        width: 95%;
      }
    }
    .my_custom {
      .big_list {
        .redC {
          background: url("~@images/coupon/middle_modalbox_zidingyi_default_01.png");
          background-size: 100% 100%;
        }
        .yollowC {
          background: url("~@images/coupon/middle_modalbox_zidingyi_default_01.png");
          background-size: 100% 100%;
        }
        .greenC {
          background: url("~@images/coupon/middle_modalbox_zidingyi_default_01.png");
          background-size: 100% 100%;
        }
        .twoC {
          background: url("~@images/coupon/middle_modalbox_zidingyi_default_01.png");
          background-size: 100% 100%;
        }
      }
      .two_list {
        .redC {
          background: url("~@images/coupon/middle_modalbox_zidingyi_default_02.png");
          background-size: 100% 100%;
        }
        .yollowC {
          background: url("~@images/coupon/middle_modalbox_zidingyi_default_02.png");
          background-size: 100% 100%;
        }
        .greenC {
          background: url("~@images/coupon/middle_modalbox_zidingyi_default_02.png");
          background-size: 100% 100%;
        }
        .twoC {
          background: url("~@images/coupon/middle_modalbox_zidingyi_default_02.png");
          background-size: 100% 100%;
        }
      }
      .three_list {
        .redC {
          background: url("~@images/coupon/middle_modalbox_zidingyi_default_03.png");
          background-size: 100% 100%;
        }
        .yollowC {
          background: url("~@images/coupon/middle_modalbox_zidingyi_default_03.png");
          background-size: 100% 100%;
        }
        .greenC {
          background: url("~@images/coupon/middle_modalbox_zidingyi_default_03.png");
          background-size: 100% 100%;
        }
        .twoC {
          background: url("~@images/coupon/middle_modalbox_zidingyi_default_03.png");
          background-size: 100% 100%;
        }
      }
      .swiper_list {
        .redC {
          background: url("~@images/coupon/middle_modalbox_zidingyi_default_04.png");
          background-size: 100% 100%;
        }
        .yollowC {
          background: url("~@images/coupon/middle_modalbox_zidingyi_default_04.png");
          background-size: 100% 100%;
        }
        .greenC {
          background: url("~@images/coupon/middle_modalbox_zidingyi_default_04.png");
          background-size: 100% 100%;
        }
        .twoC {
          background: url("~@images/coupon/middle_modalbox_zidingyi_default_04.png");
          background-size: 100% 100%;
        }
      }
    }
  }

  .flex_between {
    display: flex;
    justify-content: space-between;
  }
  .marT10 {
    margin-top: 10px;
  }
}
</style>

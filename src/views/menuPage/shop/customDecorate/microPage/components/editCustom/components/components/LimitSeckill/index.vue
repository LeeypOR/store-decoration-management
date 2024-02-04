<template>
  <div
    class="limit_seckill"
    :style="{ padding: `0px  ${formData.pagePadding}px` }"
  >
    <div class="background_wrap" :style="backgroundDefaultStyle">
      <!-- <img
        class="background_image"
        :src="formData.backgroundInfo.imageUrl || defaultImage"
      /> -->

      <div class="content_wrap">
        <div class="content_wrapBox">
          <div class="info_wrap" :style="textStyle">
            <div
              class="title"
              :style="activeTitleStyle"
              v-if="formData.activeTitleShow"
            >
              {{ formData.activeTitle || "新品上市" }}
            </div>
            <div
              class="desc"
              :style="activeDescStyle"
              v-if="formData.activeDescShow"
            >
              {{ formData.description || "新品发售 抢先体验" }}
            </div>
            <div
              class="active_time"
              :style="activeTimeStyle"
              v-if="formData.showActiveTime"
            >
              {{ activeTimeString }}
              <div class="background" :style="bgStyle"></div>
              <div class="text">{{ activeTimeString }}</div>
            </div>
          </div>

          <div class="product_wrap" :style="goodsStyle">
            <div
              class="product_item"
              v-for="item of formData.productList"
              :key="item.id"
              :class="imageClassName"
              :style="itemStyle"
            >
              <div style="position: relative">
                <div class="product_status" v-if="item.activityStatu == 3">
                  已结束
                </div>
                <div
                  class="product_status"
                  v-if="
                    item.totalRemainStock &&
                    item.totalRemainStock <= 0 &&
                    item.activityStatu != 3
                  "
                >
                  已售完
                </div>
                <img
                  class="product_image"
                  :style="imageStyle"
                  :src="item.goodsPicture"
                  alt=""
                />
              </div>

              <div class="product_info" :style="productInfoStyle">
                <div
                  class="title"
                  :style="productTitleStyle"
                  v-show="formData.shopName"
                >
                  {{ item.goodsName }}
                </div>
                <div class="price_wrap" :style="priceStyle">
                  <div
                    class="price"
                    :style="{
                      justifyContent:
                        formData.textAlign === 'left' ? '' : 'center',
                    }"
                  >
                    <div class="real_price" v-show="formData.showShopPrice">
                      {{ item.realSales || "60000" | $pointToYuan }}
                    </div>
                    <div class="old_price" v-show="formData.showOldPrice">
                      {{ item.salePrice || "66600" | $pointToYuan }}
                    </div>
                  </div>
                  <div
                    class="buy_btn"
                    v-if="formData.shopBuyBtn"
                    :style="{
                      marginLeft: formData.listStyle === '1' ? '20px' : '',
                    }"
                  >
                    <img
                      src="~@images/shop/app_icon_gouwuche@2x.png"
                      class="icon"
                      v-show="formData.buyBtnStyle == '1'"
                    />
                    <div class="go" v-show="formData.buyBtnStyle == '2'">
                      马上抢
                    </div>
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
  name: "LimitSeckill",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      timer: null,
      activeTimeString: "",
      defaultImage: require("@images/shop/middle_modalbox_cjsp_default.png"),
      productList: [{}],
    };
  },
  computed: {
    productInfoStyle() {
      const hadContent =
        this.formData.shopName ||
        this.formData.showShopPrice ||
        this.formData.shopBuyBtn ||
        this.formData.showOldPrice;
      const padding = hadContent ? "5px 10px" : "";
      return { padding };
    },
    priceStyle() {
      const textAlign = this.formData.textAlign === "left" ? "" : "center";
      const display = this.formData.listStyle !== "1" ? "block" : "";
      const justifyContent = this.formData.textAlign === "left" ? "" : "center";
      return { display, justifyContent, textAlign };
    },
    imageStyle() {
      const borderRadius = this.formData.angleType === "0" ? "" : "7px 7px 0 0";
      return { borderRadius };
    },
    itemStyle() {
      const marginRight = this.formData.imagePadding + "px";
      return { marginRight };
    },
    bgStyle() {
      const background = this.formData.backgroundColor;
      const opacity = this.formData.backgroundTransparency / 100;
      return { background, opacity, width: "100%", height: "100%" };
    },
    activeTimeStyle() {
      // const background = this.formData.backgroundColor
      const fontSize = this.formData.timeSize + "px";
      const marginTop = this.formData.textLineHeight + "px";
      const color = this.formData.activeTimeColor;
      const fontWeight = this.formData.timeStyle === "normal" ? "" : "bold";
      return { fontSize, color, fontWeight, marginTop };
    },

    activeDescStyle() {
      const fontSize = this.formData.descriptionSize + "px";
      const color = this.formData.activeDescColor;
      const marginTop = this.formData.textLineHeight + "px";
      const fontWeight =
        this.formData.descriptionStyle === "normal" ? "" : "bold";
      return { fontSize, color, fontWeight, marginTop };
    },
    activeTitleStyle() {
      const fontSize = this.formData.activeTitleSize + "px";
      const lineHeight = this.formData.activeTitleSize + "px";
      const color = this.formData.activeTitleColor;
      const fontWeight =
        this.formData.activeTitleStyle === "normal" ? "" : "bold";
      return { fontSize, color, fontWeight, lineHeight };
    },
    textStyle() {
      const top = this.formData.textTop + "px";
      return { top };
    },
    goodsStyle() {
      const bottom = this.formData.goodsBottom + "px";
      return { bottom };
    },
    productTitleStyle() {
      let textAlign = "";
      switch (this.formData.textAlign) {
        case "left":
          textAlign = "left";
          break;
        case "middle":
          textAlign = "center";
          break;
      }
      const fontWeight =
        this.formData.titleThickness === "normal" ? "" : "bold";
      return { textAlign, fontWeight };
    },
    imageClassName() {
      switch (this.formData.listStyle) {
        case "1":
          return "image_style_one";
        case "2":
          return "image_style_two";
        case "3":
          return "image_style_three";
      }
    },
    formData() {
      return this.item.config.formData || {};
    },
    backgroundDefaultStyle() {
      let height = 0;
      switch (this.formData.listStyle) {
        case "1":
          height = "375px";
          break;
        case "2":
          height = "375px";
          break;
        case "3":
          height = "345px";
          break;
      }
      // if (this.formData.backgroundInfo.imageUrl) {
      //   height = 'unset'
      // }
      const borderRadius =
        this.formData.backgroundAnleType === "0" ? "" : "7px";
      return {
        height,
        background: `url('${
          this.formData.backgroundInfo.imageUrl || this.defaultImage
        }') no-repeat 50% 50% /cover`,
        borderRadius,
      };
    },
  },
  filters: {
    // imgStyleScale (item) {
    //   switch (item) {
    //     case '0':
    //       return 'three_two'
    //     case '1':
    //       return 'one_one'
    //     case '2':
    //       return 'three_four'
    //     case '3':
    //       return 'sixteen_nine'
    //     default:
    //       return ''
    //   }
    // }
  },
  watch: {
    "formData.productList": {
      handler(n, o) {
        console.log(n, o);
        if (this.timer) {
          clearInterval(this.timer);
        }
        this.activeTimeShowText();
      },
      immediate: true,
      deep: true,
    },
  },

  methods: {
    getCountDownData(timeString) {
      const nowDateTime = new Date().getTime();
      let startDateTime = new Date(timeString).getTime();
      let restDateTime = startDateTime - nowDateTime;
      console.log("restDateTime", restDateTime);
      let days = 0;
      let hours = 0;
      let minutes = 0;
      let seconds = 0;
      seconds = Math.floor((restDateTime / 1000) % 60); // 秒数
      minutes = Math.floor((restDateTime / (1000 * 60)) % 60); // 分钟数
      hours = Math.floor((restDateTime / (1000 * 60 * 60)) % 24); // 小时数
      days = Math.floor(restDateTime / (1000 * 60 * 60 * 24)); // 天数
      console.log(
        "days, hours, minutes, seconds",
        days,
        hours,
        minutes,
        seconds
      );
      return { days, hours, minutes, seconds };
    },
    activeTimeShowText() {
      // 若展示商品为同个时间组的,
      // 开始时间和结束时间都相等，则视为同一个时间组。
      if (this.formData.productList.length === 0) {
        this.activeTimeString = `距离活动结束还剩：0天0小时0分0秒`;
        return false;
      }
      // 判断所有商品活动时间是否为同一时间段的标识。
      const allDateEqualFlag = this.formData.productList.every((item) => {
        const endFlag = item.endDate === this.formData.productList[0].endDate;
        const startFlag =
          item.startDate === this.formData.productList[0].startDate;
        return endFlag && startFlag;
      });
      console.log("allDateEqualFlag", allDateEqualFlag);

      this.timer = null;
      let days, hours, minutes, seconds;
      const nowDateTime = new Date().getTime();

      if (allDateEqualFlag) {
        const startTime = this.formData.productList[0].startDate;
        const endTime = this.formData.productList[0].endDate;
        const activityStatu = this.formData.productList[0].activityStatu;

        // 活动未开始时，展示：即将开始：xx天xx时xx分xx秒
        if (activityStatu == "1") {
          this.timer = window.setInterval((_) => {
            ({ days, hours, minutes, seconds } =
              this.getCountDownData(startTime));
            const zeroFlag =
              days === 0 && hours === 0 && minutes === 0 && seconds === 0;
            this.activeTimeString = `活动即将开始：${days}天${hours}时${minutes}分${seconds}秒`;
            if (zeroFlag) window.clearInterval(this.timer);
          }, 1000);
          // 活动进行中，展示：据活动结束：xx天xx时xx分xx秒
        } else if (activityStatu == "2") {
          this.timer = window.setInterval((_) => {
            ({ days, hours, minutes, seconds } =
              this.getCountDownData(endTime));
            const zeroFlag =
              days === 0 && hours === 0 && minutes === 0 && seconds === 0;
            this.activeTimeString = `距离活动结束：${days}天${hours}时${minutes}分${seconds}秒`;
            if (zeroFlag) window.clearInterval(this.timer);
          }, 1000);
          // 活动已结束，展示活动结束。
        } else if (activityStatu == "3") {
          this.activeTimeString = "活动结束";
        }
        // 商品不是同一分组下时，按所有时间段，由近及远展示。
      } else {
        const hadAlreadyStartFlag = this.formData.productList.find(
          (item) => item.activityStatu == "2"
        ); // 有已开始的活动标识。
        const allEndFlag = this.formData.productList.every(
          (item) => item.activityStatu == "3"
        ); // 所有活动都已经结束了。
        // 有已开始的活动时，由近及远展示即将结束的活动。
        if (hadAlreadyStartFlag) {
          // 展示结束，那么结束时间一定要大于当前时间，否则是负数。
          const allStartProductList = this.formData.productList.filter(
            (item) =>
              item.activityStatu == "2" && new Date(item.endDate) > new Date()
          );
          console.log("allStartProductList", allStartProductList);
          const distanceList = allStartProductList.map((item) => {
            let endDateTime = new Date(item.endDate).getTime();
            const distance = endDateTime - nowDateTime;
            console.log("distance", distance);
            return {
              ...item,
              distance,
            };
          });
          const minDistance = Math.min.apply(
            Math,
            distanceList.map((item) => item.distance)
          );
          const minDistanceIndex = distanceList.findIndex(
            (item) => item.distance === minDistance
          );
          const minDistanceTarget = allStartProductList[minDistanceIndex];
          const endTime = minDistanceTarget.endDate;
          console.log("minDistanceTarget", minDistanceTarget);

          this.timer = window.setInterval((_) => {
            ({ days, hours, minutes, seconds } =
              this.getCountDownData(endTime));
            const zeroFlag =
              days === 0 && hours === 0 && minutes === 0 && seconds === 0;
            this.activeTimeString = `距离活动结束：${days}天${hours}时${minutes}分${seconds}秒`;
            if (zeroFlag) window.clearInterval(this.timer);
          }, 1000);
        } else if (allEndFlag) {
          this.activeTimeString = "活动结束";
          // 没有已开始的活动时，也不是活动全部结束了，说明有未开始的活动。找到他们，由近及远展示即将开始的活动时间。
        } else {
          // 展示开始，那么开始时间一定要大于当前时间，否则是负数。
          const notStartActiveProductList = this.formData.productList.filter(
            (item) =>
              item.activityStatu == "1" && new Date(item.startDate) > new Date()
          );
          const distanceList = notStartActiveProductList.map((item) => {
            let startDateTime = new Date(item.startDate).getTime();
            const distance = nowDateTime - startDateTime;
            console.log("distance", distance);
            return {
              ...item,
              distance,
            };
          });
          const minDistance = Math.min.apply(
            Math,
            distanceList.map((item) => item.distance)
          );
          const minDistanceIndex = distanceList.findIndex(
            (item) => item.distance === minDistance
          );
          const minDistanceTarget = notStartActiveProductList[minDistanceIndex];
          const startTime = minDistanceTarget.startDate;
          this.timer = window.setInterval((_) => {
            ({ days, hours, minutes, seconds } =
              this.getCountDownData(startTime));
            const zeroFlag =
              days === 0 && hours === 0 && minutes === 0 && seconds === 0;
            this.activeTimeString = `活动即将开始：${days}天${hours}时${minutes}分${seconds}秒`;
            if (zeroFlag) window.clearInterval(this.timer);
          }, 1000);
        }
      }
    },
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
};
</script>
<style lang="less" scoped>
.limit_seckill {
  .background_wrap {
    position: relative;
    .background_image {
      width: 100%;
    }
    .content_wrap {
      width: 100%;
      height: 100%;
      // position: absolute;
      // top: 0;
      // left: 0;
      padding: 0 20px;
      .content_wrapBox {
        width: 100%;
        height: 100%;
        color: #fff;
        position: relative;
        .info_wrap {
          text-align: center;
          // width: 369px;
          width: 100%;
          position: absolute;
          top: 0;
          .title {
            font-size: 20px;
          }
          // .desc {
          // }
          .active_time {
            position: relative;
            //   overflow: hidden;
            .background {
              position: absolute;
              top: 0;
              left: 0;
            }
            .text {
              width: 100%;
              z-index: 100;
              position: absolute;
              top: 0;
              left: 0;
            }
          }
        }
        .product_wrap {
          position: absolute;
          bottom: 0;
          white-space: nowrap;
          width: 100%;
          overflow: auto;
          display: flex;
          z-index: 5555;
          // padding-bottom: 15px;
          // margin-top: 21px;
          .product_item {
            flex: none;
            .product_status {
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              background: rgba(110, 110, 110, 0.5);
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 24px;
              color: yellow;
              font-weight: bold;
            }
            .product_image {
              width: 100%;
            }
            .product_info {
              background-color: #fff;
              color: #000;
              .title {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .price_wrap {
                display: flex;
                justify-content: space-between;
                .price {
                  display: flex;
                  .real_price {
                    font-size: 14px;
                    margin-right: 10px;
                  }
                  .old_price {
                    font-size: 13px;
                    text-decoration: line-through;
                    color: #999;
                  }
                }
                .buy_btn {
                  .icon {
                    width: 17px;
                    height: 17px;
                  }
                  .go {
                    display: inline-block;
                    width: 66px;
                    height: 24px;
                    line-height: 24px;
                    background-color: #c8a579;
                    color: #fff;
                    padding: 0 10px;
                  }
                }
              }
            }
          }

          .image_style_one {
            width: 230px;
            .product_image {
              height: 160px;
              object-fit: cover;
            }
            // .product_info {
            // }
          }
          .image_style_two {
            width: 160px;
            .product_image {
              height: 120px;
            }
            // .product_info {
            // }
          }
          .image_style_three {
            width: 110px;
            .product_image {
              height: 83px;
            }
            // .product_info {
            // }
          }
        }
      }
    }
  }
}
::-webkit-scrollbar {
  width: 10px;
  height: 5px !important;
}
::-webkit-scrollbar-thumb {
  height: 50px;
  background-color: #b8b8b8;
  /* outline: 2px solid #fff; */
  outline: none !important;
  outline-offset: -2px;
  /* border: 2px solid #fff; */
  border: none !important;
  -webkit-border-radius: 6px !important;
  -moz-opacity: 0.5;
  -khtml-opacity: 0.5;
  opacity: 0.5;
}
::-webkit-scrollbar-track-piece {
  background-color: unset !important;
}
</style>

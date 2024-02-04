<template>
  <div
    class="seckill_box"
    :style="{ padding: `5px  ${formData.pagePadding}px` }"
  >
    <div class="activeTab">
      <div
        class="tabItem"
        v-for="(item, index) in formData.shopList"
        :key="index"
        :style="styleWidth"
        :title="item.activityName"
        :class="{ active: item.active }"
        @click="changeTabIndex(item, index)"
      >
        {{ item.activityName }}
      </div>
    </div>
    <div
      v-for="(l, i) in formData.imageList.length > 0
        ? formData.imageList[tabIndex]
        : defaultImglist"
      :key="i"
      :style="{
        borderRadius: formData.angleType == 1 ? '6px' : '',
        marginTop: i > 0 ? `${formData.imagePadding}px` : '',
        boxShadow: formData.shopType == 1 ? ' 0 2px 4px rgb(0 0 0 / 6%)' : '',
      }"
      :class="formData.listStyle == 1 ? 'listStyle' : 'spellItem'"
    >
      <div
        class="spellImg"
        :style="goodsImgBox"
        :class="
          formData.angleType == 1
            ? formData.listStyle != 1
              ? 'roundborderTop'
              : 'roundborderTopList1'
            : ''
        "
      >
        <img
          class="bgImage"
          v-if="formData.showType == 1 && formData.backgroundImgUrl"
          :src="formData.backgroundImgUrl"
          :style="{
            opacity: `${formData.transparency / 100}`,
          }"
        />
        <div :style="styleOne">
          <div
            style="position: relative"
            :style="styleTwo"
            :class="
              formData.angleType == 1
                ? formData.listStyle != 1
                  ? 'roundborderTop'
                  : 'roundborderTopList'
                : ''
            "
          >
            <div
              :class="dealClassname(formData.imgScale)"
              class="SpellimgBox"
              :style="styleThree"
            >
              <div
                class="item"
                :class="[
                  formData.angleType == 1 &&
                  formData.imgFill == 0 &&
                  formData.strokeSize == 0
                    ? formData.listStyle != 1
                      ? 'roundborderTop'
                      : 'roundborderTopList'
                    : '',
                ]"
                :style="[
                  blankWhite,
                  {
                    background:
                      formData.imgFill != 1
                        ? `url(${l.goodsPicture}) no-repeat 50% 50% / cover`
                        : '',
                  },
                ]"
              >
                <img
                  v-if="formData.imgFill == 1"
                  :src="l.goodsPicture"
                  alt=""
                  class="goodsImg"
                  :class="[
                    formData.angleType == 1 &&
                    formData.imgFill == 0 &&
                    formData.strokeSize == 0
                      ? formData.listStyle != 1
                        ? 'roundborderTop'
                        : 'roundborderTopList'
                      : '',
                  ]"
                  :style="imgStyle"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          class="imgTitle"
          :style="{
            borderRadius:
              formData.listStyle == 1 && formData.angleType == 1
                ? ' 0 0 0 7px'
                : '',
            zIndex: '55555',
          }"
          v-if="formData.countdownShow"
        >
          <i
            class="iconfont icon-icon_pintuan_jiaob_left"
            v-show="formData.appearanceStyle == 2 && formData.showType == 0"
            :style="{
              position: 'absolute',
              left: `${formData.strokeSize - 1}px`,
              top: `${formData.strokeSize - 8}px`,
              color: `${colorRgb(
                formData.systemborderColor,
                formData.transparency / 100
              )}`,
              fontSize: `${formData.strokeSize + 20}px`,
              zIndex: '9999999999',
            }"
          ></i>
          <i
            class="iconfont icon-icon_pintuan_jiaob_right"
            v-show="formData.appearanceStyle == 2 && formData.showType == 0"
            :style="{
              position: 'absolute',
              right: `${formData.strokeSize - 1}px`,
              top: `${formData.strokeSize - 8}px`,
              color: `${colorRgb(
                formData.systemborderColor,
                formData.transparency / 100
              )}`,
              fontSize: `${formData.strokeSize + 20}px`,
              zIndex: '9999999999',
            }"
          ></i>
          <div
            class="titleLeft"
            v-if="formData.listStyle != 1"
            :style="textStyle"
          >
            秒杀
          </div>
          <div class="titleRight">
            <div
              class="endText"
              :style="[
                textStyle,
                formData.listStyle == 1 ? cutDownStyleLeft : '',
              ]"
            >
              距{{ l.startDate | dealcutDate
              }}<span v-if="formData.listStyle != 1" :style="textStyle"
                >仅剩</span
              >
            </div>
            <div
              class="endtime"
              :style="[
                textStyle,
                formData.listStyle == 1 ? cutDownStyleRight : '',
              ]"
            >
              {{
                l.startDate
                  ? cutdowntime(l.startDate, l.endDate)
                  : "00 : 00 : 00"
              }}
            </div>
          </div>
        </div>
      </div>
      <div
        class="spellText"
        :class="
          formData.angleType == 1
            ? formData.listStyle != 1
              ? 'roundborderBottom'
              : 'roundborderBottomList'
            : ''
        "
      >
        <div
          class="spellTextTitle"
          v-show="formData.shopName"
          :style="textStyle"
        >
          <span :style="[textStyle, bgColor]"
            >减{{ parseInt((l.discountPrice * 1) / 100) }}元</span
          >{{ l.goodsName }}
        </div>
        <div
          class="spellDetails"
          v-show="formData.shopDescription"
          :style="textStyle"
        >
          {{ l.goodsSellingPoint }}
        </div>
        <div class="progress" v-show="formData.listStyle == 0">
          <a-progress
            class="progressBar"
            :percent="(l.totalRemainStock * 10 * 10) / l.totalSeckillStock"
            size="small"
            :show-info="false"
            v-show="formData.progressBar"
            :strokeColor="colorStyle"
          />
          <span
            v-show="formData.inventory"
            :style="{
              color: colorStyle,
            }"
            >剩余{{ l.totalRemainStock }}件</span
          >
        </div>
        <div class="listPrice">
          <div
            class="seckillPrice"
            v-if="formData.seckillPrices && formData.listStyle == 1"
          >
            ¥<span class="moneyNum" :style="textStyle">{{
              ((l.seckillPrice * 1) / 100).toFixed(2) || 99
            }}</span
            >起
          </div>
          <div
            class="oldPrice"
            v-if="formData.oldPrices && formData.listStyle == 1"
            :style="textStyle"
          >
            {{ ((l.salePrice * 1) / 100).toFixed(2) }}
          </div>
        </div>
        <div class="price">
          <div>
            <span
              class="moneyIcon"
              v-show="formData.seckillPrices && formData.listStyle == 0"
              :style="textStyle"
              >秒杀价¥</span
            ><span
              class="moneyNum"
              v-show="formData.seckillPrices && formData.listStyle == 0"
              :style="textStyle"
              >{{ ((l.seckillPrice * 1) / 100).toFixed(2) || 99 }}</span
            >
            <span
              style="margin-left: 2px; font-weight: 500"
              v-show="formData.seckillPrices && formData.listStyle == 0"
              >起</span
            >
            <span
              class="oldPrice"
              v-show="formData.oldPrices && formData.listStyle == 0"
              :style="textStyle"
              >{{ ((l.salePrice * 1) / 100).toFixed(2) }}</span
            >
          </div>
          <div class="progress listProgress" v-show="formData.listStyle == 1">
            <span
              v-show="formData.inventory"
              :style="{
                color: colorStyle,
              }"
              >剩余{{ l.totalRemainStock }}件</span
            >
            <a-progress
              class="progressBar"
              :percent="(l.totalRemainStock * 10 * 10) / l.totalSeckillStock"
              size="small"
              :show-info="false"
              v-show="formData.progressBar"
              :strokeColor="colorStyle"
            />
          </div>
          <div
            class="shopBtn"
            v-if="formData.shopBuyBtn"
            :style="{
              marginRight:
                formData.listStyle == 1 && formData.btnType == 2
                  ? '-10px'
                  : '2px',
            }"
          >
            <img
              src="~@/assets/images/default/app_icon_gouwuche.png"
              alt=""
              style="width: 17px; height: 17px"
              v-show="formData.btnType == 1"
            />
            <div
              class="buyBtn"
              v-show="formData.btnType == 2"
              :style="textStyle"
            >
              {{ formData.shopBtnText }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MySeckill",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formData() {
      this.initNum++;
      if (this.item.config.formData && this.initNum <= 1) {
        this.item.config.formData.shopList.forEach((item) => {
          item.active = false;
        });
        if (this.item.config.formData.shopList.length > 0) {
          this.item.config.formData.shopList[0].active = true;
          const ids = [];
          this.shopList = [];
          this.item.config.formData.shopList.forEach((item) => {
            ids.push(item.id);
          });
          // this.getShopList(ids);
          const PromiseList = [];
          const a = this.$post(
            "goldenhome/seckill/admin_/seckill/activity/list",
            ids
          );
          PromiseList.push(a);
          Promise.all(PromiseList).then((res) => {
            if (res[0].dataInfo != null) {
              this.shopList = res[0].dataInfo;
              this.item.config.formData.shopList.forEach((item) => {
                this.shopList.forEach((l) => {
                  if (item.id == l.id) {
                    item.activityName = l.activityName;
                    item.activityTime = l.activityTime;
                    item.endDate = l.endDate;
                    item.startDate = l.startDate;
                    item.goodsCount = l.goodsCount;
                    item.activityStatu = l.activityStatu;
                  }
                });
              });
              const arr = [];
              this.item.config.formData.shopList.forEach((item) => {
                if (item.activityStatu != 3) {
                  arr.push(item);
                }
              });
              this.item.config.formData.shopList = arr;

              const tempPromiseList = [];
              this.item.config.formData.shopList.forEach((item) => {
                const p = this.$get(
                  "goldenhome/seckill/admin_/seckill/goods/list",
                  {
                    activityId: item.id,
                  }
                );
                tempPromiseList.push(p);
              });
              Promise.all(tempPromiseList).then((res) => {
                this.item.config.formData.imageList = [];
                res.forEach((item) => {
                  this.item.config.formData.imageList.push(item.dataInfo);
                });
              });
              if (this.item.config.formData.shopList.length > 0) {
                this.item.config.formData.shopList[0].active = true;
              }
            } else {
              this.item.config.formData.imageList = [];
              this.item.config.formData.shopList = [];
            }
          });
        }
      }
      return this.item.config.formData || {};
    },
    goodsImgBox() {
      let obj = "";
      if (this.formData.showType == 0) {
        obj = this.colorRgb(
          this.formData.systembgColor,
          this.formData.transparency / 100
        );
      } else {
        if (this.formData.backgroundImgUrl) {
          obj = "";
        } else {
          obj = "#bbbbbb";
        }
      }
      return {
        background: obj,
      };
    },
    styleOne() {
      return {
        background: "#fff",
        borderRadius: this.formData.angleType == 1 ? "6px 6px 0 0" : "",
      };
    },
    styleTwo() {
      let obj = "";
      if (this.formData.showType == 0) {
        obj = this.colorRgb(
          this.formData.systemborderColor,
          this.formData.transparency / 100
        );
      } else {
        if (this.formData.backgroundImgUrl) {
          obj = "";
        } else {
          obj = "#bbbbbb";
        }
      }
      return {
        padding: this.formData.countdownShow
          ? `${this.formData.strokeSize}px ${this.formData.strokeSize}px 0 ${this.formData.strokeSize}px`
          : "0 0",
        background: obj,
        zIndex: "55555",
      };
    },
    styleThree() {
      return {
        background: "#fff",
        padding:
          this.formData.listStyle != 1 && this.formData.imgFill == 1
            ? this.dealWhite(this.formData.imgScale)
            : "0 0",
        height:
          this.formData.listStyle == 1
            ? `${
                165 - this.formData.pagePadding - this.formData.strokeSize * 2
              }px`
            : this.dealHeight(this.formData.imgScale),
        borderRadius:
          this.formData.angleType == 1 && this.formData.strokeSize == 0
            ? this.formData.listStyle != 1
              ? "5px 5px 0 0"
              : "6px 0 0 0"
            : "",
      };
    },
    blankWhite() {
      let obj = "";
      if (this.formData.imgFill == 1) {
        if (this.formData.imgScale == 0) {
          obj =
            230 - this.formData.pagePadding - this.formData.strokeSize + "px";
        }
        if (this.formData.imgScale == 2) {
          obj = "100%";
        }
        if (this.formData.imgScale == 3) {
          obj =
            194 - this.formData.pagePadding - this.formData.strokeSize + "px";
        }
      } else {
        obj = "100%";
      }
      let y = "";
      if (this.formData.imgFill == 1) {
        if (this.formData.imgScale == 2) {
          // y =
          //   368 -
          //   this.formData.pagePadding * 2 -
          //   this.formData.strokeSize * 2 +
          //   "px";
          y = "100%";
        }
      } else {
        y = "100%";
      }
      return {
        width: obj,
        height: y,
      };
    },
    tagNum() {
      let obj = "";
      if (this.formData.listStyle == 1) {
        obj = this.formData.strokeSize + 4 + "px";
      } else {
        if (this.formData.imgFill == 0) {
          obj = this.formData.strokeSize + 8 + "px";
        } else {
          if (this.formData.imgScale != 2) {
            if (this.formData.imgScale == 1) {
              obj =
                this.formData.strokeSize +
                6 +
                this.dealPositon(this.formData.imgScale) +
                "px";
            } else {
              obj =
                this.formData.strokeSize +
                this.dealPositon(this.formData.imgScale) +
                4 +
                "px";
            }
          } else {
            obj = this.formData.strokeSize + 8 + "px";
          }
        }
      }
      let y = "";
      if (
        this.formData.listStyle == 0 &&
        this.formData.imgFill == 1 &&
        this.formData.imgScale == 2
      ) {
        y = 18 + this.dealPositon(this.formData.imgScale) + "px";
      } else {
        y = "8px";
      }
      return {
        left: obj,
        fontWeight: this.formData.titleThickness == "bold" ? "700" : "",
        bottom: y,
      };
    },
    tag1() {
      let x = "";
      if (this.formData.listStyle == 0 && this.formData.imgFill == 1) {
        if (this.formData.imgScale != 2) {
          if (this.formData.badgeType != 1) {
            if (this.formData.imgScale != 1) {
              x =
                this.formData.strokeSize +
                this.dealPositon(this.formData.imgScale) -
                10 +
                "px";
            } else {
              x =
                this.formData.strokeSize +
                this.dealPositon(this.formData.imgScale) +
                "px";
            }
          } else {
            x =
              this.formData.strokeSize +
              10 +
              this.dealPositon(this.formData.imgScale) +
              "px";
          }
        } else {
          if (this.formData.badgeType != 1) {
            x = this.formData.strokeSize + "px";
          } else {
            x = this.formData.strokeSize + 8 + "px";
          }
        }
      } else {
        if (this.formData.badgeType != 1) {
          x = this.formData.strokeSize + "px";
        } else {
          x = this.formData.strokeSize + 8 + "px";
        }
      }
      let y = "";
      if (
        this.formData.listStyle == 0 &&
        this.formData.imgFill == 1 &&
        this.formData.imgScale == 2
      ) {
        y =
          this.formData.strokeSize +
          22 +
          this.dealPositon(this.formData.imgScale) +
          "px";
      } else {
        if (this.formData.listStyle == 0) {
          y = this.formData.strokeSize + 18 + "px";
        } else {
          y = this.formData.strokeSize + 12 + "px";
        }
      }
      return {
        left: x,
        top: y,
        fontWeight: this.formData.titleThickness == "bold" ? "700" : "",
      };
    },
    textStyle() {
      return {
        fontWeight: this.formData.titleThickness == "bold" ? "700" : "",
        zIndex: "55555",
      };
    },
    cutDownStyleLeft() {
      return {
        transform: "scale(0.8)",
        transformOrigin: "0%",
        whiteSpace: "nowrap",
      };
    },
    cutDownStyleRight() {
      let percent = 100 - (this.formData.pagePadding * 20) / 30 + "%";
      return {
        transform: "scale(0.8)",
        transformOrigin: percent,
        whiteSpace: "nowrap",
      };
    },
    colorStyle() {
      let obj = "";
      if (this.formData.showType == 0 && this.formData.appearanceStyle == 2) {
        obj = "#3B414D";
      } else {
        obj = "#d1b085";
      }
      return obj;
    },
    bgColor() {
      let obj = "";
      if (this.formData.showType == 0 && this.formData.appearanceStyle == 2) {
        obj = "#3B414D";
      } else {
        obj = "#d1b085";
      }
      return {
        background: obj,
      };
    },

    styleWidth() {
      let width = "";
      if (this.formData.shopList.length == 1) {
        width = "100%";
      }
      if (this.formData.shopList.length == 2) {
        width = "50%";
      }
      if (this.formData.shopList.length == 3) {
        width = "33.33%";
      }
      if (this.formData.shopList.length == 4) {
        width = "25%";
      }
      if (this.formData.shopList.length == 5) {
        width = "20%";
      }
      return {
        width: width,
      };
    },
    imgStyle() {
      let x = "";
      let y = "";
      if (this.formData.imgFill == 1 && this.formData.imgScale == 2) {
        x = "100%";
        y = "unset";
      }
      return {
        width: x,
        height: y,
        minHeight: y,
        maxHeight: y,
      };
    },
  },
  filters: {
    imgStyleScale(item) {
      switch (item) {
        case "0":
          return "three_two";
        case "1":
          return "one_one";
        case "2":
          return "three_four";
        case "3":
          return "sixteen_nine";
        default:
          return "";
      }
    },
    dealcutDate(item) {
      var date = new Date();
      if (date.getTime() > new Date(item).getTime()) {
        return "结束";
      } else {
        return "开始";
      }
    },
  },
  watch: {
    formData: {
      deep: true,
      handler(n, o) {
        // console.log(n, "8888888888888888888888888888");
        if (n.imgScale == 0) {
          this.defaultImglist[0].goodsPicture = require("@/assets/images/default/default_img_3_2@2x.png");
        }
        if (n.imgScale == 2) {
          this.defaultImglist[0].goodsPicture = require("@/assets/images/default/default_img_3_4@2x.png");
        }
        if (n.imgScale == 3) {
          this.defaultImglist[0].goodsPicture = require("@/assets/images/default/default_img_16_9@2x.png");
        }
        if (n.imgScale == 1 || n.imgFill == 1 || n.listStyle == 1) {
          this.defaultImglist[0].goodsPicture = require("@/assets/images/default/default_img_1_1@2x.png");
        }
        n.shopList.forEach((item, index) => {
          if (item.active) {
            this.tabIndex = index;
          }
        });
      },
    },
  },
  data() {
    return {
      defaultImglist: [
        {
          goodsName: "这里显示商品名称，最多显示两行",
          goodsPicture: require("@/assets/images/default/default_img_3_2@2x.png"),
          goodsSellingPoint: "这里显示商品描述，最多显示一行",
          goodsStatus: 1, //（1:仓库中，2:上架，3:已下架）
          totalSeckillStock: 9999, //秒杀总库存
          totalRemainStock: 5658, //剩余库存
          salePrice: 99999, //销售价格（单位：分）
          seckillPrice: 9999, //秒杀价格（单位：分）
          discountPrice: 9999, //优惠价
          // startDate: "2021-08-20 10:25:46",
        },
      ],
      tabIndex: 0,
      initNum: 0,
      shopList: [],
    };
  },
  methods: {
    dealClassname(item) {
      switch (item) {
        case "0":
          return "three_two";
        case "1":
          return "one_one";
        case "2":
          return "three_four";
        case "3":
          return "sixteen_nine";
        default:
          return "";
      }
    },
    dealWhite(item) {
      switch (item) {
        case "0":
          return `0 ${
            (368 -
              this.formData.pagePadding * 2 -
              this.formData.strokeSize * 2 -
              230) /
            2
          }px`;
        case "1":
          return "0 0";
        case "2":
          // return `${
          //   (460 -
          //     (368 -
          //       this.formData.pagePadding * 2 -
          //       this.formData.strokeSize * 2)) /
          //   2
          // }px 0`;
          return "0 0";
        case "3":
          return `0 ${
            (368 -
              this.formData.pagePadding * 2 -
              this.formData.strokeSize * 2 -
              194) /
            2
          }px`;
        default:
          return "0 0";
      }
    },
    dealHeight(item) {
      switch (item) {
        case "0":
          return `${
            230 - this.formData.pagePadding - this.formData.strokeSize
          }px`;
        case "1":
          return `${
            368 - this.formData.pagePadding * 2 - this.formData.strokeSize * 2
          }px`;
        case "2":
          return `${
            460 - this.formData.pagePadding - this.formData.strokeSize
          }px`;
        case "3":
          return `${
            194 - this.formData.pagePadding - this.formData.strokeSize
          }px`;
        default:
          return "";
      }
    },
    dealPositon(item) {
      switch (item) {
        case "0":
          return (
            (368 -
              this.formData.pagePadding * 2 -
              this.formData.strokeSize * 2 -
              230) /
              2 +
            10
          );
        case "1":
          return 0;
        case "2":
          return (
            (460 -
              (368 -
                this.formData.pagePadding * 2 -
                this.formData.strokeSize * 2)) /
              2 -
            10
          );
        case "3":
          return (
            (368 -
              this.formData.pagePadding * 2 -
              this.formData.strokeSize * 2 -
              194) /
              2 +
            10
          );
        default:
          return 0;
      }
    },
    // 十六进制转换成rgb
    colorRgb(val, opacity) {
      // 16进制颜色值的正则
      var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
      // 把颜色值变成小写
      var color = val.toLowerCase();
      if (reg.test(color)) {
        // 如果只有三位的值，需变成六位，如：#fff => #ffffff
        if (color.length === 4) {
          var colorNew = "#";
          for (var i = 1; i < 4; i += 1) {
            colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
          }
          color = colorNew;
        }
        // 处理六位的颜色值，转为RGB
        var colorChange = [];
        for (var i = 1; i < 7; i += 2) {
          colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
        }
        return "rgba(" + colorChange.join(",") + "," + opacity + ")";
      } else {
        return color;
      }
    },
    dealcutdownTime(value) {
      let result = parseInt(value);
      let h =
        Math.floor(result / 3600) < 10
          ? "0" + Math.floor(result / 3600)
          : Math.floor(result / 3600);
      let m =
        Math.floor((result / 60) % 60) < 10
          ? "0" + Math.floor((result / 60) % 60)
          : Math.floor((result / 60) % 60);
      let s =
        Math.floor(result % 60) < 10
          ? "0" + Math.floor(result % 60)
          : Math.floor(result % 60);
      result = `${h} : ${m} : ${s}`;
      return result;
    },
    cutdowntime(startTime, endDate) {
      var EndTime = new Date(startTime); //截止时间
      var activeEndTime = new Date(endDate);
      var NowTime = new Date();
      if (EndTime.getTime() > NowTime.getTime()) {
        var t = EndTime.getTime() - NowTime.getTime();
      } else {
        var t = activeEndTime.getTime() - NowTime.getTime();
      }
      var d = Math.floor(t / 1000 / 60 / 60 / 24);
      var h = Math.floor((t / 1000 / 60 / 60) % 24);
      var m = Math.floor((t / 1000 / 60) % 60);
      var s = Math.floor((t / 1000) % 60);
      h = this.checkTime(h);
      m = this.checkTime(m);
      s = this.checkTime(s);
      if (d > 0) {
        return d + " 天 " + h + " : " + m + " : " + s;
      } else {
        return h + " : " + m + " : " + s;
      }
    },
    checkTime(i) {
      //将0-9的数字前面加上0，例1变为01
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    },
    changeTabIndex(item, index) {
      this.tabIndex = index;
      this.formData.shopList.forEach((l) => {
        l.active = false;
      });
      item.active = true;
    },
    async getShopList(param) {
      let res = await this.$post(
        "goldenhome/seckill/admin_/seckill/activity/list",
        param
      );
      if (res && res.returnCode == 1000) {
        if (res.dataInfo != null && res.dataInfo) {
          this.shopList = res.dataInfo;
        } else {
          this.shopList = [];
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
.seckill_box {
  width: 100%;
  overflow: hidden;
  padding: 5px 15px;
  // background: #fafafa;
  // border: 2px solid #016bff;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .spellItem {
    // width: 345px;
    width: 100%;
    // box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
    .spellImg {
      width: 100%;
      // height: 230px;
      // background: linear-gradient(270deg, #ff4444 0%, #ff6060 100%);
      background-size: contain;
      background-size: 100% 100% !important;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .SpellimgBox {
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        .goodsImg {
          // min-width: 100%;
          // max-width: 200%;
          height: 100%;
          width: unset;
          // height: unset;
        }
      }
      .three_two {
        height: 230px;
      }
      .one_one {
        height: 345px;
      }
      .three_four {
        height: 460px;
        .goodsImg {
          min-height: 100%;
          max-height: 200%;
          min-width: unset;
          max-width: unset;
          width: unset;
        }
      }
      .sixteen_nine {
        height: 194px;
      }
      .imgTitle {
        width: 100%;
        height: 40px;
        // position: absolute;
        // bottom: 0;
        // left: 0;
        // background: linear-gradient(270deg, #ff4444 0%, #ff6060 100%);
        display: flex;
        justify-content: space-between;
        align-items: center;
        .titleLeft {
          font-size: 20px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
          line-height: 28px;
          margin-left: 12px;
        }
        .titleRight {
          margin-right: 12px;
          display: flex;
          flex-direction: column;
          padding: 5px 0;
          .endText {
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.5);
            line-height: 16px;
            text-align: right;
          }
          .endtime {
            margin-top: 2px;
            font-size: 12px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #ffffff;
            text-align: right;
            line-height: 17px;
          }
        }
      }
      .spelledNum {
        position: absolute;
        left: 8px;
        bottom: 8px;
        background: #000000;
        border-radius: 2px;
        opacity: 0.6;
        padding: 2px 8px;
        color: #fff;
      }
      .spellTag1 {
        position: absolute;
        left: 8px;
        top: 12px;
        color: #fff;
        background: #d1b085;
        border-radius: 3px;
        opacity: 0.8;
        width: 18px;
        height: 36px;
        font-size: 10px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 16px;
        text-align: center;
        padding-top: 3px;
        z-index: 999999;
      }
      .spellTag2 {
        position: absolute;
        left: 0px;
        top: 12px;
        width: 44px;
        height: 22px;
        background: #191919;
        border-radius: 0px 100px 100px 0px;
        opacity: 0.8;
        font-size: 10px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 22px;
        text-align: center;
        z-index: 999999;
        text-indent: -3px;
      }
      .spellTag3 {
        position: absolute;
        left: 0px;
        top: 12px;
        width: 44px;
        height: 44px;
        background: rgba(154, 233, 255, 0.57);
        font-size: 10px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        text-align: center;
        z-index: 999999;
        padding: 5px 6px;
      }
      .spellTag4 {
        position: absolute;
        left: 0px;
        top: 12px;
        width: 36px;
        z-index: 999999;
        height: 36px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        img {
          min-height: 100% !important;
          max-height: 150% !important;
          height: unset;
          width: unset;
        }
      }
    }
    .spellText {
      width: 100%;
      padding: 20px 15px 5px 15px;
      background: #ffffff;
      .spellTextTitle {
        display: flex;
        align-items: center;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        span {
          display: inline-block;
          color: rgba(255, 255, 255, 0.8);
          border-radius: 2px;
          font-size: 13px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          background: #d1b085;
          padding: 2px 8px;
          margin-right: 8px;
        }
      }
      .spellDetails {
        margin-top: 4px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .price {
        width: 100%;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .moneyIcon {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 500;
          color: #191919;
          line-height: 20px;
          margin-right: 3px;
        }
        .moneyNum {
          font-size: 21px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 500;
          color: #191919;
          line-height: 28px;
        }
        .oldPrice {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #cccccc;
          margin-left: 8px;
          text-decoration: line-through;
        }
      }
    }
  }
  .spellItem + .spellItem {
    margin-top: 15px;
  }
  .listStyle + .listStyle {
    margin-top: 15px;
  }
  .listStyle {
    display: flex;
    width: 100%;
    // height: 155px;
    .spellImg {
      width: 45%;
      height: 100%;
      position: relative;
      background-size: contain;
      background-size: 100% 100% !important;
      img {
        width: 100%;
        height: 100%;
      }
      .imgTitle {
        width: 100%;
        height: 26px;
        // position: absolute;
        // bottom: 0;
        // left: 0;
        // background: linear-gradient(270deg, #ff4444 0%, #ff6060 100%);
        display: flex;
        justify-content: space-between;
        align-items: center;
        .titleRight {
          display: flex;
          width: 100%;
          padding: 5px 10px;
          align-items: center;
          justify-content: space-between;
          .endText {
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.5);
            line-height: 17px;
          }
          .endtime {
            margin-top: 2px;
            font-size: 12px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #ffffff;
            text-align: right;
            line-height: 17px;
          }
        }
      }
      .spelledNum {
        position: absolute;
        left: 4px;
        bottom: 6px;
        background: #000000;
        border-radius: 2px;
        opacity: 0.6;
        padding: 1px 8px;
        font-size: 13px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 18px;
      }
      .spellTag1 {
        position: absolute;
        left: 8px;
        top: 12px;
        color: #fff;
        background: #d1b085;
        border-radius: 3px;
        opacity: 0.8;
        width: 18px;
        height: 36px;
        font-size: 10px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 16px;
        text-align: center;
        z-index: 99999999;
        padding-top: 3px;
      }
      .spellTag2 {
        position: absolute;
        left: 0px;
        top: 12px;
        width: 44px;
        height: 22px;
        background: #191919;
        border-radius: 0px 100px 100px 0px;
        opacity: 0.8;
        font-size: 10px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 22px;
        text-align: center;
        text-indent: -3px;
        z-index: 99999999;
      }
      .spellTag3 {
        position: absolute;
        left: 0px;
        top: 12px;
        width: 44px;
        height: 44px;
        background: rgba(154, 233, 255, 0.57);
        font-size: 10px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        text-align: center;
        z-index: 99999999;
        padding: 5px 6px;
      }
      .spellTag4 {
        position: absolute;
        left: 0px;
        top: 12px;
        width: 36px;
        z-index: 99999999;
        height: 36px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        img {
          min-height: 100% !important;
          max-height: 200% !important;
          width: unset;
          height: unset;
        }
      }
    }
    .spellText {
      width: 55%;
      background: #ffffff;
      padding: 11px 10px;
      position: relative;
      .spellTextTitle {
        display: flex;
        align-items: center;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 15px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 22px;
        span {
          display: inline-block;
          color: rgba(255, 255, 255, 0.8);
          border-radius: 2px;
          font-size: 13px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          background: rgb(255, 236, 236);
          padding: 2px 8px;
          margin-right: 8px;
          line-height: 18px;
        }
      }
      .spellDetails {
        margin-top: 5px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .price {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 15px;
        .moneyIcon {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 500;
          color: #191919;
          line-height: 20px;
          margin-right: 3px;
        }
        .moneyNum {
          font-size: 20px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 500;
          color: #191919;
          line-height: 28px;
        }
        .oldPrice {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #cccccc;
          margin-left: 8px;
          text-decoration: line-through;
        }
        .shopBtn {
          margin-right: 2px;
        }
        img {
          width: 17px;
          height: 17px;
        }
      }
    }
  }
}
.roundborderBottom {
  border-radius: 0px 0px 7px 7px;
}
.roundborderTop {
  border-radius: 7px 7px 0px 0px;
}
.roundborderTopList {
  border-radius: 7px 0px 0px 0px;
}
.roundborderTopList1 {
  border-radius: 9px 0px 0px 7px;
}
.roundborderBottomList {
  border-radius: 0px 7px 7px 0px;
}
.buyBtn {
  background: #d1b085;
  border-radius: 15px;
  text-align: center;
  line-height: 26px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #fff;
  padding: 1px 8px;
  min-width: 50px;
  min-height: 26px;
}
.styleTwoIcon {
  position: absolute;
  top: 0;
  left: 4px;
}
.bgImage {
  position: absolute;
  width: 100%;
  height: 100%;
}
.item {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}
.progress {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .progressBar {
    width: 70%;
    margin-right: 20px;
  }
  span {
    font-size: 9px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #d1b085;
    white-space: nowrap;
    width: 30%;
  }
}
.listProgress {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: flex-start;
  margin-top: 0;
}
.listPrice {
  display: flex;
  align-items: center;
  margin-top: 5px;
  .seckillPrice {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 500;
    color: #191919;
    .moneyNum {
      font-size: 20px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 500;
      color: #191919;
      line-height: 28px;
      margin: 0 3px;
    }
  }
  .oldPrice {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #cccccc;
    margin-left: 8px;
    text-decoration: line-through;
    margin-top: 5px;
  }
}
.activeTab {
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
  .tabItem {
    width: 20%;
    border-radius: 4px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #191919;
    line-height: 48px;
    padding: 0 5px;
    box-sizing: border-box;
    white-space: nowrap;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .active {
    background: #fff;
    color: #d1b085;
  }
}
</style>

<template>
  <div class="my_Fiexd">
    <div class="seaction">
      <div
        class="circleType"
        v-if="formData.listStyle == '1' || formData.listStyle == '4'"
      >
        <div
          :style="[
            imgWh,
            {
              background: `url(${imgSrc}) no-repeat 50% 50%/cover`,
              borderRadius: '50%',
            },
          ]"
          :class="formData.listStyle == '4' ? 'square' : ''"
        ></div>
        <!-- <img
          :style="imgWh"
          :class="formData.listStyle == '4' ? 'square' : ''"
          :src="imgSrc"
          alt=""
        /> -->
      </div>
      <div
        :class="['custom_type', RightStyle ? 'custom_r' : '']"
        :style="colorStyle"
        v-if="formData.listStyle == '0'"
      >
        <div class="custom_card">
          <span class="title">
            <p>
              {{ formData.badgeType == 2 ? "点击授权登录" : formData.imgTitle }}
            </p>
            <p class="s_title">
              {{
                formData.badgeType == 2
                  ? "请登录金桔有品商城"
                  : formData.imgTitleS
              }}
            </p>
          </span>
          <div
            :style="[
              imgWh,
              {
                background: `url(${imgSrc}) no-repeat 50% 50%/cover`,
                borderRadius: '50%',
              },
            ]"
          ></div>
          <!-- <img :style="imgWh" :src="imgSrc" alt="" /> -->
        </div>
      </div>
      <div
        :class="['custom_type_three', RightStyle ? 'custom_r_t' : '']"
        :style="bgcolorType3"
        v-if="formData.listStyle == '2'"
      >
        <div class="custom_card flex">
          <div
            :style="[
              imgWh,
              {
                background: `url(${imgSrc}) no-repeat 50% 50%/cover`,
                borderRadius: '50%',
              },
            ]"
          ></div>
          <!-- <img :style="imgWh" :src="imgSrc" alt="" /> -->
        </div>
      </div>
      <div
        :class="['custom_type_f', RightStyle ? 'custom_r_f' : '']"
        :style="bgcolorType4"
        v-if="formData.listStyle == '3'"
      >
        <div class="custom_card">
          <span class="title">
            <p :style="{ color: formData.fontColor }">
              {{ formData.badgeType == 2 ? "点击授权登录" : formData.imgTitle }}
            </p>
            <p class="s_title" :style="{ color: formData.fontColor }">
              {{
                formData.badgeType == 2
                  ? "请登录金桔有品商城"
                  : formData.imgTitleS
              }}
            </p>
          </span>
          <div
            :style="[
              imgWh,
              {
                background: `url(${imgSrc}) no-repeat 50% 50%/cover`,
                borderRadius: '50%',
              },
            ]"
          ></div>
          <!-- <img :style="imgWh" :src="imgSrc" alt="" /> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MyFiexdIcon",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isAnimation: false,
      heightPx: 0,
      top: 0,
      imageUrl: require("@/assets/images/shop/middle_modalbox_xuanfu_touxiangdefult@2x.png"),
    };
  },
  computed: {
    formData() {
      return this.item.config.formData || {};
    },
    sizeColor() {
      return {
        color: this.formData.color,
        backgroundColor: this.formData.bgColor,
      };
    },
    RightStyle() {
      const { floatPosition } = this.formData;
      switch (floatPosition) {
        case "0":
        case "2":
          return false;
        default:
          return true;
      }
    },
    positionNum() {
      const { imgWidth, floatPosition, listStyle } = this.formData;
      var obj = document.querySelector(".fitment_middle_page");
      let custom_w = document.querySelector(".custom_type");
      var top = obj.offsetTop + 64;
      var left = obj.offsetLeft;
      var h = obj.offsetHeight - 64;
      var imgW;
      var imgH;
      console.log("custom_type", custom_w);
      switch (listStyle) {
        case "0":
          imgW = custom_w;
          imgH = imgWidth + 10;
          break;
        case "1":
          imgW = imgWidth;
          imgH = imgW;
          break;
        case "2":
          imgW = 80;
          imgH = 113;
          break;
        case "3":
          imgW = 269;
          imgH = 114;
          break;
        default:
          imgW = imgWidth;
          imgH = imgW;
          break;
      }
      console.log(imgW, h);
      var PositionStyle;
      if (floatPosition == "1" || floatPosition == "3") {
        PositionStyle = {
          top: `${top + (this.formData.top / 100) * (h - imgH) + 2}px`,
          left: `${left + (1 - this.formData.left / 100) * (375 - imgW)}px`,
        };
      } else {
        PositionStyle = {
          top: `${top + (this.formData.top / 100) * (h - imgH) + 2}px`,
          left: `${left + (this.formData.left / 100) * (375 - imgW)}px`,
        };
      }
      console.log(PositionStyle, "PositionStyle");
      return PositionStyle;
    },
    imgWh() {
      console.log(this.formData.imgWidth);
      return {
        width: this.formData.imgWidth + "px",
        height: this.formData.imgWidth + "px",
      };
    },
    colorStyle() {
      return {
        backgroundColor: this.formData.bgColor,
        color: this.formData.color,
      };
    },
    imgSrc() {
      let url;
      if (this.formData.badgeType == 2)
        return require("@/assets/images/shop/middle_modalbox_xuanfu_touxiangdefult01@2x.png");
      url =
        this.formData.imageUrl ||
        require("@/assets/images/shop/middle_modalbox_xuanfu_touxiangdefult@2x.png");
      return url;
    },
    bgcolorType3() {
      var styleThree_bgcolor = "";
      if (this.formData.backgroundColorType == 1 && !this.RightStyle) {
        styleThree_bgcolor = `url('${require("@/assets/images/shop/middle_modalbox_yangshi03_yangshi01_left.png")}')`;
      } else if (this.formData.backgroundColorType == 1 && this.RightStyle) {
        styleThree_bgcolor = `url('${require("@/assets/images/shop/middle_modalbox_yangshi03_yangshi01_right.png")}')`;
      } else if (this.formData.backgroundColorType == 2 && !this.RightStyle) {
        styleThree_bgcolor = `url('${require("@/assets/images/shop/middle_modalbox_yangshi03_yangshi01_jinse_left.png")}')`;
      } else if (this.formData.backgroundColorType == 2 && this.RightStyle) {
        styleThree_bgcolor = `url('${require("@/assets/images/shop/middle_modalbox_yangshi03_yangshi01_jinse_right.png")}')`;
      } else if (this.formData.backgroundColorType == 3 && !this.RightStyle) {
        if (!this.formData.backgroundUrl) {
          styleThree_bgcolor = `url('${require("@/assets/images/shop/middle_modalbox_yangshi03_yangshi01_diy_left.png")}')`;
        } else {
          styleThree_bgcolor = `url('${this.formData.backgroundUrl}') no-repeat 50% 50% /cover`;
        }
      } else if (this.formData.backgroundColorType == 3 && this.RightStyle) {
        if (!this.formData.backgroundUrl) {
          styleThree_bgcolor = `url('${require("@/assets/images/shop/middle_modalbox_yangshi03_yangshi01_diy_right.png")}')`;
        } else {
          styleThree_bgcolor = `url('${this.formData.backgroundUrl}') no-repeat 50% 50% /cover`;
        }
      }
      return {
        background: styleThree_bgcolor,
      };
    },
    bgcolorType4() {
      var styleThree_bgcolor = "";
      if (this.formData.backgroundColorType == 1 && !this.RightStyle) {
        styleThree_bgcolor = `url('${require("@/assets/images/shop/middle_modalbox_yangshi03_yangshi02_left.png")}')`;
      } else if (this.formData.backgroundColorType == 1 && this.RightStyle) {
        styleThree_bgcolor = `url('${require("@/assets/images/shop/middle_modalbox_yangshi03_yangshi02_right.png")}')`;
      } else if (this.formData.backgroundColorType == 2 && !this.RightStyle) {
        styleThree_bgcolor = `url('${require("@/assets/images/shop/middle_modalbox_yangshi03_yangshi02_jinse_left.png")}')`;
      } else if (this.formData.backgroundColorType == 2 && this.RightStyle) {
        styleThree_bgcolor = `url('${require("@/assets/images/shop/middle_modalbox_yangshi03_yangshi02_jinse_right.png")}')`;
      } else if (this.formData.backgroundColorType == 3 && !this.RightStyle) {
        if (!this.formData.backgroundUrl) {
          styleThree_bgcolor = `url('${require("@/assets/images/shop/middle_modalbox_yangshi03_yangshi02_diy_left.png")}')`;
        } else {
          styleThree_bgcolor = `url('${this.formData.backgroundUrl}') no-repeat 50% 50% /cover`;
        }
      } else if (this.formData.backgroundColorType == 3 && this.RightStyle) {
        if (!this.formData.backgroundUrl) {
          styleThree_bgcolor = `url('${require("@/assets/images/shop/middle_modalbox_yangshi03_yangshi02_diy_right.png")}')`;
        } else {
          styleThree_bgcolor = `url('${this.formData.backgroundUrl}') no-repeat 50% 50% /cover`;
        }
      }
      return {
        background: styleThree_bgcolor,
      };
    },
  },
  mounted() {
    //  this.heightPx=document.querySelector('.fitment_middle_page').offsetHeight -64
  },
};
</script>
<style lang="less" scoped>
.my_Fiexd {
  .seaction {
    // position: fixed;
    // z-index: 500;
    // display: inline-block;
    display: flex;
    justify-content: center;
    align-items: center;
    .circleType {
      display: inline-block;
      border-radius: 50%;
      // width: 60px;
      // height: 60px;
      img {
        display: inline-block;
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      .square {
        border-radius: 0 !important;
      }
    }
    .custom_type {
      display: inline-block;
      padding: 5px;
      border-radius: 0 80px 80px 0;
      .custom_card {
        display: flex;
        justify-content: space-between;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        .title {
          display: flex;
          flex-flow: column;
          justify-content: space-around;
          padding: 4px 4px;
          text-align: left;
          max-width: 300px;
          p {
            display: inline-block;
            font-size: 16px;
            min-width: 1px;
          }
          .s_title {
            font-size: 12px;
          }
        }
      }
    }
    .custom_r {
      border-radius: 80px 0 0 80px;
      .custom_card {
        flex-direction: row-reverse;
      }
    }
    .custom_type_three {
      width: 80px;
      height: 114px;
      background-image: url("~@/assets/images/shop/middle_modalbox_yangshi03_yangshi01_left.png");
      .custom_card {
        width: 100%;
        height: 114px;
        line-height: 114px;
        text-align: center;

        img {
          display: inline-block;
          width: 60px;
          height: 60px;
        }
      }
    }
    .custom_r_t {
      background-image: url("~@/assets/images/shop/middle_modalbox_yangshi03_yangshi01_right.png");
      .custom_card {
        flex-direction: row-reverse;
      }
    }
    .custom_type_f {
      width: 269px;
      height: 114px;
      background-image: url("~@/assets/images/shop/middle_modalbox_yangshi03_yangshi02_left.png");
      background-size: 100% 100%;
      background-clip: padding-box;
      background-position: center;
      padding: 27px 10px;
      .custom_card {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 60px;
        .title {
          display: flex;
          flex-flow: column;
          justify-content: space-around;
          // justify-items: center;
          padding: 4px 4px;
          text-align: left;
          p {
            width: 174px;
            font-size: 16px;
            min-width: 1px;
          }
          .s_title {
            height: 16px;
            line-height: 16px;
            font-size: 12px;
          }
        }
        img {
          display: inline-block;
          width: 60px;
          height: 60px;
        }
      }
    }
    .custom_r_f {
      background-image: url("~@/assets/images/shop/middle_modalbox_yangshi03_yangshi02_right.png");
      .custom_card {
        flex-direction: row-reverse;
      }
    }
    img {
      border-radius: 50%;
    }
    .custom_card {
      .title {
        p {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<template>
  <div class="integral-mall-form">
    <!-- <a-upload
      name="file"
      :multiple="true"
      action="https://testsd.cicd.vpclub.cn/goldenhome/ghs/admin/upload"
      :headers="headers"
    >
      <a-button> <a-icon type="upload" /> Click to Upload </a-button>
    </a-upload> -->
    <div class="add_live_wrap">
      <div class="title">添加商品/优惠券</div>
      <div class="add_item">
        <div>
          <draggable
            class="add_icon"
            :list="formDataObject.goodsList"
            @change="changeList"
          >
            <div
              v-for="(item, i) of formDataObject.goodsList"
              :key="i"
              class="image_add_wrap"
            >
              <img
                class="delete_icon"
                @click="deleteImageInfo(item, i)"
                src="~@images/shop/icon_middle_modalbox_delete_s.png"
                alt
              />
              <div
                class="shopImg"
                :style="{
                  background: `url(${item.goodsImgUrl}) no-repeat 50% 50% /cover`,
                }"
              >
                <!-- <img :src="item.roomPicture" alt /> -->
              </div>
            </div>
          </draggable>
        </div>
        <div class="add_btn" @click="openModalAdd">
          <img
            class="icon_add"
            src="~@images/shop/icon_right_attributebar_jiahao.png"
          />
          <span class="text">添加商品/优惠券</span>
        </div>
      </div>
      <a-divider />
      <div class="live_style_wrap">
        <div class="label_wrap">
          <div class="label_gray">列表样式</div>
          <div class="text">
            {{ formDataObject.listStyle | listStyleFilter }}
          </div>
        </div>
        <div class="list_style">
          <div
            :class="[
              'list_check',
              formDataObject.listStyle == '1' ? 'icon_btn_check' : '',
            ]"
            @click="changeCheck('listStyle', '1')"
          >
            <span
              class="iconfont icon-icon_left_assemblybar_mofang_default"
            ></span>
          </div>
          <div
            @click="changeCheck('listStyle', '2')"
            :class="[
              'list_check',
              formDataObject.listStyle == '2' ? 'icon_btn_check' : '',
            ]"
          >
            <span
              class="iconfont icon-icon_right_attributebar_ztyw_default"
            ></span>
          </div>
        </div>
        <a-divider />
      </div>
      <div class="line" v-if="formDataObject.listStyle == 1">
        <span class="label_wrap">
          <span class="label_gray">边框倒角</span>
          <span class="text">
            {{ formDataObject.borderRounding == "1" ? "直角" : "圆角" }}
          </span>
        </span>
        <span class="check_radio">
          <span
            class="
              icon_btn
              iconfont
              icon-icon_right_attributebar_zhijiao_default
            "
            :class="{
              icon_btn_check: formDataObject.borderRounding == '1',
            }"
            @click="changeCheck('borderRounding', '1')"
          ></span>
          <span
            class="
              icon_btn
              iconfont
              icon-icon_right_attributebar_yuanjiao_default
            "
            :class="{
              icon_btn_check: formDataObject.borderRounding == '2',
            }"
            @click="changeCheck('borderRounding', '2')"
          ></span>
        </span>
      </div>
      <a-divider v-if="formDataObject.listStyle == 1" />
      <div class="line">
        <span class="label_wrap">
          <span class="label_gray">积分数量</span>
          <span class="text">
            {{ formDataObject.integralNum ? "显示" : "不显示" }}
          </span>
        </span>
        <span class="check_radio">
          <span
            class="_check"
            @click="changeCheck('integralNum', true)"
            v-if="!formDataObject.integralNum"
          ></span>
          <span
            class="iconfont icon-Checkbox"
            v-else
            @click="changeCheck('integralNum', false)"
          ></span>
        </span>
      </div>
      <div class="line">
        <span class="label_wrap">
          <span class="label_gray">兑换按钮</span>
          <span class="text">
            {{ formDataObject.exchangeBtn ? "显示" : "不显示" }}
          </span>
        </span>
        <span class="check_radio">
          <span
            class="_check"
            @click="changeCheck('exchangeBtn', true)"
            v-if="!formDataObject.exchangeBtn"
          ></span>
          <span
            class="iconfont icon-Checkbox"
            v-else
            @click="changeCheck('exchangeBtn', false)"
          ></span>
        </span>
      </div>
      <div class="line">
        <span class="label_wrap">
          <span class="label_gray">商品原价</span>
          <span class="text">
            {{ formDataObject.originalPrice ? "显示" : "不显示" }}
          </span>
        </span>
        <span class="check_radio">
          <span
            class="_check"
            @click="changeCheck('originalPrice', true)"
            v-if="!formDataObject.originalPrice"
          ></span>
          <span
            class="iconfont icon-Checkbox"
            v-else
            @click="changeCheck('originalPrice', false)"
          ></span>
        </span>
      </div>
    </div>
    <chooseGoods
      ref="productManage"
      @confirmGoods="confirmGoods"
      :goodsIds="goodIds"
      :couponIds="couponIds"
      :allIds="allIds"
      :goodsList="goodsList"
    >
    </chooseGoods>
  </div>
</template>
<script>
import { cloneDeep } from "lodash";
import chooseGoods from "./components/chooseGoods.vue";
import draggable from "vuedraggable";
export default {
  name: "MyIntegralMallForm",
  components: {
    draggable,
    chooseGoods,
  },
  props: {
    // 传入的原始数据
    formData: {},
  },
  filters: {
    listStyleFilter(val) {
      switch (val) {
        case "1":
          return "瀑布流";
        case "2":
          return "横条式";
        default:
          return "";
      }
    },
  },
  created() {
    this.formDataObject = cloneDeep(this.formData);
    this.goodsList = this.formDataObject.goodsList;

    this.goodIds = this.formDataObject.goodIds;
    this.couponIds = this.formDataObject.couponIds;
    this.allIds = this.formDataObject.allIds;


  },
  data() {
    return {
      formDataObject: {},
      headers: {
        authorization: "authorization-text",
      },
      goodIds: [],
      couponIds: [],
      allIds: [],
      goodsList: [],
    };
  },
  watch: {
    formDataObject: {
      handler(n, o) {
        this.goodsList = n.goodsList;
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
  methods: {
    deleteImageInfo(item, index) {
      this.formDataObject.goodsList.splice(index, 1);
      let arr = [];
      this.formDataObject.goodsList.forEach((element) => {
        arr.push(element.id);
      });
      this.formDataObject.allIds = arr;
      this.allIds = JSON.parse(JSON.stringify(this.formDataObject.allIds));
      if (item.goodsType == 1) {
        this.formDataObject.goodIds = this.formDataObject.goodIds.filter(
          (l) => {
            let show = true;
            if (l == item.id) show = false;
            return show;
          }
        );
        console.log(this.formDataObject.goodIds, "000000000");
        this.goodIds = JSON.parse(JSON.stringify(this.formDataObject.goodIds));
      } else {
        this.formDataObject.couponIds = this.formDataObject.couponIds.filter(
          (l) => {
            let show = true;
            if (l == item.id) show = false;
            return show;
          }
        );
        this.couponIds = JSON.parse(
          JSON.stringify(this.formDataObject.couponIds)
        );
      }
    },
    openModalAdd() {
      // this.pageModalVisible = true;
      this.$refs.productManage.visible = true;
    },
    changeList() {
      let arr = [];
      let goods = [];
      let coupon = [];
      this.formDataObject.goodsList.forEach((element) => {
        arr.push(element.id);
        if (element.goodsType == 1) {
          goods.push(element.id);
        } else {
          coupon.push(element.id);
        }
      });
      this.formDataObject.allIds = arr;
      this.allIds = JSON.parse(JSON.stringify(this.formDataObject.allIds));
      this.formDataObject.goodIds = goods;
      this.goodIds = JSON.parse(JSON.stringify(this.formDataObject.goodIds));
      this.formDataObject.couponIds = coupon;
      this.couponIds = JSON.parse(
        JSON.stringify(this.formDataObject.couponIds)
      );
    },
    changeCheck(a, b) {
      this.$set(this.formDataObject, a, b);
    },
    confirmGoods(e, allIds, goods, coupon) {
      console.log(e, "pppppppp");
      this.formDataObject.goodIds = goods;
      this.formDataObject.couponIds = coupon;
      this.formDataObject.allIds = allIds;

      this.goodIds = goods;
      this.couponIds = coupon;
      this.allIds = allIds;
      this.formDataObject.goodsList = e.map((item) => {
        if (item.goodsType) {
          return item;
        } else {
          if (item.goodsName) {
            return {
              goodsType: 1,
              goodsImgUrl: item.goodsPicture,
              goodsName: item.goodsName,
              integralNum: item.integralPrice || 0,
              salePrice: item.salePrice || 0,
              goodsPrice: item.marketPrice || 0,
              paymentWay: item.paymentWay,
              id: item.id,
            };
          } else {
            return {
              goodsType: 2,
              goodsImgUrl: require("@/assets/images/default/qietu_xiangqing_manjianquan@2x.png"),
              goodsName: item.couponName,
              couponType: item.couponType,
              integralNum: item.redeemAmount,
              id: item.id,
              couponFullMoney: item.couponFullMoney,
              couponAmount: item.couponAmount,
              discountRatio: item.discountRatio,
              mostDiscount: item.mostDiscount,
            };
          }
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.integral-mall-form {
  .add_live_wrap {
    .title {
      color: #333;
    }
    .desc {
      margin-top: 10px;
    }
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
          // background-color: rgb(2, 1, 1);
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
        }
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
.live_style_wrap {
  .label_wrap {
    display: flex;
    justify-content: flex-start;
    .text {
      color: #333;
    }
  }
}
.label_gray {
  color: #999;
  font-size: 14px;
  margin-right: 15px;
}
.list_style {
  display: flex;
  margin-top: 10px;
  .list_check {
    text-align: center;
    width: 58px;
    height: 32px;
    line-height: 32px;
    border: 1px solid #e6e6e6;
    .iconfont {
      font-size: 24px;
      color: #e6e6e6;
    }
  }
  .icon_btn_check {
    border: 1px solid #016bff;
    color: #016bff;
    .iconfont {
      color: #016bff;
    }
  }
}
.line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  .check_radio {
    height: 32px;
    line-height: 32px;
    // min-width: 100px;
    align-items: center;
    ._check {
      cursor: pointer;
      width: 16px;
      height: 16px;
      border: 1px solid #e6e6e6;
      border-radius: 2px;
      display: inline-block;
    }
    .icon-Checkbox {
      font-size: 16px;
      color: #016bff;
    }
  }
}
.line {
  .check_radio {
    display: flex;
    .icon_btn {
      cursor: pointer;
      width: 50px;
      border: 1px solid #e6e6e6;
      text-align: center;
      border-radius: 3px;
      font-size: 24px;
    }
    .icon_btn_check {
      border: 1px solid #016bff;
      color: #016bff;
    }
  }
}
</style>

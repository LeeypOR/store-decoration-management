<template>
  <div
    class="editor-main"
    :style="{
      transform: 'scale(1)',
    }"
  >
    <div class="header_wrap">
      <h1 class="my-header">个人中心</h1>
    </div>
    <!-- 个人信息 -->
    <div
      class="bannerImg"
      @click="changeTab1"
      :style="{
        border: Tab == 1 ? '1px dashed #1890ff' : '',
        background: `url(${personalInfo.backgroundImage})no-repeat 50% 50% /cover`,
        backgroundPosition: '50% 50%',
      }"
    >
      <!-- <img :src="personalInfo.backgroundImage" /> -->
      <div
        :class="
          personalInfo.portraitLocation == 1
            ? 'bannerTextLeft'
            : personalInfo.portraitLocation == 2
            ? 'bannerTextCenter'
            : 'bannerTextRight'
        "
      >
        <a-avatar :size="64" icon="user" class="avatar" />
        <span class="userName" :style="{ color: personalInfo.nicknameColor }"
          >用户昵称</span
        >
        <div class="memberArea" v-if="personalInfo.isShowMemberLevel == 1">
          <img
            class="styleOne"
            src="~@/assets/images/personalSetting/memberCard.png"
            alt=""
          />
          <div class="memberLeft">
            <div>
              <img
                src="~@/assets/images/personalSetting/middle_modalbox_card_badge_01@2x.png"
                style="width: 40px; height: 40px; margin-top: -15px"
              />
              <span class="memberName" style="margin-top: -15px">小金桔子</span>
            </div>
            <div class="levelBtn" v-if="personalInfo.isUpgrade">
              {{ personalInfo.upgradeMsg }}
              <a-icon type="right" v-if="personalInfo.upgradeMsg" />
            </div>
          </div>
          <!-- <a-icon type="right" class="memberRight" /> -->
        </div>
        <!-- <div
          class="memberArea"
          v-if="
            personalInfo.isShowMemberLevel == 1 && personalInfo.memberStyle == 1
          "
        >
          <div class="memberLeft">
            <img
              src="~@/assets/images/personalSetting/middle_modalbox_card_badge_01@2x.png"
              style="width: 40px; height: 40px"
            />
            <span class="memberName">小金桔子</span>
          </div>
          <a-icon type="right" class="memberRight" />
        </div>
        <div
          class="memberArea memberArea2"
          v-if="
            personalInfo.isShowMemberLevel == 1 && personalInfo.memberStyle == 2
          "
        >
          <div class="memberLeft">
            <img
              src="~@/assets/images/personalSetting/middle_modalbox_card_badge_02.png"
              style="width: 40px; heught: 40px"
            />
            <span class="memberName">小金桔子</span>
          </div>
        </div>
        <div
          class="memberArea memberArea3"
          v-if="
            personalInfo.isShowMemberLevel == 1 && personalInfo.memberStyle == 3
          "
        >
          <div class="memberLeft">
            <span class="memberName">小金桔子</span>
          </div>
        </div> -->
      </div>
      <div class="tag">积分 100</div>
    </div>
    <!-- <div
      class="blankBox"
      v-if="personalInfo.memberStyle == 2 || personalInfo.memberStyle == 3"
    ></div> -->
    <!-- <div class="member" style="margin-top: 10px">
      <ul>
        <li>
          <p class="num">1800</p>
          <p class="title">积分</p>
        </li>
        <li>
          <p class="num">5</p>
          <p class="title">优惠券/码</p>
        </li>
        <li>
          <p class="num">2</p>
          <p class="title">卡</p>
        </li>
        <li>
          <p class="num">100.00</p>
          <p class="title">余额</p>
        </li>
      </ul>
    </div> -->
    <!-- 广告位 -->
    <!-- <div
      class="advertising"
      v-if="adSpaceList.templateType == 1"
      :style="Tab == 2 ? 'border:1px dashed #1890ff' : ''"
      @click="changeTab2"
    >
      <div v-if="adSpaceList.spaceImages.length > 0">
        <div
          class="swaperBox"
          v-for="(l, i) in adSpaceList.spaceImages"
          :key="i"
        >
          <div class="swaper">
            <div class="box">
              <img :src="l.image" class="banner1" v-if="l.image != ''" />
              <div class="banner1" v-else></div>
            </div>
          </div>
        </div>
      </div>
      <div class="swaperBox" v-else>
        <div class="swaper">
          <div class="textBox">
            <p>点击编辑广告位</p>
            <p>建议尺寸710*200</p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="advertising"
      v-else-if="adSpaceList.templateType == 3"
      :style="Tab == 2 ? 'border:1px dashed #1890ff' : ''"
      @click="changeTab2"
    >
      <div class="adbox" v-if="adSpaceList.spaceImages.length > 0">
        <div
          class="swaperBox"
          v-for="(l, i) in adSpaceList.spaceImages"
          :key="i"
        >
          <div class="swaper">
            <div class="box">
              <img :src="l.image" class="banner1" v-if="l.image != ''" />
              <div class="banner1" v-else></div>
            </div>
          </div>
        </div>
      </div>
      <div class="swaperBox" v-else>
        <div class="swaper">
          <div class="textBox">
            <p>点击编辑广告位</p>
            <p>建议尺寸710*200</p>
          </div>
        </div>
      </div>
    </div> -->
    <div
      class="advertising"
      :style="Tab == 2 ? 'border:1px dashed #1890ff' : ''"
      v-if="adSpaceList.spaceImages"
    >
      <div class="swaperBox" v-if="adSpaceList.spaceImages.length > 0">
        <div class="swaper" @click="changeTab2">
          <a-carousel autoplay dot-position="bottom" class="sbox">
            <div v-for="(l, i) in adSpaceList.spaceImages" :key="i" class="box">
              <img
                :src="l.image"
                class="banner bannerImg"
                v-if="l.image != ''"
              />
              <div class="banner" v-else></div>
              <div class="swaperTitle" v-if="l.title">{{ l.title }}</div>
            </div>
          </a-carousel>
        </div>
      </div>
      <div class="swaperBox" v-else>
        <div class="swaper" @click="changeTab2">
          <div class="textBox">
            <p>点击编辑广告位</p>
            <p>建议尺寸710*200</p>
          </div>
        </div>
      </div>
    </div>

    <div class="order">
      <div class="top">
        <span class="title">我的订单</span
        ><span class="topRight">查看全部订单 <a-icon type="right" /></span>
      </div>
      <div class="bottom">
        <ul>
          <li>
            <img
              src="~@/assets/images/personalSetting/icon_middle_modalbox_dingdan_daifukuan.png"
              alt=""
            />
            <p>待付款</p>
          </li>
          <li>
            <img
              src="~@/assets/images/personalSetting/icon_middle_modalbox_dingdan_daifahuo.png"
              alt=""
            />
            <p>待发货</p>
          </li>
          <li>
            <img
              src="~@/assets/images/personalSetting/icon_middle_modalbox_dingdan_daishouhuo.png"
              alt=""
            />
            <p>待收获</p>
          </li>
          <li>
            <img
              src="~@/assets/images/personalSetting/icon_middle_modalbox_dingdan_daifukuan_1.png"
              alt=""
            />
            <p>待评价</p>
          </li>
          <li>
            <img
              src="~@/assets/images/personalSetting/icon_middle_modalbox_dingdan_tuikuan.png"
              alt=""
            />
            <p>退款/售后</p>
          </li>
        </ul>
      </div>
    </div>
    <!-- 必备工具 -->
    <div
      :style="Tab == 3 ? 'border:1px dashed #1890ff' : ''"
      @click="changeTab3"
      class="toolBox1"
    >
      <div class="toolBox" v-for="(l, i) in menuList" :key="i">
        <div class="tool" v-if="l.isShow">
          <div>
            <img
              :src="
                styleType.styleType == 1
                  ? $options.filters.filterMenuIcon1(l.toolCode)
                  : $options.filters.filterMenuIcon2(l.toolCode)
              "
              style="width: 20px; height: 20px; margin: -3px 5px 0 5px"
            />
            {{ l.toolCode | filterMenuName }}
          </div>
          <div>
            <a-icon type="right" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  props: {},
  watch: {},
  computed: {
    ...mapState({
      personalInfo: (state) => state.setPersonal.personalCenter,
      Tab: (state) => state.setPersonal.tab,
      adSpaceList: (state) => state.setPersonal.adSpaceList,
      styleType: (state) => state.setPersonal.styleType,
      menuList: (state) => state.setPersonal.menuList,
    }),
  },
  filters: {
    filterMenuName: function (val) {
      switch (val) {
        case "ZXFA":
          return "装修方案";
        case "QB":
          return "分销员中心";
        case "SHDZ":
          return "收货地址";
        case "SPSC":
          return "商品收藏";
        case "YHQ":
          return "优惠券";
        case "WDPT":
          return "我的拼团";
        case "CJZP":
          return "我的赠品";
        case "FPGL":
          return "发票管理";
        case "DHZQ":
          return "兑换专区";
      }
    },
    filterMenuIcon1: function (val) {
      switch (val) {
        case "ZXFA":
          return require("@/assets/images/personalSetting/icon_middle_modalbox_my plan_fill.png");
        case "QB":
          return require("@/assets/images/personalSetting/icon_middle_modalbox_account_wallet.png");
        case "SHDZ":
          return require("@/assets/images/personalSetting/icon_middle_modalbox_address_fill.png");
        case "SPSC":
          return require("@/assets/images/personalSetting/icon_middle_modalbox_favorite_fill.png");
        case "YHQ":
          return require("@/assets/images/personalSetting/icon_middle_modalbox_coupon_fill.png");
        case "WDPT":
          return require("@/assets/images/personalSetting/icon_middle_modalbox_pintuan_fill@2x.png");
        case "CJZP":
          return require("@/assets/images/personalSetting/zengpin@2x_fill.png");
        case "FPGL":
          return require("@/assets/images/personalSetting/icon_middle_modalbox_fapiaoguanli_fill@2x.png");
        case "DHZQ":
          return require("@/assets/images/personalSetting/icon_middle_modalbox_duihuanzhuanqu_fill@2x.png");
      }
    },
    filterMenuIcon2: function (val) {
      switch (val) {
        case "ZXFA":
          return require("@/assets/images/personalSetting/icon_middle_modalbox_my plan_line.png");
        case "QB":
          return require("@/assets/images/personalSetting/icon_middle_modalbox_wallet_line.png");
        case "SHDZ":
          return require("@/assets/images/personalSetting/icon_middle_modalbox_address_line.png");
        case "SPSC":
          return require("@/assets/images/personalSetting/icon_middle_modalbox_favorite_line.png");
        case "YHQ":
          return require("@/assets/images/personalSetting/icon_middle_modalbox_coupon_line.png");
        case "WDPT":
          return require("@/assets/images/personalSetting/icon_middle_modalbox_pintuan_line@2x.png");
        case "CJZP":
          return require("@/assets/images/personalSetting/zengpin@2x_line.png");
        case "FPGL":
          return require("@/assets/images/personalSetting/icon_middle_modalbox_fapiaoguanli_line@2x.png");
        case "DHZQ":
          return require("@/assets/images/personalSetting/icon_middle_modalbox_duihuanzhuanqu_line@2x.png");
      }
    },
  },
  created() {},
  methods: {
    changeTab1() {
      this.$store.dispatch("setTab", 1);
    },
    changeTab2() {
      this.$store.dispatch("setTab", 2);
    },
    changeTab3() {
      this.$store.dispatch("setTab", 3);
    },
  },
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
.editor-main {
  margin: 0 auto;
  width: 375px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  background: #fafafa;
  box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.1);
  position: relative;
  .header_wrap {
    background: url("~@images/shop/top.png") no-repeat center center;
    height: 64px;
    width: 375px;
    position: relative;
    .my-header {
      font-family: PingFangSC-Medium;
      font-size: 16px;
      font-weight: 700;
      color: #191919;
      position: absolute;
      top: 30px;
      left: 50%;
      transform: translateX(-50%);
      margin-bottom: 0;

      // width: 100%;
      // height: 40px;
      // line-height: 40px;
      // text-align: center;
    }
  }
  .bannerImg {
    width: 100%;
    height: 275px;
    position: relative;
    box-sizing: border-box;
    cursor: pointer;
    border-bottom-left-radius: 80px;
    img {
      width: 100%;
      height: 100%;
      border-bottom-left-radius: 80px;
      // opacity: 0.5;
    }
    .bannerTextLeft {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      border-bottom-left-radius: 80px;
      padding: 45px 15px;
      .userName {
        font-size: 24px;
        font-weight: bolder;
        color: #333333;
        line-height: 40px;
      }
      .avatar {
        margin-right: 10px;
      }
    }
    .bannerTextCenter {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      flex-direction: column;
      padding: 45px 15px;
      .userName {
        font-size: 24px;
        font-weight: bolder;
        color: #333333;
        line-height: 40px;
      }
    }
    .bannerTextRight {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
      box-sizing: border-box;
      justify-content: space-between;
      padding: 45px 15px;
      .userName {
        font-size: 24px;
        font-weight: bolder;
        color: #333333;
        line-height: 40px;
      }
      .avatar {
        margin-right: 10px;
      }
    }
    .memberArea {
      width: 90%;
      height: 70px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      // background: url("~@/assets/images/personalSetting/memberStyle.png")
      //   no-repeat 100% 100%;
      // background: rgb(197, 159, 118);
      // background: rgb(58, 54, 57);
      // background-size: 100% 60px;
      position: absolute;
      left: 5%;
      bottom: 0;
      // vertical-align:bottom;
      // padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
      .styleOne {
        width: 100%;
        height: 100%;
        border-radius: 8px;
      }
      .memberLeft {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        .levelBtn {
          color: #fff;
          font-size: 15px;
          font-family: PingFangSC-Medium, PingFa;
          font-weight: 500;
          margin-top: -2px;
        }
        .memberName {
          // color: rgb(182, 147, 92);
          color: #fff;
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFa;
          font-weight: 500;
          line-height: 17px;
          text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
          margin-left: 8px;
        }
      }
      .memberRight {
        // color: rgb(121, 119, 114);
        color: #fff;
        font-weight: 500;
        font-size: 16px;
      }
    }
    .memberArea2 {
      background: url("~@/assets/images/personalSetting/middle_modalbox_card_bg_02.png")
        no-repeat;
      background-size: 100% 80px;
      bottom: -40px;
      left: 2%;
      height: 80px;
      width: 96%;
    }
    .memberArea3 {
      background: url("~@/assets/images/personalSetting/middle_modalbox_card_bg_03.png")
        no-repeat;
      background-size: 100% 100%;
      bottom: -40px;
      left: 2%;
      width: 96%;
      height: 80px;
    }
    .tag {
      position: absolute;
      left: 0;
      bottom: -36px;
      width: 130px;
      height: 60px;
      background: linear-gradient(180deg, #fff8f0 0%, #ffffff 100%);
      box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
      line-height: 60px;
      text-align: center;
      border-top-right-radius: 888888888px;
      border-bottom-right-radius: 888888888px;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #000000;
      letter-spacing: 0;
      font-weight: 400;
    }
  }
  .advertising {
    width: 100%;
    padding: 10px 0;
    margin-top: 40px;
  }
  .adbox {
    display: flex;
    overflow: auto;
    flex-wrap: nowrap;
    .swaperBox {
      flex-shrink: 0;
    }
  }
  .swaperBox {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    .swaper {
      width: 94%;
      height: 100%;
      box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
      background: rgb(235, 248, 253);
      // display: flex;
      // flex-direction: column;
      // justify-content: center;
      // align-items: center;
      border-radius: 7px;
      cursor: pointer;
      overflow: hidden;
      position: relative;
      .sbox {
        overflow: hidden;
        width: 100%;
        height: 100px;
        .box {
          overflow: hidden;
          display: flex !important;
          justify-content: center;
          align-items: center;
          height: 100px;
        }
      }
      .textBox {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        p {
          font-size: 17px;
          color: skyblue;
          text-align: center;
        }
      }
      .banner {
        min-width: 100%;
        max-width: 200%;
        border-radius: 8px;
        height: unset;
      }
      .banner1 {
        width: 100%;
        height: 100px;
      }
    }
  }
}
/* For demo */
.ant-carousel .slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}
.toolBox1 {
  padding: 10px 0 20px;
}
.toolBox {
  display: flex;
  justify-content: center;
}

.tool {
  width: 94%;
  line-height: 44px;
  background: #fff;
  border-radius: 5px;
  padding-left: 10px;
  margin-top: 1px;
  // box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #191919;
}
.toolBox:first-child .tool {
  // box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.1);
  border-top: none;
}
.member {
  width: 94%;
  background: #fff;
  padding: 10px 0;
  margin: auto;
  border-radius: 8px;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  ul {
    display: flex;
    li {
      width: 25%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .num {
        font-size: 18px;
        color: #000;
        line-height: 28px;
        font-weight: bold;
      }
      .title {
        font-size: 14px;
        color: #b8b8b8;
        line-height: 22px;
      }
    }
  }
}
.order {
  width: 94%;
  background: #fff;
  padding: 10px;
  margin: auto;
  border-radius: 8px;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  .top {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
    .title {
      font-size: 16px;
      color: #000;
      font-weight: bold;
    }
    .topRight {
      font-size: 14px;
      color: #b8b8b8;
    }
  }
  .bottom {
    width: 100%;
    padding: 10px 0;
    ul {
      display: flex;
      li {
        width: 20%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p {
          margin-top: 8px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingF;
          font-weight: 400;
          color: #000000;
          line-height: 17px;
        }
        img {
          width: 32px;
          height: 32px;
        }
        .icon {
          font-size: 30px;
        }
      }
    }
  }
}
/deep/::-webkit-scrollbar {
  width: 0px !important;
  height: 10px;
}
.blankBox {
  width: 100%;
  height: 40px;
}
.box {
  position: relative;
  .swaperTitle {
    background: rgb(174, 181, 184);
    width: 100%;
    line-height: 40px;
    font-size: 18px;
    color: #333333;
    position: absolute;
    left: 0;
    bottom: 0;
    padding-left: 10px;
    opacity: 0.8;
  }
}
</style>
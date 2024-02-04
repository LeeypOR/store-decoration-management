<template>
  <div
    class="editor-main"
    :style="{
      transform: 'scale(1)',
    }"
  >
    <div
      style="
        width: 375px;
        box-shadow: 0px 10px 30px 0px rgb(0 0 0 / 30%);
        position: relative;
      "
    >
      <div class="header_wrap">
        <h1 class="my-header">会员中心</h1>
      </div>
      <!-- 会员中心 头部-->
      <div class="member_head">
        <div class="member_info">
          <!-- <div class="avatarBox"> -->
          <div class="avatar">
            <!-- <a-avatar :size="64" icon="user" /> -->
            <img src="~@/assets/images/share/memberAvatar.png" alt="" />
          </div>
          <!-- </div> -->
          <div class="user">
            <div class="username">用户昵称</div>
            <!-- <div class="memberLevel">金粉会员</div> -->
          </div>
        </div>
        <!-- <div
        :class="Tab == 1 ? 'member_equitiesActive' : 'member_equities'"
        v-if="isShowEquity"
      >
        {{ Text }}
      </div> -->
        <div class="banner1"></div>
        <div class="banner2"></div>
      </div>
      <!-- 会员权益 -->
      <div class="members_equity">
        <ul
          class="members_card"
          :style="Tab == 3 ? 'border:2px dashed #1890ff' : ''"
        >
          <li class="card_item" @click="changeTab3">
            <div class="equity_head">
              <img
                src="~@/assets/images/share/middle_modalbox_icon_viplevel01.png"
                alt=""
                class="VipIcon"
              />
              金粉会员
              <div class="LevelArea" v-if="memberInfo.isShowLevel">
                {{ memberInfo.levelText }}
              </div>
            </div>
            <ul class="equities">
              <li>
                <div class="num">21</div>
                <div class="text">消费单数</div>
              </li>
              <li>
                <div class="num">1</div>
                <div class="text">会员优惠券</div>
              </li>
              <li>
                <div class="num">2100</div>
                <div class="text">会员积分</div>
              </li>
            </ul>
            <div class="upgradeRrules">· 再消费250元可升级为金星会员 ·</div>
          </li>
        </ul>
        <div class="fansBox">
          <div
            class="fans_equity"
            @click="changeTab"
            :style="Tab == 1 ? 'border:2px dashed #1890ff' : ''"
          >
            <h3 class="fans_title">粉丝会员权益</h3>
            <ul class="fans_equityDetails">
              <li>
                <div class="equity_icon">
                  <img
                    src="~@/assets/images/share/icon_middle_modalbox_quanyi_zjf_default.png"
                  />
                </div>
                <div class="equity_name">赚积分</div>
              </li>
              <li>
                <div class="equity_icon">
                  <img
                    src="~@/assets/images/share/icon_middle_modalbox_quanyi_jjgw_default.png"
                  />
                </div>
                <div class="equity_name">家居顾问</div>
              </li>
              <li>
                <div class="equity_icon">
                  <img
                    src="~@/assets/images/share/icon_middle_modalbox_quanyi_sjlb_default.png"
                  />
                </div>
                <div class="equity_name">升级礼包</div>
              </li>
              <li>
                <div class="equity_icon">
                  <img
                    src="~@/assets/images/share/icon_middle_modalbox_quanyi_spjz_Disabled.png"
                  />
                </div>
                <div class="equity_name disable">商品9折</div>
              </li>
              <li>
                <div class="equity_icon">
                  <img
                    src="~@/assets/images/share/icon_middle_modalbox_quanyi_ebjf_Disabled.png"
                  />
                </div>
                <div class="equity_name disable">2倍积分</div>
              </li>
            </ul>
            <div class="equiityDetails" v-show="memberInfo.isShowEquity">
              {{ memberInfo.title }}
            </div>
          </div>
        </div>
      </div>
      <div class="componentArea">
        <draggable class="draggable_wrap" :list="pageList" v-bind="dragOptions">
          <transition-group
            name="moduleView"
            type="transition"
            class="transition"
            tag="div"
          >
            <div
              class="pointer component-item"
              ref="componentsItem"
              :class="{ current: currentComponent.id === item.id }"
              @click="openComponentConfig(item)"
              v-for="item in pageList"
              :key="item.id"
            >
              <div class="tag_wrap">
                {{ item.config.title }}
              </div>
              <div class="delete" @click.stop="deleteComponent(item)"></div>
              <component :is="item.key" :item="item"></component>
            </div>
          </transition-group>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import draggable from "vuedraggable";
import * as components from "../../../customDecorate/microPage/components/editCustom/components/components/index";
const nameInComponents = {};
Object.keys(components).forEach((key) => {
  nameInComponents[components[key].name] = components[key];
});
export default {
  data() {
    return {};
  },
  components: {
    ...nameInComponents,
    draggable,
  },
  props: {
    pageList: {
      type: Array,
      default: [],
    },
    currentComponent: {
      type: Object,
    },
    memberInfo: {
      type: Object,
    },
  },
  watch: {},
  computed: {
    ...mapState({
      Tab: (state) => state.setPersonal.tab,
      // memberInfo: (state) => state.memberCenter.memberInfo,
    }),
    dragOptions() {
      return {
        group: "moduleView",
        animation: 200,
        ghostClass: "drag_preview_class",
        tag: "div",
        disabled: false,
      };
    },
  },
  created() {},
  methods: {
    changeTab() {
      this.$store.dispatch("setTab", 1);
    },
    changeTab2() {
      this.$store.dispatch("setTab", 2);
    },
    changeTab3() {
      this.$store.dispatch("setTab", 3);
    },
    openComponentConfig(item) {
      this.$store.dispatch("setTab", 2);
      this.$emit("openComponentConfig", item);
    },
    // addModules(e) {
    //   // console.log('addModules', e)
    //   // console.log('左侧被拖动的组件下标为:', e.oldDraggableIndex)
    //   // console.log('右侧被拖到的组件下标为:', e.newDraggableIndex)

    //   const oldDraggableIndex = e.oldDraggableIndex;
    //   const newDraggableIndex = e.newDraggableIndex;

    //   this.$emit("addComponents", oldDraggableIndex, newDraggableIndex);
    // },
    deleteComponent(item) {
      this.$emit("deleteComponent", item);
    },
  },
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
.editor-main {
  margin: 0 auto;
  // width: 375px;
  width: 477px;
  height: 100%;
  overflow-x: visible;
  overflow-y: scroll;
  background: #fafafa;
  // box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.1);
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
}
// ::-webkit-scrollbar {
//   width: 0px !important;
//   height: 10px;
// }
.member_head {
  display: flex;
  // padding: 40px 0 80px;
  // width: 375px;
  justify-content: flex-end;
  // background: #b8b8b8;
  width: 375px;
  height: 240px;
  background-image: linear-gradient(179deg, #ead1ad 2%, #fafafa 100%);
  .member_info {
    position: absolute;
    left: 0;
    top: 150px;
    margin-left: 15px;
    display: flex;
    align-items: center;
    .avatar {
      width: 64px;
      height: 64px;
      margin-right: 10px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 64px;
        height: 64px;
      }
    }
    .user {
      .username {
        font-family: PingFangSC-Semibold;
        font-size: 18px;
        color: #ffffff;
        letter-spacing: 0;
        text-shadow: 0 2px 4px rgba(217, 172, 109, 0.5);
        font-weight: 600;
      }
      .memberLevel {
        background: rgb(242, 242, 242);
        border-radius: 888888888px;
        text-align: center;
        width: 90px;
        line-height: 22px;
        margin-top: 10px;
        font-size: 13px;
      }
    }
  }
  .member_equitiesActive {
    line-height: 36px;
    height: 36px;
    background: #fff;
    font-size: 15px;
    // width: 120px;
    border-top-left-radius: 888888888px;
    border-bottom-left-radius: 888888888px;
    text-align: center;
    padding: 0 15px;
    margin-top: 25px;
    font-weight: bold;
    border: 1px dashed #1890ff;
  }
  .member_equities {
    line-height: 36px;
    height: 36px;
    background: #fff;
    font-size: 15px;
    // width: 120px;
    border-top-left-radius: 888888888px;
    border-bottom-left-radius: 888888888px;
    text-align: center;
    padding: 0 15px;
    margin-top: 25px;
    font-weight: bold;
  }
}
.members_equity {
  width: 375px;
  background: #fff;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  .members_card {
    width: 100%;
    display: flex;
    height: 164px;
    margin-top: -96px;
    padding: 10px 20px;
    flex-wrap: nowrap;
    overflow: auto;
    z-index: 55;
    .card_item {
      flex-shrink: 0;
      width: 98%;
      background: url("~@images/share/middle_modalbox_VIPcard_bg_06.png")
        no-repeat center center;
      // background-image: linear-gradient(215deg, #183865 0%, #6f94bf 100%);
      background-size: contain;
      border-radius: 8px;
      padding: 15px 0 10px;
      font-weight: bold;
      .equity_head {
        padding: 0 8px;
        display: flex;
        align-items: center;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 700;
        color: #fff0d2;
        position: relative;
        .VipIcon {
          width: 40px;
          height: 40px;
        }
        .LevelArea {
          position: absolute;
          right: 30px;
          top: 11px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #fff0d2;
          line-height: 14px;
          cursor: pointer;
        }
      }
      .upgradeRrules {
        // position: absolute;
        // right: 16px;
        // top: 11px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #fff0d2;
        line-height: 14px;
        margin: 5px 0 0 30px;
      }
      .equities {
        margin-top: 10px;
        display: flex;
        padding: 0 40px;
        justify-content: space-between;
        li {
          color: #fff;
          padding-bottom: 10px;
          .num,
          .text {
            text-align: center;
          }
          .num {
            font-size: 18px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #fff0d2;
            text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
          }
          .text {
            font-size: 10px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #fff0d2;
            line-height: 14px;
            text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
          }
        }
      }
    }
    .card_item + .card_item {
      margin-left: 5px;
    }
    .card_item:first-child {
      margin-left: 5px;
    }
    .padding_right {
      padding-right: 20px;
    }
  }
  .fansBox {
    width: 100%;
    padding: 0 10px;
    .fans_equity {
      width: 100%;
      margin-top: 20px;
      padding: 10px 0;
      height: 135px;
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.1);
      position: relative;
      .fans_title {
        padding-left: 10px;
        text-align: center;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: #191919;
        margin-bottom: 15px;
      }
      .fans_equityDetails {
        width: 100%;
        display: flex;
        justify-content: space-between;
        li {
          width: 20%;
          display: flex;
          flex-direction: column;
          // justify-content: center;
          align-items: center;
          .equity_icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .equity_name {
            font-size: 14px;
            margin-top: 7px;
            color: #000;
          }
          .disable {
            color: #999999;
          }
        }
      }
      .equiityDetails {
        padding: 0 10px;
        height: 29px;
        cursor: pointer;
        position: absolute;
        right: 0;
        top: 8px;
        background: url("~@images/share/middle_modalbox_qysm_bg.png") no-repeat;
        background-size: 100% 100%;
        font-size: 10px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        text-align: center;
      }
    }
  }
}
.draggable_wrap {
  .transition {
    // height: 558px;
    // width: 100%;
    width: 375px;

    // overflow-x: hidden;
    // overflow-y: scroll;
    // min-height: 558px;
  }
}
.component-item {
  // margin-bottom: 10px;
  position: relative;
  &:hover {
    .tag_wrap {
      display: none;
    }
    .delete {
      display: block;
    }
  }
  .delete {
    width: 92px;
    height: 32px;
    display: none;
    position: absolute;
    right: -92px;
    top: 0;
    z-index: 5;
    font-size: 20px;
    background: url("~@images/shop/icon_middle_modalbox_delete_default.png")
      no-repeat;
  }
  .tag_wrap {
    width: 92px;
    height: 32px;
    line-height: 32px;
    background: url("~@images/shop/icon_middle_modalbox_name_default 2.png");
    position: absolute;
    top: 0;
    right: -92px;
    text-align: center;
    font-size: 12px;
    color: #333333;
  }
}
.editor-main {
  &::-webkit-scrollbar-track-piece {
    background-color: #fafafa; /*滑道*/
    -webkit-border-radius: 4px; /*滑道圆角宽度*/
  }
}
// @media (max-height: 860px) {
//   .editor-main {
//     // height:480px;
//     .transition {
//       height: 480px;
//     }
//   }
// }
// @media (min-height: 861px) {
//   .editor-main {
//     // height:680px;
//     .transition {
//       height: 680px;
//     }
//   }
// }
.current {
  border: 2px dashed #1890ff;
}
.banner1 {
  width: 92px;
  height: 171px;
  background: linear-gradient(148deg, rgba(234, 209, 173, 0) 0%, #fafafa 100%);
  transform: skew(22deg);
}
.banner2 {
  width: 100px;
  height: 171px;
  background: linear-gradient(162deg, rgba(234, 209, 173, 0) 0%, #fafafa 100%);
  transform: skew(-22deg);
  margin-left: -15px;
  margin-right: 20px;
}
::-webkit-scrollbar {
  width: 1px !important;
  height: 10px;
}
</style>
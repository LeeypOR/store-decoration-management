<!-- 直播组件 -->
<template>
  <div class="live_form">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="样式设置">
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
                class="iconfont icon-icon_right_attributebar_dtms_default"
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
                class="iconfont icon-icon_right_attributebar_yhlt_default"
              ></span>
            </div>

            <div
              @click="changeListStyle3"
              :class="[
                'list_check',
                formDataObject.listStyle == '3' ? 'icon_btn_check' : '',
              ]"
            >
              <span
                class="iconfont icon-icon_left_assemblybar_mofang_default"
              ></span>
            </div>
          </div>
          <a-divider />
        </div>
        <div class="add_live_wrap">
          <div class="title">添加直播</div>
          <div class="label_gray desc">可拖动排序</div>
          <div class="add_item">
            <div>
              <draggable
                class="add_icon"
                :list="formDataObject.roomInfoList"
                @change="changeList"
              >
                <div
                  v-for="(item, i) of formDataObject.roomInfoList"
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
                      background: `url(${item.roomPicture}) no-repeat 50% 50% /cover`,
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
              <span class="text">添加直播</span>
            </div>
          </div>
          <a-divider />
        </div>
        <div class="setting_wrap">
          <div class="line">
            <span class="label_wrap">
              <span class="label_gray">边框</span>
              <span class="text">
                {{ formDataObject.showBorder ? "显示" : "不显示" }}
              </span>
            </span>
            <span class="check_radio">
              <span
                class="_check"
                @click="changeCheck('showBorder', true)"
                v-if="!formDataObject.showBorder"
              ></span>
              <span
                class="iconfont icon-Checkbox"
                v-else
                @click="changeCheck('showBorder', false)"
              ></span>
            </span>
          </div>

          <div class="line">
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

          <div class="line">
            <div class="text_wrap">
              <div class="label_gray">页面边距</div>
            </div>
            <a-slider
              class="slider"
              v-model="formDataObject.pagePadding"
              :max="30"
              style="width: 120px"
            />
            <a-input-number
              v-model="formDataObject.pagePadding"
              :max="30"
              style="marginleft: 16px"
            />
          </div>

          <div class="line">
            <div class="text_wrap">
              <div class="label_gray">商品间距</div>
            </div>
            <a-slider
              class="slider"
              v-model="formDataObject.productPadding"
              :max="30"
              style="width: 120px"
            />
            <a-input-number
              v-model="formDataObject.productPadding"
              :max="30"
              style="marginleft: 16px"
            />
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="内容设置">
        <div class="content_wrap">
          <div class="line">
            <span class="label_wrap">
              <span class="label_gray">默认图片</span>
              <span class="text">
                {{
                  formDataObject.showDefault
                    ? "显示"
                    : formDataObject.listStyle == 3
                    ? "该样式下不支持该功能显示"
                    : "不显示"
                }}
              </span>
            </span>
            <span class="check_radio" v-if="formDataObject.listStyle != 3">
              <span
                class="_check"
                @click="changeCheck('showDefault', true)"
                v-if="!formDataObject.showDefault"
              ></span>
              <span
                class="iconfont icon-Checkbox"
                v-else
                @click="changeCheck('showDefault', false)"
              ></span>
            </span>
            <span class="check_radio" v-else>
              <span class="_check disabledspan"></span>
            </span>
          </div>
          <div class="link_wrap" v-if="formDataObject.showDefault">
            <div class="left">
              <img
                class="icon"
                src="~@images/shop/icon_right_attributebar_zbgengduo_default.png"
              />
              <div class="text">更多直播</div>
            </div>
            <div class="right">
              <div class="label">链接</div>
              <div class="link" @click="backgroundAddLinkPage">
                {{ formDataObject.jumpPageName || "选择跳转到的页面" }}
              </div>
            </div>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
    <!-- 更多直播链接选择框 -->
    <PageModal
      @cancel="backgroundLinkPageModalVisible = false"
      @confirm="backgroundLinkSelectedPage"
      :visible="backgroundLinkPageModalVisible"
      :pageIndex="pageIndex"
      :pageModelId="pageModelId"
    ></PageModal>
    <chooseLive
      ref="productManage"
      @confirmGoodList="confirmRoomList"
      :roomIdList="formDataObject.roomIdList"
    >
    </chooseLive>
  </div>
</template>

<script>
import { cloneDeep } from "lodash";
import PageModal from "@components/antBase/PageModal";
import draggable from "vuedraggable";
import chooseLive from "./chooseLive.vue";
import { findDictNameByValue, createOptionsByDict } from "@/utils/dict";
const appId = createOptionsByDict("LIVE_APPID")[0]
  ? createOptionsByDict("LIVE_APPID")[0].value
  : "100000054"; // 直播平台id
export default {
  name: "MyLiveForm",
  components: {
    PageModal,
    draggable,
    chooseLive,
  },
  directives: {},
  filters: {
    listStyleFilter(val) {
      switch (val) {
        case "1":
          return "样式一";
        case "2":
          return "样式二";
        case "3":
          return "样式三";
        default:
          return "";
      }
    },
  },
  mixins: [],
  model: {},
  props: {
    // 传入的原始数据
    formData: {},
  },
  data() {
    return {
      backgroundLinkPageModalVisible: false,
      pageIndex: "MSPAGE",
      pageModelId: "",

      // pageModalVisible: false,
      formDataObject: {},
      appId: appId,
    };
  },
  computed: {},
  watch: {
    formDataObject: {
      handler(n, o) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        if (n.listStyle == 1) {
          this.formDataObject.imgScale = "1";
          this.formDataObject.imgFill = "0";
        }
        this.timer = setTimeout(() => {
          this.$emit("updateFormData", this.formDataObject);
        }, 300);
      },
      deep: true,
    },
  },
  beforeCreate() {},
  created() {
    this.formDataObject = cloneDeep(this.formData);
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
  // 方法集合
  methods: {
    backgroundAddLinkPage() {
      // 开启产品选择弹窗，以便配置跳转链接
      // this.currentImageItem = item
      this.pageModelId = this.formDataObject.jumpPageId;
      this.pageIndex = this.formDataObject.jumpPageType;
      this.backgroundLinkPageModalVisible = true;
    },

    backgroundLinkSelectedPage({ id, name, type, url }) {
      console.log("收到的已选择信息为:", id, name, type);
      this.$set(this.formDataObject, "jumpPageId", id);
      this.$set(this.formDataObject, "jumpPageName", name);
      this.$set(this.formDataObject, "jumpPageType", type);
      this.$set(this.formDataObject, "jumpPageUrl", url);
      this.backgroundLinkPageModalVisible = false;
    },

    openModalAdd() {
      // this.pageModalVisible = true;
      this.$refs.productManage.visible = true;
    },
    deleteImageInfo(item, index) {
      this.formDataObject.roomInfoList.splice(index, 1);
      this.formDataObject.roomIdList.forEach((l, i) => {
        if (l == item.roomId) {
          this.formDataObject.roomIdList.splice(i, 1);
        }
      });
    },

    changeCheck(a, b) {
      this.$set(this.formDataObject, a, b);
    },
    changeListStyle3() {
      this.$set(this.formDataObject, "listStyle", "3");
      this.$set(this.formDataObject, "showDefault", false);
    },
    // async getLiveRoom() {
    //   let res = await this.$get("goldenhome/gh_/live/app/room/page", {
    //     appId: this.appId,
    //   });
    //   if (res && res.returnCode == 1000) {
    //     console.log(res);
    //   }
    // },
    confirmRoomList(e) {
      console.log(e);
      this.$set(this.formDataObject, "roomIdList", e);
      if (e.length > 0) {
        this.getLiveRoomInfo(e);
      }
    },
    async getLiveRoomInfo(params) {
      let res = await this.$post(
        "goldenhome/gh/live/admin_/room/modelQueryRoomByIds",
        {
          ids: params,
        }
      );
      if (res && res.returnCode == 1000) {
        if (res.dataInfo) {
          let roomInfoList = [];
          res.dataInfo.records.forEach((item) => {
            let productList = [];
            item.productList.forEach((l) => {
              if (l) {
                productList.push({
                  productImage: l.coverImgUrl,
                  productId: l.goodsId,
                  productPrice:
                    l.priceType == 1
                      ? ((l.price * 1) / 100).toFixed(2)
                      : l.priceType == 2
                      ? ((l.price * 1) / 100).toFixed(2) +
                        "~" +
                        ((l.price2 * 1) / 100).toFixed(2)
                      : ((l.price2 * 1) / 100).toFixed(2),
                });
              }
            });
            roomInfoList.push({
              roomPicture: item.shareImgLocal || item.shareImg,
              roomStatus: item.liveStatus,
              roomName: item.name,
              liveTimeDistance: item.distanceStartTime || 0,
              roomProductList: productList,
              roomId: item.roomId,
            });
          });
          console.log(roomInfoList);
          this.$set(this.formDataObject, "roomInfoList", roomInfoList);
        }
      }
    },
    changeList() {
      let ids = [];
      this.formDataObject.roomInfoList.forEach((item) => {
        ids.push(item.roomId);
      });
      this.$set(this.formDataObject, "roomIdList", ids);
    },
  },
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
//@import url();
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
      font-size: 32px;
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

.check_radio {
  height: 32px;
  line-height: 32px;
  // min-width: 100px;
  ._check {
    cursor: pointer;
    width: 16px;
    height: 16px;
    border: 1px solid #e6e6e6;
    border-radius: 2px;
  }
  .icon-Checkbox {
    font-size: 16px;
    color: #016bff;
  }
}

.live_form {
  .live_style_wrap {
    .label_wrap {
      display: flex;
      justify-content: flex-start;
      .text {
        color: #333;
      }
    }
  }
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
          background-color: rgb(2, 1, 1);
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
  .setting_wrap {
    .line {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      .check_radio {
        height: 32px;
        line-height: 32px;
        // min-width: 100px;
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
  }
  .content_wrap {
    .line {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      .check_radio {
        height: 32px;
        line-height: 32px;
        // min-width: 100px;
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
    .link_wrap {
      padding: 10px;
      margin: 5px;
      box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.2);
      border-radius: 2px;
      display: flex;

      .left {
        margin-right: 15px;
        width: 60px;
        height: 60px;
        background: #f6f7f8;
        border: 1px solid #c8c8c8;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        .icon {
          flex: none;
        }
        .text {
          font-size: 12px;
        }
      }
      .right {
        display: flex;
        align-items: center;
        .label {
          margin-right: 15px;
        }
        .link {
          color: #1890ff;
          text-decoration: underline;
          cursor: pointer;
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
.disabledspan {
  background: #f8f8f8 !important;
  cursor: not-allowed !important;
}
</style>

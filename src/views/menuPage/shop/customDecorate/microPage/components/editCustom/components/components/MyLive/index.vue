<!-- 直播组件 -->
<template>
  <div class="live_wrap" :style="{ padding: `0px  ${formData.pagePadding}px` }">
    <div class="room_wrap">
      <div class="style_one" v-if="formData.listStyle == '1'">
        <div class="room_info" :style="roomInfoRadius">
          <div class="left">
            <!-- <img class="room_images" :src="firstRoomInfo.roomPicture" alt="" /> -->
            <div
              class="room_images"
              :style="{
                background: `url(${firstRoomInfo.roomPicture}) no-repeat 50% 50%/cover`,
              }"
            ></div>
            <div
              class="status liveing"
              v-if="firstRoomInfo.roomStatus == '101'"
            >
              直播中
            </div>
            <div
              class="live_not status"
              v-if="
                firstRoomInfo.roomStatus == '102' &&
                firstRoomInfo.liveTimeDistance * 1 > 0
              "
            >
              <div class="preview">预告</div>
              <div class="time">
                {{ firstRoomInfo.liveTimeDistance | timeDistanceFilter }}后开播
              </div>
            </div>
            <div
              class="live_not status"
              v-if="
                firstRoomInfo.roomStatus == '102' &&
                firstRoomInfo.liveTimeDistance * 1 <= 0
              "
            >
              <div class="preview bgred">未开播</div>
              <!-- <div class="time">
                {{ firstRoomInfo.liveTimeDistance | timeDistanceFilter }}后开播
              </div> -->
            </div>
            <div
              class="live_end status"
              v-if="firstRoomInfo.roomStatus == '103'"
            >
              查看回放
            </div>
          </div>
          <div class="right">
            <div class="product_wrap">
              <div
                class="product"
                v-for="(product, j) of firstRoomInfo.roomProductList.slice(
                  0,
                  2
                )"
                :key="j"
              >
                <!-- <img class="product_image" :src="product.productImage" alt="" /> -->
                <div
                  class="product_image"
                  :style="{
                    background: `url(${product.productImage}) no-repeat 50% 50%/cover`,
                  }"
                ></div>
                <div class="price">
                  <!-- {{ product.productPrice | $pointToYuan }} -->
                  ¥{{ product.productPrice }}
                </div>
              </div>
            </div>
            <div class="room_title">{{ firstRoomInfo.roomName }}</div>
          </div>
        </div>
        <div
          class="rest_room_info style1"
          :style="roomInfoRadius"
          v-for="(item, i) of restRoomInfoList"
          :key="i"
        >
          <!-- <img class="room_image" :src="item.roomPicture" alt="" /> -->
          <div
            class="room_image"
            :style="{
              background: `url(${item.roomPicture}) no-repeat 50% 50%/cover`,
            }"
          ></div>
          <div class="nameBox">
            <div class="room_name">{{ item.roomName }}</div>
          </div>
          <div class="status liveing" v-if="item.roomStatus == '101'">
            直播中
          </div>
          <div
            class="live_not status"
            v-if="item.roomStatus == '102' && item.liveTimeDistance * 1 > 0"
          >
            <div class="preview">预告</div>
            <div class="time">
              {{ item.liveTimeDistance | timeDistanceFilter }}后开播
            </div>
          </div>
          <div
            class="live_not status"
            v-if="item.roomStatus == '102' && item.liveTimeDistance * 1 <= 0"
          >
            <div class="preview bgred">未开播</div>
          </div>
          <div class="live_end status" v-if="item.roomStatus == '103'">
            查看回放
          </div>
        </div>
        <div
          class="default_wrap"
          :style="roomInfoRadius"
          v-if="formData.showDefault"
        >
          <img class="icon" src="~@images/shop/defaultIcon.png" />
          <div class="text">更多直播</div>
        </div>
      </div>

      <div class="style_one style_two" v-if="formData.listStyle == '2'">
        <div
          class="rest_room_info"
          :style="roomInfoRadius"
          v-for="(item, i) of formData.roomInfoList.length > 0
            ? formData.roomInfoList
            : defaultRoomList"
          :key="i"
        >
          <!-- <img class="room_image" :src="item.roomPicture" alt="" /> -->
          <div
            class="room_image"
            :style="{
              background: `url(${item.roomPicture}) no-repeat 50% 50%/cover`,
            }"
          ></div>
          <div style="padding: 10px">
            <div class="room_name">{{ item.roomName }}</div>
          </div>
          <div class="status liveing" v-if="item.roomStatus == '101'">
            直播中
          </div>
          <div
            class="live_not status"
            v-if="item.roomStatus == '102' && item.liveTimeDistance * 1 > 0"
          >
            <div class="preview">预告</div>
            <div class="time">
              {{ item.liveTimeDistance | timeDistanceFilter }}后开播
            </div>
          </div>
          <div
            class="live_not status"
            v-if="item.roomStatus == '102' && item.liveTimeDistance * 1 <= 0"
          >
            <div class="preview bgred">未开播</div>
          </div>
          <div class="live_end status" v-if="item.roomStatus == '103'">
            查看回放
          </div>
        </div>
        <div
          class="default_wrap"
          :style="roomInfoRadius"
          v-if="formData.showDefault"
        >
          <img class="icon" src="~@images/shop/defaultIcon.png" />
          <div class="text">更多直播</div>
        </div>
      </div>

      <div
        class="style_three"
        v-if="formData.listStyle == '3'"
        :style="{ 'column-gap': `${formData.productPadding}px` }"
      >
        <div
          class="rest_room_info"
          :style="style_three_roomInfoRadius"
          v-for="(item, i) of formData.roomInfoList.length > 0
            ? formData.roomInfoList
            : defaultRoomList"
          :key="i"
        >
          <div class="roomImgBox">
            <img
              class="blankImg"
              src="~@images/shop/article-default.png"
              alt=""
            />
            <div
              class="room_image"
              :style="{
                background: `url(${item.roomPicture}) no-repeat 50% 50% /cover`,
                borderRadius:
                  formData.borderRounding != 1 ? '7px 7px 0 0' : '0px',
              }"
            ></div>
            <!-- <img
              class="room_image"
              :src="item.roomPicture"
              alt=""
              :style="{
                borderRadius:
                  formData.borderRounding != 1 ? '7px 7px 0 0' : '0px',
              }"
            /> -->
          </div>
          <div class="info_wrap">
            <div class="room_name">{{ item.roomName }}</div>
            <div class="share_wrap">
              <img class="icon" src="~@images/shop/app_icon_share.png" alt="" />
              <div class="text">分享</div>
            </div>
          </div>
          <div class="status liveing" v-if="item.roomStatus == '101'">
            <div class="preview">直播中</div>
            <!-- <div class="time">{{ item.viewsNumber }}人观看</div> -->
          </div>
          <div
            class="live_not status"
            v-if="item.roomStatus == '102' && item.liveTimeDistance * 1 > 0"
          >
            <div class="preview">预告</div>
            <div class="time">
              {{ item.liveTimeDistance | timeDistanceFilter }}后开播
            </div>
          </div>
          <div
            class="live_not status"
            v-if="item.roomStatus == '102' && item.liveTimeDistance * 1 <= 0"
          >
            <div class="preview bgred">未开播</div>
          </div>
          <div class="live_end status" v-if="item.roomStatus == '103'">
            <div class="preview">查看回放</div>
            <!-- <div class="time">{{ item.viewsNumber }}人观看</div> -->
          </div>
        </div>
        <!-- <div
          class="rest_room_info"
          :style="style_three_roomInfoRadius"
          v-if="formData.showDefault"
        >
          <div
            class="default_wrap style3"
            :style="[
              roomInfoRadius,
              {
                height: '201px',
              },
            ]"
          >
            <img class="icon" src="~@images/shop/defaultIcon.png" />
            <div class="text">更多直播</div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyLive",
  components: {},
  directives: {},
  filters: {
    timeDistanceFilter(val) {
      const time = +val;
      if (time >= 1000 * 60 * 60 * 24) {
        const days = Math.floor(time / 1000 / 60 / 60 / 24);
        return `${days}天`;
      } else if (time < 1000 * 60 * 60 * 24 && time >= 1000 * 60 * 60) {
        const hours = Math.floor(time / 1000 / 60 / 60);
        return `${hours}小时`;
      } else {
        const minutes = Math.floor(time / 1000 / 60);
        return `${minutes}分钟`;
      }
    },
    roomStatusFilter(val) {
      switch (+val) {
        case 101:
          return "直播中";
        case 102:
          return "未开始";
        case 103:
          return "已结束";
      }
    },
  },
  mixins: [],
  model: {},
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  created() {
    console.log(this.formData.roomIdList, "33333333");
  },
  data() {
    return {
      defaultRoomList: [
        {
          roomPicture: require("@/assets/images/default/default_img_3_2@2x.png"), // 直播间图片
          roomStatus: "101", // 直播状态，101直播中，102未开始，103已结束。
          // roomStatus: '102', // 直播状态，101直播中，102未开始，103已结束。
          // roomStatus: '103', // 直播状态，101直播中，102未开始，103已结束。
          roomName: "金桔直播间", // 直播名称
          roomDesc: "七夕礼遇，神仙好物推荐专场", // 直播间描述
          liveTimeDistance: 0, // 距离直播开始时间。
          viewsNumber: 123456, // 观看人数
          roomProductList: [
            // 直播间商品信息。
            {
              productImage: require("@/assets/images/default/default_img_3_2@2x.png"),
              productId: "321",
              productPrice: "345",
            },
            {
              productImage: require("@/assets/images/default/default_img_3_2@2x.png"),
              productId: "123",
              productPrice: "2345",
            },
          ],
        },
      ],
      initNum: 0,
      roomList: [],
      roomIds: [],
    };
  },
  computed: {
    restRoomInfoList() {
      if (this.formData.roomInfoList) {
        return this.formData.roomInfoList.slice(1);
      }
    },
    firstRoomInfo() {
      if (this.formData.roomInfoList) {
        if (this.formData.roomInfoList.length > 0) {
          return (
            this.formData.roomInfoList[0] || {
              roomProductList: [],
            }
          );
        } else {
          return this.defaultRoomList[0];
        }
      } else {
        return this.defaultRoomList[0];
      }
    },
    itemStyle() {
      const marginRight = this.formData.productPadding + "px";
      return { marginRight };
    },
    style_three_roomInfoRadius() {
      let border = "";
      if (!this.formData.showBorder) {
        border = "none";
      }
      let borderRadius = "";
      if (this.formData.borderRounding == "1") {
        borderRadius = "";
      } else {
        borderRadius = "7px";
      }

      // let marginRight = this.formData.productPadding + 'px'
      let marginBottom = this.formData.productPadding + "px";
      return { borderRadius, border, marginBottom };
    },
    roomInfoRadius() {
      let border = "";
      if (!this.formData.showBorder) {
        border = "none";
      }
      let borderRadius = "";
      if (this.formData.borderRounding == "1") {
        borderRadius = "";
      } else {
        borderRadius = "7px";
      }

      let marginRight = this.formData.productPadding + "px";
      return { borderRadius, border, marginRight };
    },
    formData() {
      // console.log(this.formData.roomIdList, "22222222");
      this.initNum++;
      if (
        this.item.config.formData &&
        this.initNum <= 1 &&
        this.item.config.formData.roomIdList.length > 0
      ) {
        // this.getLiveRoomInfo(this.item.config.formData.roomIdList);
        const PromiseList = [];
        const a = this.$post(
          "goldenhome/gh/live/admin_/room/modelQueryRoomByIds",
          {
            ids: this.item.config.formData.roomIdList,
          }
        );
        PromiseList.push(a);
        Promise.all(PromiseList).then((res) => {
          if (res[0].dataInfo != null) {
            let roomInfoList = [];
            res[0].dataInfo.records.forEach((item) => {
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
            this.roomList = [];
            this.roomIds = [];
            roomInfoList.forEach((item) => {
              if (
                item.roomStatus == 101 ||
                item.roomStatus == 102 ||
                item.roomStatus == 103
              ) {
                this.roomList.push(item);
                this.roomIds.push(item.roomId);
              }
            });
            // let arr = [];
            // let ids = [];
            // this.item.config.formData.roomIdList.forEach((item) => {
            //   this.roomList.forEach((l) => {
            //     if (item == l.roomId) {
            //       arr.push(l);
            //       ids.push(item);
            //     }
            //   });
            // });
            this.item.config.formData.roomIdList = this.roomIds;
            this.item.config.formData.roomInfoList = this.roomList;
            // this.item.config.formData.roomInfoList = arr;
            // this.item.config.formData.roomIdList = ids;
          }
        });
      }
      return this.item.config.formData || {};
    },
  },
  watch: {},
  beforeCreate() {},
  created() {},
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
    liveStatusClass(roomStatus) {
      switch (+roomStatus) {
        case 101:
          return "liveing";
        case 102:
          return "live_not";
        case 103:
          return "live_end";
      }
    },
  },
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
//@import url();
.status {
  position: absolute;
  top: 15px;
  left: 6px;
  line-height: 18px;
  font-size: 12px;
  border-radius: 2px;
  text-align: center;
  padding: 5px 10px;
  white-space: nowrap;
}
.liveing {
  background-color: #ec4545;
  color: #fff;
}
.live_not {
  // background-color: #d2b700;
  color: #fff;
  display: flex;
  padding: 0;
  font-size: 11px;
  .preview {
    background-color: #d1b085;
    padding: 5px 5px;
  }
  .time {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 5px 5px;
  }
}
.live_end {
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
}
.live_wrap {
  // background-color: #fafafa;
  // height: 500px;
  .room_wrap {
    display: flex;
    flex-flow: nowrap row;
    overflow: scroll;
    // padding-left: 15px;
    padding: 10px 0 5px;
    &::-webkit-scrollbar {
      width: 0 !important;
    }
    .style_one {
      display: flex;
      .room_info {
        display: flex;
        width: 320px;
        height: 180px;
        border: 1px solid #c8c8c8;
        margin-right: 15px;
        overflow: hidden;
        .left {
          position: relative;
          // margin-right: 15px;
          .room_images {
            width: 180px;
            height: 180px;
          }
        }
        .right {
          display: flex;
          flex-flow: column nowrap;
          justify-content: space-between;
          background: #fff;
          padding-left: 15px;
          .product_wrap {
            display: flex;
            margin-top: 10px;
            justify-content: space-around;
            .product {
              // margin-right: 10px;
              max-width: 60px;
              display: flex;
              flex-direction: column;
              align-items: center;
              .product_image {
                width: 50px;
                height: 50px;
                border: 1px solid #c8c8c8;
              }
              .price {
                width: 100%;
                font-size: 12px;
                font-weight: 700;
                margin-bottom: 15px;
                text-align: center;
                overflow: hidden;
              }
            }
          }
          .room_title {
            // width: 100%;
            width: 125px;
            font-weight: 700;
            margin-bottom: 9px;
            line-height: 17px;
            color: #191919;
            // overflow: hidden;
            // text-overflow: ellipsis;
            // white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
      .rest_room_info {
        width: 132px;
        border: 1px solid #c8c8c8;
        overflow: hidden;
        position: relative;
        background: #fff;
        .room_image {
          width: 132px;
          height: 132px;
        }
        .room_name {
          width: 100%;
          // width: 125px;
          // padding: 10px;
          // padding: 10px 10px;
          // padding-top: 10px;
          // height: 48px;
          line-height: 17px;
          font-weight: 700;
          color: #191919;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          // overflow: hidden;
          // text-overflow: ellipsis;
          word-break: break-all;
        }
      }
      .rest_room_info:last-child {
        margin-right: 0px !important;
      }
      .default_wrap {
        border: 1px solid #c8c8c8;
        width: 132px;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        min-height: 171px;
        background: #fff;
        .text {
          margin-top: 12px;
          color: #999;
          // flex: none;
        }
      }
    }
    .style_three {
      // height: 100%;
      // display: flex;
      // flex-flow: row wrap;
      padding: 0 2px;
      width: 100%;
      columns: 2; // 默认列数
      // column-gap: 0px; // 列间距
      .rest_room_info {
        border: 1px solid #c8c8c8;
        background-color: #fff;
        position: relative;
        break-inside: avoid;
        // margin-bottom: 15px;
        // width: 48%;
        .roomImgBox {
          width: 100%;
          position: relative;
          .blankImg {
            width: 100%;
            height: 100%;
            opacity: 0;
          }
          .room_image {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
          }
        }

        .info_wrap {
          padding: 10px;
          .room_name {
            font-size: 14px;
            font-weight: 700;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .share_wrap {
            display: flex;
            margin-top: 10px;
            align-items:flex-end .icon {
              width: 17px;
              height: 17px;
              margin-right: 5px;
            }
          }
        }
        .liveing {
          display: flex;
          background: none;
          .preview {
            background-color: #ec4545;
            color: #fff;
            padding: 5px;
          }
          .time {
            background-color: rgba(0, 0, 0, 0.5);
            padding: 5px;
          }
        }
        .live_end {
          display: flex;
          background: none;
          .preview {
            background-color: #8595d1;
            color: #fff;
            padding: 5px;
          }
          .time {
            background-color: rgba(0, 0, 0, 0.5);
            padding: 5px;
          }
        }
      }
    }
  }
}
.style3 {
  // border: 1px solid #c8c8c8;
  width: 100%;
  min-width: 141px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  .text {
    margin-top: 12px;
    color: #999;
    // flex: none;
  }
}
.bgred {
  background: red !important;
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
.nameBox {
  padding: 0 10px;
  margin-bottom: 10px;
}
.style1 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>

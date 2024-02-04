<template>
  <div class="my-video">
    <img
      class="background_image"
      :src="formData.backgroundInfo.imageUrl || defaultImage"
      alt=""
    />
    <div class="videoCardBox" :style="heightStyle">
      <div class="videoCard" v-for="(l, i) in formData.zoneList" :key="i">
        <div
          class="preview_wrap"
          :class="{
            vertical: formData.zoneModelType === '0',
            horizontal: formData.zoneModelType === '1',
            noPadding: !formData.paddingShow,
          }"
          :style="{
            borderRadius: isBorderRadius ? '7px' : '0',
            boxShadow: isBoxShadow ? '0 3px 16px rgb(0, 0,  0, 0.1)' : 'none',
            background: `rgba(255,255,255,${
              formData.borderTransparency / 100
            })`,
          }"
        >
          <!-- <div></div> -->
          <div :class="['left', formData.paddingShow ? '' : 'noPadding']">
            <SceneZoneImagePreview
              :class="['item', formData.paddingShow ? '' : 'noPadding']"
              :imgUrl="getImageUrl(l.zoneImageList[0])"
            />
          </div>
          <div class="right">
            <SceneZoneImagePreview
              :showAddIcon="formData.isShowBtn"
              :class="['item', formData.paddingShow ? '' : 'noPadding']"
              v-for="(imageItem, j) of l.zoneImageList.slice(
                1,
                +l.zoneStyle + 1
              )"
              :key="j"
              :imgUrl="getImageUrl(imageItem)"
            />
          </div>
        </div>
        <!-- <span class="title" v-if="formData.isShowBtn"><img class="title_icon" :src="formData.iconUrl" v-if="formData.isBtnType==1||formData.isBtnType==3" alt="" srcset="">
        <span class="text" v-if="formData.isBtnType==2||formData.isBtnType==3" >{{formData.title}}</span>
      </span> -->
        <!-- <video class="myVideo" controls muted autoplay="autoplay" :poster="formData.imgUrl||''">
        <source :src="formData.videoUrl" type="video/mp4" />
      </video> -->
      </div>
    </div>
  </div>
</template>
<script>
import SceneZoneImagePreview from "@components/base/SceneZoneImagePreview.vue";

export default {
  name: "SceneZone",
  components: {
    SceneZoneImagePreview,
  },

  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isBoxShadow() {
      return this.formData.styleType === "2";
    },
    isBorderRadius() {
      return this.formData.borderType === "2";
    },
    formData() {
      console.log("formDatazhi xingle ", this.item);
      return this.item.config.formData || {};
    },
    heightStyle() {
      const bottom = this.formData.videoHeight;
      return {
        bottom: `${bottom}px`,
      };
    },
    // pageStyle () {
    //   return {
    //     padding: '2px ' + this.formData.pagePadding + 'px'
    //   }
    // }
  },
  watch: {
    formData: {
      deep: true,
      handler(n, o) {
        console.log(n, "88888888888888");
      },
    },
  },
  data() {
    return {
      defaultImage: require("@images/shop/icon_middle_modalbox_banner_default-s .png"),
      title: "",
    };
  },
  methods: {
    getImageUrl(item) {
      console.log(item, "pppppppppppp");
      // 添加图片时
      if (item.addType === "1") {
        return item.imageUrl;
      } else if (item.addType === "2") {
        // 添加商品时
        return item.productList[0] && item.productList[0].productIdImageUrl;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.my-video {
  position: relative;
  overflow: auto;
  .background_image {
    width: 100%;
  }
  .videoCardBox {
    width: 100%;
    position: absolute;
    // bottom: 0;
    left: 0;
    display: flex;
    overflow: auto;
    flex-wrap: nowrap;
    .videoCard {
      width: 100%;
      flex-shrink: 0;
      // position: absolute;
      // // bottom: 0;
      // left: 0;
      padding: 0 15px;
      .preview_wrap {
        // width: 280px;
        // height: 360px;
        background: #fff;
        margin: 0 auto;
        // display: flex;
        padding: 10px;
        overflow: hidden;
        .left {
          // width: 150px;
          background: #f7f8ff;
          margin-right: 10px;
          // display: flex;
          // flex-flow: column nowrap;
          // justify-content: center;
          .item {
            cursor: pointer;
          }
        }
        .right {
          // width: 100px;
          // display: flex;
          // flex-flow: column nowrap;
          // justify-content: space-between;
          .item {
            // flex: auto;
            background: #fff;
            margin-bottom: 10px;
            cursor: pointer;
          }
        }
        .active {
          border: 3px solid #016bff;
        }
      }

      .vertical {
        width: 280px;
        height: 320px;
        display: flex;
        .left {
          width: 150px;
          background: #f7f8ff;
          margin-right: 10px;
          display: flex;
          flex-flow: column nowrap;
          justify-content: center;
          .item {
            cursor: pointer;
            &.noPadding {
              margin: 0;
            }
          }
          &.noPadding {
            margin: 0;
          }
        }
        .right {
          width: 100px;
          display: flex;
          flex-flow: column nowrap;
          justify-content: space-between;
          .item {
            flex: auto;
            background: #fff;
            margin-bottom: 10px;
            cursor: pointer;
            &:last-child {
              margin-bottom: 0 !important;
            }
            &.noPadding {
              margin: 0;
            }
          }
        }
        &.noPadding {
          width: 250px;
          height: 340px;
          background: transparent;
          padding: 0;
        }
      }
      .horizontal {
        width: 320px;
        height: 320px;
        display: flex;
        flex-flow: column nowrap;
        .left {
          width: 300px;
          height: 145px;
          background: #f7f8ff;
          margin-bottom: 5px;
          margin-right: 0;
          display: flex;
          flex-flow: column nowrap;
          justify-content: center;
          .item {
            cursor: pointer;
            &.noPadding {
              margin: 0;
            }
          }
          &.noPadding {
            margin: 0;
          }
        }
        .right {
          // width: 300px;
          height: 145px;
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          .item {
            flex: 1;
            background: #fff;
            margin-bottom: 0;
            margin-right: 10px;
            cursor: pointer;
            &:last-child {
              margin-right: 0 !important;
            }
            &.noPadding {
              margin: 0;
            }
          }
        }
        .item:last-child {
          margin-right: 0;
        }
        &.noPadding {
          width: 300px;
          height: 290px;
          background: transparent;
          padding: 0;
        }
      }
    }
  }
}
</style>

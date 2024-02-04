<!-- 图片广告 的组件 -->
<template>
  <div class="my_banner" :style="style">
    <div
      class="had_img_wrap"
      v-if="formData.imageList && formData.imageList.length"
    >
      <!-- 1是一行一个 -->
      <div class="image_list" v-if="formData.type == '1'">
        <div
          class="image_item"
          v-for="(item, i) of formData.imageList"
          :key="i"
        >
          <img
            :style="oneLineImageStyle"
            class="image"
            :src="item.imageUrl || defaultImage"
            alt=""
            width="100%"
          />
          <div class="image_Title">{{ item.imageTitle }}</div>
        </div>
      </div>
      <!--2是 轮播 -->
      <a-carousel
        class="carousel"
        v-if="formData.type == '2'"
        autoplay
        effect="fade"
        :dots="formData.pointer === '1'"
      >
        <div
          class="image_wrap"
          v-for="(item, index) in formData.imageList"
          :key="index"
        >
          <!-- <img style="pointer-events: none" :src="item.imageUrl  || defaultImage"/> -->
          <div
            class="img_div"
            :style="{
              height: formData.carouselHeight + 'px',
              background: `url(${
                item.imageUrl || defaultImage
              }) no-repeat 0 0 / ${fillStyle}`,
              backgroundPosition: ' 50% 50%',
            }"
          >
            <div class="image_Title">{{ item.imageTitle }}</div>
          </div>
          <div class="index_wrap" v-if="formData.pointer === '2'">
            <div class="current_index">{{ index + 1 }}</div>
            <div class="separator">/</div>
            <div class="total_index">{{ formData.imageList.length }}</div>
          </div>
        </div>
      </a-carousel>
      <!-- 3是小图滑动 -->
      <div class="image_sliding" v-if="formData.type == '3'">
        <div
          class="image_sliding_wrap"
          :style="{ height: formData.carouselHeight + 'px' }"
        >
          <div
            v-for="(item, i) of formData.imageList"
            :key="i"
            class="sliding_image"
          >
            <img
              alt=""
              :style="imageSlidingPadding"
              :src="item.imageUrl || defaultImage"
            />
            <div class="image_Title">{{ item.imageTitle }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="my_banner-content" v-else :style="style"></div> -->
    <img
      class="default_content"
      v-else
      src="~@images/shop/icon_middle_modalbox_banner_default.png"
      alt=""
    />
  </div>
</template>
<script>
export default {
  name: "PictureAdvertisement",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    /**
     * 小图滑动的动态样式，包括：
     * 图片样式，常规/阴影。
     * 图片倒角，直角/圆角。
     * 图片间距，距离右边的margin、
     */
    imageSlidingPadding() {
      const borderRdiusMap = {
        1: "0px",
        2: "7px",
      };
      const boxShadowMap = {
        1: "none",
        2: "0 3px 16px rgb(0, 0,  0, 0.1)",
      };
      return {
        borderRadius: borderRdiusMap[this.formData.borderType],
        boxShadow: boxShadowMap[this.formData.styleType],
        marginRight: this.formData.imagePadding + "px",
      };
    },
    fillStyle() {
      const fillStyleMap = {
        1: "cover",
        2: "contain",
      };
      return fillStyleMap[this.formData.fillStyle];
    },

    /**
     * 一行一个的动态样式，包括：
     * 图片样式，常规/阴影。
     * 图片倒角，直角/圆角。
     * 图片间距，距离下方的margin-bottom
     */
    oneLineImageStyle() {
      const borderRdiusMap = {
        1: "0px",
        2: "7px",
      };
      const boxShadowMap = {
        1: "none",
        2: "0 3px 16px rgb(0, 0,  0, 0.1)",
      };
      return {
        borderRadius: borderRdiusMap[this.formData.borderType],
        boxShadow: boxShadowMap[this.formData.styleType],
        marginBottom: this.formData.imagePadding + "px",
      };
    },
    // 传入的FitmentRight里配置的数据。
    formData() {
      return this.item.config.formData || {};
    },
    /**
     * 3个模板的页面边距设置。
     */
    style() {
      return {
        paddingLeft: this.formData.pagePadding + "px",
        paddingRight: this.formData.pagePadding + "px",
        height:
          this.formData.type == 2
            ? this.formData.carouselHeight + "px"
            : "unset",
        // marginBottom: this.formData.imagePadding + 'px'
        // margin-bottom:
        // paddingTop
        // borderRadius: this.formData.borderRadius
      };
    },
  },
  data() {
    return {
      defaultImage: require("@images/shop/icon_middle_modalbox_banner_default.png"),
    };
  },
};
</script>
<style lang="less" scoped>
.my_banner {
  width: 100%;
  overflow: hidden;
  .had_img_wrap {
    .image_list {
      .image_item {
        position: relative;
        .image {
        }
      }
    }
    .carousel {
      .image_wrap {
        position: relative;
        .img_div {
          background-position: 50% 50% !important;
        }
        // img {
        // }
        .index_wrap {
          position: absolute;
          bottom: 20px;
          right: 20px;
          display: flex;
          width: 40px;
          height: 20px;
          border-radius: 10px;
          background: rgba(0, 0, 0, 0.6);
          color: #fff;
          padding: 0 10px;
          .current_index {
          }
          .separator {
          }
          .total_index {
          }
        }
      }
    }
    // /deep/.ant-carousel .slick-slide {
    //   text-align: center;
    //   height: 160px;
    //   line-height: 160px;
    //   background: #364d79;
    //   overflow: hidden;
    // }
    .image_sliding {
      .image_sliding_wrap {
        display: flex;
        flex-wrap: nowrap;
        justify-content: flex-start;
        width: 100%;
        overflow-x: scroll;
        overflow-y: hidden;
        .sliding_image {
          position: relative;
          height: 100%;
          width: 375px;
          display: inline-block;
          // margin-left: 5px;
          img {
            // width:100%;
            height: 100%;
          }
        }
      }
    }
  }
  .default_content {
    width: 100%;
    // width: 375px;
    // height: 200px;
  }
}
.image_Title {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: rgba(255, 255, 255, 0.6);
  // border-radius:50%;
  padding: 1px 2px;
}
</style>

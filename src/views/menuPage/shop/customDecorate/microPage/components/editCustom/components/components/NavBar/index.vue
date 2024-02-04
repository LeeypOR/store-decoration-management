<template>
  <div
    class="navBar"
    :style="{
      background: formData.backgroundColor,
    }"
  >
    <div :class="['image_item', formData.imgType == 2 ? 'image_swiper' : '']">
      <div
        v-for="(item, i) of formData.imageList"
        :key="i"
        :style="cardWH"
        class="icard"
      >
        <div class="oneLineImageStyle" v-if="formData.type == '1'">
          <!-- :style="oneLineImageStyle" -->
          <div class="item" :style="{ height: formData.boxHeight+'px' }">
            <!-- <img
              class="boxImg"
              src="~@/assets/images/default/default_img_1_1@2x.png"
              alt=""
            /> -->
            <div class="upimg">
              <div class="upimgBox">
                <div v-if="item.imageUrl" class="image" :style="{ backgroundImage: 'url('+item.imageUrl+')' }"></div>
                <!-- <img class="image" :src="item.imageUrl" v-if="" /> -->
                <img class="image1" :src="defaultImage" v-else />
              </div>
            </div>
          </div>
          <div class="imageTitle" :style="{ color: formData.color }">
            {{ item.imageTitle }}
          </div>
        </div>
        <div v-else class="txt_nav">
          <div class="imageTitle" :style="{ color: formData.color }">
            {{ item.imageTitle }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MyNavBar",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formData() {
      return this.item.config.formData || {};
    },
    imgWH() {
      return {
        width: this.formData.imgHeight + "px",
        height: this.formData.imgHeight + "px",
        display: "flex",
        alignItems: "center",
      };
    },
    cardWH() {
      console.log(this.formData.imageList.length);
      let widthD = Math.ceil((this.formData.imgHeight / 375) * 10 * 10);
      const { imageList } = this.formData;
      let obj;
      switch (imageList.length) {
        case 1:
          obj = { width: "100%" };
          break;
        case 2:
          obj = { width: "50%" };
          break;
        case 3:
          obj = { width: "33%" };
          break;
        case 4:
          obj = { width: "25%" };
          break;
        case 5:
          obj = { width: "20%" };
          break;
        case 6:
          obj = { width: "20%" };
          break;
        case 7:
          obj = { width: "20%" };
          break;
        case 8:
          obj = { width: "20%" };
          break;
        case 9:
          obj = { width: "20%" };
          break;
        case 10:
          obj = { width: "20%" };
          break;
        // case 4:
        //   obj = { width: "25%" };
        //   if (widthD > 25) {
        //     obj = { width: "33%" };
        //   }
        //   break;
        // case 5:
        //   if (widthD < 20) {
        //     obj = { width: "20%" };
        //   } else if (widthD > 20 && widthD < 25) {
        //     obj = { width: "25%" };
        //   } else {
        //     obj = { width: "33%" };
        //   }
        //   break;
        // default:
        //   if (widthD <= 16.6) {
        //     obj = { width: "16.6%" };
        //   } else if (widthD < 20 && widthD > 16.6) {
        //     obj = { width: "20%" };
        //   } else if (widthD >= 20 && widthD < 25) {
        //     obj = { width: "25%" };
        //   } else {
        //     obj = { width: "33%" };
        //   }
      }
      return obj;
      //  let widthD=Math.ceil(this.formData.imgHeight/375*100)
      //  if(widthD<=16.5){
      //    return {width:'16.6%'}
      //  }else if(16.5<widthD&&widthD<20){
      //     return {width:'20%'}
      //  }else if(20<=widthD&&widthD<25){
      //    return {width:'25%'}
      //  }else{
      //    return {width:'33%'}
      //  }
    },
  },
  data() {
    return {
      defaultImage: require("@images/shop/icon_middle_modalbox_Navigation.png"),
    };
  },
};
</script>
<style lang="less" scoped>
.navBar {
  padding: 0px 0 10px;
  // overflow: auto;
  // display: flex;
  // ::-webkit-scrollbar {
  //   display: none;
  //   /* background-color:transparent; */
  // }
  .image_item {
    // width: 25%;
    display: flex;
    flex: 1;
    // flex-shrink: 0;
    text-align: center;
    width: 100%;
    // align-items: center;
    // overflow-x: scroll;
    // overflow-y: hidden;
    //  -webkit-overflow-scrolling:touch;
    padding: 0;
    flex-wrap: wrap;
    .icard {
      display: inline-block;
      // width: 25%;
      // white-space: nowrap;
      flex-shrink: 0;
      text-align: center;
      margin-top: 10px;
      .oneLineImageStyle {
        display: flex;
        // align-items: center;
        // flex-flow: nowrap;
        flex-shrink: 0;
        flex-direction: column;
        height: 100%;
        width: 98%;
        margin: 0 auto;
        overflow-x: hidden;
        // height: 50px;

        .item {
          width: 100%;
          position: relative;

          .boxImg {
            width: 100%;
            opacity: 0;
          }
          .upimg {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            .upimgBox {
              display: flex;
              justify-content: center;
              height: 100%;
              width: 100%;
              align-items: center;
              overflow: hidden;
              .image {
                width: 100%;
                height: 100%;
                background-repeat: no-repeat;
                background-position: center;
                background-size: cover;
              }
              .image1{
                width: 100%;
                object-fit: cover;
              }
            }
          }
        }
        .imageTitle {
          width: 100%;
          font-size: 8px;
          overflow: hidden;
          white-space: nowrap;
        }
      }
      // margin-left:.1rem ;
    }
    .imageTitle {
      font-size: 8px;
      width: 100%;
      // overflow: hidden;
      overflow: hidden;
      white-space: nowrap;
    }
    .txt_nav {
      width: 90%;
      margin: 0 auto;
      text-align: center;
      // height: 20px;
      // line-height: 20px;
      white-space: pre-wrap;
    }
  }
  .image_swiper {
    overflow: auto;
    flex-wrap: nowrap;
  }
}
// .navBar {
//   ::-webkit-scrollbar {
//     // display: block;
//     /* background-color:transparent; */
//   }
// }
</style>

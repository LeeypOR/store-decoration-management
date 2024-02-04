<template>
  <div class="my-video" :style="pageStyle">
    <div class="videoCard">
      <span class="title" v-if="formData.isShowBtn"
        ><img
          class="title_icon"
          :src="formData.iconUrl"
          v-if="formData.isBtnType == 1 || formData.isBtnType == 3"
          alt=""
          srcset=""
        />
        <span
          class="text"
          v-if="formData.isBtnType == 2 || formData.isBtnType == 3"
          >{{ formData.title }}</span
        >
      </span>
      <video
        class="myVideo"
        controls
        muted
        :poster="formData.imgUrl || ''"
        :src="formData.videoUrl"
      >
        <!-- <source :src="formData.videoUrl" type="video/mp4" /> -->
      </video>
    </div>
  </div>
</template>
<script>
export default {
  name: "MyVideo",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formData() {
      console.log("formDatazhi xingle ", this.item);
      return this.item.config.formData || {};
    },
    pageStyle() {
      return {
        padding: "2px " + this.formData.pagePadding + "px",
      };
    },
  },
  data() {
    return {
      title: "",
    };
  },
};
</script>
<style lang="less" scoped>
.my-video {
  .videoCard {
    position: relative;
  }
  .myVideo {
    width: 100%;
    height: 206px;
    background: #000;
  }
  .title {
    position: absolute;
    top: 10px;
    right: 15px;
    display: inline-block;
    text-align: center;
    padding: 0 10px;
    height: 30px;
    line-height: 28px;
    border-radius: 30px;
    background: rgba(204, 204, 204, 0.6);
    font-size: 12px;
    color: #fff;
    .text {
      display: inline-block;
      height: 20px;
      line-height: 20px;
      margin-left: 3px;
      vertical-align: middle;
    }
  }
  .title_icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
    // line-height: 18px;
  }
}
</style>

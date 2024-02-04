<template>
  <div class="my-video">
    <img class="background_image" :src="formData.backgroundInfo.imageUrl || defaultImage" alt="">
    <div class="videoCard" :style="heightStyle">
      <span class="title" v-if="formData.isShowBtn"><img class="title_icon" :src="formData.iconUrl" v-if="formData.isBtnType==1||formData.isBtnType==3" alt="" srcset="">
        <span class="text" v-if="formData.isBtnType==2||formData.isBtnType==3" >{{formData.title}}</span>
      </span>
      <video class="myVideo" controls muted autoplay="autoplay" :poster="formData.imgUrl||''">
        <source :src="formData.videoUrl" type="video/mp4" />
      </video>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SceneVideo',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    formData () {
      console.log('formDatazhi xingle ', this.item)
      return this.item.config.formData || {}
    },
    heightStyle () {
      const bottom = this.formData.videoHeight
      return {
        bottom: `${ bottom }px`
      }
    }
    // pageStyle () {
    //   return {
    //     padding: '2px ' + this.formData.pagePadding + 'px'
    //   }
    // }
  },
  data () {
    return {
			defaultImage: require('@images/shop/middle_modalbox_cjsp_default.png'),
      title: ''
    }
  }
}
</script>
<style lang="less" scoped>
.my-video {
  position: relative;
  .background_image {
    width: 100%;
  }
  .videoCard {
    width: 100%;
    position: absolute;
    // bottom: 0;
    left: 0;
    padding: 0 15px;
    // .title {
    //   .title_icon {
    //   }
    //   .text {
    //   }
    // }
    // .myVideo {
    //   source {
    //   }
    // }
  }
  .myVideo {
    width: 100%;
    height: 192px;
    background: #000;
  }
  .title {
    position: absolute;
    top: 10px;
    right: 15px;
    display: inline-block;
    text-align: center;
    padding: 0 10px;
    height:30px;
    line-height: 28px;
    border-radius: 30px;
    background: rgba(204, 204, 204, 0.6);
    font-size: 12px;
    color: #fff;
    .text{
      display: inline-block;
      height:20px;
      line-height: 20px;
      margin-left:3px;
      vertical-align: middle;
    }
  }
  .title_icon{
    display: inline-block;
    width:20px;
    height:20px;
    vertical-align: middle;
    // line-height: 18px;
  }
}
</style>

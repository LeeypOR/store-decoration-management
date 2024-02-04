<!--  -->
<template>
  <div class='preview_image' @click="$emit('click')">
    <!-- <div class="add_icon" v-if="showAddIcon">
      +
    </div> -->
    <img class="add_icon" v-if="showAddIcon" src="~@images/shop/icon_button.png" alt="">
    <!-- <img :src="imgUrl" v-if="imgUrl" class="img"> -->
    <div class="img" v-if="imgUrl" :style="{backgroundImage: `url(${imgUrl})`}"></div>
    <div class="no_content" v-else :style="previewClass">
      <span class="text" v-if="sizeDesc">{{sizeDesc}}像素或同等比例</span>
      <span v-else>请配置图片</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SceneZoneImagePreview',
  components: {},
  directives: {},
  filters: {},
  mixins: [],
  model: {},
  props: {
    showAddIcon: {
      type: Boolean,
      default: false
    },
    imgUrl: {
      type: String,
      default: ''
    },
    sizeDesc: {
      type: String,
      default: ''
    }
  },
  data () {
    return {

    }
  },
  computed: {
    previewClass () {
      if (this.sizeDesc) {
        return {
          backgroundColor: '#fff',
          color: '#999'
        }
      } else {
        return {
          backgroundColor: '#F7F8FF',
          color: '#9DA0D3'
        }
      }
    }
  },
  watch: {},
  beforeCreate () {},
  created () {

  },
  beforeMount () {},
  mounted () {

  },
  beforeUpdate () {},
  updated () {},
  activated () {},
  deactivated () {},
  beforeDestroy () {},
  destroyed () {},
  // 方法集合
  methods: {

  }
}
</script>
<style rel='stylesheet/less' lang='less' scoped>
//@import url();
.preview_image {
  position: relative;
  text-align: center;
  height: 100%;
  .add_icon {
    position: absolute;
    bottom: 10%;
    right: 10%;
    // transform: translateX(-50%);
    // background: #0091ff;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    // line-height: 16px;
    text-align: center;
    color: #fff;
  }
  .img {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .no_content {
    color: #9DA0D3;
    background-color: #F7F8FF;
    // display: flex;
    // flex-flow: column;
    // justify-content: center;
    // flex: 1;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .text {
      font-size: 12px;
      width: 67px;
    }
    // span {
    // }
  }
}
</style>

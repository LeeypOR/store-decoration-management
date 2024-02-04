<template>
  <div
    class="editor-main"
    :style="{
      transform: 'scale(1)',
    }"
  >
    <div class="header_wrap">
      <h1 class="my-header">店铺主页</h1>
    </div>
    <div class="page-preview-wrapper" ref="canvas-panel" id="canvas-panel">
      <!--页面组件列表展示-->
      <div
        class="tab_bar"
        v-if="!!isShowNavigation"
        :style="{ backgroundColor: bgColor }"
      >
        <dl class="item" v-for="(item, index) in tabBarData" :key="index">
          <dt class="icon" v-if="item.navigationImage">
            <img :src="item.navigationImage" alt="" />
          </dt>
          <dd>{{ item.navigationName }}</dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      tabBar: [],
    };
  },

  computed: {
    ...mapState({
      isShowNavigation: (state) => state.storeNavigation.isShowNavigation, // 是否展示导航
      bgColor: (state) => state.storeNavigation.navigationData.backgroundColor, // 展示的背景颜色
      tabBarData: (state) =>
        state.storeNavigation.navigationData.navigationList, // 底部导航数据
    }),
  },

  created() {
    console.log(this.$store.state, "EditorPanel-store");
  },
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
.editor-main {
  margin: 0 auto;
  width: 375px;
  height: 100%;
  background: #fafafa;
  box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.1);
  position: relative;
  .header_wrap {
    background: url("~@images/shop/top.png");
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
  .tab_bar {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 44px;
    background: #ffffff;
    box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .item {
      flex: 1;
      text-align: center;
      font-size: 8px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      .icon {
        width: 24px;
        height: 24px;
        margin: 0 auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
<template>
  <div
    class="editor-main"
    :style="{
      transform: 'scale(1)',
    }"
  >
    <div class="header_wrap">
      <h1 class="my-header">搜索</h1>
    </div>
    <div class="page-preview-wrapper" ref="canvas-panel" id="canvas-panel">
      <div class="input_box">
        <i class="icon_search"></i>
        <input class="input" type="text" placeholder="商品搜索" />
      </div>
      <a href="javascript:;;" class="search_btn">搜索</a>
      <!--页面组件列表展示-->
    </div>

    <div class="hot_zone">
      <h4>热门搜索</h4>
      <div class="hot_cards">
        <p class="item" v-for="(item, index) in hotWordArr" :key="index">
          <i class="icon_hot"></i>
          {{ item.hotWordName }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from "@/utils/eventBus";
import { mapState } from "vuex";
export default {
  data() {
    return {
      hotWordArr: [],
    };
  },

  props: {
    hotWordList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },

  watch: {
    hotWordList(val) {
      if (val.length >= 0) {
        console.log(val, "监听");
        this.hotWordArr = this.hotWordList;
      }
    },
  },

  computed: {},

  created() {
    eventBus.$on("submitHotWord", (target) => {
      console.log(target, "submitHotWord");
      this.hotWordArr = target._hotWords;
    });
  },
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
.editor-main {
  margin: 0 auto;
  width: 375px;
  height: 100%;
  background: #ffffff;
  box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.1);
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

  .page-preview-wrapper {
    padding: 8px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .input_box {
      background: #f9f9f9;
      height: 32px;
      border-radius: 155px;
      position: relative;
      flex: 1;
      margin-right: 15px;
      .icon_search {
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
        width: 24px;
        height: 24px;
        background: url("~@images/default/app_icon_search.png") no-repeat center
          center;
        background-size: 100%;
      }
      .input {
        background: none;
        outline: none;
        border: none;
        width: 100%;
        height: 100%;
        padding: 0 10px 0 39px;
        font-size: 12px;
        color: #cccccc;
        letter-spacing: 0;
      }
    }
  }
  .search_btn {
    font-size: 14px;
    color: #333333;
    letter-spacing: 0;
    text-align: center;
  }

  .hot_zone {
    padding: 15px;

    .hot_cards {
      display: flex;
      flex-wrap: wrap;
      .item {
        padding: 0 12px;
        margin-right: 10px;
        height: 32px;
        display: flex;
        margin-bottom: 10px;
        
        // flex: 1 0 auto;
        align-items: center;
        background: #fff3f3;
        border: 1px solid #fe4444;
        border-radius: 16px;
        box-sizing: border-box;
        color: #fe4444;
        .icon_hot {
          width: 20px;
          height: 20px;
          background: url("~@images/default/icon_hot.png") no-repeat center
            center;
          background-size: 100%;
          
        }
      }
    }
  }
}
</style>
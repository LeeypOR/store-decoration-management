<template>
  <div class="attr_main">
    <div class="attr_page_shareTitle">预览效果</div>
    <a-radio-group
      v-model="type"
      style="margin-bottom: 16px; padding-left: 15px"
    >
      <a-radio-button value="mini"> 小程序 </a-radio-button>
      <a-radio-button value="h5"> h5 </a-radio-button>
      <a-radio-button value="poster"> 海报 </a-radio-button>
    </a-radio-group>
    <div class="mini_area" v-if="type == 'mini'">
      <div class="info">
        <div class="top">
          <div class="tag"></div>
          <span>微商城</span>
        </div>
        <div class="shareTitle">{{ shareInfo.shareTitle }}</div>
        <div
          class="shareImgBox"
          :style="{
            background: shareInfo.miniImg
              ? `url(${shareInfo.miniImg}) no-repeat 50% 50% /cover`
              : '#e8e8e8',
          }"
        >
          <!-- <img :src="shareInfo.miniImg" v-if="shareInfo.miniImg" /> -->
        </div>
        <div class="foot">
          <img src="~@/assets/images/share/mini.png" alt="" /><span
            >小程序</span
          >
        </div>
      </div>
      <img
        src="~@/assets/images/share/icon_head_portrait_default.png"
        alt=""
        class="avatarImg"
      />
    </div>
    <div class="h5_area" v-if="type == 'h5'">
      <h3>朋友圈</h3>
      <div class="h5_show">
        <div class="head">
          <img
            src="~@/assets/images/share/icon_head_portrait_default.png"
            alt=""
            class="avatarImg"
          />
          <div class="right">
            <span class="username">爱喝喜茶的的娃</span>
            <div class="share_area">
              <div class="show_img">
                <img
                  :src="shareInfo.h5PosterImg"
                  style="width: 100%; height: 100%"
                  v-if="shareInfo.h5PosterImg"
                />
              </div>
              <span>{{ shareInfo.shareTitle }}</span>
            </div>
            <div class="time">
              <span style="color: rgb(148, 148, 148); margin-right: 10px"
                >一分钟前</span
              >
              <span style="color: skyblue">删除</span>
            </div>
          </div>
        </div>
      </div>
      <h3 style="margin-top: 40px">发送给朋友</h3>
      <div class="friend_show">
        <div class="show_text">
          <div class="show_info">
            <p>{{ shareInfo.shareTitle }}</p>
            <div>{{ shareInfo.shareDes }}</div>
          </div>
          <div class="showFriend_img">
            <img :src="shareInfo.h5PosterImg" v-if="shareInfo.h5PosterImg" />
          </div>
        </div>
        <img
          src="~@/assets/images/share/icon_head_portrait_default.png"
          alt=""
          class="avatarImg"
        />
      </div>
    </div>
    <div class="poster_area" v-if="type == 'poster'">
      <img
        class="image"
        :src="shareInfo.h5PosterImg"
        v-if="shareInfo.h5PosterImg"
      />
      <div class="imgBox" v-else></div>
      <div class="poster_info">
        <div class="poster_text">
          <p>{{ shareInfo.shareTitle }}</p>
          <div>{{ shareInfo.shareDes }}</div>
        </div>
        <div class="postermini_img">
          <img
            src="~@/assets/images/share/icon_weixinma.png"
            style="width: 100%"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      type: "mini",
    };
  },
  mounted() {},
  methods: {},
  computed: {
    ...mapState({
      shareInfo: (state) => state.shareSetting.shareInfo,
    }),
  },
  created() {
    console.log(this.shareInfo);
  },
};
</script>

<style lang='less' scoped>
.attr_main {
  display: flex;
  height: 100%;
  flex-direction: column;
  overflow: auto;
  background: #fff;
  box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.1);
  padding-bottom: 100px;
  .attr_page_shareTitle {
    width: 100%;
    height: 40px;
    padding: 0 16px;
    box-shadow: 0 1px 1px 0px #e6e6e6;
    // border-top: 1px solid #e6e6e6;
    line-height: 40px;
    font-size: 18px;
    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
    font-weight: bold;
    color: #333333;
    margin-bottom: 20px;
  }
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.mini_area {
  width: 92%;
  margin: 0 auto;
  background: #e6e6e6;
  // height: 300px;
  display: flex;
  padding: 20px;
  justify-content: flex-end;
  .info {
    width: 70%;
    background: #fff;
    border-radius: 3px;
    padding: 15px 0px 5px;
    margin-right: 10px;
    .top {
      display: flex;
      align-items: center;
      padding: 0 10px;
      .tag {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: #e6e6e6;
        margin-right: 7px;
      }
    }
    .shareTitle {
      margin: 5px 0;
      padding: 0 10px;
      font-weight: bold;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: #666666;
      line-height: 24px;
    }
    .shareImgBox {
      width: 100%;
      height: 208px;
      background: rgb(232, 232, 232);
      // min-height: 150px;
      // padding: 10px;
      overflow: hidden;
      img {
        // width: 100%;
        // margin: auto;
        height: 100%;
      }
    }
  }
  .foot {
    width: 100%;
    padding: 5px;
    height: 35px;
    display: flex;
    align-items: center;
    img {
      width: 24px;
      height: 24px;
      margin-right: 7px;
    }
    span {
      color: rgb(148, 148, 148);
      font-size: 14px;
      margin-top: 1px;
    }
  }
}
.h5_area {
  padding: 20px;
  .h5_show {
    margin-top: 20px;
    width: 100%;
    border: 1px solid #e6e6e6;
    padding: 10px;
    .head {
      display: flex;
      width: 100%;
      // align-items: center;
      .right {
        width: 100%;
        padding-top: 8px;
        .username {
          margin-left: 8px;
          color: #333;
          font-size: 14px;
        }
        .share_area {
          background: rgb(247, 247, 247);
          width: 100%;
          padding: 8px;
          margin-top: 15px;
          display: flex;
          align-items: center;
          .show_img {
            width: 40px;
            height: 40px;
            background: rgb(232, 232, 232);
            margin-right: 15px;
          }
          span {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: #333333;
            line-height: 21px;
          }
          p {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: #333333;
            line-height: 21px;
          }
        }
        .time {
          margin-top: 10px;
          span {
            cursor: pointer;
          }
        }
      }
    }
  }
  .friend_show {
    margin-top: 20px;
    width: 100%;
    padding: 10px;
    background: #e6e6e6;
    display: flex;
    justify-content: flex-end;
    .show_text {
      margin-right: 10px;
      background: #fff;
      min-width: 230px;
      display: flex;
      padding: 10px;
      justify-content: space-around;
      border-radius: 4px;
      align-items: center;
      .showFriend_img {
        width: 43px;
        height: 43px;
        background: #e6e6e6;
        img {
          width: 43px;
          height: 43px;
        }
      }
      .show_info {
        margin-right: 10px;
        div {
          font-size: 12px;
          margin-top: 5px;
          color: rgb(148, 148, 148);
        }
      }
    }
  }
}
.poster_area {
  padding: 20px;
  border: 1px solid #e6e6e6;
  width: 92%;
  margin: 0 auto;
  .imgBox {
    width: 300px;
    background: #e6e6e6;
    height: 300px;
  }
  .image {
    width: 100%;
    // height: 100%;
  }
  .poster_info {
    display: flex;
    align-items: center;
    padding: 20px 0 10px;
    box-sizing: border-box;
    .poster_text {
      flex-grow: 1;
      margin-right: 10px;
      p {
        font-size: 18px;
        font-family: MicrosoftYaHei;
        color: #333333;
      }
      div {
        font-size: 14px;
        margin-top: 5px;
        color: rgb(148, 148, 148);
      }
    }
    .postermini_img {
      width: 80px;
      height: 80px;
      display: flex;
      align-items: center;
      // background: #e6e6e6;
    }
  }
}
.avatarImg {
  width: 40px;
  height: 40px;
}
</style>
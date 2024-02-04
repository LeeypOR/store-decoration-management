<template>
  <div class="my_official">
    <div>
      <div class="header">小程序关联的公众号</div>
      <div class="seaction">
        <div class="left">
          <div class="icon_header"></div>
          <div class="name">
            <p class="l_title">公众号名称</p>
            <p class="s_title">公众号功能介绍</p>
          </div>
        </div>
        <div class="right">
          <div class="btn">关注</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "OfficialAccounts",
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
.my_official {
  height: 100px;
  width: 100%;
  padding: 10px;
  .header {
    height: 20px;
    line-height: 20px;
    color: #666666;
    font-size: 12px;
  }
  .seaction {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    .left {
      width: 60%;
      div {
        vertical-align: middle;
      }
      .icon_header {
        display: inline-block;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: #d8d8d8;
      }
      .name {
        display: inline-block;
        width: 120px;
        text-align: left;
        margin-left: 10px;
        .l_title {
          width: 80px;
          height: 22px;
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #191919;
          line-height: 22px;
        }
        .s_title {
          width: 84px;
          height: 17px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 17px;
          margin-top: 5px;
        }
      }
    }
    .btn {
      width: 60px;
      height: 32px;
      line-height: 32px;
      background: #ffffff;
      border-radius: 4px;
      border: 1px solid #09c061;
      text-align: center;
      color:#09c061;
    }
    .right{
        margin-top:5px;
    }
    
  }
}
</style>

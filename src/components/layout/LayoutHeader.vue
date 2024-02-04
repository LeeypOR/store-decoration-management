<template>
  <!-- 右侧头部 -->
  <a-layout-header class="layout-header">
    <!-- 面包屑导航 -->
    <div class="breadcrumb" v-if="currentMenu">
      <div v-if="secondTitle != '' && secondTitle">
        <span @click="goCustomerList" class="Abtn">{{
          secondTitle.split("/")[0]
        }}</span
        >/<span>{{ secondTitle.split("/")[1] }}</span>
      </div>
      <span v-else>{{ currentMenu.title || "" }}</span>
    </div>
    <!-- 用户名 -->
    <span class="right">
      <div
        class="user-logo"
        :style="{
          backgroundImage: `url(${
            userInfo.shopLogo || require('@/assets/images/default/user.png')
          })`,
        }"
      ></div>
      <div class="user-shop">
        <p>{{ userInfo.shopName }}</p>
        <p>{{ userInfo.userName }}</p>
      </div>
      <!-- <a-icon type="logout" @click="logout" class="logout-icon pointer" /> -->
    </span>
  </a-layout-header>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "layout-header",
  props: {
    currentMenu: {
      type: Object,
    },
    secondTitle: {
      type: String,
    },
  },
  computed: {
    ...mapGetters(["userInfo", "dictAll"]),
  },
  methods: {
    goCustomerList() {
      if (this.secondTitle == "浏览记录/浏览详情") {
        this.$router.push({
          name: "Customer",
        });
      } else if (this.secondTitle == "客户列表/客户详情") {
        this.$router.push({
          name: "CustomerList",
        });
      } else if (this.secondTitle == "分类设置/样式编辑") {
        this.$router.push({
          name: "ShopSystemDivisionSetting",
        });
      } else if (this.secondTitle == "售卡活动/查看订单") {
        this.$router.push({
          name: "MarketingSellCard",
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.layout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  margin-bottom: 2px;
  background-color: #fff;
  height: 54px;
  line-height: 54px;
  .breadcrumb {
    flex: 1;
  }
  .right {
    padding-right: 24px;
    color: #3d4966;
    display: flex;
    align-items: center;
    .user-logo {
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #d8d8d8;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      background-image: url("~@/assets/images/default/user.png");
    }
    .user-shop {
      padding: 3px 0;
      p {
        line-height: 24px;
        &:last-child {
          font-size: 12px;
        }
      }
    }
  }
}
.Abtn {
  cursor: pointer;
}
.Abtn:hover {
  text-decoration: underline;
}
</style>
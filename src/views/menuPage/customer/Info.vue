<template>
  <div class="user-info">
    <a-button @click="back" style="margin-bottom:20px">返回浏览记录</a-button>
    <div class="info-title">基本信息</div>
    <div class="info-body">
      <a-avatar
        shape="square"
        :src="userInfo.avatar || ''"
        class="wechat-avatar"
        :size="90"
        icon="user"
      />
      <table class="info-table">
        <tr>
          <th>昵称</th>
          <td>{{ userInfo.nickName }}</td>
          <th>客户ID</th>
          <td>{{ userInfo.id }}</td>
        </tr>
        <tr>
          <th>客户渠道</th>
          <td>{{ userInfo.customerChannel }}</td>
          <th>注册时间</th>
          <td>{{ userInfo.createDate }}</td>
        </tr>
        <tr>
          <th>用户来源</th>
          <td>{{ userInfo.userSource }}</td>
          <th>用户状态</th>
          <td>{{ statusList[userInfo.userStatus] || "" }}</td>
        </tr>
        <tr>
          <th>手机号</th>
          <td>{{ userInfo.phoneNumber }}</td>
          <th>姓名</th>
          <td>{{ userInfo.customerName }}</td>
        </tr>
        <tr>
          <th>成长值</th>
          <td>{{ userInfo.growthValue }}</td>
          <th>性别</th>
          <td>{{ sex[userInfo.gender] || "" }}</td>
        </tr>
        <tr>
          <th>生日</th>
          <td>{{ userInfo.birthday }}</td>
          <th>地区</th>
          <td>{{ userInfo.area }}</td>
        </tr>
        <tr>
          <th>标签</th>
          <td>{{ userInfo.label }}</td>
          <th></th>
          <td></td>
        </tr>
      </table>
    </div>
    <div class="info-title title2">方案浏览记录</div>
    <a-table
      :columns="columns1"
      :data-source="data1"
      :pagination="false"
      :row-key="(record) => record.id"
    ></a-table>
    <div class="info-title title3">行为统计</div>
    <a-table
      :columns="columns2"
      :data-source="data2"
      :pagination="false"
      key="2"
    ></a-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      statusList: ["黑名单", "正常"],
      sex: ["", "男", "女"],
      columns1: [
        {
          title: "产品图片",
          dataIndex: "vxminiUrl",
          key: "vxminiUrl",
          customRender: (text, row) => {
            return <table-img src={text} />;
          },
        },
        {
          title: "产品名称",
          dataIndex: "shareName",
          key: "shareName",
        },
        {
          title: "所属分类",
          dataIndex: "tag",
          key: "tag",
        },
        {
          title: "所属店铺",
          dataIndex: "shopName",
          key: "shopName",
        },
        {
          title: "排序",
          dataIndex: "sort",
        },
        {
          title: "最后保存时间",
          dataIndex: "updateDate",
        },
      ],
      data1: [],
      columns2: [
        {
          title: "日期",
          dataIndex: "recordDate",
          width: 200,
        },
        {
          title: "时间",
          dataIndex: "timeFrame",
          width: 200,
        },
        {
          title: "渠道",
          dataIndex: "channel",
          width: 200,
        },
        {
          title: "时长",
          dataIndex: "onlineTime",
          customRender: (text, row) => {
            return this.formatSeconds(text);
          },
        },
      ],
      data2: [],
    };
  },
  computed: {
    id() {
      return this.$route.query.id || "";
    },
  },
  created() {
    this.getUserInfo();
    this.getSchemeList();
    this.getCustomerBehaviorStatistics();
  },
  methods: {
    /**
     * 格式化秒
     * @param int  value 总秒数
     * @return string result 格式化后的字符串
     */
    formatSeconds(value) {
      var theTime = parseInt(value); // 需要转换的时间秒
      var theTime1 = 0; // 分
      var theTime2 = 0; // 小时
      var theTime3 = 0; // 天
      if (theTime > 60) {
        theTime1 = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
        if (theTime1 > 60) {
          theTime2 = parseInt(theTime1 / 60);
          theTime1 = parseInt(theTime1 % 60);
          if (theTime2 > 24) {
            //大于24小时
            theTime3 = parseInt(theTime2 / 24);
            theTime2 = parseInt(theTime2 % 24);
          }
        }
      }
      var result = "";
      if (theTime > 0) {
        result = "" + parseInt(theTime) + "秒";
      }
      if (theTime1 > 0) {
        result = "" + parseInt(theTime1) + "分" + result;
      }
      if (theTime2 > 0) {
        result = "" + parseInt(theTime2) + "小时" + result;
      }
      if (theTime3 > 0) {
        result = "" + parseInt(theTime3) + "天" + result;
      }
      return result;
    },
    async getUserInfo() {
      let res = await this.$get(`/customer/query`, {
        id: this.id,
      });
      if (res && res.returnCode == "1000") {
        this.userInfo = res.dataInfo || {};
      }
    },
    async getSchemeList() {
      let res = await this.$get(`/customer/scheme/browsing`, {
        id: this.id,
      });
      console.log("res", res);
      if (res && res.returnCode == "1000") {
        this.data1 = res.dataInfo.records || [];
        // console.log("this.data1", this.data1);
      }
    },
    //客户行为统计列表查询
    async getCustomerBehaviorStatistics() {
      let res = await this.$get(`/customer/onlinerecord/browsing/page`, {
        customerId: this.id,
      });
      if (res && res.returnCode == "1000") {
        this.data2 = res.dataInfo.records || [];
        // console.log("this.data2", this.data2);
        this.data2.forEach((l, i) => {
          l.recordDate =
            l.recordDate == "" || l.recordDate == null
              ? l.recordDate
              : l.recordDate.slice(0, 10);
          l.key = i + 1;
          l.timeFrame =
            (l.startTime == "" || l.startTime == null
              ? l.startTime
              : l.startTime.slice(11, 19)) +
            "~" +
            (l.endTime == "" || l.endTime == null
              ? l.endTime
              : l.endTime.slice(11, 19));
        });
      }
    },
    back() {
      this.$router.push({
        name: "Customer",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.user-info {
  .info-title {
    font-size: 14px;
    height: 40px;
    background: #f5f5f5;
    border-radius: 4px;
    line-height: 40px;
    padding-left: 30px;
    position: relative;
    &::before {
      content: "";
      display: inline-block;
      width: 3px;
      height: 16px;
      background: #016bff;
      border-radius: 2px;
      position: absolute;
      top: 12px;
      left: 20px;
    }
    &.title2,
    &.title3 {
      margin-top: 30px;
    }
  }
  .info-body {
    display: flex;
    margin-top: 15px;
    .wechat-avatar {
    }
    .info-table {
      flex: 1;
      margin-left: 30px;
      border-right: 1px solid #e8e8e8;
      border-bottom: 1px solid #e8e8e8;
      tr {
        border-top: 1px solid #e8e8e8;
        th,
        td {
          padding: 16px 16px;
          overflow-wrap: break-word;
          border-left: 1px solid #e8e8e8;
          color: rgba(0, 0, 0, 0.85);
          font-weight: 500;
          text-align: left;
        }
        th {
          background: #fafafa;
          width: 20%;
        }
        td {
          color: rgba(0, 0, 0, 0.65);
          width: 30%;
        }
      }
    }
  }
}
.ant-table-wrapper {
  margin-top: 20px;
}
</style>

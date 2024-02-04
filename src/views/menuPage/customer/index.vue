<template>
  <div class="user-manage">
    <search-table-form
      :url="url"
      ref="searchtable"
      :hideSelect="true"
      :columns="columns"
      :form="form"
    >
      <template slot="searchForm">
        <a-form layout="inline" :form="form">
          <a-form-item label="昵称">
            <a-input v-decorator="['nickName']" placeholder="请输入昵称名称">
            </a-input>
          </a-form-item>
          <a-form-item label="手机号">
            <a-input v-decorator="['phoneNumber']" placeholder="请输入手机号">
            </a-input>
          </a-form-item>
          <a-form-item label="时间">
            <a-range-picker
              style="width: 240px"
              v-decorator="['startTime-endTime']"
            >
              <a-icon slot="suffixIcon" type="calendar" />
              <template slot="dateRender" slot-scope="current">
                <div class="ant-calendar-date">
                  {{ current.date() }}
                </div>
              </template>
            </a-range-picker>
          </a-form-item>
          <!-- <a-form-item label="店铺">
          <a-input
            v-decorator="[
              'shopType',
            ]"
            placeholder="请输入店铺名称"
          >
          </a-input>
        </a-form-item> -->
        </a-form>
      </template>
      <template slot="tableOperation" slot-scope="{ record }">
        <permission authority="guest:manage:customerDaily">
          <span class="text-primary pointer" @click="openInfo(record)"
            >查看详情</span
          >
        </permission>
      </template>
    </search-table-form>
  </div>
</template>
<script>
import SearchTableForm from "./components/SearchTableForm.vue";
// import {findDictNameByValue, createOptionsByDict} from '@/utils/dict'
export default {
  name: "Role",
  data() {
    return {
      // identityTypeOptions: createOptionsByDict(4),
      url: "/customer/page",
      currentRecord: {},
      form: this.$form.createForm(this, { name: "table_search" }),
      columns: [
        {
          title: "头像",
          dataIndex: "avatar",
          key: "avatar",
          align: "center",
          customRender: (text, row) => {
            return <table-img src={text} />;
          },
        },
        {
          title: "微信昵称",
          dataIndex: "nickName",
          key: "nickName",
        },
        {
          title: "手机号",
          dataIndex: "phoneNumber",
          key: "phoneNumber",
        },
        // {
        //   title:'归属展厅',
        //   dataIndex:'phone',
        //   key:'phone'
        // },
        {
          title: "授权时间",
          dataIndex: "createDate",
          key: "createDate",
        },
        {
          title: "跟踪导购",
          dataIndex: "shopUserName",
          key: "shopUserName",
        },
        {
          title: "浏览总时长",
          dataIndex: "browseTimes",
          key: "browseTimes",
          customRender(text, row) {
            return `${text}秒`;
          },
        },
        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" },
        },
      ],
    };
  },
  components: {
    // UserInfo,
    SearchTableForm,
  },
  mounted() {},
  methods: {
    openInfo(record) {
      this.currentRecord = record;
      this.$router.push({
        name: "CustomerInfo",
        query: {
          id: record.id,
        },
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    // console.log(from.path)
    if (from.path == "/customer/Info") {
      to.meta.isBack = true;
    } else {
      to.meta.isBack = false;
    }
    to.meta.keepAlive = true;
    next();
  },
  activated() {
    if (!this.$route.meta.isBack) {
      // this.clearFilter(); /*清空查询条件*/
      let oRest = document.querySelector(".resetBtn");
      oRest.click();
      // this.getLiveTodayInfo();
    } else {
      this.$route.meta.isBack = false;
      // if (this.changePersonalInfo == true) {
      // this.$refs.searchtable.handleSubmit();
      // }
    }
  },
};
</script>
<style lang="less" scoped></style>

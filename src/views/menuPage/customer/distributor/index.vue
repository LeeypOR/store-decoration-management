<template>
  <div class="distributor-div">
    <search-table
      :url="url"
      ref="searchtable"
      :columns="columns"
      :hideSelect="true"
      :defaultParams="defaultParams"
      :headParams="headParams"
      :form="form">
      <!-- 搜索条件 -->
      <template slot="searchForm">
        <a-form layout="inline" :form="form">
          <a-form-item label="分销员昵称">
            <a-input
              style="width:180px"
              v-decorator="[ 'nickName' ]"
              placeholder="请输入分销员昵称" >
            </a-input>
          </a-form-item>
          <a-form-item label="分销员手机号">
            <a-input
              style="width:180px"
              v-decorator="[ 'phoneNumber' ]"
              placeholder="请输入分销员手机号" >
            </a-input>
          </a-form-item>
        </a-form>
      </template>
      <!-- 操作栏 -->
      <template slot="oprationRow"></template>
      <!-- 表格行操作 -->
      <template slot="tableOperation" slot-scope="{ record }">
        <a-space>
          <permission authority="distributor:pepole:info">
            <span class="text-primary pointer" @click="openInfo(record, 'view')">详情</span>
          </permission>
        </a-space>
      </template>
    </search-table>
  </div>
</template>
<script>
import { findDictNameByValue,createOptionsByDict } from '@/utils/dict'

export default {
  name: 'distributorTable',
  components: {},
  data() {
    return {
      url: '/distributor/pepole/page', // 列表接口地址
      headParams: {}, // 请求头参数
      defaultParams: {}, // 默认携带参数
      currentRecord: {}, // 选中行数据
      infoVisible: false, // 弹窗是否显示
      handle: '', // 操作类型
      form: this.$form.createForm(this, { name: "table_search" }), // 搜索表单
      columns: [
        {
          title: "分销员姓名",
          dataIndex: "custName",
          key: "custName",
        },
        {
          title: "分销员昵称",
          dataIndex: "nickName",
          key: "nickName",
        },
        {
          title: "头像",
          dataIndex: "avatar",
          key: "avatar",
          customRender: (text, row) => {
            return <table-img src={text}/>
          }
        },
        {
          title: "手机号",
          dataIndex: "phoneNumber",
          key: "phoneNumber",
        },
        {
          title: "累计分销笔数",
          dataIndex: "distributedTotalNumber",
          key: "distributedTotalNumber",
          customRender: (text, row) => {
            return text ? text : 0
          }
        },
        {
          title: "累计分销金额",
          dataIndex: "distributedTotalSum",
          key: "distributedTotalSum",
          customRender: (text, row) => {
            return text ? '¥ '+(Number(text)/100).toFixed(2) : '¥ 0.00'
          }
        },
        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" },
        }
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 打开详情
    openInfo(record, type) {
      let params={
        id: record.id,
        handle: type || 'edit',
        current: this.$refs.searchtable.pagination.current
      };
      this.$router.push({
        name:'CustomerDistributorPageDetail',
        query:params
      })
    },
  }
};
</script>

<style lang="less" scoped></style>

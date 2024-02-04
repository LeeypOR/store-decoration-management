<template>
  <div class="distributor-detail-div">
    <search-table
      :url="url"
      ref="searchtable"
      :columns="columns"
      :defaultParams="defaultParams"
      :headParams="headParams">
      <!-- 搜索条件 -->
      <template slot="searchForm">
      </template>
      <!-- 操作栏 -->
      <template slot="oprationRow">
      </template>
      <!-- 表格行操作 record -->
      <template slot="tableOperation" slot-scope="{  }">
        <a-space></a-space>
      </template>
    </search-table>
  </div>
</template>
<script>
import { findDictNameByValue,createOptionsByDict } from '@/utils/dict'

export default {
  name: 'distributorDetailTable',
  components: {},
  props: {
    // 自身的tab
    tab: {
      type: String,
      required: true,
      default: ''
    },
    // 当前活跃的tab
    curTab: {
      type: String,
      required: true,
      default: ''
    },
    id: { // 分销员id
      type: String,
      default: ''
    },
  },
  data() {
    return {
      url: '/distributor/pepole/rebatePage', // 列表接口地址
      headParams: {}, // 请求头参数
      defaultParams: {
        rebateStatus: this.tab,
        id: this.id
      }, // 默认携带参数
      currentRecord: {}, // 选中行数据
      infoVisible: false, // 弹窗是否显示
      handle: '', // 操作类型
      form: {}, // 搜索表单
      columns: [
        {
          title: "被分享人昵称",
          dataIndex: "userName",
          key: "userName",
        },
        {
          title: "分享商品",
          dataIndex: "goodsName",
          key: "goodsName",
        },
        {
          title: "支付金额",
          dataIndex: "actualAmount",
          key: "actualAmount",
          customRender: (text, row) => {
            return text ? '¥ '+(Number(text)/100).toFixed(2) : '¥ 0.00'
          }
        },
        {
          title: "下单时间",
          dataIndex: "createDate",
          key: "createDate",
        },
        {
          title: "确认收货时间",
          dataIndex: "orderFinshTime",
          key: "orderFinshTime",
        },
        {
          title: "返利金额",
          dataIndex: "oneLevelDistributionPrice",
          key: "oneLevelDistributionPrice",
          customRender: (text, row) => {
            return text ? '¥ '+(Number(text)/100).toFixed(2) : '¥ 0.00'
          }
        }
      ]
    };
  },
  watch: {
    curTab(val) {
      this.checkCurTab()
    },
  },
  created() {},
  mounted() {},
  methods: {
    // 刷新当前tab
    checkCurTab() {
      if(this.curTab == this.tab) {
        this.$nextTick(() => {
          this.$refs.searchtable.refreshTable()
        })
      }
    }
  }
};
</script>

<style lang="less" scoped></style>

<template>
  <div class="search-table">
    <!-- 筛选条件（可无） -->
    <a-row class="search-form" v-if="form">
      <slot name="searchForm"></slot>
      <a-row style="text-align: left">
        <a-form-item>
          <a-button
            type="primary"
            class="searchBtn"
            @click="handleSubmit1"
            :loading="tableLoading"
            >搜索</a-button
          >
          <a-button
            html-type="submit"
            class="resetBtn"
            @click="resetForm"
            :disabled="tableLoading"
            >重置</a-button
          >
        </a-form-item>
      </a-row>
    </a-row>
    <!-- 表格上面的操作（添加，导出等） -->
    <a-row class="opration-row">
      <slot name="oprationRow"></slot>
    </a-row>
    <a-row class="search-table-list">
      <div v-if="myTable">
        <slot
          name="myTable"
          :dataSource="dataSource"
          :pagination="pagination"
          :loading="tableLoading"
          :change="tableChange"
          :rowKey="rowKey"
          :row-selection="hideSelect ? null : rowSelection"
        ></slot>
      </div>
      <a-table
        v-else
        :rowKey="rowKey"
        :pagination="pagination"
        @change="tableChange"
        :row-selection="hideSelect ? null : rowSelection"
        :columns="columns"
        :data-source="dataSource"
        :loading="loading"
        :scroll="{ x: xLength }"
      >
        <!-- 表格右侧的操作项 -->
        <span class="nowrap" slot="operation" slot-scope="text, record">
          <slot name="tableOperation" :record="record"></slot>
        </span>
      </a-table>
    </a-row>
  </div>
</template>
<script>
import isEmpty from "lodash/isEmpty";
import Moment from "moment";
export default {
  name: "SearchTableForm",
  props: {
    url: {
      type: String,
      required: true,
    },
    hideSelect: {
      type: Boolean,
      required: false,
    },
    defaultParams: {
      // 表格默认的参数，如果和搜索条件冲突，点击搜索时搜索条件会覆盖
      type: Object,
      default() {
        return {};
      },
    },
    initSearch: {
      // 默认刚进来就搜索,
      type: [Boolean, Promise],
      default: true,
    },
    beforeSearchFunc: {
      // 点击搜索对筛选参数二次处理
      type: Function,
    },
    rowKey: {
      // 表单唯一值，也是选中的时候的key值
      type: String,
      default: "dataIndexKey",
    },
    myTable: {
      // 使用页面自己的table组件
      type: Boolean,
      default: false,
    },
    selectKeys: {
      type: Array,
    },
    form: {
      type: Object,
    },
    columns: {
      type: Array,
      required: true,
    },
    tableSelectType: {
      type: String,
      default: "checkbox",
    },
    xLength: {
      type: Number,
      default: 0,
    },
    formatDatePiker: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      pagination: {
        showQuickJumper: true,
        total: 0,
        current: 1,
        pageSize: 10,
        showTotal: (total) => `共${total}条`,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100", "200"],
      },
      rowSelection: {
        type: this.tableSelectType,
        selectedRowKeys: [],
        fixed: true,
        onChange: (selectedRowKeys, selectedRows) => {
          this.rowSelection.selectedRowKeys = selectedRowKeys;
          this.selectedRowKeys = selectedRowKeys;
          this.selectedRows = selectedRows;
          this.$emit("selectedRowChange", selectedRows);
        },
      },
      searchParams: {},
      selectedRowKeys: [],
      selectedRows: [],
      size: 10,
      current: 1,
      dataSource: [],
      tableLoading: false,
      loading: false,
    };
  },
  mounted() {
    if (typeof this.initSearch === "boolean" && this.initSearch) {
      this.getList();
    } else if (this.initSearch instanceof Promise) {
      this.initSearch.then(() => {
        // initSearch返回resolve 的时候调用getList
        this.getList();
      });
    }
  },
  methods: {
    tableChange(pagination) {
      if (pagination) {
        this.pagination.current = pagination.current;
        this.pagination.pageSize = pagination.pageSize;
        this.handleSubmit();
      }
    },
    refreshTable() {
      if (isEmpty(this.form)) {
        this.getList();
      } else {
        this.handleSubmit();
      }
    },
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          Object.keys(values).forEach((key) => {
            // 除了时间和时间范围，其他特殊情况请使用beforeSearchFunc处理
            if (values[key] instanceof Moment) {
              // 选择时间
              values[key] = encodeURIComponent(
                values[key].format("YYYY-MM-DD HH:mm:ss")
              );
            } else if (
              key.split("-").length === 2 &&
              Array.isArray(values[key]) &&
              values[key][0] instanceof Moment
            ) {
              // 选择时间范围
              const arr = key.split("-");
              if (this.formatDatePiker) {
                values[arr[0]] = values[key][0].format("YYYY-MM-DD HH:mm:ss");
                values[arr[1]] = values[key][1].format("YYYY-MM-DD HH:mm:ss");
              } else {
                values[arr[0]] = values[key][0].format("YYYY-MM-DD HH:mm:ss");
                values[arr[1]] = values[key][1].format("YYYY-MM-DD HH:mm:ss");
              }
              delete values[key];
            }
          });
          if (this.beforeSearchFunc) {
            values = this.beforeSearchFunc(values);
          }
          this.getList(values);
        }
      });
    },
    handleSubmit1() {
      this.pagination.current = 1;
      this.handleSubmit();
    },
    resetForm() {
      this.pagination.current = 1;
      this.pagination.pageSize = 10;
      let time = setTimeout(() => {
        this.form.resetFields();
        this.refreshTable();
        clearTimeout(time);
      }, 100);
    },
    getList(values = {}) {
      const params = {
        ...this.defaultParams,
        ...values,
        size: this.pagination.pageSize,
        current: this.pagination.current,
      };
      // const obj = JSON.parse(JSON.stringify(params));
      if (params.userStatus != 2 && params.userStatus != null) {
        params.userStatus = params.userStatus * 1;
      } else {
        delete params.userStatus;
      }
      // if (params.customerStartTime != null && params.customerStartTime != "") {
      //   obj.customerAddParamRequest.customerStartTime = obj.customerStartTime;
      //   delete obj.customerStartTime;
      // } else {
      //   delete obj.customerStartTime;
      // }
      // if (params.customerEndTime != null && params.customerEndTime != "") {
      //   obj.customerAddParamRequest.customerEndTime = obj.customerEndTime;
      //   delete obj.customerEndTime;
      // } else {
      //   delete obj.customerEndTime;
      // }
      // if (JSON.stringify(obj.customerAddParamRequest) == "{}") {
      //   delete obj.customerAddParamRequest;
      // }
      // if (!params.consumptionEndTime) {
      //   delete obj.consumptionEndTime;
      // }
      // if (!params.consumptionStartTime) {
      //   delete obj.consumptionStartTime;
      // }
      this.$set(this, "searchParams", params);
      this.tableLoading = true;
      this.loading = true;
      this.$get(this.url, params, { preventLoading: true })
        .then((res) => {
          this.tableLoading = false;
          if (res && res.returnCode === 1000) {
            this.selectedRowKeys = [];
            this.selectedRows = [];
            this.rowSelection.selectedRowKeys = [];
            this.$emit("selectedRowChange", this.selectedRows);
            console.log(res)
            this.dataSource = res.dataInfo.records || res.dataInfo;
            this.loading = false;
            this.dataSource.forEach((item, i) => {
              item.dataIndexKey = i;
            });
            this.pagination.total = res.dataInfo.total;
          } else {
            this.dataSource = [];
          }
        })
        .catch(() => {
          this.tableLoading = false;
          this.loading = false;
        });
    },
  },
};
</script>
<style lang="less" scoped>
.search-table {
  .search-form {
    border-radius: 4px;
    background-color: #f5f5f5;
    padding: 24px 32px;
    .ant-form-item {
      margin-bottom: 0;
    }
    .ant-btn {
      margin-right: 20px;
      margin-top: 20px;
    }
  }
  .opration-row {
    margin-top: 32px;
    .ant-btn {
      margin-right: 20px;
    }
  }
  .search-table-list {
    margin-top: 16px;
    .ant-table {
      .ant-table-body {
        .ant-table-thead {
          tr {
            th {
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}
</style>

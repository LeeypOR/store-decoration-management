<template>
  <div class="search-table">
    <!-- 筛选条件（可无） -->
    <a-row class="search-form" v-if="form">
      <slot name="searchForm"></slot>
      <a-row class="seach-btn-list" style="text-align: left">
        <a-form-item>
          <a-button
            type="primary"
            class="searchBtn"
            @click="handleSearch"
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
    <a-row class="opration-row" v-if="$slots.oprationRow">
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
        :scroll="{ x: xLength }"
      >
        <!-- 表格右侧的操作项 -->
        <span class="nowrap" slot="operation" slot-scope="text, record">
          <slot name="tableOperation" :record="record"></slot>
        </span>
        <template slot="changeShow" slot-scope="text, record, index">
          <a-switch
            :defaultChecked="text == 1 ? true : false"
            @change="onChangeShow($event, record, index)"
          />
        </template>
      </a-table>
    </a-row>
  </div>
</template>
<script>
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
    timeFormat: {
      // 搜索表单的时间格式化方式
      type: String,
      default: "YYYY-MM-DD HH:mm:ss",
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
      default: "id",
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
    beforeResetForm: {
      type: Function,
    },
    defaultSelectedRowKeys: {
      type: Array,
      default() {
        return [];
      },
    },
    isApiSearch: {
      type: Boolean,
      default: false,
    },
    tableData: {
      type: Array,
      default() {
        return [];
      },
    },
    total: {
      type: Number,
      default: 0,
    },
    statusUrl: {
      type: String,
      default: "",
    },
    statusIdKey: {
      type: String,
      default: "id",
    },
    statusTypeKey: {
      type: String,
      default: "galleryProductType",
    },
    // expandIcon:{
    //   type:Function,
    //   //default:()=>{}
    // },
    // expandIconColumnIndex:{
    //   type:Number,
    //   default:1,
    // }
  },
  watch: {
    tableData: {
      handler(newArr) {
        this.tableData2 = newArr;
        this.getList();
      },
      deep: true,
      immediate: true,
    },
    defaultSelectedRowKeys: {
      handler(newArr) {
        this.selectedRowKeys = newArr;
        this.rowSelection.selectedRowKeys = newArr;
        console.log(
          "this.selectedRowKeys,newArr",
          this.selectedRowKeys,
          newArr
        );
        console.log("this.selectedRows ", this.selectedRows);
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      //isShowTable:false,
      tableData2: [],
      pagination: {
        showQuickJumper: true,
        total: 0,
        current: 1,
        pageSize: 10,
        showTotal: (total) => `共${total}条`,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100", "200"],
        onShowSizeChange: () => {
          this.$emit("pageShowSizeChange");
        },
        onChange: () => {
          this.$emit("pageChange");
        },
      },
      rowSelection: {
        type: this.tableSelectType,
        selectedRowKeys: [],
        fixed: true,
        onChange: (selectedRowKeys, selectedRows) => {
          this.rowSelection.selectedRowKeys = selectedRowKeys;
          this.selectedRowKeys = selectedRowKeys;
          this.selectedRows = selectedRows;
          this.$emit("selectedRowChange", selectedRows, selectedRowKeys);
        },
        onSelect: (record, selected, selectedRows) => {
          //this.selectedRows = selectedRows;
          this.$emit("selectRowChange", record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
          //this.selectedRows = selectedRows;
          this.$emit("selectAllRowChange", selected, selectedRows, changeRows);
        },
        // getCheckboxProps: record => {
        //   console.log('this.defaultSelectedRowKeys,record',this.defaultSelectedRowKeys,record.id)
        //   return {
        //     props: {
        //       defaultChecked: this.selectedRowKeys.includes(record.id)
        //     }
        //   }
        // }
      },
      searchParams: {},
      selectedRowKeys: [],
      selectedRows: [],
      size: 10,
      current: 1,
      dataSource: [],
      tableLoading: false,
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
    async changeShow(params) {
      let res = await this.$post(this.statusUrl, params);
      if (res && res.returnCode == 1000) {
        console.log(res);

        //await this.getList();
      }
    },
    onChangeShow($event, record, index) {
      console.log($event, record, index);
      if ($event == true) {
        this.showValue = 1;
      } else if ($event == false) {
        this.showValue = 0;
      }
      //alert(this.defaultParams.galleryProductType)
      this.changeShow({
        [this.statusIdKey]: record.id,
        [this.statusTypeKey]: record[this.statusTypeKey],
        enableShow: this.showValue,
      });
    },
    tableChange(pagination) {
      if (pagination) {
        //alert(pagination.current)
        this.pagination.current = pagination.current;
        this.pagination.pageSize = pagination.pageSize;
        //this.handleSearch();
        this.getFormValues().then((values) => {
          this.searchParams = {
            ...values,
          };
          this.getList();
        });
      }
    },
    // 点击重置
    resetForm() {
      if (this.beforeResetForm && this.beforeResetForm instanceof Function) {
        this.beforeResetForm();
      }
      this.form.resetFields();
      this.handleSearch();
    },
    // 刷新当前表格(外部页面可以调用这个方法刷新表格，比如删除或者修改状态之后刷新表格)
    refreshTable() {
      this.getList();
    },
    // 点击搜索
    // handleSearch() {
    //   this.pagination.current = 1;
    //   this.getFormValues().then((values) => {
    //     this.searchParams = {
    //       ...values,
    //     };
    //     this.getList();
    //   });
    // },
    // // 获取筛选条件参数
    // getFormValues() {
    //   return new Promise((resolve, reject) => {
    //     if (this.form) {
    //       this.form.validateFields((err, values) => {
    //         if (!err) {
    //           console.log("values---", { ...values });
    //           const timeFormat = this.timeFormat;
    //           Object.keys(values).forEach((key) => {
    //             // 除了时间和时间范围，其他特殊情况请使用beforeSearchFunc处理
    //             if (values[key] instanceof Moment) {
    //               // 选择时间
    //               values[key] = values[key].format(timeFormat);
    //             } else if (
    //               key.split("-").length === 2 &&
    //               Array.isArray(values[key])
    //             ) {
    //               // 选择时间范围
    //               const arr = key.split("-");
    //               values[arr[0]] = values[key][0];
    //               values[arr[1]] = values[key][1];
    //               delete values[key];
    //             }
    //           });
    //           if (this.beforeSearchFunc) {
    //             values = this.beforeSearchFunc(values);
    //           }
    //           delete values[key];
    //         }
    //       });
    //       if (this.beforeSearchFunc) {
    //         values = this.beforeSearchFunc(values);
    //       }
    //       this.getList(values);
    //     }
    //   });
    // },
    // 获取筛选条件参数
    getFormValues() {
      return new Promise((resolve, reject) => {
        if (this.form) {
          this.form.validateFields((err, values) => {
            if (!err) {
              const timeFormat = this.timeFormat;
              Object.keys(values).forEach((item) => {
                if (!values[item] && values[item] !== 0) {
                  delete values[item];
                }
              });
              Object.keys(values).forEach((key) => {
                // 除了时间和时间范围，其他特殊情况请使用beforeSearchFunc处理
                if (values[key] instanceof Moment) {
                  // 选择时间
                  values[key] = values[key].format(timeFormat);
                } else if (
                  key.split("-").length === 2 &&
                  Array.isArray(values[key])
                ) {
                  // 选择时间范围
                  const arr = key.split("-");
                  values[arr[0]] = values[key][0];
                  values[arr[1]] = values[key][1];
                  delete values[key];
                }
              });
              if (this.beforeSearchFunc) {
                values = this.beforeSearchFunc(values);
              }
              resolve(values);
            }
          });
        } else {
          // 该表单没有筛选条件表单
          resolve({});
        }
      });
    },
    resetForm() {
      this.pagination.current = 1;
      this.pagination.pageSize = 10;
      this.form.resetFields();
      this.$emit("reset");
      this.handleSearch();
    },
    // 点击搜索
    handleSearch() {
      console.log("change");
      this.pagination.current = 1;
      this.getFormValues().then((values) => {
        console.log('---------------------------', values)
        this.searchParams = {
          ...values,
        };
        console.log("this.searchParams", this.searchParams);
        this.getList();
        this.$emit("search");
      });
    },
    // handleSubmit() {
    //   if(this.isApiSearch){
    //     this.form.validateFields((err, values) => {
    //       if (!err) {
    //         Object.keys(values).forEach((key) => {
    //           // 除了时间和时间范围，其他特殊情况请使用beforeSearchFunc处理
    //           if (values[key] instanceof Moment) {
    //             // 选择时间
    //             values[key] = values[key].format("YYYY-MM-DD HH:mm:ss");
    //           } else if (
    //             key.split("-").length === 2 &&
    //             Array.isArray(values[key]) &&
    //             values[key][0] instanceof Moment
    //           ) {
    //             // 选择时间范围
    //             const arr = key.split("-");
    //             values[arr[0]] = values[key][0].format("YYYY-MM-DD HH:mm:ss");
    //             values[arr[1]] = values[key][1].format("YYYY-MM-DD HH:mm:ss");
    //             delete values[key];
    //           }
    //         });
    //         if (this.beforeSearchFunc) {
    //           values = this.beforeSearchFunc(values);
    //         }
    //         this.getList(values);
    //         this.$emit('search');
    //       }
    //     });
    //   }
    //   else {
    //     this.$emit('search')
    //   }
    // },
    getList(current = "", size = "") {
      //alert(this.pagination.current)
      if (!this.url) return;
      this.searchParams = {
        ...this.defaultParams,
        ...this.searchParams, // 搜索条件可以覆盖默认参数
        current: current ? current : this.pagination.current,
        size: size ? size : this.pagination.pageSize,
      };
      //this.$set(this, "searchParams", params);
      this.tableLoading = true;
      if (this.isApiSearch) {
        this.$get(this.url, this.searchParams, { preventLoading: true })
          .then((res) => {
            this.tableLoading = false;
            if (res && res.returnCode === 1000) {
              this.selectedRowKeys = [];
              this.selectedRows = [];
              this.rowSelection.selectedRowKeys = [];
              this.dataSource =
                (res.dataInfo || {}).records || res.dataInfo || [];
              console.log("this.dataSource", this.dataSource);
              console.log("res.dataInfo", res.dataInfo);
              //this.pagination.current=(res.dataInfo || {}).current || 1;
              this.pagination.total = (res.dataInfo || {}).total || 0;
              this.$emit("selectedRowChange", this.selectedRows);
            } else {
              this.dataSource = [];
            }
          })
          .catch(() => {
            this.tableLoading = false;
          });
      } else {
        this.tableLoading = false;
        this.selectedRowKeys = [];
        this.selectedRows = [];
        this.rowSelection.selectedRowKeys = [];

        this.$emit("selectedRowChange", this.selectedRows);
        this.dataSource = this.tableData2;
        this.pagination.total = this.total;
      }
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
    .seach-btn-list {
      .ant-btn {
        margin-right: 20px;
        margin-top: 20px;
      }
    }
  }
  .opration-row {
    padding-top: 32px;
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

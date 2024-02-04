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
            @click="handleSearch(false)"
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
        :loading="tableLoading"
        @change="tableChange"
        :row-selection="hideSelect ? null : rowSelection"
        :columns="columns"
        :data-source="dataSource"
        :scroll="{ x: xLength }"
      >
        <span class="nowrap" slot="ImgTextOperation" slot-scope="text, record">
          <slot name="ImgTextTable" :record="record"></slot>
        </span>
        <span class="nowrap" slot="statusOperation" slot-scope="text, record">
          <slot name="statusTable" :record="record"></slot>
        </span>
        <span
          class="nowrap"
          slot="sendStatusOperation"
          slot-scope="text, record"
        >
          <slot name="sendStatusTable" :record="record"></slot>
        </span>
        <!-- 表格右侧的操作项 -->
        <span class="nowrap" slot="operation" slot-scope="text, record">
          <slot name="tableOperation" :record="record"></slot>
        </span>
      </a-table>
    </a-row>
  </div>
</template>
<script>
import Moment from 'moment'
export default {
  name: 'SearchTable',
  props: {
    url: {
      type: String,
      required: true
    },
    // 获取列表时，更改请求头
    headParams: {
      type: Object,
      default () {
        return {}
      }
    },
    hideSelect: {
      type: Boolean,
      required: false
    },
    timeFormat: {
      // 搜索表单的时间格式化方式
      type: String,
      default: 'YYYY-MM-DD HH:mm:ss'
    },
    defaultParams: {
      // 表格默认的参数，如果和搜索条件冲突，点击搜索时搜索条件会覆盖
      type: Object,
      default () {
        return {}
      }
    },
    filterParamsKeys: {
      // 表格重置时不会被清空的参数
      type: Array,
      default () {
        return []
      }
    },
    initSearch: {
      // 默认刚进来就搜索,
      type: [Boolean, Promise],
      default: true
    },
    beforeSearchFunc: {
      // 点击搜索对筛选参数二次处理
      type: Function
    },
    rowKey: {
      // 表单唯一值，也是选中的时候的key值
      type: String,
      default: 'id'
    },
    myTable: {
      // 使用页面自己的table组件
      type: Boolean,
      default: false
    },
    // 是否显示分页组件
    pagination: {
      type: [Object, Boolean],
      default () {
        return {
          showQuickJumper: true,
          total: 0,
          current: 1,
          pageSize: 10,
          showTotal: (total) => `共${ total }条`,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50', '100', '200']
        }
      }
    },
    selectKeys: {
      type: Array
    },
    form: {
      type: Object
    },
    columns: {
      type: Array,
      required: true
    },
    tableSelectType: {
      type: String,
      default: 'checkbox'
    },
    disabledKey: {
      type: String,
      default: ''
    },
    xLength: {
      type: Number,
      default: 0
    },
    beforeResetForm: {
      type: Function
    },
    beforeRenderFunc: {
      // 获取到表格数据后进行二次处理
      type: Function
    },
    extraFun: {
      // 额外的方法
      type: Function
    },
    rowSelectionSelect: {
      // 选中单个行的回调方法
      type: Function
    },
    rowSelectionChange: {
      // 表格可被选时的回调方法
      type: Function
    },
    rowSelectInvert: {
      // 表格全部反选时回调方法
      type: Function
    },
    defaultSelectedRowKeys: {
      // 默认选中的行
      type: Array,
      default: () => []
    },
    showSizeChanger: {
      type: Boolean,
      default: false
    },
    // 获取数据总量
    showDataNum: {
      type: Boolean,
      default: false
    },
    // 只用于售卡管理退款审核表格禁用
    sellCardCheck: {
      type: Boolean,
      default: false
    },
    // 用于区分是Get还是post请求  fasle：get, true:post
    requestType: {
      type: Boolean,
      default: false
    }
  },
  data () {
    let _this = this
    return {
      rowSelection: {
        type: this.tableSelectType,
        selectedRowKeys: [],
        fixed: true,
        getCheckboxProps: (record) => {
          this.selectedRowKeys = this.defaultSelectedRowKeys
          return {
            props: {
              disabled: record.disabled
                ? true
                : !!(record[_this.disabledKey] == 0 ||
                  (record[_this.disabledKey] != 'TO_AUDIT' &&
                    _this.sellCardCheck == true)),
              defaultChecked: this.selectedRowKeys.includes(record.id)
            }
          }
        },
        onSelect: (record, selected) => {
          if (this.rowSelectionSelect) {
            this.rowSelectionSelect(record, selected)
          }
        },
        onChange: (selectedRowKeys, selectedRows) => {
          this.rowSelection.selectedRowKeys = selectedRowKeys
          this.selectedRowKeys = selectedRowKeys
          this.selectedRows = selectedRows
          if (this.rowSelectionChange) {
            this.rowSelectionChange(selectedRowKeys, selectedRows)
          }
          this.$emit('selectedRowChange', selectedRows)
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
          if (this.rowSelectInvert) {
            this.rowSelectInvert(selected, selectedRows, changeRows)
          }
        }
      },
      searchParams: {},
      selectedRowKeys: [],
      selectedRows: [],
      size: 10,
      current: 1,
      dataSource: [],
      tableLoading: false
    }
  },
  created () {},
  mounted () {
    if (this.showSizeChanger && this.pagination) {
      this.pagination.showSizeChanger = !this.showSizeChanger
    }
    if (typeof this.initSearch === 'boolean' && this.initSearch) {
      this.handleSearch(true)
    } else if (this.initSearch instanceof Promise) {
      this.initSearch.then(() => {
        // initSearch返回resolve 的时候调用getList
        this.handleSearch(true)
      })
    }
  },
  methods: {
    // 分页、排序、筛选变化时触发
    tableChange (pagination) {
      if (pagination) {
        this.pagination.current = pagination.current
        this.pagination.pageSize = pagination.pageSize
        this.getList()
      }
    },
    // 点击重置
    resetForm () {
      if (this.beforeResetForm && this.beforeResetForm instanceof Function) {
        this.beforeResetForm()
      }
      if (this.filterParamsKeys.length > 0) {
        let formKeyValue = this.form.getFieldsValue()
          let keys = []
        let _this = this
        Object.keys(formKeyValue).forEach((key) => {
          if (!_this.filterParamsKeys.includes(key)) {
            keys.push(key)
          }
        })
        this.form.resetFields(keys)
      } else {
        this.form.resetFields()
      }
      this.$parent.masterOrderId = ''
      this.handleSearch()
    },
    // 刷新当前表格(外部页面可以调用这个方法刷新表格，比如删除或者修改状态之后刷新表格)
    refreshTable () {
      this.getFormValues().then((values) => {
        this.searchParams = {
          ...values
        }
        this.$emit('initChosenIds') // 清空已选中
        this.getList(this.pagination.current, this.pagination.pageSize)
      })
    },
    // 点击搜索
    handleSearch (type) {
      console.log(this.defaultParams)
      console.log('change')
      if (type) {
        if (this.$route.query.current) {
          this.pagination.current = this.$route.query.current
        } else {
          this.pagination.current = 1
        }
      } else {
        if (this.pagination) {
          this.pagination.current = 1
        }
      }
      this.getFormValues().then((values) => {
        this.searchParams = {
          ...values
        }
        console.log('values', values)
        this.$emit('initChosenIds') // 清空已选中
        this.getList()
      })
    },
    // handleSubmit (current,size) {
    //   this.form.validateFields((err, values) => {
    //     if (!err) {
    //       Object.keys(values).forEach(key => {
    //         // 除了时间和时间范围，其他特殊情况请使用beforeSearchFunc处理
    //         if (values[key] instanceof Moment) { // 选择时间
    //           values[key] = encodeURIComponent(values[key].format('YYYY-MM-DD HH:mm:ss'))
    //         } else if (key.split('-').length === 2 && Array.isArray(values[key]) && values[key][0] instanceof Moment) { // 选择时间范围
    //           const arr = key.split('-')
    //           values[arr[0]] = encodeURIComponent(values[key][0].format('YYYY-MM-DD HH:mm:ss'))
    //           values[arr[1]] = encodeURIComponent(values[key][1].format('YYYY-MM-DD HH:mm:ss'))
    //           delete values[key]
    //         }
    //       })
    //       if (this.beforeSearchFunc) {
    //         values = this.beforeSearchFunc(values)
    //       }
    //       this.getList(values,current,size)
    //     }
    //   })
    // },

    // 获取筛选条件参数
    getFormValues () {
      return new Promise((resolve, reject) => {
        if (this.form) {
          this.form.validateFields((err, values) => {
            if (!err) {
              const timeFormat = this.timeFormat
              Object.keys(values).forEach((item) => {
                if (!values[item] && values[item] !== 0) {
                  delete values[item]
                }
              })
              Object.keys(values).forEach((key) => {
                // 除了时间和时间范围，其他特殊情况请使用beforeSearchFunc处理
                if (values[key] instanceof Moment) {
                  // 选择时间
                  values[key] = values[key].format(timeFormat)
                } else if (
                  key.split('-').length === 2 &&
                  Array.isArray(values[key])
                ) {
                  // 选择时间范围
                  const arr = key.split('-')
                  values[arr[0]] = values[key][0]
                  values[arr[1]] = values[key][1]
                  delete values[key]
                }
              })
              if (this.beforeSearchFunc) {
                values = this.beforeSearchFunc(values)
              }
              resolve(values)
            }
          })
        } else {
          // 该表单没有筛选条件表单
          resolve({})
        }
      })
    },

    // 请求接口获取列表数据
    async getList (current = '', size = '') {
      if (!this.url) return
      let pageParams = {}
      if (this.pagination) {
        pageParams.current = current || this.pagination.current
        pageParams.size = size || this.pagination.pageSize
      }
      this.searchParams = {
        ...this.defaultParams,
        ...this.searchParams, // 搜索条件可以覆盖默认参数
        ...pageParams
      }
      console.log('this.searchParams', this.searchParams)
      this.tableLoading = true
      await (this.requestType ? this.$post : this.$get)(
        this.url,
        this.searchParams,
        {
          ...this.headParams,
          preventLoading: true
        }
      )
        .then((res) => {
          this.tableLoading = false
          if (res && res.returnCode === 1000) {
            if (this.beforeRenderFunc) {
              res = this.beforeRenderFunc(res)
            }
            if (this.extraFun) {
              this.extraFun({
                ...this.defaultParams,
                ...this.searchParams
              })
            }
            console.log('res:', res)
            this.selectedRowKeys = []
            this.selectedRows = []
            this.rowSelection.selectedRowKeys = []
            // this.dataSource = res.dataInfo.records || []
            if (this.showDataNum) {
              this.$emit('getDataNum', (res.dataInfo || {}).total || 0)
            }
            let arr = (res.dataInfo || {}).records || []
            if (this.pagination) {
              this.pagination.total = (res.dataInfo || {}).total || 0
            }
            if (this.pagination.total > 0 && arr.length == 0) {
              this.pagination.current = this.pagination.current - 1
              this.getList()
            } else {
              this.dataSource =
                (res.dataInfo || {}).records || res.dataInfo || []
            }
            this.$emit('dataSourceChange', res.dataInfo)
            this.$emit('selectedRowChange', this.selectedRows)
          } else {
            this.dataSource = []
          }
        })
        .catch(() => {
          this.dataSource = []
          this.tableLoading = false
        })
      // .then((res) => {
      //   this.tableLoading = false;
      //   if (res && res.returnCode === 1000) {
      //     if (this.beforeRenderFunc) {
      //       res = this.beforeRenderFunc(res);
      //     }
      //     console.log("res:", res);
      //     this.selectedRowKeys = [];
      //     this.selectedRows = [];
      //     this.rowSelection.selectedRowKeys = [];
      //     //this.dataSource = res.dataInfo.records || []
      //     this.dataSource = (res.dataInfo || {}).records || [];
      //     if (this.pagination) {
      //       this.pagination.total = (res.dataInfo || {}).total || 0;
      //     }
      //     this.$emit("dataSourceChange", res.dataInfo);
      //     this.$emit("selectedRowChange", this.selectedRows);
      //   } else {
      //     this.dataSource = [];
      //   }
      // })
      // .catch(() => {
      //   this.dataSource = [];
      //   this.tableLoading = false;
      // });
    }
  }
}
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
    padding-top: 16px;
    /deep/.ant-btn {
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

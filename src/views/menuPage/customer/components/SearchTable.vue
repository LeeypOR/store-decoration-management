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
          >搜索</a-button>
          <a-button
            html-type="submit"
            class="resetBtn"
            @click="resetForm"
            :disabled="tableLoading"
            >重置</a-button
          >
          <a-button type="primary" @click="addVipPayLevel"> + 新增付费会员卡</a-button>
        </a-form-item>
      </a-row>
    </a-row>
    <!-- 表格上面的操作（添加，导出等）$slots所有具名插槽的集合 -->
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

        <span class="nowrap" slot="right" slot-scope="text, record">
          <span v-for="(item,index) in record.benefitList">
            <span v-if="index!=record.benefitList.length-1">{{item}}, <span v-if="index>0 && index%3 == 0"><p></p></span></span>
            <span v-else> {{item}} </span>
          </span>
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
    status:{
      type: String,
      default:'1'
    },
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
    xLength: {
      type: Number,
      default: 0
    },
    beforeResetForm: {
      type: Function
    },
    showSizeChanger: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      rowSelection: {
        type: this.tableSelectType,
        selectedRowKeys: [],
        onChange: (selectedRowKeys, selectedRows) => {
          this.rowSelection.selectedRowKeys = selectedRowKeys
          this.selectedRowKeys = selectedRowKeys
          this.selectedRows = selectedRows
          this.$emit('selectedRowChange', selectedRows)
        },
        getCheckboxProps: (record) => ({
          props: {
            // 全部默认禁止选中
            // disabled: true,
            // 某几项默认禁止选中(R: 当state等于1时)
            // 状态为已经发放就disabled
            disabled: record.isEnable === 0,
            // 某几项默认选中(R: 当state等于1时)
            // defaultChecked: record.state == 1,
          },
        }),
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
  mounted () {
    if (this.showSizeChanger && this.pagination) {
      this.pagination.showSizeChanger = !this.showSizeChanger
    }
    if (typeof this.initSearch === 'boolean' && this.initSearch) {
      this.handleSearch()
    } else if (this.initSearch instanceof Promise) {
      this.initSearch.then(() => {
        // initSearch返回resolve 的时候调用getList
        this.handleSearch()
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
      this.form.resetFields()
      this.handleSearch()
    },
    // 刷新当前表格(外部页面可以调用这个方法刷新表格，比如删除或者修改状态之后刷新表格)
    refreshTable () {
      this.getFormValues().then((values) => {
        this.searchParams = {
          ...values
        }
        this.getList()
      })
    },
    // 点击搜索
    handleSearch () {
      console.log('change');
      if(this.pagination){
        // this.pagination.current = 1
      }
      this.getFormValues().then((values) => {
        this.searchParams = {
          ...values
        }
        // console.log('values',values);
        // console.log('this.searchParams', this.searchParams)
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
              Object.keys(values).forEach(item=>{
                if(!values[item]){
                  delete values[item];
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
    getList (current = '', size = '') {
      console.log(this.pagination)
      if (!this.url) return
      let pageParams = {}
      if(this.pagination) {
        pageParams.current = current || this.pagination.current
        pageParams.size = size || this.pagination.pageSize
      }
      console.log(this.defaultParams)
      this.searchParams = {
       status:this.status,
        ...this.defaultParams,
        ...this.searchParams, // 搜索条件可以覆盖默认参数
        ...pageParams
      }
      console.log('this.searchParams',this.searchParams)
      this.tableLoading = true
      this.$get(this.url,
        this.searchParams,
        { ...this.headParams, preventLoading: true, }
      ).then(res => {
        this.tableLoading = false
        if (res && res.returnCode === 1000) {
          console.log('res:',res)
          this.selectedRowKeys = []
          this.selectedRows = []
          this.rowSelection.selectedRowKeys = []
          //this.dataSource = res.dataInfo.records || []
          this.dataSource = (res.dataInfo || {}).records || []
          if(this.pagination) {
            this.pagination.total = (res.dataInfo || {}).total || 0
          }
          this.$emit('dataSourceChange', res.dataInfo)
          this.$emit('selectedRowChange', this.selectedRows)
        } else {
          this.dataSource = []
        }
      }).catch(() => {
        this.tableLoading = false
      })
    },

    addVipPayLevel(){
      this.$emit('addVipPayLevel')
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
    padding-top: 32px;
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

<template>
  <a-modal width="820px" :title="title" :visible="visible" :destroyOnClose="true" :maskClosable="false" :keyboard="false" @cancel="closeModal">
    <template slot="footer">
      <div>
        <a-button key="back" @click="confirm">确定</a-button>
      </div>
    </template>
    <div class="seaction">
      <div>
        <a-table :row-selection="rowSelection" :columns="columns" :data-source="dataSource" :rowKey="'id'" :pagination="pagination" :loading="tableLoading" @change="handleTableChange"></a-table>
      </div>
    </div>
  </a-modal>
</template>
<script>
export default {
  name: 'ShopModal',
  data () {
    return {
      tableLoading: false,
      selectedRows: [],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        showTotal: (total) => `共${ total }条`
      },
      dataSource: [],
      url: '',
      treeData: [],
      expandedRowKeys: [],
      oldCheckList: [],
      allCheckList: []
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    tabType: {
      type: Number,
      default: 1
    },
    listLength: {
      type: Number,
      default: 10000
    },
    list: {
      type: Array,
      default () {
        return []
      }
    },
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    resUrl: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    params: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  created () {},
  mounted () {},
  computed: {
    rowSelection () {
      return {
        selectedRowKeys: this.oldCheckList,
        onChange: (item, val) => {
          console.log(item, 'item')
          this.oldCheckList = item
          // let arr = this.allCheckList.concat(item)
          // this.allCheckList = Array.from(
          //   new Set(arr)
          // )
          this.selectedRows = Array.from(new Set(this.selectedRows.concat(val)))
        },
        getCheckboxProps: (record) => ({
          props: {
            defaultChecked: this.oldCheckList.includes(record.id)
          }
        })
      }
    }
  },
  methods: {
    handleSearch () {
      //  this.rowSelection()
      this.oldCheckList = this.list.map((item) => {
        return item.id
      })
      this.selectedRows = this.selectedRows.concat(this.list)
      this.getList()
    },
    getList () {
      let page = {
        current: this.pagination.current || 1,
        size: 10
      }
      let obj = Object.assign(page, this.params)
      this.$get(this.resUrl, obj).then((res) => {
        if (res && res.returnCode == 1000) {
          const { current, records, total, size } = res.dataInfo
          this.pagination = {
            total: total,
            current: current,
            pageSize: size
          }
          // var aab = { ...records[0], id: '1234545434' }
          this.dataSource = records
        }
      })
    },
    // getTreeList () {
    //   this.$get(this.url, {}).then((res) => {
    //     if (res && res.returnCode == 1000) {
    //       const { dataInfo } = res
    //       console.log('dataInfo', Object.values(dataInfo))
    //       this.treeData = dataInfo.goodsGroupList.filter((item) => {
    //         return item.groupStatus == 1
    //       })
    //       // var aab = { ...records[0], id: '1234545434' }
    //       // this.dataSource = records
    //     }
    //   })
    // },
    closeModal () {
       this.oldCheckList = []
        this.selectedRows = []
      this.$emit('cancel')
    },
    confirm () {
      const { selectedRows, oldCheckList } = this
      let obj = {}
      const newArr = selectedRows.reduce((item, n) => {
        // eslint-disable-next-line no-unused-expressions
        obj[n.id] ? '' : obj[n.id] = true && item.push(n)
        return item
      }, [])
      let arr = Array.from(new Set(oldCheckList))
      console.log(arr, 'arr')
      let selectArr = arr.map((item) => {
        for (let i = 0, length = newArr.length; i < length; i++) {
          if (newArr[i].id == item) {
            return newArr[i]
          }
        }
      })

      this.$emit('confirm', selectArr)
    },
    handleTableChange (pagination, filters, sorter) {
      this.pagination.current = pagination.current
      this.getList()
    }
  },
  watch: {
    visible (n, old) {
      if (n) {
        this.handleSearch()
      } else {
        this.oldCheckList = []
        this.selectedRows = []
      }
    }
  }
}
</script>
<style lang="less" scoped>
.seaction {
  // height: 520px;
}
</style>

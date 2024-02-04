<template>
  <a-modal
    :visible="visible"
    okText="提交"
    width="60%"
    cancelText="关闭"
    :title="title"
    :maskClosable="false"
    :keyboard="false"
    @cancel="closeModal()"
    @ok="handleSubmit">
      <a-table
        rowKey="id"
        :pagination="{
          total
        }"
        @change="tableChange"
        :row-selection="rowSelection"
        :columns="columns"
        :data-source="tableData" >
        <template slot="operation" slot-scope="text, record">
          <permission authority="permissions:delete">
            <span class="text-primary pointer" @click="openInfo(record)">修改</span>
          </permission>
          <a-divider type="vertical" />
          <permission authority="permissions:delete">
            <span class="text-danger pointer" @click="deleteRows([record.id])">删除</span>
          </permission>
          <a-divider type="vertical" />
          <permission authority="roles:permissions:list">
            <span class="text-primary pointer" @click="openPermission(record)">权限设置</span>
          </permission>
        </template>
      </a-table>
  </a-modal>
</template>
<script>
export default {
  name: 'ChooseRole',
  props: {
    record: {
      type: Object,
      default () {
        return {}
      }
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    title () {
      return '选择角色'
    }
  },
  watch: {
    visible (value) {
      if (value && this.record.id) {
        this.getList()
        this.getUserRole()
      }
    }
  },
  data () {
    return {
      size: 10,
      current: 1,
      total: 0,
      tableData: [],
      selectedRowKeys: null,
      rowSelection: {
        type: 'radio',
        selectedRowKeys: [],
        onChange: (selectedRowKeys, selectedRows) => {
          this.rowSelection.selectedRowKeys = selectedRowKeys
        }
      },
      columns: [{
          title: '角色名称',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '创建时间',
          dataIndex: 'createDate',
          key: 'createDate'
        }
      ]
    }
  },
  methods: {
    getUserRole () {
      this.rowSelection.selectedRowKeys = []
      this.$get('/sys/users/' + this.record.id + '/roles').then((res) => {
        if (res && res.returnCode === 1000) {
          this.rowSelection.selectedRowKeys = res.dataInfo
        }
      })
    },
    tableChange (pagination) {
      if (pagination) {
        this.current = pagination.current
        this.size = pagination.pageSize
        this.getList()
      }
    },
    getList () {
      this.$get('/sys/roles', { size: this.size, current: this.current }).then(res => {
        if (res && res.returnCode === 1000) {
          this.tableData = res.dataInfo.records
          this.total = res.dataInfo.total
        } else {
          this.tableData = []
        }
      })
    },
    handleSubmit () {
      if (!(this.rowSelection.selectedRowKeys && this.rowSelection.selectedRowKeys.length)) return this.$message.error('请先选择一项后再提交！')
      let url = '/sys/users'
      url = this.record.id ? `${ url }/${ this.record.id }/roles/choose` : url
      const list = this.rowSelection.selectedRowKeys.map(item => ({ roleId: item }))
      this.$post(url, { list }).then(res => {
        if (res && res.returnCode === 1000) {
          this.$message.success('保存成功！')
          this.closeModal()
        }
      })
    },
    closeModal () {
      this.$emit('cancel')
    }
  }
}
</script>

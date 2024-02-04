<template>
<div class="table-template">
  <search-table :url="url" ref="searchtable" :columns="columns" :form="form">
    <!-- 筛选条件（可无） -->
    <template slot="searchForm">
      <a-form layout="inline" :form="form">
        <a-form-item label="用户姓名">
          <a-input
            v-decorator="[
              'name',
            ]"
            placeholder="请输入用户姓名"
          />
        </a-form-item>
        <a-form-item label="时间">
          <a-date-picker
            show-time
            format="YYYY-MM-DD HH:mm:ss"
            v-decorator="[
              'time', // 提交的时候会转成 'YYYY-MM-DD HH:mm:ss'
            ]"
          />
        </a-form-item>
        <a-form-item label="时间范围">
          <fast-range-picker
            v-decorator="[
              'startTime-endTime',
            ]"
            >
          </fast-range-picker>
        </a-form-item>
      </a-form>
    </template>
    <!-- 表格上面的操作（添加，导出等） -->
    <template slot="oprationRow">

      <permission authority="">
        <a-button type="primary" icon="export" @click="exportExcel()">导出</a-button>
      </permission>
      <permission authority="">
        <a-button type="primary" icon="plus" @click="openInfo()">添加</a-button>
      </permission>
      <permission authority="users:roles:choose">
        <a-button @click="deleteRows($refs.searchtable.selectedRowKeys)" type="danger" icon="delete">删除</a-button>
      </permission>
    </template>
    <!-- <template slot="myTable"  slot-scope="{dataSource, pagination, tableLoading, change, rowKey, rowSelection}">
      <a-table
        jieshi="给searchTable传如 myTable = true 就可以完全自定义表格"
        :rowKey="rowKey"
        :pagination="pagination"
        @change="change"
        :row-selection="rowSelection"
        :columns="columns"
        :data-source="dataSource"
        :loading="tableLoading"
        >
        <template slot="operation" slot-scope="text, record">
          <permission authority="">
            <span class="text-primary pointer" @click="openInfo(record)">修改</span>
          </permission>
          <a-divider type="vertical" />
          <permission authority="">
            <span class="text-danger pointer" @click="deleteRows([record.id])">删除</span>
          </permission>
          <a-divider type="vertical" />
          <permission authority="">
            <span class="text-primary pointer" @click="openEditPasModal(record)">修改密码</span>
          </permission>
          <a-divider type="vertical" />
          <permission authority="">
            <span class="text-danger pointer" @click="resetPas(record)">重置密码</span>
          </permission>
          <a-divider type="vertical" />
          <permission authority="">
            <span class="text-primary pointer" @click="openChooseRoleModal(record)">选择角色</span>
          </permission>
        </template>
      </a-table>
    </template> -->
    <!-- 表格右侧的操作项 -->
    <template slot="tableOperation" slot-scope="{record}">
      <permission authority="users:modify">
        <span class="text-primary pointer" @click="openInfo(record)">修改</span>
      </permission>
      <a-divider type="vertical" />
      <permission authority="users:delete">
        <span class="text-danger pointer" @click="deleteRows([record.id])">删除</span>
      </permission>
      <a-divider type="vertical" />
      <permission authority="users:password:change">
        <span class="text-primary pointer" @click="openEditPasModal(record)">修改密码</span>
      </permission>
      <a-divider type="vertical" />
      <permission authority="users:password:reset">
        <span class="text-danger pointer" @click="resetPas(record)">重置密码</span>
      </permission>
      <a-divider type="vertical" />
      <permission authority="users:roles:choose">
        <span class="text-primary pointer" @click="openChooseRoleModal(record)">选择角色</span>
      </permission>
    </template>
  </search-table>
  <user-info :record="currentRecord" @cancel="closeInfoModal" :visible="infoVisible" />
  <edit-pas :record="currentRecord" @cancel="closeEditPasModal" :visible="editPasVisible" />
  <choose-role :record="currentRecord" @cancel="closeChooseRoleModal" :visible="chooseRoleVisible" />

</div>
</template>
<script>
import UserInfo from './components/UserInfo'
import EditPas from './components/EditPas'
import ChooseRole from './components/ChooseRole'
export default {
  name: 'TableTemplate',
  data () {
    return {
      url: '/quoted/paoperty/list',
      infoVisible: false,
      editPasVisible: false,
      chooseRoleVisible: false,
      currentRecord: {},
      form: this.$form.createForm(this, { name: 'table_search' }),
      columns: [
        {
          title: '用户名',
          dataIndex: 'account',
          key: 'account'
        },
        {
          title: '用户姓名',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '创建时间',
          dataIndex: 'createDate',
          key: 'createDate'
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' }
        }
      ]
    }
  },
  components: {
    UserInfo,
    EditPas,
    ChooseRole
  },
  mounted () {
  },
  methods: {
    exportExcel () {
      const params = this.$refs.searchtable.searchParams || {}
      const selectedIds = this.$refs.searchtable.selectedRowKeys
      if (selectedIds && selectedIds.length) {
        params['ids'] = selectedIds.join(',')
      }
      this.$export('/ubp/union/central/admin/ability/order/export', this.$refs.searchtable.searchParams)
    },
    resetPas (record) {
      this.$confirm({
        title: '重置密码',
        okText: '确认',
        cancelText: '取消',
        centered: true,
        content: '确认将密码重置为“123456”？',
        onOk: () => {
          return new Promise((resolve, reject) => {
            this.$post(`/sys/users/${ record.id }/password/reset`).then(res => {
              if (res && res.returnCode === 1000) {
                this.$message.success('密码重置成功')
                resolve()
              } else {
                reject()
              }
            }).catch(() => reject())
          })
        }
      })
    },
    closeInfoModal (freshTable) {
      this.infoVisible = false
      if (freshTable) {
        this.$refs.searchtable.refreshTable()
      }
    },
    openInfo (record) {
      this.currentRecord = record
      this.infoVisible = true
    },
    closeEditPasModal () {
      this.editPasVisible = false
    },
    openEditPasModal (record) {
      this.currentRecord = record
      this.editPasVisible = true
    },
    closeChooseRoleModal () {
      this.chooseRoleVisible = false
    },
    openChooseRoleModal (record) {
      this.currentRecord = record
      this.chooseRoleVisible = true
    },
    deleteRows (ids) {
      if (!ids || ids.length === 0) return this.$message.warn('请先选择一项后再进行操作')
      this.$confirm({
        title: '删除提示',
        content: '删除操作不可恢复，请确认是否删除？',
        okText: '确认删除',
        cancelText: '取消',
        onOk: () => {
          this.$post('/sys/users/delete', ids).then(res => {
            if (res && res.returnCode == 1000) {
              this.$message.success('删除成功')
              this.$refs.searchtable.refreshTable()
            }
          })
        }
      })
    }
  }
}
</script>

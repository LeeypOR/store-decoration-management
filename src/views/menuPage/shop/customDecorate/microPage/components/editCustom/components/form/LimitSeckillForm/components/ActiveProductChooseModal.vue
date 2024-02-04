<template>
	<a-modal
		width="1200px"
		title="添加商品"
		:visible="visible"
		:destroyOnClose="true"
		:maskClosable="false"
		:keyboard="false"
		@cancel="closeModal"
	>
		<!-- <template slot="title">
			<div>
				秒杀管理
			</div>
		</template> -->

		<template slot="footer">
			<div>
				<a-button key="back" @click="confirm">确定</a-button>
			</div>
		</template>
		<div class="seaction">
			<a-tabs v-model="activeType" @change="tabChange">
				<a-tab-pane key="1" tab="秒杀管理" :disabled="seckillDisabled">
					<a-spin tip="Loading..." :spinning="tableLoading">
						<a-table
							:row-selection="rowSelection"
							:columns="columns"
							:data-source="dataSource"
							:rowKey="'id'"
							:pagination="pagination"
							@change="handleTableChange"
						></a-table>
					</a-spin>
				</a-tab-pane>
				<a-tab-pane key="2" tab="折扣管理" :disabled="discountDisabled">
					<a-spin tip="Loading..." :spinning="tableLoading">
						<a-table
							:row-selection="rowSelection"
							:columns="columns"
							:data-source="dataSource"
							:rowKey="'id'"
							:pagination="pagination"
							@change="handleTableChange"
						></a-table>
					</a-spin>
        </a-tab-pane>
			</a-tabs>
		</div>
	</a-modal>
</template>
<script>
import TableTreeSelection from '@/mixins/TableTreeSelection'
export default {
	name: 'ActiveProductChooseModal',
	mixins: [TableTreeSelection],
	data () {
		return {
      disabledTabName: '',
			activeType: '1',
			columns: [
				{
					title: '商品名称',
					dataIndex: 'goodsName',
					width: '150px',
          ellipsis: true,
					key: 'goodsName'
				},
				{
					title: '现有库存',
					dataIndex: 'goodsInventoryTotal',
					key: 'goodsInventoryTotal'
				},
				{
					title: '秒杀剩余库存',
					dataIndex: 'totalRemainStock',
					key: 'totalRemainStock'
				},
				{
					title: '秒杀总库存',
					dataIndex: 'totalSeckillStock',
					key: 'totalSeckillStock'
				},
				{
					title: '商品状态',
					dataIndex: 'goodsStatus',
					key: 'goodsStatus',
					customRender (val) {
						switch (+val) {
							case 1:
								return '仓库中'
							case 2:
								return '上架'
							case 3:
								return '已下架'
						}
					}
				},
				{
					title: '活动名称',
					dataIndex: 'activityName',
					key: 'activityName'
				},
				{
					title: '活动时间',
					dataIndex: 'activityTime',
					width: '150px',
					key: 'activityTime'
				},
				{
					title: '活动状态',
					dataIndex: 'activityStatu',
					key: 'activityStatu',
					customRender (val) {
						switch (+val) {
							case 1:
								return '未开始'
							case 2:
								return '进行中'
							case 3:
								return '已结束'
						}
					}
				}
			],
			tableLoading: true,
			selectedRowKeys: [],
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
			params: {},
			selectNumDisabled: false
		}
	},
	props: {
		selectedProductList: {
			type: Array,
			default () {
				return []
			}
		},
		visible: {
			type: Boolean,
			default: false
		}
	},
	created () {
		// this.initSelectedData()
	},
	mounted () {},
	computed: {
    rowSelection () {
      return {
        type: 'checkbox',
        // selections: true,
        selectedRowKeys: this.selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectedRowKeys = selectedRowKeys
          // this.selectedRows = selectedRows
          console.log('selectedRowKeys', this.selectedRowKeys)
          if (selectedRowKeys.length === 0) {
            this.disabledTabName = ''
          }
          if (this.activeType == '1' && selectedRowKeys.length > 0) {
            this.disabledTabName = 'discount'
          } else if (this.activeType == '2' && selectedRowKeys.length > 0) {
            this.disabledTabName = 'seckill'
          }
          // console.log('selectedRows', this.selectedRows)
        },
        getCheckboxProps: (record) => ({
          props: {
            disabled: record.totalRemainStock == 0 || record.goodsStatus != 2
          }
        })
      }
    },
    discountDisabled () {
      if (this.disabledTabName === 'seckill') return false
      else if (this.disabledTabName === 'discount') return true
      const hadSeckillProduct = this.selectedRows.find(item => item.activityType == '0')
      if (hadSeckillProduct) {
        return true
      } else return false
    },
    seckillDisabled () {
      if (this.disabledTabName === 'seckill') return true
      else if (this.disabledTabName === 'discount') return false
      const hadDiscountProduct = this.selectedRows.find(item => item.activityType == '1')
      if (hadDiscountProduct) {
        return true
      } else return false
    }
  },
	methods: {
    tabChange () {
      this.pagination.current = 1
      this.handleSearch()
    },
		initSelectedData () {
			this.selectedRows = this.selectedProductList
      const isSeckillFlag = this.selectedRows.find(item => item.activityType == '0')
      const isDiscountFlag = this.selectedRows.find(item => item.activityType == '1')
      if (isSeckillFlag) this.activeType = '1'
      if (isDiscountFlag) this.activeType = '2'
			this.selectedRowKeys = this.selectedRows.map((item) => item.id)

			// this.initRowSelection()
		},
		// initRowSelection () {
		// 	this.rowSelection = {
		// 		type: 'checkbox',
		// 		// selections: true,
		// 		selectedRowKeys: this.selectedRowKeys,
		// 		onChange: (selectedRowKeys, selectedRows) => {
		// 			this.selectedRowKeys = selectedRowKeys
		// 			this.selectedRows = selectedRows
					// this.rowSelection.selectedRowKeys = selectedRowKeys
    //       console.log('')
		// 		},
		// 		getCheckboxProps: (record) => ({
		// 			props: {
		// 				disabled: record.totalRemainStock == 0 || record.goodsStatus != 2
		// 			}
		// 		})
		// 	}
		// },
		handleSearch () {
			if (this.activeType === '1') {
				// 商品
				this.url = 'goldenhome/seckill_/admin/seckill/goods/timePage'
				this.params = {
					current: this.pagination.current,
					size: 10
				}
        this.columns.splice(2, 2,
          ...[
            {
              title: '秒杀剩余库存',
              dataIndex: 'totalRemainStock',
              key: 'totalRemainStock'
            },
            {
              title: '秒杀总库存',
              dataIndex: 'totalSeckillStock',
              key: 'totalSeckillStock'
            }
          ]
        )
				this.getDataList()
			} else {
				// 商品
				this.url = 'goldenhome/seckill_/admin/discount/goods/timePage'
				this.params = {
					current: this.pagination.current,
					size: 10
				}
        this.columns.splice(2, 2,
          ...[
            {
              title: '折扣剩余库存',
              dataIndex: 'totalRemainStock',
              key: 'totalRemainStock'
            },
            {
              title: '折扣总库存',
              dataIndex: 'totalDiscountStock',
              key: 'totalDiscountStock'
            }
          ]
        )
				this.getDataList()
      }
		},
		async getDataList () {
			this.tableLoading = true
			if (this.params.current) {
				this.params.current = this.pagination.current
			}
			const res = await this.$get(this.url, this.params)

			if (res.returnCode == 1000) {
				this.dataSource = res.dataInfo.records.filter((item) => item)
				this.pagination.total = res.dataInfo.total
				this.tableLoading = false
			} else {
				this.dataSource = []
				this.tableLoading = false
			}
			// .then((res) => {
			// 	if (res && res.returnCode == 1000) {
			// 		if (res.dataInfo.records) {
			// 			const { current, records, total, size } = res.dataInfo
			// 			this.pagination = {
			// 				total: total
			// 			}
			// 			this.dataSource = records
			// 			this.tableLoading = false
			// 		} else {
			// 			if (Array.isArray(res.dataInfo)) {
			// 				this.dataSource = res.dataInfo
			// 			} else {
			// 				this.dataSource = []
			// 			}
			// 			this.tableLoading = false
			// 		}
			// 	} else {
			// 		this.dataSource = []
			// 		this.tableLoading = false
			// 	}
			// })
			// .catch(() => {
			// 	this.dataSource = []
			// 	this.tableLoading = false
			// })
		},
		closeModal () {
			this.$emit('cancel')
		},
		confirm () {
			this.$emit('confirm', this.selectedRowKeys)
		},
		handleTableChange (pagination, filters, sorter) {
			this.pagination.current = pagination.current
			this.getDataList()
		}
	},
	watch: {
		visible (n, old) {
			if (n) {
				this.initSelectedData()
				this.handleSearch()
			} else {
				this.pagination.current = 1
			}
		}
	}
}
</script>
<style lang="less" scoped>
.seaction {
	// height: 520px;
}
.searchArea {
	display: flex;
	margin-bottom: 15px;
	div {
		display: flex;
		flex-shrink: 0;
		align-items: center;
	}
	.name {
		margin-right: 10px;
	}
	.opration {
		margin-left: 20px;
		.searchBtn {
			margin-right: 10px;
		}
	}
}
.goodsNm {
	position: absolute;
	left: 21px;
	top: 8px;
	font-size: 14px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #999999;
	line-height: 20px;
	padding: 5px;
}
/deep/.ant-modal-footer {
	position: relative;
}
</style>

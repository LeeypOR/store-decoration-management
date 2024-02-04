<template>
    <div>
        <div>
            <search-table :url="url"
                          ref="searchtable"
                          :columns="columns"
                          :hide-select="true"
                          :form="form"
                          style="margin-top:20px;"
                          :pagination="pagination">
                <template slot="searchForm">
                    <a-form layout="inline" :form="form">
                        <a-form-item>
                            <a-button type="primary" @click="importClients">批量导入客户</a-button>
                        </a-form-item>
                    </a-form>
                </template>

                <template slot="tableOperation" slot-scope="{ record }">
                    <permission authority="">
                        <span  class="text-primary pointer" @click="checkDetail(record)">查看明细</span>
                    </permission>
                    
                    <a-divider v-if="!!record.gradeId &&record.isEnable ===0 " type="vertical"></a-divider>
                    <permission authority="">
                        <template  v-if="!!record.gradeId &&record.isEnable ===0 ">
                            <span class="text-primary pointer" @click="qiyong(record,'启用该会员卡')" >启用</span>
                        </template>
                    </permission>

                    <a-divider v-if="!!record.gradeId && record.isEnable !==1" type="vertical"></a-divider>
                    <permission authority="">
                        <span v-if="!!record.gradeId && record.isEnable !==1"  class="text-primary pointer" @click="deleteRecord(record)">删除</span>
                    </permission>
                </template>

            </search-table>

        </div>
    </div>
</template>

<script>
    // 这个importClientsList文件就是index文件
    import SearchTable from "./components/SearchTable";
    export default {
        name: "importClientsList",
        components:{
            SearchTable
        },
        created() {
            console.log(this.$route.query)

            if (this.$route.query.current){
                console.log(this.$route.query.current)
                this.pagination.current = this.$route.query.current
            }else {
                this.pagination.current =  1
            }

        },
        data(){
            return{
                pagination: {
                    showQuickJumper: true,
                    total: 0,
                    current: null,
                    pageSize: 10,
                    showTotal: (total) => `共${ total }条`,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '50', '100', '200']
                },
                form: this.$form.createForm(this, {name: 'table_search'}),
                url:"goldenhome/member/admin_/leadin/record/page",
                clientList:[],

                columns:[
                    {
                        title: '序号',
                        dataIndex: 'xuhao',
                        align:'center',
                        key: 'xuhao'
                    },
                 /*   {
                        title: '预计导入数',
                        dataIndex: 'expectedCount',
                        align:'center',
                        key: 'expectedCount',
                        customRender: (text, row) => {
                            return row.actualCount

                        }
                    },*/
                    {
                        title: '实际导入数',
                        dataIndex: 'actualCount',
                        align:'center',
                        key: 'actualCount',
                    },
                    {
                        title:'导入时间',
                        // createDate
                        dataIndex: 'createDate',
                        align:'center',
                        key: 'createDate',
                    },
                    {
                        title:'导入类型',
                        // createDate
                        dataIndex: 'type',
                        align:'center',
                        key: 'type',
                        customRender: (text, row) => {
                            if (!!row.cardId){
                                return '送权益卡'
                            }else {
                                return '导入成为会员'
                            }

                        }
                    },
                    {
                        title: '成为会员类型',
                        dataIndex: 'type2',
                        align:'center',
                        key: 'type2',
                        customRender: (text, row) => {
                            if (!!row.gradeId && !!row.gradeName && row.isForever==1){
                                return '永久金勋会员'
                            }
                            else if (!!row.cardId){
                                return "——"
                            }else {
                                return row.gradeName
                            }
                        }
                    },
                    {
                        title: '有效期',
                        dataIndex: 'validuration',
                        key: 'validuration',
                        customRender: (text, row) => {
                            if (row.validPeriodUnit == 4){
                                return "永久"
                            }
                            if (row.validPeriodUnit == 3){
                                return row.duration+"年"
                            }
                            if (row.validPeriodUnit == 2){
                                return row.duration+"个月"
                            }
                            if (row.validPeriodUnit == 1){
                                return row.duration+"天"
                            }

                        }
                    },
                    {
                        title: '权益卡',
                        dataIndex: 'cardName',
                        align:'center',
                        key: 'cardName',
                        customRender: (text, row) => {
                            if (!!row.cardId && !!row.cardName) {
                                return row.cardName
                            } else {
                                return "——"
                            }
                        }
                    },
                    {
                        title: '启用状态',
                        dataIndex: 'status',
                        align:'center',
                        key: 'status',
                        customRender: (text, row) => {
                            if (!!row.cardId && !!row.cardName) {
                                return "——"
                            } else if (!!row.gradeId && !!row.gradeName && row.isEnable==1) {
                                return "已启用"
                            }else if (!!row.gradeId && !!row.gradeName && row.isEnable==0) {
                                return "未启用"
                            }else {

                            }
                        }
                    },
                    {
                        title: '操作',
                        align:'center',
                        dataIndex: 'operation',
                        key: 'operation',
                        scopedSlots: { customRender: 'operation'}
                    }
                ],

            }
        },
        computed:{

        },

        methods:{
            importClients(){
                console.log("批量导入客户")
                this.$router.push({
                    name: 'CustomerImportClientsImportClients',
                })
               

            },
            deleteRecord(record){
                console.log(record.id)
                // if (!(ids && ids.length)) return this.$message.warn('请先选择一项后再进行操作')
                this.$confirm({
                    title: '删除提示',
                    content: '删除操作不可恢复，请确认是否删除？',
                    okText: '确认删除',
                    cancelText: '取消',
                    onOk: ()=> {
                        this.$post('goldenhome/member/admin_/leadin/record/delete', {id:record.id}).then(res => {
                            if (res && res.returnCode === 1000) {
                                this.$message.success('删除成功')
                                this.$refs.searchtable.refreshTable()
                            }
                        })
                    }
                })
            },
            qiyong(record,content) {
                console.log("record", record)
                // let isEnabled = 1
                this.$confirm({
                    title: '显示提示',
                    content: `确认${content}吗?`,
                    okText: '确认',
                    cancelText: '取消',
                    onOk: ()=> {
                        this.$post('goldenhome/member/admin_/leadin/record/enable',{id: record.id}).then(res => {
                            if (res && res.returnCode == 1000) {
                                if (res && res.returnCode === 1000) {
                                    this.$message.success('操作成功!')
                                    this.$refs.searchtable.refreshTable()
                                }
                            }
                        })
                    }
                })
            },
            checkDetail(record){
                console.log(record)
                // 往会员跳  带上 明细id  卡名字  是否启用
                if (!!record.gradeId && !!record.gradeName){
                    this.$router.push({
                        name: 'CustomerImportClientsImportVipCardDetail',
                        query: {
                            id: record.id,
                            gradeName:record.gradeName,
                            isForever:record.isForever,
                            isEnable:record.isEnable,
                            current:this.pagination.current
                            //
                        }
                    })
                }
                // 往权益卡跳  带上 明细id  卡名字
                if (!!record.cardId && !!record.cardName){
                    this.$router.push({
                        name: 'CustomerImportClientsImportRightCardDetail',
                        query: {
                            id: record.id,
                            cardName:record.cardName,
                            current:this.pagination.current
                        }
                    })

                }
            }

        }

    }
</script>

<style scoped>

</style>
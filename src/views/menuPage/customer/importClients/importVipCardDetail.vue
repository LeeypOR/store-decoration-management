<template>
  <div class="recycle-manage">
    <search-table :url="url"
                  ref="searchtable"
                  :form="form"
                  :columns="columns"
                  :default-params="defaultParams"
                  :isEnable="isEnable">

      <template slot="searchForm">
        <a-form layout="inline" :form="form">
          <a-form-item label="手机号">
            <a-input
              v-decorator="[
                'phoneNumber',
              ]"
              placeholder="请输入手机号"
            >
            </a-input>
          </a-form-item>

          <a-form-item label="姓名">
            <a-input
              v-decorator="[
                'customerName',
              ]"
              placeholder="请输入姓名"
            >
            </a-input>
          </a-form-item>

          <a-form-item label="员工账号">
            <a-input
              v-decorator="[
                'employeeNo',
              ]"
              placeholder="请输入员工账号"
            >
            </a-input>
          </a-form-item>

          <a-form-item label="是否已登录">
            <a-select
              style="width:150px;"
              v-decorator="[
                'loginFlag',{initialValue:''}
              ]"
              :disabled="isEnable==0"
              :options="loginFlagList"
            >

            </a-select>
          </a-form-item>

          <a-form-item label="会员状态">

            <a-select
              :disabled="isEnable==0"
              style="width:150px;"
              v-decorator="[
                'state',{initialValue:''}
              ]"
              :options="stateList"
            >

            </a-select>
          </a-form-item>
        </a-form>
      </template>


      <template slot="oprationRow">
        <permission authority="">
          <a-button v-if="isEnable==1" type="danger" @click="invalid($refs.searchtable.selectedRowKeys)">批量失效</a-button>
          <a-button v-if="isEnable==0" type="primary" @click="deletes($refs.searchtable.selectedRowKeys)">批量删除
          </a-button>
        </permission>

        <permission authority="">
          <a-button @click="back">返回</a-button>
        </permission>
      </template>

      <!-- -->
      <template slot="vipType" >
        <div v-if="gradeName =='金勋会员' && isForever ==1">
          永久金勋会员
        </div>
        <div v-else>
          {{gradeName}}
        </div>
      </template>
      <!--标签名称-->
      <template slot="labelList" slot-scope="{record }">
        <span v-for="(item,index) in record.labelList" :key="index"> {{item}} </span>
      </template>

      <template slot="tableOperation" slot-scope="{record}">
        <permission authority="leadin:detail:modify" v-if="isEnable ==0">
          <span class="text-primary pointer" @click="edit(record)">修改</span>
        </permission>

        <a-divider type="vertical" v-if="isEnable ==0"></a-divider>
        <permission authority="leadin:detail:delete" v-if="isEnable ==0">
          <span class="text-primary pointer" @click="deletes([record.id])">删除</span>
        </permission>

        <permission authority="leadin:detail:delete" v-if="isEnable ==1">
          <span class="text-danger pointer" v-show="record.state ==1 || record.state ==2" @click="invalid([record.id])">失效</span>
          <span  v-show="record.state ==4">无变动</span>

          <span  v-show="record.state ==3">
            <template v-if="record.remark == null">
              <span >失效原因：系统失效</span>
            </template>
            <span v-if="record.remark!== null">
              <span>失效原因：{{record.remark}}</span> <br>
              <span>操作人：{{record.userName}}</span><br>
              <span>{{record.userPhone}}</span>
            </span>
          </span>
        </permission>
      </template>


    </search-table>
    <EditModel :record="currentRecord" @cancel="closeInfoModal" :visible="infoVisible"/>
    <inValidModel :record="invalidRecord" @cancel="closeinValidModal" :visible="inValidVisible"></inValidModel>
  </div>
</template>
<script>
  // import {setLastChildrenNull} from '@/utils'
  // 送权益卡  CardSearchTable
  import SearchTable from "./components/VipSearchTable";
  import EditModel from "./components/EditModel";
  import deepCopy from "@/utils/deepCopy";
  import inValidModel from "./components/inValidModel";

  export default {
    name: 'importVipCardDetail',
    components: {
      SearchTable,
      EditModel,
      inValidModel
    },
    data() {
      return {
        url: 'goldenhome/member/admin_/leadin/detail/page',
        infoVisible: false,
        inValidVisible: false,


        currentRecord: {},
        invalidRecord: [],

        form: this.$form.createForm(this, {name: 'table_search'}),
        //(1:未生效;2:生效中;3:已失效;4:无变动
        stateList: [
          {label: '全部', value: ''},
          {label: '未生效', value: 1},
          {label: '生效中', value: 2},
          {label: '已失效', value: 3},
          {label: '无变动', value: 4},
        ],
        loginFlagList: [
          {label: '全部', value: ''},
          {label: '已登录', value: 1},
          {label: '未登录', value: 0},

        ],
        // 商品分类
        cateTree: [],
        columns: [
          {
            title: '客户手机号',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber'
          },
          {
            title: '客户姓名',
            dataIndex: 'customerName',
            key: 'customerName'
          },
          {
            title: '员工账号',
            dataIndex: 'employeeNo',
            key: 'employeeNo'
          },
          /*{
              title: '导入时间',
              dataIndex: 'startUseTime',
              key:'startUseTime'
            },*/
          {
            title: () => this.colName,
            dataIndex: this.colName==0? 'createDate' : 'updateDate',
            key:  this.colName==0? 'createDate' : 'updateDate',
          },
          {
            title: '客户标签',
            dataIndex: 'labelList',
            key: 'labelList',
            scopedSlots: {customRender: 'labelList'}
          },
          // 带过来
          {
            title: '导入会员级别',
            dataIndex: 'vipType',
            key: 'vipType',
            scopedSlots: {customRender: 'vipType'}
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
            title: '是否已登录',
            dataIndex: 'loginFlag',
            key: 'loginFlag',
            customRender: (text, row) => {
              if (text == 1) {
                return '已登录'
              } else if (text == 0) {
                return "未登录"
              } else {
                return text
              }
            }
          },
          {
            title: '会员状态',
            dataIndex: 'state',
            key: 'state',
            customRender: (text, row) => {
              //未生效;2:生效中;3:已失效;4:无变动
              if (text == 1) {
                return '未生效'
              } else if (text == 2) {
                return '生效中'
              } else if (text == 3) {
                return '已失效'
              } else if (text == 4) {
                return '无变动'
              } else {
                return "———"
              }
            }
          },
          {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            scopedSlots: {customRender: 'operation'}
          }
        ],

        isEnable: '',

        leadinRecordId: '',
        gradeName: '',
        isForever: '',
        defaultParams: {
          leadinRecordId: '',
          status: 0
        },

      }
    },
    // 这里根据 卡有没启用  决定列名字
    computed: {
      colName() {
        if (this.isEnable == 0){
          return '导入时间'
        }
        if (this.isEnable == 1){
          return '启用时间'
        }
      },

    },
    created() {
      console.log(this.$route.query)
      // this.leadinRecordId  = this.$route.query.id
      this.defaultParams.leadinRecordId = this.$route.query.id
      this.gradeName = this.$route.query.gradeName
      this.isForever = this.$route.query.isForever
      this.isEnable = this.$route.query.isEnable
      // console.log('isEnable', this.isEnable)

    },
    mounted() {

    },
    methods: {

      edit(record) {
        console.log(record)
        this.currentRecord = record
        this.infoVisible = true
        console.log(this.infoVisible, this.currentRecord)
      },

      deletes(ids) {
        console.log(ids)
        if (!(ids && ids.length)) return this.$message.warn('请先选择一项后再进行操作')
        this.$confirm({
          title: '删除提示',
          content: '删除操作不可恢复，请确认是否删除？',
          okText: '确认删除',
          cancelText: '取消',
          onOk: () => {
            this.$post('goldenhome/member/admin_/leadin/detail/delete', {idList: ids}).then(res => {
              if (res && res.returnCode == 1000) {
                this.$message.success('删除成功')
                this.$refs.searchtable.refreshTable()
              }
            })
          }
        })
      },
      invalid(ids) {
        console.log(ids)
        if (!(ids && ids.length)) return this.$message.warn('请先选择一项后再进行操作')
        this.invalidRecord = ids
        this.inValidVisible = true
     /*    this.$confirm({
           title: '失效提示',
           content: '失效提示操作不可恢复，请确认是否失效提示？',
           okText: '确认失效提示',
           cancelText: '取消',
           onOk: ()=> {
             this.$post('', {idList:ids}).then(res => {
               if (res && res.returnCode == 1000) {
                 this.$message.success('删除成功')
                 this.$refs.searchtable.refreshTable()
               }
             })
           }
         })*/

      },
      closeInfoModal(freshTable) {
        // 关闭修改的模态框
        this.infoVisible = false
        if (freshTable) {
          this.$refs.searchtable.refreshTable()
        }
      },
      closeinValidModal(freshTable) {
        // 关闭修改的模态框
        this.inValidVisible = false
        if (freshTable) {
          this.$refs.searchtable.refreshTable()
        }
      },
      back() {
        this.$router.push({
          name: 'CustomerImportClientsImportClientsList',
          query: {
            current: this.$route.query.current
          }
        })
      }

    },
  }
</script>
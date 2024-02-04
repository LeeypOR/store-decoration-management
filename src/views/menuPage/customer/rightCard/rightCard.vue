<template>
  <div>
    <div>
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="权益卡管理">

          <search-table :url="url"
                        ref="searchtable"
                        :hideSelect="true"
                        :columns="columns"
                        :form="form"
                        style="margin-top:20px;"
                        :status='status'
                        :pagination="pagination">

            <template slot="searchForm">
              <a-form layout="inline"
                      :form="form">
                <a-form-item label="权益卡名称">
                  <a-input v-decorator="['cardName']"
                           placeholder="请输入权益卡名称">
                  </a-input>
                </a-form-item>

                <a-form-item>
                  <a-button type="primary" class="searchBtn" @click="searchData">搜索</a-button>
                </a-form-item>

                <a-form-item>
                  <a-button type="primary" class="searchBtn" @click="resertSearchData">重置</a-button>
                </a-form-item>

                <a-form-item label="">
                  <a-button @click="addRightCard" type="primary">新增权益卡</a-button>
                </a-form-item>

              </a-form>
            </template>


            <template slot="tableOperation" slot-scope="{ record }">
             <!-- <permission authority="">
                <span class="text-primary pointer" @click="openInfo(record,'dataVisible')">数据</span>
              </permission>
              <a-divider type="vertical"></a-divider>-->
              <permission v-if="record.collectionMethod!=2" authority="">
               <span class="text-primary pointer" @click="openInfo(record,'exchangeCodeVisible')">兑换码</span>
              </permission>
              <a-divider v-if="record.collectionMethod!=2" type="vertical"></a-divider>
              <permission authority="">
                <span v-if="status ==1" class="text-primary pointer" @click="openInfo(record,'sendCardVisible')">发卡</span>
              </permission>
              <a-divider v-if="status ==1" type="vertical"></a-divider>
              <permission authority="">
                <span class="text-primary pointer" @click="editCardInfo(record)">编辑</span>
              </permission>
              <a-divider type="vertical"></a-divider>

              <permission authority="">
                <span class="text-primary pointer" @click="editRightcardSwitch(record,'启用该权益卡')" v-if="record.isEnabled ===0">去启用</span>
                <span class="text-primary pointer" @click="editRightcardSwitch(record,'关闭该权益卡')" v-else>已启用</span>
              </permission>

            </template>

            <template slot="oprationRow">
              <permission authority="">
                <!-- 顶部筛选条件 -->
                <div>
                  <a-radio-group v-model="status"
                                 size="large" @change="change">
                    <a-radio-button value="1">
                      使用中
                    </a-radio-button>
                    <a-radio-button value="2">
                      已禁用
                    </a-radio-button>
                    <a-radio-button value="3">
                      已过期
                    </a-radio-button>

                  </a-radio-group>
                </div>
              </permission>
              <!--  <permission authority="">
                  <a-button style="" @click="deleteRows($refs.searchtable.selectedRowKeys)">删除</a-button>
                </permission>-->
            </template>
          </search-table>

<!--          <DataModel  :record="currentRecord" @cancel="closeInfoModal" :visible="dataVisible" />-->
          <ExchangeCodeModel  :record="currentRecord" @cancel="closeInfoModal" :visible="exchangeCodeVisible" />
          <sendCardModel   :record="currentRecord" @cancel="closeInfoModal" :visible="sendCardVisible" />
        </a-tab-pane>


        <a-tab-pane key="2" tab="领卡记录" force-render>
          <search-table :url="url2"
                        ref="searchtable2"
                        :hideSelect="true"
                        :columns="columns2"
                        :form="form2"
                        style="margin-top:20px;">

            <template slot="searchForm">
              <a-form layout="inline"
                      :form="form2">
                <a-form-item label="权益卡名称">
                  <a-input v-decorator="['cardName']"
                           placeholder="请输入权益卡名称">
                  </a-input>
                </a-form-item>
                <a-form-item>
                  <a-button type="primary" class="searchBtn" @click="searchData2">搜索</a-button>
                </a-form-item>
              </a-form>
            </template>
          </search-table>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
  import SearchTable from './components/SearchTable'
  import DataModel from "./components/DataModel";
  import SendCardModel from "./components/SendCardModel";
  import ExchangeCodeModel from "./components/ExchangeCodeModel";
  export default {
    name: "rightCard",
    components: {
      SearchTable,
      SendCardModel,
      DataModel,
      ExchangeCodeModel
    },
    created() {
      if (this.$route.query.current){
        console.log(this.$route.query.current)
        this.pagination.current = this.$route.query.current
      }else {
        this.pagination.current =  1
      }
    },
    data() {
      return {
        pagination: {
        showQuickJumper: true,
              total: 0,
              current: null,
              pageSize: 10,
              showTotal: (total) => `共${ total }条`,
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '50', '100', '200']
      },
        //类型数据
        status: "1",
        dataVisible: false,
        sendCardVisible: false,
        exchangeCodeVisible:false,
        currentRecord: {},
        url: 'goldenhome/member/admin_/benefits/card/page',
        // url:'',
        form: this.$form.createForm(this, {name: 'table_search'}),
        columns: [
          {
            title: '权益卡名称',
            dataIndex: 'cardName',
            key: 'cardName',
            align: 'center',
          },

          {
            title: '适用对象',
            dataIndex: 'receiver',
            key: 'receiver'
          },
          {
            title: '有效期',
            dataIndex: 'refundPrice',
            key: 'refundPrice',
            align: 'center',
            customRender: (text, row) => {
              if (row.validPeriodType==1){
                return '永久有效'
              }
              if (row.validPeriodType==2){
                return row.validPeriodDuration + "天"
              }
              if (row.validPeriodType==3){
                return ""+row.validPeriodStartDate +" - "+ row.validPeriodEndDate
              }
            }

          },
          {
            title: '权益',
            dataIndex: 'userName',
            key: 'userName',
            customRender: (text, row) => {
              let res = []
              if (row.consumptionDiscount!=null&& row.consumptionDiscount!=0 ){
                  res.push('折扣商品')
              }
              if (row.integralRatio!=null && row.integralRatio!=0){
                  res.push('积分倍率')
              }
              if (row.isSupportMemberPrice==1){
                  res.push('会员价')
              }
              if (row.couponBenefits==1){
                  res.push('赠优惠券')
              }
              if (row.giveAwayGoods==1){
                  res.push('赠商品')
              }
              return res.join('，')
            }
          },
          {
            title: '卡片数量',
            dataIndex: 'storage',
            key: 'storage',
            customRender: (text, row) => {
              if (row.storage==null) {
                return "不限数量"
              }else {
                return text
              }
            }
          },  {
            title: '领取数量',
            dataIndex: 'receiveCount',
            key: 'receiveCount'
          },
          {
            title: '操作',
            dataIndex: 'operation',
            scopedSlots: {customRender: 'operation'}
          }
        ],

        url2: 'goldenhome/member/admin_/benefits/cardcustomer/page',
        // url:'',
        form2: this.$form.createForm(this, {name: 'table_search2'}),
        columns2: [
          {
            title: '领卡人',
            dataIndex: 'nickName',
            key: 'nickName'
          },


          {
            title: '卡号',
            dataIndex: 'cardId',
            key: 'cardId'
          },
          {
            title: '权益卡/类型',
            dataIndex: 'cardName',
            key: 'cardName',
            align: 'center',
            customRender: (text, row) => {
              if (row.cardType==1){
                return <div><div>{text}</div><div>无门槛卡</div></div>
              }
              if (row.cardType==2){
                return <div><div>{text}</div><div>付费卡</div></div>
              }
              if (row.cardType==3){
                return <div><div>{text}</div><div>兑换卡</div></div>
              }
            }
          },


          {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            customRender: (text, row) => {
              if (row.status==1){
                return '使用中'
              }
              if (row.status==2){
                return '待使用'
              }
              if (row.status==3){
                return "已过期"
              }
            }
          },
          {
            title: '领取时间',
            dataIndex: 'receiveDate',
            key: 'receiveDate',
            align: 'center',
          },
        ]
      }
    },
    methods: {
      openInfo (record, key) {
        console.log(record, key)
        this.currentRecord = record
        this[key] = true
      },
      editCardInfo(record){
        console.log(record.id)
        this.$router.push({
          name: 'CustomerRightCardRightCardEdit',
          query: {
            id: record.id,
            current:this.pagination.current
          }
        })
      },

      closeInfoModal (freshTable) {
        this.dataVisible = false
        this.sendCardVisible = false
        this.exchangeCodeVisible = false
        if (freshTable) {
          this.$refs.searchtable.refreshTable()
        }
      },

      callback(key) {
        console.log(key)
        if(key == '1'){
          this.$refs.searchtable.handleSearch()
        } else if(key == '2'){
          this.$refs.searchtable2.handleSearch()
        }
        // console.log(this.$refs.searchtable.pagination)
      },
      searchData(){
        this.$refs.searchtable.handleSearch()
      },
      resertSearchData(){
        this.form.resetFields()
        this.searchData()
        console.log("重置搜索条件")

     /*   this.form.setFieldsValue({
          cardName:'',
          status: "1"
        })*/
      },
      searchData2(){
        this.$refs.searchtable2.handleSearch()
      },
      change() {
        //类型改变你的时候重新请求接口
        this.$refs.searchtable.handleSearch()
      },
      addRightCard() {
        // 跳到权益卡页面
        console.log('添加权益卡')
        this.$router.push({name: 'CustomerRightCardRightCardAdd'})
      },

      editRightcardSwitch(record,content) {
        console.log("record", record)
        let isEnabled = record.isEnabled===1?0:1

          this.$confirm({
            title: '显示提示',
            content: `确认${content}吗?`,
            okText: '确认',
            cancelText: '取消',
            onOk: ()=> {
              this.$post('goldenhome/member/admin_/benefits/card/enable',{id: record.id,isEnabled}).then(res => {
                if (res && res.returnCode == 1000) {
                  if (res && res.returnCode === 1000) {
                    this.$message.success('操作成功!')
                    this.$refs.searchtable.refreshTable()
                  }
                }
              })
            }
          })
        }

      },
    }

</script>

<style scoped>

</style>
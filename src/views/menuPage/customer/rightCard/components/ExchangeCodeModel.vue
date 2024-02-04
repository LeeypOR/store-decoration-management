<template>
  <a-modal
    :visible="visible"
    okText="提交"
    :footer="false"
    cancelText="关闭"
    :title="title"
    :maskClosable="false"
    :destroyOnClose="true"
    :keyboard="false"
    width="1000px"
    @cancel="closeModal()">
    <div>

      <a-row>
        <a-col>
          <a-form layout="inline" :form="topForm">
            <a-form-item label="卡券码兑换权益卡">
              <a-input-number
                v-model="topForm.amount"
                :placeholder="maxNum ? '最多'+maxNum+'个' : '请输入生成数量'"
                :min="0"
                :max="maxNum ? maxNum : 999999"
                style="width: 180px;">
              </a-input-number>
            </a-form-item>
            <a-form-item label="">
              <a-button @click="produce" :loading="amountLoading" type="primary">生成</a-button>
            </a-form-item>
          </a-form>
        </a-col>
      </a-row>
      <search-table
        :url="url"
        ref="searchtable"
        :columns="columns"
        :form="form"
        :defaultParams="defaultParams"
        style="margin-top:20px;"
        >

        <template slot="searchForm">
          <a-form layout="inline"
                  :form="form">
            <a-form-item label="兑换码">
              <a-input v-decorator="['redemptionCode']"
                              placeholder="兑换码">
              </a-input>
              <a-input type="hidden" v-decorator="['cardId']" >
              </a-input>
            </a-form-item>

            <a-form-item label="兑换状态">
              <a-select style="width: 180px"
                        v-decorator="[
                            'status']"  
                        :options="exchangeStatus"></a-select>
            </a-form-item>


            <br>
            <a-form-item label="兑换时间">
              <fast-range-picker
                v-decorator="[
                'exchangeStartTime-exchangeEndTime',
              ]"
              >
              </fast-range-picker>
            </a-form-item>


            <a-form-item label="生成时间">
              <fast-range-picker
                v-decorator="[
                'createStartTime-createEndTime',
              ]"
              >
              </fast-range-picker>
            </a-form-item>
            <br>
            <br>
            <a-form-item>
              <a-button type="primary" class="searchBtn" @click="searchData">搜索</a-button>
            </a-form-item>

            <a-form-item>
              <a-button type="primary" class="searchBtn" @click="resertSearchData">重置</a-button>
            </a-form-item>

            <!-- <a-form-item label="">
              <a-button @click="deleteRows($refs.searchtable.selectedRowKeys)" type="primary">批量删除</a-button>
            </a-form-item> -->

            <a-form-item label="">
              <a-button @click="exportss" type="primary">导出</a-button>
            </a-form-item>

          </a-form>
        </template>


        <template slot="tableOperation" slot-scope="{ record }">
           <permission v-if="record.status" authority="">
             <span class="text-primary pointer" @click="deleteRows([record.id])">删除</span>
           </permission>

        </template>
      </search-table>
    </div>
  </a-modal>
</template>
<script>
  import moment from "moment";
  import SearchTable from "./SearchTable";
  export default {
    name: 'dataModel',
    props: {
      record: {
        type: Object,
        default() {
          return {}
        }
      },
      visible: {
        type: Boolean,
        default: false
      },
    },
    computed: {
      title() {
        return '生成兑换码'
      },

    },
    components:{
      SearchTable
    },
    data() {
      return {
        url: 'goldenhome/member/admin_/benefits/cardredemptioncode/page',
        topForm: {
          cardId: '',
          amount: undefined
        },
        amountLoading: false,
        form: this.$form.createForm(this, {name: 'table_search'}),
        columns: [
          {
            title: '兑换码',
            dataIndex: 'redemptionCode',
            key: 'redemptionCode',
            align: 'center',
          },
          {
            title: '生成时间',
            dataIndex: 'createDate',
            key: 'createDate'
          },
          {
            title: '兑换状态',
            dataIndex: 'status',
            key: 'status',
            align: 'center'
          },
          {
            title: '兑换时间',
            dataIndex: 'updateDate',
            key: 'updateDate',
          },
          {
            title: '兑换用户',
            dataIndex: 'nickName',
            key: 'nickName'
          },
          {
            title: '操作',
            dataIndex: 'operation',
            scopedSlots: {customRender: 'operation'}
          }
        ],
        exchangeStatus:[
          {
            label:'全部',
            value:1
          },{
            label:'已兑换',
            value:2
          },{
            label:'未兑换',
            value:3
          },
        ],
        defaultParams: {
          cardId: this.record.id
        },
        maxNum: 0
      }
    },
    watch: {
      visible(value) {
        this.maxNum = 0
        if (value && this.record.id) {
          this.defaultParams.cardId = this.record.id
          this.topForm.cardId = this.record.id
          this.topForm.amount = undefined
          if(this.record.storage) {
            this.maxNum = Number(this.record.codeRemainingCount)
          }
        }
      }
    },
    created() {
      // this.accquireInitValue()
    },
    mounted() {},
    methods: {
      moment,
      searchData(){
        this.$refs.searchtable.handleSearch()
      },
      resertSearchData(){
        this.form.resetFields()
        this.searchData()
      },
      produce(){
        if(this.maxNum == 0 && this.record.storage) {
          this.$message.error('已达到最大生成数量')
          return false
        }
        if(!this.topForm.amount){
          this.$message.error('请输入生成数量')
        } else {
          this.amountLoading = true
          this.$post(
            '/benefits/cardredemptioncode/add',
            this.topForm,
            { baseURL: `${location.origin}/goldenhome/member/admin` }).then(res => {
            if (res && res.returnCode == 1000) {
              console.log(this.record.storage)
              if(this.record.storage) {
                this.maxNum = this.maxNum - this.topForm.amount
              }
              this.amountLoading = false
              this.topForm.amount = ''
              this.$message.success('生成成功')
              this.$refs.searchtable.refreshTable()
            } else {
              this.amountLoading = false
              this.$message.success('生成失败')
            }
          })
          .catch(err => {
            this.amountLoading = false
            this.$message.success('生成失败')
          })
        }
      },

      exportss(){
        const params = this.$refs.searchtable.searchParams || {}
        this.$export(
          '/goldenhome/member/admin_/benefits/cardredemptioncode/export',
          params)
      },

      deleteRows (ids) {
        let _this = this
        this.$confirm({
          title: '删除提示',
          content: '删除操作不可恢复，请确认是否删除？',
          okText: '确认删除',
          cancelText: '取消',
          onOk: ()=> {
            _this.$post(
              '/benefits/cardredemptioncode/delete',
              {
                cardId: this.record.id,
                idList: ids
              },
              { baseURL: `${location.origin}/goldenhome/member/admin` }).then(res => {
              if (res && res.returnCode == 1000) {
                this.maxNum = this.maxNum + 1
                _this.$message.success('删除成功')
                _this.$refs.searchtable.refreshTable()
              }
            })
          }
        })
      },
      closeModal(freshTable) {
        // this.form.resetFields()
        this.amountLoading = false
        this.$emit('cancel', true)
      },
    }
  }
</script>

<style scoped="scoped" lang="less">
  .middleSection{
    margin: 50px auto;
    width: 85%;
    height: 100px;
    background-color:	#F0F8FF;
    display: flex;
    /*justify-content: space-around;*/
    padding-top: 20px;
  }
  .bottomSection{
    margin: 50px auto;
    width: 85%;
    height: 100px;
    background-color:	#F0F8FF;
    display: flex;
    justify-content: space-around;
    padding-top: 20px;
  }
</style>
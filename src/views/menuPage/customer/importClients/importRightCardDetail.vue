<template>
  <div class="recycle-manage">
    <search-table :url="url"
                  ref="searchtable"
                  :form="form"
                  :hide-select="true"
                  :columns="columns"
                  :default-params="defaultParams">

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



          <a-form-item label="领取状态">
            <a-select
              style="width: 150px;"
              v-decorator="[
                'status',{initialValue:0 }
              ]"
              :options="statusList"
              >

            </a-select>
          </a-form-item>

        </a-form>
      </template>


      <template slot="oprationRow">
        <permission authority="">
          <a-button @click="back">返回</a-button>
        </permission>
      </template>
      <template slot="oprationRow">
        <permission authority="">

        </permission>
      </template>

      <!--权益卡名称-->
      <template slot="cardName" slot-scope="{record }">
          {{cardName}}
      </template>
      <!--标签名称-->
      <template slot="labelList" slot-scope="{record }">
        <span v-for="item in record.labelList" > {{item.labelName}} </span>
      </template>

      <template slot="tableOperation" slot-scope="{record}">

      </template>

    </search-table>
  </div>
</template>
<script>
  // import {setLastChildrenNull} from '@/utils'
  // 送权益卡  CardSearchTable
  import SearchTable from "./components/CardSearchTable";

  export default {
    name: 'importRightCardDetail',
    components:{
      SearchTable
    },
    data () {
      return {
        url: 'goldenhome/member/admin_/leadin/detail/page',
        infoVisible: false,
        currentRecord: {},
        form: this.$form.createForm(this, { name: 'table_search' }),
           statusList: [
             {label: '全部', value: 0},
             {label: '已领取', value: 1},
             {label: '未领取', value: 2},
           ],
        // 商品分类
        cateTree: [],
        columns:  [
          {
            title: '序号',
            dataIndex: 'xuhao',
            key:'xuhao'
          },
          {
            title: '客户手机号',
            dataIndex: 'phoneNumber',
            key:'phoneNumber'
          },
          {
            title: '客户姓名',
            dataIndex: 'customerName',
            key:'customerName'
          },
          {
            title: '员工账号',
            dataIndex: 'employeeNo',
            key:'employeeNo'
          },
          {
            title: '发放时间',
            dataIndex: 'createDate',
            key:'createDate'
          },
          {
            title: '客户标签',
            dataIndex: 'labelList',
            key:'labelList',
            scopedSlots: {customRender: 'labelList'}
          },
          // 带过来
          {
            title: '权益卡名称',
            dataIndex: 'cardName',
            key:'cardName',
            scopedSlots: {customRender: 'cardName'}
          },

          {
            title: '领取状态',
            dataIndex: 'status',
            key:'status',
            customRender: (text, row) => {
                return text==1?"已领取":"未领取"
            }
          },
        /*  {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            scopedSlots: {customRender: 'operation'}
          }*/
        ],

        leadinRecordId:'',
        cardName:'',
        defaultParams:{
          leadinRecordId:'',
          status:0
        }
      }
    },
    computed:{
    /*  url(){
        return `/leadin/detail/page/${this.leadinRecordId}`
      }*/
    },
    created() {
      console.log(this.$route.query)
      this.defaultParams.leadinRecordId = this.$route.query.id
      // this.leadinRecordId  = this.$route.query.id
      this.cardName  = this.$route.query.cardName
    },
    mounted () {

    },
    methods:{

      back(){
        this.$router.push({
          name: 'CustomerImportClientsImportClientsList',
          query: {
            current:this.$route.query.current
          }
        })
      }
    }
  }
</script>
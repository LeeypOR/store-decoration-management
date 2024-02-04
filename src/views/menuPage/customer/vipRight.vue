<template>
  <div>

    <search-table :url="url"
                  ref="searchtable"
                  :hideSelect="true"
                  :columns="columns"
                  :form="form"
                  style="margin-top:20px;"
                  :before-search-func="getVipList"
                  :pagination="pagination"
                  @changeStatus="changeStatus">

      <template slot="searchForm">
        <div style="font-weight: bold;">会员权益可以用于配置会员权益，帮助保持会员活跃，提高复购</div>
        <a-form layout="inline" :form="form"></a-form>
      </template>

      <template slot="oprationRow">
        <permission authority="">
          <a-button @click="addVipLevel">新增会员权益</a-button>
        </permission>
      </template>

   <!--   <template slot="vipbox2" slot-scope="{ record }">


      </template>-->

      <template slot="tableOperation"
                slot-scope="{ record }">

        <permission authority="">
          <span class="text-primary pointer"
                @click="edit(record)">修改</span>
        </permission>

        <permission authority="">
          <a-divider type="vertical" />
          <span class="text-primary pointer" @click="deletes(record)">删除</span>
        </permission>

        <!--   <permission authority="">
             <a-divider type="vertical" />
             <span class="text-primary pointer" @click="openInfo(record)">已启用</span>
           </permission>-->
      </template>

    </search-table>


  </div>
</template>
<script>
  import SearchTable from "./vipRight/SearchTable";
  export default {
    name: 'vipRight',
    components: {
      SearchTable
    },
    mounted() {
      // this.getVipList()
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
    computed: {
      title() {
        return '新增虚拟评价'
      },
      userInfo(){
        return this.$store.getters.userInfo || {};
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
        // 表格x轴滚动区域，y也可以设
        // xlength:1300,
        form: this.$form.createForm(this, { name: 'table_search' }),
        url:'goldenhome/member/admin_/member/benefits/page',
        tableLoading: false,
        // 1就是赚积分
        columns: [

          {
            title: '权益类型',
            dataIndex: 'benefitTypeName',
            key: 'benefitTypeName',
          },
          {
            title: '权益名称',
            dataIndex: 'generalName',
            key: 'generalName',
          },
          {
            title: '展示名称',
            dataIndex: 'benefitName',
            key: 'benefitName',
          },
          {
            title: '图标',
            dataIndex: 'benefitIcon',
            key: 'benefitIcon',
            customRender: (text, row) => {
              // console.log("text", text);
              return <table-img src={text}/>;
            },
          },


          {
            title: '权益说明',
            dataIndex: 'remark',
            key: 'remark',
            scopedSlots: { customRender: 'exp'}
            /*customRender: (text, row) => {
              console.log("text", text);
              return <div v-html={text}></div>
            }*/
          },
          {
            title: '创建时间',
            dataIndex: 'createDate',
            key: 'createDate',
          },
          {
            title: '最后修改时间',
            dataIndex: 'updateDate',
            key: 'updateDate',
          },
          {
            title: '是否启用',
            dataIndex: 'isEnable',
            key: 'isEnable',
            scopedSlots: { customRender: 'switch'}
          },
          {
            title: '可使用会员级别',
            dataIndex: 'vipbox',
            key: 'vipbox',
            scopedSlots: { customRender: 'vipbox'}
          },
          {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            scopedSlots: { customRender: 'operation'}
          }

        ],
        inputLength:0,
        vipList:[]
      }
    },
    watch: {

    },
    methods: {
      // 别删
      async getVipList() {},


      addVipLevel(){
        this.$router.push({ name: 'CustomerVipRightDetail' })
      },

      getInfo () {

      },
      // 携带看record 跳转详情页
      edit(record){
        console.log('当前行数据:',record)
        console.log(this.pagination)
        this.$router.push({
          name: 'CustomerVipRightDetail',
          query: {
            current:this.pagination.current,
            id: record.id,
            gradeList:record.usedGradeList

          }
        })
      },
      // 删除
      deletes(record){
        this.$confirm({
          title: '删除提示',
          content: '删除操作不可恢复，请确认是否删除？',
          okText: '确认删除',
          cancelText: '取消',
          onOk: () => {
            this.$post('goldenhome/member/admin_/member/benefits/delete',{idList:[record.id]})
              .then(res => {
                if (res && res.returnCode === 1000) {
                  this.$message.success('操作成功!')
                  this.$refs.searchtable.refreshTable()
                }
              })
          }
        })

      },
      // 改启用状态
      changeStatus(record) {
        // 单个是否启用
        console.log("record", record)
        let isEnable = record.switch===true?1:0
        this.$post('goldenhome/member/admin_/member/benefits/enable',
          {id:record.id,isEnable})
          .then(res => {
            if (res && res.returnCode === 1000) {
              this.$message.success('操作成功!')
              this.$refs.searchtable.refreshTable()
            }
          })
      },
    },


  }
</script>
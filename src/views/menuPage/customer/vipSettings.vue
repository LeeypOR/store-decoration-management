<template>
  <div>
    <a-tabs :default-active-key="tabKey" @change="callback">
      <a-tab-pane key="1" tab="普通会员">
        <SearchTableClosePagination :url="url"
                                    ref="searchtable"
                                    :hideSelect="true"
                                    :columns="columns"
                                    :form="form"
                                    style="margin-top:20px;"
                                    @dataSourceChange="accquireVipName">

          <template slot="searchForm">
            <div class="eleInfo">&nbsp;基本信息</div> 
            <a-form layout="inline"
                    :form="form">
              <a-form-item label="会员卡名称">
                <a-input v-model="vipName"
                         placeholder="请输入会员卡名称"
                         :maxLength="9"
                         style="width: 300px"
                >
                  <a-tooltip slot="suffix" title="最多输入9个字">
                    <span>{{9-vipName.length}}/9</span>
                    <a-icon type="info-circle" style="color: rgba(0,0,0,.45)"/>
                  </a-tooltip>
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-button
                  type="primary"
                  class="searchBtn"
                  @click="modifyVipName"
                  :loading="tableLoading"
                >确定
                </a-button>

              </a-form-item>

            </a-form>
          </template>

          <template slot="oprationRow">
            <permission authority="">
              <div style="display:flex;justify-content: space-between">
                <div class="settingVipLevel">&nbsp;设置会员等级</div>
                <a-button @click="addVipLevel" type="primary">添加等级</a-button>
              </div>
            </permission>
          </template>

          <template slot="tableOperation"
                    slot-scope="{ record }">

            <permission authority="">
              <span class="text-primary pointer" @click="openInfo(record)">编辑</span>
            </permission>

            <permission authority="">
              <a-divider type="vertical"/>
              <span class="text-primary pointer" @click="editVipInfo(record)" v-if="record.enable ===0">去启用</span>
              <span class="text-primary pointer" @click="editVipInfo(record)" v-else>已启用</span>
            </permission>

          </template>

        </SearchTableClosePagination>
      </a-tab-pane>

      <a-tab-pane key="2" tab="付费会员">

        <a-tabs type="card" :default-active-key="subtabKey" @change="callback">

          <a-tab-pane key="1" tab="付费会员卡列表">
            <search-table2 :url="url2"
                           ref="paysearchtable"
                           :columns="VipPayColumns"
                           :hide-select="true"
                           :form="form2"
                           style="margin-top:20px;"
                           :pagination="pagination"
                           @addVipPayLevel="addVipPayLevel">
              <template slot="searchForm">
                <a-form layout="inline" :form="form2">

                  <a-form-item label="付费会员卡名称">
                    <a-input v-decorator="['cardName']" placeholder="付费会员卡名称">
                    </a-input>
                  </a-form-item>

                  <a-form-item label="领取方式">
                    <a-select
                      showSearch
                      allowClear
                      style="width: 150px"
                      :options="lingquWaysList"
                      v-decorator="['receiveWay']"
                      placeholder="领取方式"
                    >
                    </a-select>
                  </a-form-item>

                  <a-form-item label="状态">
                    <a-select
                      showSearch
                      allowClear
                      style="width: 150px"
                      :options="lingqustatusList"
                      v-decorator="['isEnabled']"
                      placeholder="状态"
                    >
                    </a-select>
                  </a-form-item>
                  <!-- <a-form-item>
                       <a-button type="primary" @click="addVipPayLevel"> + 新增付费会员卡</a-button>
                   </a-form-item>-->
                </a-form>
              </template>

              <template slot="tableOperation" slot-scope="{ record }">

                <permission authority="">
                  <span class="text-primary pointer" @click="editCard(record)">编辑</span>
                </permission>

                <permission authority="">
                  <a-divider type="vertical"/>
                  <!--可能还要传一个领取方式-->
                  <span class="text-primary pointer" @click="editVipPayInfo(record)"
                        v-if="record.isEnabled ===0">去启用</span>
                  <span class="text-danger pointer" @click="editVipPayInfo(record)" v-else>已启用</span>
                </permission>

              </template>

            </search-table2>
          </a-tab-pane>

          <a-tab-pane key="2" tab="付费会员卡购买记录">
            <search-table2 :url="url3"
                           ref="payrecordsearchtable"
                           :columns="VipPayRecordColumns"
                            hide-select
                           :form="form3"
                           style="margin-top:20px;"
                           :pagination="pagination"
                           @addVipPayLevel="addVipPayLevel">
              <template slot="searchForm">
                <a-form layout="inline" :form="form3">
                  <a-form-item label="付费会员卡名称">
                     <a-input
                             v-decorator="['cardName']"
                             placeholder="付费会员卡名称">
                  </a-input>
              </a-form-item>

              <a-form-item label="领取方式">
                <a-select
                  showSearch
                  allowClear
                  style="width: 150px"
                  :options="lingquWaysList"
                  v-decorator="['receiveWay']"
                  placeholder="领取方式"
                >
                </a-select>
              </a-form-item>

              <a-form-item label="状态">
                <a-select
                  showSearch
                  allowClear
                  style="width: 150px"
                  :options="cardstatusList"
                  v-decorator="['state']"
                  placeholder="状态"
                >
                </a-select>
              </a-form-item>

              <a-form-item label="客户名称">
                <a-input v-decorator="['nickName']" placeholder="客户名称">
                </a-input>
              </a-form-item>

              <a-form-item label="客户手机号">
                <a-input v-decorator="['phoneNumber']" placeholder="客户手机号">
                </a-input>
              </a-form-item>
            </a-form>
          </template>

              <template slot="tableOperation" slot-scope="{ record }">

                <permission authority="">
                  <!--<span class="text-primary pointer" @click="editCard(record)">编辑</span>-->
                </permission>

                <permission authority="">
                      <!--这里要结合领取方式和 状态两项 写，暂放-->
                 <div v-if="record.receiveWay==2 && (record.state==1 ||record.state ==2)">
                   <span class="text-danger pointer" @click="invalid(record)">失效</span>
                 </div>

                  <div v-if="record.receiveWay==2 &&record.state ==3">
                    <div v-if="!record.remark"> 已失效:系统失效</div>
                      <!--待续-->
                    <div  v-if="!!record.remark">
                        <div>失效原因:{{record.remark}}</div>
                        <div>操作人:{{record.operator}}</div>
                        <div>{{record.operatorPhone }}</div>
                    </div>
                  </div>
                </permission>

              </template>

            </search-table2>
          </a-tab-pane>
        </a-tabs>

      </a-tab-pane>
    </a-tabs>

    <inValidModel :record="invalidRecord"  @cancel="closeinValidModal" :visible="inValidVisible"></inValidModel>
  </div>
</template>
<script>
  // 这里导进来的是没有分页器 的SearchTable
  import SearchTableClosePagination from "./components/SearchTable/SearchTableClosePagination";

  import SearchTable2 from "./components/SearchTable";
  import inValidModel from "./importClients/components/inValidModel";
  export default {
    name: 'vipSettings',
    components: {
      SearchTableClosePagination,
      SearchTable2,
      inValidModel
    },


    created() {
      console.log(this.$route.query)
      if (this.$route.query.key == "2") {
        this.tabKey = this.$route.query.key
      }

      if (this.$route.query.current) {
        console.log(this.$route.query.current)
        this.pagination.current = this.$route.query.current
      } else {
        this.pagination.current = 1

      }

    },
    computed: {},
    data() {
      return {

        pagination: {
          showQuickJumper: true,
          total: 0,
          current: null,
          pageSize: 10,
          showTotal: (total) => `共${total}条`,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50', '100', '200']
        },
        /*========================普通会员板块===============================*/
        tabKey: "1",
        subtabKey: '1',
        vipName: '',
        form: this.$form.createForm(this, {name: 'table_search'}),
        url: 'goldenhome/member/admin_/member/gradeconfig/list',
        // url:'',
        tableLoading: false,
        columns: [
          {
            title: '会员等级',
            dataIndex: 'gradeName',
            key: 'gradeName',
          },

          {
            title: '升级规则',
            dataIndex: 'upgradeRule',
            key: 'upgradeRule',
            customRender: (text, record) => {
              return <div style='width:180px;font-size:13px;'>
                <div>{text}</div>
              </div>
            }
          },
          {
            title: '降级规则',
            dataIndex: 'reduceRule',
            key: 'reduceRule',
            customRender: (text, record) => {
              return <div
                style='width:120px;font-size:13px;height:78px;overflow:hidden;display: -webkit-box;-webkit-line-clamp: 4;-webkit-box-orient: vertical;'>
                <a-tooltip>
                  {text}
                  <template slot="title">
                    {text}
                  </template>
                </a-tooltip>
              </div>
            }
          },

          {
            title: '等级权益',
            dataIndex: 'benefits',
            key: 'benefits',
            customRender: (text, record) => {
              return <div style='width:120px;font-size:13px;'>{text}</div>
            }
          },

          {
            title: '卡片',
            dataIndex: 'backgroundPicture',
            key: 'backgroundPicture',
            /*  customRender: (text, record) => {
                 return <table-img  src={record.backgroundPicture}/>
             }*/
            scopedSlots: {customRender: 'card'}
          },
          {
            title: '图标',
            dataIndex: 'gradePicture',
            key: 'gradePicture',
            customRender: (text, record) => {
              return <table-img src={record.gradePicture}/>
            }
          },
          {
            title: '会员数',
            dataIndex: 'memberCount',
            key: 'memberCount',
          },
          {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            scopedSlots: {customRender: 'operation'}
          }
        ],
        /*==================== 付费会员板块===================================*/
        // tab1 付费会员卡列表
        form2: this.$form.createForm(this, {name: 'table_search'}),
        // url2: 'goldenhome/member/admin_/member/card/page',
        url2: 'goldenhome/member/admin_/member/card/page',
        VipPayColumns: [
          {
            title: '付费会员名称',
            dataIndex: 'cardName',
            key: 'cardName',
          },
          {
            title: '领取方式',
            dataIndex: 'receiveWay',
            key: 'receiveWay',
            customRender: (text, row) => {
              return text == 1? "付费购买":"发放领取"
            }
          },
          {
            title: '领取规则',
            dataIndex: 'payRuleResponseList',
            key: 'payRuleResponseList',
            customRender: (text, row) => {
              var result = ''
              if (row.payRuleResponseList != null) {
                result = row.payRuleResponseList.reduce((pre, cur) => {
                  switch (cur.validPeriodUnit) {
                    case 1:
                      return pre += "" + cur.validPeriodUnit + "年" + "￥:" + cur.price + "元 ;"
                    case 2:
                      return pre += "1季度(3个月)" + "￥:" + cur.price + "元 ;"
                    case 3:
                      return pre += "1个月" + "￥:" + cur.price + "元 ;"

                  }
                }, "")

              }
              return result
            }
          },
          {
            title: '会员权益',
            dataIndex: 'right',
            key: 'right',
            scopedSlots: {customRender: 'right'}
          },
          {
            title: '创建时间',
            dataIndex: "createDate",
            key: "createDate"
          },
          {
            title: '最后编辑时间',
            dataIndex: "updateDate",
            key: "updateDate"
          },
          {
            title: '会员数',
            dataIndex: 'memberCount',
            key: 'memberCount',
          },
          /*  {
                title: '状态',
                dataIndex: 'isEnabled',
                key: 'isEnabled',
            },*/
          {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            scopedSlots: {customRender: 'operation'}
          }
        ],

        lingquWaysList: [
          {label: '全部', value: ""},
          {label: '付费购买', value: '1'},
          {label: '发放领取', value: "2"}
        ],
        lingqustatusList: [
          {label: '全部', value: ""},
          {label: '已启用', value: '1'},
          {label: '未启用', value: "0"}
          ],

        // tab2 付费会员卡购买记录
        form3: this.$form.createForm(this, {name: 'table_search'}),
        //  /admin/card/buy/record/page
        url3: 'goldenhome/member/admin_/card/buy/record/page',
        VipPayRecordColumns: [
          {
            title: '客户名称',
            dataIndex: 'nickName',
            key: 'nickName',
          },
          {
            title: '客户手机号',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
          },
          {
            title: '付费会员名称',
            dataIndex: 'cardName',
            key: 'cardName',
          },
          {
            title: '领取方式',
            dataIndex: 'receiveWay',
            key: 'receiveWay',
            customRender: (text, row) => {
              return text == 1? "付费购买":"发放领取"
            }
          },
          {
            title: '有效期',
            dataIndex: 'youxiaoqi',
            key: 'youxiaoqi',
            customRender:(text,row)=>{
              return row.validStartDate+"至"+row.validEndDate
            }
          },
          {
            title: '购买时间',
            dataIndex: 'payDate',
            key: 'payDate',
          },
          // 。。。 购买方式 未知 待续
          {
            title: '购买方式',
            dataIndex: 'buyWay',
            key: 'buyWay',
            customRender:(text,row)=>{
              //领取方式(1:付费购买 2:发放领取)
              if (row.receiveWay==1){
                return `支付：${text} 元`
              }
              if (row.receiveWay==2){
                const obj  = {
                  children:(
                    <div>
                      <div>免费体验:</div>
                      <div>购买{text} 赠送</div>
                    </div>
                  ),
                  attrs:{}
                }
                return obj
              }
            }
          },
          {
            title: '状态',
            dataIndex: 'state',
            key: 'state',
            customRender:(text,row)=>{
            //
              switch (text) {
                case 1:
                  return "待生效"
                case 2:
                  return "生效中"
                case 3:
                  return "已失效"
                  default:return text
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
        invalidRecord:null,
        inValidVisible:false,

        cardstatusList: [
          {label: '待生效', value: "1"},
          {label: '生效中', value: '2'},
          {label: '已失效', value: "3"}
        ],
      }
    },
    watch: {},
    mounted() {
      // console.log(this.$refs.searchtable.dataSource)
      // this.vipName = this.$refs.searchtable.dataSource[0].memberCardName
    },
    methods: {
      callback(key) {
        console.log(key);
      },
      accquireVipName(val) {
        this.vipName = val[0].memberCardName
      },
      modifyVipName() {
        const name = this.vipName
        console.log(name)
        this.$confirm({
          title: '操作提示',
          content: '确定修改会员名称吗？',
          okText: '确认',
          cancelText: '取消',
          onOk: () => {
            this.$post('goldenhome/member/admin_/member/gradeconfig/addcardname', name).then(res => {
              if (res && res.returnCode == 1000) {
                this.$message.success('修改成功')
                this.getVipName()
                this.$refs.searchtable.refreshTable()
              }
            })
          }
        })

      },
      // 单个是否启用
      editVipInfo(record) {
        console.log("record", record)
        let enable = record.enable === 1 ? 0 : 1
        this.$post('goldenhome/member/admin_/member/gradeconfig/enable',
          {id: record.id, enable})
          .then(res => {
            if (res && res.returnCode === 1000) {
              this.$message.success('操作成功!')
              this.$refs.searchtable.refreshTable()
            }
          })
      },

      // 添加会员等级
      addVipLevel() {
        this.$router.push({name: 'CustomerVipSettingsAdd'})
      },
      // 进详情页 编辑会员等级
      openInfo(record) {
        console.log('编辑会员详情', record)
        this.$router.push({
          name: 'CustomerVipSettingsDetail',
          query: {
            id: record.id,

          }
        })
      },

      /*=====================付费会员部分========================*/
      // 跳至添加付费会员等级
      addVipPayLevel() {
        this.$router.push({name: 'CustomerVipSettingsPayAdd'})
      },
      //跳至编辑付费会员
      editCard(record) {
        this.$router.push({
          name: 'CustomerVipSettingsPayEdit',
          query: {
            id: record.id,
            current: this.pagination.current
          }
        })
      },
      // 付费会员卡的关闭与开启
      editVipPayInfo(record) {
        // 可能还要传一个领取方式
        console.log("record", record)
        let isEnabled = record.isEnabled === 1 ? 0 : 1
        this.$post('goldenhome/member/admin_/member/card/enable',
          {id: record.id, isEnabled}).then(res => {
            if (res && res.returnCode === 1000) {
              this.$message.success('操作成功!')
              this.$refs.paysearchtable.refreshTable()
            }
          })
      },
      // 使 失效
      invalid(record){
        console.log(record)
        // if (!(ids && ids.length)) return this.$message.warn('请先选择一项后再进行操作')
        this.invalidRecord = record
        this.inValidVisible = true

      },
      closeinValidModal(freshTable){
        // 关闭修改的模态框
        this.inValidVisible = false
        if (freshTable) {
          this.$refs.payrecordsearchtable.refreshTable()
        }
      },
    },


  }
</script>

<style lang="less" scoped>
  .eleInfo {
    font-size: 20px;
    font-weight: bold;
  }

  .eleInfo::before, .settingVipLevel:before {
    content: '';
    display: inline-block;
    width: 5px;
    height: 20px;
    transform: scaleX(-1) scaleY(-1);
    background-image: linear-gradient(135deg, #0B59F9 0%, #48DCFF 100%);
    border-radius: 5px;
    position: relative;
    left: 0;
    top: 3px;
  }

  .settingVipLevel {
    font-size: 20px;
    font-weight: bold;
  }
</style>
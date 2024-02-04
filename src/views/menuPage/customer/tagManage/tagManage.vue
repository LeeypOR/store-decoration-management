<template>
  <div class="tagManege">
    <h3>全部标签</h3>
    <div>
      <a-tabs v-model="tabKey" @change="callback">
        <a-tab-pane :key="1" tab="条件标签">
          <div class="addTagBtn" @click="addTag">新增标签</div>
          <div style="margin-top: 20px">
            <span class="systemTag">系统标签</span
            ><span class="systemTagAttention">标签每天0点更新</span>
          </div>
          <!--系统标签-->
          <div class="systemTagList" >

            <div class="systemTagItem" v-for="(item,index) in systemTag" :key="index">
              <h3 class="systemItemHead" v-if="item.isEnabled">{{item.labelName}}<span>(已开启)</span></h3>
              <h3 class="systemItemHead" v-else>{{item.labelName}}<span>(未开启)</span></h3>
              <div class="payStatus">{{item.remark}}</div>
              <div class="peopelNum">人数：{{item.count}}</div>
              <div class="updateTime">创建时间：{{item.createDate}}</div>
              <div class="updateTime">更新时间：{{item.updateDate}}</div>
              <div class="delBtn">
                <span style="margin-right: 10px" @click="updateSys(item)">更新</span>
                <span v-if="item.isEnabled" @click="closeSys(item)">关闭</span>
                <span v-else @click="openSys(item)">开启</span>
              </div>
            </div>

          </div>

          <div style="margin-top: 50px">
            <span class="customTag">自定义条件标签</span>
            <span class="customTagAttention">最多添加20个</span>
          </div>

          <!--条件标签-->
          <div class="customTagList">
            <div class="customTagItem" v-for="(item) in tiaojianTag" :key="item.id">
              <h3 class="customItemHead">{{item.labelName}}</h3>
              <div class="peopelNum">人数：{{item.count}}</div>
              <div class="createTime">创建时间：{{item.createDate}}</div>
              <div class="updateTime">更新时间：{{item.updateDate}}</div>
              <div class="delBtn">
                <span style="margin-right: 10px" @click="editTJTag(item)">编辑</span>
                <span @click="DeleteTJTag(item)">删除</span>
              </div>
            </div>
          </div>

        </a-tab-pane>

        <a-tab-pane :key="2" tab="手动标签" force-render>
          <div class="addTagBtn" @click="addTag">新增标签</div>
          <div style="margin-top: 20px">
            <span class="handTag">手动标签</span>
          </div>

          <div class="handTagList">
            <div class="handTagItem" v-for="(item) in handTag" :key="item.id">
              <h3 class="handItemHead">{{item.labelName}}</h3>
              <div class="peopelNum">人数：{{item.count}}</div>
              <div class="createTime">创建时间：{{item.createDate}}</div>
              <div class="delBtn">
                <span style="margin-right: 10px" @click="edithandTag(item)">编辑</span>
                <span @click="deletehandTag(item)">删除</span>
              </div>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>

    <!--添加-->
    <a-modal
      title="新增标签"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      :maskClosable="false"
      :width="800"
      okText="保存"
    >
      <a-form-model
        :model="form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="标签名称">
          <a-input
            v-model="form.labelName"
            placeholder="请输入10字以内的标签名"
            allowClear
            :maxLength="10"
            style="width: 300px"
          />
          <span class="limitWords">{{ form.labelName.length }}/10</span>
        </a-form-model-item>

        <a-form-model-item label="标签类型">
          <a-radio-group v-model="form.labelType">
            <a-radio :value="1"> 条件标签</a-radio>
            <a-radio :value="2"> 手动标签</a-radio>
          </a-radio-group>
        </a-form-model-item>

        <div v-if="form.labelType == '1'" style="padding-bottom: 100px">
          <h3>条件设置
            <span style="font-size: 14px; color: #999; margin-left: 10px">选择多个条件时，需全部满足</span>
          </h3>

          <a-form-model-item label="基础条件">
            <a-checkbox-group v-model="form.normalConditions" @change="jichuchange">
              <a-row class="arowStyle">
                <a-checkbox value="1" name="normalConditions">
                  成为客户时间
                </a-checkbox>
                <div style="padding-left: 8px">
                  <date-rankpiker
                    ref="daterankpicker"
                    :normalConditions="form.normalConditions"
                    aValue="1"
                    :customerTimes="beCustomTime"
                    :getNewTime="getBeCustomTime">
                  </date-rankpiker>
                </div>
              </a-row>
            </a-checkbox-group>
          </a-form-model-item>

          <!--交易条件-->
          <a-form-model-item label="交易条件">
            <a-checkbox-group v-model="form.tradingConditions" @change="tradeChange">
              <a-row class="arowStyle">
                <a-checkbox value="1" name="tradingConditions">
                  最近消费时间
                </a-checkbox>
                <days-piker
                  ref="ct1"
                  :select-values="form.latestConsumptionDuration"
                  :changeTime="expenseTime"
                  :tradingConditions="form.tradingConditions"
                  bValue="1"
                >
                </days-piker>
              </a-row>

              <a-row class="arowStyle" style="margin-top: 15px">
                <a-checkbox value="2" name="tradingConditions">
                  消费次数
                </a-checkbox>
                <days-piker
                  ref="ct2"
                  :changeTime="expenseNum"
                  :select-values="form.latestConsumptionCountDuration"
                  :tradingConditions="form.tradingConditions"
                  bValue="2">
                </days-piker>

                <div style="display: flex; align-items: center; margin-left: 10px">
                  <a-input-number :min="1"
                                  @change="onChange"
                                  v-model="form.latestConsumptionCountMin"
                                  :disabled="form.tradingConditions.includes('2') ? false : true"/>
                  <span :class="form.tradingConditions.includes('2')? 'textBox':'disabled'">次</span>
                  <span class="line">-</span>
                  <a-input-number :min="1"
                                  v-model="form.latestConsumptionCountMax"
                                  :disabled="form.tradingConditions.includes('2') ? false : true"/>
                  <span :class="form.tradingConditions.includes('2')? 'textBox': 'disabled'">次</span>
                </div>
              </a-row>

              <a-row class="arowStyle" style="margin-top: 15px">
                <a-checkbox value="3" name="tradingConditions">
                  消费金额
                </a-checkbox>
                <days-piker
                  ref="ct3"
                  :select-values="form.latestConsumptionMoneyDuration"
                  :changeTime="expenseMoney"
                  :tradingConditions="form.tradingConditions"
                  bValue="3">
                </days-piker>
                <div style="display: flex; align-items: center; margin-left: 10px">
                  <a-input-number :min="1" v-model="form.latestConsumptionMoneyMin"
                                  :disabled="form.tradingConditions.includes('3') ? false : true "/>
                  <span :class="form.tradingConditions.includes('3')? 'textBox': 'disabled'">元</span>
                  <span class="line">-</span>
                  <a-input-number :min="1" v-model="form.latestConsumptionMoneyMax"
                                  :disabled="form.tradingConditions.includes('3') ? false : true"/>
                  <span :class="form.tradingConditions.includes('3')? 'textBox': 'disabled'">元</span>
                </div>
              </a-row>

              <a-row class="arowStyle" style="margin-top: 15px">
                <a-checkbox value="4" name="tradingConditions">
                  订单均价
                </a-checkbox>
                <days-piker
                  ref="ct4"
                  :select-values="form.latestConsumptionAveragePriceDuration"
                  :changeTime="averagePrice"
                  :tradingConditions="form.tradingConditions"
                  bValue="4">
                </days-piker>
                <div style="display: flex; align-items: center; margin-left: 10px">
                  <a-input-number :min="1" v-model="form.latestConsumptionAveragePriceMin"
                                  :disabled="form.tradingConditions.includes('4') ? false : true"/>
                  <span :class="form.tradingConditions.includes('4')? 'textBox': 'disabled'">元</span>
                  <span class="line">-</span>
                  <a-input-number :min="1" v-model="form.latestConsumptionAveragePriceMax"
                                  :disabled="form.tradingConditions.includes('4') ? false : true"/>
                  <span :class="form.tradingConditions.includes('4')? 'textBox': 'disabled'">元</span>
                </div>
              </a-row>

            </a-checkbox-group>
          </a-form-model-item>
        </div>
      </a-form-model>
    </a-modal>

    <!--编辑-->
    <a-modal
      title="修改标签"
      :visible="visible2"
      :confirm-loading="confirmLoading"
      @ok="handleOk2"
      @cancel="handleCancel2"
      :width="800"
      :maskClosable="false"
      okText="保存"
    >
      <template>
        <a-form-model
          ref="editForm"
          :model="editForm"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item label="标签名称">
            <a-input
              v-model="editForm.labelName"
              placeholder="请输入10字以内的标签名"
              allowClear
              :maxLength="10"
              style="width: 300px"
            />
            <span v-if="editForm.labelName" class="limitWords">{{editForm.labelName.length}}/10</span>
          </a-form-model-item>

          <a-form-model-item label="标签类型">
            <a-radio-group v-model="editForm.labelType" disabled>
              <a-radio :value="1"> 条件标签</a-radio>
              <a-radio :value="2"> 手动标签</a-radio>
            </a-radio-group>
          </a-form-model-item>

          <div v-if="editForm.labelType == '1'" style="padding-bottom: 100px">
            <h3>条件设置
              <span style="font-size: 14px; color: #999; margin-left: 10px">选择多个条件时，需全部满足</span>
            </h3>

            <a-form-model-item label="基础条件">
              <a-checkbox-group v-model="editForm.normalConditions" @change="jichuchange2">
                <a-row class="arowStyle">
                  <a-checkbox value="1" name="normalConditions">
                    成为客户时间
                  </a-checkbox>
                  <div style="padding-left: 8px">
                    <date-rankpiker
                      ref="daterankpicker2"
                      :normalConditions="editForm.normalConditions"
                      aValue="1"
                      :customerTimes="editForm.beCustomTime"
                      :getNewTime="getBeCustomTime2">
                    </date-rankpiker>
                  </div>
                </a-row>
              </a-checkbox-group>
            </a-form-model-item>
            <!--交易条件     -->
            <a-form-model-item label="交易条件">
              <a-checkbox-group v-model="editForm.tradingConditions" @change="tradechange2">
                <a-row class="arowStyle">
                  <a-checkbox value="1" name="tradingConditions">
                    最近消费时间
                  </a-checkbox>
                  <days-piker
                    ref="cts1"
                    :changeTime="expenseTime2"
                    :tradingConditions="editForm.tradingConditions"
                    :select-values="editForm.latestConsumptionDuration"
                    bValue="1"
                  >
                  </days-piker>
                </a-row>

                <a-row class="arowStyle" style="margin-top: 15px">
                  <a-checkbox value="2" name="tradingConditions">
                    消费次数
                  </a-checkbox>
                  <days-piker
                    ref="cts2"
                    :changeTime="expenseNum2"
                    :select-values="editForm.latestConsumptionCountDuration"
                    :tradingConditions="editForm.tradingConditions"
                    bValue="2">
                  </days-piker>

                  <div style="display: flex; align-items: center; margin-left: 10px">
                    <a-input-number :min="1"
                                    v-model="editForm.latestConsumptionCountMin"
                                    @change="onChange2"
                                    :disabled="editForm.tradingConditions.includes('2') ? false : true"/>
                    <span :class="editForm.tradingConditions.includes('2')? 'textBox':'disabled'">次</span>
                    <span class="line">-</span>
                    <a-input-number :min="1"
                                    v-model="editForm.latestConsumptionCountMax"
                                    @change="onChange2"
                                    :disabled="editForm.tradingConditions.includes('2') ? false : true"/>
                    <span :class="editForm.tradingConditions.includes('2')? 'textBox': 'disabled'">次</span>
                  </div>
                </a-row>

                <a-row class="arowStyle" style="margin-top: 15px">
                  <a-checkbox value="3" name="tradingConditions">
                    消费金额
                  </a-checkbox>
                  <days-piker
                    ref="cts3"
                    :select-values="editForm.latestConsumptionMoneyDuration"
                    :changeTime="expenseMoney2"
                    :tradingConditions="editForm.tradingConditions"
                    bValue="3">
                  </days-piker>
                  <div style="display: flex; align-items: center; margin-left: 10px">
                    <a-input-number :min="1"
                                    v-model="editForm.latestConsumptionMoneyMin"
                                    @change="onChange2"
                                    :disabled="editForm.tradingConditions.includes('3') ? false : true "/>
                    <span :class="editForm.tradingConditions.includes('3')? 'textBox': 'disabled'">元</span>
                    <span class="line">-</span>
                    <a-input-number :min="1"
                                    v-model="editForm.latestConsumptionMoneyMax"
                                    @change="onChange2"
                                    :disabled="editForm.tradingConditions.includes('3') ? false : true"/>
                    <span :class="editForm.tradingConditions.includes('3')? 'textBox': 'disabled'">元</span>
                  </div>
                </a-row>

                <a-row class="arowStyle" style="margin-top: 15px">
                  <a-checkbox value="4" name="tradingConditions">
                    订单均价
                  </a-checkbox>
                  <days-piker
                    ref="cts4"
                    :select-values="editForm.latestConsumptionAveragePriceDuration"
                    :changeTime="averagePrice2"
                    :tradingConditions="editForm.tradingConditions"
                    bValue="4">
                  </days-piker>
                  <div style="display: flex; align-items: center; margin-left: 10px">
                    <a-input-number :min="1"
                                    v-model="editForm.latestConsumptionAveragePriceMin"
                                    @change="onChange2"
                                    :disabled="editForm.tradingConditions.includes('4') ? false : true"/>
                    <span :class="editForm.tradingConditions.includes('4')? 'textBox': 'disabled'">元</span>
                    <span class="line">-</span>
                    <a-input-number :min="1"
                                    v-model="editForm.latestConsumptionAveragePriceMax"
                                    @change="onChange2"
                                    :disabled="editForm.tradingConditions.includes('4') ? false : true"/>
                    <span :class="editForm.tradingConditions.includes('4')? 'textBox': 'disabled'">元</span>
                  </div>
                </a-row>
              </a-checkbox-group>
            </a-form-model-item>
          </div>
        </a-form-model>
      </template>
    </a-modal>

  </div>
</template>

<script>
  import deepCopy from "@/utils/deepCopy";
  import daysPiker from "../components/daysPiker";
  import DateRankpiker from "../components/DateRankpiker.vue";
  // import tagMangeEdit from "./tagManageEdit/TagManageEdit"
  // 表格初始化副本
  const formFB = {
    labelName: "",
    labelType: 1,
    //控制基础条件多选框是否选中的数组
    normalConditions: [],
    customerStartDate: '',
    customerEndDate: '',
    // beCustomTime:""+this.form.customerStartDate+"-"+this.form.customerEndDate,
    //...交易条件...
    tradingConditions: [],
    //消费时间
    latestConsumptionDuration: '',
    // 消费次数
    latestConsumptionCountDuration: '7',
    latestConsumptionCountMin: "",
    latestConsumptionCountMax: "",
    //消费均价
    latestConsumptionMoneyDuration: '7',
    latestConsumptionMoneyMin: "",
    latestConsumptionMoneyMax: "",
    //订单均价
    latestConsumptionAveragePriceDuration: '7',
    latestConsumptionAveragePriceMin: "",
    latestConsumptionAveragePriceMax: "",
  }
  export default {
    name: "tagManage",
    components: {
      daysPiker,
      DateRankpiker,
      // tagMangeEdit
    },
    watch: {
      'form.normalConditions': {
        handler(news, olds) {
          console.log(news);
          if (news.length == 0) {
            this.$set(this.form, 'customerStartDate', '')
            this.$set(this.form, 'customerEndDate', '')
            /*  this.$nextTick(()=>{
                this.$refs.daterankpicker.customerTime =''
              })*/
            this.$refs.daterankpicker.customerTime = ''
            console.log(this.form.customerStartDate, this.form.customerEndDate)
            // this.form.customerStartDate = ''
            // this.form.customerEndDate = ''
          }
        },
        // immediate: true,
        deep: true
      },
      'editForm.normalConditions': {
        handler(news, olds) {
          console.log(news);
          if (news.length == 0) {
            this.$set(this.editForm, 'customerStartDate', '')
            this.$set(this.editForm, 'customerEndDate', '')

            this.$refs.daterankpicker2.customerTime = ''
            console.log(this.editForm.customerStartDate, this.editForm.customerEndDate)

          }
        },
        // immediate: true,
        deep: true
      },
      'form.tradingConditions': {
        handler(news, olds) {
          if (news.length >= 0) {
            if (!news.includes("1")) {
              this.$refs.ct1.selectValue = ''
              this.form.latestConsumptionDuration = ''
            }
            if (!news.includes("2")) {
              this.$refs.ct2.selectValue = '7'
              this.form.latestConsumptionCountDuration = '7'
              this.form.latestConsumptionCountMin = ""
              this.form.latestConsumptionCountMax = ""
            }
            if (!news.includes("3")) {
              this.$refs.ct3.selectValue = '7'
              this.form.latestConsumptionMoneyDuration = '7'
              this.form.latestConsumptionMoneyMin = ""
              this.form.latestConsumptionMoneyMax = ""

            }
            if (!news.includes("4")) {
              this.$refs.ct4.selectValue = '7'
              this.form.latestConsumptionAveragePriceDuration = '7'
              this.form.latestConsumptionAveragePriceMin = ""
              this.form.latestConsumptionAveragePriceMax = ""
            }
          }

        },
        // immediate: true,
        deep: true
      },
      'editForm.tradingConditions': {
        handler(news, olds) {
          if (news.length >= 0) {
            if (!news.includes("1")) {
              this.$refs.cts1.selectValue = ''
              this.editForm.latestConsumptionDuration = ''
            }
            if (!news.includes("2")) {
              this.$refs.cts2.selectValue = '7'
              this.editForm.latestConsumptionCountDuration = '7'
              this.editForm.latestConsumptionCountMin = ""
              this.editForm.latestConsumptionCountMax = ""
            }
            if (!news.includes("3")) {
              this.$refs.cts3.selectValue = '7'
              this.editForm.latestConsumptionMoneyDuration = '7'
              this.editForm.latestConsumptionMoneyMin = ""
              this.editForm.latestConsumptionMoneyMax = ""

            }
            if (!news.includes("4")) {
              this.$refs.cts4.selectValue = '7'
              this.editForm.latestConsumptionAveragePriceDuration = '7'
              this.editForm.latestConsumptionAveragePriceMin = ""
              this.editForm.latestConsumptionAveragePriceMax = ""
            }
          }

        },
        // immediate: true,
        deep: true
      }
    },
    computed: {
      beCustomTime() {
        // console.log(this.customerStartDate,this.customerEndDate)
        if (this.form.customerStartDate != '') {
          return "" + this.form.customerStartDate + "-" + this.form.customerEndDate
        } else {
          return ''
        }
      },


    },
    data() {
      return {
        tabKey:1,
        labelCol: {span: 4},
        wrapperCol: {span: 18},

        visible: false,
        visible2: false,
        confirmLoading: false,
        // form 表单新增标签数据  创建标签的载体
        form:deepCopy(formFB),
        /* form: {
           labelName: "",
           labelType: 1,
           //控制基础条件多选框是否选中的数组
           normalConditions: [],
           customerStartDate: '',
           customerEndDate: '',
           // beCustomTime:""+this.form.customerStartDate+"-"+this.form.customerEndDate,
           //...交易条件...
           tradingConditions: [],
           //消费时间
           latestConsumptionDuration: '',
           // 消费次数
           latestConsumptionCountDuration: '7',
           latestConsumptionCountMin: "",
           latestConsumptionCountMax: "",
           //消费均价
           latestConsumptionMoneyDuration: '7',
           latestConsumptionMoneyMin: "",
           latestConsumptionMoneyMax: "",
           //订单均价
           latestConsumptionAveragePriceDuration: '7',
           latestConsumptionAveragePriceMin: "",
           latestConsumptionAveragePriceMax: "",
         },*/
        // 添加的时候保留一份副本供取消时 赋值
        // copyForm:deepCopy(this.form),
        //编辑修改的载体
        editForm: {
          tradingConditions: [],
          normalConditions: [],
        },
        formFB,
        // 系统标签数据
        systemTag: [],
        //  条件标签数据：
        tiaojianTag: [],
        //  手动标签数据
        handTag: []

      }
    },
    created() {
      this.getTagInfo()
    },
    // 方法集合
    methods: {
      // 一开始需要请求系统客户数据  条件客户数据
      async getTagInfo() {
        let res = await this.$get(`customer/label/list`);
        if (res && res.returnCode === 1000)
          console.log('标签:', res)
        // 全部标签
        const allLabelList = res.dataInfo
        // == 筛选系统标签 ==
        let sysArr = allLabelList.filter((item) => {
          return item.systemDefault === 1
        })
        // 系统标签赋值给本地变量并进行打 tag说明
        this.systemTag = sysArr
        console.log(this.systemTag)

        // == 自定义标签==
        // 先找出所有自定义标签
        let tiaojianArr = allLabelList.filter((item) => {
          return item.systemDefault === 0
        })

        console.log(tiaojianArr)
        // 对条件标签分类成 手动标签与条件标签
        this.tiaojianTag = tiaojianArr.filter((item) => {
          return item.labelType === 1
        })
        this.handTag = tiaojianArr.filter((item) => {
          return item.labelType === 2
        })
        console.log('this.tiaojianTag', this.tiaojianTag, 'this.handTag', this.handTag)
      },

      // 4种系统客户的 更新 关闭与开启
      /*****   系统标签相关操作  ******/
      updateSys(item) {
        console.log('更新客户数据', item)
        let id = item.id
        this.$post('customer/label/renew',
          {id}).then(res => {
          if (res && res.returnCode === 1000) {
            this.$message.success('更新成功!')
            // 重新请求数据刷新页面
            this.getTagInfo()
          }
        })
        this.getTagInfo()
      },
      closeSys(item) {
        console.log('客户关闭', item)
        let id = item.id
        let enabled = 0
        this.$post('customer/label/enabled',
          {id, enabled})
          .then(res => {
            if (res && res.returnCode === 1000) {
              this.$message.success('关闭成功!')
              this.getTagInfo()
            }
          })
      },
      openSys(item) {
        console.log('客户开启', item)
        let id = item.id
        let enabled = 1
        this.$post('customer/label/enabled',
          {id, enabled})
          .then(res => {
            if (res && res.returnCode === 1000) {
              this.$message.success('开启成功!')
              this.getTagInfo()
            }
          })
      },

      /*****   系统标签相关操作结束  ******/


      /******条件标签 编辑与删除******/
      async editTJTag(item) {
        // 是有个id的注意一下 打开编辑表单

        // 拿item 去请求数据
        // customer/label/query
        const res = await this.$get(`customer/label/query`, {id: item.id})
        if (res && res.returnCode === 1000) {
          console.log(res)
          let result = res.dataInfo
          // var item = res.dataInfo
          // console.log(item)
          // this.$message.success('删除成功!')

          result.normalConditions = []
          result.tradingConditions = []
          if (result.latestConsumptionDuration === null) {
            // item.tradingConditions.push("1")
            // this.$refs.cts1.selectValue =item.latestConsumptionDuration
            result.latestConsumptionDuration = ""
          }else{
            result.tradingConditions.push("1")
            result.latestConsumptionDuration = ""+result.latestConsumptionDuration
          }
          // 判断值的有无 push不push
          if (result.latestConsumptionCountMin || result.latestConsumptionCountMax) {
            result.tradingConditions.push("2")
            // this.$refs.cts2.selectValue =item.latestConsumptionCountDuration
            result.latestConsumptionCountDuration = "" + result.latestConsumptionCountDuration
          }else {
            result.latestConsumptionCountDuration = "7"
          }
          // 判断值的有无 push不push
          if (result.latestConsumptionMoneyMin || result.latestConsumptionMoneyMax) {
            result.tradingConditions.push("3")
            // this.$refs.cts3.selectValue =item.latestConsumptionMoneyDuration
            result.latestConsumptionMoneyDuration = "" + result.latestConsumptionMoneyDuration
          }else {
            result.latestConsumptionMoneyDuration = "7"
          }
          // 判断值的有无 push不push
          if (result.latestConsumptionAveragePriceMin || result.latestConsumptionAveragePriceMax) {
            result.tradingConditions.push("4")
            // this.$refs.cts4.selectValue =item.latestConsumptionAveragePriceDuration
            result.latestConsumptionAveragePriceDuration = "" + result.latestConsumptionAveragePriceDuration
          }else {
            result.latestConsumptionAveragePriceDuration = "7"
          }



          if (result.customerStartDate) {
            result.normalConditions.push("1")
            result.beCustomTime = "" + result.customerStartDate + "-" + result.customerEndDate
          } else {
            result.beCustomTime = ''
          }
          console.log('deepCopy条件标签信息:', result)

          this.editForm = deepCopy(result)
          // console.log("deepCopy条件标签信息", item)
          // this.editForm = deepCopy(this.form)
          // 这里是重点啊★★★★★★
          console.log('this.editForm:', this.editForm)


          this.visible2 = true
        }

      },
      DeleteTJTag(item) {

        this.$post(`customer/label/delete`, {idList: [item.id]}).then((res) => {
          if (res && res.returnCode === 1000) {
            this.$message.success('删除成功!')
            this.getTagInfo()
          }
        })
        console.log("据id删除条件标签信息", item)
      },
      /******条件标签 编辑与删除结束 ******/


      /******手动标签 编辑与删除******/
      edithandTag(item) {
        // this.editForm = item
        // this.copyData = deepCopy(item)

        this.editForm = deepCopy(item)
        this.visible2 = true
        console.log("据id编辑手动标签信息", item)
      },
      deletehandTag(item) {
        console.log(item.id)
        this.$post(`customer/label/delete`, {idList: [item.id]}).then((res) => {
          if (res && res.returnCode === 1000) {
            this.$message.success('删除成功!')
            this.getTagInfo()
          }
        })
        console.log("据id删除手动标签信息", item)
      },
      /******手动标签 编辑与删除结束******/

      jichuchange(e) {
        console.log(e)
      },
      tradeChange(e) {
        console.log(e)
      },
      jichuchange2(e) {
        // console.log(e)
      },
      tradechange2(e) {
        // console.log(e)
      },
      expenseTime(a) {
        this.form.latestConsumptionDuration = a;
        console.log(this.form.latestConsumptionDuration);
      },
      expenseNum(a) {
        //这个也是时间
        this.form.latestConsumptionCountDuration = a;
        console.log(this.form.latestConsumptionCountDuration);
      },
      expenseMoney(a) {
        this.form.latestConsumptionMoneyDuration = a;
        console.log(this.form.latestConsumptionMoneyDuration);
      },
      averagePrice(a) {
        this.form.latestConsumptionAveragePriceDuration = a;
        console.log(this.form.latestConsumptionAveragePriceDuration);
      },
      // 成为客户
      getBeCustomTime(a) {
        let beCustomTime = a
        // this.form.beCustomTime = a;
        console.log(beCustomTime)
        const arr = beCustomTime.match(/\d{4}-\d{1,2}-\d{1,2}\s\d{2}:\d{2}:\d{2}/g)
        if (this.form.normalConditions.length > 0) {
          // const arr = beCustomTime.split('-')
          // 分解时间
          console.log(arr)
          this.form.customerStartDate = arr[0];
          this.form.customerEndDate = arr[1];
        }

        console.log('成为客户时间')
        console.log(this.beCustomTime);
      },

      // form2绑定的事件
      expenseTime2(a) {
        this.editForm.latestConsumptionDuration = a;
        console.log(this.editForm.latestConsumptionDuration);
      },
      expenseNum2(a) {
        //这个也是时间
        this.editForm.latestConsumptionCountDuration = a;
      },
      expenseMoney2(a) {
        this.editForm.latestConsumptionMoneyDuration = a;
      },
      averagePrice2(a) {
        this.editForm.latestConsumptionAveragePriceDuration = a;
      },
      // 成为客户  成为会员时间
      getBeCustomTime2(a) {
        let beCustomTime = a
        // this.form.beCustomTime = a;
        console.log(beCustomTime)
        const arr = beCustomTime.match(/\d{4}-\d{1,2}-\d{1,2}\s\d{2}:\d{2}:\d{2}/g)
        if (this.editForm.normalConditions.length > 0) {
          // const arr = beCustomTime.split('-')
          // 分解时间
          console.log(arr)
          this.editForm.customerStartDate = arr[0];
          this.editForm.customerEndDate = arr[1];
        }

      },
      callback(key) {
        // console.log(key);
        console.log(this.tabKey)
      },
      addTag() {
        if (this.tiaojianTag.length>=20){
          this.$message.warn("条件标签个数不能超过20个")
          return
        }
        if (this.tabKey==1){
          this.form.labelType = 1
          console.log(this.form )
        }
        if (this.tabKey==2){
          this.form.labelType = 2
          console.log(this.form )
        }
        this.visible = true;
      },

      // 添加条件标签的操作
      handleOk(e) {
        console.log('提交的表单数据:', this.form)

        var form = deepCopy(this.form)

        console.log("提交的表单数据副本:",form)
        if ((!form.tradingConditions.includes("1"))){
          // 置空 时间
          form.latestConsumptionDuration = ''
        }
        if ((!form.tradingConditions.includes("2"))){
          // 置空 时间
          form.latestConsumptionCountDuration = ''
        }
        if ((!form.tradingConditions.includes("3"))){
          // 置空 时间
          form.latestConsumptionMoneyDuration = ''
        }
        if ((!form.tradingConditions.includes("4"))){
          // 置空 时间
          form.latestConsumptionAveragePriceDuration = ''
        }
        console.log("最终要提交的数据:",form)
        // return ''

        if (this.form.normalConditions.includes("1") && this.form.customerStartDate == '') {
          this.$message.warn('请选择成为客户时间')
          return
        }
        /* if (this.form.tradingConditions.includes("1") && (this.form.latestConsumptionDuration == '')) {
           this.$message.warn('请选择最近消费时间')
           return
         }*/

        if ((this.form.tradingConditions.includes("2")) && (  !this.form.latestConsumptionCountMin  && !this.form.latestConsumptionCountMax )) {
          this.$message.warn('至少填写一项2')
          return
        }

        if (this.form.tradingConditions.includes("3") && ( !this.form.latestConsumptionMoneyMin && !this.form.latestConsumptionMoneyMax)) {
          this.$message.warn('至少填写一项3')
          return
        }
        if (this.form.tradingConditions.includes("4") && ( !this.form.latestConsumptionAveragePriceMin  && !this.form.latestConsumptionAveragePriceMax)) {
          this.$message.warn('至少填写一项4')
          return
        }
        //区间限制问题
        if ((form.latestConsumptionCountMin) && (form.latestConsumptionCountMin*1 >form.latestConsumptionCountMax*1)){
          this.$message.warn("消费次数不能左边小右边大")
          return
        }
        if ((form.latestConsumptionAveragePriceMin) && (form.latestConsumptionAveragePriceMin*1 >form.latestConsumptionAveragePriceMax*1)){
          this.$message.warn("消费均价不能左边小右边大")
          return
        }
        if ((form.latestConsumptionMoneyMin) && (form.latestConsumptionMoneyMin*1 >form.latestConsumptionMoneyMax*1)){
          this.$message.warn("消费金额不能左边小右边大")
          return
        }
        const {normalConditions, tradingConditions, ...others} = form

        if (this.form.labelType == 1) {
          this.$post('customer/label/add', {...others}).then(res => {
            if (res && res.returnCode === 1000) {
              this.$message.success('添加成功!')
              this.getTagInfo()
            }
          })
          this.visible = false;
          // 初始化标签
          this.form = deepCopy(formFB)
        } else {
          const {labelName, labelType} = this.form
          //  customer/label/add
          this.$post('customer/label/add', {labelName, labelType}).then(res => {
            if (res && res.returnCode === 1000) {
              this.$message.success('添加成功!')
              this.getTagInfo()
            }
          })
          this.visible = false;
          // 初始化标签
          this.form = deepCopy(formFB)
        }

      },
      //修改条件标签的操作
      handleOk2(e) {

        if (this.editForm.labelType === 1) {
          console.log("修改后的:", this.editForm)
          // customer/label/update
          var editForm = deepCopy(this.editForm)
          // return

          console.log("提交的表单数据副本:",editForm)
          if ((!editForm.tradingConditions.includes("1"))){
            // 置空 时间
            editForm.latestConsumptionDuration = ''
          }
          if ((!editForm.tradingConditions.includes("2"))){
            // 置空 时间
            editForm.latestConsumptionCountDuration = ''
          }
          if ((!editForm.tradingConditions.includes("3"))){
            // 置空 时间
            editForm.latestConsumptionMoneyDuration = ''
          }
          if ((!editForm.tradingConditions.includes("4"))){
            // 置空 时间
            editForm.latestConsumptionAveragePriceDuration = ''
          }
          console.log("最终要提交的数据:",editForm)
          // return ''

          if (this.editForm.normalConditions.includes("1") && this.editForm.customerStartDate == '') {
            this.$message.warn('请选择成为客户时间')
            return
          }
          /* if (this.form.tradingConditions.includes("1") && (this.form.latestConsumptionDuration == '')) {
             this.$message.warn('请选择最近消费时间')
             return
           }*/

          if ((this.editForm.tradingConditions.includes("2")) && (!this.editForm.latestConsumptionCountMin  && !this.editForm.latestConsumptionCountMax )) {
            this.$message.warn('至少填写一项2')
            return
          }

          if (this.editForm.tradingConditions.includes("3") && ( !this.editForm.latestConsumptionMoneyMin && !this.editForm.latestConsumptionMoneyMax)) {
            this.$message.warn('至少填写一项3')
            return
          }
          if (this.editForm.tradingConditions.includes("4") && ( !this.editForm.latestConsumptionAveragePriceMin  && !this.editForm.latestConsumptionAveragePriceMax)) {
            this.$message.warn('至少填写一项4')
            return
          }
          //区间限制问题
          if ((editForm.latestConsumptionCountMin) && (editForm.latestConsumptionCountMin*1 >editForm.latestConsumptionCountMax*1)){
            this.$message.warn("消费次数不能左边小右边大")
            return
          }
          if ((editForm.latestConsumptionAveragePriceMin) && (editForm.latestConsumptionAveragePriceMin*1 >editForm.latestConsumptionAveragePriceMax*1)){
            this.$message.warn("消费均价不能左边小右边大")
            return
          }
          if ((editForm.latestConsumptionMoneyMin) && (editForm.latestConsumptionMoneyMin*1 >editForm.latestConsumptionMoneyMax*1)){
            this.$message.warn("消费金额不能左边小右边大")
            return
          }
          //
          const {normalConditions, tradingConditions, ...others} = editForm
          // 发送请求  刷新页面
          this.$post('customer/label/update', {...others}).then(res => {
            if (res && res.returnCode === 1000) {
              this.$message.success('修改成功!')
              this.getTagInfo()

            }
          })
          // 还原editForm
          this.editForm = {
            tradingConditions: [],
            normalConditions: [],
          }
          this.visible2 = false;
        }
        if (this.editForm.labelType === 2) {
          console.log(this.editForm)
          // customer/label/update
          const {id, labelName, labelType} = this.editForm
          // 发送请求  刷新页面
          this.$post('customer/label/update', {id, labelName, labelType}).then(res => {
            if (res && res.returnCode === 1000) {
              this.$message.success('修改成功!')
              this.getTagInfo()
            }
          })
          this.visible2 = false;
        }
      },

      // 取消添加
      handleCancel(e) {
        //取消的时候要恢复form默认值
        // this.getTagInfo()
        let form = deepCopy(formFB)
        if (this.tabKey ==1){
          form.labelType =1
        }
        if (this.tabKey ==2){
          form.labelType =2
        }
        this.form = deepCopy(form)
        console.log(this.form)
        this.$nextTick(() => {
          this.$refs.ct1.selectValue = ''
          this.$refs.ct2.selectValue = '7'
          this.$refs.ct3.selectValue = '7'
          this.$refs.ct4.selectValue = '7'
        })
        this.visible = false;
      },
      // 取消修改
      handleCancel2(e) {
        // console.log(e)
        this.editForm = {
          tradingConditions: [],
          normalConditions: [],
        }
        this.visible2 = false;

      },
      onChange(value) {
        console.log(this.form)
      },
      onChange2(value) {
        console.log(this.editForm)
      },
    },


  };
</script>
<style rel="stylesheet/less" lang="less" scoped>
  //@import url();
  .addTagBtn {
    line-height: 30px;
    width: 80px;
    text-align: center;
    border: 1px solid #eee;
    cursor: pointer;
  }

  .addTagBtn:active {
    background: rgb(68, 153, 255);
  }

  .systemTag,
  .customTag,
  .handTag {
    font-weight: bold;
    font-size: 16px;
    margin-right: 10px;
  }

  .systemTagAttention,
  .customTagAttention {
    color: #999;
    font-size: 14px;
  }

  .systemTagList,
  .customTagList,
  .handTagList {
    // 区域的100%宽度
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    flex-wrap: wrap;

    .systemTagItem,
    .customTagItem,
    .handTagItem {
      margin-top: 10px;
      width: 19%;
      padding: 15px;
      border-radius: 10px;
      border: 1px solid #eee;

      .systemItemHead,
      .customItemHead,
      .handItemHead {
        font-size: 12px;

        span {
          color: #999;
          margin-left: 5px;
          font-size: 10px;
        }
      }

      .payStatus,
      .peopelNum,
      .updateTime,
      .createTime {
        font-size: 12px;
        line-height: 24px;
      }

      .delBtn {
        color: rgb(68, 153, 255);
        font-size: 12px;
        display: flex;
        justify-content: flex-end;

        span {
          cursor: pointer;
        }
      }
    }

    .systemTagItem + .systemTagItem {
      margin-left: 10px;
    }

    .customTagItem + .customTagItem {
      margin-left: 10px;
    }

    .handTagItem + .handTagItem {
      margin-left: 10px;
    }

    .systemTagItem:nth-child(5n + 1) {
      margin-left: 0;
    }

    .customTagItem:nth-child(5n + 1) {
      margin-left: 0;
    }

    .handTagItem:nth-child(5n + 1) {
      margin-left: 0;
    }
  }

  .limitWords {
    position: absolute;
    right: 30px;
    top: -10px;
    font-size: 10px;
    color: #eee;
  }

  /deep/ .ant-row {
    margin-top: 5px;
  }

  /deep/ .ant-modal-body {
    max-height: unset;
    // min-height: 700px;
    overflow: visible;
  }

  /deep/ .ant-calendar-picker-container {
    left: 203px !important;
    top: 0px;
  }

  .arowStyle {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  .textBox {
    display: inline-block;
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border: 1px solid #d9d9d9;
    margin-left: 0px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .line {
    margin: 0 5px;
  }

  .disabled {
    display: inline-block;
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border: 1px solid #d9d9d9;
    margin-left: 0px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    background: #f5f5f5;
  }

  /deep/ .ant-input-number {
    border-right: none;
    border-top-right-radius: unset;
    border-bottom-right-radius: unset;
  }
</style>

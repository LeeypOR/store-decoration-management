<template>
  <div class="user-info">
    <a-button @click="back" style="margin-bottom: 20px">返回客户列表</a-button>
    <div class="info-title">基本信息</div>
    <div class="info-body">
      <a-avatar
        shape="square"
        :src="userInfo.avatar || ''"
        class="wechat-avatar"
        :size="90"
        icon="user"
      />
      <table class="info-table">
        <tr>
          <th>昵称</th>
          <td>{{ userInfo.nickName }}</td>
          <th>客户ID</th>
          <td>{{ userInfo.id }}</td>
          <th>客户渠道</th>
          <td>{{ userInfo.customerChannel }}</td>
        </tr>
        <tr>
          <th>注册时间</th>
          <td>
            {{
            userInfo.createDate ? userInfo.createDate.replace("T", " ") : ""
            }}
          </td>
          <th>用户来源</th>
          <td>{{ userInfo.userSource }}</td>
          <th>用户状态</th>
          <td>{{ statusList[userInfo.userStatus] }}</td>
        </tr>
        <tr>
          <th>手机号</th>
          <td>{{ userInfo.phoneNumber }}</td>
          <th>姓名</th>
          <td>{{ userInfo.customerName }}</td>
          <th>成长值</th>
          <td>{{ userInfo.growthValue }}</td>
        </tr>
        <tr>
          <th>性别</th>
          <td>{{ sex[userInfo.gender] || "" }}</td>
          <th>生日</th>
          <td>{{ userInfo.birthday }}</td>
          <th>地区</th>
          <td>{{ userInfo.area }}</td>
        </tr>
        <!-- <tr>
           <th>标签</th>
           <td>{{ userInfo.label }}</td>
           <th></th>
           <td></td>
           <th></th>
           <td></td>
         </tr>-->
      </table>
    </div>
    <div style="display: flex; justify-content: center; margin-top: 20px">
      <a-button v-if="!fromOrder" type="primary" style="margin-right: 20px" @click="addTag"> 编辑客户标签 </a-button>
      <!-- <a-button type="primary" style="margin-right: 20px" @click="addBlackList">
        移入黑名单
      </a-button>
      <a-button
        type="primary"
        style="margin-right: 20px"
        @click="removeBlackList"
      >
        移除黑名单
      </a-button> -->
      <a-modal
        title="选择标签(最多可选择17个标签)"
        :visible="visibleTag"
        :confirm-loading="confirmLoading1"
        @ok="handleOk1"
        @cancel="handleCancel1"
        :width="800"
        okText="确认"
        :maskClosable="false"
        cancelText="取消"
        class="addTag"
      >
        <a-input-search
          style="width: 300px;"
          placeholder="请输入标签名"
          enter-button="搜索"
          @search="onSearch"
        />

        <div class="tagArea">
          <template v-for="(item) in handTag">
            <a-checkable-tag v-model="item.checked" :key="item.id" @change="handleChange(item)">
              {{item.labelName}}
            </a-checkable-tag>
          </template>
        </div>
      </a-modal>

      <a-button v-if="!fromOrder" type="primary" @click="updateVipInfo"> 编辑基本信息 </a-button>
    </div>

    <div class="tagArea " >
      <span v-for="(item) in labelList" class="tags" style="margin: 10px;"
           :key="item.id">
        <span style="text-align: center;display: block">{{item.labelName }}</span>
        <template v-if="item.systemDefault === 0 &&item.labelType === 2">
          <img src="@/assets/close.png" class="imgs" @click="tagBtnClickFunc(item,fromOrder)" style="width: 18px;height: 18px;" alt="">
        </template>

      </span>
    </div>






    <div class="info-title title3">行为统计</div>
    <a-table
      :columns="columns2"
      :data-source="data2"
      :pagination="pagination"
      @change="tableChange"
      :row-key="(record) => record.id"
    >
      <template slot="operation" slot-scope="text, record">
        <!-- <span class="text-primary pointer" @click="openInfo(record)"
          >查看明细</span
        > -->
        <a-popover
          trigger="click"
          placement="left"
          :overlayStyle="{
            height: 'auto',
          }"
          :getPopupContainer="getPopupContainer()"
        >
          <template slot="content">
            <div class="popBox" v-if="detailsList.length > 0">
              <p class="detailsOne" v-for="(l, i) in detailsList" :key="i">
                <span class="dian">·</span> 访问了<span class="page">{{
                  l.detailStartPage
                }}</span>
                ,停留了{{ l.detailDuration || 0 }}秒
              </p>
            </div>
            <div class="popBox1" v-else>
              <a-list :data-source="[]" size="small" />
            </div>
          </template>
          <span class="text-primary pointer" @click="openInfo(record)"
          >查看明细</span
          >
        </a-popover>
      </template>
    </a-table>
    <div class="info-title title3">交易明细</div>
    <div style="margin-top: 5px; background: #f5f5f5">
      <div
        style="
          background: #f5f5f5;
          padding-top: 10px;
          padding-left: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <div>
          <span
            :class="goodsShow ? 'goodsActive' : 'goodsBtn'"
            style="margin-right: 20px"
            @click="changeGoodsShow"
          >商品订单</span
          >
          <!-- <span
            :class="goodsShow ? 'goodsBtn' : 'goodsActive'"
            @click="changeApplyShow"
            >交易订单</span
          > -->
        </div>
        <a-select
          default-value=""
          style="width: 130px; margin-right: 10px"
          @change="chooseOrderTime"
        >
          <a-select-option value=""> 全部订单 </a-select-option>
          <a-select-option value="MONTH_AGO"> 近一个月订单 </a-select-option>
          <a-select-option value="THREE_MONTH_AGO">
            近三个月订单
          </a-select-option>
          <a-select-option value="SIX_MONTH_AGO">
            近六个月订单
          </a-select-option>
          <a-select-option value="ONE_YEAR">近一年订单 </a-select-option>
          <a-select-option value="ONE_YEAR_AGO"> 一年以上订单 </a-select-option>
        </a-select>
      </div>
      <a-table
        :columns="columns3"
        :data-source="data3"
        :pagination="pagination1"
        :row-key="(record) => record.id"
        @change="tableChange1"
        :scroll="{ x: 1000 }"
      >
      </a-table>
    </div>
    <div class="info-title title3">
      优惠券明细
      <a-select
        default-value=""
        style="width: 130px; margin-right: 10px"
        @change="chooseStadios"
      >
        <a-select-option value=""> 全部状态 </a-select-option>
        <a-select-option value="1"> 已使用 </a-select-option>
        <a-select-option value="0"> 未使用 </a-select-option>
        <a-select-option value="2"> 已失效 </a-select-option>
      </a-select>
    </div>
    <a-table
      :columns="columns4"
      :data-source="data4"
      :pagination="pagination2"
      :row-key="(record) => record.id"
      @change="tableChange2"
    >
    </a-table>
    <a-modal
      title="黑名单限制行为"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form-model :model="form">
        <a-form-model-item label="限制行为">
          <a-checkbox-group v-model="form.limited">
            <a-checkbox value="1" name="type"> Online </a-checkbox>
            <a-checkbox value="2" name="type"> Promotion </a-checkbox>
            <a-checkbox value="3" name="type"> Offline </a-checkbox>
          </a-checkbox-group>
        </a-form-model-item>
        <a-form-model-item label="拉黑原因">
          <a-input v-model="form.desc" type="textarea" :rows="4" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <a-modal
      title="编辑基本信息"
      :visible="visibleVIP"
      :confirm-loading="confirmLoadingVIP"
      @ok="handleOkVIP"
      :maskClosable="false"
      @cancel="handleCancelVIP"
      okText="保存"
    >
      <a-form-model
        :model="updateInfo"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :rules="rules"
        ref="updateInfomation"
      >
        <a-form-model-item label="手机号" prop="phoneNumber">
          <a-input
            v-model="updateInfo.phoneNumber"
            placeholder="请输入手机号"
          />
        </a-form-model-item>
        <a-form-model-item label="姓名">
          <a-input v-model="updateInfo.customerName" placeholder="请输入姓名" />
        </a-form-model-item>
        <a-form-model-item label="生日">
          <a-date-picker @change="dateChange" :defaultValue="birthday" />
        </a-form-model-item>
        <a-form-model-item label="性别">
          <a-select placeholder="请选择" v-model="updateInfo.gender">
            <a-select-option value="1"> 男 </a-select-option>
            <a-select-option value="2"> 女 </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="地区">
          <a-cascader
            :options="options"
            placeholder="请选择地址"
            @change="onAreaChange"
            :fieldNames="fieldNames"
            :getPopupContainer="getPopupContainer()"
            :defaultValue="areaDefaultValue"
          />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
  import moment from "moment";
  import { mapActions } from "vuex";
  import deepCopy from "../../../utils/deepCopy";
  export default {
    data() {
      let validatePhoneNumber = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("手机号码不能为空"));
        } else {
          const phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
          if (!phoneReg.test(value)) {
            callback(new Error("手机号码格式错误"));
            return;
          }
          callback();
        }
      };
      return {
        userInfo: {},
        statusList: ["黑名单", "正常"],
        sex: ["", "男", "女"],



        visibleTag: false,
        confirmLoading1: false,
        // 模态框框里只显示 手动标签
        handTag:[],
        // 客户已有标签
        labelList:[],
        // 客户已有的手动标签
        labelHandList:[],
        // 复制客户已有的手动标签
        handTagCopy:[],


        columns2: [
          {
            title: "日期",
            dataIndex: "recordDate",
            key: "recordDate",
          },
          {
            title: "时间",
            dataIndex: "timeFrame",
            key: "timeFrame",
          },
          {
            title: "渠道",
            dataIndex: "channel",
            key: "channel",
          },
          {
            title: "进入页面",
            dataIndex: "enterPage",
            key: "enterPage",
          },
          {
            title: "退出页面",
            dataIndex: "endPage",
            key: "endPage",
          },
          {
            title: "时长",
            key: "onlineTime",
            dataIndex: "onlineTime",
            customRender: (text, row) => {
              if (text == null) {
                return (text = "");
              } else {
                return text + "秒";
              }
            },
          },
          {
            title: "操作",
            dataIndex: "operation",
            scopedSlots: { customRender: "operation" },
          },
        ],
        data2: [],
        columns3: [
          {
            title: "订单编号",
            dataIndex: "orderNo",
            key: "orderNo",
            width: "200px",
          },
          {
            title: "下单时间",
            dataIndex: "createDate",
            key: "createDate",
            width: "130px",
          },
          {
            title: "收货人",
            dataIndex: "userName",
            key: "userName",
          },
          {
            title: "订单来源",
            key: "orderFromType",
            dataIndex: "orderFromType",
            customRender: (text, row) => {
              if (text == 1) {
                text = "微信小程序";
              }
              return text;
            },
          },
          {
            title: "配送方式",
            key: "goodsDistribution",
            dataIndex: "goodsDistribution",
            customRender: (text, row) => {
              if (text == 1) {
                text = "到店自取";
              } else if (text == 0) {
                text = "快递发货";
              } else if (text == 2) {
                text = "快递";
              } else {
                text = "定点自提";
              }
              return text;
            },
          },
          {
            title: "配送地址",
            key: "detailAddress",
            dataIndex: "detailAddress",
          },
          {
            title: "支付方式",
            key: "orderPayType",
            dataIndex: "orderPayType",
            customRender: (text, row) => {
           /*   if (text == "1") {
                text = "微信小程序支付";
              }
              return text;*/

              if (text == 2) {
                return "国际银行支付";
              }
              return "微信支付";
            },
          },
          {
            title: "支付金额",
            key: "goodsOrderPrice",
            dataIndex: "goodsOrderPrice",
            customRender: (text, row) => {
              return ((text * 1) / 100).toFixed(2) + "元";
            },
          },
          {
            title: "订单状态",
            key: "orderStatus",
            dataIndex: "orderStatus",
            customRender: (text, row) => {
              if (text == "ORDER_UNPAID") {
                text = "待付款";
              } else if (text == "ORDER_CANCEL") {
                text = "订单已取消";
              } else if (text == "ORDER_UN_ISSUE") {
                text = "待发货";
              } else if (text == "ORDER_UN_RECEIVED") {
                text = "待收货";
              } else if (text == "ORDER_UN_EVALUATE") {
                text = "待评价";
              } else if (text == "ORDER_FINISH") {
                text = "已完成";
              } else if (text == "ORDER_LEFT_WAIT") {
                text = "待自取";
              }
              else if (text == "ORDER_CLOSE") {
                text = "已关闭";
              }
              return text;
            },
          },
        ],
        data3: [],
        columns4: [
          {
            title: "优惠券名称",
            dataIndex: "couponName",
            key: "couponName",
          },
          {
            title: "使用规则",
            dataIndex: "couponFullMoney",
            key: "couponFullMoney",
            width: 200,
            customRender: (text, row) => {
              // 1、订单满xx元可用，最多优惠xx钱（使用门槛和最多优惠都不为-1）
              // 2、无门槛，最多优惠xx钱（使用门槛为-1，最多优惠不为-1）
              // 3、订单满xx元可用（最多优惠为-1，使用门槛不为-1）
              // 4、无门槛（使用门槛为-1，最多优惠也为-1）
              if (row.couponFullMoney != -1 && row.mostDiscount != -1) {
                return `订单满${row.couponFullMoney}元可用，最多优惠${row.mostDiscount}元`;
              } else if (row.couponFullMoney == -1 && row.mostDiscount != -1) {
                return `无门槛，最多优惠${row.mostDiscount}元`;
              } else if (row.couponFullMoney != -1 && row.mostDiscount == -1) {
                return `订单满${row.couponFullMoney}元可用`;
              } else if (row.couponFullMoney == -1 && row.mostDiscount == -1) {
                return "无门槛";
              }
              return "";
              // if(row.couponType==0 || row.couponType==1){
              //   if(row.couponFullMoney!=-1){
              //     return '订单满'+text+'元可用';
              //   }
              //   return '无门槛';
              // }
              // else if(row.couponType==2){
              //   if(row.mostDiscount>0){
              //     return '最多优惠'+row.mostDiscount+'元'
              //   }
              //   return '';
              // }
              // return text;
            },
          },
          {
            //receiveData
            title: "领取时间",
            dataIndex: "createDate",
            key: "createDate",
          },
          {
            title: "有效时间",
            dataIndex: "effectiveTime",
            key: "effectiveTime",
          },
          {
            title: "优惠券状态",
            dataIndex: "couponStatus",
            key: "couponStatus",
            customRender: (text, row) => {
              if (text == 0) {
                text = "未使用";
              } else if (text == 1) {
                text = "已使用";
              } else if (text == 2) {
                text = "已失效";
              }
              return text;
            },
          },
        ],
        data4: [],
        visible: false,
        confirmLoading: false,
        visibleVIP: false,
        confirmLoadingVIP: false,
        form: {
          limited: [],
          desc: "",
        },
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
        updateInfo: {
          phoneNumber: undefined,
          customerName: undefined,
          gender: undefined,
          birthday: "",
        },
        birthday: "",
        options: [],
        fieldNames: {
          label: "areaName",
          value: "areaName",
          children: "children",
        },
        rules: {
          phoneNumber: [
            { required: true, validator: validatePhoneNumber, trigger: "blur" },
          ],
        },
        updateInfomation: {},
        area: "",
        areaDefaultValue: [],
        pagination: {
          showTotal: (total) => `共${total}条`,
          total: 0,
          current: 1,
          pageSize: 10,
        },
        pagination1: {
          showTotal: (total) => `共${total}条`,
          total: 0,
          current: 1,
          pageSize: 10,
        },
        pagination2: {
          showTotal: (total) => `共${total}条`,
          total: 0,
          current: 1,
          pageSize: 10,
        },
        updateId: "",
        detailsList: [],
        goodsShow: true,
        orderTime: "",
        Stadios: "",
        fromOrder:false
      };
    },
    async created() {
      // 如果是从订单那边(包含列表页与订单详情页)跳过来的 就不能删标签  不能编辑客户标签 不能改客户信息
      this.fromOrder = !!this.$route.query.source
      // console.log(this.fromOrder)
      this.getAreaList();

      await this.getUserInfo();
      await this.getCustomerBehaviorStatistics();
      this.$store.commit("setChangePersonalInfo", false);
      await this.getCouponData();
      await this.getOrderData();
      // 获取全部标签
      await this.getTagInfo()

    },
    methods: {
      /*==============================*/
      async getTagInfo() {
        let res = await this.$get(`customer/label/list`);
        if (res && res.returnCode === 1000){
          let allLabelList = res.dataInfo
          console.log(allLabelList)
          // 对比一下两个list  有的设为true 没有的设为false
          // 客户标签的回显
          // == 自定义标签==
          // 先找出所有自定义标签
          let tiaojianArr = allLabelList.filter((item) => {
            return item.systemDefault === 0
          })

          // console.log(tiaojianArr)
          // 对条件标签分类成 手动标签与条件标签
          this.handTag = tiaojianArr.filter((item) => {
            return item.labelType === 2
          })
          console.log('初选handTag', this.handTag)
          // 一开始都设为false
          this.handTag.forEach((item)=>{
            this.$set(item, "checked", false)
          })
          /* this.labelHandList.forEach((item)=>{
             this.$set(item, "checked", false)
           })*/

          for (let i of this.handTag){
            for (let j of this.labelHandList){
              if (i.id === j.id){
                console.log(i.id,j.id)
                this.$set(i, "checked", true)
                // this.$set(j, "checked", true)
              }
            }
          }

          this.handTagCopy  = deepCopy(this.handTag)
          console.log("全部hand标签:",this.handTag,"客户有的hand标签:",this.labelHandList)
        }

      },

      addTag() {
        this.visibleTag = true;
      },
      // 提交的修改的手动标签
      async handleOk1(e) {
        console.log(this.handTag)
        let idList = []
        this.handTag.forEach((item)=>{
          if ( item.checked ==true){
            idList.push (item.id)
          }
        })
        console.log(idList)
        await this.$post('customer/label/do',{customerId: this.updateId, idList})
        await this.getUserInfo()
        await this.getTagInfo()
        this.$message.success('修改成功!')
        this.visibleTag =false
        this.confirmLoading1 = false;
        /*   this.$confirm({
             title: '提示',
             content: "确认修改的标签",
             okText: '确认',
             cancelText: '取消',
             onOk: ()=> {
               this.$post('customer/label/do',{
                 customerId: this.updateId,
                 idList
               }).then(res => {
                 if (res && res.returnCode === 1000) {
                   console.log('***********',res)
                   this.$message.success('修改成功!')
                   //重新请求客户数据
                   this.getUserInfo()
                   this.getTagInfo()
                   this.visibleTag =false
                   this.confirmLoading1 = false;
                 }
               })
             }
           })*/


      },
      handleCancel1(e) {
        // console.log(this.handTagCopy)
        this.handTag =deepCopy(this.handTagCopy)
        this.visibleTag = false;
      },
      onSearch(value) {
        console.log(value);
      },
      // 单个标签的删除
      async tagBtnClickFunc(item,fromOrder) {
        // fromOrder 如果是从订单那边(包含列表页与订单详情页)跳过来的 就不能删标签
        if (fromOrder){
          return
        }
        console.log(item)
        await  this.$post('customer/label/undo',{customerId: this.updateId, idList:[item.id]})
        await  this.getUserInfo()
        this.$message.success('删除成功!')
        await  this.getTagInfo()
        /*   this.$confirm({
             title: '提示',
             content: "删除该标签吗",
             okText: '确认',
             cancelText: '取消',
             onOk: ()=> {
               this.$post('customer/label/undo',{
                 customerId: this.updateId,
                 idList:[item.id]
               }).then(res => {
                 if (res && res.returnCode === 1000) {
                   console.log('***********',res)
                   this.$message.success('删除成功!')
                   //重新请求客户数据

                 }
               })
             }
           })*/

      },

      handleChange(item) {
        // 每次点击把true的扔进列表 把false的移除列表
        console.log(item)
        // this.handTagCopy
        // let labelListCopy = deepCopy(this.labelHandList)
        if (item.checked == true) {
          // this.handTag.push(item)
          this.handTag.forEach((items)=>{
            if (items.id === item.id){
              this.$set(items,"checked",true)
            }
          })
        }

        if (item.checked == false) {
          this.handTag.forEach((items)=>{
            if (items.id === item.id){
              this.$set(items,"checked",false)
            }
          })
          /*  this.handTag  =   this.handTag.filter((items) => {
              return items.id !== item.id
            })*/
        }

        console.log("客户hand标签：", this.handTag)
      },
      /*==============================*/


      ...mapActions(["setChangePersonalInfo"]),
      getPopupContainer() {
        return (triggerNode) => triggerNode.parentNode.parentNode;
      },
      /**
       * 格式化秒
       * @param int  value 总秒数
       * @return string result 格式化后的字符串
       */
      //查看明细
      async getonlinerecorddetails(id) {
        let res = await this.$get("/customer/onlinerecorddetails/list", {
          recordId: id,
          // recordId: "418473210380550144",
          // current: 1,
          // size: 10,
        });
        if (res && res.returnCode == "1000") {
          console.log(res);
          this.detailsList = res.dataInfo.records || [];
        }
      },
      openInfo(record) {
        this.currentRecord = record;
        this.getonlinerecorddetails(record.id);
      },
      async getUserInfo() {

        let res = await this.$get(`/shop/customer/query`, {
          customerId: this.$route.query.id,
        });

        if (res && res.returnCode == "1000") {
          console.log(res,"labelList")
          this.labelList = res.dataInfo.labelList
          this.labelHandList = res.dataInfo.labelList.filter((item)=>{
            return item.systemDefault === 0 &&item.labelType === 2
          })
          if (res.dataInfo != null) {

            this.userInfo = res.dataInfo || {};
            this.updateId = this.userInfo.customerId;
            if (this.userInfo.area != "") {
              this.areaDefaultValue = this.userInfo.area.split("-");
              this.area = this.userInfo.area;
            }

            this.updateInfomation = {
              phoneNumber: this.userInfo.phoneNumber,
              customerName: this.userInfo.customerName,
              gender:
                this.userInfo.gender == null || this.userInfo.gender == ""
                  ? undefined
                  : this.userInfo.gender,
              birthday: this.userInfo.birthday,
            };

            this.updateInfo = {
              phoneNumber: this.userInfo.phoneNumber,
              customerName: this.userInfo.customerName,
              gender:
                this.userInfo.gender == null || this.userInfo.gender == ""
                  ? undefined
                  : this.userInfo.gender,
              birthday: this.userInfo.birthday,
            };

            if (this.updateInfo.birthday != "") {
              this.birthday = moment(this.updateInfo.birthday, "YYYY-MM-DD");
            } else {
              this.birthday = this.updateInfo.birthday;
            }
          }
          // console.log(this.birthday);
        }
      },
      dealAreaList(arr) {
        arr.forEach((item) => {
          if (item.children.length > 0) {
            this.dealAreaList(item.children);
          } else {
            delete item.children;
          }
        });
        return arr;
      },
      async getAreaList() {
        let res = await this.$get("area/tree", {});
        if (res && res.returnCode == "1000") {
          this.options = this.dealAreaList(res.dataInfo);
        }
      },
      //客户行为统计列表查询
      async getCustomerBehaviorStatistics() {
        let res = await this.$get(`/customer/onlinerecord/page`, {
          customerId: this.updateId,
          size: this.pagination.pageSize,
          current: this.pagination.current,
        });
        if (res && res.returnCode == "1000") {
          this.data2 = res.dataInfo.records || [];
          this.pagination.total = res.dataInfo.total;
          this.data2.forEach((l, i) => {
            l.recordDate =
              l.recordDate == "" || l.recordDate == null
                ? l.recordDate
                : l.recordDate.slice(0, 10);
            l.key = i + 1;
            l.timeFrame =
              (l.startTime == "" || l.startTime == null
                ? l.startTime
                : l.startTime.slice(11, 19)) +
              (l.endTime == "" || l.endTime == null
                ? ""
                : "~" + l.endTime.slice(11, 19));
          });
        }
      },
      tableChange(pagination) {
        if (pagination) {
          this.pagination.current = pagination.current;
          this.getCustomerBehaviorStatistics();
        }
      },
      tableChange1(pagination) {
        if (pagination) {
          this.pagination1.current = pagination.current;
          this.getOrderData();
        }
      },
      tableChange2(pagination) {
        if (pagination) {
          this.pagination2.current = pagination.current;
          this.getCouponData();
        }
      },
      addBlackList() {
        this.visible = true;
      },
      //移除黑名单
      removeBlackList() {
        this.$confirm({
          title: "移除黑名单",
          content: "移除黑名单后客户的限制行为可正常使用，是否确认移除",
          okText: "确认",
          cancelText: "取消",
          onOk() {
            return new Promise((resolve, reject) => {
              setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
              console.log("11111");
            }).catch(() => console.log("Oops errors!"));
          },
          onCancel() {},
        });
      },
      updateVipInfo() {
        this.visibleVIP = true;
        setTimeout(() => {
          this.$refs["updateInfomation"].validate((valid) => {
            if (valid) {
            } else {
            }
          });
        }, 100);
      },
      //移入黑名单
      handleOk(e) {
        this.confirmLoading = true;
        setTimeout(() => {
          this.visible = false;
          this.confirmLoading = false;
        }, 2000);
      },
      handleCancel(e) {
        console.log("Clicked cancel button");
        this.visible = false;
      },
      //修改基本信息
      async updateUserInfo() {
        this.$store.commit("setChangePersonalInfo", true);
        // console.log(this.updateInfo);
        let params = {
          id: this.updateId,
          ...this.updateInfo,
          area: this.area,
        };
        console.log(params);
        let res = await this.$post("/customer/update", params);
        if (res && res.returnCode == "1000") {
          this.$message.success("修改成功");
          this.getUserInfo();
        }
      },
      //提交修改信息
      handleOkVIP(e) {
        this.confirmLoadingVIP = true;
        setTimeout(() => {
          this.$refs["updateInfomation"].validate((valid) => {
            if (valid) {
              this.updateUserInfo();
              this.visibleVIP = false;
              this.confirmLoadingVIP = false;
            } else {
              this.confirmLoadingVIP = false;
              return false;
            }
          });
        }, 500);
      },
      handleCancelVIP(e) {
        this.updateInfo = JSON.parse(JSON.stringify(this.updateInfomation));
        this.visibleVIP = false;
      },
      //选择生日日期
      dateChange(date, dateString) {
        this.updateInfo.birthday = dateString;
      },
      onAreaChange(value) {
        if (value.length == 0) {
          this.area = "";
        } else {
          value.forEach((item) => {
            this.area += item + "-";
          });
          this.area = this.area.substring(0, this.area.length - 1);
        }
      },
      changeGoodsShow() {
        this.goodsShow = true;
      },
      changeApplyShow() {
        this.goodsShow = false;
      },
      //优惠券明细
      async getCouponData() {
        let res = await this.$get("/customer/coupons", {
          userId: this.updateId,
          size: this.pagination2.pageSize,
          current: this.pagination2.current,
          couponStatus: this.Stadios,
        });
        if (res && res.returnCode == "1000") {
          let dataInfo = res.dataInfo.records;
          dataInfo.forEach((item) => {
            item.receiveTime = item.getStartTime + "~" + item.getEndTime;
            item.effectiveTime = item.useStartTime + "~" + item.useEndTime;
          });
          this.data4 = res.dataInfo.records;
          console.log("优惠券明细", this.data4);
          this.pagination2.total = res.dataInfo.total;
        }
      },
      //获取商品订单
      async getOrderData() {
        let res = await this.$get("/order/transaction/user/page", {
          userId: this.updateId,
          size: this.pagination1.pageSize,
          current: this.pagination1.current,
          withinTime: this.orderTime,
        });
        if (res && res.returnCode == "1000") {
          if (res.dataInfo != null) {
            this.data3 = res.dataInfo.records;
            this.pagination1.total = res.dataInfo.total;
          }
        }
      },
      chooseStadios(value) {
        this.Stadios = value;
        this.getCouponData();
      },
      chooseOrderTime(value) {
        this.orderTime = value;
        this.getOrderData();
      },
      back() {
        this.$router.push({
          name: "CustomerList",
        });
      },
    },
  };
</script>

<style lang="less" scoped>
  .user-info {
    position: relative;
    .info-title {
      font-size: 14px;
      height: 50px;
      background: #f5f5f5;
      border-radius: 4px;
      line-height: 50px;
      padding-left: 30px;
      position: relative;
      &::before {
        content: "";
        display: inline-block;
        width: 3px;
        height: 16px;
        background: #016bff;
        border-radius: 2px;
        position: absolute;
        top: 17px;
        left: 20px;
      }
      &.title2,
      &.title3 {
        margin-top: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    .info-body {
      display: flex;
      margin-top: 15px;
      .info-table {
        flex: 1;
        margin-left: 30px;
        border-right: 1px solid #e8e8e8;
        border-bottom: 1px solid #e8e8e8;
        tr {
          border-top: 1px solid #e8e8e8;
          th,
          td {
            padding: 16px 16px;
            overflow-wrap: break-word;
            border-left: 1px solid #e8e8e8;
            color: rgba(0, 0, 0, 0.85);
            font-weight: 500;
            text-align: left;
          }
          th {
            background: #fafafa;
            // width: 20%;
          }
          td {
            color: rgba(0, 0, 0, 0.65);
            // width: 30%;
          }
        }
      }
    }
  }
  .ant-table-wrapper {
    margin-top: 20px;
  }
  /deep/.ant-modal-body {
    overflow: visible;
  }
  .detailsOne + .detailsOne {
    margin-top: 5px;
  }
  .detailsOne {
    white-space: nowrap;
    font-weight: bolder;
    color: #000;
    .dian {
      font-size: 18px;
    }
    .page {
      color: rgba(0, 0, 0, 0.55);
    }
  }
  .popBox {
    min-width: 200px;
    height: 90px;
    overflow-y: scroll;
  }
  .popBox1 {
    min-width: 200px;
    height: 90px;
  }
  /deep/.ant-list-empty-text {
    min-width: 200px;
    height: 90px;
    padding: 0;
  }
  .goodsBtn {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #eee;
    border-radius: 5px;
    color: rgba(0, 0, 0, 0.65);
    background-color: #fff;
    border-color: #d9d9d9;
    cursor: pointer;
  }
  .goodsActive {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #eee;
    border-radius: 5px;
    color: #40a9ff;
    background-color: #fff;
    border-color: #40a9ff;
    cursor: pointer;
  }
  .tagArea {
    margin: 15px 0 ;
    width: 100%;
    white-space: normal;
    background-color: #F5F5F5;
    padding: 15px;

  }
  // /deep/.anticon svg{
  //   color:#fff;
  // }
  /deep/.ant-tag-checkable{
    /*background-color: #b3d4fc;*/
    border-color:	#DCDCDC;
  }
  .ant-tag{
    font-size: 16px;
    margin: 5px;
  }
  .tags{
    position: relative;
    display: inline-block;
    width: 100px;

    padding: 7px 0;
    border-radius: 5px;
    background-color: #1890ff;
    color: #fff;

  }
  .imgs{
    position:absolute;
    top:0;
    right:0;
  }
</style>
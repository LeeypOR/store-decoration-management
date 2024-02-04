<template>
  <div class="user-manage">
    <permission authority="guest:manage:customerList">
      <div class="liveInfo">
        <div class="liveArea">
          <span class="liveTitle">实时概况</span
          ><span class="liveTime"
            >更新时间：{{ toDayInfo.statisticsDate || nowTime }}</span
          >
        </div>
        <div class="mainInfo">
          <div class="mainLeft">
            <div class="payMoney">
              <p style="color: #999; font-size: 14px">支付金额</p>
              <p style="color: #000; font-weight: bolder; font-size: 22px">
                ¥{{
                  toDayInfo.paymentAmount
                    ? ((toDayInfo.paymentAmount * 1) / 100).toFixed(2)
                    : 0
                }}
              </p>
              <p style="color: #999; font-size: 14px">
                昨日：¥{{
                  yesTodayInfo.paymentAmount
                    ? ((yesTodayInfo.paymentAmount * 1) / 100).toFixed(2)
                    : 0
                }}
              </p>
            </div>
            <div class="payNum">
              <p style="color: #999; font-size: 14px">支付人数</p>
              <p style="color: #000; font-weight: bolder; font-size: 22px">
                {{ toDayInfo.payNumbers || 0 }}
              </p>
              <p style="color: #999; font-size: 14px">
                昨日：{{ yesTodayInfo.payNumbers || 0 }}
              </p>
            </div>
            <div class="payPrice">
              <p style="color: #999; font-size: 14px">客单价</p>
              <p style="color: #000; font-weight: bolder; font-size: 22px">
                ¥{{
                  toDayInfo.unitRice
                    ? ((toDayInfo.unitRice * 1) / 100).toFixed(2)
                    : 0
                }}
              </p>
              <p style="color: #999; font-size: 14px">
                昨日：¥{{
                  yesTodayInfo.unitRice
                    ? ((yesTodayInfo.unitRice * 1) / 100).toFixed(2)
                    : 0
                }}
              </p>
            </div>
          </div>
          <div class="mainRight">
            <div class="visitor">
              <p style="color: #999; font-size: 14px">访客数</p>
              <p style="color: #000; font-weight: bolder; font-size: 22px">
                {{ toDayInfo.visitors || 0 }}
              </p>
              <p style="color: #999; font-size: 14px">
                昨日：{{ yesTodayInfo.visitors || 0 }}
              </p>
            </div>
            <div class="progressInfo">
              <div>
                <a-progress
                  class="progress"
                  type="circle"
                  :percent="percent"
                  :width="80"
                  :strokeWidth="13"
                  :showInfo="false"
                  strokeLinecap="square"
                  strokeColor="rgb(255,186,42)"
                />
              </div>
              <div style="margin-left: 20px">
                <div style="display: flex; align-items: center">
                  <span class="circleIcon"></span><span> 未购买用户</span>
                </div>
                <div style="display: flex; align-items: center">
                  <span
                    class="circleIcon"
                    style="background: rgb(255, 186, 42)"
                  ></span>
                  <span> 购买用户</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </permission>
    <search-table-form
      style="margin-top: 30px"
      :url="url"
      ref="searchtable"
      :columns="columns"
      :form="form"
      :xLength="xLength"
      :defaultParams="defaultParams"
    >
      <template slot="searchForm">
        <a-form layout="inline" :form="form">
          <a-form-item>
            <a-select v-model="selectName" style="width: 120px">
              <a-select-option value="phoneNumber"> 手机号 </a-select-option>
              <a-select-option value="customerName"> 姓名 </a-select-option>
              <a-select-option value="nickName"> 客户昵称 </a-select-option>
            </a-select>
            <a-input
              v-decorator="[selectName]"
              placeholder="请输入搜索关键字"
              autocomplete="off"
            >
            </a-input>
          </a-form-item>
        </a-form>
        <div style="position: absolute; right: 0; top: 24px">
          <!-- <a-button type="primary" @click="addTag"> 加标签 </a-button> -->
          <a-button type="primary" @click="clearFilter"> 清空筛选 </a-button>
          <a-button type="primary" @click="goFilter"> 高级筛选 </a-button>
        </div>
      </template>
      <template slot="oprationRow"> </template>
      <template slot="tableOperation" slot-scope="{ record }">
        <permission authority="guest:manage:customerList">
          <!-- <span
            class="text-primary pointer"
            @click="openInfo(record)"
            style="margin-right: 20px"
            >添加标签</span
          > -->
        </permission>
        <permission authority="guest:manage:customerList">
          <span class="text-primary pointer" @click="openInfo(record)"
            >查看详情</span
          >
        </permission>
      </template>
    </search-table-form>
    <a-modal
      class="formInline"
      title="高级筛选"
      :visible="visible"
      @cancel="closeModal"
      :width="800"
    >
      <a-form-model
        layout="inline"
        :model="formInline"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="上次消费时间">
          <a-date-picker
            v-model="consumptionStartTime"
            :disabled-date="disabledStartDate"
            format="YYYY-MM-DD"
            placeholder="开始日期"
            @openChange="handleStartOpenChange"
            :class="consumptionShow ? '' : 'buyTime'"
          />
          <span style="margin: 0 10px">至</span>
          <a-date-picker
            v-model="consumptionEndTime"
            :disabled-date="disabledEndDate"
            format="YYYY-MM-DD"
            placeholder="结束日期"
            :open="endOpen"
            @openChange="handleEndOpenChange"
            :class="consumptionShow ? '' : 'buyTime'"
          />
        </a-form-model-item>
        <a-form-model-item label="成为客户时间">
          <a-date-picker
            v-model="customerStartTime"
            :disabled-date="disabledStartDate1"
            format="YYYY-MM-DD"
            placeholder="开始日期"
            @openChange="handleStartOpenChange1"
            :class="BeconsumptionShow ? '' : 'buyTime'"
          />
          <span style="margin: 0 10px">至</span>
          <a-date-picker
            v-model="customerEndTime"
            :disabled-date="disabledEndDate1"
            format="YYYY-MM-DD"
            placeholder="结束日期"
            :open="endOpen1"
            @openChange="handleEndOpenChange1"
            :class="BeconsumptionShow ? '' : 'buyTime'"
          />
        </a-form-model-item>
        <!-- <a-form-model-item label="关键词">
          <a-input
            v-model="formInline.keywords"
            placeholder="手机号/微信昵称/姓名"
            allowClear
          />
        </a-form-model-item> -->
        <div class="chooseKeywords" style="margin: 20px 0; display: flex">
          <a-form layout="inline" :form="form">
            <a-form-item>
              <a-select v-model="selectName" style="width: 120px">
                <a-select-option value="phoneNumber"> 手机号 </a-select-option>
                <a-select-option value="customerName"> 姓名 </a-select-option>
                <a-select-option value="nickName"> 客户昵称 </a-select-option>
              </a-select>
              <a-input
                v-decorator="[selectName]"
                placeholder="请输入搜索关键字"
                autocomplete="off"
              >
              </a-input>
            </a-form-item>
          </a-form>
        </div>

        <a-form-model-item label="标签">
          <a-select placeholder="请选择" v-model="formInline.tag">
            <a-select-option
              v-for="(item, index) in allTagList"
              :key="index"
              :value="item.id"
              >{{ item.labelName }}</a-select-option
            >
          </a-select>
        </a-form-model-item>

        <a-form-model-item label="用户状态">
          <a-select placeholder="请选择" v-model="formInline.userStatus">
            <a-select-option value="2"> 全部状态 </a-select-option>
            <a-select-option value="1"> 正常 </a-select-option>
            <a-select-option value="0"> 黑名单 </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="购买次数">
          <div style="display: flex; align-items: center">
            <a-input-number
              :min="1"
              v-model="formInline.totalStartConsumptionTimes"
              @change="onBuytimeStart"
              :precision="0"
              :class="buyTimeShow ? '' : 'errInputNumber'"
            />
            <span :class="buyTimeShow ? 'textBox' : 'errtextBox'">次</span>
            <span class="line">-</span
            ><a-input-number
              :min="1"
              v-model="formInline.totalEndConsumptionTimes"
              @change="onBuytimeEnd"
              :precision="0"
              :class="buyTimeShow ? '' : 'errInputNumber'"
            />
            <span :class="buyTimeShow ? 'textBox' : 'errtextBox'">次</span>
          </div>
        </a-form-model-item>
        <a-form-model-item label="累计消费金额">
          <div style="display: flex; align-items: center">
            <a-input-number
              :min="1"
              v-model="formInline.consumptionStartAmount"
              @change="onMoneyStart"
              :precision="2"
              :class="buytotalShow ? '' : 'errInputNumber'"
            />
            <span :class="buytotalShow ? 'textBox' : 'errtextBox'">元</span
            ><span class="line">-</span
            ><a-input-number
              :min="1"
              v-model="formInline.consumptionEndAmount"
              @change="onMoneyEnd"
              :precision="2"
              :class="buytotalShow ? '' : 'errInputNumber'"
            />
            <span :class="buytotalShow ? 'textBox' : 'errtextBox'">元</span>
          </div>
        </a-form-model-item>
      </a-form-model>
      <template slot="footer">
        <a-button @click="handleCancel">清除筛选</a-button>
        <a-button type="primary" @click="handleOk">确认</a-button>
      </template>
    </a-modal>
    <a-modal
      title="选择标签(最多可选择17个标签)"
      :visible="visibleTag"
      :confirm-loading="confirmLoading1"
      @ok="handleOk1"
      @cancel="handleCancel1"
      :width="800"
      okText="确认"
      cancelText="取消"
      class="addTag"
    >
      <a-input-search
        placeholder="请输入标签名"
        enter-button="搜索"
        @search="onSearch"
      />
      <div class="tagArea"></div>
    </a-modal>
  </div>
</template>
<script>
import Permission from "../../../components/common/Permission.vue";
import SearchTableForm from "./components/SearchTableForm.vue";
import { mapActions, mapState } from "vuex";
import moment from "moment";
// import {findDictNameByValue, createOptionsByDict} from '@/utils/dict'
export default {
  name: "CustomerList",
  computed: {
    ...mapState({
      changePersonalInfo: (state) => state.changePersonalInfo,
    }),
  },
  data() {
    return {
      // identityTypeOptions: createOptionsByDict(4),
      url: "/shop/customer/filter",
      currentRecord: {},
      form: this.$form.createForm(this, { name: "table_search" }),
      columns: [
        {
          title: "用户ID",
          dataIndex: "customerId",
          key: "customerId",
          align: "center",
          width: "180px",
        },
        {
          title: "头像",
          dataIndex: "avatar",
          key: "avatar",
          align: "center",
          // width: "100px",
          customRender: (text, row) => {
            return <table-img src={text} />;
          },
        },
        {
          title: "客户昵称",
          dataIndex: "nickName",
          align: "center",
          key: "nickName",
          // width: "200px",
        },
        {
          title: "客户姓名",
          dataIndex: "customerName",
          align: "center",
          key: "customerName",
          // width: "200px",
        },
        {
          title: "手机号",
          dataIndex: "phoneNumber",
          align: "center",
          key: "phoneNumber",
          // width: "130px",
        },
        {
          title: "用户状态",
          align: "center",
          dataIndex: "userStatus",
          key: "userStatus",
          // width: "100px",
          customRender: (text, row) => {
            if (text == 0) {
              text = "黑名单";
            } else {
              text = "正常";
            }
            return text;
          },
        },
        {
          title: "会员等级",
          align: "center",
          dataIndex: "gradeName",
          key: "gradeName",
          // width: "100px",
          //：0：金粉会员，1：金星会员，2：金章会员，3：金牌会员，4：金勋会员
       /*   customRender: (text, row) => {
            if (text == 0) {
              text = "金粉会员";
            } else if (text == 1) {
              text = "金星会员";
            } else if (text == 2) {
              text = "金章会员";
            } else if (text == 3) {
              text = "金牌会员";
            } else if (text == 4) {
              text = "金勋会员";
            }
            return text;
          },*/
        },
        {
          title: "店铺名称",
          align: "center",
          dataIndex: "shopName",
          key: "shopName",
          // width: "100px",
        },
        {
          title: "客户渠道",
          align: "center",
          dataIndex: "customerChannel",
          key: "customerChannel",
          // width: "200px",
        },
        {
          title: "消费次数",
          align: "center",
          dataIndex: "totalConsumptionTimes",
          key: "totalConsumptionTimes",
          // width: "100px",
          sorter: (a, b) => a.totalConsumptionTimes - b.totalConsumptionTimes,
        },
        {
          title: "最近消费时间",
          align: "center",
          dataIndex: "latestConsumptionTime",
          key: "latestConsumptionTime",
          // width: "250px",
          sorter: (a, b) =>
            Date.parse(a.latestConsumptionTime) -
            Date.parse(b.latestConsumptionTime),
        },
        {
          title: "消费总额",
          align: "center",
          dataIndex: "totalConsumptionAmount",
          key: "totalConsumptionAmount",
          sorter: (a, b) => a.totalConsumptionAmount - b.totalConsumptionAmount,
          // width: "100px",
          customRender: (text, row) => {
            return (text = (text / 100).toFixed(2) + "元");
          },
        },
        {
          title: "注册时间",
          align: "center",
          dataIndex: "createDate",
          key: "createDate",
          customRender: (text, row) => {
            return (text = text.replace("T", " "));
          },
          // defaultSortOrder: "descend",
          sorter: (a, b) => Date.parse(a.createDate) - Date.parse(b.createDate),
          // width: "100px",
        },
        {
          title: "客户标签",
          dataIndex: "labelList",
          align: "center",
          key: "labelList",
          customRender: (text, row) => {
            console.log(text);
            if (text !== null) {
              if (row.labelList.length > 1) {
                return row.labelList[0].labelName + "等标签";
              } else if (row.labelList.length == 1) {
                return row.labelList[0].labelName;
              }
            } else {
              return "该客户暂时没有标签";
            }
          },
        },
        // {
        //   title: "浏览总时长",
        // align:'center',
        //   dataIndex: "browseTimes",
        //   key: "browseTimes",
        //   customRender(text, row) {
        //     return `${text}S`;
        //   },
        // },
        {
          title: "操作",
          align: "center",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" },
          fixed: "right",
        },
      ],
      percent: 75,
      selectName: "phoneNumber",
      visible: false,
      visibleTag: false,
      confirmLoading1: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      formInline: {
        totalStartConsumptionTimes: "",
        totalEndConsumptionTimes: "",
        consumptionStartAmount: "",
        consumptionEndAmount: "",
        // keywords: "",
        tag: undefined,
        userStatus: "2",
        consumptionStartTime: "",
        consumptionEndTime: "",
        customerStartTime: "",
        customerEndTime: "",
      },
      formInline1: {},
      consumptionStartTime: null,
      consumptionEndTime: null,
      customerStartTime: null,
      customerEndTime: null,
      consumptionStartTime1: null,
      consumptionEndTime1: null,
      customerStartTime1: null,
      customerEndTime1: null,
      endOpen: false,
      endOpen1: false,
      buyTimeShow: true,
      buytotalShow: true,
      consumptionShow: true,
      BeconsumptionShow: true,
      xLength: 2000,
      defaultParams: {},
      inputKeywords: "",
      nowTime: "",
      toDayInfo: "",
      yesTodayInfo: "",

      // 标签
      allTagList: [],
    };
  },
  components: {
    // UserInfo,
    SearchTableForm,
    Permission,
  },
  methods: {
    ...mapActions(["setChangePersonalInfo"]),
    limitDecimals(value) {
      return value.replace(/^(0+)|[^\d]+/g, "");
    },
    openInfo(record) {
      this.currentRecord = record;
      this.$router.push({
        name: "CustomerUserInfo",
        query: {
          id: record.customerId,
        },
      });
    },
    //实时概括
    async getLiveTodayInfo() {
      let res = await this.$get("customer/overview/query");
      if (res && res.returnCode == "1000") {
        if (res.dataInfo != null) {
          this.toDayInfo = res.dataInfo;
          this.yesTodayInfo = res.dataInfo.customerOverviewQueryModel;
          this.percent =
            ((res.dataInfo.purchasingUser * 1) /
              (res.dataInfo.purchasingUser * 1 +
                res.dataInfo.notPurchasingUser * 1)) *
            100;
        }
      }
    },
    goFilter() {
      const inputValue = this.form.getFieldsValue();
      this.inputKeywords = inputValue;
      this.formInline = JSON.parse(JSON.stringify(this.formInline1));
      this.consumptionStartTime = this.consumptionStartTime1;
      this.consumptionEndTime = this.consumptionEndTime1;
      this.customerStartTime = this.customerStartTime1;
      this.customerEndTime = this.customerEndTime1;
      this.visible = true;
    },
    closeModal() {
      this.form.setFieldsValue(this.inputKeywords);
      this.visible = false;
      // this.formInline = JSON.parse(JSON.stringify(this.formInline1));
      // this.consumptionStartTime = this.consumptionStartTime1;
      // this.consumptionEndTime = this.consumptionEndTime1;
      // this.customerStartTime = this.customerStartTime1;
      // this.customerEndTime = this.customerEndTime1;
    },
    clearFilter() {
      this.handleCancel();
      this.formInline1 = JSON.parse(JSON.stringify(this.formInline));
      this.consumptionStartTime1 = this.consumptionStartTime;
      this.consumptionEndTime1 = this.consumptionEndTime;
      this.customerStartTime1 = this.customerStartTime;
      this.customerEndTime1 = this.customerEndTime;
      this.defaultParams = this.formInline;
      let time = setTimeout(() => {
        let comfirmBtn = document.querySelector(".searchBtn");
        comfirmBtn.click();
        clearTimeout(time);
      }, 100);
    },
    addTag() {
      this.visibleTag = true;
    },
    formatTime(date) {
      if (!date && typeof date != "undefined" && date != 0) return date;
      let date1 = date._d;
      let y = date1.getFullYear();
      let m =
        date1.getMonth() + 1 > 9
          ? date1.getMonth() + 1
          : "0" + (date1.getMonth() + 1);
      let d = date1.getDate() > 9 ? date1.getDate() : "0" + date1.getDate();
      return y + "-" + m + "-" + d;
    },
    handleOk(e) {
      this.buyTimeShow = true;
      this.buytotalShow = true;
      this.consumptionShow = true;
      this.BeconsumptionShow = true;
      this.formInline.consumptionStartTime = this.formatTime(
        this.consumptionStartTime
      );
      this.formInline.customerStartTime = this.formatTime(
        this.customerStartTime
      );
      this.formInline.consumptionEndTime = this.formatTime(
        this.consumptionEndTime
      );
      this.formInline.customerEndTime = this.formatTime(this.customerEndTime);

      if (
        this.formInline.consumptionEndTime != null &&
        this.formInline.consumptionStartTime == null
      ) {
        this.$message.error("消费开始时间不能为空");
        this.consumptionShow = false;
      } else if (
        this.formInline.consumptionStartTime != null &&
        this.formInline.consumptionEndTime == null
      ) {
        this.$message.error("消费结束时间不能为空");
        this.consumptionShow = false;
      }

      if (
        this.formInline.customerEndTime != null &&
        this.formInline.customerStartTime == null
      ) {
        this.$message.error("成为客户开始时间不能为空");
        this.BeconsumptionShow = false;
      } else if (
        this.formInline.customerStartTime != null &&
        this.formInline.customerEndTime == null
      ) {
        this.$message.error("成为客户结束时间不能为空");
        this.BeconsumptionShow = false;
      }

      if (
        this.formInline.totalEndConsumptionTimes != "" &&
        this.formInline.totalStartConsumptionTimes == ""
      ) {
        this.$message.error("购买开始次数不能为空");
        this.buyTimeShow = false;
      } else if (
        this.formInline.totalStartConsumptionTimes != "" &&
        this.formInline.totalEndConsumptionTimes == ""
      ) {
        this.$message.error("购买结束次数不能为空");
        this.buyTimeShow = false;
      } else if (
        this.formInline.totalStartConsumptionTimes != "" &&
        this.formInline.totalEndConsumptionTimes != ""
      ) {
        if (
          this.formInline.totalStartConsumptionTimes >
          this.formInline.totalEndConsumptionTimes
        ) {
          this.$message.error("购买次数范围有误");
          this.buyTimeShow = false;
        }
      }

      if (
        this.formInline.consumptionEndAmount != "" &&
        this.formInline.consumptionStartAmount == ""
      ) {
        this.$message.error("累计消费开始金额不能为空");
        this.buytotalShow = false;
      } else if (
        this.formInline.consumptionStartAmount != "" &&
        this.formInline.consumptionEndAmount == ""
      ) {
        this.$message.error("累计消费结束金额不能为空");
        this.buytotalShow = false;
      } else if (
        this.formInline.consumptionStartAmount != "" &&
        this.formInline.consumptionEndAmount != ""
      ) {
        if (
          this.formInline.consumptionStartAmount >
          this.formInline.consumptionEndAmount
        ) {
          this.buytotalShow = false;
          this.$message.error("累计消费金额范围有误");
        }
      }
      if (
        this.buytotalShow == true &&
        this.buyTimeShow == true &&
        this.consumptionShow == true &&
        this.BeconsumptionShow == true
      )
        this.visible = false;
      this.formInline1 = JSON.parse(JSON.stringify(this.formInline));
      this.consumptionStartTime1 = this.consumptionStartTime;
      this.consumptionEndTime1 = this.consumptionEndTime;
      this.customerStartTime1 = this.customerStartTime;
      this.customerEndTime1 = this.customerEndTime;
      this.defaultParams = this.formInline;
      let time = setTimeout(() => {
        let comfirmBtn = document.querySelector(".searchBtn");
        comfirmBtn.click();
        clearTimeout(time);
      }, 100);
      console.log(this.defaultParams);
    },
    handleCancel(e) {
      this.form.resetFields();
      this.buyTimeShow = true;
      this.buytotalShow = true;
      this.formInline = {
        totalStartConsumptionTimes: "",
        totalEndConsumptionTimes: "",
        consumptionStartAmount: "",
        consumptionEndAmount: "",
        // keywords: "",
        tag: undefined,
        userStatus: "2",
        consumptionStartTime: "",
        consumptionEndTime: "",
        customerStartTime: "",
        customerEndTime: "",
      };
      this.consumptionStartTime = null;
      this.consumptionEndTime = null;
      this.customerStartTime = null;
      this.customerEndTime = null;
    },

    handleOk1(e) {
      this.confirmLoading1 = true;
      setTimeout(() => {
        this.visibleTag = false;
        this.confirmLoading1 = false;
      }, 2000);
    },
    handleCancel1(e) {
      this.visibleTag = false;
    },
    //上次消费时间
    disabledStartDate(consumptionStartTime) {
      const consumptionEndTime = this.consumptionEndTime;
      if (!consumptionStartTime || !consumptionEndTime) {
        return false;
      }
      return consumptionStartTime.valueOf() > consumptionEndTime.valueOf();
    },
    disabledEndDate(consumptionEndTime) {
      const consumptionStartTime = this.consumptionStartTime;
      if (!consumptionEndTime || !consumptionStartTime) {
        return false;
      }
      return consumptionStartTime.valueOf() >= consumptionEndTime.valueOf();
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true;
      }
    },
    handleEndOpenChange(open) {
      this.endOpen = open;
    },
    onBuytimeStart(value) {
      if (value == null) value = "";
      this.formInline.totalStartConsumptionTimes = value;
    },
    onBuytimeEnd(value) {
      if (value == null) value = "";
      this.formInline.totalEndConsumptionTimes = value;
    },
    onMoneyStart(value) {
      if (value == null) value = "";
      this.formInline.consumptionStartAmount = value;
    },
    onMoneyEnd(value) {
      if (value == null) value = "";
      this.formInline.consumptionEndAmount = value;
    },
    //成为客户时间
    disabledStartDate1(customerStartTime) {
      const customerEndTime = this.customerEndTime;
      if (!customerStartTime || !customerEndTime) {
        return false;
      }
      return customerStartTime.valueOf() > customerEndTime.valueOf();
    },
    disabledEndDate1(customerEndTime) {
      const customerStartTime = this.customerStartTime;
      if (!customerEndTime || !customerStartTime) {
        return false;
      }
      return customerStartTime.valueOf() >= customerEndTime.valueOf();
    },
    handleStartOpenChange1(open) {
      if (!open) {
        this.endOpen1 = true;
      }
    },
    handleEndOpenChange1(open) {
      this.endOpen1 = open;
    },
    onChange1(value) {
      console.log("changed", value);
    },
    //添加标签搜搜框
    onSearch(value) {
      console.log(value);
    },
    //获取当前时间
    getNowTime() {
      let time = new Date();
      return moment(time).format("YYYY-MM-DD HH:mm:ss");
    },
    // 获取全部标签列表
    async getTagInfo() {
      let res = await this.$get(`customer/label/list`);
      if (res && res.returnCode === 1000)
        // 全部标签
        this.allTagList = res.dataInfo;
      // console.log(this.clientTags)
      /*  this.allTagList.forEach((item) => {
        this.$set(item, "checked", false)
      })*/
      console.log("所有标签:", this.allTagList);
    },
  },
  beforeRouteEnter(to, from, next) {
    // console.log(from.path)
    if (from.path == "/customer/userInfo") {
      to.meta.isBack = true;
    } else {
      to.meta.isBack = false;
    }
    to.meta.keepAlive = true;
    next();
  },
  created() {
    this.nowTime = this.getNowTime();
    this.getTagInfo();
  },
  activated() {
    if (!this.$route.meta.isBack) {
      // this.clearFilter(); /*清空查询条件*/
      let oRest = document.querySelector(".resetBtn");
      oRest.click();
      this.nowTime = this.getNowTime();
      this.getLiveTodayInfo();
    } else {
      // this.$route.meta.isBack = false;
      if (this.changePersonalInfo == true) {
        this.$refs.searchtable.handleSubmit();
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("setChangePersonalInfo", false);
    next();
  },
  mounted: function () {
    document.addEventListener("click", (e) => {
      if (e.target.classList[0] == "resetBtn") {
        this.handleCancel();
        this.formInline1 = JSON.parse(JSON.stringify(this.formInline));
        this.consumptionStartTime1 = this.consumptionStartTime;
        this.consumptionEndTime1 = this.consumptionEndTime;
        this.customerStartTime1 = this.customerStartTime;
        this.customerEndTime1 = this.customerEndTime;
        this.defaultParams = {};
      }
    });
  },
};
</script>
<style lang="less" scoped>
.liveArea {
  .liveTitle {
    font-size: 18px;
    color: #000;
    font-weight: bolder;
    margin-right: 10px;
  }
  .liveTime {
    font-size: 14px;
    color: #999;
  }
}
.mainInfo {
  display: flex;
  width: 100%;
  margin-top: 20px;
  .mainLeft {
    display: flex;
    width: 50%;
    justify-content: space-between;
    margin-right: 100px;
    .payMoney,
    .payNum,
    .payPrice {
      p {
        text-align: center;
        margin: 0;
      }
      p + p {
        margin-top: 10px;
      }
    }
  }
  .mainRight {
    display: flex;
    flex-grow: 1;
    padding-left: 30px;
    justify-content: space-between;
    border-left: 1px solid #999;
    .visitor {
      p {
        text-align: center;
        margin: 0;
      }
      p + p {
        margin-top: 10px;
      }
    }
  }
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
.errtextBox {
  display: inline-block;
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border: 1px solid red;
  margin-left: 0px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  color: red;
}
.line {
  margin: 0 10px;
}
/deep/ .progress {
  .ant-progress-circle-trail {
    stroke: rgb(3, 206, 122) !important;
  }
}
.liveInfo {
  padding: 10px 30px 30px;
  background: #eee;
  border-radius: 8px;
}
.circleIcon {
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: rgb(3, 206, 122);
}
.progressInfo {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.tagArea {
  width: 100%;
  min-height: 100px;
  padding: 20px;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  margin-top: 20px;
}
/deep/.ant-form-item-children {
  display: flex;
}
/deep/.search-form {
  display: flex !important;
  position: relative;
}
.ant-select {
  margin-right: 10px;
}
/deep/.ant-btn {
  margin-top: 0 !important;
  margin-right: 20px;
}
/deep/.ant-form-item {
  display: flex;
  align-items: center;
}
.ant-form-item + .ant-form-item {
  margin-top: 20px;
}
/deep/.ant-calendar-picker {
  line-height: unset;
}
/deep/.ant-form-item-label {
  width: 100px;
}
/deep/.ant-select-selection {
  width: 100px;
}
.formInline {
  /deep/.ant-select-selection {
    width: 190px;
  }
}
.chooseKeywords {
  /deep/.ant-select-selection {
    width: 90px;
    border: none;
  }
  /deep/.ant-select {
    width: unset !important;
  }
}
/deep/.ant-input-number {
  border-right: none;
  border-top-right-radius: unset;
  border-bottom-right-radius: unset;
}
/deep/.ant-modal-footer {
  padding: 20px 16px;
  div {
    display: flex;
    justify-content: center;
  }
}
/deep/.ant-modal-body {
  padding-left: 90px;
}
/deep/.ant-input-group {
  width: 300px !important;
  float: right !important;
}
/deep/.errInputNumber {
  border-color: red;
}
.buyTime {
  /deep/.ant-input {
    border: 1px solid red !important;
  }
  /deep/.ant-input::-webkit-input-placeholder {
    color: rgba(255, 0, 0, 0.514);
  }
}
/deep/.resetBtn {
  display: none !important;
}
</style>
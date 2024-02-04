<template>
  <!-- destroyOnClose仅仅是清除了模态框里的dom，但是pagemodal这个组件里的数值没有清楚，导致初始化异常 -->
  <a-modal
    class="choose_url"
    width="720px"
    title="页面"
    :visible="visible"
    :destroyOnClose="true"
    :maskClosable="false"
    :keyboard="false"
    @cancel="closeModal"
    :confirmLoading="confirmLoading"
  >
    <template slot="footer">
      <a-button key="back" @click="closeModal"> 取消 </a-button>
      <a-button key="submit" type="primary" @click="handleSubmit">
        确定
      </a-button>
    </template>
    <a-tabs
      v-model="tabIndex"
      :tabBarGutter="0"
      :size="'small'"
      @change="changePageTab"
      v-if="showType == 1"
    >
      <a-tab-pane
        v-if="defaultTabs.includes('ARTICLES')"
        key="ARTICLES"
        tab="文章"
      >
        <!-- <ShopTable></ShopTable> -->
        <a-table
          rowKey="id"
          :row-selection="rowSelection"
          :columns="articleColumns"
          :data-source="articleList"
          :pagination="pagination0"
          :childrenColumnName="''"
          @change="tableChange0"
          :loading="tableLoading"
        ></a-table>
      </a-tab-pane>
      <a-tab-pane
        v-if="defaultTabs.includes('MSPAGE')"
        key="MSPAGE"
        tab="微页面"
      >
        <!-- <ShopTable></ShopTable> -->
        <a-table
          rowKey="id"
          :row-selection="rowSelection"
          :columns="columns"
          :data-source="pageList"
          :pagination="pagination1"
          :childrenColumnName="''"
          @change="tableChange1"
          :loading="tableLoading"
        ></a-table>
      </a-tab-pane>
      <a-tab-pane v-if="defaultTabs.includes('2')" key="2" tab="系统页面">
        <a-table
          rowKey="id"
          :row-selection="rowSelection"
          :columns="columns"
          :data-source="systemPageArr"
        ></a-table>
      </a-tab-pane>
      <a-tab-pane
        v-if="defaultTabs.includes('CLASSIFY')"
        key="CLASSIFY"
        tab="分类页面"
      >
        <p style="color: #999; font-size: 14px">
          注意：已被设置为跳转页面的分类页面会被禁选，避免出现多级导航结构
        </p>
        <a-table
          rowKey="id"
          :row-selection="rowSelection"
          :columns="columns"
          :data-source="pageList"
          :pagination="pagination3"
          @change="tableChange3"
          :loading="tableLoading"
        ></a-table>
      </a-tab-pane>
      <a-tab-pane v-if="defaultTabs.includes('GOODS')" key="GOODS" tab="商品">
        <a-table
          rowKey="id"
          :row-selection="rowSelection"
          :columns="columns"
          :data-source="pageList"
          :pagination="pagination2"
          @change="tableChange2"
          :loading="tableLoading"
        />
      </a-tab-pane>
      <a-tab-pane
        v-if="defaultTabs.includes('GOODS_GROUP')"
        key="GOODS_GROUP"
        tab="商品分组"
      >
        <a-table
          :row-selection="rowSelection"
          rowKey="id"
          :columns="columns"
          :data-source="pageList"
          :pagination="false"
          :loading="tableLoading"
          @change="tableChange"
        />
      </a-tab-pane>
      <a-tab-pane
        v-if="defaultTabs.includes('WXMAID')"
        key="WXMAID"
        tab="其它小程序"
      >
        <a-table
          :row-selection="rowSelection"
          rowKey="id"
          :columns="miniColumns"
          :data-source="pageList"
        >
          <div slot="opration" slot-scope="text, record">
            <a-input
              placeholder="请输入链接地址"
              @change="inputAddress($event, record)"
              :style="{
                border: record.active ? '1px solid red' : '',
              }"
            />
          </div>
        </a-table>
      </a-tab-pane>
      <a-tab-pane
        v-if="defaultTabs.includes('lotteryPage')"
        key="lotteryPage"
        tab="抽奖页面"
      >
        <a-table
          :row-selection="rowSelection"
          rowKey="id"
          :columns="lotteryColumns"
          :data-source="pageList"
          :pagination="pagination5"
          :loading="tableLoading"
          @change="tableChange5"
        />
      </a-tab-pane>
      <a-input-search
        v-if="checkSearchInput(tabIndex)"
        slot="tabBarExtraContent"
        placeholder="请输入搜索内容"
        style="width: 200px"
        v-model="searchName"
        @search="onSearch"
      />
    </a-tabs>
    <a-table
      rowKey="id"
      :row-selection="rowSelection"
      :columns="columns2"
      :data-source="pageList"
      :pagination="pagination4"
      :childrenColumnName="''"
      @change="tableChange4"
      :loading="tableLoading"
      v-if="showType == 2"
    >
      <span slot="remark" slot-scope="text" v-html="text"></span>
      <div slot="payRuleResponseList" slot-scope="text">
        <p v-for="(item, index) in text" :key="index" class="cardPrice">
          {{ item.validPeriodUnit | dealDate }}个月 ¥{{
            dealPrice(item.price * 1)
          }}
        </p>
      </div>
      <div slot="isEnabled" slot-scope="text, record">
        <p>享受会员价</p>
        <p v-if="record.consumptionDiscount">
          商品享受{{ record.consumptionDiscount }}折
        </p>
        <p v-if="record.integralRatio">{{ record.integralRatio }}倍积分回馈</p>
        <p v-if="record.giveAwayGoods == 1">赠送商品</p>
        <p v-if="record.couponBenefits == 1">赠送优惠券</p>
      </div>
    </a-table>
  </a-modal>
</template>

<script>
import { createOptionsByDict, findDictListByType } from "@/utils/dict";
import { mapState } from "vuex";
// import { timers } from "public/UEditor/third-party/jquery-1.10.2";
export default {
  name: "PageModal",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    pageModelId: {
      type: String,
      default: "",
    },
    pageIndex: {
      type: String,
      default: "MSPAGE",
    },
    // 控制tab的显示，默认除文章外全显示。ARTICLES 文章; MSPAGE 微页面; 2 系统页面; CLASSIFY 分类页面; GOODS 全部商品; GOODS_GROUP 商品分组  WXMAID 其它小程序  lotteryPage 抽奖页面
    defaultTabs: {
      type: Array,
      default() {
        return ["MSPAGE", "2", "GOODS", "WXMAID", "GOODS_GROUP", "lotteryPage"];
      },
    },
    // 已选择的id
    chooseIds: {
      type: Array,
      default() {
        return [];
      },
    },
    showType: {
      type: String,
      default: "1",
    },
  },
  filters: {
    dealDate(item) {
      switch (item) {
        case 1:
          return "12";
        case 2:
          return "3";
        case 3:
          return "1";
      }
    },
  },
  created() {},
  data() {
    return {
      selectedRowsInfo: {}, // 选中的页面信息
      loading: false,
      confirmLoading: false,
      tableLoading: false,
      tabIndex: "MSPAGE",
      articleColumns: [
        {
          title: "文章标题",
          width: 300,
          dataIndex: "groupName",
          key: "groupName",
        },
        {
          title: "文章类型",
          dataIndex: "articleType",
          key: "articleType",
          customRender: (text) => {
            let res = "";
            if (text == 1) {
              res = "公众号文章";
            } else if (text == 2) {
              res = "小程序文章";
            } else if (text == 3) {
              res = "微页面";
            }
            return res;
          },
        },
      ],
      miniColumns: [
        {
          title: "标题",
          dataIndex: "groupName",
          key: "groupName",
        },
        {
          title: "小程序ID",
          dataIndex: "id",
          key: "id",
        },
        {
          title: "小程序链接地址",
          dataIndex: "opration",
          key: "opration",
          scopedSlots: { customRender: "opration" },
        },
      ],
      articleList: [],
      columns: [
        {
          title: "标题",
          dataIndex: "groupName",
          key: "groupName",
        },
        {
          title: "创建时间",
          dataIndex: "createDate",
          key: "createDate",
          // customRender(text, row) {
          //   return (text = row.pageInfo.createDate);
          // },
        },
      ],
      columns1: [
        {
          title: "标题",
          dataIndex: "groupName",
          key: "groupName",
        },
        {
          title: "创建时间",
          dataIndex: "createDate",
          key: "createDate",
        },
      ],
      columns2: [
        {
          title: "付费会员名称",
          dataIndex: "cardName",
          key: "cardName",
          width: "160px",
        },
        {
          title: "说明",
          dataIndex: "remark",
          key: "remark",
          scopedSlots: { customRender: "remark" },
        },
        {
          title: "定价",
          dataIndex: "payRuleResponseList",
          key: "payRuleResponseList",
          scopedSlots: { customRender: "payRuleResponseList" },
          width: "135px",
        },
        {
          title: "会员权益",
          dataIndex: "isEnabled",
          key: "isEnabled",
          scopedSlots: { customRender: "isEnabled" },
          width: "123px",
        },
      ],
      goodsColumns: [
        {
          title: "标题",
          dataIndex: "goodsName",
          key: "goodsName",
        },
        {
          title: "创建时间",
          dataIndex: "createDate",
          key: "createDate",
        },
      ],
      lotteryColumns: [
        {
          title: "活动名称",
          dataIndex: "activityName",
          key: "activityName",
        },
        {
          title: "活动类型",
          dataIndex: "lotteryType",
          width: 125,
          key: "lotteryType",
          customRender: (text, record) => {
            if (text == 1) {
              text = "盲盒抽奖";
            }
            return text;
          },
        },
        {
          title: "状态",
          dataIndex: "activityStatus",
          width: 125,
          key: "activityStatus",
          customRender: (text, record) => {
            if (text == 1) {
              text = "未开始";
            } else if (text == 2) {
              text = "进行中";
            } else if (text == 3) {
              text = "已结束 ";
            }
            return text;
          },
        },
        {
          title: "创建时间",
          dataIndex: "createDate",
          key: "createDate",
        },
      ],
      /**
       * 个人中心： PERSONALCENTER
       *购物车：SHOPPINGCAR
       *全部商品：ALLGOODS
       *分类页面： CATEGORYPAGE
       *我的方案：MYPLAN
       */
      systemPageDict: createOptionsByDict("SYSTEM_PAGE"),
      systemPageArr: [],

      miniDataList: createOptionsByDict("WXMAID"),

      goodsList: [], // 商品列表
      selectedRowKeys: [],
      pageList: [],

      pagination: {
        showQuickJumper: true,
        total: 0,
        current: 1,
        pageSize: 10,
        showTotal: (total) => `共${total}条`,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100", "200"],
      },
      pagination0: {
        showQuickJumper: true,
        total: 0,
        current: 1,
        pageSize: 10,
        showTotal: (total) => `共${total}条`,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100", "200"],
      },
      pagination1: {
        showQuickJumper: true,
        total: 0,
        current: 1,
        pageSize: 10,
        showTotal: (total) => `共${total}条`,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100", "200"],
      },
      pagination2: {
        showQuickJumper: true,
        total: 0,
        current: 1,
        pageSize: 10,
        showTotal: (total) => `共${total}条`,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100", "200"],
      },
      pagination3: {
        showQuickJumper: true,
        total: 0,
        current: 1,
        pageSize: 10,
        showTotal: (total) => `共${total}条`,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100", "200"],
      },
      pagination4: {
        showQuickJumper: true,
        total: 0,
        current: 1,
        pageSize: 10,
        showTotal: (total) => `共${total}条`,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100", "200"],
      },
      pagination5: {
        showQuickJumper: true,
        total: 0,
        current: 1,
        pageSize: 10,
        showTotal: (total) => `共${total}条`,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100", "200"],
      },
      searchName: "",
      disableId: [],
    };
  },

  computed: {
    rowSelection() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        type: "radio",
        onChange: this.onSelectChange,
        // getCheckboxProps: (record) => ({
        //   props: { disabled: this.arr.some((item) => item.id === record.id) },
        // }),
        getCheckboxProps: this.getCheckboxProps,
      };
    },

    ...mapState({
      userInfo: (state) => state.userInfo || {},
    }),
  },

  watch: {
    visible(value) {
      console.log(value, "value");
      this.disableId = [];
      if (this.pageModelId != "") {
        this.selectedRowKeys = [this.pageModelId];
      } else {
        this.selectedRowKeys = [];
      }
      if (value) {
        if (this.showType == 1) {
          if (this.defaultTabs.includes(this.pageIndex)) {
            this.tabIndex = this.pageIndex || "MSPAGE";
          } else {
            this.tabIndex = "2";
          }
          this.getPageArr();
          if (this.tabIndex == "CLASSIFY") {
            if (this.$route.query.pageId) {
              this.disableId.push(this.$route.query.pageId);
            }
          }
          if (this.tabIndex == "ARTICLES") {
            this.disableId = [...this.disableId, ...this.chooseIds];
            this.disableId.splice(
              this.disableId.findIndex(
                (chooseId) => chooseId == this.pageModelId
              ),
              1
            );
          }
        } else {
          this.getCardList();
        }
      }
    },
  },

  methods: {
    // 判断搜索框是否显示
    checkSearchInput(tab) {
      let show = false;
      // let searchTab = [ "ARTICLES", "MSPAGE", "CLASSIFY", "GOODS" ]
      let searchTab = ["ARTICLES", "MSPAGE", "GOODS", "lotteryPage"];
      searchTab.includes(tab) ? (show = true) : (show = false);
      return show;
    },
    //处理价格
    dealPrice(item) {
      return item.toFixed(2);
    },
    changePageTab(key) {
      console.log("changePageTab", key);
      // if (this.tabIndex == key) return
      // this.tabIndex = key
      this.disableId = [];
      this.searchName = "";
      this.selectedRowKeys = [];
      this.pageList = [];
      if (key == "CLASSIFY") {
        if (this.$route.query.pageId) {
          this.disableId.push(this.$route.query.pageId);
        }
      }
      this.getPageArr();
    },
    tableChange(pagination) {
      if (pagination) {
        this.pagination.current = pagination.current;
        this.pagination.pageSize = pagination.pageSize;
        this.getGoodsGroup();
      }
    },
    tableChange0(pagination0) {
      if (pagination0) {
        this.pagination0.current = pagination0.current;
        this.pagination0.pageSize = pagination0.pageSize;
        this.getArticles();
      }
    },
    tableChange1(pagination1) {
      if (pagination1) {
        this.pagination1.current = pagination1.current;
        this.pagination1.pageSize = pagination1.pageSize;
        this.getMicroPages();
      }
    },
    tableChange2(pagination2) {
      if (pagination2) {
        this.pagination2.current = pagination2.current;
        this.pagination2.pageSize = pagination2.pageSize;
        this.getAllGoods();
      }
    },
    tableChange3(pagination3) {
      if (pagination3) {
        this.pagination3.current = pagination3.current;
        this.pagination3.pageSize = pagination3.pageSize;
        this.getClassifyList();
      }
    },
    tableChange4(pagination4) {
      if (pagination4) {
        this.pagination4.current = pagination4.current;
        this.pagination4.pageSize = pagination4.pageSize;
        this.getCardList();
      }
    },
    tableChange5(pagination5) {
      if (pagination5) {
        this.pagination5.current = pagination5.current;
        this.pagination5.pageSize = pagination5.pageSize;
        this.getLotteryPage();
      }
    },
    // 获取页面数组
    getPageArr() {
      console.log("getPageArr", this.tabIndex);
      this.tableLoading = true;
      switch (this.tabIndex) {
        case "ARTICLES": // 文章
          this.getArticles();
          return;
        case "MSPAGE": // 微页面
          this.getMicroPages();
          return;
        case "2": // 系统分组
          this.getSystemPage();
          return;
        case "CLASSIFY": // 分类页面
          this.getClassifyList();
          return;
        case "GOODS": // 商品列表
          this.getAllGoods();
          return;
        case "GOODS_GROUP": // 商品分组
          this.getGoodsGroup();
          return;
        case "WXMAID": // 其它小程序
          this.getMIniData();
          return;
        case "lotteryPage": // 抽奖页面
          this.getLotteryPage();
          return;
      }
    },
    // 获取文章
    async getArticles() {
      this.searchParams = {
        current: this.pagination0.current,
        size: this.pagination0.pageSize,
        articleTitle: this.searchName,
      };
      let res = await this.$get(
        "/articles/page",
        { ...this.searchParams },
        { baseURL: `${location.origin}/goldenhome/decoration/admin` }
      );
      this.tableLoading = false;
      if (res && res.returnCode === 1000) {
        this.pagination0.total = res.dataInfo.total;
        const record = res.dataInfo.records;
        record.forEach((item) => {
          this.$set(item, "groupName", item.articleTitle);
        });
        this.articleList = record;
      }
    },
    // 获取微页面
    async getMicroPages() {
      this.searchParams = {
        current: this.pagination1.current,
        size: this.pagination1.pageSize,
        pageName: this.searchName,
        pageStatus: 1,
      };
      let res = await this.$get(
        "/page/ms/page",
        { ...this.searchParams },
        { baseURL: `${location.origin}/goldenhome/decoration/admin` }
      );
      this.tableLoading = false;
      if (res && res.returnCode === 1000) {
        const record = res.dataInfo.records;
        this.pagination1.total = res.dataInfo.total;
        record.forEach((item) => {
          this.$set(item, "groupName", item.pageInfo.pageName);
        });
        console.log("record", record);
        const arr = [];
        record.forEach((item) => {
          arr.push(item.pageInfo);
        });
        arr.forEach((item) => {
          item.groupName = item.pageName;
        });
        this.pageList = arr;
      }
    },

    // 获取系统页面
    getSystemPage() {
      let _this = this;
      _this.systemPageArr = [];
      this.systemPageDict.forEach((item) => {
        let flag = {};
        flag.id = item.value;
        flag.groupName = item.label;
        flag.createDate = "2021-06-18 15:26:00";
        _this.systemPageArr.push(flag);
      });
    },

    //获取其它小程序
    getMIniData() {
      let _this = this;
      _this.pageList = [];
      this.miniDataList.forEach((item) => {
        let flag = {};
        flag.active = false;
        flag.id = item.value;
        flag.groupName = item.label;
        flag.address = "";
        flag.createDate = "2021-06-18 15:26:00";
        _this.pageList.push(flag);
      });
      //
    },
    //获取抽奖页面
    async getLotteryPage() {
      console.log(this.searchParams, "0000000");
      this.searchParams = {
        current: this.pagination5.current,
        size: this.pagination5.pageSize,
        activityName: this.searchName,
      };
      let res = await this.$get(
        "goldenhome/gh/lottery/admin_/lottery/activity/page",
        { ...this.searchParams }
      );
      this.tableLoading = false;
      if (res && res.returnCode == 1000) {
        res.dataInfo.records.forEach((item) => {
          this.$set(item, "groupName", item.activityName);
        });
        this.pageList = res.dataInfo.records;
        this.pagination5.total = res.dataInfo.total;
      }
    },

    // 获取商品列表 -- 获取所有商品
    async getAllGoods() {
      this.searchParams = {
        current: this.pagination2.current,
        size: this.pagination2.pageSize,
        goodsName: this.searchName,
        goodsStatus: 2,
      };
      let res = await this.$get("/goods/page", {
        categoryLevel: 1,
        categoryName: "",
        ...this.searchParams,
      });
      this.tableLoading = false;
      if (res && res.returnCode === 1000) {
        res.dataInfo.records.forEach((item) => {
          this.$set(item, "groupName", item.goodsName);
        });
        this.pageList = res.dataInfo.records;
        this.pagination2.total = res.dataInfo.total;
      }
    },
    // 获取分类页面
    async getClassifyList() {
      this.searchParams = {
        current: this.pagination3.current,
        size: this.pagination3.pageSize,
        pageTitle: this.searchName,
        // pageStatus: '',
      };
      let res = await this.$get(
        "/goods/classification/page",
        {
          ...this.searchParams,
        },
        { baseURL: `${location.origin}/goldenhome/decoration/admin` }
      );
      this.tableLoading = false;
      if (res && res.returnCode === 1000) {
        const record = res.dataInfo.records;
        this.pagination3.total = res.dataInfo.total;
        record.forEach((item) => {
          this.$set(item, "groupName", item.pageTitle);
        });
        // console.log("record", record);
        const arr = [];
        record.forEach((item) => {
          arr.push(item);
          if (item.linkCount && item.linkCount == 2) {
            this.disableId.push(item.id);
          }
        });
        arr.forEach((item) => {
          item.groupName = item.pageTitle;
        });
        this.pageList = arr;
      }
    },
    // 获取商品分组
    async getGoodsGroup() {
      // let res = await this.$get(`/goods/group/listTree`, {
      //   shopId: this.userInfo.shopId,
      // });
      this.searchParams = {
        // groupName: this.searchName,
        groupStatus: 2,
      };
      let res = await this.$get(`/goods/group/listTree`, this.searchParams);
      if (res && res.returnCode == "1000") {
        console.log(res);
        this.tableLoading = false;
        // let goodsGroupList = res.dataInfo.goodsGroupList || [];
        // let systemGroupList = res.dataInfo.systemGroupList[0].children.slice(0);
        // this.pageList = systemGroupList.concat(goodsGroupList);
        // console.log(this.pageList);
        // this.pageList = res.dataInfo.records;
        // this.pagination.total = res.dataInfo.total;
        const { dataInfo } = res;
        this.pageList = dataInfo.goodsGroupList.filter((item) => {
          return item.groupStatus == 1;
        });
      } else {
        this.tableLoading = false;
      }
    },
    // 获取付费 会员信息
    async getCardList() {
      let res = await this.$get(`goldenhome/member/admin_/member/card/page`, {
        size: this.pagination4.pageSize,
        current: this.pagination4.current,
        isEnabled: 1,
      });
      if (res && res.returnCode == 1000) {
        this.tableLoading = false;
        this.pageList = res.dataInfo.records;
        this.pagination4.total = res.dataInfo.total;
      } else {
        this.tableLoading = false;
      }
    },
    handleSubmit() {
      if (this.showType == 1) {
        this.pageList.forEach((item) => {
          if (item.id == this.selectedRowKeys[0]) {
            this.selectedRowsInfo = item;
          }
        });
        let param = {
          id: this.selectedRowsInfo.id,
          name: this.selectedRowsInfo.groupName,
          type: this.tabIndex,
          url: "",
        };
        if (this.tabIndex == "2") {
          param.type = this.selectedRowsInfo.id;
        }
        if (this.tabIndex == "WXMAID") {
          console.log(this.selectedRowsInfo);
          if (this.selectedRowsInfo.address == "") {
            this.pageList.forEach((item) => {
              item.active = false;
            });
            this.$message.error("跳转地址不能为空");
            return;
          } else {
            this.pageList.forEach((item, index) => {
              if (item.id == this.selectedRowsInfo.id) {
                item.active = true;
                this.$set(this.pageList, index, item);
              }
            });
            param.url = this.selectedRowsInfo.address;
          }
        }
        console.log(param);
        this.submitParams(param);
      } else if (this.showType == 2) {
        this.pageList.forEach((item) => {
          if (item.id == this.selectedRowKeys[0]) {
            this.selectedRowsInfo = item;
          }
        });
        let param = {
          name: this.selectedRowsInfo.cardName,
          id: this.selectedRowsInfo.id,
        };
        this.submitParams(param);
      }
    },

    onSearch(value) {
      console.log(value);
      this.searchName = value;
      this.pagination.pageSize = 10;
      this.pagination.current = 1;
      // "ARTICLES", "MSPAGE", "GOODS", "GOODS_GROUP"
      switch (this.tabIndex) {
        case "ARTICLES":
          this.getArticles();
          break;
        case "MSPAGE":
          this.getMicroPages();
          break;
        case "CLASSIFY":
          this.getClassifyList();
          break;
        case "GOODS":
          this.getAllGoods();
          break;
        case "GOODS_GROUP":
          this.getGoodsGroup();
        case "lotteryPage": // 抽奖页面
          this.getLotteryPage();
          break;
      }
    },

    onSelectChange(selectedRowKeys, selectedRows) {
      console.log("selectedRowKeys changed: ", selectedRows);
      // 修复已选中当时样式未选中的问题。
      if (this.tabIndex == "WXMAID") {
        this.pageList.forEach((item) => {
          item.active = false;
        });
        this.$set(this.pageList, this.pageList);
      }
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRowsInfo = selectedRows[0];
    },
    getCheckboxProps(record) {
      return {
        props: {
          // disabled: record.id === "450339775862276096",
          disabled: this.disableId.some((item) => {
            return record.id === item;
          }),
        },
      };
    },
    submitParams(param) {
      console.log(param);
      this.searchName = "";
      this.tabIndex = "MSPAGE";
      this.pagination = {
        showQuickJumper: true,
        total: 0,
        current: 1,
        pageSize: 10,
        showTotal: (total) => `共${total}条`,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100", "200"],
      };
      this.pagination1 = {
        showQuickJumper: true,
        total: 0,
        current: 1,
        pageSize: 10,
        showTotal: (total) => `共${total}条`,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100", "200"],
      };
      this.pagination2 = {
        showQuickJumper: true,
        total: 0,
        current: 1,
        pageSize: 10,
        showTotal: (total) => `共${total}条`,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100", "200"],
      };
      this.selectedRowsInfo.address == "";
      this.$emit("confirm", param);
    },
    // 取消  关闭模态框
    closeModal() {
      this.searchName = "";
      this.tabIndex = "MSPAGE";
      this.pagination = {
        showQuickJumper: true,
        total: 0,
        current: 1,
        pageSize: 10,
        showTotal: (total) => `共${total}条`,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100", "200"],
      };
      this.pagination1 = {
        showQuickJumper: true,
        total: 0,
        current: 1,
        pageSize: 10,
        showTotal: (total) => `共${total}条`,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100", "200"],
      };
      this.pagination2 = {
        showQuickJumper: true,
        total: 0,
        current: 1,
        pageSize: 10,
        showTotal: (total) => `共${total}条`,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100", "200"],
      };
      this.$emit("cancel");
    },
    inputAddress(e, record) {
      record.address = e.target.value;
    },
  },
};
</script>

<style lang='less' scoped>
.cardPrice {
  white-space: nowrap;
}
</style>

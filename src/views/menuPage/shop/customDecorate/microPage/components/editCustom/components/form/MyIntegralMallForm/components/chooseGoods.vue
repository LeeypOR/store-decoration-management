<template>
  <a-modal
    class="productManage"
    :visible="visible"
    :title="'选择商品/优惠券'"
    :maskClosable="false"
    :destroyOnClose="true"
    :keyboard="false"
    :closable="true"
    :confirmLoading="confirmLoading"
    width="1300px"
    @cancel="closeModal()"
    @ok="handleSubmit"
  >
    <div>
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="商品">
          <div class="searchBox">
            <a-form layout="inline" :form="searchParams">
              <a-form-item label="商品名称">
                <a-input
                  allowClear
                  v-model="searchParams.goodsName"
                  placeholder="请输入商品名称"
                ></a-input>
              </a-form-item>
              <a-form-item label="商品分类">
                <a-tree-select
                  allowClear
                  style="width: 180px"
                  :replaceFields="{
                    children: 'children',
                    title: 'classifyName',
                    key: 'id',
                    value: 'id',
                  }"
                  v-model="searchParams.goodsClassificationId"
                  :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                  :tree-data="productClassifyList"
                  placeholder="请选择"
                  tree-default-expand-all
                >
                  <span slot="title" slot-scope="{ value }">
                    {{ value }}
                  </span>
                </a-tree-select>
              </a-form-item>
              <a-form-item label="商品分组">
                <a-tree-select
                  allowClear
                  style="width: 180px"
                  :replaceFields="{
                    children: 'children',
                    title: 'groupName',
                    key: 'id',
                    value: 'id',
                  }"
                  v-model="searchParams.goodsGroupId"
                  :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                  :tree-data="productGroupList"
                  placeholder="请选择"
                  tree-default-expand-all
                >
                  <span slot="title" slot-scope="{ value }">
                    {{ value }}
                  </span>
                </a-tree-select>
              </a-form-item>
              <a-form-item>
                <a-button
                  type="primary"
                  style="margin-left: 10px"
                  @click="onSearch"
                  :loading="tableLoading"
                >
                  搜索
                </a-button>
                <a-button
                  style="margin-left: 10px"
                  @click="resetSearch"
                  :loading="tableLoading"
                  >重置</a-button
                >
              </a-form-item>
            </a-form>
          </div>
          <a-spin tip="Loading..." :spinning="tableLoading">
            <a-table
              :row-selection="rowSelection"
              :columns="columns"
              :data-source="dataSource"
              :rowKey="'id'"
              :pagination="pagination"
              @change="handleTableChange"
            ></a-table>
          </a-spin>
        </a-tab-pane>
        <a-tab-pane key="2" tab="优惠券" force-render>
          <div class="searchBox">
            <a-form layout="inline" :form="couponParams">
              <a-form-item label="优惠券名称">
                <a-input
                  allowClear
                  v-model="couponParams.couponName"
                  placeholder="请输入优惠券名称"
                ></a-input>
              </a-form-item>
              <a-form-item label="优惠券类型">
                <a-select
                  showSearch
                  allowClear
                  style="width: 195px"
                  :options="couponTypeList"
                  v-model="couponParams.couponType"
                  placeholder="请选择"
                >
                </a-select>
              </a-form-item>
              <a-form-item>
                <a-button
                  type="primary"
                  style="margin-left: 10px"
                  @click="couponSearch"
                  :loading="tableLoading"
                >
                  搜索
                </a-button>
                <a-button
                  style="margin-left: 10px"
                  @click="couponResetSearch"
                  :loading="tableLoading"
                  >重置</a-button
                >
              </a-form-item>
            </a-form>
          </div>
          <a-spin tip="Loading..." :spinning="tableLoading">
            <a-table
              :row-selection="rowSelection1"
              :columns="couponColumns"
              :data-source="dataSource"
              :rowKey="'id'"
              :pagination="pagination1"
              @change="handleTableChange"
            ></a-table>
          </a-spin>
        </a-tab-pane>
      </a-tabs>
    </div>
    <template slot="footer">
      <a-button key="back" @click="closeModal"> 取消 </a-button>
      <a-button key="submit" type="primary" @click="handleSubmit">
        确定
      </a-button>
    </template>
  </a-modal>
</template>

<script>
import { createOptionsByDict, findDictNameByValue } from "@/utils/dict";
export default {
  name: "chooseGoods",
  props: {
    goodsIds: {
      type: Array,
      default() {
        return [];
      },
    },
    couponIds: {
      type: Array,
      default() {
        return [];
      },
    },
    allIds: {
      type: Array,
      default() {
        return [];
      },
    },
    goodsList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo || {};
    },
  },
  created() {},
  data() {
    return {
      visible: false,
      confirmLoading: false,
      selectedRows: [],
      selectedRowKeys: [],
      rowSelection: {
        selections: true,
        selectedRowKeys: [],
        onChange: (item, val) => {
          this.selectedRows = val;
          this.rowSelection.selectedRowKeys = item;
          this.selectedRowKeys = item;
        },
      },
      selectedRows1: [],
      selectedRowKeys1: [],
      rowSelection1: {
        selections: true,
        selectedRowKeys: [],
        onChange: (item, val) => {
          this.selectedRows1 = val;
          this.rowSelection1.selectedRowKeys = item;
          this.selectedRowKeys1 = item;
        },
      },
      pagination: {
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
      dataSource: [],
      alist: [],
      blist: [],
      columns: [
        {
          title: "商品名称",
          dataIndex: "goodsName",
          key: "goodsName",
          //align: 'center',
          customRender: (text, row) => {
            console.log("text", text);
            return (
              <div class="product_td">
                <table-img src={row.goodsPicture} />
                <div class="product_name">{text}</div>
              </div>
            );
          },
        },
        // {
        //   title: "价格",
        //   dataIndex: "salePrice",
        //   key: "salePrice",
        //   customRender: (text, row) => {
        //     return ((text || 0) / 100).toFixed(2);
        //   },
        // },
        {
          title: "价格",
          dataIndex: "integralPrice",
          key: "integralPrice",
          customRender: (text, row) => {
            if (row.paymentWay == 2) {
              return (
                "¥" +
                ((row.salePrice || 0) / 100).toFixed(2) +
                "+" +
                ((text || 0) + "积分")
              );
            } else {
              return (text || 0) + "积分";
            }
          },
        },
        {
          title: "总可售库存",
          dataIndex: "goodsInventoryTotal",
          key: "goodsInventoryTotal",
          align: "center",
        },
        {
          title: "销量",
          dataIndex: "realSales",
          key: "realSales",
        },
        {
          title: "状态",
          dataIndex: "goodsStatus",
          key: "goodsStatus",
          customRender: (text, row) => {
            return (this.getStatusLabelByStatusValue(text) || {}).label;
          },
        },
        {
          title: "商品分类",
          dataIndex: "goodsClassificationName",
          key: "goodsClassificationName",
        },
        {
          title: "创建时间",
          dataIndex: "createDate",
          key: "createDate",
        },
      ],
      couponColumns: [
        {
          title: "优惠券名称",
          dataIndex: "couponName",
          key: "couponName",
          width: 200,
        },
        {
          title: "优惠券类型",
          dataIndex: "couponType",
          key: "couponType",
          width: 120,
          customRender: (text, record) =>
            findDictNameByValue("COUPON_TYPE", text),
        },
        {
          title: "优惠内容",
          dataIndex: "couponAmount",
          key: "couponAmount",
          width: 150,
          customRender: (value, row) => {
            if (
              row.couponType == 0 ||
              row.couponType == 1 ||
              row.couponType == 3
            ) {
              return "优惠金额" + value + "元";
            } else if (row.couponType == 2 || row.couponType == 4) {
              return "打" + row.discountRatio + "折";
            }
            return value;
          },
        },
        {
          title: "使用条件",
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
          title: "兑换积分值",
          dataIndex: "redeemAmount",
          key: "redeemAmount",
          width: 80,
        },
        {
          title: "库存",
          dataIndex: "couponStocks",
          key: "couponStocks",
          width: 80,
          customRender: (text, row) => {
            if (text == -1) {
              return "不限量";
            }
            return text;
          },
        },
      ],
      tableLoading: false,
      defaultDate: [],
      goodsStatusList: [
        {
          label: "仓库中",
          value: 1,
        },
        {
          label: "上架",
          value: 2,
        },
        {
          label: "已下架",
          value: 3,
        },
      ],
      tabIndex: 1,
      searchParams: {},
      productClassifyList: [], //商品分类
      productGroupList: [], //商品分组
      couponParams: {},
      couponTypeList: createOptionsByDict("GENERAL_COUPON_TYPE"),
    };
  },
  methods: {
    getStatusLabelByStatusValue(value) {
      return this.goodsStatusList.find((item) => {
        return item.value == value;
      });
    },
    // 确定提交
    // handleSubmit() {
    //   this.confirmLoading = true;
    //   const { selectedRows, alist, blist } = this;
    //   // 商品提交
    //   console.log(selectedRows, alist, blist);
    //   let obj = {};
    //   const newArr = selectedRows.reduce((item, n) => {
    //     // eslint-disable-next-line no-unused-expressions
    //     obj[n.id] ? "" : (obj[n.id] = true && item.push(n));
    //     return item;
    //   }, []);
    //   let arr = Array.from(new Set(alist)).concat(Array.from(new Set(blist)));
    //   console.log(arr, "22222");
    //   let selectArr = arr.map((item) => {
    //     for (let i = 0, length = newArr.length; i < length; i++) {
    //       if (newArr[i].id == item) {
    //         return newArr[i];
    //       }
    //     }
    //   });
    //   let ids = [];
    //   console.log(selectArr, "3333333");
    //   selectArr.forEach((item) => {
    //     ids.push(item.id);
    //   });
    //   this.$emit("confirmGoods", ids, alist, blist);
    //   this.visible = false;
    // },
    handleSubmit() {
      this.confirmLoading = true;
      const { selectedRows, alist, blist } = this;
      // 商品提交
      let ids = [];
      selectedRows.forEach((item) => {
        ids.push(item.id);
      });
      this.$emit("confirmGoods", selectedRows, ids, alist, blist);
      this.visible = false;
    },
    // 取消
    closeModal() {
      this.visible = false;
      this.$emit("cancel", false);
    },
    handleTableChange(pagination, filters, sorter) {
      if (this.tabIndex == 1) {
        this.pagination.current = pagination.current;
        this.pagination.pageSize = pagination.pageSize;
        this.getGoodsList();
      } else {
        this.pagination1.current = pagination.current;
        this.pagination1.pageSize = pagination.pageSize;
        this.getCouponList();
      }
      //   this.getGoodsList();
    },
    handleSearch() {
      this.alist = JSON.parse(JSON.stringify(this.goodsIds));
      this.selectedRows = JSON.parse(JSON.stringify(this.goodsList));
      // this.selectedRows = this.allIds.map((item) => {
      //   return {
      //     id: item,
      //   };
      // });
      this.rowSelection = {
        type: "checkbox",
        selections: true,
        hideDefaultSelections: true,
        selectedRowKeys: this.alist,
        // onChange: (item, val) => {
        //   this.selectedRows = this.selectedRows.concat(val);
        //   console.log(this.selectedRows, "000000000000");
        //   this.rowSelection.selectedRowKeys = item;
        //   this.alist = item;
        // },
        onSelect: (record, selected, selectedRows) => {
          // console.log(record, selected, selectedRows);
          if (selected) {
            let num = 0;
            this.goodsIds.forEach((item, index) => {
              if (item == record.id) {
                num++;
                this.alist.splice(index, 0, record.id);
                this.selectedRows.splice(index, 0, record);
              }
            });
            if (num == 0) {
              this.alist.push(record.id);
              this.selectedRows.push(record);
            }
            this.rowSelection.selectedRowKeys = this.alist;
          } else {
            this.alist.forEach((item, index) => {
              if (item == record.id) {
                this.alist.splice(index, 1);
              }
            });
            this.rowSelection.selectedRowKeys = this.alist;
            this.selectedRows.forEach((item, index) => {
              if (item.id == record.id) {
                this.selectedRows.splice(index, 1);
              }
            });
          }
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
          // console.log(selected, selectedRows, changeRows);
          if (selected) {
            changeRows.forEach((item) => {
              let num = 0;
              this.goodsIds.forEach((l, index) => {
                if (item.id == l) {
                  num++;
                  this.alist.splice(index, 0, item.id);
                  this.selectedRows.splice(index, 0, item);
                }
              });
              if (num == 0) {
                this.alist.push(item.id);
                this.selectedRows.push(item);
              }
            });
            this.rowSelection.selectedRowKeys = this.alist;
          } else {
            this.alist = [];
            this.selectedRows = this.selectedRows.filter((item) => {
              let show = true;
              changeRows.forEach((l) => {
                if (item.id == l.id) show = false;
              });
              return show;
            });
            this.rowSelection.selectedRowKeys = this.alist;
          }
        },
        getCheckboxProps: (record) => ({
          props: {
            defaultChecked: this.alist.includes(record.id),
          },
        }),
      };
      this.blist = JSON.parse(JSON.stringify(this.couponIds));
      //   this.selectedRows1 = this.couponIds.map((item) => {
      //     return {
      //       id: item,
      //     };
      //   });
      this.rowSelection1 = {
        type: "checkbox",
        selections: true,
        selectedRowKeys: this.blist,
        hideDefaultSelections: true,
        // onChange: (item, val) => {
        //   this.selectedRows = this.selectedRows.concat(val);
        //   console.log(this.selectedRows, "000000000000");
        //   //   this.selectedRows1 = this.selectedRows1.concat(val);
        //   this.rowSelection1.selectedRowKeys = item;
        //   this.blist = item;
        // },
        onSelect: (record, selected, selectedRows) => {
          console.log(record, selected, selectedRows);
          if (selected) {
            let num = 0;
            this.couponIds.forEach((item, index) => {
              if (item == record.id) {
                num++;
                this.blist.splice(index, 0, record.id);
                this.selectedRows.splice(index, 0, record);
              }
            });
            if (num == 0) {
              this.blist.push(record.id);
              this.selectedRows.push(record);
            }
            this.rowSelection1.selectedRowKeys = this.blist;
          } else {
            this.blist.forEach((item, index) => {
              if (item == record.id) {
                this.blist.splice(index, 1);
              }
            });
            this.rowSelection1.selectedRowKeys = this.blist;
            this.selectedRows.forEach((item, index) => {
              if (item.id == record.id) {
                this.selectedRows.splice(index, 1);
              }
            });
          }
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
          if (selected) {
            changeRows.forEach((item) => {
              let num = 0;
              this.couponIds.forEach((l, index) => {
                if (item.id == l) {
                  num++;
                  this.blist.splice(index, 0, item.id);
                  this.selectedRows.splice(index, 0, item);
                }
              });
              if (num == 0) {
                this.blist.push(item.id);
                this.selectedRows.push(item);
              }
            });
            this.rowSelection1.selectedRowKeys = this.blist;
          } else {
            this.blist = [];
            this.selectedRows = this.selectedRows.filter((item) => {
              let show = true;
              changeRows.forEach((l) => {
                if (item.id == l.id) show = false;
              });
              return show;
            });
            this.rowSelection1.selectedRowKeys = this.blist;
          }
        },
        getCheckboxProps: (record) => ({
          props: {
            defaultChecked: this.blist.includes(record.id),
          },
        }),
      };
      if (this.tabIndex == 1) {
        this.getGoodsList();
      } else {
        this.getCouponList();
      }
    },

    async getGoodsList() {
      this.tableLoading = true;
      let res = await this.$get("goods/page", {
        current: this.pagination.current,
        size: this.pagination.pageSize,
        paymentWay: 1,
        goodsStatus: 2,
        ...this.searchParams,
      });
      if (res && res.returnCode == 1000) {
        if (res.dataInfo != null) {
          this.dataSource = res.dataInfo.records;
          this.pagination.total = res.dataInfo.total;
        }
      }
      this.tableLoading = false;
    },
    async getCouponList() {
      this.tableLoading = true;
      let res = await this.$get("coupon/customer/page", {
        current: this.pagination1.current,
        size: this.pagination1.pageSize,
        benefits: 1,
        redeemStatus: 1,
        ...this.couponParams,
      });
      if (res && res.returnCode == 1000) {
        if (res.dataInfo != null) {
          this.dataSource = res.dataInfo.records;
          this.pagination1.total = res.dataInfo.total;
        }
      }
      this.tableLoading = false;
    },
    //商品分类
    async getProductClassify() {
      let res = await this.$get("/goods/classify/tree", {
        shopId: this.userInfo.shopId || "",
      });
      if (res && res.returnCode == "1000") {
        this.productClassifyList = res.dataInfo || [];
      } else {
        this.productClassifyList = [];
      }
    },
    //商品分组
    async getProductGroup() {
      let res = await this.$get(
        "/goods/group/tree",
        {
          shopId: this.userInfo.shopId || "",
        },
        false,
        true
      );
      if (res && res.returnCode == "1000") {
        this.productGroupList = res.dataInfo || [];
      } else {
        this.productGroupList = [];
      }
    },
    onSearch() {
      console.log(this.searchParams);
      this.getGoodsList();
    },
    resetSearch() {
      this.searchParams = {};
      this.getGoodsList();
    },
    couponSearch() {
      this.getCouponList();
    },
    couponResetSearch() {
      this.couponParams = {};
      this.getCouponList();
    },
    callback(key) {
      this.tabIndex = key;
      if (key == 1) {
        this.searchParams = {};
        this.getGoodsList();
      } else {
        this.couponParams = {};
        this.getCouponList();
      }
    },
  },
  watch: {
    visible(n) {
      if (n) {
        this.pagination.current = 1;
        this.pagination.pageSize = 10;
        this.pagination1.current = 1;
        this.pagination1.pageSize = 10;
        this.tabIndex = 1;
        this.searchParams = {};
        this.couponParams = {};
        this.handleSearch();
        this.getProductClassify(); //分类
        this.getProductGroup(); //分组
      }
    },
  },
};
</script>

<style scoped lang="less">
.searchBox {
  margin-bottom: 10px;
  width: 100%;
  // display: flex;
  // justify-content: flex-end;
}
.product_td {
  display: flex;
  align-items: center;
  .product_name {
    margin-left: 10px;
  }
}
/deep/.ant-table-selection-column {
  text-align: inherit !important;
}
</style>


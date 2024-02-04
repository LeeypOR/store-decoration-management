<template>
  <a-modal
    width="820px"
    :title="modeltitle"
    :visible="visible"
    :destroyOnClose="true"
    :maskClosable="false"
    :keyboard="false"
    @cancel="closeModal"
  >
    <template slot="footer">
      <div
        class="goodsNm"
        v-if="(groupType == 3 || groupType == 5) && dataSource.length > 0"
      >
        共{{ dataSource.length }}个商品
      </div>
      <div>
        <a-button key="back" @click="confirm">确定</a-button>
      </div>
    </template>
    <div class="seaction">
      <div v-if="!shopTabType">
        <div v-if="tabType === 1">
          <div class="searchArea" v-if="groupType == 2 || this.groupType == 4">
            <div class="name">
              活动名称：
              <a-input
                placeholder="请输入活动名称"
                style="width: 150px"
                v-model="searchInfo.activityName"
                allowClear
              />
            </div>
            <div class="time">
              活动时间：
              <a-range-picker
                @change="onDeteChange"
                style="width: 250px"
                v-model="defaultDate"
              />
            </div>
            <div class="opration">
              <a-button
                type="primary"
                class="searchBtn"
                :loading="tableLoading"
                @click="searching"
                >搜索</a-button
              >
              <a-button
                html-type="submit"
                class="resetBtn"
                @click="resetSearch"
                :disabled="tableLoading"
                >重置</a-button
              >
            </div>
          </div>
          <div class="config-provider">
            <a-spin tip="Loading..." :spinning="tableLoading">
              <a-table
                :row-selection="
                  groupType == 3 || groupType == 5 ? null : rowSelection
                "
                :columns="columns"
                :data-source="dataSource"
                :rowKey="'id'"
                :pagination="
                  groupType == 3 || groupType == 5 ? false : pagination
                "
                @change="handleTableChange"
              ></a-table>
            </a-spin>
          </div>
        </div>
        <div v-else>
          <a-table
            :columns="columns"
            :data-source="treeData"
            :pagination="false"
            :row-selection="rowSelection"
            :rowKey="(record) => record.id"
            @change="handleTableChange"
            v-if="treeData.length > 0"
          ></a-table>
        </div>
      </div>
      <div v-else>
        <a-tabs :default-active-key="listType" @change="callback">
          <a-tab-pane key="1" tab="商品">
            <a-table
              :row-selection="
                groupType == 3 || groupType == 5 ? null : rowSelection
              "
              :columns="columns"
              :data-source="dataSource"
              :rowKey="'id'"
              :pagination="
                groupType == 3 || groupType == 5 ? false : pagination
              "
              @change="handleTableChange"
            ></a-table>
          </a-tab-pane>
          <a-tab-pane key="2" tab="商品分组" force-render>
            <a-table
              :columns="columns"
              :data-source="treeData"
              :pagination="false"
              :row-selection="rowSelection"
              :rowKey="(record) => record.id"
              @change="handleTableChange"
              v-if="treeData.length > 0"
            ></a-table>
          </a-tab-pane>
          <a-input-search
            v-if="listType == 1"
            slot="tabBarExtraContent"
            placeholder="请输入搜索内容"
            style="width: 200px"
            v-model="searchName"
            @search="callBackShop"
          />
        </a-tabs>
      </div>
    </div>
  </a-modal>
</template>
<script>
import moment from "moment";
import TableTreeSelection from "@/mixins/TableTreeSelection";
export default {
  name: "ShopModal",
  mixins: [TableTreeSelection],
  data() {
    return {
      columns: [
        {
          title: "商品图片",
          dataIndex: "goodsPicture",
          key: "goodsPicture",
          align: "center",
          customRender: (text, row) => {
            return <table-img src={text} />;
          },
        },
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
      searchName: "",
      tableLoading: true,
      selectedRowKeys: [],
      rowSelection: {
        selections: true,
        selectedRowKeys: [],
        onChange: (item, val) => {
          this.selectedRows = val;
          this.rowSelection.selectedRowKeys = item;
          this.selectedRowKeys = item;
        },
        // getCheckboxProps: (record) => ({
        //   props: {
        //     defaultChecked: this.selectedRowKeys.includes(record.id),
        //     disabled:
        //       this.selectedRowKeys.length >= 3
        //         ? this.selectedRowKeys.includes(record.id) === false
        //         : false,
        //   },
        // }),
        // onSelect: this.onTableTreeSelect
      },
      selectedRows: [],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        showTotal: (total) => `共${total}条`,
      },
      dataSource: [],
      url: "",
      treeData: [],
      params: {},
      searchInfo: {
        activityName: "",
        startDate: "",
        endDate: "",
      },
      selectNumDisabled: false,
      alist: [],
      shopList: [],
      shopGroupList: [],
      listType: "1",
      defaultDate: [],
    };
  },
  props: {
    selectedType: {
      type: String,
      default: "checkbox",
    },
    visible: {
      type: Boolean,
      default: false,
    },
    tabType: {
      type: Number,
      default: 1,
    },
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    groupActive: {
      type: Boolean,
      default: true,
    },
    spellType: {
      type: String,
      default: "",
    },
    modeltitle: {
      type: String,
      default: "商品分组",
    },
    groupType: {
      type: String,
      default: "1",
    },
    activityId: {
      type: String,
      default: "",
    },
    shopTabType: {
      type: Boolean,
      default: false,
    },
    checkType: {
      type: String,
      default: "1",
    },
  },
  created() {},
  mounted() {},
  computed: {
    // eslint-disable-next-line vue/no-dupe-keys
    //  rowSelection () {
    //   // const {}=this.list;
    //   console.log('this.list', this.list)
    //   return {
    //     selections: true,
    //     onChange: (item, val) => {
    //       this.selectedRows = val
    //     },
    //     getCheckboxProps: (record) => ({
    //       props: {
    //           defaultChecked: record.id == '451372510038982658'
    //         }
    //     })
    //   }
    // }
  },
  methods: {
    handleSearch() {
      //  this.rowSelection()
      this.alist = this.list.map((item) => {
        return item.id;
      });
      // 商品页面进来，判断是不是分组
      if (this.shopTabType && this.tabType == 1) return this.callBackShop();
      this.selectedRows = this.list;
      this.rowSelection = {
        type: this.selectedType,
        selections: true,
        selectedRowKeys: this.alist,
        columnTitle:
          this.groupType == 2 || this.groupType == 4
            ? `已选择${this.alist.length || 0}/5`
            : "",
        columnWidth: this.groupType == 2 || this.groupType == 4 ? "100px" : "",
        hideDefaultSelections: !!(this.groupType == 2 || this.groupType == 4),
        onChange: (item, val) => {
          this.selectedRows = this.selectedRows.concat(val);
          // this.selectedRows = val;
          this.rowSelection.selectedRowKeys = item;
          // this.alist = Array.from(new Set(this.alist.concat(item)));
          this.alist = item;
          this.rowSelection.columnTitle =
            this.groupType == 2 || this.groupType == 4
              ? `已选择${val.length || 0}/5`
              : "";
          // this.selectedRowKeys = item;
          if (val.length >= 5 && (this.groupType == 2 || this.groupType == 4)) {
            const checkBox = document.querySelectorAll(
              ".ant-checkbox .ant-checkbox-input"
            );
            if (checkBox) {
              checkBox.forEach((item) => {
                if (!item.checked) {
                  item.disabled = "disabled";
                  item.style.background = "#999";
                  item.style.cursor = "not-allowed";
                }
              });
            }
          } else {
            const checkBox = document.querySelectorAll(".ant-checkbox-input");
            if (checkBox) {
              checkBox.forEach((item) => {
                item.disabled = false;
                item.style.background = "#fff";
                item.style.cursor = "pointer";
              });
            }
          }
        },
        // onSelect: this.onTableTreeSelect,
        getCheckboxProps: (record) => ({
          props: {
            defaultChecked: this.alist.includes(record.id),
            // disabled:
            //   alist.length >= 2 ? alist.includes(record.id) === false : false,
          },
        }),
      };
      if (this.tabType === 1) {
        // 商品
        if (this.groupActive) {
          this.url = "/goods/page";
          this.params = {
            current: this.pagination.current,
            size: this.pagination.pageSize,
            goodsName: this.searchName,
            goodsStatus: 2,
          };
          this.columns = [
            {
              title: "商品图片",
              dataIndex: "goodsPicture",
              key: "goodsPicture",
              width: "90px",
              align: "center",
              customRender: (text, row) => {
                return <table-img src={text} />;
              },
            },
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
          ];
        } else {
          // 拼团
          if (this.groupType == 1) {
            this.url =
              "goldenhome/ghgroup/admin_/group/activity/goods/choose/page";
            this.params = {
              current: this.pagination.current || 1,
              size: 10,
              type: this.spellType * 1,
            };
            this.columns = [
              {
                title: "商品图片",
                dataIndex: "goodsPictures",
                key: "goodsPictures",
                align: "center",
                customRender: (text, row) => {
                  text = text.split(",")[0] || text;
                  return <table-img src={text} />;
                },
              },
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
            ];
          }
          // 秒杀活动
          if (this.groupType == 2 || this.groupType == 4) {
            if (this.groupType == 2) {
              this.url = "goldenhome/seckill/admin_/seckill/activity/page";
            } else if (this.groupType == 4) {
              this.url = "goldenhome/seckill/admin_/discount/activity/page";
            }
            this.params = {
              current: this.pagination.current || 1,
              size: 10,
              enableMsg: 1,
              ...this.searchInfo,
            };
            this.columns = [
              {
                title: "活动名称",
                dataIndex: "activityName",
                key: "activityName",
              },
              {
                title: "活动时间",
                dataIndex: "activityTime",
                key: "activityTime",
              },
              {
                title: "活动状态",
                dataIndex: "activityStatu",
                key: "activityStatu",
                customRender: (text, row) => {
                  if (text == 1) {
                    text = "未开始";
                  } else if (text == 2) {
                    text = "进行中";
                  } else if (text == 3) {
                    text = "已结束";
                  }
                  return text;
                },
              },
            ];
          }
          // 活动商品
          if (this.groupType == 3 || this.groupType == 5) {
            if (this.groupType == 3) {
              this.url = "goldenhome/seckill/admin_/seckill/goods/list";
            } else if (this.groupType == 5) {
              this.url = "goldenhome/seckill/admin_/discount/goods/list";
            }
            this.columns = [
              {
                title: "商品名称",
                dataIndex: "goodsName",
                key: "goodsName",
              },
              {
                title: "商品图片",
                dataIndex: "goodsPicture",
                key: "goodsPicture",
                align: "center",
                customRender: (text, row) => {
                  text = text.split(",")[0] || text;
                  return <table-img src={text} />;
                },
              },
              {
                title: "创建时间",
                dataIndex: "createDate",
                key: "createDate",
              },
            ];
            this.params = {
              activityId: this.activityId,
            };
          }
        }
        this.getList();
      } else {
        this.rowSelection.onSelect = this.onTableTreeSelect;
        this.columns = [
          { title: "分组名称", dataIndex: "groupName", key: "groupName" },
          { title: "商品数量", dataIndex: "goodsNum", key: "goodsNum" },
          { title: "创建时间", dataIndex: "updateDate", key: "updateDate" },
        ];
        this.url = "/goods/group/listTree";
        this.getTreeList();
      }
    },
    searching() {
      // console.log(this.searchInfo);
      this.handleSearch();
    },
    resetSearch() {
      this.searchInfo = {
        activityName: "",
        startDate: "",
        endDate: "",
      };
      this.defaultDate = [];
      this.handleSearch();
    },
    getList() {
      this.tableLoading = true;
      console.log(this.params);
      if (this.params.current) {
        this.params.current = this.pagination.current;
      }
      this.$get(this.url, this.params)
        .then((res) => {
          if (res && res.returnCode == 1000) {
            if (res.dataInfo.records) {
              const { current, records, total, size } = res.dataInfo;
              this.pagination = {
                total: total,
                // current: current,
                // pageSize: size,
              };
              this.dataSource = records;
              this.tableLoading = false;
              // 用于秒杀组件弹窗初始化禁用
              this.$nextTick(() => {
                const val = this.list;
                if (
                  val.length >= 5 &&
                  (this.groupType == 2 || this.groupType == 4)
                ) {
                  const checkBox = document.querySelectorAll(
                    ".ant-checkbox .ant-checkbox-input"
                  );
                  if (checkBox) {
                    checkBox.forEach((item) => {
                      if (!item.checked) {
                        item.disabled = "disabled";
                        item.style.background = "#999";
                        item.style.cursor = "not-allowed";
                      }
                    });
                  }
                }
              });
            } else {
              if (Array.isArray(res.dataInfo)) {
                this.dataSource = res.dataInfo;
              } else {
                this.dataSource = [];
              }
              this.tableLoading = false;
            }
          } else {
            this.dataSource = [];
            this.tableLoading = false;
          }
        })
        .catch(() => {
          this.dataSource = [];
          this.tableLoading = false;
        });
    },
    getTreeList() {
      this.rowSelection.selectedRowKeys = [];
      this.selectedRowKeys = [];
      this.$get(this.url, {}).then((res) => {
        if (res && res.returnCode == 1000) {
          const { dataInfo } = res;
          console.log("dataInfo", Object.values(dataInfo));
          this.treeData = dataInfo.goodsGroupList.filter((item) => {
            return item.groupStatus == 1;
          });
          console.log("this.treeData", this.treeData);
          // var aab = { ...records[0], id: '1234545434' }
          // this.dataSource = records
        }
      });
    },
    closeModal() {
      this.$emit("cancel");
    },
    confirm() {
      // if (this.selectedRows.length > 15) {
      //   return this.$toast("选择多于十五个");
      // }
      const { selectedRows, alist, shopTabType } = this;
      // 商品提交
      if (shopTabType) return this.confirms();
      let obj = {};
      const newArr = selectedRows.reduce((item, n) => {
        // eslint-disable-next-line no-unused-expressions
        obj[n.id] ? "" : (obj[n.id] = true && item.push(n));
        return item;
      }, []);
      let arr = Array.from(new Set(alist));
      let selectArr = arr.map((item) => {
        for (let i = 0, length = newArr.length; i < length; i++) {
          if (newArr[i].id == item) {
            return newArr[i];
          }
        }
      });
      this.$emit("confirm", selectArr);
    },
    confirms() {
      const { selectedRows, shopList, shopGroupList, listType } = this;
      if (listType == "2") {
        let nobj = {
          type: listType,
          value: shopGroupList,
        };
        this.$emit("confirm", nobj);
        return;
      }
      let obj = {};
      const newArr = selectedRows.reduce((item, n) => {
        // eslint-disable-next-line no-unused-expressions
        obj[n.id] ? "" : (obj[n.id] = true && item.push(n));
        return item;
      }, []);
      let arr = Array.from(new Set(shopList));
      console.log(arr, " console.log()");
      let selectArr = arr.map((item) => {
        for (let i = 0, length = newArr.length; i < length; i++) {
          if (newArr[i].id == item) {
            return newArr[i];
          }
        }
      });
      let NewObj = {
        type: listType,
        value: selectArr,
      };
      this.$emit("confirm", NewObj);
    },
    handleTableChange(pagination, filters, sorter) {
      // console.log(pagination,'454545454545454545')
      this.pagination.current = pagination.current;
      this.getList();
    },
    onDeteChange(date, dateString) {
      console.log(date, dateString);
      if (date.length == 2) {
        this.searchInfo.startDate = moment(date[0]._d).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        this.searchInfo.endDate = moment(date[1]._d).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      } else {
        this.searchInfo.startDate = "";
        this.searchInfo.endDate = "";
      }
    },
    callBackShop() {
      this.alist = this.list.map((item) => {
        return item.id;
      });
      this.selectedRows = this.list;
      if (this.listType != this.checkType) {
        this.selectedRows = [];
        this.alist = [];
      }
      if (this.listType == "1") {
        this.shopList = this.alist;
      } else {
        this.shopGroupList = this.list;
      }
      this.tableLoading = false;
      if (this.listType == "1") {
        this.rowSelection = {
          type: this.selectedType,
          selectedRowKeys: this.shopList,

          onChange: (item, val) => {
            this.selectedRows = this.selectedRows.concat(val);
            // this.selectedRows = val;
            this.shopList = item;
            this.rowSelection.selectedRowKeys = item;
            this.alist = item;
          },
          // onSelect: this.onTableTreeSelect,
          getCheckboxProps: (record) => ({
            props: {
              defaultChecked: this.alist.includes(record.id),
              // disabled:
              //   alist.length >= 2 ? alist.includes(record.id) === false : false,
            },
          }),
        };
        this.url = "/goods/page";
        this.params = {
          current: this.pagination.current,
          size: this.pagination.pageSize,
          goodsName: this.searchName,
          goodsStatus: 2,
        };
        this.columns = [
          {
            title: "商品图片",
            dataIndex: "goodsPicture",
            key: "goodsPicture",
            width: "90px",
            align: "center",
            customRender: (text, row) => {
              return <table-img src={text} />;
            },
          },
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
        ];
        this.getList();
      } else {
        this.rowSelection = {
          type: this.selectedType,
          selectedRowKeys: this.shopGroupList,
          onChange: (item, val) => {
            this.selectedRows = this.selectedRows.concat(val);
            // this.selectedRows = val;
            this.shopGroupList = val;
            this.rowSelection.selectedRowKeys = item;
          },
          onSelect: this.onTableTreeSelect,
          getCheckboxProps: (record) => ({
            props: {
              defaultChecked: this.alist.includes(record.id),
              // disabled:
              //   alist.length >= 2 ? alist.includes(record.id) === false : false,
            },
          }),
        };
        this.columns = [
          { title: "分组名称", dataIndex: "groupName", key: "groupName" },
          { title: "商品数量", dataIndex: "goodsNum", key: "goodsNum" },
          { title: "创建时间", dataIndex: "createDate", key: "createDate" },
        ];
        this.url = "/goods/group/listTree";
        this.getTreeList();
      }
    },
    callback(e) {
      this.listType = e;
      this.searchName = "";
      this.callBackShop();
      // if (e == '1') {
      //   console.log(e)
      // } else {

      // }
    },
  },
  watch: {
    visible(n, old) {
      if (n) {
        console.log(this.shopTabType);
        this.listType = this.checkType;
        this.rowSelection.type = this.selectedType;
        this.searchInfo = {
          activityName: "",
          startDate: "",
          endDate: "",
        };
        this.handleSearch();
      } else {
        this.pagination.current = 1;
      }
    },
  },
};
</script>
<style lang="less" scoped>
// .seaction {
//   height: 520px;
// }
.searchArea {
  display: flex;
  margin-bottom: 15px;
  div {
    display: flex;
    flex-shrink: 0;
    align-items: center;
  }
  .name {
    margin-right: 10px;
  }
  .opration {
    margin-left: 20px;
    .searchBtn {
      margin-right: 10px;
    }
  }
}
.goodsNm {
  position: absolute;
  left: 21px;
  top: 8px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 20px;
  padding: 5px;
}
/deep/.ant-modal-footer {
  position: relative;
}
</style>

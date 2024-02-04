<!--引入商品库-->
<template>
  <a-modal
    :visible="visible"
    okText="确定"
    cancelText="取消"
    :title="title"
    :maskClosable="false"
    :destroyOnClose="true"
    :keyboard="false"
    :closable="false"
    :confirmLoading="confirmLoading"
    width="800px"
    @cancel="closeModal()"
    @ok="handleSubmit"
  >
    <search-form-table
      :url="url"
      ref="searchtable"
      :columns="shopColumns"
      :form="form"
      :hideSelect="false"
      :defaultSelectedRowKeys="selectedRowKeys"
      :tableData="tableData"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: handleSelectChange,
        onSelect: handleSelectChange2,
      }"
      v-if="tableShow"
      @selectRowChange="handleSelectRowSelect"
      @selectAllRowChange="handleSelectAllRowSelect"
      @search="handleSearch"
      @reset="handlReset"
      @pageShowSizeChange="handlePageShowSizeChange"
      @pageChange="handlePageChange"
    >
      <template slot="searchForm">
        <a-form layout="inline" :form="form">
          <a-form-item label="机构名称">
            <a-input placeholder="请输入机构" v-model="formData.orgName" />
          </a-form-item>
          <!-- <a-form-item label="店铺名称">
            <a-input placeholder="请输入店铺名称" v-model="formData.shopName" />
          </a-form-item> -->
        </a-form>
      </template>
      <template slot="tableOperation" slot-scope="{ record }">
        <a-popconfirm
          ok-text="确定"
          cancel-text="取消"
          @confirm="handleShopConfirm"
          :icon="handleIcon"
        >
          <template slot="title">
            <a-checkbox-group v-model="currentSelectOrgShopIds">
              <a-checkbox
                v-for="(item, index) in orgShopList"
                :key="index"
                :value="item.orgId + '_' + item.id"
                >{{ item.shopName }}</a-checkbox
              >
            </a-checkbox-group>
          </template>
          <a href="javascript:;" @click="handleViewShopList(record.id)"
            >查看本机构店铺列表</a
          >
        </a-popconfirm>
      </template>
      <template slot="expandedRowRender" slot-scope="record">
        {{ record }}
      </template>
    </search-form-table>
  </a-modal>
</template>

<script>
import deepCopy from "@/utils/deepCopy";
import SearchFormTable from "./SearchFormTable";

export default {
  components: {
    SearchFormTable,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    shopIds: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      title: "选择店铺", //
      confirmLoading: false,
      form: this.$form.createForm(this, { name: "table_search" }),
      url: "/shop/org/tree",
      selectedRowKeys: [],
      formData: {
        orgName: "",
        shopName: "",
      },
      shopColumns: [
        {
          title: "名称",
          key: "orgName",
          dataIndex: "orgName",
        },
        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" },
        },
      ],
      orgTreeList: [], //机构列表
      orgFlatList: [], //机构扁平化列表
      orgShopList: [], //机构店铺列表
      currentSelectOrgShopIds: [], //
      selectOrgShopList: [],
      currentOrgId: "",
      selectShopIds: [],
      productInfo: {},
      tableShow: false,
      tableData: [],
    };
  },
  watch: {
    visible(newVal) {
      this.resetData();
      if (newVal) {
        this.getTreeShop();
      } else {
        this.formData = {
          orgName: "",
          shopName: "",
        };
      }
    },
  },
  created() {
    this.resetData();
    this.getTreeShop();
  },
  methods: {
    handlePageShowSizeChange() {
      this.resetData();
    },
    handlePageChange() {
      this.resetData();
    },
    handleSelectChange2(data) {
      console.log(data);
    },
    handleSearch() {
      this.tableData = this.rebuildData(
        this.formData.orgName,
        this.orgTreeList,
        "orgName"
      );
    },
    handlReset() {
      this.formData = {
        orgName: "",
        shopName: "",
      };
      this.handleSearch();
    },
    handleSelectAllRowSelect(selected, selectedRows, changeRows) {
      console.log(selected, selectedRows, changeRows);
      let tmpData = [];
      selectedRows.forEach((item) => {
        item.shopList.forEach((item2) => {
          tmpData.push(item.id + "_" + item2.id);
        });
      });
      this.selectOrgShopList = Array.from(new Set(tmpData)).filter(
        (item) => item
      );
      this.currentSelectOrgShopIds = deepCopy(this.selectOrgShopList);
      console.log("this.selectOrgShopList", deepCopy(this.selectOrgShopList));

      this.selectShopIds = this.getShopIds(this.selectOrgShopList);
    },
    // 勾选所有子集
    deepSelectChildren (list) {
      list.forEach(item => {
        if (this.selectedRowKeys.indexOf(item.id) === -1) {
          this.selectedRowKeys.push(item.id)
          item.shopList.forEach((item2) => {
            this.selectOrgShopList.push(item.id + "_" + item2.id);
          });
        }
        if (item.children && item.children.length) {
          this.deepSelectChildren(item.children)
        }
      })
    },
    // 取消勾选所有子集
    deepUnSelectChildren (list) {
      list.forEach(item => {
        this.selectedRowKeys = this.selectedRowKeys.filter(key => item.id !== key);
        this.selectOrgShopList = this.selectOrgShopList.filter(key => key.split('_')[0] !== item.id)
        if (item.children && item.children.length) {
          this.deepUnSelectChildren(item.children)
        }
      })
    },
    handleSelectRowSelect(record, selected, selectedRows) {
      console.log(
        "record, selected, selectedRows",
        record,
        selected,
        selectedRows
      );
      //alert(1)
      if (!selected) {
        // this.deepRemoveArrayItem(this.selectOrgShopList, record.id);
        this.deepUnSelectChildren([record])
      } else {
        // let tmpData = [];
        // selectedRows.forEach((item) => {
        //   item.shopList.forEach((item2) => {
        //     tmpData.push(item.id + "_" + item2.id);
        //   });
        // });
        // this.selectOrgShopList.push(...tmpData);
        this.deepSelectChildren([record])
        console.log("this.selectOrgShopList", this.selectOrgShopList);
      }
      this.selectOrgShopList = Array.from(
        new Set(this.selectOrgShopList)
      ).filter((item) => item);
      this.currentSelectOrgShopIds = deepCopy(this.selectOrgShopList);
      console.log("this.selectOrgShopList", deepCopy(this.selectOrgShopList));
      console.log("this.currentSelectOrgShopIds", this.currentSelectOrgShopIds);

      this.selectShopIds = this.getShopIds(this.selectOrgShopList);
    },
    resetData() {
      this.orgShopList = [];
      this.currentSelectOrgShopIds = [];
      this.selectOrgShopList = [];
      this.currentOrgId = [];
      this.selectShopIds = [];
    },
    getCheckedOrgShopIds(shopIds) {
      if (!shopIds || shopIds.length == 0) {
        return [];
      }
      let tmpData = [];
      this.orgFlatList.forEach((item) => {
        //console.log('item.shopList',item.shopList);
        item.shopList.forEach((item2) => {
          //console.log('item2.id',item2.id);
          shopIds.forEach((item3) => {
            if (item2.id == item3) {
              tmpData.push(item.id + "_" + item2.id);
            }
          });
        });
      });
      return tmpData;
    },
    setSelectedData() {
      this.selectShopIds = deepCopy(this.shopIds);
      this.currentSelectOrgShopIds = this.getCheckedOrgShopIds(
        this.selectShopIds
      );
      this.selectOrgShopList = deepCopy(this.currentSelectOrgShopIds);
      this.selectedRowKeys = this.getOrgIds(this.selectOrgShopList);
      this.tableShow = true;
    },
    handleIcon() {
      return <span></span>;
    },
    bianping(arr) {
      var res = [];
      for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (item.children.length > 0) {
          res = res.concat(this.bianping(item.children));
        }
        res.push(item);
      }
      return res;
    },
    rebuildData(value, arr, key = "orgName") {
      if (!arr) {
        return [];
      }
      let newarr = [];
      arr.forEach((element) => {
        if (element[key].indexOf(value) > -1) {
          const ab = element.children;
          const obj = {
            ...element,
            children: ab,
          };
          newarr.push(obj);
        } else {
          if (element.children && element.children.length > 0) {
            const ab = this.rebuildData(value, element.children);
            const obj = {
              ...element,
              children: ab,
            };
            if (ab && ab.length > 0) {
              newarr.push(obj);
            }
          }
        }
      });
      return newarr;
    },
    handleSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
      console.log("this.selectedRowKeys", this.selectedRowKeys);
    },
    async getTreeShop() {
      let res = await this.$get("/shop/org/tree", {}, false, true);
      if (res && res.returnCode == "1000") {
        this.orgTreeList = res.dataInfo || [];
        this.orgFlatList = this.bianping(this.orgTreeList);
        this.tableData = this.orgTreeList;
        //this.getProductInfo();
        this.setSelectedData();
      } else {
        this.orgTreeList = [];
        this.orgFlatList = [];
      }
    },
    handleViewShopList(orgId) {
      this.orgShopList = [];
      this.currentOrgId = orgId;
      //console.log('this.orgFlatList',this.orgFlatList)
      this.orgFlatList.forEach((item) => {
        if (item.id == orgId) {
          this.orgShopList = item.shopList || [];
        }
      });
    },
    deepRemoveArrayItem(data, orgId) {
      var i = data.length;
      while (i--) {
        //console.log(i+"="+data[i]);
        if (data[i].split("_")[0] == orgId) {
          data.splice(i, 1);
        }
      }
      return data;
    },
    getShopIds(data) {
      return data.map((item) => {
        return item.split("_")[1];
      });
    },
    getOrgIds(data) {
      return Array.from(
        new Set(
          data.map((item) => {
            return item.split("_")[0];
          })
        )
      ).filter((item) => item);
    },
    handleShopConfirm() {
      console.log("selectOrgShopList", deepCopy(this.selectOrgShopList));
      console.log("this.currentOrgId", this.currentOrgId);
      if (this.currentOrgId) {
        this.deepRemoveArrayItem(this.selectOrgShopList, this.currentOrgId);
        console.log(
          "this.currentSelectOrgShopIds",
          this.currentSelectOrgShopIds
        );
        if (this.currentSelectOrgShopIds.length > 0) {
          this.selectOrgShopList.push(...this.currentSelectOrgShopIds);
        }
        console.log("this.selectOrgShopList", this.selectOrgShopList);
      }
      this.selectShopIds = this.getShopIds(this.selectOrgShopList);
      console.log("this.selectShopIds", this.selectShopIds);
      this.selectedRowKeys = this.getOrgIds(this.selectOrgShopList);
      console.log("this.selectedRowKeys", this.selectedRowKeys);
      this.currentSelectOrgShopIds = deepCopy(this.selectOrgShopList);
      console.log(
        "this.currentSelectOrgShopIds",
        deepCopy(this.currentSelectOrgShopIds)
      );
    },
    async handleSubmit() {
      if(!this.selectShopIds || this.selectShopIds.length == 0) return this.$message.warn('请选择店铺');
      this.confirmLoading = true;
      //console.log("this.selectShopIds", this.selectShopIds);
      this.$emit("submit", this.selectShopIds);
    },
    closeModal(freshTable) {
      this.confirmLoading = false;
      this.$emit("cancel", freshTable);
    },
  },
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
.ant-table-wrapper {
  margin-top: 10px;
}
header {
  border-radius: 4px;
  background-color: #f5f5f5;
  padding: 24px 32px;
  margin-bottom: 15px;
}
/deep/ .ant-popover-message > .anticon {
  display: none !important;
}
</style>
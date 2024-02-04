<template>
  <a-modal
    class="productManage"
    :visible="visible"
    :title="'选择直播'"
    :maskClosable="false"
    :destroyOnClose="true"
    :keyboard="false"
    :closable="true"
    :confirmLoading="confirmLoading"
    width="1300px"
    @cancel="closeModal()"
    @ok="handleSubmit"
  >
    <div class="searchBox">
      <a-form layout="inline" :form="searchParams">
        <a-form-item label="直播间名称">
          <a-input
            allowClear
            v-model="searchParams.name"
            placeholder="请输入直播间名称"
          ></a-input>
        </a-form-item>
        <a-form-item label="直播间ID">
          <a-input
            type="number"
            allowClear
            v-model="searchParams.roomId"
            placeholder="请输入直播间ID"
          ></a-input>
        </a-form-item>
        <a-form-item label="直播状态">
          <a-select
            showSearch
            allowClear
            style="width: 195px"
            :options="liveStatusList"
            v-model="searchParams.liveStatus"
            placeholder="请选择"
          >
          </a-select>
        </a-form-item>
        <a-form-item label="创建时间">
          <a-range-picker
            ref="datepiker"
            @change="onChange"
            format="YYYY-MM-DD HH:mm:ss"
            v-model="defaultDate"
          />
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
    <div>
      <a-table
        :row-selection="rowSelection"
        :columns="columns"
        :data-source="dataSource"
        :rowKey="'roomId'"
        :pagination="pagination"
        @change="handleTableChange"
      ></a-table>
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
import { findDictNameByValue, createOptionsByDict } from "@/utils/dict";
import moment from "moment";
const appId = createOptionsByDict("LIVE_APPID")[0]
  ? createOptionsByDict("LIVE_APPID")[0].value
  : "100000054"; // 直播平台id
export default {
  name: "chooseLive",
  props: {
    roomIdList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
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
      pagination: {
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
      columns: [
        {
          title: "直播间ID",
          dataIndex: "roomId",
          width: 125,
          key: "roomId",
        },
        {
          title: "直播间名称",
          dataIndex: "name",
          width: 125,
          key: "name",
        },
        {
          title: "直播间图片",
          dataIndex: "shareImgLocal",
          width: 125,
          key: "shareImgLocal",
          customRender: (text, record) => {
            if (text) {
              return <table-img src={text} />;
            } else {
              return <table-img src={record.shareImg} />;
            }
          },
        },
        {
          title: "主播昵称",
          dataIndex: "anchorName",
          width: 125,
          key: "anchorName",
        },
        {
          title: "主播微信号",
          dataIndex: "anchorWechat",
          width: 125,
          key: "anchorWechat",
        },
        {
          title: "直播状态",
          dataIndex: "liveStatus",
          width: 125,
          key: "liveStatus",
          customRender: (text, record) =>
            findDictNameByValue("LIVE_STATUS", text),
        },
        {
          title: "直播时间段",
          dataIndex: "startTime",
          width: 260,
          key: "startTime",
          customRender: (text, record) => {
            return record.startTime + "至" + record.endTime;
          },
        },
        {
          title: "创建时间",
          dataIndex: "createTime",
          width: 155,
          key: "createTime",
        },
        {
          title: "创建人账号",
          dataIndex: "phone",
          width: 140,
          key: "phone",
        },
        {
          title: "分享量",
          dataIndex: "shareCount",
          key: "shareCount",
          align: "center",
          width: 125,
        },
        {
          title: "订单量",
          dataIndex: "orderCount",
          align: "center",
          key: "orderCount",
          width: 125,
        },
      ],
      searchParams: {
        name: "",
        roomId: "",
        liveStatus: undefined,
        startTime: "",
        endTime: "",
      },
      tableLoading: false,
      appId: appId,
      liveStatusList: createOptionsByDict("LIVE_STATUS"), // 直播间状态
      defaultDate: [],
    };
  },
  methods: {
    // 确定提交
    handleSubmit() {
      this.confirmLoading = true;
      const { selectedRows, alist } = this;
      // 商品提交
      console.log(selectedRows, alist);
      let obj = {};
      const newArr = selectedRows.reduce((item, n) => {
        // eslint-disable-next-line no-unused-expressions
        obj[n.roomId] ? "" : (obj[n.roomId] = true && item.push(n));
        return item;
      }, []);
      let arr = Array.from(new Set(alist));
      let selectArr = arr.map((item) => {
        for (let i = 0, length = newArr.length; i < length; i++) {
          if (newArr[i].roomId == item) {
            return newArr[i];
          }
        }
      });
      let ids = [];
      selectArr.forEach((item) => {
        ids.push(item.roomId);
      });
      this.$emit("confirmGoodList", ids);
      this.visible = false;
      this.searchParams.goodsName = "";
    },
    // 取消
    closeModal() {
      this.visible = false;
      this.searchParams.goodsName = "";
      this.$emit("cancel", false);
    },
    handleTableChange(pagination, filters, sorter) {
      this.pagination.current = pagination.current;
      this.pagination.pageSize = pagination.pageSize;
      this.getLiveRoom();
    },
    handleSearch() {
      //  this.rowSelection()
      // this.alist = this.roomIdList.map((item) => {
      //   return item.id;
      // });
      console.log(this.roomIdList);
      this.alist = this.roomIdList;
      // this.selectedRows = this.roomIdList;
      this.selectedRows = this.roomIdList.map((item) => {
        return {
          roomId: item,
        };
      });
      this.rowSelection = {
        type: "checkbox",
        selections: true,
        selectedRowKeys: this.alist,
        // columnTitle: `已选择${this.alist.length || 0}/5`,
        columnTitle: `已选择${this.alist.length || 0}`,
        columnWidth: "100px",
        hideDefaultSelections: true,
        onChange: (item, val) => {
          this.selectedRows = this.selectedRows.concat(val);
          // this.selectedRows = val;
          this.rowSelection.selectedRowKeys = item;
          // this.alist = Array.from(new Set(this.alist.concat(item)));
          this.alist = item;
          // this.selectedRowKeys = item;
          // this.rowSelection.columnTitle = `已选择${item.length || 0}/5`;
          this.rowSelection.columnTitle = `已选择${item.length || 0}`;
          // this.selectedRowKeys = item;
          // if (val.length >= 5) {
          //   const checkBox = document.querySelectorAll(
          //     ".ant-checkbox .ant-checkbox-input"
          //   );
          //   if (checkBox) {
          //     checkBox.forEach((item) => {
          //       if (!item.checked) {
          //         item.disabled = "disabled";
          //         item.style.cursor = "not-allowed";
          //         item.nextSibling.style.background = "#f5f5f5";
          //       } else {
          //         item.nextSibling.style.backgroundColor = "#1890ff";
          //         item.nextSibling.style.borderColor = "#1890ff";
          //       }
          //     });
          //   }
          // } else {
          //   const checkBox = document.querySelectorAll(".ant-checkbox-input");
          //   if (checkBox) {
          //     checkBox.forEach((item) => {
          //       item.disabled = false;
          //       item.style.cursor = "pointer";
          //       item.nextSibling.style.backgroundColor = "#fff";
          //       if (item.checked) {
          //         item.nextSibling.style.backgroundColor = "#1890ff";
          //         item.nextSibling.style.borderColor = "#1890ff";
          //       }
          //     });
          //   }
          // }
          // const disabledBox = document.querySelectorAll(
          //   ".ant-checkbox-disabled .ant-checkbox-input"
          // );
          // if (disabledBox) {
          //   disabledBox.forEach((item) => {
          //     item.style.cursor = "not-allowed";
          //     item.nextSibling.style.background = "#f5f5f5";
          //   });
          // }
        },
        // onSelect: this.onTableTreeSelect,
        getCheckboxProps: (record) => ({
          props: {
            defaultChecked: this.alist.includes(record.id),
            disabled:
              record.liveStatus != 101 &&
              record.liveStatus != 102 &&
              record.liveStatus != 103,
          },
        }),
      };
      this.getLiveRoom();
    },

    async getLiveRoom() {
      this.tableLoading = true;
      let params = JSON.parse(JSON.stringify(this.searchParams));
      if (!params.startTime || !params.endTime) {
        delete params.startTime;
        delete params.endTime;
      }
      let res = await this.$get("goldenhome/gh_/live/admin/room/page", {
        current: this.pagination.current,
        size: this.pagination.pageSize,
        appId: this.appId,
        ...params,
      });
      if (res && res.returnCode == 1000) {
        if (res.dataInfo != null) {
          this.dataSource = res.dataInfo.records;
          this.pagination.total = res.dataInfo.total;
          // this.$nextTick(() => {
          //   const val = this.roomIdList;
          //   if (val.length >= 5) {
          //     const checkBox = document.querySelectorAll(
          //       ".ant-checkbox .ant-checkbox-input"
          //     );
          //     if (checkBox) {
          //       checkBox.forEach((item) => {
          //         if (!item.checked) {
          //           item.disabled = "disabled";
          //           item.nextSibling.style.background = "#f5f5f5";
          //           item.style.cursor = "not-allowed";
          //         }
          //       });
          //     }
          //   }
          // });
        }
      }
      this.tableLoading = false;
    },
    onSearch() {
      this.getLiveRoom();
      console.log(this.searchParams);
    },
    resetSearch() {
      this.searchParams = {
        name: "",
        roomId: "",
        liveStatus: undefined,
        startTime: "",
        endTime: "",
      };
      this.getLiveRoom();
      this.defaultDate = [];
    },
    onChange(date, dateString) {
      console.log(date, dateString);
      this.searchParams.startTime = dateString[0];
      this.searchParams.endTime = dateString[1];
    },
  },
  watch: {
    visible(n) {
      if (n) {
        this.pagination.current = 1;
        this.handleSearch();
      } else {
        this.searchParams = {
          name: "",
          roomId: "",
          liveStatus: undefined,
          startTime: "",
          endTime: "",
        };
        this.defaultDate = [];
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
</style>


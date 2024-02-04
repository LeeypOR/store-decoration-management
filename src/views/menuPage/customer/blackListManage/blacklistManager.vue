<!--
<template>
  <div>
    <search-table
      style="margin-top: 30px"
      :url="url"
      ref="searchtable"
      :columns="columns"
      :form="form"
    >
      <template slot="searchForm">
        <a-form layout="inline" :form="form">
          <div style="display: flex">
            <a-form-item>
              <a-select
                v-decorator="['nickName', { initialValue: '' }]"
                style="width: 120px"
                @change="onChange"
              >
                <a-select-option value=""> 全部行为 </a-select-option>
                <a-select-option value="金牌讲师"> 金牌讲师 </a-select-option>
                <a-select-option value="行为"> 行为 </a-select-option>
              </a-select>
            </a-form-item>
            <a-button type="primary"> 批量移除 </a-button>
          </div>
        </a-form>
      </template>
      <template slot="oprationRow"> <div></div></template>
      <template slot="tableOperation">
        <permission authority="customer:info">
          <span
            class="text-primary pointer"
            @click="updateInfo"
            style="margin-right: 20px"
            >编辑</span
          >
        </permission>
        <permission authority="customer:info">
          <span class="text-primary pointer" @click="deleteItem">移除</span>
        </permission>
      </template>
    </search-table>
    <a-modal
      title="编辑"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      okText="保存"
      class="updateInfomation"
    >
      <a-form-model :model="updateBlackInfo">
        <a-form-model-item label="限制行为">
          <a-checkbox-group
            v-model="updateBlackInfo.limited"
            style="margin-bottom: 20px"
          >
            <a-checkbox value="1" name="type"> Online </a-checkbox>
            <a-checkbox value="2" name="type"> Promotion </a-checkbox>
            <a-checkbox value="3" name="type"> Offline </a-checkbox>
          </a-checkbox-group>
        </a-form-model-item>
        <a-form-model-item label="拉黑原因">
          <a-input v-model="updateBlackInfo.desc" type="textarea" :rows="4" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // url: "/blacklist/page",
      currentRecord: {},
      form: this.$form.createForm(this, { name: "table_search" }),
      columns: [
        {
          title: "用户ID",
          dataIndex: "id",
          key: "id",
          width: "250px",
        },
        // {
        //   title: "头像",
        //   dataIndex: "avatar",
        //   key: "avatar",
        //   align: "center",
        //   customRender: (text, row) => {
        //     return <table-img src={text} />;
        //   },
        // },
        {
          title: "限制行为",
          dataIndex: "behaviorCode",
          key: "behaviorCode",
        },
        {
          title: "拉黑原因",
          dataIndex: "blackoutReason",
          key: "blackoutReason",
        },
        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" },
        },
      ],
      visible: false,
      confirmLoading: false,
      updateBlackInfo: {
        limited: [],
        desc: "",
      },
    };
  },
  methods: {
    onChange(value) {
      let time = setTimeout(() => {
        this.$refs.searchtable.handleSubmit();
        clearTimeout(time);
      }, 100);
    },
    hiddenBtn() {
      let searchBtn = document.querySelector(".searchBtn");
      let resetBtn = document.querySelector(".resetBtn");
      searchBtn.style.display = "none";
      resetBtn.style.display = "none";
    },
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
    //编辑
    updateInfo() {
      this.visible = true;
    },
    //移除
    deleteItem() {
      this.$confirm({
        title: "确定要移除黑名单",
        content: "将同时移除所有的限制行为",
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
  },
  mounted() {
    this.hiddenBtn();
  },
};
</script>
<style rel="stylesheet/less" lang="less" scoped>
/deep/.search-form {
  display: flex !important;
  position: relative;
}
.ant-select {
  margin-right: 10px;
}
/deep/.ant-btn {
  margin-top: 0 !important;
}
/deep/.ant-form-item {
  display: flex;
  align-items: center;
}
/deep/.ant-form-item-children {
  display: flex;
}
.updateInfomation {
  /deep/.ant-form-item {
    display: unset;
  }
}
</style>
-->

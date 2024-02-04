<!-- 图库首页 -->
<template>
  <div class="conent_wrap">
    <search-table
      :url="url"
      ref="searchtable"
      :columns="columns"
      :form="form"
      :showSizeChanger="true"
      @selectedRowChange="getSelectedRow"
    >
      <template slot="searchForm">
        <a-form layout="inline" ref="ceshi" :form="form">
          <a-form-item>
            <a-select v-decorator="['pageStatus', { initialValue: '' }]">
              <a-select-option value="">全部状态</a-select-option>
              <a-select-option value="1">已发布</a-select-option>
              <a-select-option value="0">未发布</a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
      </template>
      <template slot="oprationRow">
        <a-button type="primary" @click="addNewDivision">新建分类</a-button>
        <a-button
          @click="deleteRows($refs.searchtable.selectedRows)"
          icon="delete"
          >删除页面</a-button
        >
        <a-button
          icon="book"
          @click="classifyAdd($refs.searchtable.selectedRows, true, '发布页面')"
          >发布页面</a-button
        >
        <a-button
          icon="file-excel"
          @click="
            classifyAdd($refs.searchtable.selectedRows, false, '取消发布')
          "
          >取消发布</a-button
        >
      </template>
      <template slot="ImgTextTable" slot-scope="{ record }">
        <div class="alignCenter">
          <span>{{ record.pageName }}</span>
          <img v-if="record.isIndex == 1" :src="imgUrl" alt="" />
        </div>
      </template>
      <template slot="tableOperation" slot-scope="{ record }">
        <!-- <permission v-if="record.parentId == 0"> -->
        <span class="text-primary pointer" @click="updeteDivision(record.id)"
          >编辑</span
        >
        <!-- </permission> -->
        <a-divider type="vertical" />
        <permission>
          <span
            v-if="record.pageStatus == 0"
            class="text-primary pointer"
            @click="classifyAdd([record], true, '发布页面')"
            >发布</span
          >
          <span
            class="text-primary pointer"
            v-else
            @click="classifyAdd([record], false, '下架页面')"
            >取消</span
          >
        </permission>
        <a-divider type="vertical" />
        <permission>
          <span
            class="text-primary pointer"
            @click="copyAdd({ ...record, add: 'update' })"
            >复制</span
          >
        </permission>
        <a-divider type="vertical" />
        <permission>
          <span v-if="record.isNavigation == 1" class="text-primary pointer"
            >已设为底部导航</span
          >
          <span v-else class="text-primary pointer" @click="openNew(record)"
            >设为底部导航</span
          >
        </permission>
      </template>
    </search-table>
    <addModal
      :visible="visible"
      @cancel="closeInfoModal"
      @confirm="comfirmMoadl"
    ></addModal>
  </div>
</template>

<script>
import addModal from "./components/addModal.vue";
export default {
  name: "divisionSetting",
  directives: {},
  filters: {},
  mixins: [],
  model: {},
  props: {},
  components: {
    addModal,
  },
  data() {
    return {
      showModal: false,
      childModal: false,
      title: "新增分类",
      url: "goldenhome/decoration/admin_/goods/classification/page",
      form: this.$form.createForm(this, { name: "table_search" }),
      currentRecord: {},
      imgUrl: require("@/assets/images/shop/isIndex.png"),
      columns: [
        {
          title: "页面名称",
          dataIndex: "pageTitle",
          scopedSlots: { customRender: "pageTitle" },
        },
        {
          title: "页面状态",
          dataIndex: "pageStatus",
          key: "pageStatus",
          // align: "center",
          customRender: (text, row) => {
            // const val = row.pageInfo.pageStatus;
            switch (text) {
              case 0:
                return "未发布";
              case 1:
                return "已发布";
              default:
                return "不存在的值";
            }
          },
        },
        {
          title: "最后保存时间",
          dataIndex: "updateDate",
          key: "updateDate",
          // align: "center",
          // customRender: (text, row) => {
          //   const val = row.pageInfo.updateDate;
          //   return val;
          // },
        },

        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" },
        },
      ],
      visible: false,
    };
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {
    console.log(this.$refs);
    this.$nextTick(() => {
      this.$refs.searchtable.refreshTable();
    });
  },
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
  // 方法集合
  methods: {
    // 跳转到新建微页面装修页面
    addNewDivision() {
      this.visible = true;
    },
    updeteDivision(id) {
      this.$router.push({
        name: "ShopSystemDivisionSettingStyleEditor",
        query: { pageId: id },
      });
    },
    initData(records) {
      let source = this.$refs.searchtable.dataSource;
      if (records.parentId == 0) return records;
      source.forEach((item) => {
        if (records.parentId == item.id) {
          records.parentName = item.classificationName;
        }
      });
      return records;
    },
    openNew(records) {
      console.log(records);
      this.$confirm({
        title: "设为底部导航",
        content: "是否设为底部导航",
        okText: "确认",
        cancelText: "取消",
        onOk: () => {
          this.$post(
            "goldenhome/decoration/admin_/goods/classification/navigation",
            {
              id: records.id,
            }
          ).then((res) => {
            if (res && res.returnCode == 1000) {
              this.$message.success("设置成功");
              this.$refs.searchtable.refreshTable();
            }
          });
        },
      });
    },
    getSelectedRow(rows) {
      console.log("选择的", rows);
      // if (rows.length > 0) {
      // 	this.currentSelectedProductInfo = rows[0]
      // }
      // console.log('row', this.currentSelectedProductInfo)
    },
    deleteRows(ids) {
      const list = ids.map((item) => {
        return item.id;
      });
      if (!ids || ids.length === 0) {
        return this.$message.warn("请先选择一项后再进行操作");
      }
      this.$confirm({
        title: "删除提示",
        content: "删除操作不可恢复，请确认是否删除？",
        okText: "确认删除",
        cancelText: "取消",
        onOk: () => {
          this.$post(
            "goldenhome/decoration/admin_/goods/classification/delete",
            list
          ).then((res) => {
            if (res && res.returnCode == 1000) {
              this.$message.success("删除成功");
              this.$refs.searchtable.refreshTable();
            }
          });
        },
      });
    },
    // list列表数据 a上架下架 title标题
    classifyAdd(ids, a, title) {
      // console.log(ids)
      // return
      var url = "goldenhome/decoration/admin_/goods/classification/update";
      var pageStatus1 = 1;
      if (!a) {
        pageStatus1 = 0;
      }
      // if (!a) url = "goldenhome/decoration/admin_/page/ms/disable";
      // console.log(ids)
      // return
      const list = ids.map((item) => {
        return item.id;
      });
      if (!ids || ids.length === 0) {
        return this.$message.warn("请先选择一项后再进行操作");
      }
      this.$confirm({
        title: title,
        content: a
          ? "是否发布所选页面，发布后立即生效！"
          : "是否取消发布所选页面，取消后用户无法访问！",
        okText: "确认",
        cancelText: "取消",
        onOk: () => {
          this.$post(url, { ids: list, pageStatus: pageStatus1 }).then(
            (res) => {
              // console.log(res)
              if (res && res.returnCode == 1000) {
                this.$message.success(a ? "发布成功" : "取消成功");
                this.$refs.searchtable.refreshTable();
              }
            }
          );
        },
      });
    },

    // 复制页面
    copyAdd(ids) {
      const id = ids.id;
      this.$confirm({
        title: "复制页面",
        content: "是否复制页面",
        okText: "确认",
        cancelText: "取消",
        onOk: () => {
          this.$get("goldenhome/decoration/admin_/goods/classification/copy", {
            pageId: id,
          }).then((res) => {
            // console.log(res)
            if (res && res.returnCode == 1000) {
              this.$message.success("复制成功");
              this.$refs.searchtable.refreshTable();
            }
          });
        },
      });
    },
    handleSubmit() {
      this.showModal = false;
      this.$refs.searchtable.refreshTable();
    },
    // 跳转编辑
    classifyEditor(item) {
      console.log(item);
    },
    //关闭modal
    closeInfoModal(e) {
      this.visible = false;
    },
    comfirmMoadl(e) {
      this.visible = false;
    },
  },
};
</script>
<style rel="stylesheet/less" lang="less" scoped>
/deep/.alignCenter {
  display: flex;
  // flex-flow: column;
  align-items: center;
  color: #016bff;
  img {
    margin-left: 5px;
  }
}
</style>

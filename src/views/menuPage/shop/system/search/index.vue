<!-- 图库首页 -->
<template>
  <div class="conent_wrap">
    <!-- 主编辑区 -->
    <div class="editor-pane-inner">
      <EditorPanel :hotWordList="hotWordList"></EditorPanel>
    </div>
    <!-- 属性编辑区 -->
    <div class="attr-edit-wrapper">
      <EditAttrPage
        :hotWordList="hotWordList"
        @save="saveHotWords"
      ></EditAttrPage>
    </div>
  </div>
</template>

<script>
import EditorPanel from "./components/EditorPanel";
import EditAttrPage from "./components/EditAttrPage";

export default {
  name: "ShopSystemSearch",
  // 组件
  components: {
    EditorPanel,
    EditAttrPage,
  },
  directives: {},
  filters: {},
  mixins: [],
  model: {},
  props: {},
  data() {
    return {
      hotWordList: [],
      pageId: "",
    };
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {
    this.getAllHotWordConfig();
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
  // 方法集合
  methods: {
    // 获取所有已经配置的导航信息
    getAllHotWordConfig() {
      this.$get(
        "/hot/word/query",
        {},
        { baseURL: `${location.origin}/goldenhome/decoration/admin` }
      )
        .then((res) => {
          if (res.returnCode == "1000") {
            console.log(res, "搜索热词");
            this.hotWordList = res.dataInfo.hotWordList;
            this.pageId = res.dataInfo.pageId;
          }
        })
        .catch(() => {});
    },
    // 保存、更新
    saveHotWords(records) {
      this.$post(
        "/hot/word/add",
        { pageId: this.pageId, hotWordList: records._hotWords },
        { baseURL: `${location.origin}/goldenhome/decoration/admin` }
      ).then((res) => {
        if (res && res.returnCode == 1000) {
          this.$message.success("保存成功");
          this.getAllHotWordConfig();
        }
      });
    },
    //
  },
};
</script>
<style rel="stylesheet/less" lang="less" scoped>
.conent_wrap {
  width: 100%;
  height: calc(100vh - 118px);
  // height: 100%;

  display: flex;
  justify-content: space-between;
  .editor-pane-inner {
    flex: 1;
  }
  .attr-edit-wrapper {
    background-color: #f6f7f8;
    width: 376px;
    min-height: 300px;
    // padding: 16px;
  }
}
</style>

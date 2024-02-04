<!-- 图库首页 -->
<template>
  <div class="conent_wrap">
    <a-button @click="godivisionList">返回分类列表</a-button>
    <!-- 主编辑区 -->
    <div class="editor-pane-inner">
      <EditorPanel></EditorPanel>
    </div>
    <!-- 属性编辑区 -->
    <div class="attr-edit-wrapper">
      <EditAttrPage></EditAttrPage>
    </div>
  </div>
</template>

<script>
import EditorPanel from "./components/EditorPanel";
import EditAttrPage from "./components/EditAttrPage";
export default {
  name: "styleEditor",
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
      pageId: "",
    };
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {
    this.pageId = this.$route.query.pageId;
    if (this.pageId) {
      let params = {
        pageId: this.pageId,
      };
      this.getDetails(params);
    } else {
      this.$store.dispatch("setNavList", {
        navList: [],
      });
      this.$store.dispatch("setIsShowSerach", { show: 1 });
      this.$store.dispatch("setNavStyle", { navStyle: 1 });
      this.$store.dispatch("setTable", 1);
      let obj = {
        pageTitle: "",
        pageDesc: "",
        bgColorType: 1,
        bgColorValue: "#fffff",
      };
      this.$store.dispatch("setPageInfomation", obj);
    }
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {
    window.removeEventListener("beforeunload", (e) => this.clear(e));
  },
  // 方法集合
  methods: {
    //获取分类详情
    async getDetails(params) {
      let res = await this.$get(
        "goldenhome/decoration/admin_/goods/classification/query",
        params
      );
      if (res && res.returnCode == 1000) {
        if (!!res.dataInfo) {
          this.$store.dispatch("setIds", res.dataInfo.id || "");
          this.$store.dispatch(
            "setPageInfomation",
            res.dataInfo.pageInfo || {}
          );
          let obj = JSON.parse(res.dataInfo.pageMsJson);
          console.log(obj.isShowSearch, "77777777777777777777777");
          if (obj.navList) {
            if (obj.navList.length >= 1) {
              obj.navList[0].active = true;
            }
            if (obj.navList.length >= 2) {
              obj.navList[1].border = true;
            }
          }
          this.$store.dispatch(
            "setNavList",
            { navList: obj.navList } || {
              navList: [],
            }
          );
          this.$store.dispatch("setStyleCode", obj.styleCode || "TSO");
          this.$store.dispatch("setIsShowSerach", {
            show: obj.isShowSearch,
          });
          this.$store.dispatch("setNavStyle", { navStyle: obj.navStyle || 1 });
          this.$store.dispatch("setTable", 1);
        }
        console.log(res);
      }
    },
    clear() {
      this.$store.dispatch("setNavList", { navList: [] });
      this.$store.dispatch("setStyleCode", "");
      this.$store.dispatch("setIsShowSerach", {});
      this.$store.dispatch("setNavStyle", {});
      this.$store.dispatch("setPageInfomation", {});
      this.$store.dispatch("setIds", "");
      this.$store.dispatch("setTable", "");
    },
    godivisionList() {
      this.$router.push({
        name: "ShopSystemDivisionSetting",
      });
    },
  },
  beforeRouteLeave(to, from, next) {
    this.clear();
    next();
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

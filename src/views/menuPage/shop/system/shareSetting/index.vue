<!-- 图库首页 -->
<template>
  <div class="conent_wrap">
    <!-- 主编辑区 -->
    <div class="editor-pane-inner">
      <EditAttrPage></EditAttrPage>
    </div>
    <div class="attr-edit-wrapper">
      <EditorPanel></EditorPanel>
    </div>
  </div>
</template>

<script>
import EditorPanel from "./components/EditorPanel";
import EditAttrPage from "./components/EditAttrPage";
export default {
  name: "ShopSystemShareSetting",
  // 组件
  components: {
    EditAttrPage,
    EditorPanel,
  },
  directives: {},
  filters: {},
  mixins: [],
  model: {},
  props: {},
  data() {
    return {
      shareInfo: {},
    };
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {
    this.getShareInfo();
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
    initShareInfo() {
      const obj = {
        shareTitle: "首页",
        shareDes: "这家店有好货，一起瞧一瞧看一看吧",
        imageInfos: [
          {
            shareType: 1,
            imageAddr:
              "https://testsd.cicd.vpclub.cn/ghs/20210723/1cd2957664714edd98977f37093fb7ee.png",
          },
          {
            shareType: 2,
            imageAddr:
              "https://testsd.cicd.vpclub.cn/ghs/20210723/5893a12f63184e77830c04fcb0573dfc.png",
          },
        ],
      };
      this.$store.dispatch("setShareInfo", obj);
    },
    async getShareInfo() {
      let res = await this.$get(
        "/share/setting/query",
        {},
        { baseURL: `${location.origin}/goldenhome/decoration/admin` }
      ).catch(() => {
        this.initShareInfo();
      });
      if (res && res.returnCode == 1000) {
        if (!!res.dataInfo) {
          this.shareInfo = res.dataInfo;

          this.shareInfo.imageInfos.forEach((item) => {
            if (item.shareType == 1) {
              this.shareInfo.miniImg = item.imageAddr;
            } else {
              this.shareInfo.h5PosterImg = item.imageAddr;
            }
          });
          this.$store.dispatch("setShareInfo", this.shareInfo);
        } else {
          this.initShareInfo();
        }
      }
      console.log(res);
    },
    clear() {
      this.$store.dispatch("setShareInfo", {});
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
  padding-left: 300px;
  display: flex;
  justify-content: space-around;
  .editor-pane-inner {
    width: 376px;
  }
  .attr-edit-wrapper {
    background-color: #f6f7f8;
    width: 376px;
    min-height: 300px;
    // flex: 1;
    // padding: 16px;
  }
}
</style>

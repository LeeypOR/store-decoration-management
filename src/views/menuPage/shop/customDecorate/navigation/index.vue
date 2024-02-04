<!-- 图库首页 -->
<template>
  <div class="conent_wrap">
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
import { createOptionsByDict, findDictNameByValue } from "@/utils/dict";
export default {
  name: "ShopCustomDecorateNavigation",
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
      initData: {
        navigationTemplate: "1", // 颜色类型（1 默认 2 自定义）
        backgroundColor: "#ffffff", // 背景颜色值 默认白色
        navigationList: [
          // 当前数据默认两个
          {
            navigationName: "首页",
          },
          {
            navigationName: "全部商品",
          },
          {
            navigationName: "商品分类",
          },
          {
            navigationName: "购物车",
          },
          {
            navigationName: "个人中心",
            // jumpTargetType: "",
            // jumpTargetValue: "",
            // navigationImage: "",
            // navigationImageHigh: "",
          },
        ],
      },

      filterArr: [
        "PERSONALCENTER",
        "SHOPPINGCAR",
        "ALLGOODS",
        "CATEGORYPAGE",
        "MYPLAN",
      ],
      systemPageDict: createOptionsByDict("SYSTEM_PAGE"),
    };
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {
    this.getAllNavigationConfig();
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
    getAllNavigationConfig() {
      this.$get(
        "/store/navigation/config/query",
        {},
        { baseURL: `${location.origin}/goldenhome/decoration/admin` }
      )
        .then((res) => {
          console.log(res, "导航信息");
          if (res.returnCode == 1000) {
            if (!!res.dataInfo) {
              // console.log(
              //   res.dataInfo.configInfo.showStatus ? false : true || true,
              //   "88888888888888888888"
              // );
              this.$store.dispatch(
                "setShowNavigation",
                // res.dataInfo.configInfo.showStatus == 0 ? true : false || false
                true
              );
              this.$store.dispatch("setPageId", res.dataInfo.pageId);
              const dataInfo = res.dataInfo.configInfo;
              dataInfo.navigationList.forEach((item, i) => {
                if (item.jumpTargetType != "MSPAGE") {
                  item.jumpTargetName = findDictNameByValue(
                    "SYSTEM_PAGE",
                    item.jumpTargetType
                  );
                }
              });
              // this.$store.dispatch(
              //   "setNavigationData",
              //   res.dataInfo.configInfo
              // );
              // 处理各个导航名称
              let promiseList = [];
              Array.from(res.dataInfo.configInfo.navigationList).map((item) => {
                if (
                  // this.systemPageDict.indexOf(item.jumpTargetType) == -1 &&
                  // item.jumpTargetType != null
                  item.jumpTargetType.indexOf("MSPAGE") > -1 &&
                  item.jumpTargetType != null
                ) {
                  return promiseList.push(
                    this.getJumpLinkName(
                      item.jumpTargetType,
                      item.jumpTargetValue
                    )
                  );
                }
              });
              console.log(promiseList, "promiseList");
              if (promiseList.length > 0) {
                Promise.all(promiseList)
                  .then((res) => {
                    // console.log("222222222", res);
                    // console.log("333333333", dataInfo);
                    // res.forEach((item) => {
                    //   if (item.returnCode != "1000") {
                    //     item.dataInfo.jumpTargetName = "";
                    //   }
                    // });
                    // let newArr = [];
                    // newArr = res.reduce((res, cur) => res.concat(cur), []);
                    // _this.packageInfo = newArr;
                    let newArr = [];
                    dataInfo.navigationList.forEach((item, i) => {
                      // item.jumpTargetName = res[i].dataInfo.jumpTargetName;
                      if (item.jumpTargetType == "MSPAGE") {
                        newArr.push(item);
                      }
                    });
                    newArr.forEach((item, i) => {
                      item.jumpTargetName = res[i].dataInfo.jumpTargetName;
                    });
                    dataInfo.navigationList.forEach((item, i) => {
                      newArr.forEach((l, i) => {
                        if (
                          item.jumpTargetType == l.jumpTargetType &&
                          item.jumpTargetValue == l.jumpTargetValue
                        ) {
                          item.jumpTargetName = l.jumpTargetName;
                        }
                      });
                    });
                    this.$store.dispatch("setNavigationData", dataInfo);
                  })
                  .catch((err) => {
                    console.log(err);
                    this.$store.dispatch("setNavigationData", dataInfo);
                  });
              } else {
                this.$store.dispatch("setNavigationData", dataInfo);
              }
            } else {
              this.$store.dispatch("setNavigationData", this.initData);
              this.$store.dispatch("setPageId", "");
            }
          }
        })
        .catch(() => {});
    },

    async getJumpLinkName(type, id) {
      let res = await this.$get(
        "/common/jump/name",
        { jumpTargetType: type, jumpTargetValue: id },
        { baseURL: `${location.origin}/goldenhome/decoration/admin` }
      );

      return res;
    },
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

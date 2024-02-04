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
import { mapState } from "vuex";
export default {
  name: "ShopSystemPersonal",
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
      filterArr: [
        "PERSONALCENTER",
        "SHOPPINGCAR",
        "ALLGOODS",
        "CATEGORYPAGE",
        "MYPLAN",
      ],
      menu: [
        {
          isShow: true,
          sort: 1,
          styleType: 2,
          toolCode: "QB",
          toolImage:
            "https://testsd.cicd.vpclub.cn/ghs/20210722/8075a22f3a524923a87f8813e5b3a9c5.png",
        },
        {
          isShow: true,
          sort: 2,
          styleType: 2,
          toolCode: "ZXFA",
          toolImage:
            "https://testsd.cicd.vpclub.cn/ghs/20210722/d2bce14c382c4ce38ddd39c534485299.png",
        },
        {
          isShow: true,
          sort: 3,
          styleType: 2,
          toolCode: "YHQ",
          toolImage:
            "https://testsd.cicd.vpclub.cn/ghs/20210722/88727d0d2ad74601a347c30da832bd42.png",
        },
        {
          isShow: true,
          sort: 4,
          styleType: 2,
          toolCode: "SHDZ",
          toolImage:
            "https://testsd.cicd.vpclub.cn/ghs/20210722/c231b76a54c749e8b1fce5ed7ffe98aa.png",
        },
        {
          isShow: true,
          sort: 5,
          styleType: 2,
          toolCode: "SPSC",
          toolImage:
            "https://testsd.cicd.vpclub.cn/ghs/20210722/d07f52049e084225b8ae274e047d0f5d.png",
        },
        {
          isShow: true,
          sort: 6,
          styleType: 2,
          toolCode: "WDPT",
          toolImage:
            "https://testsd.cicd.vpclub.cn/ghs/20210722/d07f52049e084225b8ae274e047d0f5d.png",
        },
        {
          isShow: true,
          sort: 7,
          styleType: 2,
          toolCode: "CJZP",
          toolImage:
            "https://testsd.cicd.vpclub.cn/ghs/20210722/d07f52049e084225b8ae274e047d0f5d.png",
        },
        {
          isShow: true,
          sort: 8,
          styleType: 2,
          toolCode: "FPGL",
          toolImage:
            "https://testsd.cicd.vpclub.cn/ghs/20210722/d07f52049e084225b8ae274e047d0f5d.png",
        },
        {
          isShow: true,
          sort: 9,
          styleType: 2,
          toolCode: "DHZQ",
          toolImage:
            "https://testsd.cicd.vpclub.cn/ghs/20210722/d07f52049e084225b8ae274e047d0f5d.png",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      personalInfo: (state) => state.setPersonal.personalCenter,
      Tab: (state) => state.setPersonal.tab,
      adSpaceList: (state) => state.setPersonal.adSpaceList,
      menuList: (state) => state.setPersonal.menuList,
      pageInfo: (state) => state.setPersonal.pageInfo,
      styleType: (state) => state.setPersonal.styleType,
    }),
  },
  watch: {},
  beforeCreate() {},
  created() {
    this.$store.dispatch("setTab", 1);
    this.getPersonalInfo();
    this.getAdvertisingInfo();
    this.getMenuInfo();
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
    //个人中心信息查询
    initPersonaInfo() {
      let pageInfo = {
        bgColorType: 1,
        bgColorValue: "#fff",
        pageDesc: "描述22",
        pageTitle: "个人中心",
      };
      let personalCenter = {
        backgroundImage:
          "https://testsd.cicd.vpclub.cn/ghs/20210722/51dde99ba7db448b95370b2531430aed.png",
        backgroudColorValue: "#333333",
        backgroudColorType: 1,
        portraitLocation: 1,
        nicknameColor: "#333333",
        isShowMemberLevel: 1,
        // memberStyle: 1,
        isUpgrade: false,
        upgradeMsg: "",
        upgradeTargetId: "",
        upgradeTargetName: "",
        // levelText: "升级SVIP",
      };
      this.$store.dispatch("setPageInfo", pageInfo);
      this.$store.dispatch("setPersonalCenter", personalCenter);
    },
    async getPersonalInfo() {
      let res = await this.$get(
        "/personal/center/query",
        {},
        { baseURL: `${location.origin}/goldenhome/decoration/admin` }
      ).catch(() => {
        this.initPersonaInfo();
      });
      if (res && res.returnCode == 1000) {
        if (!!res.dataInfo) {
          if (res.dataInfo.personalCenter.isUpgrade) {
            res.dataInfo.personalCenter.isUpgrade =
              res.dataInfo.personalCenter.isUpgrade == 1 ? true : false;
          } else {
            res.dataInfo.personalCenter.isUpgrade = false;
          }
          this.$store.dispatch(
            "setPersonalCenter",
            res.dataInfo.personalCenter
          );
          this.$store.dispatch("setPageInfo", res.dataInfo.pageInfo);
        } else {
          this.initPersonaInfo();
        }
      } else {
        this.initPersonaInfo();
      }
    },
    //广告位信息查询
    getAdvertisingInfo() {
      this.$get(
        "/advertising/space/query",
        {},
        { baseURL: `${location.origin}/goldenhome/decoration/admin` }
      )
        .then((res) => {
          if (res && res.returnCode == 1000) {
            if (res.dataInfo != null) {
              const dataInfo = res.dataInfo;
              dataInfo.templateType = dataInfo.templateType + "";
              this.$store.dispatch("setAdSpaceList", res.dataInfo);
              // console.log(this.adSpaceList, "595959595959595959599595");
              let promiseList = [];
              if (res.dataInfo.spaceImages != null) {
                Array.from(res.dataInfo.spaceImages).map((item) => {
                  if (
                    this.filterArr.indexOf(item.jumpTargetType) == -1 &&
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
                      dataInfo.spaceImages.forEach((item, i) => {
                        item.jumpTargetName = res[i].dataInfo.jumpTargetName;
                      });
                      this.$store.dispatch("setAdSpaceList", dataInfo);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                } else {
                  dataInfo.spaceImages.forEach((item) => {
                    item.jumpTargetName = "";
                  });
                  this.$store.dispatch("setAdSpaceList", dataInfo);
                }
              } else {
                dataInfo.spaceImages = [];
                dataInfo.templateType = "1";
                dataInfo.locationType = 1;
                this.$store.dispatch("setAdSpaceList", dataInfo);
              }
            } else {
              let obj = {
                spaceImages: [],
                templateType: "1",
                locationType: 1,
              };
              this.$store.dispatch("setAdSpaceList", obj);
            }
          } else {
            let obj = {
              spaceImages: [],
              templateType: "1",
              locationType: 1,
            };
            this.$store.dispatch("setAdSpaceList", obj);
          }
        })
        .catch((err) => {
          let obj11 = {
            spaceImages: [],
            templateType: "1",
            locationType: 1,
          };
          this.$store.dispatch("setAdSpaceList", obj11);
        });

      // console.log(this.adSpaceList, "565656565656565656565656");
    },
    //获取跳转名称
    async getJumpLinkName(type, id) {
      let res = await this.$get(
        "/common/jump/name",
        { jumpTargetType: type, jumpTargetValue: id },
        { baseURL: `${location.origin}/goldenhome/decoration/admin` }
      );
      return res;
    },
    //菜单配置信息查询
    initmenu() {
      let menu = [
        {
          isShow: true,
          sort: 1,
          styleType: 2,
          toolCode: "QB",
          toolImage:
            "https://testsd.cicd.vpclub.cn/ghs/20210722/8075a22f3a524923a87f8813e5b3a9c5.png",
        },
        {
          isShow: true,
          sort: 2,
          styleType: 2,
          toolCode: "ZXFA",
          toolImage:
            "https://testsd.cicd.vpclub.cn/ghs/20210722/d2bce14c382c4ce38ddd39c534485299.png",
        },
        {
          isShow: true,
          sort: 3,
          styleType: 2,
          toolCode: "YHQ",
          toolImage:
            "https://testsd.cicd.vpclub.cn/ghs/20210722/88727d0d2ad74601a347c30da832bd42.png",
        },
        {
          isShow: true,
          sort: 4,
          styleType: 2,
          toolCode: "SHDZ",
          toolImage:
            "https://testsd.cicd.vpclub.cn/ghs/20210722/c231b76a54c749e8b1fce5ed7ffe98aa.png",
        },
        {
          isShow: true,
          sort: 5,
          styleType: 2,
          toolCode: "SPSC",
          toolImage:
            "https://testsd.cicd.vpclub.cn/ghs/20210722/d07f52049e084225b8ae274e047d0f5d.png",
        },
        {
          isShow: false,
          sort: 6,
          styleType: 2,
          toolCode: "WDPT",
          toolImage:
            "https://testsd.cicd.vpclub.cn/ghs/20210722/d07f52049e084225b8ae274e047d0f5d.png",
        },
        {
          isShow: true,
          sort: 7,
          styleType: 2,
          toolCode: "CJZP",
          toolImage:
            "https://testsd.cicd.vpclub.cn/ghs/20210722/d07f52049e084225b8ae274e047d0f5d.png",
        },
        {
          isShow: true,
          sort: 8,
          styleType: 2,
          toolCode: "FPGL",
          toolImage:
            "https://testsd.cicd.vpclub.cn/ghs/20210722/d07f52049e084225b8ae274e047d0f5d.png",
        },
        {
          isShow: true,
          sort: 9,
          styleType: 2,
          toolCode: "DHZQ",
          toolImage:
            "https://testsd.cicd.vpclub.cn/ghs/20210722/d07f52049e084225b8ae274e047d0f5d.png",
        },
      ];
      this.$store.dispatch("setMenuList", menu);
      this.$store.dispatch("setStyleType", {
        styleType: "2",
      });
    },
    async getMenuInfo() {
      let res = await this.$get(
        "/menu/config/query",
        {},
        { baseURL: `${location.origin}/goldenhome/decoration/admin` }
      );
      if (res && res.returnCode == 1000) {
        if (!!res.dataInfo) {
          const dataInfo = res.dataInfo;
          if (!dataInfo.menuList.length < 5) {
            dataInfo.menuList.forEach((item) => {
              if (item.isShow == 1) {
                item.isShow = true;
              } else if (item.isShow == 0) {
                item.isShow = false;
              }
              this.menu.forEach((l) => {
                if (l.toolCode == item.toolCode) {
                  l.isShow = item.isShow;
                  l.sort = item.sort;
                  l.styleType = item.styleType;
                  l.toolImage = item.toolImage;
                }
              });
            });
            if (dataInfo.styleType) {
              dataInfo.styleType = dataInfo.styleType + "";
            }
            this.menu.sort((a, b) => {
              return a.sort - b.sort;
            });
            this.$store.dispatch("setMenuList", this.menu);
            this.$store.dispatch("setStyleType", {
              styleType: dataInfo.styleType || "1",
            });
          } else {
            this.initmenu();
          }
        } else {
          this.initmenu();
        }
      }
      console.log(res);
    },
    clear() {
      this.$store.dispatch("setPersonalCenter", {});
      this.$store.dispatch("setTab", "");
      this.$store.dispatch("setAdSpaceList", {});
      this.$store.dispatch("setMenuList", []);
      this.$store.dispatch("setStyleType", {});
      this.$store.dispatch("setPageInfo", {});
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

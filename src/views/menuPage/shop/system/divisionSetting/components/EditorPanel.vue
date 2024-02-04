<template>
  <div
    class="editor-main"
    :style="{
      transform: 'scale(1)',
    }"
  >
    <div
      class="header_wrap"
      @click="changeTable1"
      :style="{
        border: table == 1 ? '1px dashed #1890ff' : '',
        background:
          pageInfo.bgColorType == 2 ? pageInfo.bgColorValue : '#ffffff',
      }"
    >
      <h1 class="my-header">{{ pageInfo.pageTitle }}</h1>
      <div class="headright">
        <div style="width: 48%">
          <div class="left">
            <div></div>
            <div style="width: 7px; height: 7px"></div>
            <div></div>
          </div>
        </div>
        <div
          style="width: 1px; height: 19px; background: rgba(0, 0, 0, 0.2)"
        ></div>
        <div style="width: 48%">
          <div class="right">
            <div class="small"></div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="mainAreaBox"
      :style="table == 2 ? 'border:1px dashed #1890ff' : ''"
      @click="changeTable2"
    >
      <div
        class="page-preview-wrapper"
        ref="canvas-panel"
        id="canvas-panel"
        v-if="isShowSerach.show == 1"
      >
        <div class="input_box">
          <i class="icon_search"></i>
          <input class="input" type="text" placeholder="请输入关键词" />
        </div>
        <!--页面组件列表展示-->
      </div>
      <div class="mainArea" :class="styleCode == 'TSO' ? 'TSO' : 'TST'">
        <ul
          class="navList"
          v-if="styleCode == 'TSO'"
          :style="{
            border: navList.navList.length == 0 ? '1px solid skyblue;' : '',
            justifyContent: navList.navList.length <= 3 ? 'center' : '',
          }"
        >
          <li
            v-for="(l, i) in navList.navList"
            :key="i"
            :style="
              navStyle.navStyle == 1
                ? ''
                : 'background:#ffffff;margin-left: 0px;border-radius: 0;color: #666666;'
            "
            @click="chooseNav(l, i)"
            :class="
              l.active && navStyle.navStyle == 1
                ? 'topNav1'
                : l.active && navStyle.navStyle == 2
                ? 'topNav2'
                : l.active && navStyle.navStyle == 3
                ? 'topNav3'
                : ''
            "
          >
            {{ l.title }}
            <div
              class="underLine"
              v-if="l.active && navStyle.navStyle == 2"
            ></div>
          </li>
          <li class="blackRight" style="background: #fff"></li>
        </ul>
        <ul class="CSNavList" v-if="styleCode == 'TST'">
          <li
            v-for="(l, i) in navList.navList"
            :key="i"
            :style="
              l.border && navStyle.navStyle == 2
                ? 'border-top-right-radius: 10px;'
                : ''
            "
            @click="chooseNav(l, i)"
            :class="l.active ? 'LeftNav' : ''"
          >
            <div
              class="CSnavStyle3"
              v-if="l.active && navStyle.navStyle == 3"
            ></div>
            {{ l.title }}
          </li>
          <li class="bottomList" style="background: rgb(242, 242, 242)"></li>
        </ul>
        <div class="componentBox" v-if="pageStatus == 'MSPAGE'">
          <div
            class="pointer component-item"
            ref="componentsItem"
            v-for="(item, i) in pageList"
            :key="i + item.id"
          >
            <component :is="item.key" :item="item"></component>
          </div>
        </div>
        <divisionPage
          v-else
          :divisionData="divisionData"
          :styleCode="styleCode"
          @changeDivisionData="changeDivisionData"
          style="flex-grow: 1"
        ></divisionPage>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import divisionPage from "./divisionPage.vue";
import * as components from "../../../customDecorate/microPage/components/editCustom/components/components/index";
const nameInComponents = {};
Object.keys(components).forEach((key) => {
  nameInComponents[components[key].name] = components[key];
});
export default {
  data() {
    return {
      pageList: [],
      anum: 0,
      divisionData: {},
      pageStatus: "MSPAGE",
    };
  },
  components: {
    ...nameInComponents,
    divisionPage,
  },
  props: {},
  watch: {
    watchNavlist: {
      deep: true,
      handler(newVal, oldVal) {
        if (this.anum >= 1) {
          let arr1 = {};
          newVal.navList.forEach((item, i) => {
            if (item.active) {
              arr1 = item;
              arr1.index = i;
            }
          });
          let arr2 = {};
          oldVal.navList.forEach((item, i) => {
            if (item.active) {
              arr2 = item;
              arr2.index = i;
            }
          });
          if (
            arr1.index == arr2.index &&
            arr1.jumpTargetValue != arr2.jumpTargetValue
          ) {
            this.activeModel();
          }
        }
      },
    },
    navList: {
      deep: true,
      handler(newVal, oldVal) {
        this.anum++;
        if (this.anum <= 1) {
          this.activeModel();
        } else {
          if (newVal.navList.length == 0) {
            this.pageList = [];
          } else {
            let num = 0;
            newVal.navList.forEach((item) => {
              if (item.active == true) {
                num++;
              }
            });
            if (num == 0) {
              newVal.navList[0].active = true;
              if (newVal.navList[1]) {
                newVal.navList[1].border = true;
              }
              this.activeModel();
            }
          }
        }
      },
    },
    pageList: {
      deep: true,
      handler(n, o) {
        this.$set(this.pageList, n);
      },
    },
  },
  computed: {
    ...mapState({
      navList: (state) => state.divisionSetting.navList,
      styleCode: (state) => state.divisionSetting.styleCode,
      isShowSerach: (state) => state.divisionSetting.isShowSerach,
      table: (state) => state.divisionSetting.table,
      pageInfo: (state) => state.divisionSetting.pageInfomation,
      navStyle: (state) => state.divisionSetting.navStyle,
    }),
    watchNavlist() {
      return JSON.parse(JSON.stringify(this.navList));
    },
  },
  created() {
    // console.log(this.navList)
    // if (this.navList.navList) {
    //   this.navList.navList[0].active = true;
    // }
    // console.log(this.navList,'88888888')
    // this.activeModel();
  },

  methods: {
    activeModel() {
      if (this.navList.navList) {
        var num = 0;
        this.navList.navList.forEach((l) => {
          if (l.jumpTargetValue && l.active) {
            num++;
            if (l.jumpTargetType == "MSPAGE") {
              let id = {
                id: l.jumpTargetValue,
              };
              this.getNavPage(id);
            } else if (l.jumpTargetType == "CLASSIFY") {
              this.pageList = [];
              let pageId = {
                pageId: l.jumpTargetValue,
              };
              this.getClassufyDetails(pageId);
            } else {
              let id = {
                id: l.jumpTargetValue,
              };
              this.getNavPage(id);
            }
          }
        });
        if (num == 0) {
          this.pageList = [];
        }
      }
    },
    chooseNav(l, i) {
      //激活项
      console.log(l);
      this.navList.navList.forEach((item) => {
        item.active = false;
        item.border = false;
      });
      l.active = true;
      if (this.navList.navList[i + 1]) {
        this.navList.navList[i + 1].border = true;
      }
      //获取微页面id
      // console.log(l.jumpTargetValue);
      if (l.jumpTargetValue) {
        if (l.jumpTargetType == "MSPAGE") {
          let id = {
            id: l.jumpTargetValue,
          };
          this.getNavPage(id);
        } else if (l.jumpTargetType == "CLASSIFY") {
          this.pageList = [];
          let pageId = {
            pageId: l.jumpTargetValue,
          };
          this.getClassufyDetails(pageId);
        } else {
          let id = {
            id: l.jumpTargetValue,
          };
          this.getNavPage(id);
        }
      } else {
        this.pageList = [];
      }
    },
    //查询微页面详情
    async getNavPage(params) {
      let res = await this.$get(
        "goldenhome/decoration/admin_/page/ms/query",
        params
      ).catch(() => {
        this.pageStatus = "MSPAGE";
        this.pageList = [];
      });
      if (res && res.returnCode == 1000) {
        this.pageStatus = "MSPAGE";
        if (res.dataInfo != null) {
          if (res.dataInfo.pageMsJson != null) {
            let data = JSON.parse(res.dataInfo.pageMsJson);
            console.log(data);
            this.pageList = data.pageList;
          } else {
            this.pageList = [];
          }
        } else {
          this.pageList = [];
        }
      }
    },
    //获取分类详情
    async getClassufyDetails(params) {
      let res = await this.$get(
        "goldenhome/decoration/admin_/goods/classification/query",
        params
      ).catch(() => {
        this.pageStatus = "CLASSIFY";
      });
      if (res && res.returnCode == 1000) {
        this.pageStatus = "CLASSIFY";
        console.log(JSON.parse(res.dataInfo.pageMsJson));
        let dataInfo = JSON.parse(res.dataInfo.pageMsJson);
        if (dataInfo.navList && dataInfo.navList.length > 0) {
          dataInfo.navList[0].active = true;
          if (dataInfo.navList[1]) {
            dataInfo.navList[1].border = true;
          }
        }
        this.divisionData = dataInfo;
      }
    },
    changeDivisionData(data) {
      this.divisionData = data;
    },
    changeTable1() {
      this.$store.dispatch("setTable", 1);
    },
    changeTable2() {
      this.$store.dispatch("setTable", 2);
    },
  },
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
.editor-main {
  margin: 0 auto;
  width: 375px;
  height: 100%;
  background: #ffffff;
  overflow-x: hidden;
  overflow-y: auto;
  box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.1);
  position: relative;
  // display: flex;
  // flex-direction: column;
  .header_wrap {
    // background: url("~@images/shop/top.png") no-repeat center center;
    height: 64px;
    width: 375px;
    display: flex;
    justify-content: center;
    position: relative;
    .my-header {
      font-family: PingFangSC-Medium;
      font-size: 16px;
      font-weight: 700;
      color: #191919;
      position: absolute;
      top: 30px;
      left: 50%;
      transform: translateX(-50%);
      margin-bottom: 0;

      // width: 100%;
      // height: 40px;
      // line-height: 40px;
      // text-align: center;
    }
  }
  .page-preview-wrapper {
    padding: 8px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .input_box {
      background: #f9f9f9;
      height: 32px;
      border-radius: 155px;
      position: relative;
      flex: 1;
      margin-right: 15px;
      .icon_search {
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
        width: 24px;
        height: 24px;
        background: url("~@images/default/app_icon_search.png") no-repeat center
          center;
        background-size: 100%;
      }
      .input {
        background: none;
        outline: none;
        border: none;
        width: 100%;
        height: 100%;
        padding: 0 10px 0 39px;
        font-size: 12px;
        color: #cccccc;
        letter-spacing: 0;
      }
    }
  }
}
.navList {
  display: flex;
  flex-wrap: nowrap;
  overflow: auto;
  box-sizing: border-box;
  padding: 10px 0;
  min-height: 60px;
  border-bottom: 1px solid rgb(242, 242, 242);
  li {
    flex-shrink: 0;
    text-align: center;
    line-height: 38px;
    border-radius: 8888888px;
    // padding: 0 15px;
    width: 95px;
    text-align: center;
    background: #f9f9f9;
    margin-left: 15px;
    cursor: pointer;
    position: relative;
    // background: #ffffff;
    // margin-left: 0px;
    // border-radius: 0;
    // color: #666666;
    .underLine {
      background: #d1b085;
      border-radius: 1.5px;
      border-radius: 1.5px;
      width: 18px;
      height: 3px;
      position: absolute;
      bottom: 0;
      left: 38px;
    }
  }
  .topNav1 {
    flex-shrink: 0;
    text-align: center;
    line-height: 38px;
    border-radius: 8888888px;
    padding: 0 15px;
    background: #d1b085;
    // color: #1890ff;
    cursor: pointer;
    margin-left: 15px;
    font-size: 14px;
  }
  .topNav2 {
    flex-shrink: 0;
    text-align: center;
    line-height: 38px;
    padding: 0 15px;
    cursor: pointer;
    color: #191919;
    font-size: 16px;
    font-weight: bold;
  }
  .topNav3 {
    flex-shrink: 0;
    text-align: center;
    line-height: 38px;
    padding: 0 15px;
    cursor: pointer;
    color: #191919;
    font-size: 16px;
    font-weight: bold;
  }
  .blackRight {
    height: 10px;
    background: #fff;
    margin-left: 0;
    width: 15px;
  }
}
.CSNavList {
  width: 90px;
  // height: 100%;
  // background: rgb(242, 242, 242);
  // padding-top: 1px;
  display: flex;
  border-right: 1px solid rgb(242, 242, 242);
  flex-direction: column;
  li {
    width: 100%;
    text-align: center;
    line-height: 50px;
    height: 50px;
    cursor: pointer;
    font-size: 16px;
    background: #f2f2f2;
    position: relative;
    .CSnavStyle3 {
      width: 4px;
      height: 12px;
      background: #191919;
      border-radius: 2px;
      border-radius: 2px;
      position: absolute;
      left: 7px;
      top: 19px;
    }
  }
  .LeftNav {
    width: 100%;
    text-align: center;
    line-height: 50px;
    height: 50px;
    cursor: pointer;
    font-size: 16px;
    background: #fff;
  }
  .bottomList {
    background: rgb(242, 242, 242);
    width: 15px;
    flex-grow: 1;
    border-right: 1px solid rgb(242, 242, 242);
    width: 90px;
  }
}
.mainArea {
  flex-grow: 1;
  // display: flex;
  // flex-direction: column;
}
.TST {
  display: flex;
  .componentBox {
    flex-grow: 1;
    width: 270px;
    .component-item {
      flex-grow: 1;
      // width: 100%;
    }
  }
}
.TSO {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
}
.mainAreaBox {
  flex-grow: 1;
  min-height: 700px;
  display: flex;
  flex-direction: column;
}
.headright {
  width: 87px;
  height: 32px;
  position: absolute;
  right: 10px;
  bottom: 6px;
  // background: rgba(255, 255, 255, 0.6);
  border-radius: 25px;
  border: 1px solid rgba(151, 151, 151, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  .left {
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #000;
      border: 1px solid #000;
    }
    div + div {
      margin-left: 2px;
    }
  }
  .right {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid #000;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    .small {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      border: 1px solid #000;
      background: #000;
    }
  }
}
::-webkit-scrollbar {
  width: 0px !important;
  height: 5px !important;
}
// .borderradias {
//   width: 30px;
//   height: 30px;
//   background: #f2f2f2;
//   position: absolute;
//   right: 0;
//   top: 50px;
//   border-radius: 20px;
// }
</style>
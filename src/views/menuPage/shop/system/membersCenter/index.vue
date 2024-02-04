<!-- 图库首页 -->
<template>
  <div class="conent_wrap">
    <!-- 主编辑区 -->
    <div class="editor-pane-inner">
      <EditorPanel
        class="editor"
        ref="fitmentMiddle"
        :pageList="pageList"
        :currentComponent="currentComponent"
        @openComponentConfig="openComponentConfig"
        @deleteComponent="deleteComponent"
        :memberInfo="memberInfo"
      ></EditorPanel>
      <div class="addBtn">
        <h3>基础组件</h3>
        <span @click="addComponents($event)">图片广告</span>
        <span @click="addComponents($event)">商品</span>
        <span @click="addComponents($event)">视频</span>
      </div>
    </div>
    <!-- 属性编辑区 -->
    <div class="attr-edit-wrapper">
      <EditAttrPage
        class="editorpage"
        ref="memberEditor"
        :currentComponent="currentComponent"
        :seactionHeight="seactionHeight"
        @updateFormData="updateFormData"
        :memberInfo="memberInfo"
      ></EditAttrPage>
      <div class="keepBtn">
        <a-button
          type="primary"
          style="width: 100%; height: 45px"
          @click="comfirmInfo"
        >
          保存
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import EditorPanel from "./components/EditorPanel";
import EditAttrPage from "./components/EditAttrPage";
import {
  headerConfig,
  moduleListData,
} from "@/views/menuPage/shop/customDecorate/microPage/components/editCustom/moduleList.js";
import cloneDeep from "lodash/cloneDeep";
import isEmpty from "lodash/isEmpty";
import { makeLongId } from "@/utils";
export default {
  name: "membersCenter",
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
      num: 0,
      moduleListData: cloneDeep(moduleListData),
      headerConfig: cloneDeep(headerConfig),
      pageList: [], // 配置的所有数据
      currentComponent: headerConfig, // 当前选中的组件
      seactionHeight: 860,
      showRightModal: false,
      memberInfo: {
        isShowEquity: true,
        title: "权益说明",
        isShowLevel: true,
        levelText: "升级SVIP",
      },
    };
  },
  computed: {
    ...mapState({
      // isShowEquity: (state) => state.memberCenter.isShowEquity, // 是否展示导航
      // Text: (state) => state.memberCenter.text,
      Tab: (state) => state.setPersonal.tab,
      // toaddress: (state) => state.setPersonal.address,
      // memberInfo: (state) => state.setPersonal.memberInfo,
    }),
  },
  watch: {
    // pageList: {
    //   handler(newVal, oldVal) {
    //     console.log(newVal, "fffffffffffff");
    //   },
    //   deep: true,
    // },
  },
  beforeCreate() {},
  created() {
    // let memberInfo = {
    //   isShowEquity: true,
    //   title: "权益说明",
    // };
    // this.$store.dispatch("setMemberInfo", memberInfo);
    this.$store.dispatch("setTab", 1);
    this.getMemberInfo();
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
    clear(e) {
      // this.$store.dispatch("setMemberInfo", {});
      this.$store.dispatch("setTab", "");
    },
    addComponents(e) {
      console.log(e.target.innerText);
      // console.log(this.moduleListData)
      var pageOne = {};
      this.moduleListData.baseComponents.forEach((item) => {
        if (item.name == e.target.innerText) {
          pageOne = item;
        }
      });
      if (pageOne.useCount >= pageOne.count) {
        this.$message.warning("该组件添加数量已达上限！");
        return false;
      }
      this.$store.dispatch("setTab", 2);
      pageOne.useCount++;
      const component = cloneDeep(pageOne);
      // component.id = makeId('fitment-')
      component.id = makeLongId("888");
      this.pageList.push(component); // 以前点击的时候是push上去的，无法体现拖拽效果。
      // this.pageList.splice(newDraggableIndex, 0, component);
      this.currentComponent = component;
      // this.showRightModal = true;
      // console.log("addComponents this.showRightModal", this.showRightModal);
      console.log("最终的this.pageList", this.pageList);
      // this.$nextTick((_) => {
      //   this.$refs.fitmentMiddle.addComplete();
      // });
    },
    openComponentConfig(item) {
      // this.showRightModal = true;
      // console.log(
      //   "openComponentConfig this.showRightModal",
      //   this.showRightModal
      // );
      if (isEmpty(item.config)) {
        this.$message.warning("该组件无可用配置");
        return;
      }
      this.currentComponent = {};

      // 必须等到右侧组件清空后更新后赋值新的组件表单，避免因为下一个组件名相同，不更新表单里的数据
      this.$nextTick(() => {
        this.currentComponent = item || {};
      });
    },
    // 删除组件
    deleteComponent(item) {
      // 如果是删除的当前组件，要把组件清空
      if (item.id === this.currentComponent.id) {
        this.currentComponent = {};
      }
      // const index = this.pageList.findIndex(
      //   (component) => item.id === component.id
      // );
      this.pageList.forEach((l, i) => {
        if (l.id == item.id) {
          this.pageList.splice(i, 1);
          this.$message.success("删除成功！");
          const componentItem = this.moduleListData.find(
            (component) => component.key === item.key
          );
          if (componentItem) {
            componentItem.useCount--;
          }
          // this.showRightModal = false;
        }
      });
      // if (index > -1) {
      //   this.pageList.splice(index, 1);
      //   this.$message.success("删除成功！");
      //   const componentItem = this.moduleListData.find(
      //     (component) => component.key === item.key
      //   );
      //   // if (componentItem) {
      //   //   componentItem.useCount--;
      //   // }
      // }
      // this.showRightModal = false;
      // console.log("deleteComponent this.showRightModal", this.showRightModal);
    },
    // 保存当前组件的配置
    updateFormData(formData) {
      this.currentComponent.config.formData = formData;
      // if (formData.type && formData.type == 'header') {
      //   this.headerConfig.config.formData = formData
      // }
    },
    comfirmInfo() {
      // console.log(this.pageList, "1551515151515");
      // console.log(this.memberInfo, "494949494944949");
      if (!this.memberInfo.isShowLevel) {
        this.memberInfo.levelText = "";
        this.memberInfo.levelId = "";
        this.memberInfo.cardName = "";
      }
      let obj = {
        isShow: this.memberInfo.isShowEquity == true ? 1 : 0,
        description: this.memberInfo.title || "",
        jumpTargetValue: this.memberInfo.jumpTargetValue || "",
        jumpTargetType: this.memberInfo.jumpTargetType || "",
        pageMsJson: JSON.stringify(this.pageList),
        isUpgrade: this.memberInfo.isShowLevel == true ? 1 : 0,
        upgradeMsg: this.memberInfo.levelText || "",
        upgradeTargetId: this.memberInfo.levelId || "",
        upgradeTargetName: this.memberInfo.cardName || "",
      };
      this.$refs.memberEditor.submitForm();
      if (this.memberInfo.isShowEquity && this.memberInfo.title == "") {
        this.$message.error("权益按钮文案不能为空");
        return;
      }
      if (this.memberInfo.isShowLevel && this.memberInfo.levelText == "") {
        this.$message.error("升级按钮文案不能为空");
        return;
      }
      if (this.memberInfo.id) {
        obj.id = this.memberInfo.id;
        this.updateMemberInfo(
          "goldenhome/decoration/admin_/member/center/update",
          obj
        );
      } else {
        this.updateMemberInfo(
          "goldenhome/decoration/admin_/member/center/add",
          obj
        );
      }
    },
    //获取初始化信息
    getMemberInfo() {
      this.$get(
        "/member/center/query",
        {},
        { baseURL: `${location.origin}/goldenhome/decoration/admin` }
      ).then(async (res) => {
        if (res && res.returnCode == 1000) {
          if (res.dataInfo != null) {
            this.memberInfo = {
              isShowEquity: res.dataInfo.isShow == 1 ? true : false,
              title: res.dataInfo.description,
              id: res.dataInfo.id,
              jumpTargetType: res.dataInfo.jumpTargetType,
              jumpTargetValue: res.dataInfo.jumpTargetValue,
              isShowLevel: res.dataInfo.isUpgrade == 1 ? true : false,
              levelText: res.dataInfo.upgradeMsg,
              levelId: res.dataInfo.upgradeTargetId,
              cardName: res.dataInfo.upgradeTargetName,
            };
            if (
              this.memberInfo.jumpTargetType != "" &&
              this.memberInfo.jumpTargetValue != ""
            ) {
              let result = await this.getJumpLinkName(
                this.memberInfo.jumpTargetType,
                this.memberInfo.jumpTargetValue
              );
              if (result.returnCode == 1000 && result.dataInfo) {
                this.memberInfo.jumpTargetName =
                  result.dataInfo.jumpTargetName || "";
                this.$set(this.memberInfo, this.memberInfo);
              }
            }
            this.pageList = Array.isArray(JSON.parse(res.dataInfo.pageMsJson))
              ? JSON.parse(res.dataInfo.pageMsJson)
              : [];
          }
        }
      });
    },
    //更新或添加会员中心
    async updateMemberInfo(url, params) {
      let res = await this.$post(url, params);
      if (res && res.returnCode == 1000) {
        this.$message.success("保存成功");
      }
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
  background-color: #fafafa;
  display: flex;
  justify-content: space-around;
  .editor-pane-inner {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    .editor {
      flex-grow: 1;
    }
  }
  .attr-edit-wrapper {
    background-color: #f6f7f8;
    width: 376px;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    .editorpage {
      flex-grow: 1;
      padding-bottom: 10px;
    }
    .keepBtn {
      width: 100%;
      display: flex;
      justify-content: center;
      background: #fff;
      box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.1);
    }
  }
}
.addBtn {
  // margin: 100px 0 0 100px;
  // border: 1px solid #333;
  // height: 100px;
  // width: 250px;
  padding: 10px;
  box-sizing: border-box;
  width: 375px;
  height: 103px;
  background: #fff;
  box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.1);
  margin-left: -102px;
  margin-top: 10px;
  h3 {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 20px;
    margin-bottom: 15px;
    padding-left: 8px;
  }
  span {
    font-size: 14px;
    color: #333;
    // padding: 3px 5px;
    cursor: pointer;
    display: inline-block;
    width: 105px;
    height: 33px;
    background: #ffffff;
    border-radius: 2px;
    border: 1px solid #e6e6e6;
    text-align: center;
    line-height: 33px;
  }
  span + span {
    margin-left: 10px;
  }
  span:hover {
    color: #1890ff;
    border: 1px dashed #1890ff;
  }
}
</style>

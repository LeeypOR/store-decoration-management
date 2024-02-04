<template>
  <div class="attr_main">
    <div
      v-show="table == 1"
      style="padding: 0 15px; border-bottom: 1px solid #e6e6e6"
    >
      <div class="pageInfoHead">页面设置</div>
      <a-form-model
        ref="ruleForm"
        :model="pageInfo"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
        style="margin-top: 15px"
        :rules="rules"
      >
        <a-form-model-item label="页面标题" prop="pageTitle" ref="pageTitle">
          <a-input
            @blur="
              () => {
                $refs.pageTitle.onFieldBlur();
              }
            "
            placeholder="请输入标题名称"
            :max-length="15"
            v-model="pageInfo.pageTitle"
            style="width: 260px; padding-right: 40px"
          />
          <span class="limitWords" v-if="pageInfo.pageTitle"
            >{{ pageInfo.pageTitle.length }}/15</span
          >
        </a-form-model-item>
        <a-form-model-item label="页面描述" prop="pageDesc" ref="pageDesc">
          <a-input
            @blur="
              () => {
                $refs.pageDesc.onFieldBlur();
              }
            "
            placeholder="用户通过微信分享给好友时，会自动显示"
            :max-length="30"
            v-model="pageInfo.pageDesc"
            type="textarea"
            :rows="3"
            style="width: 260px"
          />
          <span class="limitWords" v-if="pageInfo.pageDesc"
            >{{ pageInfo.pageDesc.length }}/30</span
          >
        </a-form-model-item>
        <a-form-model-item label="背景颜色">
          <a-radio-group v-model="pageInfo.bgColorType">
            <a-radio :value="1"> 默认 </a-radio>
            <a-radio :value="2"> 自定义 </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="自定义颜色" v-if="pageInfo.bgColorType == 2">
          <div class="select_bg flex">
            <div class="right flex">
              <a-input
                class="color_select"
                type="color"
                v-model="pageInfo.bgColorValue"
                @change="setBgColor"
              />
              <span class="color_reset" @click="resetColor">重置</span
              ><span class="item_value">{{ pageInfo.bgColorValue }}</span>
            </div>
          </div>
        </a-form-model-item>
      </a-form-model>
      <a-button
        style="width: 100%; height: 42px; margin-top: 20px"
        @click="submitInfo"
        type="primary"
        >保存</a-button
      >
    </div>
    <div v-show="table == 2" style="padding: 30px 15px; flex-grow: 1">
      <div class="changeStyle">
        <div class="styleName">
          页面样式：{{
            styleCode == "TSO"
              ? "自定义样式一"
              : styleCode == "TST"
              ? "自定义样式二"
              : "自定义样式"
          }}
        </div>
        <div class="changeBtn" @click="changeStyleCode">修改样式</div>
      </div>
      <div class="showSearch">
        <span>是否显示搜索：</span>
        <a-radio-group v-model="isShowSerach.show" @change="searchShow">
          <a-radio :value="1">显示 </a-radio>
          <a-radio :value="0"> 不显示 </a-radio>
        </a-radio-group>
      </div>
      <div class="navStyle">
        <span>导航样式：</span>
        <a-radio-group v-model="navStyle.navStyle">
          <a-radio :value="1">样式1 </a-radio>
          <a-radio :value="2"> 样式2</a-radio>
          <a-radio :value="3"> 样式3 </a-radio>
        </a-radio-group>
      </div>
      <div class="setting">
        <!-- <p class="paytation">商品导航，最多10个，可拖动排序</p> -->
        <p class="paytation">商品导航，可拖动排序</p>
        <a-form-model
          ref="navList"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
          :model="navList"
          v-if="navList.navList"
        >
          <div v-if="navList.navList.length > 0">
            <draggable class="ant-collapse" :list="navList.navList">
              <a-collapse
                v-for="(l, i) in navList.navList"
                :key="i"
                class="collapse"
              >
                <a-collapse-panel>
                  <a-row slot="header">
                    <a-col :span="19">{{ l.title }} </a-col>
                    <a-col :span="5" style="text-align: right">
                      <a class="m-r-10" @click="deleNav(i)">删除</a>
                    </a-col>
                  </a-row>
                  <a-form-model-item
                    label="导航名称"
                    :prop="'navList.' + i + '.title'"
                    :rules="[
                      {
                        required: true,
                        message: '请填写导航名称',
                        trigger: 'blur',
                      },
                    ]"
                  >
                    <a-input
                      autocomplete="on"
                      placeholder="请输入导航名称"
                      :max-length="4"
                      v-model="l.title"
                    />
                    <span class="limitWords">{{ l.title.length || 0 }}/4</span>
                  </a-form-model-item>
                  <a-form-model-item
                    label="跳转链接"
                    :prop="'navList.' + i + '.jumpTargetName'"
                    :rules="[
                      {
                        required: true,
                        message: '请填写导航名称',
                        trigger: 'blur',
                      },
                    ]"
                  >
                    <a-input
                      placeholder="请选择跳转的微页面"
                      v-model="l.jumpTargetName"
                      @click="showModal(l, i)"
                    />
                  </a-form-model-item>
                </a-collapse-panel>
              </a-collapse>
            </draggable>
          </div>
        </a-form-model>
        <div v-if="navList.navList">
          <a-button
            style="width: 100%; height: 42px; margin-top: 30px"
            @click="addNewNav"
            >添加商品分组导航</a-button
          >
        </div>
      </div>
      <a-button
        style="width: 100%; height: 42px; margin-top: 20px"
        @click="submitInfo"
        type="primary"
        >保存</a-button
      >
    </div>
    <PageModal
      @cancel="closeInfoModal"
      @confirm="getPageInfo"
      :visible="visible"
      :defaultTabs="[ 'MSPAGE', 'CLASSIFY' ]"
      :pageModelId="pageModelId"
      :pageIndex="pageIndex"
    ></PageModal>
    <addModal
      :visible="visible1"
      @cancel="closeInfoModal1"
      @confirm="comfirmMoadl"
      :typeValue="typeValue"
    ></addModal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import addModal from "./addModal.vue";
import draggable from "vuedraggable";
import PageModal from "@components/antBase/PageModal";
export default {
  data() {
    return {
      visible: false,
      visible1: false,
      tabBarIndex: 0,
      addORupdate: "",
      pageModelId: "",
      pageIndex: "MSPAGE",
      typeValue: "",
      rules: {
        pageTitle: [
          { required: true, message: "请填写分享标题", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "标题长度在1到15个字符",
            trigger: "blur",
          },
        ],
        pageDesc: [
          {
            min: 1,
            max: 30,
            message: "标题长度在1到30个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    ...mapState({
      navList: (state) => state.divisionSetting.navList,
      styleCode: (state) => state.divisionSetting.styleCode,
      isShowSerach: (state) => state.divisionSetting.isShowSerach,
      pageInfo: (state) => state.divisionSetting.pageInfomation,
      id: (state) => state.divisionSetting.ids,
      table: (state) => state.divisionSetting.table,
      navStyle: (state) => state.divisionSetting.navStyle,
    }),
  },
  components: {
    PageModal,
    draggable,
    addModal,
  },
  props: {},
  watch: {
    // "obj.navList": {
    //   handler(newVal, oldVal) {
    //     this.$store.dispatch("setNavList", newVal);
    //   },
    //   immediate: true,
    // },
    // visible1(y) {
    //   // console.log(this.styleCode);
    // },
  },
  created() {
    if (this.$route.query.pageId) {
      this.addORupdate = "update";
    } else {
      this.addORupdate = "add";
    }
  },
  filters: {},
  mounted() {},
  methods: {
    addNewNav() {
      this.navList.navList.push({
        title: "",
        jumpTargetName: "",
        active: false,
      });
      if (this.navList.navList.length == 1) {
        this.navList.navList[0].active = true;
      }
      // this.$store.dispatch("setNavList", this.navList);
    },
    deleNav(i) {
      this.navList.navList.splice(i, 1);
    },
    showModal(l, index) {
      this.pageModelId = l.jumpTargetValue || "";
      this.pageIndex = l.jumpTargetType || "MSPAGE";
      this.tabBarIndex = index;
      this.visible = true;
    },
    closeInfoModal(type) {
      this.visible = false;
    },
    searchShow(e) {
      console.log(e.target.value, "99999999999999999");
      // this.$store.dispatch("setIsShowSerach", { show: e.target.value });
    },
    getPageInfo(e) {
      this.navList.navList[this.tabBarIndex].jumpTargetType = e.type;
      this.navList.navList[this.tabBarIndex].jumpTargetValue = e.id;
      this.navList.navList[this.tabBarIndex].jumpTargetName = e.name;
      // console.log(this.navList);
      this.visible = false;
    },
    //关闭modal
    closeInfoModal1(e) {
      this.visible1 = false;
    },
    comfirmMoadl(e) {
      this.visible1 = false;
    },
    changeStyleCode() {
      this.typeValue = this.styleCode;
      this.visible1 = true;
    },
    submitInfo() {
      // if (this.addORupdate == "update") {
      this.navList.navList.forEach((item, i) => {
        item.sort = i + 1;
      });
      let promiseList = [];
      Array.from(this.navList.navList).map((item) => {
        if (item.jumpTargetType == "MSPAGE") {
          promiseList.push(this.getNavPage({ id: item.jumpTargetValue }));
        } else if (item.jumpTargetType == "CLASSIFY") {
          promiseList.push(
            this.getClassufyDetails({ pageId: item.jumpTargetValue })
          );
        }
        return promiseList;
      });
      Promise.all(promiseList)
        .then((res) => {
          this.navList.navList.forEach((item, i) => {
            item.pageList = res[i];
          });
          let paramNavlist = JSON.parse(JSON.stringify(this.navList.navList));
          paramNavlist.forEach((l) => {
            delete l.active;
            delete l.border;
          });
          if (
            paramNavlist.some((item) => {
              return item.jumpTargetType == "CLASSIFY";
            })
          ) {
            this.pageInfo.linkCount = 2;
          } else {
            this.pageInfo.linkCount = 1;
          }
          console.log(paramNavlist, "8888888888888888888888888");
          let pageMsJson = {
            navList: paramNavlist,
            styleCode: this.styleCode,
            isShowSearch: this.isShowSerach.show,
            navStyle: this.navStyle.navStyle,
          };
          let pageMsJson1 = JSON.stringify(pageMsJson);
          // console.log(pageMsJson1,'777777777777777777777777')
          if (this.addORupdate == "update") {
            var paramsData = {
              pageInfo: this.pageInfo,
              pageMsJson: pageMsJson1,
              id: this.id,
            };
          } else {
            var paramsData = {
              pageInfo: this.pageInfo,
              pageMsJson: pageMsJson1,
            };
          }
          // console.log(paramsData, "777777777777777777777777");

          this.$refs["ruleForm"].validate((valid) => {
            if (valid) {
            } else {
              console.log("error submit!!");
              return;
            }
          });
          this.$refs["navList"].validate((valid) => {
            if (valid) {
              let num = 0;
              this.navList.navList.forEach((item) => {
                if (
                  item.title == "" ||
                  item.jumpTargetValue == "" ||
                  item.jumpTargetName == ""
                ) {
                  num++;
                }
              });
              if (this.pageInfo.pageTitle == "") {
                this.$message.error("保存失败,页面标题未填写");
                return;
              }
              if (num > 0) {
                this.$message.error("保存失败,名称或跳转链接未填写");
              } else {
                if (this.addORupdate == "update") {
                  this.updateStyle(paramsData);
                } else {
                  this.addStyle(paramsData);
                }
                this.$router.push({
                  name: "ShopSystemDivisionSetting",
                });
              }
            } else {
              this.$message.error("保存失败");
              return false;
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //自定义样式添加
    async addStyle(params) {
      let res = await this.$post(
        "goldenhome/decoration/admin_/custom/style/add",
        params
      );
      if (res && res.returnCode == 1000) {
        this.$message.success("保存成功");
      }
    },
    //自定义样式更新
    async updateStyle(params) {
      let res = await this.$post(
        "goldenhome/decoration/admin_/custom/style/update",
        params
      );
      if (res && res.returnCode == 1000) {
        this.$message.success("保存成功");
      }
    },

    resetColor() {
      const obj = JSON.parse(JSON.stringify(this.pageInfo));
      obj.bgColorValue = "#ffffff";
      this.$store.dispatch("setPageInfomation", obj);
    },
    setBgColor(e) {
      const obj = JSON.parse(JSON.stringify(this.pageInfo));
      obj.bgColorValue = e.target.value;
      this.$store.dispatch("setPageInfomation", obj);
    },
    //查询微页面详情
    async getNavPage(params) {
      let res = await this.$get(
        "goldenhome/decoration/admin_/page/ms/query",
        params
      );
      if (res && res.returnCode == 1000) {
        if (res.dataInfo != null) {
          return JSON.parse(res.dataInfo.pageMsJson).pageList;
        } else {
          return "[]";
        }
      }
    },
    //获取分类详情
    async getClassufyDetails(params) {
      let res = await this.$get(
        "goldenhome/decoration/admin_/goods/classification/query",
        params
      ).catch(() => {
        return "{}";
      });
      if (res && res.returnCode == 1000) {
        if (res.dataInfo != null) {
          return JSON.parse(res.dataInfo.pageMsJson);
        } else {
          return "{}";
        }
      }
    },
  },
};
</script>

<style lang='less' scoped>
.attr_main {
  display: flex;
  height: 100%;
  flex-direction: column;
  overflow: auto;
  // padding: 30px 15px;
  .attr_page_title {
    width: 100%;
    height: 72px;
    padding: 0 16px;
    box-shadow: 0 1px 1px 0px #e6e6e6;
    line-height: 72px;
    font-size: 18px;
    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
    font-weight: bold;
    color: #333333;
  }
}
.changeStyle {
  display: flex;
  .styleName {
    border: 1px solid #e6e6e6;
    flex-grow: 1;
    line-height: 35px;
    padding-left: 10px;
    color: slategray;
  }
  .changeBtn {
    border: 1px solid #e6e6e6;
    padding: 0 15px;
    color: #1890ff;
    border-left: none;
    line-height: 35px;
    cursor: pointer;
  }
}
.setting {
  margin-top: 30px;
}
.paytation {
  color: #999;
  margin-bottom: 20px;
}
.limitWords {
  position: absolute;
  right: 5px;
  top: -10px;
  font-size: 10px;
  color: #eee;
}
// .collapse + .collapse {
//   margin-top: 20px;
// }
.showSearch,
.navStyle {
  margin-top: 20px;
  padding-left: 3px;
  font-size: 18px;
  display: flex;
  align-items: center;
}
.pageInfoHead {
  font-size: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 60px;
}
.limitWords {
  position: absolute;
  right: 5px;
  top: -10px;
  font-size: 10px;
  color: #eee;
}
.flex {
  display: flex;
  align-items: center;
  justify-content: flex-start !important;
}
.right {
  flex: 1;
  justify-content: flex-end;
  .color_reset {
    color: #016bff;
    margin-left: 16px;
    cursor: pointer;
  }
  .color_select {
    width: 60px;
    height: 30px;
    background: #ffffff;
    border-radius: 2px;
    border: 1px solid #e6e6e6;
  }
}
</style>
<template>
  <div class="attr_main">
    <div class="attr_page_title">底部导航</div>
    <div class="attr_page_content">
      <div class="sttr_page_select">
        <!-- <div class="select_tab flex">
          <span>是否启用底部导航</span>
          <a-switch :checked="isShowNavigation" @change="onChange" />
        </div> -->
        <!-- <div class="select_bg flex" v-if="isShowNavigation"> -->
        <div class="select_bg flex">
          <div class="left flex">
            <span class="item_name">背景颜色</span
            ><span class="item_value">{{
              navigationData.backgroundColor
            }}</span>
          </div>
          <div class="right flex">
            <span class="color_reset" @click="resetColor">重置</span>
            <a-input
              class="color_select"
              type="color"
              v-model="navigationData.backgroundColor"
              @change="setBgColor"
            />
          </div>
        </div>
      </div>

      <!-- <div class="tab_bar_list" v-if="isShowNavigation"> -->
      <div class="tab_bar_list">
        <a-form-model
          ref="ruleForm"
          :model="navigationData"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 12 }"
        >
          <draggable
            class="draggable_wrap"
            :list="navigationData.navigationList"
          >
            <div
              class="tab_panel m-t-20"
              v-for="(item, index) in navigationData.navigationList"
              :key="index"
            >
              <img
                class="delete_icon"
                @click="deleteImageInfo(index)"
                src="~@images/shop/icon_middle_modalbox_delete_s.png"
                alt=""
              />
              <h5 class="tab_header">导航{{ index | filterIndex }}</h5>
              <div class="tab_form">
                <a-form-model-item
                  label="名称"
                  :prop="'navigationList.' + index + '.navigationName'"
                  :rules="[{ required: true, message: '请填写导航名称' }]"
                >
                  <a-input
                    autocomplete="on"
                    :maxLength="4"
                    v-model.trim="item.navigationName"
                    placeholder="最多支持四个字名称"
                  />
                </a-form-model-item>
                <a-form-model-item
                  label="链接"
                  :prop="'navigationList.' + index + '.jumpTargetName'"
                  :rules="[
                    {
                      required: true,
                      message: '请选择跳转的页面',
                    },
                  ]"
                >
                  <a-input
                    v-model="item.jumpTargetName"
                    placeholder="请选择跳转的页面"
                    @click="showModal(index, item)"
                  />
                  <!-- <div class="link">
                    <a @click="showModal(index)">{{
                      item.jumpTargetName | jumpLinkTextFilter
                    }}</a>
                  </div> -->
                </a-form-model-item>

                <a-form-model-item
                  label="图标"
                  :prop="'navigationList.' + index + '.navigationImage'"
                  :rules="[
                    {
                      required: true,
                      message: '请选择图标',
                    },
                  ]"
                >
                  <!-- <template slot="label">
                  <span class="ant-form-item-required"> 图标 </span>
                </template> -->
                  <a-space class="main_picture">
                    <div>
                      <ImageUpload
                        :changeUploadText="'更换图标'"
                        v-model="item.navigationImage"
                      ></ImageUpload>
                      <p class="img_text">普通</p>
                    </div>
                    <div>
                      <ImageUpload
                        :changeUploadText="'更换图标'"
                        v-model="item.navigationImageHigh"
                      ></ImageUpload>
                      <p class="img_text">高亮(可选)</p>
                    </div>
                  </a-space>
                </a-form-model-item>
                <p class="icon_norm">
                  图标尺寸要求：不大于100*100像素，支持PNG格式
                </p>
              </div>
            </div>
          </draggable>
        </a-form-model>
      </div>
    </div>

    <div class="actions">
      <a-button
        v-if="
          navigationData.navigationList
            ? !!navigationData.navigationList.length &&
              navigationData.navigationList.length < 5
            : true
        "
        type="dashed"
        style="width: 100%"
        @click="addNavigation()"
      >
        <a-icon type="plus" /> 添加导航
      </a-button>
      <div class="btns">
        <a-button class="btn release" type="primary" @click="submitForm">
          发布
        </a-button>
      </div>
    </div>

    <PageModal
      @cancel="closeInfoModal"
      @confirm="getPageInfo"
      :visible="visible"
      :defaultTabs="defaultTabs"
      :pageModelId="pageModelId"
      :pageIndex="tabIndex"
    ></PageModal>
  </div>
</template>

<script>
import draggable from "vuedraggable";
// 底部导航tab组件
import ImageUpload from "@components/antBase/ImageUpload";
import PageModal from "@components/antBase/PageModal";
import { mapState } from "vuex";
export default {
  data() {
    return {
      form: this.$form.createForm(this, { name: "coordinated" }),
      checked: false,
      color: "#ffffff",
      // tabBar
      tabBarIndex: 0,
      visible: false,
      defaultTabs: ["MSPAGE", "2"],
      pageModelId: "",
      tabIndex: "MSPAGE",
    };
  },

  components: {
    ImageUpload,
    PageModal,
    draggable,
  },

  computed: {
    ...mapState({
      isShowNavigation: (state) => state.storeNavigation.isShowNavigation, // 是否展示导航
      navigationData: (state) => state.storeNavigation.navigationData,
      pageId: (state) => state.storeNavigation.pageId,
    }),
  },

  filters: {
    filterIndex(val) {
      switch (val) {
        case 0:
          return "一";
        case 1:
          return "二";
        case 2:
          return "三";
        case 3:
          return "四";
        case 4:
          return "五";
        default:
          return "一";
      }
    },

    jumpLinkTextFilter(val) {
      if (val) {
        return val;
      } else return "点击选择跳转到的页面";
    },
  },

  mounted() {
    console.log("555555555", this.navigationData);
    console.log(this.isShowNavigation);
    console.log("8888888888", this.pageId);
  },
  // created() {
  //   this.$store.dispatch("setShowNavigation", true);
  // },
  methods: {
    resetColor() {
      this.$store.dispatch("setBgColor", "#FFFFFF");
    },
    onChange(checked) {
      console.log(this.$store);
      console.log(`a-switch to ${checked}`);
      this.$store.dispatch("setShowNavigation", checked);
    },

    setBgColor(e) {
      console.log(`a-input to ${e.target.value}`);
      this.$store.dispatch("setBgColor", e.target.value);
    },

    addNavigation() {
      // this.$store.dispatch("setBgColor", e.target.value);
      this.navigationData.navigationList.push({
        navigationName: "",
      });
    },

    submitForm(formName) {
      console.log(this.navigationData, "导航");
      if (this.isShowNavigation) {
        this.$refs.ruleForm.validate((valid, val) => {
          // let num = 0;
          // this.navigationData.forEach((item) => {

          // });
          if (valid) {
            console.log(this.navigationData, "导航");
            this.navigationData.navigationList.forEach((item, index) => {
              item.sort = index;
            });
            this.navigationData.showStatus = this.isShowNavigation ? 0 : 1;
            console.log(
              JSON.stringify({
                configInfo: this.navigationData,
                pageId: this.pageId,
              })
            );
            this.$post(
              "/store/navigation/config/add",
              {
                configInfo: this.navigationData,
                pageId: this.pageId,
              },
              { baseURL: `${location.origin}/goldenhome/decoration/admin` }
            ).then((res) => {
              if (res && res.returnCode == 1000) {
                this.$message.success("保存成功");
              }
            });
          } else {
            console.log("error submit!!");
          }
        });
      } else {
        this.navigationData.navigationList.forEach((item, index) => {
          item.sort = index;
        });
        this.navigationData.showStatus = this.isShowNavigation ? 0 : 1;
        this.$post(
          "/store/navigation/config/add",
          {
            configInfo: this.navigationData,
            pageId: this.pageId,
          },
          { baseURL: `${location.origin}/goldenhome/decoration/admin` }
        ).then((res) => {
          if (res && res.returnCode == 1000) {
            this.$message.success("保存成功");
          }
        });
        console.log(this.navigationData);
      }
    },

    // 展示modal
    showModal(index, item) {
      console.log(item);
      this.tabBarIndex = index;
      this.visible = true;
      this.pageModelId = item.jumpTargetValue || "";
      if (item.jumpTargetType == "MSPAGE") {
        this.tabIndex = "MSPAGE";
      } else {
        this.tabIndex = "2";
      }
    },

    closeInfoModal(type) {
      console.log(type, "type");
      this.visible = false;
    },

    getPageInfo(e) {
      // this.navigationData.navigationList[this.tabBarIndex].jumpTargetType =
      //   e.type;
      // this.navigationData.navigationList[this.tabBarIndex].jumpTargetValue =
      //   e.id;
      // this.navigationData.navigationList[this.tabBarIndex].jumpTargetName =
      //   e.name;
      let obj = JSON.parse(
        JSON.stringify(this.navigationData.navigationList[this.tabBarIndex])
      );
      obj.jumpTargetType = e.type;
      obj.jumpTargetValue = e.id;
      obj.jumpTargetName = e.name;
      this.$set(this.navigationData.navigationList, this.tabBarIndex, obj);
      this.visible = false;
    },

    deleteImageInfo(index) {
      if (this.navigationData.navigationList.length == 2) {
        this.$message.error("店铺导航至少两个");
        return;
      }
      this.navigationData.navigationList.splice(index, 1);
    },
  },
};
</script>

<style lang='less' scoped>
.attr_main {
  display: flex;
  height: 100%;
  flex-direction: column;
  overflow: hidden;

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
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .attr_page_content {
    padding: 0 16px;
    position: relative;
    flex: 1 1 0;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .sttr_page_select {
      border-bottom: 1px solid #e6e6e6;
      .select_tab {
        height: 62px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
      }

      .select_bg {
        margin-bottom: 12px;
        .left {
          flex: 1;
          justify-content: flex-start;
          .item_name {
            color: #999999;
            margin-right: 16px;
          }
        }
        .right {
          flex: 1;

          justify-content: flex-end;
          .color_reset {
            color: #016bff;
            margin-right: 16px;
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
      }
    }

    .tab_bar_item {
      margin-top: 24px;
    }
  }

  .btns {
    width: 100%;
    height: 58px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    .release {
      margin-right: 8px;
    }
  }
}

.tab_panel {
  width: 100%;
  min-height: 200px;
  // overflow: hidden;
  border-radius: 4px 4px 0px 0px;
  background: #ffffff;
  position: relative;
  &:hover {
    .delete_icon {
      display: block;
    }
  }
  .delete_icon {
    width: 16px;
    height: 16px;
    position: absolute;
    top: -7px;
    right: -7px;
    cursor: pointer;
    display: none;
  }
  .tab_header {
    background: #eeeeee;
    height: 40px;
    background: #eeeeee;
    line-height: 40px;
    padding-left: 10px;
  }
  .tab_form {
    padding: 0 16px 10px;
    .main_picture {
      /deep/ .ant-upload {
        width: 60px !important;
        height: 60px !important;
        margin: 0;
      }
      .img_text {
        text-align: center;
        line-height: normal;
      }
    }

    .link {
      // width: ;
    }

    .icon_norm {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
    }
    /deep/.ant-form-item {
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

.choose_url {
  /deep/ .ant-modal-body {
    padding: 12px 24px 24px;
  }
  /deep/ .ant-tabs-tab {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
  }
  /deep/ .ant-tabs-tab-active {
    font-weight: 700;
  }
  /deep/ .ant-modal-content {
    border-radius: 10px;
    overflow: hidden;
  }
  /deep/ .ant-tabs-top-bar {
    border: none;
  }

  /deep/ .ant-modal-footer {
    border: none;
    text-align: center;
  }
}

/deep/.ant-btn {
  margin-top: 12px;
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  position: relative;
  text-align: center;
  font-family: MicrosoftYaHei;
  font-size: 14px;
  background-color: #fff;
  color: #016bff;
  border: 1px solid #016bff;
}
</style>
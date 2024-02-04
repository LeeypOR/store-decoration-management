<template>
  <div class="attr_main">
    <div class="attr_page_title">会员中心</div>
    <div class="members_head" v-show="Tab == 1">
      <div class="isShowEquity">
        <a-checkbox @change="isShowChange" v-model="memberInfo.isShowEquity"
          >是否显示权益说明</a-checkbox
        >
      </div>
      <div class="equityText" v-show="memberInfo.isShowEquity">
        <a-form-model
          ref="ruleForm"
          :model="memberInfo"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
          style="margin-top: 15px"
          :rules="rules"
        >
          <a-form-model-item label="按钮文案" prop="title" ref="title">
            <a-input
              @blur="
                () => {
                  $refs.title.onFieldBlur();
                }
              "
              placeholder="请输入名称"
              :max-length="6"
              v-model="memberInfo.title"
              style="width: 260px; padding-right: 40px"
            />
            <span class="limitWords" v-if="memberInfo.title"
              >{{ memberInfo.title.length || 0 }}/6</span
            >
          </a-form-model-item>
          <a-form-model-item label="跳转链接">
            <span
              class="toAddress"
              v-if="memberInfo.jumpTargetName"
              @click="chooseAddress(memberInfo)"
              >{{ memberInfo.jumpTargetName }}</span
            >
            <span class="toAddress" v-else @click="chooseAddress"
              >请选择跳转地址</span
            >
          </a-form-model-item>
        </a-form-model>
      </div>
    </div>
    <div v-if="Tab == 2" class="module">
      <component
        class="form_component"
        v-if="currentComponentConfig.formName"
        :is="currentComponentConfig.formName"
        :formData="currentComponentConfig.formData"
        @updateFormData="updateFormData"
      ></component>
    </div>
    <div class="members_head" v-show="Tab == 3">
      <div class="isShowEquity">
        <a-checkbox v-model="memberInfo.isShowLevel">是否显示升级</a-checkbox>
      </div>
      <div class="equityText" v-show="memberInfo.isShowLevel">
        <a-form-model
          ref="LevelForm"
          :model="memberInfo"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
          style="margin-top: 15px"
          :rules="rules1"
        >
          <a-form-model-item
            label="自定义文字"
            prop="levelText"
            ref="levelText"
          >
            <a-input
              @blur="
                () => {
                  $refs.levelText.onFieldBlur();
                }
              "
              placeholder="请输入名称"
              :max-length="8"
              v-model="memberInfo.levelText"
              style="width: 220px; padding-right: 40px"
            />
            <span class="limitWords" v-if="memberInfo.levelText"
              >{{ memberInfo.levelText.length || 0 }}/8</span
            >
          </a-form-model-item>
          <!-- <a-form-model-item label="请选择付费会员">
            <span
              class="toAddress"
              v-if="memberInfo.cardName"
              @click="chooseLevel(memberInfo)"
              >{{ memberInfo.cardName }}</span
            >
            <span class="toAddress" v-else @click="chooseLevel"
              >请选择付费会员</span
            >
          </a-form-model-item> -->
        </a-form-model>
      </div>
    </div>
    <PageModal
      @cancel="closeInfoModal"
      @confirm="getPageInfo"
      :visible="visible"
      :pageModelId="pageModalId"
      :showType="showType"
    ></PageModal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PageModal from "@components/antBase/PageModal";
import * as components from "../../../customDecorate/microPage/components/editCustom/components/form/index";
const nameInComponents = {};
Object.keys(components).forEach((key) => {
  console.log(components[key]);
  nameInComponents[components[key].name] = components[key];
});
export default {
  data() {
    return {
      // isShow: "",
      // address: "",
      visible: false,
      rules: {
        title: [
          { required: true, message: "请填写名称", trigger: "blur" },
          {
            min: 1,
            max: 6,
            message: "标题长度在1到6个字符",
            trigger: "blur",
          },
        ],
      },
      rules1: {
        levelText: [
          { required: true, message: "请填写名称", trigger: "blur" },
          {
            min: 1,
            max: 8,
            message: "标题长度在1到8个字符",
            trigger: "blur",
          },
        ],
      },
      pageModalId: "",
      showType: "",
    };
  },
  components: {
    PageModal,
    ...nameInComponents,
  },
  computed: {
    ...mapState({
      Tab: (state) => state.setPersonal.tab,
    }),
    currentComponentConfig() {
      const config =
        (this.currentComponent && this.currentComponent.config) || {};
      return config;
    },
  },
  props: {
    currentComponent: {
      type: Object,
    },
    seactionHeight: {
      type: Number,
      default: 860,
    },
    memberInfo: {
      type: Object,
    },
  },
  watch: {
    // memberInfo: {
    //   handler(newVal, oldVal) {
    //     console.log(newVal,'00000000000000000')
    //   },
    //   deep: true,
    // },
  },
  created() {
    // this.isShow = this.isShowEquity;
    // this.membersInfo.title = this.Text;
    // this.address = this.toaddress;
  },
  filters: {},
  mounted() {},
  methods: {
    isShowChange(e) {
      console.log(`checked = ${e.target.checked}`);
    },
    closeInfoModal(type) {
      console.log(type, "type");
      this.visible = false;
    },
    submitForm() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
        } else {
          return false;
        }
      });
    },
    getPageInfo(e) {
      if (this.showType == 1) {
        this.memberInfo.jumpTargetType = e.type;
        this.memberInfo.jumpTargetValue = e.id;
        this.memberInfo.jumpTargetName = e.name;
      } else {
        this.memberInfo.levelId = e.id;
        this.memberInfo.cardName = e.name;
      }
      this.visible = false;
    },
    chooseAddress(memberInfo) {
      this.showType = "1";
      this.pageModalId = memberInfo.jumpTargetValue;
      this.visible = true;
    },
    chooseLevel(memberInfo) {
      this.showType = "2";
      this.pageModalId = memberInfo.levelId;
      this.visible = true;
    },
    updateFormData(formData) {
      this.$emit("updateFormData", formData);
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
  background: #fff;
  // align-items: center;
  .attr_page_title {
    width: 100%;
    height: 40px;
    padding: 0 16px;
    box-shadow: 0 1px 1px 0px #e6e6e6;
    // border-top: 1px solid #e6e6e6;
    line-height: 40px;
    font-size: 18px;
    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
    font-weight: bold;
    color: #333333;
    margin-bottom: 20px;
  }
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
/deep/::-webkit-scrollbar {
  width: 0px !important;
  height: 10px;
}
.members_head {
  width: 100%;
  .isShowEquity {
    padding-left: 30px;
    width: 100%;
  }
}
.limitWords {
  position: absolute;
  right: 5px;
  top: -10px;
  font-size: 10px;
  color: #eee;
}
.toAddress {
  color: #016bff;
  text-decoration: underline;
  cursor: pointer;
}
.module {
  margin: 0 auto;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
</style>
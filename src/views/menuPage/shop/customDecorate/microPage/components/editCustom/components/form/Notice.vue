<template>
  <div class="title-text-form">
    <div class="title_nav">
      <div>
        <div class="marT10">
          <h3 class="title_h3">描述内容</h3>
          <div class="marT10">
            <a-textarea
              placeholder="请输入要说明的文字，最多 128 字"
              v-model="formDataObject.textCon"
              :rows="4"
              :maxLength="128"
            />
          </div>
          <div class="disFlex margT10">
            <span>
              <span class="one">背景颜色</span>
              <span class="two">{{ formDataObject.bgColor }}</span>
            </span>
            <span class="color_change">
              <span
                class="pointer text-primary"
                @click="changeCheck('bgColor', '#333333')"
                >重置</span
              >
              <a-input type="color" v-model="formDataObject.bgColor" />
            </span>
          </div>
          <div class="disFlex margT10">
            <span>
              <span class="one">文字颜色</span>
              <span class="two">{{ formDataObject.color }}</span>
            </span>
            <span class="color_change">
              <span
                class="pointer text-primary"
                @click="changeCheck('color', '#333333')"
                >重置</span
              >
              <a-input type="color" v-model="formDataObject.color" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PageModal from "@components/antBase/PageModal";
import { cloneDeep } from "lodash";
export default {
  name: "MyNoticeForm",
  components: {
    PageModal,
  },
  filters: {
    jumpLinkTextFilter(item) {
      if (item.jumpPageId) {
        return item.jumpPageName;
      }
      // r
      return "点击选择跳转到的页面";
    },
  },
  props: {
    // 传入的原始数据
    formData: {},
  },
  created() {
    this.formDataObject = cloneDeep(this.formData);
  },
  data() {
    return {
      pageModalVisible: false,
      currentRecord: {},
      formDataObject: {},
      pageModelId: "",
      pageIndex: "MSPAGE",
    };
  },
  methods: {
       changeCheck(a, b) {
      this.$set(this.formDataObject, a, b);
    },
  },
  watch: {
    formDataObject: {
      handler(n, o) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          this.$emit("updateFormData", this.formDataObject);
        }, 300);
      },
      deep: true,
    },
  },
};
</script>
<style lang="less" scoped>
@labelColor: #999;
@resultColor: #333;
.title-text-form {
  .title_nav {
    // height: 32px;
    // line-height: 32px;
    // border: 1px solid #016bff;
    .from_seaction {
      .title_h3 {
        font-size: 14px;
        color: #333333;
      }
      .marT10 {
        margin-top: 10px;
      }
      // padding:10px;
      
    }
    .disFlex {
      display: flex;
      justify-content: space-between;
      span {
        span {
          height: 32px;
          line-height: 32px;
          vertical-align: middle;
        }
      }
      .two {
        margin-left: 10px;
        font-size: 14px;
        color: #333333;
      }
      .icon_btn {
        cursor: pointer;
        width: 50px;
        border: 1px solid #e6e6e6;
        text-align: center;
        font-size: 24px;
        border-radius: 3px;
      }
      .smallSize {
        font-size: 12px;
      }
      .mSize {
        font-size: 14px;
      }
      .lSize {
        font-size: 16px;
      }
      .icon_btn_check {
        background: #e0edff;
        border: 1px solid #016bff;
        color: #016bff;
      }
      .fontBold {
        font-weight: bold;
      }
      .check_radio {
        height: 32px;
        line-height: 32px;
        ._check {
          cursor: pointer;
          width: 16px;
          height: 16px;
          border: 1px solid #c8c8c8;
          border-radius: 2px;
        }
        .icon-Checkbox {
          font-size: 16px;
          color: #016bff;
        }
      }
    }
    .color_change {
      width: 100px;
      display: flex;
      justify-content: space-between;
      /deep/.ant-input {
        width: 60px;
        padding: 1px;
        border-radius: 0;
      }
    }
    .prompt {
      display: flex;
      justify-content: flex-start;
      margin-top: 10px;
      .prompt_txt {
        width: 120px;
        margin-right: 10px;
        /deep/.ant-input {
          border-radius: 0;
          font-size: 14px;
          color: #333333;
        }
      }
      .prompt_tip {
        height: 32px;
        line-height: 32px;
        font-size: 12px;
        color: #999999;
      }
    }
  }
  span {
    display: inline-block;
    font-size: 14px;
    color: #999999;
  }
  /deep/.ant-tabs-nav {
    width: 90%;
    margin: 0 auto;
    .ant-tabs-tab {
      text-align: center;
      width: 50%;
    }
  }
  /deep/.ant-divider-horizontal {
    margin: 18px 0;
  }
}
.iconfont {
  cursor: pointer;
}
.margT10 {
  margin-top: 10px;
}
.link {
  display: flex;
  justify-content: space-between;
}
.line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  .text_wrap {
    display: flex;
    align-items: center;
    .label {
      color: @labelColor;
    }
    .result {
      color: @resultColor;
      margin-left: 16px;
    }
  }
  /deep/ .slider {
    &:hover {
      .ant-slider-track {
        background-color: #016bff;
      }
    }
    .ant-slider-track {
      background-color: #016bff;
    }
  }
}
</style>

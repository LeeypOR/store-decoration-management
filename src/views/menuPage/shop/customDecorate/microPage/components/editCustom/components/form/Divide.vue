<template>
  <div class="divide-form">
    <div class="disFlex margT10">
      <span>
        <span class="one">分割类型</span>
        <span class="two">
          {{ formDataObject.divideType == "0" ? "辅助空白" : "辅助线" }}
        </span>
      </span>
      <span>
        <span
          :class="[
            'icon_btn iconfont icon-icon_right_attributebar_fzlb_default',
            formDataObject.divideType == '0' ? 'icon_btn_check' : '',
          ]"
          @click="changeCheck('divideType', '0')"
        ></span>
        <span
          :class="[
            'icon_btn iconfont icon-icon_right_attributebar_fzx_default',
            formDataObject.divideType == '1' ? 'icon_btn_check' : '',
          ]"
          @click="changeCheck('divideType', '1')"
        ></span>
      </span>
    </div>

    <div class="disFlex margT10" v-if="formDataObject.divideType == 1">
      <span>
        <span class="one">选择样式</span>
        <span class="two">
          {{ formDataObject.lineType | lineName }}
        </span>
      </span>
      <span>
        <span
          :class="[
            'icon_btn iconfont icon-icon_right_attributebar_shix_default',
            formDataObject.lineType == 'solid' ? 'icon_btn_check' : '',
          ]"
          @click="changeCheck('lineType', 'solid')"
        ></span>
        <span
          :class="[
            'icon_btn iconfont icon-icon_right_attributebar_xux_default1',
            formDataObject.lineType == 'dashed' ? 'icon_btn_check' : '',
          ]"
          @click="changeCheck('lineType', 'dashed')"
        ></span>
        <span
          :class="[
            'icon_btn iconfont icon-icon_right_attributebar_dianx_default1',
            formDataObject.lineType == 'dotted' ? 'icon_btn_check' : '',
          ]"
          @click="changeCheck('lineType', 'dotted')"
        ></span>
      </span>
    </div>

    <div class="disFlex margT10" v-if="formDataObject.divideType == 1">
      <span>
        <span class="one">左右边距</span>
        <span class="two">
          {{ formDataObject.left_rightType == "0" ? "无边距" : "左右留边" }}
        </span>
      </span>
      <span>
        <span
          :class="[
            'icon_btn iconfont icon-icon_right_attributebar_wuliub_default',
            formDataObject.left_rightType == '0' ? 'icon_btn_check' : '',
          ]"
          @click="changeCheck('left_rightType', '0')"
        ></span>
        <span
          :class="[
            'icon_btn iconfont icon-icon_right_attributebar_zuoyouliub_default',
            formDataObject.left_rightType == '1' ? 'icon_btn_check' : '',
          ]"
          @click="changeCheck('left_rightType', '1')"
        ></span>
      </span>
    </div>

    <div class="disFlex margT10" v-show="formDataObject.divideType == 1">
      <span>
        <span class="one">描边色</span>
        <span class="two">
          {{ formDataObject.lineColor }}
        </span>
      </span>
      <div class="colorBox">
        <span class="reset_color" @click="resetColor">重置</span>
        <a-input
          class="color_select"
          type="color"
          v-model="formDataObject.lineColor"
          @change="setBgColor"
        />
      </div>
    </div>
    <div class="line">
      <div class="text_wrap">
        <div class="label">空白高度</div>
      </div>
      <a-slider
        class="slider"
        v-model="formDataObject.blankHeight"
        :max="100"
        :min="8"
        style="width: 120px"
      />
      <a-input-number
        v-model="formDataObject.blankHeight"
        :max="100"
        :min="8"
        style="marginleft: 16px"
      />
    </div>
    <div class="disFlex margT10">
      <span>
        <span class="one">空白颜色</span>
        <span class="two">
          {{ formDataObject.blankColor }}
        </span>
      </span>
      <div class="colorBox">
        <span class="reset_color" @click="resetBlankColor">重置</span>
        <a-input
          class="color_select"
          type="color"
          v-model="formDataObject.blankColor"
          @change="setBlankBgColor"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { cloneDeep } from "lodash";
export default {
  name: "MyDivideForm",
  components: {},
  props: {
    // 传入的原始数据
    formData: {},
  },
  created() {
    this.formDataObject = cloneDeep(this.formData);
  },
  filters: {
    lineName(item) {
      switch (item) {
        case "solid":
          return "实线";
        case "dashed":
          return "虚线";
        case "dotted":
          return "点线";
        default:
          return "实线";
      }
    },
  },
  data() {
    return {
      formDataObject: {},
    };
  },
  methods: {
    changeCheck(a, b) {
      this.$set(this.formDataObject, a, b);
    },
    resetColor() {
      this.$set(this.formDataObject, "lineColor", "#e6e6e6");
    },
    setBgColor(e) {
      // this.formDataObject.bgColorValue = e.target.value;
      this.$set(this.formDataObject, "lineColor", e.target.value);
    },
    resetBlankColor() {
      this.$set(this.formDataObject, "blankColor", "#ffffff");
    },
    setBlankBgColor(e) {
      // this.formDataObject.bgColorValue = e.target.value;
      this.$set(this.formDataObject, "blankColor", e.target.value);
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
.divide-form {
  .disFlex {
    display: flex;
    justify-content: space-between;
    span {
      display: inline-block;
      font-size: 14px;
      color: #999999;
      span {
        height: 32px;
        line-height: 32px;
        vertical-align: middle;
      }
      .iconfont {
        font-size: 24px;
      }
    }
    .icon_btn_check {
      border: 1px solid #016bff;
      color: #016bff;
      .iconfont {
        color: #016bff;
      }
    }
    .two {
      margin-left: 10px;
      font-size: 14px;
      color: #333333;
    }
  }
  .margT10 {
    margin-top: 10px;
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
}
.icon_btn {
  cursor: pointer;
  width: 50px;
  border: 1px solid #e6e6e6;
  text-align: center;
  border-radius: 3px;
}
.colorBox {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  min-width: 100px;
  .reset_color {
    flex-shrink: 0;
    margin-right: 8px;
    font-family: Helvetica;
    color: #016bff !important;
    cursor: pointer;
  }
}
</style>

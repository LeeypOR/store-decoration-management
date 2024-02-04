<template>
  <div class="title_text">
    <div v-if="formData.textAlign == 'left'" class="flex_between">
      <div class="header">
        <div class="title" :style="styleOne">
          {{ formData.title }}
          <div class="more_txt" v-if="formData.more">
            <span
              :class="formData.styleValue == 1 ? 'colorBlue' : ''"
              v-if="formData.styleValue != 3"
              :style="{ fontSize: 14 + 'px' }"
              >{{ formData.prompt }}</span
            >
            <span
              v-if="formData.styleValue != 1"
              :style="{ fontSize: 14 + 'px' }"
              class="jiantou iconfont icon-arrow"
            ></span>
          </div>
        </div>
        <div :style="styleTwo">{{ formData.describe }}</div>
      </div>
    </div>
    <div v-else>
      <div class="center">
        <div>
          <div :style="styleOne" class="centerStyle">
            {{ formData.title }}
          </div>
          <div :style="styleTwo">{{ formData.describe }}</div>
          <div class="more_prompt alginHeight" v-if="formData.more">
            <span
              :class="formData.styleValue == 1 ? 'colorBlue' : ''"
              v-if="formData.styleValue != 3"
              >{{ formData.prompt }}</span
            >
            <span
              v-if="formData.styleValue != 1"
              style="font-size: 12px; margin-top: 2px"
              class="iconfont icon-arrow"
            ></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MyTitleText",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formData() {
      console.log(this.item.config.formData);
      return this.item.config.formData || {};
    },
    styleOne() {
      return {
        fontSize: this.formData.titleSize + "px",
        fontWeight: this.formData.titleThickness,
        color: this.formData.titleColor,
        letterSpacing: this.formData.titleSpace + "px",
        lineHeight: this.formData.titleHeight,
      };
    },
    styleTwo() {
      return {
        fontSize: this.formData.txtSize + "px",
        fontWeight: this.formData.txtThickness,
        color: this.formData.txtColor,
        lineHeight: this.formData.textHeight,
        letterSpacing: this.formData.textSpace + "px",
        marginTop: this.formData.text_titleSpace + "px",
        borderBottom: this.formData.bottomLine ? "1px solid #999" : "",
        padding: "4px 0",
      };
    },

    // styleThree () {
    //   return {
    //     height: this.formData.height + 'px',
    //     lineHeight: this.formData.height + 'px'
    //   }
    // }
  },
  created() {
    console.log("this.item zhixingle", this.formData);
  },
};
</script>
<style lang="less" scoped>
.flex_between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title_text {
  padding: 4px;
  min-height: 32px;
  .header {
    // height: 32px;
    // line-height: 32px;
    flex-grow: 1;
  }
  border: 2px solid #016bff;
  .title {
    width: 100%;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .more_txt {
    // width: 20%;
    padding: 4px;
    height: 24px;
    line-height: 16px;
    font-size: 12px;
    text-align: right;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    span {
      vertical-align: middle;
      color: #999;
      white-space: nowrap;
    }
    .colorBlue {
      color: #016bff;
    }
  }
  .iconfont {
    font-size: 15px;
  }
  .center {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    // >div{
    // height:24px;
    // line-height:24px;
    // }
    // .alginHeight {
    //   height: 24px;
    //   line-height: 24px;
    // }
    .centerStyle {
      position: relative;
    }
  }
  .more_prompt {
    // position: absolute;
    // right: 4px;
    // top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    span {
      vertical-align: middle;
      color: #999;
    }
    .colorBlue {
      color: #016bff;
    }
  }
}
.jiantou {
  display: flex;
  align-items: flex-end;
}
</style>

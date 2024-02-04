<template>
  <div class="attr_main">
    <div class="attr_page_title">搜索设置</div>
    <div class="attr_page_content">
      <div class="sttr_page_select">
        <div class="select_tab">
          <p class="title">精选热词</p>
          <p class="remark">最多配置3个精选热词</p>
        </div>
      </div>

      <div class="tab_bar_list">
        <a-form-model
          v-if="searchForm._hotWords.length > 0"
          ref="searchForm"
          :model="searchForm"
          :wrapper-col="{ span: 24 }"
        >
          <div
            class="tab_panel m-t-20"
            v-for="(item, index) in searchForm._hotWords"
            :key="index"
          >
            <div class="tab_form">
              <a-form-model-item
                :prop="'_hotWords.' + index + '.hotWordName'"
                :rules="[{ validator: validatecheckWords, trigger: 'change' }]"
              >
                <a-input
                  autocomplete="on"
                  :key="4"
                  :maxLength="8"
                  v-model="item.hotWordName"
                  placeholder="8个字以内"
                />
              </a-form-model-item>

              <img
                class="delete_icon"
                @click="deleteImageInfo(index)"
                src="~@images/shop/icon_middle_modalbox_delete_s.png"
                alt=""
              />
            </div>
          </div>
        </a-form-model>
        <a-button
          v-if="searchForm._hotWords.length < 3"
          type="dashed"
          style="width: 100%"
          @click="addRow"
        >
          <a-icon type="plus" /> 添加精选热词
        </a-button>
      </div>
    </div>

    <div class="actions">
      <div class="btns">
        <a-button class="btn release" @click="submitForm"> 保存 </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from "@/utils/eventBus";
// 底部导航tab组件
import { mapGetters } from "vuex";
export default {
  data() {
    let validatecheckWords = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入热词"));
      } else {
        const arr = [];
        const obj = [];
        this.hotWordList.forEach((item) => {
          arr.push(item.hotWordName);
        });
        arr.forEach((l) => {
          if (value == l) {
            obj.push(l);
          }
        });
        if (obj.length >= 2) {
          callback(new Error("输入的热词重复"));
        } else {
          callback();
        }
      }
    };
    return {
      form: this.$form.createForm(this, { name: "coordinated" }),
      checked: false,
      color: "#ffffff",
      // tabBar
      tabBarIndex: 0,
      visible: false,
      searchForm: {
        _hotWords: [],
      },
      hotIndex: 0,
      validatecheckWords: validatecheckWords,
    };
  },

  components: {},

  props: {
    hotWordList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },

  watch: {
    hotWordList(val) {
      if (val.length >= 0) {
        console.log(val, "监听");
        this.searchForm._hotWords = this.hotWordList;
      }
    },
  },

  created() {
    // this.searchForm._hotWords = this.hotWordList;
  },

  filters: {},

  mounted() {},

  methods: {
    addRow() {
      this.searchForm._hotWords.push({
        hotWordName: "",
        id: "",
      });

      console.log(this.searchForm);
    },

    deleteImageInfo(index) {
      this.searchForm._hotWords.splice(index, 1);
    },

    submitForm(formName) {
      // console.log(this.searchForm);
      if (this.searchForm._hotWords.length > 0) {
        this.$refs.searchForm.validate((valid) => {
          if (valid) {
            this.$emit("save", this.searchForm);
            eventBus.$emit("submitHotWord", this.searchForm);
          } else {
            console.log("error submit!!");
          }
        });
      } else {
        this.$emit("save", this.searchForm);
        eventBus.$emit("submitHotWord", this.searchForm);
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
    padding: 12px 16px;
    position: relative;
    flex: 1 1 0;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .sttr_page_select {
      border-bottom: 1px solid #e6e6e6;
      .select_tab {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        margin-bottom: 24px;
        .remark {
          margin-top: 10px;
          font-size: 12px;
          color: #999999;
          letter-spacing: 0;
        }
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

.tab_panel {
  width: 100%;
  min-height: 54px;
  background: #ffffff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  // overflow: hidden;
  border-radius: 4px 4px 0px 0px;
  background: #ffffff;
  display: flex;
  align-items: center;
  .tab_header {
    background: #eeeeee;
    height: 40px;
    background: #eeeeee;
    line-height: 40px;
    padding-left: 10px;
  }
  .tab_form {
    padding: 12px;
    flex: 1;
    position: relative;
    .main_picture {
      /deep/ .ant-upload {
        width: 60px !important;
        height: 60px !important;
      }
      .img_text {
        text-align: center;
        line-height: normal;
      }
    }

    .delete_icon {
      width: 16px;
      height: 16px;
      position: absolute;
      top: -8px;
      right: -8px;
      cursor: pointer;
      display: none;
    }
    &:hover {
      .delete_icon {
        display: block;
      }
    }

    /deep/.ant-form-item {
      margin-bottom: 0;
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
</style>
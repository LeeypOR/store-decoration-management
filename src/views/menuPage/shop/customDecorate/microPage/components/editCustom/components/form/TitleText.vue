<template>
  <div class="title-text-form">
    <div class="title_nav">
      <a-tabs default-active-key="1" @change="changeTabs">
        <a-tab-pane key="1" tab="传统样式">
          <div class="from_seaction">
            <div>
              <h3 class="title_h3">标题内容</h3>
              <div class="marT10">
                <a-input
                  placeholder="请输入标题 最多 24 字"
                  v-model="formDataObject.title"
                  :maxLength="24"
                />
              </div>
            </div>
            <div class="marT10">
              <h3 class="title_h3">描述内容</h3>
              <div class="marT10">
                <a-textarea
                  placeholder="请输入要说明的文字，最多 100 字"
                  v-model="formDataObject.describe"
                  :rows="4"
                  :maxLength="100"
                />
              </div>
            </div>
            <a-divider />
            <div>
              <div class="disFlex">
                <span>
                  <span class="one">显示位置</span>
                  <span class="two">{{
                    formDataObject.textAlign == "left" ? "居左显示" : "居中显示"
                  }}</span>
                </span>
                <span>
                  <span
                    :class="[
                      'iconfont',
                      'icon-icon_right_attributebar_wzjz_selected icon_btn',
                      formDataObject.textAlign == 'left'
                        ? 'icon_btn_check'
                        : '',
                    ]"
                    @click="changeCheck('textAlign', 'left')"
                  ></span>
                  <span
                    :class="[
                      'iconfont icon-icon_right_attributebar_wzjz_default icon_btn',
                      formDataObject.textAlign == 'center'
                        ? 'icon_btn_check'
                        : '',
                    ]"
                    @click="changeCheck('textAlign', 'center')"
                  ></span>
                </span>
              </div>
              <div class="disFlex margT10">
                <span>
                  <span class="one">标题大小</span>
                  <span class="two">{{ formDataObject.titleSize+'号' }}</span>
                </span>
                <span>
                  <a-select
                    style="width: 88px"
                    v-model="formDataObject.titleSize"
                    :options="fontSizeList">
                  </a-select>
                  <!-- <span
                    :class="[
                      'icon_btn lSize',
                      formDataObject.titleSize == '16' ? 'icon_btn_check' : '',
                    ]"
                    @click="changeCheck('titleSize', '16')"
                    >A</span
                  >
                  <span
                    :class="[
                      'icon_btn mSize',
                      formDataObject.titleSize == '14' ? 'icon_btn_check' : '',
                    ]"
                    @click="changeCheck('titleSize', '14')"
                    >A</span
                  >
                  <span
                    :class="[
                      'icon_btn smallSize',
                      formDataObject.titleSize == '12' ? 'icon_btn_check' : '',
                    ]"
                    @click="changeCheck('titleSize', '12')"
                    >A</span
                  > -->
                </span>
              </div>
              <div class="disFlex margT10">
                <span>
                  <span class="one">描述大小</span>
                  <span class="two">{{ formDataObject.txtSize+'号' }}</span>
                </span>
                <span>
                  <a-select
                    :default-value="formDataObject.txtSize"
                    style="width: 88px"
                    @change="handleChange"
                  >
                    <a-select-option v-for="item of 10" :key="item" :value="(12+item*2)"> {{12+item*2}} </a-select-option
                    >
                  </a-select>
                  <!-- <span
                    :class="[
                      'icon_btn lSize',
                      formDataObject.txtSize == '16' ? 'icon_btn_check' : '',
                    ]"
                    @click="changeCheck('txtSize', '16')"
                    >A</span
                  >
                  <span
                    :class="[
                      'icon_btn mSize',
                      formDataObject.txtSize == '14' ? 'icon_btn_check' : '',
                    ]"
                    @click="changeCheck('txtSize', '14')"
                    >A</span
                  >
                  <span
                    :class="[
                      'icon_btn smallSize',
                      formDataObject.txtSize == '12' ? 'icon_btn_check' : '',
                    ]"
                    @click="changeCheck('txtSize', '12')"
                    >A</span
                  > -->
                </span>
              </div>
              <div class="disFlex margT10">
                <span>
                  <span class="one">标题粗细</span>
                  <span class="two">{{
                    formDataObject.titleThickness == "normal"
                      ? "常规体"
                      : "加粗体"
                  }}</span>
                </span>
                <span>
                  <span
                    :class="[
                      'iconfont icon-icon_right_attributebar_wzdh_default icon_btn',
                      formDataObject.titleThickness == 'normal'
                        ? 'icon_btn_check'
                        : '',
                    ]"
                    @click="changeCheck('titleThickness', 'normal')"
                  ></span>
                  <span
                    :class="[
                      'iconfont icon-icon_right_attributebar_wzdh_default icon_btn fontBold',
                      formDataObject.titleThickness == 'bold'
                        ? 'icon_btn_check'
                        : '',
                    ]"
                    @click="changeCheck('titleThickness', 'bold')"
                  ></span>
                </span>
              </div>
              <div class="disFlex margT10">
                <span>
                  <span class="one">描述粗细</span>
                  <span class="two">{{
                    formDataObject.txtThickness == "normal"
                      ? "常规体"
                      : "加粗体"
                  }}</span>
                </span>
                <span>
                  <span
                    :class="[
                      'iconfont icon-icon_right_attributebar_wzdh_default icon_btn',
                      formDataObject.txtThickness == 'normal'
                        ? 'icon_btn_check'
                        : '',
                    ]"
                    @click="changeCheck('txtThickness', 'normal')"
                  ></span>
                  <span
                    :class="[
                      'iconfont icon-icon_right_attributebar_wzdh_default icon_btn fontBold',
                      formDataObject.txtThickness == 'bold'
                        ? 'icon_btn_check'
                        : '',
                    ]"
                    @click="changeCheck('txtThickness', 'bold')"
                  ></span>
                </span>
              </div>
              <div class="line">
                <div class="text_wrap">
                  <div class="label">标题与描述间距</div>
                </div>
                <a-slider
                  class="slider"
                  v-model="formDataObject.text_titleSpace"
                  :max="30"
                  style="width: 120px"
                />
                <a-input-number
                  v-model="formDataObject.text_titleSpace"
                  :max="30"
                  style="marginleft: 16px"
                />
              </div>
              <div class="disFlex margT10">
                <span>
                  <span class="one">标题颜色</span>
                  <span class="two">{{ formDataObject.titleColor }}</span>
                </span>
                <span class="color_change">
                  <span
                    class="pointer text-primary"
                    @click="changeCheck('titleColor', '#333333')"
                    >重置</span
                  >
                  <a-input type="color" v-model="formDataObject.titleColor" />
                </span>
              </div>
              <div class="line">
                <div class="text_wrap">
                  <div class="label">标题字间距</div>
                </div>
                <a-slider
                  class="slider"
                  v-model="formDataObject.titleSpace"
                  :max="10"
                  style="width: 120px"
                />
                <a-input-number
                  v-model="formDataObject.titleSpace"
                  :max="10"
                  style="marginleft: 16px"
                />
              </div>
              <div class="line">
                <div class="text_wrap">
                  <div class="label">标题行间距(倍数)</div>
                </div>
                <a-slider
                  class="slider"
                  v-model="formDataObject.titleHeight"
                  :step="0.1"
                  :min="1"
                  :max="3"
                  style="width: 120px"
                />
                <a-input-number
                  v-model="formDataObject.titleHeight"
                  :max="30"
                  style="marginleft: 16px"
                />
              </div>
              <div class="disFlex margT10">
                <span>
                  <span class="one">描述颜色</span>
                  <span class="two">{{ formDataObject.txtColor }}</span>
                </span>
                <span class="color_change">
                  <span
                    class="pointer text-primary"
                    @click="changeCheck('txtColor', '#333333')"
                    >重置</span
                  >
                  <a-input type="color" v-model="formDataObject.txtColor" />
                </span>
              </div>
              <div class="line">
                <div class="text_wrap">
                  <div class="label">描述字间距</div>
                </div>
                <a-slider
                  class="slider"
                  v-model="formDataObject.textSpace"
                  :max="10"
                  style="width: 120px"
                />
                <a-input-number
                  v-model="formDataObject.textSpace"
                  :max="10"
                  style="marginleft: 16px"
                />
              </div>
              <div class="line">
                <div class="text_wrap">
                  <div class="label">描述行间距(倍数)</div>
                </div>
                <a-slider
                  class="slider"
                  v-model="formDataObject.textHeight"
                  :step="0.1"
                  :min="1"
                  :max="3"
                  style="width: 120px"
                />
                <a-input-number
                  v-model="formDataObject.textHeight"
                  :max="30"
                  style="marginleft: 16px"
                />
              </div>
              <div class="disFlex margT10">
                <span>
                  <span class="one">底部分隔线</span>
                  <span class="two">{{
                    formDataObject.bottomLine ? "显示" : "不显示"
                  }}</span>
                </span>
                <span class="check_radio">
                  <span
                    class="_check"
                    @click="changeCheck('bottomLine', true)"
                    v-if="!formDataObject.bottomLine"
                  ></span>
                  <span
                    class="iconfont icon-Checkbox"
                    v-else
                    @click="changeCheck('bottomLine', false)"
                  ></span>
                </span>
              </div>
            </div>
            <a-divider />
            <div>
              <div class="disFlex">
                <span>
                  <span class="one">查看更多</span>
                  <span class="two">{{
                    formDataObject.more ? "显示" : "不显示"
                  }}</span>
                </span>
                <span class="check_radio">
                  <span
                    class="_check"
                    @click="changeCheck('more', true)"
                    v-if="!formDataObject.more"
                  ></span>
                  <span
                    class="iconfont icon-Checkbox"
                    v-else
                    @click="changeCheck('more', false)"
                  ></span>
                </span>
              </div>
              <div v-if="formDataObject.more">
                <a-radio-group
                  v-model="formDataObject.styleValue"
                  @change="onChange"
                >
                  <a-radio :value="1">样式一</a-radio>
                  <a-radio :value="2">样式二</a-radio>
                  <a-radio :value="3">样式三</a-radio>
                </a-radio-group>
                <div class="prompt">
                  <div class="prompt_txt">
                    <a-input v-model="formDataObject.prompt"></a-input>
                  </div>
                  <div class="prompt_tip">提示：样式提示语</div>
                </div>
                <div class="link margT10">
                  <div>跳转链接</div>
                  <a @click="addLinkPage()">{{
                    formDataObject | jumpLinkTextFilter
                  }}</a>
                </div>
              </div>
            </div>
          </div>
        </a-tab-pane>
        <!-- <a-tab-pane key="2" tab="微信图文样式" force-render>
          <div></div>
        </a-tab-pane> -->
      </a-tabs>
    </div>
    <PageModal
      :record="currentRecord"
      @cancel="closeInfoModal"
      @confirm="selectedPage"
      :visible="pageModalVisible"
      :pageIndex="pageIndex"
      :pageModelId="pageModelId"
    ></PageModal>
  </div>
</template>
<script>
import PageModal from "@components/antBase/PageModal";
import { cloneDeep } from "lodash";
export default {
  name: "MyTitleTextForm",
  components: {
    PageModal,
  },
  filters: {
    jumpLinkTextFilter(item) {
      if (item.jumpPageId) {
        return item.jumpPageType == "WXMAID"
          ? item.jumpPageUrl
          : item.jumpPageName;
      } else return "点击选择跳转到的页面";
    },
  },
  props: {
    // 传入的原始数据
    formData: {},
  },
  created() {
    this.formDataObject = cloneDeep(this.formData);
    console.log("formDataObject", this.formDataObject);
  },
  data() {
    return {
      pageModalVisible: false,
      currentRecord: {},
      formDataObject: {},
      pageModelId: "",
      pageIndex: "MSPAGE",
      fontSizeList: [
        { label: '12', value: 12 },
        { label: '14', value: 14 },
        { label: '16', value: 16 },
        { label: '18', value: 18 },
        { label: '20', value: 20 },
        { label: '22', value: 22 },
        { label: '26', value: 26 },
        { label: '28', value: 28 },
        { label: '36', value: 36 },
        { label: '48', value: 48 },
        { label: '56', value: 56 },
        { label: '72', value: 72 }
      ]
    };
  },
  methods: {
    changeTabs() {},
    changeCheck(a, b) {
      const { formDataObject } = this;
      formDataObject[a] = b;
    },
    onChange(e) {
      console.log("radio checked", e.target.value);
    },
    addLinkPage(item) {
      // 开启产品选择弹窗，以便配置跳转链接
      // this.currentImageItem = item
      this.pageModelId = this.formDataObject.jumpPageId;
      this.pageIndex = this.formDataObject.jumpPageType;
      this.pageModalVisible = true;
    },
    selectedPage({ id, name, type, url }) {
      console.log("收到的已选择信息为:", id, name, type);
      this.$set(this.formDataObject, "jumpPageId", id);
      this.$set(this.formDataObject, "jumpPageName", name);
      this.$set(this.formDataObject, "jumpPageUrl", url);
      this.$set(this.formDataObject, "jumpPageType", type);
      console.log(this.formDataObject);
      this.pageModalVisible = false;
    },
    closeInfoModal(type) {
      console.log(type, "type");
      this.pageModalVisible = false;
    },
    handleChange(e){
      this.changeCheck('txtSize',e)
    },
    handleChangeTitle(e){
       this.changeCheck('titleSize',e)
    }
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
  a {
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
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

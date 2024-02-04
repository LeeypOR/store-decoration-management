<template>
  <div class="rich_text_from">
    <div class="title_nav">
      <!-- <div>
        <div class="disFlex margT10">
          <span>
            <span class="one">背景颜色</span>
            <span class="two">{{ formDataObject.titleColor }}</span>
          </span>
          <span class="color_change">
            <span class="pointer text-primary" @click="changeCheck('bgColor', '#333333')">重置</span>
            <a-input type="color" v-model="formDataObject.bgColor" />
          </span>
        </div>
      </div> -->
      <div class="margT10">
        <div class="disFlex">
          <span>
            <span class="one">是否全屏显示</span>
            <span class="two">
              {{
              formDataObject.fullscreen ? "全屏显示" : "不全屏显示"
              }}
            </span>
          </span>
          <span class="check_radio">
            <span class="_check" @click="changeCheck('fullscreen', true)" v-if="!formDataObject.fullscreen"></span>
            <span class="iconfont icon-Checkbox" v-else @click="changeCheck('fullscreen', false)"></span>
          </span>
        </div>
      </div>
      <div class="margT10">
        <!-- <tinymce-editor v-model="formDataObject.remark"></tinymce-editor> -->
        <vue-ueditor-wrap class="vue-ueditor" v-model="formData.remark" :config="ueditorConfig" :destroy="true"></vue-ueditor-wrap>
      </div>
    </div>
  </div>
</template>
<script>
import { cloneDeep } from 'lodash'
import VueUeditorWrap from 'vue-ueditor-wrap'
export default {
  name: 'MyRichTextForm',
  components: { VueUeditorWrap },
  filters: {},
  props: {
    // 传入的原始数据
    formData: {}
  },
  created () {
    this.formDataObject = cloneDeep(this.formData)
  },
  data () {
    return {
      pageModalVisible: false,
      currentRecord: {},
      formDataObject: {},
      ueditorConfig: {
        // 上传文件接口
        // serverUrl: `https://localhost/jsp/controller.jsp`,
        serverUrl: `https://jdz.g1999.com/jsp/controller.jsp`,
        // UEditor 资源文件的存放路径，`${location.origin}` == 'https://jdz.g1999.com'
        UEDITOR_HOME_URL: 'https://jdz.g1999.com/goldenhome/store/web/UEditor/',
        // 工具栏，如需重新配置，自行添加，否则按默认展示
        // toolbars: [],
        initialFrameWidth: 360,
        initialFrameHeight: 500
      }
    }
  },
  methods: {
    changeCheck (a, b) {
      this.$set(this.formDataObject, a, b)
    }
  },
  watch: {
    formDataObject: {
      handler (n, o) {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.$emit('updateFormData', this.formDataObject)
        }, 300)
      },
      deep: true
    }
  }
}
</script>
<style lang="less" scoped>
@labelColor: #999;
@resultColor: #333;
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
  .one {
    color: #999;
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
    span {
      display: inline-block;
    }
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
.margT10 {
  margin-top: 10px;
}
</style>

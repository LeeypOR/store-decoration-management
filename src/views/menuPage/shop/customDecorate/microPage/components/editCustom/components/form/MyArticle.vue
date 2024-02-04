<template>
  <div class="my-article-form">
    <div class="item-title">添加文章</div>
    <p class="form-tips">最多添加20篇，按照添加顺序排列</p>
    <div class="choose-box m-t-10 m-b-10">
      <div class="choose-box-con">
        <div class="choose-item" v-for="(item, index) in formDataObject.articleList" :key="index">
          <span class="btn" @click="addLinkPage(item, index)">{{ item | jumpLinkTextFilter }}</span>
          <span>{{ '资讯'+q(index+1) }}</span>
          <span class="close" @click="delArticl(item, index)"><img src="~@images/shop/icon_middle_modalbox_delete_s.png" alt=""></span>
        </div>
      </div>
      <div class="add-btn" @click="addArticl"><span>添加资讯文章</span></div>
    </div>
    <div class="form-box">
      <div>
        <div class="choose-template">
          <span>选择模版</span>
          <span class="name">
            {{ formDataObject.templateType | templateTypeFilter }}
          </span>
        </div>
        <div class="choose-template m-t-10">
          <div
            v-for="(item, index) in templateList"
            :key="index"
            :class="['template-item', formDataObject.templateType == item.value ? 'iconfont-check': '']"
            @click="changeTemplateType(item.value)">
            <i :class="['iconfont', item.icon]"></i>
          </div>
        </div>
      </div>
    </div>
    <a-divider />
    <div class="form-item large">
      <div class="label">
        <span class="name">样式</span>
      </div>
      <div class="input">
        <div
          v-for="item in styleList"
          :key="item.value"
          :class="['form-radio-btn', formDataObject.styleType == item.value ? 'iconfont-check' : '']"
          @click="changeCheck('styleType', item.value)">
          <span>{{ item.label }}</span>
        </div>
      </div>
    </div>
    <div class="form-item">
      <div class="label">
        <span class="name">倒角</span>
        <span class="value">{{ formDataObject.angleType | angleTypeFilter }}</span>
      </div>
      <div class="input">
        <div
          :class="['form-radio-btn', formDataObject.angleType == '0' ? 'iconfont-check' : '']"
          @click="changeCheck('angleType', '0')">
          <i class="iconfont icon-icon_right_attributebar_zhijiao_default"></i>
        </div>
        <div
          :class="['form-radio-btn', formDataObject.angleType == '1' ? 'iconfont-check' : '']"
          @click="changeCheck('angleType', '1')">
          <i class="iconfont icon-icon_right_attributebar_yuanjiao_default"></i>
        </div>
      </div>
    </div>
    <div class="form-item">
      <div class="label">
        <span class="name">文本样式</span>
        <span class="value">{{ formDataObject.textThickness | textThicknessFilter }}</span>
      </div>
      <div class="input">
        <div
          :class="['form-radio-btn', formDataObject.textThickness == 'normal' ? 'iconfont-check' : '']"
          @click="changeCheck('textThickness', 'normal')">
          <i class="iconfont icon-icon_right_attributebar_zz_r"></i>
        </div>
        <div
          :class="['form-radio-btn', formDataObject.textThickness == 'bold' ? 'iconfont-check' : '']"
          @click="changeCheck('textThickness', 'bold')">
          <i class="iconfont icon-icon_right_attributebar_zz_b"></i>
        </div>
      </div>
    </div>
    <a-divider />
    <!-- <div class="form-item">
      <div class="label">
        <span class="name">阅读数</span>
        <span class="value">{{ formDataObject.readShow ? "显示" : "不显示" }}</span>
      </div>
      <div class="input">
        <div class="check_radio">
          <span
            class="_check"
            @click="changeCheck('readShow', true)"
            v-if="!formDataObject.readShow"></span>
          <span
            class="iconfont icon-Checkbox"
            v-else
            @click="changeCheck('readShow', false)"></span>
        </div>
      </div>
    </div>
    <div class="form-item">
      <div class="label">
        <span class="name">点赞数</span>
        <span class="value">{{ formDataObject.praiseShow ? "显示" : "不显示" }}</span>
      </div>
      <div class="input">
        <div class="check_radio">
          <span
            class="_check"
            @click="changeCheck('praiseShow', true)"
            v-if="!formDataObject.praiseShow"></span>
          <span
            class="iconfont icon-Checkbox"
            v-else
            @click="changeCheck('praiseShow', false)"></span>
        </div>
      </div>
    </div> -->
    <div class="form-item">
      <div class="label">
        <span class="name">文章标签</span>
        <span class="value">{{ formDataObject.labelShow ? "显示" : "不显示" }}</span>
      </div>
      <div class="input">
        <div class="check_radio">
          <span
            class="_check"
            @click="changeCheck('labelShow', true)"
            v-if="!formDataObject.labelShow"></span>
          <span
            class="iconfont icon-Checkbox"
            v-else
            @click="changeCheck('labelShow', false)"></span>
        </div>
      </div>
    </div>
    <div class="form-item" v-if="formData.templateType == 'falls'">
      <div class="label">
        <span class="name">查看更多</span>
        <span class="value">{{ formDataObject.moreShow ? "显示" : "不显示" }}</span>
      </div>
      <div class="input">
        <div class="check_radio">
          <span
            class="_check"
            @click="changeCheck('moreShow', true)"
            v-if="!formDataObject.moreShow"></span>
          <span
            class="iconfont icon-Checkbox"
            v-else
            @click="changeCheck('moreShow', false)"></span>
        </div>
      </div>
    </div>

<!-- , 'MSPAGE' -->
    <PageModal
      :record="currentItem"
      @cancel="closeInfoModal"
      @confirm="selectedPage"
      :defaultTabs="[ 'ARTICLES' ]"
      :chooseIds="chooseIds"
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
  name: 'MyArticleForm',
  components: {
    PageModal
  },
  filters: {
    jumpLinkTextFilter(item) {
      if (item.jumpPageId) {
        return item.jumpPageName;
      }
      // r
      return "点击选择跳转到的页面";
    },
    templateTypeFilter(n) {
      switch (n) {
        case "scroll":
          return "横向滑动";
        case "falls":
          return "瀑布流";
        default:
          return "";
      }
    },
    angleTypeFilter(n) {
      switch (n) {
        case '0':
          return '直角';
        case '1':
          return '圆角'
      }
    },
    textThicknessFilter(n) {
      switch (n) {
        case 'bold':
          return '加粗';
        case 'normal':
          return '常规'
      }
    },
  },
  props: {
    // 传入的原始数据
    formData: {},
  },
  data() {
    return {
      timer: null,
      formDataObject: {},
      currentItem: {},
      currentIndex: 0,
      pageModalVisible: false,
      pageModelId: "",
      chooseIds: [],
      pageIndex: "ARTICLES",
      templateList: [
        {
          icon: 'icon-icon_right_attributebar_hxhd_default',
          value: 'scroll'
        },
        {
          icon: 'icon-icon_right_attributebar_zbyangshisan_default',
          value: 'falls'
        },
      ],
      styleList: [
        { label: '无边白底', value: 'none' },
        { label: '描边白底', value: 'border' },
        { label: '卡片投影', value: 'shadow' }
      ]
    };
  },
  created() {
    this.formDataObject = cloneDeep(this.formData);
  },
  mounted() {},
  methods: {
    // 补充十位数
    q(num) {
      return num < 10 ? ('0'+num) : num
    },
    addArticl() {
      if(this.formDataObject.articleList.length < 20){
        let flag = {
          jumpPageId: '', // 跳转页面id
          jumpPageName: '', // 跳转页面名称
          jumpPageType: '', // 跳转页面类型
          jumpPageUrl: '', // 跳转页面链接
          jumpPageData: '', // 小程序id 微页面id
          imgUrl: '', // 跳转页面封面图
          readNum: 0, // 阅读数
          praiseNum: 0, // 点赞数
          label: '', // 文章标签
          type: 1 // 文章类型 
        }
        this.formDataObject.articleList.push(flag)
      } else {
        this.$message.warning("最多添加20篇资讯！");
      }
    },
    delArticl(item, index) {
      this.formDataObject.articleList.splice(index, 1);
      this.chooseIds.splice(this.chooseIds.findIndex(chooseId => chooseId === item.jumpPageId), 1)
    },
    getArticlDetail(id) {
      this.$get('/articles/query',
      { id },
      { baseURL: `${location.origin}/goldenhome/decoration/admin` }).then(res => {
        if(res && res.returnCode=='1000') {
          this.formDataObject.articleList[this.currentIndex].jumpPageId = res.dataInfo.id
          this.formDataObject.articleList[this.currentIndex].jumpPageName = res.dataInfo.articleTitle
          this.formDataObject.articleList[this.currentIndex].jumpPageType = 'ARTICLES'
          this.formDataObject.articleList[this.currentIndex].jumpPageUrl = res.dataInfo.articleUrl
          this.formDataObject.articleList[this.currentIndex].imgUrl = res.dataInfo.articleCover
          this.formDataObject.articleList[this.currentIndex].readNum = res.dataInfo.viewNum || 0
          this.formDataObject.articleList[this.currentIndex].praiseNum = res.dataInfo.likeNum || 0
          this.formDataObject.articleList[this.currentIndex].label = res.dataInfo.articleLabel
          switch (res.dataInfo.articleType) {
            case 1:
              this.formDataObject.articleList[this.currentIndex].jumpPageData = res.dataInfo.id
              this.formDataObject.articleList[this.currentIndex].type = 'WEBVIEW'
              break;
            case 2:
              this.formDataObject.articleList[this.currentIndex].jumpPageData = res.dataInfo.wxMaId
              this.formDataObject.articleList[this.currentIndex].type = 'WXMAID'
              break;
            case 3:
              this.formDataObject.articleList[this.currentIndex].jumpPageData = res.dataInfo.pageId
              this.formDataObject.articleList[this.currentIndex].type = 'MSPAGE'
              break;
          }
        }
      })
    },
    addLinkPage(item, index) {
      this.currentItem = item;
      this.currentIndex = index;
      this.pageModelId = item.jumpPageId;
      this.pageIndex = item.jumpPageType || 'ARTICLES';
      this.pageModalVisible = true;
    },
    closeInfoModal(type) {
      console.log(type, "type");
      this.pageModalVisible = false;
    },
    selectedPage({ id, name, type }) {
      console.log("收到的已选择信息为:", id, name, type);
      this.$set(this.currentItem, "jumpPageId", id);
      this.$set(this.currentItem, "jumpPageName", name);
      this.$set(this.currentItem, "jumpPageType", type);
      this.chooseIds.push(id)
      this.getArticlDetail(id)
      this.pageModalVisible = false;
    },
    changeTemplateType(val) {
      this.$set(this.formDataObject, "templateType", val);
    },
    changeCheck(key, val) {
      this.$set(this.formDataObject, key, val);
    },
  },
  beforeDestroy() {
    // if (this.formDataObject.shopListType == "1") {
    //   this.formDataObject.shopList = [];
    // } else {
    //   this.formDataObject.imageList = [];
    // }
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
        this.chooseIds = this.formDataObject.articleList.map((item) => {
          return item.jumpPageId
        })
      },
      deep: true,
    },
    cubeWidth() { // 宽度该表
      this.getOneCubeBoxWidth();
    },
  },
};
</script>

<style lang="less">
@labelColor: #999;
@resultColor: #333;
.my-article-form{
  .item-title{
    font-size: 14px;
    color: #333;
    margin: 20px 0;
  }
  .choose-template{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .template-item {
      display: inline-block;
      text-align: center;
      width: 69px;
      height: 32px;
      line-height: 32px;
      border: 1px solid #e6e6e6;
      .iconfont {
        font-size: 30px;
      }
      &:hover{
        border-color: #016BFF;
      }
    }
    span{
      font-size: 14px;
      color: #999;
      &.name {
        margin-left: 10px;
        color: #333;
      }
    }
  }
  .choose-box{
    width: 100%;
    max-height: 240px;
    background: #FAFAFA;
    .choose-box-con{
      overflow-y: scroll;
      max-height: 170px;
    }
    .choose-item{
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      margin: 12px 12px 10px 12px;
      width: calc(100% - 24px);
      height: 46px;
      background: #fff;
      border: 1px solid #E6E6E6;
      padding: 0 10px;
      margin-bottom: 10px;
      .btn{
        width: 200px;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
        color: #016BFF;
        cursor: pointer;
      }
      .close{
        display: none;
        width: 20px;
        height: 20px;
        position: absolute;
        right: -10px;
        top: -10px;
        z-index: 9;
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      &:hover{
        background: #F2F8FF;
        border-color: #016BFF;
        .close{
          display: block;
        }
      }
    }
    .add-btn{
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 12px;
      width: calc(100% - 24px);
      height: 46px;
      background: #fff;
      border: 1px solid #016BFF;
      color: #016BFF;
      cursor: pointer;
    }
  }
  .form-item{
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .label{
      width: calc(100% - 200px);
      font-size: 14px;
      color: #999999;
      .value{
        margin-left: 10px;
        color: #333;
      }
    }
    .input{
      width: 200px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .form-radio-btn{
        text-align: center;
        width: 50px;
        height: 32px;
        line-height: 32px;
        border: 1px solid #e6e6e6;
        &:hover{
          border-color: #016BFF;
        }
      }
      .input-btn{
        margin: 0 10px;
        font-size: 14px;
        color: #999;
      }
      &.color .ant-input{
        width: 60px;
        padding: 1px;
        border-radius: 0;
      }
      .check_radio {
        height: 32px;
        line-height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
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
    &.large{
      .label{
        width: calc(100% - 300px);
      }
      .input{
        width: 300px;
        .form-radio-btn{
          width: 100px;
        }
      }
    }
  }
  .iconfont {
    font-size: 22px;
    color: #e6e6e6;
  }
  .iconfont-check{
    color: #016BFF;
    background: #E0EDFF;
    border-color: #016BFF !important;
    .iconfont{
      color: #016BFF;
    }
  }
}
</style>

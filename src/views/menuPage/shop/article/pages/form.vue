<template>
  <div class="half-price">
    <a-form-model
      class="half-price-form"
      ref="ruleForm"
      :model="formData"
      :rules="rules"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 20 }">
      <a-form-model-item prop="articleType">
        <template slot="label">
          <span style="color: red">*</span>文章类型
        </template>
        <a-radio-group :disabled="handle == 'view'" v-model="formData.articleType">
          <a-radio :value="1">公众号文章</a-radio>
          <a-radio :value="2">小程序文章</a-radio>
          <a-radio :value="3">微页面</a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item v-if="formData.articleType == 2" prop="wxMaId">
        <template slot="label">
          <span style="color: red">*</span>小程序appid
        </template>
        <a-select
          showSearch
          allowClear
          style="width:300px"
          :options="wxMaIdList"
          v-model="formData.wxMaId"
          placeholder="请选择小程序">
        </a-select>
      </a-form-model-item>
      <a-form-model-item v-if="formData.articleType != 3" prop="articleUrl">
        <template slot="label">
          <span style="color: red">*</span>文章链接
        </template>
        <a-input
          allow-clear
          style="width:300px"
          v-model="formData.articleUrl"
          :disabled="handle == 'view'"
          placeholder="请输入文章链接" />
      </a-form-model-item>

      <a-form-model-item v-if="formData.articleType == 3" prop="pageId">
        <template slot="label">
          <span style="color: red">*</span>选择微页面
        </template>
        <a-button v-if="handle != 'view'" type="link" @click="choosePage">{{ formData.pageId ? '重新选择微页面' : '请选择微页面' }}</a-button>
      </a-form-model-item>
      <a-form-model-item prop="articleTitle">
        <template slot="label">
          <span style="color: red">*</span>文章标题
        </template>
        <a-input
          :maxLength="20"
          allow-clear
          style="width:300px"
          v-model="formData.articleTitle"
          :disabled="handle == 'view'"
          placeholder="请输入文章标题" />
      </a-form-model-item>
      <a-form-model-item label="文章标签" prop="articleLabel">
        <a-input
          :maxLength="6"
          allow-clear
          style="width:300px"
          v-model="formData.articleLabel"
          :disabled="handle == 'view'"
          placeholder="请输入文章标签" />
      </a-form-model-item>
      <a-form-model-item prop="articleCover">
        <template slot="label">
          <span style="color: red">*</span>封面图片
        </template>
        <upload-image
          class="article-upload"
          v-model="formData.articleCover">
          <img v-if="formData.articleCover" :src="formData.articleCover" />
          <div v-else>
            <a-icon type="plus" />
          </div>
        </upload-image>
        <p class="form-tips inline">图片建议尺寸335*335~335*223，或同比例。</p>
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-col :offset="2">
          <a-space>
            <a-button v-if="handle != 'view'" type="primary" @click="submitData()">提交保存</a-button>
            <a-button @click="handleCancel">{{ handle != 'view' ? '取消' : '返回' }}</a-button>
          </a-space>
        </a-col>
      </a-form-model-item>
    </a-form-model>

    <PageModal
      :record="currentItem"
      @cancel="closeInfoModal"
      @confirm="selectedPage"
      :defaultTabs="[ 'MSPAGE' ]"
      :visible="pageModalVisible"
      :pageIndex="pageIndex"
      :pageModelId="pageModelId"
    ></PageModal>
  </div>
</template>

<script>
import PageModal from "@components/antBase/PageModal";
import deepCopy from '@/utils/deepCopy'
import { cloneDeep } from "lodash";
import moment from 'moment'
import { createOptionsByDict } from '@/utils/dict'
const formData={
  id: '',
  articleType: 1,
  pageId: '',
  articleUrl: '',
  articleTitle: '',
  articleLabel: '',
  articleCover: ''
}
export default {
  components: {
    PageModal
  },
  computed: {
    // 操作类型
    handle() {
      return this.$route.query.handle || "";
    },
    // 活动id
    id() {
      return this.$route.query.id || "";
    },
  },
  data() {
    return {
      formData,
      rules: {},
      disabled: false,
      wxMaIdList: createOptionsByDict('WXMAID'),
      currentItem: {
        jumpPageId: '',
        jumpPageName: '',
        jumpPageType: ''
      },
      pageModalVisible: false,
      pageModelId: "",
      pageIndex: "MSPAGE",
    };
  },
  created() {
    if(this.id){
      this.getDetail(this.id)
    }
    this.resetData()
  },
  mounted() {},
  methods: {
    moment,
    //重置
    resetData(){
      this.formData=deepCopy(formData);
    },
    // 获取文章详情
    async getDetail(id) {
      let res = await this.$get('/articles/query',
        { id },
        { baseURL: `${location.origin}/goldenhome/decoration/admin` });
      if(res && res.returnCode=='1000'){
        if(res.dataInfo){
          this.formData = cloneDeep(res.dataInfo);
        }
      }
    },
    choosePage() {
      this.pageModelId = this.currentItem.jumpPageId;
      this.pageIndex = this.currentItem.jumpPageType || 'MSPAGE';
      this.pageModalVisible = true;
    },
    // 关闭微页面选择弹窗
    closeInfoModal(type) {
      this.pageModalVisible = false;
    },
    // 微页面选择弹窗返回结果
    selectedPage({ id, name, type, url }) {
      console.log("收到的已选择信息为:", id, name, type);
      this.$set(this.currentItem, "jumpPageId", id);
      this.$set(this.currentItem, "jumpPageName", name);
      this.$set(this.currentItem, "jumpPageType", type);
      this.$set(this.formData, "articleTitle", name);
      this.$set(this.formData, "pageId", id);
      this.pageModalVisible = false;
    },
    // 返回活动列表
    back() {
      this.$router.push({
        name: "ShopArticle",
        query: {},
      });
    },
    handleCancel(){
      console.log('取消')
      this.back()
    },
    // 提交
    async submitData() {
      // 验证文章类型
      if(!this.formData.articleType) {
        return this.$message.error('请选择文章类型');
      }
      // 验证文章链接
      if(this.formData.articleType == 3){
        if(!this.formData.pageId) {
          return this.$message.error('请选择微页面');
        }
      } else {
        if(!this.formData.articleUrl) {
          return this.$message.error('请输入文章链接');
        }
      }
      
      // 验证文章标题
      if(!this.formData.articleTitle) {
        return this.$message.error('请输入文章标题');
      }
      // 验证封面图片
      if(!this.formData.articleCover) {
        return this.$message.error('请上传封面图片');
      }

      let url = ''
      switch (this.handle) {
        case 'add':
          url = '/articles/add'
          break;
        case 'edit':
          url = '/articles/update'
          break;
      }
      let res = await this.$post(url,
        this.formData,
        { baseURL: `${location.origin}/goldenhome/decoration/admin` });
      if(res && res.returnCode=='1000'){
        this.back()
        return this.$message.success('保存成功！');
      }
      else{
        return this.$message.error('保存失败！');
      }
    }
  }
};
</script>

<style lang="less">
.article-upload .ant-upload.ant-upload-select-picture-card{
  width: 235px !important;
  height: 100px !important;
}
.article-upload.upload-image-component .upload-image-list-item{
  width: 235px !important;
  height: 100px !important;
}
.article-upload.upload-image-component .upload-image-list-item-img{
  object-fit: contain;
}
</style>

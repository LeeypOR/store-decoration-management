<template>
  <div class="my-article-box">
    <div
      :class="[ 'article-box', formData.templateType ]">
      <template v-if="formData.templateType == 'scroll'">
        <div
          :class="['article-item', formData.styleType, formData.angleType == '0' ? '' : 'radius']"
          v-for="(item, index) in listAll" :key="index">
          <div class="article-img">
            <img v-if="item.imgUrl" :src="item.imgUrl" alt="">
            <img v-else src="~@images/shop/article-default.png" alt="">
            <span v-if="formData.labelShow" class="article-label">{{ item.label }}</span>
          </div>
          <div class="article-info">
            <div :class="['article-title', formData.textThickness]">{{ item.jumpPageName }}</div>
            <div class="footer" v-if="formData.readShow || formData.praiseShow">
              <span v-if="formData.readShow" class="article-read">阅读 {{ item.readNum }}</span>
              <span v-if="formData.praiseShow" class="article-praise"><img src="~@images/shop/article-praise.png" alt=""> {{ item.praiseNum }}</span>
            </div>
          </div>
        </div>
      </template>
      <template v-if="formData.templateType == 'falls'">
        <div class="article-even">
          <div
            :class="['article-item', formData.styleType, formData.angleType == '0' ? '' : 'radius']"
            v-for="(item, index) in listEven" :key="index">
            <div class="article-img">
              <img v-if="item.imgUrl" :src="item.imgUrl" alt="">
              <img v-else src="~@images/shop/article-default.png" alt="">
              <span v-if="formData.labelShow" class="article-label">{{ item.label }}</span>
            </div>
            <div class="article-info">
              <div :class="['article-title', formData.textThickness]">{{ item.jumpPageName }}</div>
              <div class="footer" v-if="formData.readShow || formData.praiseShow">
                <span v-if="formData.readShow" class="article-read">阅读 {{ item.readNum }}</span>
                <span v-if="formData.praiseShow" class="article-praise"><img src="~@images/shop/article-praise.png" alt="">{{ item.praiseNum }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="article-odd">
          <div
            :class="['article-item', formData.styleType, formData.angleType == '0' ? '' : 'radius']"
            v-for="(item, index) in listOdd" :key="index">
            <div class="article-img">
              <img v-if="item.imgUrl" :src="item.imgUrl" alt="">
              <img v-else src="~@images/shop/article-default.png" alt="">
              <span v-if="formData.labelShow" class="article-label">{{ item.label }}</span>
            </div>
            <div class="article-info">
              <div :class="['article-title', formData.textThickness]">{{ item.jumpPageName }}</div>
              <div class="footer" v-if="formData.readShow || formData.praiseShow">
                <span v-if="formData.readShow" class="article-read">阅读 {{ item.readNum }}</span>
                <span v-if="formData.praiseShow" class="article-praise"><img src="~@images/shop/article-praise.png" alt="">{{ item.praiseNum }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <p class="article-more" v-if="formData.templateType == 'falls' && formData.moreShow">查看更多 &gt;</p>
  </div>
</template>

<script>
export default {
  name: 'MyArticle',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      listAll: [],
      listEven: [],
      listOdd: []
    };
  },
  computed: {
    formData () {
      return this.item.config.formData || {}
    },
  },
  created() {},
  mounted() {
    this.splitArr()
  },
  methods: {
    splitArr() {
      let _this = this
      if(this.formData.templateType == 'scroll') {

        if(this.formData.articleList.length == 0) {
          this.listAll = [
            {
              jumpPageId: '', // 跳转页面id
              jumpPageName: '这里显示笔记标题，最多显示2行', // 跳转页面名称
              jumpPageType: '', // 跳转页面类型
              jumpPageUrl: '', // 跳转页面链接
              imgUrl: require("@images/shop/article-default.png"), // 跳转页面封面图
              readNum: 0, // 阅读数
              praiseNum: 0, // 点赞数
              label: '文章标签' // 文章标签
            },
            {
              jumpPageId: '', // 跳转页面id
              jumpPageName: '这里显示笔记标题，最多显示2行', // 跳转页面名称
              jumpPageType: '', // 跳转页面类型
              jumpPageUrl: '', // 跳转页面链接
              imgUrl: require("@images/shop/article-default.png"), // 跳转页面封面图
              readNum: 0, // 阅读数
              praiseNum: 0, // 点赞数
              label: '文章标签' // 文章标签
            },
            {
              jumpPageId: '', // 跳转页面id
              jumpPageName: '这里显示笔记标题，最多显示2行', // 跳转页面名称
              jumpPageType: '', // 跳转页面类型
              jumpPageUrl: '', // 跳转页面链接
              imgUrl: require("@images/shop/article-default.png"), // 跳转页面封面图
              readNum: 0, // 阅读数
              praiseNum: 0, // 点赞数
              label: '文章标签' // 文章标签
            }
          ]
        } else {
          this.listAll = this.formData.articleList
        }
      } else if(this.formData.templateType == 'falls') {
        this.listEven = []
        this.listOdd = []
        if(this.formData.articleList.length == 0) {
          this.listEven = [
            {
              jumpPageId: '', // 跳转页面id
              jumpPageName: '这里显示笔记标题，最多显示2行', // 跳转页面名称
              jumpPageType: '', // 跳转页面类型
              jumpPageUrl: '', // 跳转页面链接
              imgUrl: require("@images/shop/article-default.png"), // 跳转页面封面图
              readNum: 0, // 阅读数
              praiseNum: 0, // 点赞数
              label: '文章标签' // 文章标签
            },
            {
              jumpPageId: '', // 跳转页面id
              jumpPageName: '这里显示笔记标题，最多显示2行', // 跳转页面名称
              jumpPageType: '', // 跳转页面类型
              jumpPageUrl: '', // 跳转页面链接
              imgUrl: require("@images/shop/article-default.png"), // 跳转页面封面图
              readNum: 0, // 阅读数
              praiseNum: 0, // 点赞数
              label: '文章标签' // 文章标签
            }
          ]
          this.listOdd = [
            {
              jumpPageId: '', // 跳转页面id
              jumpPageName: '这里显示笔记标题，最多显示2行', // 跳转页面名称
              jumpPageType: '', // 跳转页面类型
              jumpPageUrl: '', // 跳转页面链接
              imgUrl: require("@images/shop/article-default.png"), // 跳转页面封面图
              readNum: 0, // 阅读数
              praiseNum: 0, // 点赞数
              label: '文章标签' // 文章标签
            }
          ]
        } else {
          this.formData.articleList.map(function(item,index){
            index%2===0 ? _this.listEven.push(item) : _this.listOdd.push(item);
          })
        }
      }
    },
    toRGBA(data){
      var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
      var sColor = data.textBgColor.toLowerCase();
      if(sColor && reg.test(sColor)){
        if(sColor.length === 4){
          var sColorNew = "#";
          for(var i=1; i<4; i+=1){
            sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));   
          }
          sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for(var i=1; i<7; i+=2){
          sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));  
        }
        return "rgba(" + sColorChange.join(",") + ","+((data.textBgOpacity/100).toFixed(2))+")";
      }else{
        return sColor;  
      }
    }
  },
  watch: {
    item: {
      handler(n, o) {
        this.splitArr();
      },
      deep: true,
    },
  },
};
</script>

<style lang="less" >
.my-article-box{
  // background: #f5f5f5;
  padding: 15px;
  .article-box{
    width: 100%;
    height: auto;
    .article-item{
      &.radius{
        border-radius: 7px;
        overflow: hidden;
      }
      &.border{
        border: 1px solid #E6E6E6;
      }
      &.shadow{
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.06);
      }
      .article-img{
        position: relative;
        .article-label{
          position: absolute;
          left: 10px;
          bottom: 5px;
          padding: 0 5px 0 15px;
          background: #fff;
          border-radius: 2px;
          color: #666;
          font-size: 12px;
          &::before{
            content: "#";
            position: absolute;
            left: 5px;
            top: 50%;
            transform: translateY(-50%);
            color: #D1B085;
          }
        }
      }
      .article-info{
        background: #fff;
        padding: 10px 12px;
        .article-title{
          height: 42px;
          font-size: 14px;
          color: #333;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp:2;
          -webkit-box-orient: vertical;
          &.normal{
            font-weight: normal;
          }
          &.bold{
            font-weight: bold;
          }
        }
        .footer{
          margin-top: 10px;
          line-height: 20px;
          font-size: 12px;
          color: #999;
          overflow: hidden;
          .article-read{
            float: left;
          }
          .article-praise{
            float: right;
            img{
              width: 14px;
              height: 14px;
              margin-top: -2px;
              margin-right: 5px;
            }
          }
        }
      }
    }
    &.scroll{
      display: flex;
      overflow-x: scroll;
      flex-wrap: nowrap;
      padding-bottom: 10px;
      .article-item{
        width: 150px;
        margin-right: 10px;
        flex-shrink: 0;
        .article-img{
          width: 100%;
          height: 150px;
          position: relative;
          img{
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        &:last-child{
          margin: 0;
        }
      }
    }
    &.falls{
      display: flex;
      justify-content: space-between;
      .article-even, .article-odd{
        width: calc((100% - 10px) / 2);
      }
      .article-item{
        width: 100%;
        margin-bottom: 10px;
        .article-img{
          width: 100%;
          position: relative;
          img{
            width: 100%;
            object-fit: cover;
          }
        }
        &:last-child{
          margin: 0;
        }
      }
    }
  }
  .article-more{
    margin: 10px 0;
    text-align: center;
    font-size: 12px;
    color: #999999;
  }
}

</style>
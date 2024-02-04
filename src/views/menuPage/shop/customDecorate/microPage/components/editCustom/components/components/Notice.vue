<template>
  <div class="my_notice">
    <div class="seaction">
      <div class="my_notice_bar" :style="sizeColor">
        <i class="iconfont icon-icon_middle_modalbox_gonggao_default"></i>
        <div class="my_notice_content" ref="content">
          <div :class="[isAnimation?'my_move':'','move_text']" ref="text">{{formData.textCon}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MyNotice",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data(){
      return{
          isAnimation:false
      }
  },
  computed: {
    formData() {
      return this.item.config.formData || {};
    },
    sizeColor() {
      return {
        color: this.formData.color,
        backgroundColor: this.formData.bgColor,
      };
    },
  },
  watch:{
      "formData.textCon":function(n){
          const contentWidth=this.$refs.content.clientWidth;
        const textWidth=this.$refs.text.clientWidth;
        if(textWidth>contentWidth){
            this.isAnimation=true;
        }else{
            this.isAnimation=false
        }
        console.log(contentWidth,textWidth)
      }
  }
};
</script>
<style lang="less" scoped>
.my_notice {
  .my_notice_bar {
    display:flex;
    width: 100%;
    overflow: hidden;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    padding-left: 12px;
    .iconfont {
      // font-size: 4px;
    }
    .my_notice_content {
      flex: 1;
      align-items: center;
      overflow: hidden;
      .move_text{
           display: inline-block;
           white-space: nowrap;
      }
      .my_move{
          animation:test 10s;
          animation-delay:0.5s;
          animation-iteration-count:infinite;
          animation-timing-function:linear;
      }
      @keyframes test{
         from{ transform: translateX(0);}
         to{transform: translateX(-100%);}
      }
    //   @keyframes test{
    //      from{ transform: translateX(100%);}
    //      to{transform: translateX(0);}
    //   }
    }
  }
}
</style>
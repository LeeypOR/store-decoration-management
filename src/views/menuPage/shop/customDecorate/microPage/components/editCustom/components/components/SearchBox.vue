<template>
  <div class="search-box">
    <p class="search-input" :style="style">
      <span class="iconfont icon-app_icon_search borderLine"></span>
      <span>商品</span>
    </p>
  </div>
</template>
<script>
export default {
  name: 'MySearchBox',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    formData () {
      return this.item.config.formData || {}
    },
    style () {
      return {
        ...this.formData,
        height: this.formData.height + 'px',
        lineHeight: this.formData.height - 4 + 'px',
        width: this.formData.width + '%',
        color: this.formData.color,
        borderColor: this.formData.borderColor,
        backgroundColor: this.toRGBA(this.formData),
        borderRadius:  this.formData.borderRadius+'px',
        opacity: 1
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    toRGBA(formData){
      var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
      var sColor = formData.backgroundColor.toLowerCase();
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
        return "rgba(" + sColorChange.join(",") + ","+((formData.opacity/100).toFixed(2))+")";
      }else{
        return sColor;  
      }
    }
  }
}
</script>
<style lang="less" scoped>
.search-box {
  overflow: hidden;
  padding:5px 10px;
}
.search-input{
  border:1px solid;
  padding: 0 10px;
  >span{
    display: inline-block;
    vertical-align:middle;
  }
  .borderLine{
    margin-right:3px;
  }
}
</style>

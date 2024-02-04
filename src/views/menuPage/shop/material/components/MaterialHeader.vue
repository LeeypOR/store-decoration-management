<template>
  <div class="header">
    <a-button class="btn" :class="{active:navIndex==0}" @click="handleNavChange(0)"><i class="iconfont icon-picture"></i>图片</a-button>
    <a-button class="btn" :class="{active:navIndex==1}" @click="handleNavChange(1)"><i class="iconfont icon-video"></i>视频</a-button>
  </div>
</template>

<script>
export default {
  data(){
    return {
      navIndex:0,
    }
  },
  methods:{
    handleNavChange(index){
      this.navIndex=index;
      this.$emit('change',index);
    }
  }
}
</script>

<style lang="less" scoped>
.header{
  display: flex;
  background: #fff;
  padding:4px 0;
  .btn{
    display: flex;
    align-items: center;
    background:#F6F7F8;
    border-radius: 3px;
    .iconfont{
      margin-right:4px;
    }
    &:nth-child(2){
      margin-left:30px;
    }
    &.active{
      background:#016DFF;
      color:#fff;
    }
  }
}
</style>
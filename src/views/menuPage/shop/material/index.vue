<template>
  <div class="material">
      <MaterialHeader @change="handleNavChange"></MaterialHeader>
      <div class="main flex">
          <MaterialImgList :dirId="selectKey" v-if="this.navIndex==0" @change="handleChange"></MaterialImgList>
          <MaterialVideoList :dirId="selectKey" v-if="this.navIndex==1" @change="handleChange"></MaterialVideoList>
          <MaterialAside :type="navIndex+1" :timpstamp="timpstamp" @select="handleSelectAside"></MaterialAside>
      </div>
  </div>
</template>

<script>
import MaterialHeader from './components/MaterialHeader';
import MaterialAside from './components/MaterialAside';
import MaterialImgList from './components/MaterialImgList';
import MaterialVideoList from './components/MaterialVideoList';

export default {
    components:{
        MaterialHeader,
        MaterialAside,
        MaterialImgList,
        MaterialVideoList,
    },
    data(){
        return {
            navIndex:0,
            selectKey:'',
            timpstamp:new Date().getTime(),
        }
    },
    methods:{
        handleNavChange(index){
            this.navIndex=index;
            this.selectKey='';
        },
        handleSelectAside(selectKey){
            this.selectKey=selectKey;
            console.log('this.selectKey',this.selectKey)
        },
        handleChange(timpstamp){
            this.timpstamp=timpstamp;
        }
    }
}
</script>

<style lang="less" scoped>
.main{
    width:calc(100% + 32px);
    min-height: 680px;
    flex:1;
    position: relative;
    left:-16px;
    bottom: -16px;
    border-top:16px solid #F6F7F8;
    .img_list,
    .video_list{
        flex:1;
    }
    aside{
        width:300px;
        border-left:16px solid #F6F7F8;
    }
}
.flex{
    display: flex;
}
</style>
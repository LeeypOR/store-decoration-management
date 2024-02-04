<template>
  <!--获取视频信息-->
  <div class="box">
    <video :src="videoUrl" v-if="videoUrl" ref="video" preload="meta" class="video"></video>
  </div>
</template>

<script>
export default {
    props:{
        url:{
            type:String,
            default:'',
        }
    },
    data(){
        return {
            videoUrl:'',
        }
    },
    watch:{
        url:{
            handler(newVal){
                this.videoUrl=newVal;
                this.addEvent();
            },
            immediate:true,
        }
    },
    created(){

    },
    mounted(){
       
    },
    methods:{
        addEvent(){
            this.$nextTick(()=>{
                if(this.$refs.video){
                    this.$refs.video.removeEventListener('loadedmetadata',this.$nextTickhandleLoadedMetadata,false);
                    this.$refs.video.addEventListener('loadedmetadata',this.handleLoadedMetadata,false);
                    this.$refs.video.addEventListener('loadeddata',(e)=>{
                        console.log('loadeddata',e);
                    });
                }
            })
        },
        handleLoadedMetadata(e){
            let videoElement=e.target;
            let ext=videoElement.src.substr(videoElement.src.lastIndexOf('.')+1);
            let data={
                duration:parseInt(videoElement.duration),
                width:videoElement.videoWidth,
                height:videoElement.videoHeight,
                ext,
                url:videoElement.src,
            };
            console.log('video',data,videoElement);
            this.$emit('load',data)
        }
    }
}
</script>

<style lang="less" scoped>
.box{
    position: fixed;
    left:0;
    bottom:0;
    width:0;
    height:0;
    overflow: hidden;
    .video{
        position: absolute;
        left:0;
        top:0;
    }
}
</style>
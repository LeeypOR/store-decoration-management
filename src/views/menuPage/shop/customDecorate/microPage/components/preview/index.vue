<template>
  <a-modal
    :visible="visible"
    :footer="false"
    :closable="false"
    :maskClosable="true"
    @cancel="handleCancel"
    >
        <div class="qrcode">
            <img :src="imgPath"/>
        </div>
    </a-modal>
</template>

<script>
export default {
    props:{
        visible:{
            type:Boolean,
            default:false,
        },
        id:{
            type:String,
            default:'',
        }
    },
    watch:{
        visible(newVal){
            if(newVal){
                this.getImagePath(this.id);
            }
        }
    },
    data(){
        return {
            imgPath:'',
        }
    },
    methods:{
        async getImagePath(id){
            let res = await this.$get('goldenhome/decoration/admin_/page/ms/ma',{
                id,
                page:'pages/home/miniPage',
            });
            if(res && res.returnCode==1000){
                this.imgPath=res.dataInfo || '';
            }
        },
        handleCancel(){
            this.$emit('cancel');
        }
    }
}
</script>

<style lang="less" scoped>
/deep/ .ant-modal{
    width:340px!important;
}
/deep/ .ant-modal-body{
    min-height: auto;
}
.qrcode{
    width:300px;
    height:300px;
    display:flex;
    justify-content: center;
    align-items: center;
    img{
        display: block;
        width:250px;
        height:250px;
    }
}
</style>
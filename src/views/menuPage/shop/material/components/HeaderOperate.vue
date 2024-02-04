<template>
    <a-space>
        <a-checkbox :indeterminate="indeterminate" v-model="isAllSelected" @change="handleAllSelected">全选</a-checkbox>
        <a-divider type="vertical" v-if="isShowDivider && isShowSelectCount"/>
        <div v-if="isShowSelectCount">已选{{selectCount}}项</div>
        <a-divider type="vertical" v-if="isShowDivider && !isHideGroupBtn"/>
        <a-button @click="handleEditGroup" :disabled="!isAllSelected && !indeterminate" v-if="!isHideGroupBtn">修改分组</a-button>
        <a-divider type="vertical" v-if="isShowDivider & !isHideDelBtn"/>
        <a-button @click="handleBatchDelete" :disabled="!isAllSelected && !indeterminate" v-if="!isHideDelBtn">批量删除</a-button>
    </a-space>
</template>

<script>

export default {
    components:{
        
    },
    props:{
        //选择状态 0=>未选择，1=>全选，2=>半选
        selectStatus:{
            type:Number,
            default:0
        },
        selectCount:{
            type:Number,
            default:0
        },
        isShowSelectCount:{
            type:Boolean,
            default:false,
        },
        isShowDivider:{
            type:Boolean,
            default:false,
        },
        isHideDelBtn:{
            type:Boolean,
            default:false,
        },
        isHideGroupBtn:{
            type:Boolean,
            default:false,
        }
    },
    data(){
        return {
            indeterminate:false,
            isAllSelected:false,
        }
    },
    watch:{
        selectStatus:{
            handler(newVal){
                if(newVal==0){
                    this.isAllSelected=false;
                    this.indeterminate=false;
                }
                else if(newVal==1){
                    this.isAllSelected=true;
                    this.indeterminate=false;
                }
                else {
                    this.isAllSelected=false;
                    this.indeterminate=true;
                }
            },
            immediate:true,
        }
    },
    methods:{
        handleEditGroup(){
            this.$emit('editGroup');
        },
        handleAllSelected(){
            this.$emit('allSelected',this.isAllSelected);
        },
        handleBatchDelete(){
            this.$emit('batchDelete');
        }
    }
}
</script>

<style lang="less" scoped>

</style>
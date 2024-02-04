<!--引入商品库-->
<template>
    <a-modal 
        :visible="visible"
        okText="确定" 
        cancelText="取消"
        :title="title"
        :maskClosable="false"
        :destroyOnClose="true"
        :keyboard="false"
        :closable="false"
        width="1350px"
        @cancel="closeModal()" 
        @ok="handleSubmit">
        <div class="flex">
            <div class="left">
                <a-tree
                    class="tree"
                    :checkStrictly="true"
                    :blockNode="true"
                    :tree-data="treeData"
                    :replace-fields="replaceFields"
                    :default-expand-all="true"
                    :default-selected-keys="[dirId]"
                    @select="handleTreeSelect"
                />
            </div>
            <div class="right">
                <MaterialImgList :dirId="dirId" :limit="15" :selectedFileUrls="selectedUrls" :isListView="true" @selectedUrls="handleselectedUrls" @change="handleChange" @updateGroup="handleUpdateGroup"></MaterialImgList>
            </div>
        </div>
    </a-modal>
</template>

<script>
import MaterialImgList from '@views/menuPage/shop/material/components/MaterialImgList';

export default {
    components:{
        MaterialImgList
    },
    props: {
        visible:{
            type:Boolean,
            default:false,
        },
        selectedFileUrls:{
            type:Array,
            default(){
                return [];
            }
        }
    },
    watch:{
        selectedFileUrls:{
            handler(fileUrls){
                this.selectedUrls=fileUrls;
            },
            immediate:true,
            deep:true,
        }
    },
    data(){
        return {
            title:'选择图片',//
            replaceFields: {
                children: "children",
                title: "directoryNameAndCount",
                key: "id",
            },
            treeData: [],
            dirId:'',
            selectedUrls:[],
        };
    },
    created(){
        this.getImgTree();
    },
    methods:{
        handleselectedUrls(selectedUrls){
            console.log(selectedUrls);
            this.selectedUrls=selectedUrls;
        },
        handleTreeSelect(selectedKeys){
            console.log(selectedKeys);
            this.dirId=selectedKeys[0];
        },
        async getImgTree() {
            let res = await this.$get(
                "goldenhome/decoration/admin_/file/directory/image/tree"
            );
            console.log(res);
            if (res && res.returnCode == "1000") {
                let treeData=this.deepJoinTreeFileCount(res.dataInfo || []);
                let allCount=this.getAllTreeFileCount(res.dataInfo || []);
                console.log('allCount',allCount);
                console.log('treeData',treeData);
                this.treeData = [];
                this.treeData.push({
                    directoryNameAndCount: `全部图片（${allCount}）`,
                    id: '',
                    children: treeData,
                });
            }
        },
        deepJoinTreeFileCount(data=[]){
            data.forEach(item=>{
                item.directoryNameAndCount=`${item.directoryName}（${item.fileNum}）`
                if(item.children.length>0){
                    this.deepJoinTreeFileCount(item.children);
                }
            });
            return data;
        },
        getAllTreeFileCount(data,obj={count:0}){
            data.forEach(item=>{
                obj.count+=parseInt(item.fileNum);
                console.log(item.directoryName,item.fileNum,obj.count);
                if(item.children && item.children.length>0){
                    this.getAllTreeFileCount(item.children,obj);
                }
            });
            return obj.count;
        },
        handleSubmit () {
            if(this.selectedUrls.length==0){
                this.$message.error('请选择商品图片');
                return;
            }
            console.log(this.selectedUrls)
            this.$emit('submit',this.selectedUrls);
        },        
        closeModal (freshTable) {
            this.$emit('cancel', freshTable)
        },
        handleChange(){
            this.getImgTree();
        },
        handleUpdateGroup(){
            this.getImgTree();
        }
    }
}
</script>

<style lang="less" scoped>
header{
  border-radius: 4px;
  background-color: #f5f5f5;
  padding: 24px 32px;
  margin-bottom:15px;
}
.search{
    .ant-input-search{
        width:300px;
    }
}
.flex{
    display:flex;
}
.left{
    width:225px;
    .ant-tree{
        margin-top: 14px;
    }
    .ant-select{
        width:100%;
    }
    .ant-list{
        margin-top:10px;
        .ant-list-item{
            cursor: pointer;
            &.active{
                color:#40a9ff;
            }
        }
    }
}
.right{
    flex:1;
    margin-left:20px;
    .ant-table-wrapper{
        margin-top:10px;
    }
}
</style>
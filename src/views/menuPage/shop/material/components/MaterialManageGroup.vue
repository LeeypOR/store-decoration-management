<template>
  <a-modal 
    :visible="visible"
    okText="确定" 
    cancelText="取消"
    title="管理分组"
    :maskClosable="false"
    :destroyOnClose="true"
    :keyboard="false"
    :footer="false"
    width="800px"
    @cancel="closeModal()" 
    @ok="handleSubmit">
    <!-- <div class="">全选分组</div> -->
    <a-breadcrumb>
        <a-breadcrumb-item v-for="(item,index) in navList" :key="index">
            <!-- <template v-if="!item.treePath">{{item.label}}</template> -->
            <a href="javascript:;"  @click="handleEnter(item)">{{item.label}}</a>
        </a-breadcrumb-item>
    </a-breadcrumb>
    <div class="top15">
        <HeaderOperate 
            :selectCount="selectCount"
            :isShowSelectCount="true"
            :isShowDivider="true"
            :isHideDelBtn="true"
            :selectStatus="selectStatus" 
            @allSelected="handleAllSelected"
            @batchDelete="handleBatchDelete"
            @editGroup="handleEditGroup"></HeaderOperate>
    </div>
    <a-table class="top15" 
        :pagination="false"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: handleSelectChange }"
        :columns="columns" 
        :data-source="tableData"
        rowKey="id">
        <template slot="directoryName" slot-scope="text,row">
            <a href="javascript:;" @click="handleEnter(row)" class="dir_dame"><i class="folder iconfont icon-icon_tk_fenzu"></i>{{text}}</a>
        </template>
      </a-table>
    <MaterialGroup :visible="groupShow" :isDirectory="true" :isEdit="true" :ids="selectedRowKeys" :isVideo="isVideo" @cancel="handleCancelGroup" @submit="handleUpdateGroup"></MaterialGroup>
  </a-modal>
</template>

<script>
import deepCopy from '@/utils/deepCopy';
import HeaderOperate from './HeaderOperate';
import MaterialGroup from './MaterialGroup';

export default {
    components:{
        HeaderOperate,
        MaterialGroup
    },
    props:{
        visible:{
            type:Boolean,
            default:false,
        },
        isVideo:{
            type:Boolean,
            default:false,
        }
    },
    data(){
        return { 
            groupShow:false,
            selectStatus:0,
            selectCount:0,
            selectedRowKeys:[],
            columns:[
                {
                    title:'分组名称',
                    dataIndex:'directoryName',
                    scopedSlots: { customRender: 'directoryName' }
                }
            ],
            tableData:[],
            allTableData:[],
            navList:[],
        }
    },
    watch:{
        visible(newVal){
            this.initData();
            this.allTableData=[];
            this.tableData=[];
            this.navList=[];
            if(newVal){
                if(this.isVideo){
                    this.getVideoTreeData(()=>{
                        this.setCurrentLeaveData();
                    });  
                }    
                else {
                    this.getImgTreeData(()=>{
                        this.setCurrentLeaveData();
                    });  
                }          
            }
        },
        selectedRowKeys:{
            handler(newArr){
                this.selectCount=newArr.length;
            },
            immediate:true,
            deep:true
        },
    },
    methods:{
        handleEnter(item){
            console.log(item)
            this.setCurrentLeaveData(item.treePath?item.treePath:'');
        },
        initData(){
            this.selectStatus=0;
            this.selectCount=0;
            this.selectedRowKeys=[];
        },
        async getImgTreeData(callback=()=>{}){
            let url='goldenhome/decoration/admin_/file/directory/image/tree';
            let res = await this.$get(url);
            console.log(res);
            this.initData();
            if(res && res.returnCode=='1000'){
                this.allTableData=res.dataInfo || [];
                this.tableData=[];
                callback(this.allTableData);
            }
        },
        async getVideoTreeData(callback=()=>{}){
            let url='goldenhome/decoration/admin_/file/directory/video/tree';
            let res = await this.$get(url);
            console.log(res);
            this.initData();
            if(res && res.returnCode=='1000'){
                this.tableData=[];
                this.allTableData=res.dataInfo || [];
                callback(this.allTableData);
            }
        },
        setCurrentLeaveDataDeep(tableData,treePathArr,index=0,navList=[],isAutoUpdateNav=true){
            tableData.forEach(item=>{
                //console.log('treePathArr.length-1>index && item.parentId==treePathArr[index] && treePathArr[index+1]==item.id && item.children && item.children.length>0',treePathArr.length-1>index && item.parentId==treePathArr[index] && treePathArr[index+1]==item.id && item.children && item.children.length>0)
                //console.log('treePathArr.length-1>index && item.parentId==treePathArr[index] && treePathArr[index+1]==item.id && item.children && item.children.length>0',treePathArr.length-1,index, item.parentId,treePathArr[index] , treePathArr[index+1],item.id , item.children, item.children.length)
                if(treePathArr.length-1>index && item.parentId==treePathArr[index] && treePathArr[index+1]==item.id && item.children && item.children.length>0){
                    console.log('treePathArr,navList,index',treePathArr,navList,index,item)
                    if(index>=treePathArr.length-2){                        
                        if(item.children){
                            item.children.forEach(item2=>{
                                if(item2.children){
                                    delete item2.children;
                                }
                            })   
                        }  
                        if(isAutoUpdateNav){
                            navList.push({
                                label:item.directoryName,
                                value:item.id,
                                treePath:item.treePath,
                                parentIds:item.parentIds
                            });
                            this.navList=navList || []; 
                        }
                        this.tableData=item.children || [];
                    }
                    else {
                        if(isAutoUpdateNav){
                            navList.push({
                                label:item.directoryName,
                                value:item.id,
                                treePath:item.treePath,
                                parentIds:item.parentIds
                            });
                        }
                        index++;
                        this.setCurrentLeaveDataDeep(item.children,treePathArr,index,navList,isAutoUpdateNav)
                    }
                }
            });
        },
        setCurrentLeaveData(treePath='',isAutoUpdateNav=true){
            let treePathArr=[];
            if(treePath && treePath.length>0){
                treePathArr=treePath.split(',');
            }
            console.log('treePathArr',treePathArr)
            if(isAutoUpdateNav){
                this.navList=[{
                    label:'全部分组'
                }]
            }
            let allTableData=deepCopy(this.allTableData);
            if(treePathArr.length==0){
                this.tableData=allTableData.map(item=>{
                    if(item.children){
                        delete item.children;
                    }
                    return item;
                });
            }
            else {
                //this.tableData=[];
                this.setCurrentLeaveDataDeep(allTableData,treePathArr,0,this.navList,isAutoUpdateNav);
            }
            console.log('this.tableData,this.allTableData,allTableData',this.tableData,this.allTableData, allTableData);
            console.log('this.navList',this.navList)
        },
        handleAllSelected(isAllSelected){
            console.log('isAllSelected',isAllSelected);
            console.log(isAllSelected)
            if(isAllSelected){
                this.selectStatus=1;
                this.selectedRowKeys=[];
                this.tableData.forEach(item=>{
                    item.selectStatus=true;
                    if(item.selectStatus){
                        this.selectedRowKeys.push(item.id);
                    }
                })
            }
            else {
                this.cancelAllSelected();
            }
        },
        cancelAllSelected(){
            this.selectedRowKeys=[];
        },
        handleBatchDelete(data){
            console.log('删除',data)
        },
        handleEditGroup(data){
            console.log('编辑分组',data)
            this.groupShow=true;
        },
        handleSelectChange(selectedRowKeys) {
            console.log('selectedRowKeys changed: ', selectedRowKeys);
            this.selectedRowKeys = selectedRowKeys;
            if(this.selectedRowKeys.length==this.tableData.length){
                this.selectStatus=1;
            }
            else if(this.selectedRowKeys.length==0){
                this.selectStatus=0;
            }
            else {
                this.selectStatus=2;
            }
        },
        handleUpdateGroup(){
            this.groupShow=false;
            this.initData();
            let treePath=this.navList[this.navList.length-1].treePath || '';
            console.log('treePath',treePath)
            if(this.isVideo){
                this.getVideoTreeData(()=>{
                    this.setCurrentLeaveData(treePath,false);
                });  
            }
            else {
                this.getImgTreeData(()=>{
                    this.setCurrentLeaveData(treePath,false);
                }); 
            }           
        },
        handleCancelGroup(){
            //this.handleUpdateGroup();
            this.groupShow=false;
        },
        closeModal (freshTable) {
            this.$emit('cancel', freshTable)
        },
        handleSubmit(){

        },
    }
}
</script>

<style lang="less" scoped>
.top15{
    margin-top:15px;
}
.dir_dame{
    display: flex;
    flex-direction: row;
    align-items: center;
    .folder{
        color:#FB9524;
        margin-right:6px;
        font-size: 22px;
    }
}
</style>
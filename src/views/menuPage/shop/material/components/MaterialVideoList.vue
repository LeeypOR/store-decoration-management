<template>
   <div class="video_list">
      <a-button @click="uploadShow=true">上传视频</a-button>
      <a-row class="top15" v-if="!isListView">
        <HeaderOperate :selectStatus="selectStatus" 
          @allSelected="handleAllSelected"
          @batchDelete="handleBatchDelete"
          @editGroup="handleEditGroup"></HeaderOperate>
      </a-row>
      <a-table class="top15" :class="{'top15':!isListView}"
        :pagination="pagination"
        @change="handlePagination"
        :row-selection="{ selectedRowKeys: selectedRowKeys, type:checkboxRadio, onChange: handleSelectChange }"
        :columns="columns" 
        :data-source="tableData"
        :locale="tableLocale" rowKey="id">
        <template slot="action" slot-scope="text, record, index">
          <a-space class="action">
            <a href="javascript:;" @click="handleEdit(record)">编辑</a>
            <a-divider></a-divider>
            <a href="javascript:;" @click="handleDelete([record.id])">删除</a>
          </a-space>
        </template>
      </a-table>
      <MaterialGroup :visible="showGroup" :ids="selectedRowKeys" :isVideo="true" :isEdit="true" @cancel="showGroup=false" @submit="handleUpdateGroup"></MaterialGroup>
      <MaterialUploadVideo :videoInfo="videoInfo" :visible="uploadShow" @cancel="handleUploadVideoCancel" @submit="handleUploadVideoSubmit"></MaterialUploadVideo>
  </div>
</template>

<script>
import MaterialGroup from './MaterialGroup';
import HeaderOperate from './HeaderOperate';
import MaterialUploadVideo from './MaterialUploadVideo';

export default {
  components:{
    MaterialGroup,
    HeaderOperate,
    MaterialUploadVideo
  },
  props:{
    dirId:{
        type:String,
        default:'',
    },
    selectedUrl:{
      type:String,
      default:'',
    },
    isListView:{
      type:Boolean,
      default:false,
    },
  },
  data(){
    return {
      showGroup:false,
      uploadShow:false,
      selectStatus:0,
      selectedRowKeys:[],
      pagination:{
        showQuickJumper: true,
        total: 0,
        current: 1,
        pageSize: 10,
        showTotal: (total) => `共${ total }条`,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50', '100', '200']
      },
      defaultPageSize:10,
      tableLocale:{
        emptyText:'暂无数据显示，可点击左上角“上传视频”按钮添加',
      },
      checkboxRadio:'checkbox',
      columns:[
        {
          title:'视频名称',
          dataIndex:'fileName'
        },{
          title:'大小',
          dataIndex:'fileSize',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.fileSize - b.fileSize,
          customRender: (text, row) => {
            console.log('text', text)
            return this.formatSize(text);
          }
        },{
          title:'上传时间',
          dataIndex:'createDate',          
          defaultSortOrder: 'descend',
          sorter: (a, b) => new Date(a.createDate) - new Date(b.createDate),
        // },{
        //   title:'播放次数',
        //   dataIndex:'d',
        },{
          title:'操作',
          key: 'action',
          scopedSlots: { customRender: 'action' },
        }
      ],
      tableData:[],
      videoInfo:{},
    }
  },
  watch:{
    dirId:{
      handler(newVal){
        this.pagination.current=1;
        this.getListData();
      }
    },
  },
  created(){
    if(this.isListView){
      delete this.columns[3];
      this.checkboxRadio='radio';
    }
    this.getListData();
  },
  methods:{
    handlePagination(pagination){
      if(pagination){
        this.pagination.current=pagination.current;
        this.pagination.pageSize=pagination.pageSize;
        this.getListData();
      }
    },
    formatSize(size){
      if(size>1024*1024*1024){
        return parseFloat((size/(1024*1024*1024)).toFixed(2))+'GB';
      }
      else if(size>1024*1024){
        return parseFloat((size/(1024*1024)).toFixed(2))+'MB';
      }
      else if(size>1024){
        return parseFloat((size/1024).toFixed(2))+'KB';
      }
      return size+'B';
    },
    async getListData(){
      let params={
        current:this.pagination.current,
        size:this.pagination.pageSize
      };
      if(this.dirId!==''){
        params['fileDirectoryId']=this.dirId;
      }
      let res=await this.$get('goldenhome/decoration/admin_/file/video/page',params);
      if(res && res.returnCode=='1000'){
        console.log('this.tableData',res.dataInfo.records)
        this.tableData = res.dataInfo.records || [];
        this.pagination.current = res.dataInfo.current || 1;
        this.pagination.pageSize = res.dataInfo.size || this.defaultPageSize;
        this.pagination.total = res.dataInfo.total || 0;

        this.tableData.forEach(item=>{
          if(item.fileUrl==this.selectedUrl){
            this.selectedRowKeys=[item.id];
          }
        })
      }
      else {
        this.pagination.current=1;
        this.pagination.pageSize=this.defaultPageSize;
        this.pagination.total=0;
      }
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

      let url='';
      this.tableData.forEach(item=>{
        if(selectedRowKeys && selectedRowKeys.length>0 && item.id==selectedRowKeys[0]){
          url=item.fileUrl;
        }
      });
      this.$emit('selectedUrl',url);
    },
    handleAllSelected(isAllSelected){
      console.log(isAllSelected)
      if(isAllSelected){
        this.selectStatus=1;
        this.selectedRowKeys=this.tableData.map(row=>{
          return row.id;
        });
      }
      else {
        this.cancelAllSelected();
      }
    },
    cancelAllSelected(){
      this.selectStatus=0;
      this.selectedRowKeys=[];
    },
    handleEditGroup(){
      this.showGroup=true;
    },
    handleUpdateGroup(){
      this.getListData();
      this.cancelAllSelected();
      this.showGroup=false;
    },
    handleBatchDelete(){
      this.handleDelete(this.selectedRowKeys);
    },
    handleDelete(ids=[]){
      this.$confirm({
        title: '您确定要删除视频？',
        content: h => <p>删除视频不会对已使用该视频的业务造成影响。</p>,
        onOk:() => {
          console.log('OK');
          this.$post('goldenhome/decoration/admin_/file/delete',ids).then(res=>{
            if(res && res.returnCode=='1000'){
              this.getListData();
              this.cancelAllSelected();
              this.$emit('change',new Date().getTime());
              this.$message.success('文件删除成功');
            }
            else {
              this.$message.error('文件删除失败');
            }
          });
        },
        onCancel:() => {
          console.log('Cancel');
        },
        class: 'test',
      });
    },
    handleEdit(record){
      this.videoInfo=record;
      this.uploadShow=true;
    },
    handleUploadVideoCancel(){
      this.videoInfo={};
      this.uploadShow=false;
    },
    handleUploadVideoSubmit(formData){;
      console.log(formData);
      this.uploadShow=false;
      this.videoInfo={};
      this.getListData();
      this.cancelAllSelected();
      this.$emit('change',new Date().getTime());
    }
  }
}
</script>

<style lang="less" scoped>
.video_list{
  padding:20px 16px;
  .top15{
    margin-top:15px;
  }
  /deep/ .ant-table-placeholder{
    height: 300px;
    line-height: 200px;
  }
  /deep/ .action{
    a{
      white-space: nowrap;
    }
  }
}
.top0{
  margin-top:0;
  padding-top:0;
}
</style>
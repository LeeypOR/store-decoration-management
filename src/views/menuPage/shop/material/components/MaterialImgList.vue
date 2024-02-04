<template>
  <div class="img_list">
    <a-button @click="uploadShow = true">上传图片</a-button>
    <a-row class="top15">
      <HeaderOperate
        :isHideGroupBtn="isListView"
        :selectStatus="selectStatus"
        @allSelected="handleAllSelected"
        @batchDelete="handleBatchDelete"
        @editGroup="handleEditGroup"
      ></HeaderOperate>
    </a-row>
    <div class="list">
      <div class="list_item" v-for="(item, index) in listData" :key="index">
        <a-card hoverable>
          <img slot="cover" alt="example" :src="item.fileUrl" />
          <a-checkbox
            :disabled="item.disabled || false"
            v-model="item.selectStatus"
            @change="handleSelectedChange"
          >
            <a-card-meta
              :title="item.fileName"
              :description="joinDesc(item)"
            ></a-card-meta>
          </a-checkbox>

          <template slot="actions" class="ant-card-actions" v-if="!isListView">
            <a href="javascript:;" @click="handleEdit(item)">编辑</a>
            <a href="javascript:;" @click="handleDownload(item)">下载</a>
            <a-popover placement="bottom" trigger="click">
              <template slot="content">
                <a-input
                  style="width: 360px; border-radius: 4px 0 0 4px"
                  readonly
                  v-model="item.fileUrl"
                  :id="'copyUrl' + index"
                />
                <a-button
                  style="border-radius: 0 4px 4px 0"
                  class="copyBtn"
                  type="primary"
                  :data-clipboard-target="'#copyUrl' + index"
                  >复制</a-button
                >
              </template>
              <a href="javascript:;">链接</a>
            </a-popover>
            <a href="javascript:;" @click="handleDelete([item.id])">删除</a>
          </template>
        </a-card>
      </div>
    </div>
    <div class="empty" v-if="pagination.total == 0">
      暂无数据显示，可点击左上角“上传图片”按钮添加
    </div>
    <div class="right" v-if="pagination.total > 0">
      <MaterialPagination
        :current="pagination.current"
        :size="pagination.size"
        :total="pagination.total"
        @change="handlePaginationChange"
        @showSizeChange="handleShowSizeChange"
      ></MaterialPagination>
    </div>
    <MaterialImgEdit
      :visible="editShow"
      :record="currentDataItem"
      @cancel="handleCancelEdit"
      @submit="handleUpdate"
    ></MaterialImgEdit>
    <MaterialGroup
      :visible="showGroup"
      :ids="selectedKeys"
      :isVideo="false"
      :isEdit="true"
      @cancel="showGroup = false"
      @submit="handleUpdateGroup"
    ></MaterialGroup>
    <MaterialUploadImage
      :visible="uploadShow"
      @cancel="uploadShow = false"
      @submit="handleUploadImage"
    ></MaterialUploadImage>
  </div>
</template>

<script>
import HeaderOperate from "./HeaderOperate";
import MaterialPagination from "./MaterialPagination";
import MaterialUploadImage from "./MaterialUploadImage";
import MaterialGroup from "./MaterialGroup";
import MaterialImgEdit from "./MaterialImgEdit";
import ClipboardJS from "clipboard";

export default {
  components: {
    HeaderOperate,
    MaterialPagination,
    MaterialUploadImage,
    MaterialGroup,
    MaterialImgEdit,
  },
  props: {
    dirId: {
      type: String,
      default: "",
    },
    isListView:{
      type:Boolean,
      default:false,
    },
    selectedFileUrls:{
      type:Array,
      default(){
        return [];
      }
    },
    limit:{
      type:Number,
      default:0,
    }
  },
  watch: {
    dirId: {
      handler(newVal) {
        this.pagination.current = 1;
        this.getImgList();
      },
    },
  },
  data() {
    return {
      uploadShow: false,
      editShow: false,
      showGroup: false,
      listData: [],
      selectedKeys: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
      },
      defaultPageSize: 10,
      selectStatus: 0,
      currentDataItem: {},
    };
  },
  created() {
    this.getImgList();
  },
  destroyed(){
    this.$nextTick(()=>{
      let oLayout=document.getElementById('components-layout');
      console.log(oLayout);
      oLayout.style.minWidth="1366px";
    });   
  },
  mounted() {
    this.$nextTick(() => {
      new ClipboardJS(".copyBtn");

      let oLayout=document.getElementById('components-layout');
      console.log(oLayout);
      oLayout.style.minWidth="1639px";
    });
  },
  methods: {
    formatSize(size) {
      if (size > 1024 * 1024 * 1024) {
        return parseFloat((size / (1024 * 1024 * 1024)).toFixed(2)) + "GB";
      } else if (size > 1024 * 1024) {
        return parseFloat((size / (1024 * 1024)).toFixed(2)) + "MB";
      } else if (size > 1024) {
        return parseFloat((size / 1024).toFixed(2)) + "KB";
      }
      return size + "B";
    },
    joinDesc(record) {
      let size = this.formatSize(record.fileSize);
      let date = record.createDate.split(" ")[0];
      return `${size} ${date} 上传`;
    },
    handlePaginationChange(current, size) {
      this.pagination.current = current;
      this.pagination.pageSize = size;
      console.log('this.pagination',this.pagination);
      this.selectedKeys=[];
      this.selectStatus=0;
      this.getImgList();      
    },
    handleShowSizeChange(current,size){
      this.pagination.current=current;
      this.pagination.pageSize=size;
      console.log('this.pagination',this.pagination);      
      this.selectedKeys=[];
      this.selectStatus=0;
      this.getImgList();
    },
    //复制
    handleCopy(item) {
      this.dataProcessing(item.fileUrl);
      this.$copyText(this.message).then(
        function (e) {
          alert("Copied");
          console.log(e);
        },
        function (e) {
          alert("Can not copy");
          console.log(e);
        }
      );
    },
    downloadIamge(imgsrc, name) {
      //下载图片地址和图片名
      let image = new Image();
      // 解决跨域 Canvas 污染问题
      image.setAttribute("crossOrigin", "anonymous");
      image.onload = function () {
        let canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        let context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
        let a = document.createElement("a"); // 生成一个a元素
        let event = new MouseEvent("click"); // 创建一个单击事件
        a.download = name || "photo"; // 设置图片名称
        a.href = url; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
      };
      image.src = imgsrc;
    },
    //下载
    handleDownload(item) {
      this.downloadIamge(item.fileUrl, item.fileName);
    },
    async getImgList() {
      console.log("this.dirId", this.dirId);
      let params = {
        current: this.pagination.current,
        size: this.pagination.pageSize,
      };
      if (this.dirId !== "" && this.dirId !== "0") {
        params["fileDirectoryId"] = this.dirId;
      }
      let res = await this.$get(
        "goldenhome/decoration/admin_/file/image/page",
        params
      );
      if (res && res.returnCode == "1000") {
        let dataInfo = res.dataInfo || {};
        dataInfo.records.forEach((item) => {
          item.selectStatus = false;
        });
        this.listData = dataInfo.records || [];
        this.pagination.current = dataInfo.current;
        this.pagination.pageSize = dataInfo.size || this.defaultPageSize;
        this.pagination.total = dataInfo.total;

        this.listData.forEach(item=>{
          if(this.selectedFileUrls.includes(item.fileUrl)){
            item.selectStatus=true;
          }
        });

        if(this.isListView){
          this.checkedAllStatus();
          this.handleSelectedChange();

          if(this.limit){
            if(this.selectedFileUrls.length>=this.limit){
              this.listData.forEach(item=>{
                if(!this.selectedFileUrls.includes(item.fileUrl)){
                  item.disabled=true;
                }
              })
            }
            else {
              this.listData.forEach(item=>{
                item.disabled=false;
              })
            }
          }
        }
      } else {
        this.pagination.current = 1;
        this.pagination.pageSize = dataInfo.size || this.defaultPageSize;
        this.pagination.total = 0;
      }
    },
    //选择全选状态
    checkedAllStatus(){
      //获取选中
      let allSelected=this.getCurrentSelectedUrls();
      let count=0;
      this.listData.forEach(item=>{
        allSelected.forEach(item2=>{
          if(item.fileUrl==item2){
            count++;
          }
        })
      })
      if (count == this.listData.length) {
        this.selectStatus = 1;
      } else if (count == 0) {
        this.selectStatus = 0;
      } else {
        this.selectStatus = 2;
      }
    },
    handleSelectedChange() {
      this.selectedKeys = [];
      this.listData.forEach((item) => {
        if (item.selectStatus) {
          this.selectedKeys.push(item.id);
        }
      });
      if (this.selectedKeys.length == this.listData.length) {
        this.selectStatus = 1;
      } else if (this.selectedKeys.length == 0) {
        this.selectStatus = 0;
      } else {
        this.selectStatus = 2;
      }
      if(this.isListView){
        this.paginationSelectedUrls();
      }
    },
    arrDiff(arr1,arr2){
      return arr1.filter(function(i) {return arr2.indexOf(i) < 0;});
    },
    handleAllSelected(isAllSelected) {
      console.log(isAllSelected);
      if (isAllSelected) {
        this.selectStatus = 1;
        this.selectedKeys = [];
        this.listData.forEach((item) => {
          if(this.isListView){
            if(this.limit>this.getCurrentSelectedUrls().length){
              item.selectStatus = true;
              if (item.selectStatus) {
                this.selectedKeys.push(item.id);
              }
            }
          }
          else {
            item.selectStatus = true;
            if (item.selectStatus) {
              this.selectedKeys.push(item.id);
            }
          }
        });
      } else {
        this.cancelAllSelected();
      }
      if(this.isListView){
        this.paginationSelectedUrls();      
      }
    },
    getCurrentSelectedUrls(){
      //所有、当前选中的url
      let allUrls=[];
      let selectedUrls=[];
      this.listData.forEach(item=>{
        allUrls.push(item.fileUrl);
        if (item.selectStatus) {
          selectedUrls.push(item.fileUrl);          
        }
      })
      //当前页未选择的
      let diff1=this.arrDiff(allUrls,selectedUrls);
      console.log('diff1',diff1);
      //去除未选择的
      let tmpData=[];
      this.selectedFileUrls.forEach(item=>{
        if(!diff1.includes(item)){
          console.log('item',item);
          tmpData.push(item);
        }
      });
      console.log(tmpData);
      tmpData=Array.from(new Set([...tmpData,...selectedUrls].filter(item=>item)));
      console.log( '最终 selectedUrls', tmpData)
      return tmpData;
    },
    paginationSelectedUrls(){
      //所有、当前选中的url
      let allUrls=[];
      let selectedUrls=[];
      this.listData.forEach(item=>{
        allUrls.push(item.fileUrl);
        if (item.selectStatus) {
          selectedUrls.push(item.fileUrl);          
        }
      })
      //当前页未选择的
      let diff1=this.arrDiff(allUrls,selectedUrls);
      console.log('diff1',diff1);
      //去除未选择的
      let tmpData=[];
      this.selectedFileUrls.forEach(item=>{
        if(!diff1.includes(item)){
          console.log('item',item);
          tmpData.push(item);
        }
      });
      console.log(tmpData);
      tmpData=Array.from(new Set([...tmpData,...selectedUrls].filter(item=>item)));
      console.log( '最终 selectedUrls', tmpData)
      if(this.limit){
        if(tmpData.length>=this.limit){
          this.listData.forEach(item=>{
            if(!tmpData.includes(item.fileUrl)){
              item.disabled=true;
            }
          })
        }
        else {
          this.listData.forEach(item=>{
            item.disabled=false;
          })
        }
      }
      this.$emit('selectedUrls',tmpData);
    },
    cancelAllSelected() {
      this.selectStatus = 0;
      this.selectedKeys = [];
      this.listData.forEach((item) => {
        item.selectStatus = false;
      });
    },
    handleBatchDelete() {
      this.handleDelete(this.selectedKeys);
    },
    handleDelete(ids = []) {
      this.$confirm({
        title: "您确定要删除图片？",
        content: (h) => <p>删除图片不会对已使用图片的业务造成影响。</p>,
        onOk: () => {
          console.log("OK");
          this.$post("goldenhome/decoration/admin_/file/delete", ids).then(
            (res) => {
              if (res && res.returnCode == "1000") {
                this.getImgList();
                this.cancelAllSelected();
                this.$emit("change", new Date().getTime());
                this.$message.success("文件删除成功");
              } else {
                this.$message.error("文件删除失败");
              }
            }
          );
        },
        onCancel: () => {
          console.log("Cancel");
        },
        class: "test",
      });
    },
    handleEditGroup() {
      this.showGroup = true;
    },
    handleEdit(record) {
      console.log(record);
      this.editShow = true;
      this.currentDataItem = record;
    },
    handleCancelEdit() {
      this.editShow = false;
      this.currentDataItem = {};
    },
    handleUpdate() {
      this.editShow = false;
      this.currentDataItem = {};
      this.cancelAllSelected();
      this.getImgList();
    },
    handleUpdateGroup() {
      this.cancelAllSelected();
      this.getImgList();
      this.showGroup = false;
      this.$emit('updateGroup');
    },
    handleUploadImage(data) {
      this.$emit("change", new Date().getTime());
      console.log("data", data);
      this.cancelAllSelected();
      this.getImgList();
      this.uploadShow = false;
    },
  },
};
</script>

<style lang="less" scoped>
.img_list {
  padding: 20px 16px;
  .top15 {
    margin-top: 15px;
  }
  .list {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    width:1015px;
    .list_item {
      margin-bottom: 15px;
      width: 195px;
      margin-right: 10px;
      &:nth-child(5n){
        margin-right: 0;
      }
      /deep/ .ant-card {
        .ant-card-cover {
          height: 170px;
          background: #999;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
          }
        }
        .ant-card-body {
          padding:15px 5px 10px!important;
          .ant-checkbox-wrapper {
            position: relative;
            width: 100%;
            .ant-checkbox {
              position: absolute;
              right: 0;
              top:1px;
            }
            span:nth-child(2) {
              display: block;
            }
            .ant-card-meta-title {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: 100%;
            }
            .ant-card-meta-description {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
  .right {
    text-align: right;
    margin-bottom: 15px;
  }
  .empty {
    color: #999999;
    text-align: center;
    height: 300px;
    line-height: 200px;
  }
}
.top0{
  margin-top:0;
  padding-top:0;
}
// @media screen and (min-width: 1400px) and (max-width: 1599px) {
//   .list {
//     .list_item {
//       width: 32% !important;
//       margin-right: 2% !important;
//       &:nth-child(3n) {
//         margin-right: 0 !important;
//       }
//     }
//   }
// }
// @media screen and (min-width: 1600px) and (max-width: 1920px) {
//   .list {
//     .list_item {
//       //border:10px solid red;
//       width: 24.25% !important;
//       margin-right: 1% !important;
//       &:nth-child(4n) {
//         margin-right: 0 !important;
//       }
//     }
//   }
// }
// @media screen and (min-width: 1921px) {
//   .list {
//     .list_item {
//       width: 300px !important;
//       margin-right: 15px !important;
//     }
//   }
// }
</style>
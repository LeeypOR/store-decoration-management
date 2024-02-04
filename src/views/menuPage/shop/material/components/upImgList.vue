<template>
  <div class="img_list">
    <div class="list">
      <div class="list_item" v-for="(item, index) in listData" :key="index">
        <a-card hoverable>
          <img
            slot="cover"
            alt="example"
            :src="item.fileUrl"
            @click="handleSelectedChange(item)"
          />
          <a-checkbox
            v-model="item.selectStatus"
            @change="handleSelectedChange(item)"
          >
            <a-card-meta
              :title="item.fileName"
              :description="joinDesc(item)"
            ></a-card-meta>
          </a-checkbox>
        </a-card>
      </div>
    </div>
    <div class="empty" v-if="pagination.total == 0">
      暂无数据显示，可点击左上角“上传图片”按钮添加
    </div>
    <div class="right" v-if="pagination.total > 0">
      <uploadImgPagition
        :current="pagination.current"
        :size="pagination.size"
        :total="pagination.total"
        @change="handlePaginationChange"
      ></uploadImgPagition>
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
import uploadImgPagition from "./uploadImgPagition";
import MaterialUploadImage from "./MaterialUploadImage";
import MaterialGroup from "./MaterialGroup";
import MaterialImgEdit from "./MaterialImgEdit";
import ClipboardJS from "clipboard";

export default {
  name: "upImgList",
  components: {
    HeaderOperate,
    uploadImgPagition,
    MaterialUploadImage,
    MaterialGroup,
    MaterialImgEdit,
  },
  props: {
    dirId: {
      type: String,
      default: "",
    },
  },
  watch: {
    dirId: {
      handler(newVal) {
        this.pagination.current = 1
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
        pageSize: 6,
        total: 0,
      },
      defaultPageSize: 6,
      selectStatus: 0,
      currentDataItem: {},
    };
  },
  created() {
    this.getImgList();
  },
  mounted() {
    this.$nextTick(() => {
      new ClipboardJS(".copyBtn");
      //console.log('ClipboardJS',ClipboardJS)
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
      this.pagination.size = size;
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
      } else {
        this.pagination.current = 1;
        this.pagination.pageSize = dataInfo.size || this.defaultPageSize;
        this.pagination.total = 0;
      }
    },
    handleSelectedChange(l) {
      //   this.selectedKeys = [];
      //   this.listData.forEach((item) => {
      //     if (item.selectStatus) {
      //       this.selectedKeys.push(item.id);
      //     }
      //   });
      //   if (this.selectedKeys.length == this.listData.length) {
      //     this.selectStatus = 1;
      //   } else if (this.selectedKeys.length == 0) {
      //     this.selectStatus = 0;
      //   } else {
      //     this.selectStatus = 2;
      //   }
      this.listData.forEach((item) => {
        item.selectStatus = false;
        if (item.id == l.id) {
          item.selectStatus = true;
        }
      });
    },
    comfirmSelectImge() {
      let a = "";
      this.listData.forEach((item) => {
        if (item.selectStatus == true) {
          a = item.fileUrl;
        }
      });
      return a;
    },
    handleAllSelected(isAllSelected) {
      console.log(isAllSelected);
      if (isAllSelected) {
        this.selectStatus = 1;
        this.selectedKeys = [];
        this.listData.forEach((item) => {
          item.selectStatus = true;
          if (item.selectStatus) {
            this.selectedKeys.push(item.id);
          }
        });
      } else {
        this.cancelAllSelected();
      }
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
        title: "您确定要删除视频？",
        content: (h) => <p>删除视频不会对已使用该视频的业务造成影响。</p>,
        onOk: () => {
          console.log("OK");
          this.$post("goldenhome/decoration/admin_/file/delete", ids).then(
            (res) => {
              if (res && res.returnCode == "1000") {
                this.getImgList();
                this.cancelAllSelected();
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
      this.getImgList();
    },
    handleUpdateGroup() {
      this.cancelAllSelected();
      this.getImgList();
      this.showGroup = false;
    },
    handleUploadImage(data) {
      console.log("data", data);
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
    width: 100%;
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    .list_item {
      width: 30%;
      margin-right: 20px;
      margin-bottom: 15px;
      //   width: 260px;
      /deep/ .ant-card {
        .ant-card-cover {
          height: 150px;
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
          .ant-checkbox-wrapper {
            position: relative;
            width: 100%;
            .ant-checkbox {
              position: absolute;
              right: 0;
            }
            span:nth-child(2) {
              display: block;
            }
            .ant-card-meta-title {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: 134px;
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
@media screen and (min-width: 1200px) {
  .list {
    .list_item {
      //border:10px solid red;
    }
  }
}
</style>
<template>
  <aside>
    <header>
      <a-row type="flex" justify="space-between" align="middle" v-if="show">
        <div class="title">{{ title }}</div>
        <div class="manage_group" @click="handleManageGroup">
          <i class="iconfont icon-management"></i>管理分组
        </div>
      </a-row>
      <a-row class="search">
        <a-input-search v-model="keywords" placeholder="搜索分组名称" @search="handleSearch"/>
      </a-row>
    </header>
    <div class="main" :style="{height:show?'400px':'472px'}">
      <a-tree
        class="tree"
        :checkStrictly="checkStrictly"
        :blockNode="true"
        :tree-data="treeData"
        :replace-fields="replaceFields"
        :default-expand-all="defaultExpandAll"
        :default-expanded-keys="defaultExpandedKeys"
        :default-selected-keys="defaultSelectedKeys"
        @select="handleTreeSelect"
      />
    </div>
    <footer>
      <div class="btn_group">
        <a-button-group
          size="large"
          v-if="selectedType == 1 || selectedType == 2"
        >
          <a-button @click="handleAddSubGroup" v-if="selectedType != 2"
            >添加子分组</a-button
          >
          <a-button @click="handleEditSubGroup" v-if="show">重命名</a-button>
          <a-button @click="handleDeleteSubGroup" v-if="show"
            >删除分组</a-button
          >
        </a-button-group>
        <a-button
          block
          size="large"
          v-if="selectedType == 0"
          @click="handleAddSubGroup"
          >添加子分组</a-button
        >
      </div>
      <div class="bg" v-if="show"></div>
    </footer>
    <MaterialManageGroup
      :visible="showManageGoup"
      :isVideo="isVideo"
      @cancel="handleCancelManageGroup"
    ></MaterialManageGroup>
    <MaterialSubGroup
      :visible="showSubGroup"
      :isEdit="isEditSubGroup"
      :isVideo="type==2"
      :record="currentData"
      @cancel="showSubGroup = false"
      @submit="handleSubmitSubGroup"
    ></MaterialSubGroup>
  </aside>
</template>

<script>
import MaterialManageGroup from "./MaterialManageGroup";
import MaterialSubGroup from "./MaterialSubGroup";

export default {
  components: {
    MaterialManageGroup,
    MaterialSubGroup,
  },
  props: {
    type: {
      type: Number,
      default: 1, //1图片、2视频
    },
    show: {
      type: Boolean,
      default: true,
    },
    timpstamp:{
      type:[String,Number],
      default:''
    }
  },
  data() {
    return {
      keywords:'',
      showManageGoup: false,
      showSubGroup: false,
      checkStrictly: true,
      defaultExpandAll: true,
      defaultExpandedKeys: [""],
      defaultSelectedKeys: [""],
      replaceFields: {
        children: "children",
        title: "directoryNameAndCount",
        key: "id",
      },
      treeData: [],
      selectedType: 0, //0全部图片；1未分组；2子集，3其他
      currentData: {}, //
      isEditSubGroup: false,
      title: "图片分组",
      isVideo: false,
      treeDataCopy:[],
    };
  },
  watch: {
    type: {
      handler(newVal) {
        if (newVal == 2) {
          this.getVideoTree();
          this.title = "视频分组";
          this.isVideo = true;
        } else {
          this.getImgTree();
          this.title = "图片分组";
          this.isVideo = false;
        }
      },
    },
    timpstamp:{
      handler(newVal){
        if (this.type == 2) {
          this.getVideoTree();
        } else {
          this.getImgTree();
        }
      }
    }
  },
  created() {
    if (this.type == 2) {
      this.getVideoTree();
    } else {
      this.getImgTree();
    }
  },
  methods: {
    handleSearch(){
      console.log('this.treeData',this.treeData)
      this.treeData = this.rebuildData(this.keywords,this.treeDataCopy);
    },
    rebuildData(value, arr) {
      if (!arr) {
        return [];
      }
      let newarr = [];
      arr.forEach((element) => {
        if (element.directoryNameAndCount.indexOf(value) > -1) {
          const ab = element.children;
          const obj = {
            ...element,
            children: ab,
          };
          newarr.push(obj);
        } else {
          if (element.children && element.children.length > 0) {
            const ab = this.rebuildData(value, element.children);
            const obj = {
              ...element,
              children: ab,
            };
            if (ab && ab.length > 0) {
              newarr.push(obj);
            }
          }
        }
      });
      return newarr;
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
        this.treeDataCopy=this.treeData;
      }
    },
    async getVideoTree() {
      let res = await this.$get(
        "goldenhome/decoration/admin_/file/directory/video/tree"
      );
      console.log(res);
      if (res && res.returnCode == "1000") {
        let treeData=this.deepJoinTreeFileCount(res.dataInfo || []);
        let allCount=this.getAllTreeFileCount(res.dataInfo || []);
        console.log('allCount',allCount);
        console.log('treeData',treeData);
        this.treeData = [];
        this.treeData.push({
          directoryNameAndCount: `全部视频（${allCount}）`,
          id: "",
          children: treeData,
        });
        this.treeDataCopy=this.treeData;
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
    handleTreeSelect(selectedKeys, e) {
      console.log(selectedKeys, e.selectedNodes);

      let tmpData = e.selectedNodes || [];
      this.currentData = {};
      if (tmpData.length > 0 && tmpData[0].data) {
        this.currentData = tmpData[0].data.props || {};
      }
      console.log("selectedKeys,currentData", selectedKeys, this.currentData);

      let selectedKey = "";
      if (selectedKeys.length > 0) {
        selectedKey = selectedKeys[0];
      } 
      let treePath = (this.currentData.treePath || "").split(",");
      console.log('treePath',treePath)
      if (treePath.length >= 4) {
        this.selectedType = 2;
      } else {
        if(treePath.length==1 && treePath[0]==''){
          this.selectedType=0;
        }
        else {
          this.selectedType = 1;
        }
      }
      this.$emit("select", selectedKey, this.currentData);
    },
    handleAddSubGroup() {
      this.isEditSubGroup = false;
      this.showSubGroup = true;
    },
    handleEditSubGroup() {
      this.isEditSubGroup = true;
      this.showSubGroup = true;
    },
    handleSubmitSubGroup(formData) {
      this.showSubGroup = false;
      if(this.isEditSubGroup){
        this.currentData.directoryName=formData.groupName;
      }
      if (this.type == 2) {
        this.getVideoTree();
      } else {
        this.getImgTree();
      }
    },
    handleDeleteSubGroup() {
      console.log('this.currentData',this.currentData)
      if(Object.keys(this.currentData).length==0){
        this.$message.error('请选要删除的分组');
        return;
      }
      this.$confirm({
        title: "提示",
        content: (h) => <p>您确定要子分组？</p>,
        onOk: () => {
          this.$post("goldenhome/decoration/admin_/file/directory/delete", [
            this.currentData.id,
          ]).then(() => {
            this.currentData={};
            this.$message.success("删除子分组成功");
            if (this.type == 2) {
              this.getVideoTree();
            } else {
              this.getImgTree();
            }
          });
        },
      });
    },
    handleManageGroup() {
      this.showManageGoup = true;
    },
    handleCancelManageGroup(){
      this.showManageGoup=false;
      if (this.type == 2) {
        this.getVideoTree();
      } else {
        this.getImgTree();
      }
    }
  },
};
</script>

<style lang="less" scoped>
aside {
  //height:500px;
  display: flex;
  flex-direction: column;
  position: relative;
  header {
    padding: 20px 16px 0;
    .title {
      font-family: PingFang SC;
      font-size: 16px;
    }
    .manage_group {
      color: #016dff;
      display: flex;
      align-items: center;
      cursor: pointer;
      user-select: none;
    }
    .search {
      margin-top: 10px;
    }
  }
  .main {
    height: 400px;
    overflow: auto;
    .tree {
      margin-top: 5px;
    }
    /deep/ .ant-tree-node-content-wrapper {
      height: 30px;
      line-height: 30px;
      &:hover {
        background: #f2f2f6 !important;
      }
    }
    /deep/ .ant-tree-switcher {
      height: 30px;
      line-height: 30px;
      transition: all 0.3s;
    }
    /deep/ .ant-tree-treenode-selected {
      & > span {
        background: #f2f2f6 !important;
      }
      .ant-tree-node-content-wrapper {
        border-radius: 0 2px 2px 0;
        &.ant-tree-node-selected {
          background: #f2f2f6 !important;
        }
      }
    }
    /deep/ .ant-tree-title{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
      display: block;
    }
  }
  footer {
    // position:absolute;
    // top:200px;
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    .btn_group {
      /deep/ .ant-btn-group{
        display: flex;
        .ant-btn{
          flex:1;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
    .bg {
      background: #f6f7f8;
      flex: 1;
    }
  }
}
</style>
<template>
  <a-modal 
    :visible="visible"
    :title="title"
    okText="确定" 
    cancelText="取消"
    :maskClosable="false"
    :destroyOnClose="true"
    :keyboard="false"
    @cancel="closeModal()"
    @ok="handleSubmit"
    width="600px">
    <a-form-model ref="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" 
      :model="formData" :rules="formRules">
      <a-form-model-item label="所在分组" prop="groupId">
          <a-tree-select
            allowClear
            style="width:300px"          
            :replaceFields="{children:'children', title:'directoryName', key:'id', value: 'id' }"  
            v-model="formData.groupId"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            :tree-data="groupList"
            placeholder="请选择"
            tree-default-expand-all
            >
            <span slot="title" slot-scope="{ key, value }">
                {{ value }}
            </span>
        </a-tree-select>
          <div class="desc">列表仅展示可操作的分组</div>
      </a-form-model-item>
      <a-form-model-item label="分组名称" prop="groupName" v-if="!isEdit">
          <a-input v-model="formData.groupName" placeholder="分组名称最多20个字"/>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
export default {
  components:{
    
  },
  props: {
    visible:{
      type:Boolean,
      default:false,
    },
    isVideo:{
      type:Boolean,
      default:false,
    },
    isEdit:{
      type:Boolean,
      default:false,
    },
    isDirectory:{
      type:Boolean,
      default:false,
    },
    ids:{
      type:Array,
      default(){
        return [];
      }
    },
  },
  computed:{
    title(){
      if(this.isEdit){
        return '修改分组';
      }
      return '添加分组';
    }
  },
  data () {
    return {
      groupList:[],
      formData:{
        groupId:'',
        groupName:'',
      },
      formRules:{
        groupId:[
            {
                required:true,
                message:'请选择所在分组'
            }
        ],
        groupName:[
            {
                required:true,
                message:'请输入分组名称'
            }
        ],
      },
      allNotAllowIds:[],
    }
  },
  watch: {
    visible(newVal){
      if(newVal){
        this.getTreeData();
        this.formData={
          groupId:'',
          groupName:'',
        };
        if(this.isEdit){
          delete this.formRules.groupName;
          console.log(this.formRules)
        }
      }
    }
  },
  created(){
    
  },
  mounted () {
  },
  methods: {
    closeModal (freshTable) {
      this.$emit('cancel', freshTable)
    },
    async getTreeData(){
      let url='goldenhome/decoration/admin_/file/directory/image/tree';
      if(this.isVideo){
        url='goldenhome/decoration/admin_/file/directory/video/tree';
      }
      let res = await this.$get(url);
      console.log(res);
      if(res && res.returnCode=='1000'){
        // let tmpData=[{
        //   directoryName:this.isVideo?'全部视频':'全部图片',
        //   id:0,
        //   children:[],
        // }];
        // tmpData[0].children=res.dataInfo;
        // this.groupList=tmpData;
        this.groupList=res.dataInfo || [];
      }
    },
    getIdsDeep(data,id,isValidate){
      data.forEach(item=>{
        if(item.id){
          if(item.id==id || isValidate){
            this.allNotAllowIds.push(item.id);
            if(item.children){
              this.getIdsDeep(item.children,id,true);
            }
          }
          if(item.children){
            this.getIdsDeep(item.children,id);
          }
        }
      })
    },
    validateAllowMoveGroup(ids,groupId){
      console.log('this.groupList',this.groupList)
      this.allNotAllowIds=[];
      ids.forEach(id=>{
        this.getIdsDeep(this.groupList,id);
      });
      console.log('this.allNotAllowIds,ids',this.allNotAllowIds,ids);
      for(let i=0;i<this.allNotAllowIds.length;i++){
        if(this.allNotAllowIds[i]==groupId){
          return false;
        }
      }
      return true;
    },
    validateAllowLevel(id){
      if(id==0){
        return true;
      }
      for(let i=0;i<this.groupList.length;i++){
        let item1=this.groupList[i];
        console.log('item1',item1,id);
        if(item1.id==id){
          return true;
        }
        if(item1.children && item1.children.length>0){
          for(let j=0;j<item1.children.length;j++){
            let item2=item1.children[j];
            console.log('item2',item2,id);
            if(item2.id==id){
              return true;
            }
          }
        }
      }
      return false;
    },
    async addGroup(formData={}){
      let url='goldenhome/decoration/admin_/file/directory/image/add';
      if(this.isVideo){
        url='goldenhome/decoration/admin_/file/directory/video/add';
      }
      let res = await this.$post(url, {
        parentId:formData.groupId,
        directoryName:formData.groupName
      });
      if (res && res.returnCode == 1000) {
        this.$message.success('添加成功！')
      }
    },
    async updateGroupDirectory(formData={}){
      let url='goldenhome/decoration/admin_/file/directory/updates';
      let res = await this.$post(url, {
        ids:this.ids,
        parentId:formData.groupId
      });
      if (res && res.returnCode == 1000) {
        this.$message.success('修改成功！')
      }
    },
    async updateGroupFile(formData={}){
      let url='goldenhome/decoration/admin_/file/update/dirs';
      if(this.ids.length==0){
        this.$message.error('图片、视频未选择');
        return;
      }
      let res = await this.$post(url, {
        ids:this.ids,
        fileDirectoryId:formData.groupId
      });
      if (res && res.returnCode == 1000) {
        this.$message.success('修改成功！')
      }
    },
    handleSubmit(){
      this.$refs.form.validate(valid => {
          if (valid) {
            console.log('this.formData',this.formData);
            if(this.isEdit){
              console.log('this.ids,this.formData.groupId',this.ids,this.formData.groupId)
              if(this.validateAllowMoveGroup(this.ids,this.formData.groupId)==false){
                this.$message.error('只能移动到父级分组和平级分组内，子分组和本分组无法移动');
                return;
              }
              if(this.isDirectory){
                this.updateGroupDirectory(this.formData);
              }
              else{
                this.updateGroupFile(this.formData);
              } 
              this.$emit('submit',this.formData);
            }
            else {
              if(this.validateAllowLevel(this.formData.groupId)==false){
                this.$message.error('最多三个层级');
                return;
              }
              this.addGroup(this.formData);    
              this.$emit('submit',this.formData);
            }
          } else {
            console.log('error submit!!');
            return false;
          }
      });
    }
  }
}
</script>

<style lang="less" scoped>
.desc{
  color:#999;
}
</style>

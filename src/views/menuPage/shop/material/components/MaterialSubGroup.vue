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
      <a-form-model-item label="子分组名" prop="groupName">
          <a-input v-model="formData.groupName" :maxLength="20"/>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
export default {
    props:{
        visible:{
            type:Boolean,
            default:false,
        },
        isEdit:{
            type:Boolean,
            default:false,
        },
        isVideo:{
            type:Boolean,
            default:false,
        },
        record:{
            type:Object,
            default(){
                return {};
            }
        }
    },
    watch:{
        visible(newVal){
            this.formData={
                id:'',
                groupName:'',
            };
            if(newVal){
                if(Object.keys(this.record).length>0){
                    this.title='编辑分组名称';
                    this.formData.id=this.record.id || '';
                    if(this.isEdit){
                        this.formData.groupName=this.record.directoryName || '';
                        this.formData.parentId=this.record.parentId;
                    }
                    else {
                        this.formData.parentId=this.record.id;
                    }
                }
            }
        }
    },
    data(){
        return {
            title:'添加子分组',
            formData:{
                id:'',
                groupName:'',
                parentId:'',
            },
            formRules:{
                groupName:[
                    {
                        required:true,
                        message:'请输入分组名称'
                    }
                ],
            }
        }
    },
    methods:{
        closeModal (freshTable) {
            this.$emit('cancel', freshTable)
        },
        async addSubGroup(formData){
            let url='goldenhome/decoration/admin_/file/directory/image/add';
            if(this.isVideo){
                url='goldenhome/decoration/admin_/file/directory/video/add';
            }
            let res = await this.$post(url,{
                parentId:formData.parentId || 0,
                directoryName:formData.groupName
            });
            if(res && res.returnCode=='1000'){
                this.$message.success('添加子分组成功');
            }
        },
        async editSubGroup(formData){
            let res = await this.$post('goldenhome/decoration/admin_/file/directory/update',{
                parentId:formData.parentId || 0,
                directoryName:formData.groupName,
                id:formData.id
            });
            if(res && res.returnCode=='1000'){
                this.$message.success('修改子分组成功');
            }
        },
        handleSubmit(){
            this.$refs.form.validate(valid => {
                if (valid) {
                    if(this.isEdit){
                        this.editSubGroup(this.formData).then(()=>{
                            this.$emit('submit',this.formData);
                        });
                    }
                    else {
                        this.addSubGroup(this.formData).then(()=>{
                            this.$emit('submit',this.formData);
                        });
                    }                    
                }
                else {
                    return false;
                }
            });
        }
    }
}
</script>

<style>

</style>
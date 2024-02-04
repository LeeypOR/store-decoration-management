<template>
  <a-modal 
    :visible="visible"
    okText="确定" 
    cancelText="取消"
    title="编辑图片"
    :maskClosable="false"
    :destroyOnClose="true"
    :keyboard="false"
    width="500px"
    @cancel="closeModal()" 
    @ok="handleSubmit">
    <a-form-model :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }"
        ref="form" :rules="formRules" :model="formData">
        <a-form-model-item label="移动到分组" prop="groupId">
            <a-tree-select
                allowClear       
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
        </a-form-model-item>
        <a-form-model-item label="图片名称" prop="fileName">
            <a-input :addon-after="'.'+formData.ext" v-model="formData.fileName" />
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
        record:{
            type:Object,
            default(){
                return {};
            }
        }
    },
    data(){
        return {
            groupList:[],
            formData:{
                groupId:'',
                fileName:'',
                ext:'',
            },
            formRules:{
                groupId:[
                    {
                        required:true,
                        message:'请选择移动到的分组'
                    }
                ],
                fileName:[
                    {
                        required:true,
                        message:'请输入图片名称',
                    }
                ]
            }
        }
    },
    watch:{
        visible(newVal){
            if(newVal){
                this.getImgTree();
                this.formData.groupId=this.record.fileDirectoryId;
                this.formData.fileName=this.record.fileName;
                this.formData.ext=this.record.fileExtension;
            }
        }
    },
    created(){
        
    },
    methods:{
        async getImgTree(){
            let res = await this.$get('goldenhome/decoration/admin_/file/directory/image/tree');
            console.log(res);
            if(res && res.returnCode=='1000'){
                this.groupList=res.dataInfo || [];
                // if(res.dataInfo && res.dataInfo.length>0){
                    
                // }
                // else {
                //     this.groupList=[
                //         // {
                //         //     directoryName:'未分组',
                //         //     id:0,
                //         // }
                //     ];
                // }
            }
        },
        async updateData(formData){
            let res = await this.$post('goldenhome/decoration/admin_/file/update',formData);
            if(res && res.returnCode=='1000'){
                this.$message.success('修改图片成功');
            }
        },
        closeModal (freshTable) {
            this.$emit('cancel', freshTable)
        },
        handleSubmit(){
            this.$refs.form.validate(valid => {
                if (valid) {
                    let formData={
                        id:this.record.id,
                        fileName:this.formData.fileName,
                        fileDirectoryId:this.formData.groupId
                    }
                    this.updateData(formData).then(()=>{
                        this.$emit('submit');
                    })
                }
                else {
                    return false;
                }
            });
        },
    }
}
</script>

<style lang="less" scoped>

</style>
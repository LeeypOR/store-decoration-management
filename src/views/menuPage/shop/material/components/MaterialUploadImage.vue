<template>
  <a-modal
    :visible="visible"
    okText="确定"
    cancelText="取消"
    title="上传图片"
    :maskClosable="false"
    :destroyOnClose="true"
    :keyboard="false"
    :confirmLoading="loading"
    width="800px"
    @cancel="closeModal()"
    @ok="handleSubmit">
    <a-form-model :label-col="{ span: 4 }"
:wrapper-col="{ span: 20 }"
        ref="form"
:rules="formRules"
:model="formData">
        <a-form-model-item label="上传方式" prop="uploadMethod">
            <a-radio-group :options="uploadMethodList" v-model="formData.uploadMethod">本地上传</a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="所在分组" prop="groupId">
            <a-space>
                <!-- <a-select allowClear style="width:200px;" :options="groupList" v-model="formData.groupId"></a-select> -->
                <a-tree-select
                    allowClear
                    style="width:200px"
                    :replaceFields="{children:'children', title:'directoryName', key:'id', value: 'id' }"
                    v-model="formData.groupId"
                    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                    :tree-data="groupList"
                    placeholder="请选择"
                    tree-default-expand-all
                    >
                    <span slot="title" slot-scope="{ value }">
                        {{ value }}
                    </span>
                </a-tree-select>
                <a href="javascript:;" @click="groupShow=true">添加分组</a>
                <a href="javascript:;" @click="handleReloadGroup">刷新</a>
            </a-space>
        </a-form-model-item>
        <a-form-model-item label="本地图片" prop="imgList">
            <ImageUploadList
                :limit="150"
                :accept="accept"
                :fileSizeLimit="fileSize ? fileSize : fileSizeLimit"
                :multiple="true"
                :value="formData.imgList"
                @remove="handleImageRemove"
                @change="handleImageChange">
            </ImageUploadList>
            <div class="desc">支持 .jpg, .png, .gif, .bmp 格式，最多150张，单个图片不超过 {{ fileSize ? (fileSize/1024/1024).toFixed(0) : (fileSizeLimit/1024/1024).toFixed(0) }} MB。</div>
        </a-form-model-item>
    </a-form-model>
    <MaterialGroup :visible="groupShow" @cancel="groupShow=false" @submit="handleAddGroup"></MaterialGroup>
  </a-modal>
</template>

<script>
import ImageUploadList from './UploadImage'
import MaterialGroup from './MaterialGroup'

export default {
    components: {
        ImageUploadList,
        MaterialGroup
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        fileSize: {
            type: [Boolean, Number],
            default: false
        }
    },
    data () {
        return {
            fileSizeLimit:1024*1024*3,
            groupList:[],
            uploadMethodList:[
                {
                    label: '本地上传',
                    value: 1
                }
            ],
            groupShow: false,
            formData: {
                uploadMethod: 1,
                groupId: '',
                imgList: '',
                imgArrList: []
            },
            formRules: {
                uploadMethod: [
                    {
                        required: true,
                        message: '请选择上传方式'
                    }
                ],
                groupId: [
                    {
                        required: true,
                        message: '请选择所在分组'
                    }
                ],
                imgList: [
                    {
                        required: true,
                        message: '请上传本地图片'
                    }
                ]
            },
            loading:false,
            accept:'image/gif,image/jpeg,image/jpg,image/png,image/bmp'
        }
    },
    watch:{
        visible:{
            handler(newVal){
                this.formData={
                    uploadMethod:1,
                    groupId:'',
                    imgList:'',
                    imgArrList:[],
                };
                if(newVal){
                    this.getImgTree();
                }
            }
        }
    },
    created(){
        this.getImgTree();
    },
    methods: {
        closeModal (freshTable) {
            this.$emit('cancel', freshTable)
        },
        async getImgTree () {
            let res = await this.$get('goldenhome/decoration/admin_/file/directory/image/tree')
            console.log(res)
            if (res && res.returnCode == '1000') {
                // res.dataInfo.unshift({
                //     directoryName:'未分组',
                //     id:0,
                // })
                this.groupList = res.dataInfo
            }
        },
        handleAddGroup (data) {
            console.log(data)
            this.groupShow = false
            this.getImgTree()
        },
        handleReloadGroup () {
            this.getImgTree()
        },
        getImageInfo (url) {
            return new Promise((resolve, reject) => {
                let img = new Image()
                img.src = url
                img.onload = (e) => {
                    let info = {
                        url,
                        width: img.width,
                        height: img.height
                    }
                    resolve(info)
                }
                img.onerror = (e) => {
                    reject(e)
                }
            })
        },
        setFileInfo () {
            // 拼接图片url
            this.formData.imgList = this.formData.imgArrList.map(fileInfo => {
                return fileInfo.url
            }).join(',')
            // 获取图片信息
            this.formData.imgArrList.forEach(fileInfo => {
                this.getImageInfo(fileInfo.url).then(info => {
                    const { width, height } = info
                    fileInfo.width = width
                    fileInfo.height = height
                })
            })
        },
        handleImageRemove (file) {
            console.log(file, this.formData.imgArrList)
            this.formData.imgArrList.forEach((fileInfo, index) => {
                if (fileInfo.url == file.url) {
                    this.formData.imgArrList.splice(index, 1)
                    this.setFileInfo()
                }
            })
        },
        handleImageChange (file) {
            this.formData.imgArrList.push(file)
            this.setFileInfo()
            console.log(this.formData.imgArrList)
        },
        formatData () {
            let tmpData = []
            this.formData.imgArrList.forEach(fileInfo => {
                let fileName = fileInfo.name.substr(0, fileInfo.name.lastIndexOf('.'))
                let ext = fileInfo.name.substr(fileInfo.name.lastIndexOf('.') + 1)
                tmpData.push({
                    fileName,
                    fileExtension: ext,
                    fileDirectoryId: this.formData.groupId,
                    fileUrl: fileInfo.url,
                    fileSize: fileInfo.size,
                    image: {
                        imageWidth: fileInfo.width,
                        imageHeight: fileInfo.height
                    }
                })
            })
            return tmpData
        },
        handleSubmit () {
            this.loading=true;
            this.$refs.form.validate(valid => {                
                if (valid) {
                    console.log('this.formData', this.formData)
                    let formData = this.formatData(this.formData)
                    console.log(formData)
                    this.$post('goldenhome/decoration/admin_/file/image/add', formData).then(res => {
                        if (res && res.returnCode == '1000') {
                            this.$message.success('新增图片成功')
                            this.$emit('submit', this.formData)
                            this.loading=false;
                        }
                    })
                } else {
                    console.log('error submit!!')
                    this.loading=false;
                    return false
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.desc{
    color:#999;
}
</style>

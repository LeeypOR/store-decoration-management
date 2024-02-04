<template>
  <a-modal 
    :visible="visible"
    okText="确定" 
    cancelText="取消"
    :title="title"
    :maskClosable="false"
    :destroyOnClose="true"
    :keyboard="false"
    :confirmLoading="loading"
    width="800px"
    @cancel="closeModal()" 
    @ok="handleSubmit">
    <a-form-model :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }"
        ref="form" :rules="formRules" :model="formData">
        <a-form-model-item label="本地视频" prop="videoUrl">
            <!-- <a-radio-group :options="uploadMethodList" v-model="formData.uploadMethod">本地上传</a-radio-group> -->
            <UploadFileList :value="formData.videoUrl" 
                :accept="video.videoAccept" 
                :fileSizeLimit="video.fileSizeLimit" :isVideo="true"
                :isAllow="!videoInfo.id"
                @change="handleUploadChange"></UploadFileList>
            <div class="desc">视频大小不超过100M，仅支持mp4,mov格式</div>
        </a-form-model-item>
        <a-form-model-item label="视频名称" prop="videoName">
            <a-input placeholder="20个字符以内" :maxLength="20" v-model="formData.videoName"/>
        </a-form-model-item>
        <a-form-model-item label="所在分组" prop="groupId">
            <a-space>
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
                    <span slot="title" slot-scope="{ key, value }">
                        {{ value }}
                    </span>
                </a-tree-select>
                <a href="javascript:;" @click="groupShow=true">添加分组</a>
                <a href="javascript:;" @click="handleReloadGroup">刷新</a>
            </a-space>
        </a-form-model-item>
        <a-form-model-item label="封面图片" prop="poster">
            <UploadImageList
                class="poster"
                :limit="img.limit"
                :fileSizeLimit="img.fileSizeLimit"
                :multiple="true"
                :value="formData.poster"
                @change="handleUploadPosterChange">
            </UploadImageList>
            <!-- <ImageUpload
                v-model="formData.poster"></ImageUpload>
            <div class="desc">支持 .jpg, .png, .bmp 格式，最多150张，单个图片不超过 10 MB。</div> -->
        </a-form-model-item>
    </a-form-model>
    <MaterialGroup :visible="groupShow" :isVideo="true" @cancel="groupShow=false" @submit="handleAddGroup"></MaterialGroup>
    <GetVideoInfo :url="formData.videoUrl" @load="handleVideoLoaded"></GetVideoInfo>
  </a-modal>
</template>

<script>
import GetVideoInfo from './GetVideoInfo';
import UploadImageList from './UploadImage'
//import ImageUpload from '@/components/antBase/ImageUpload'
import UploadFileList from './UploadFile';
import MaterialGroup from './MaterialGroup';

export default {
    components:{
        UploadImageList,
        //ImageUpload,
        MaterialGroup,
        UploadFileList,        
        GetVideoInfo,
    },
    props:{
        visible:{
            type:Boolean,
            default:false,
        },
        videoInfo:{
            type:Object,
            default(){
                return {};
            },
        }
    },
    computed:{
        title(){
            if(this.videoInfo.id){
                return '编辑视频';
            }
            return '上传视频';
        }
    },
    data(){
        return {
            video:{
                videoAccept:'mp4,mov',
                fileSizeLimit:1024*1024*100,//100M
            },
            img:{
                fileSizeLimit:1024*1024*10,//10M
                limit:1,
            },
            groupList:[],
            groupShow:false,
            formData:{
                videoUrl:'',
                videoName:'',
                groupId:0,
                poster:'',
                videoLength:0,
                videoSize:0,
            },
            formRules:{
                videoUrl:[
                    {
                        required:true,
                        message:'请上传本地视频'
                    }
                ],
                videoName:[
                    {
                        required:true,
                        message:'请输入视频名称',
                    }
                ],
                groupId:[
                    {
                        required:true,
                        message:'请选择所在分组'
                    }
                ],
                poster:[
                    {
                        required:true,
                        message:'请上传封面图片',
                    }
                ]
            },
            loading:false,
        }
    },
    watch:{
        visible:{
            handler(newVal){
                if(newVal){
                    this.getVideoGroupTree();
                    let video=this.videoInfo.video || {};
                    this.formData={
                        videoUrl:this.videoInfo.fileUrl,
                        videoName:this.videoInfo.fileName,
                        groupId:this.videoInfo.fileDirectoryId,
                        poster:video.coverPicture,
                        videoLength:video.videoLength,
                        videoSize:video.fileSize,
                    }
                }
            },
            immediate:true,
        }
    },
    created(){
        //this.getVideoGroupTree();
    },
    methods:{
        closeModal (freshTable) {
            this.$emit('cancel', freshTable)
        },
        async getVideoGroupTree(){
            let res = await this.$get('goldenhome/decoration/admin_/file/directory/video/tree');
            console.log(res);
            if(res && res.returnCode=='1000'){
                // res.dataInfo.unshift({
                //     directoryName:'未分组',
                //     id:0,
                // });
                this.groupList=res.dataInfo;
            }
        },
        handleAddGroup(data){
            console.log(data);
            this.groupShow=false;
            this.getVideoGroupTree();
        },
        handleReloadGroup(){
            this.getVideoGroupTree();
        },
        //封面图
        handleUploadPosterChange(fileInfo){
            this.formData.poster=fileInfo.url;
        },
        //视频上传成功
        handleUploadChange(file){
            console.log(file);
            this.formData.videoUrl=file.url;
            this.formData.videoSize=file.size;
            this.$message.success('上传成功');
        },
        //视频加载完成
        handleVideoLoaded(data){
            this.formData.videoLength=data.duration;
        },
        async addUpdateVideo(formData){
            let params=[
                {
                    fileName:formData.videoName,
                    fileExtension:formData.ext,
                    fileDirectoryId:formData.groupId,
                    fileUrl:formData.videoUrl,
                    fileSize:formData.videoSize || 0,
                    video:{
                        coverPicture:formData.poster,
                        videoLength:formData.videoLength || 0,
                    }
                }
            ]
            let url='';
            if(this.videoInfo.id){
                params[0].id=this.videoInfo.id;
                url='goldenhome/decoration/admin_/file/update';
                params=params[0];
                delete params.fileSize;
                console.log('params',params)
            }
            else {
                url='goldenhome/decoration/admin_/file/video/add';
            }
            let res = await this.$post(url,params);
            if(res && res.returnCode=='1000'){
                return Promise.resolve(params);
            }
            return Promise.reject(res.message);
        },
        handleSubmit(){      
            this.loading=true;
            this.$refs.form.validate(valid => {
                if (valid) {
                    console.log('this.formData',this.formData);
                    this.addUpdateVideo(this.formData).then(data=>{
                        this.$emit('submit',data);
                        this.loading=false;
                    }).catch(err=>{
                        console.log('error',err);
                    });
                } else {
                    console.log('error submit!!');
                    this.loading=false;
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
/deep/ .poster{
    .ant-upload{
        width:104px!important;
        height:104px!important;
        .anticon {
            svg{
                font-size:24px;
                color:#016BFF;
            }
        }
        img{
            //display: block;
            max-width: 100%;
            max-height: 100%;
        }
        .ant-upload-text{
            font-size:12px;
        }
    }
}
</style>
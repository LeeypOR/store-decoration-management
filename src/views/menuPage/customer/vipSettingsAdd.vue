
<template>
  <a-card title=" 基本信息" class="add_edit_product">
    <a-form :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }">
      <a-form-item label="会员等级">
        <a-input placeholder="输入等级名称"
                 :maxLength="9"
                 v-model="formData.vipLevel"
                 style="width:200px"
                 @blur="vipLevelBlur">
          <a-tooltip slot="suffix" title="最多输入9个字">
            <span>{{formData.vipLevel.length}}/9</span>
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
      </a-form-item>

      <a-form-item label="等级背景">
        <a-radio-group v-model="formData.background" @change="onChange">
          <div style="display: flex;">
            <a-radio :style="radioStyle" :value="0">
              背景色
            </a-radio>
            <div style="display:flex;flex-direction:column;" >
              <div class="finalColor" :style="{'background-color':color.color}"></div>
              <div class="colorChoose" v-if="formData.background===0">
                <template >
                  <div v-for="item in colors" >
                    <div :style="{'background-color':item.color}" class="divColor" @click="chooseColor(item)"></div>
                  </div>
                </template>
              </div>
            </div>

            <div v-if="formData.background===0" class="preview" :style="{'background-color':color.color}">
              <div :style="{position:'absolute',color:'#F5F5F5'}">
                <div style="display:flex;">
                  <div ><img :src="color.icon" :style="{'width':'35px','height':'35px','margin':'10px 0 0 10px','visibility':color.icon?'':'hidden'}" alt=""></div>
                  <div style="margin:15px 0 0  0;">金牌会员</div>
                  <div style="font-size: 10px;margin:10px 0 0  30px;">再消费100元可升级为 <span style="font-weight: bold;">金星会员</span></div>
                </div>
                <div class="main">
                  <div>
                    <div>21</div>
                    <div>消费单数</div>
                  </div>
                  <div>
                    <div>1</div>
                    <div>会员优惠券</div>
                  </div>
                  <div>
                    <div>2100</div>
                    <div>积分</div>
                  </div>
                </div>
              </div>
              <img v-show="color.bgc" :src="color.bgc" style="width:100%;height:100%;background-size:cover;" alt="">
            </div>

            <div v-if="formData.background===1" class="preview">
              <!--<img style="width:100%;height:100%;background-size:cover;" :src="formData.imgList" alt="请选择背景图">-->
              <div style="position:absolute;color:#F5F5F5;">
                <div style="display:flex;">
                  <div ><img :src="color.icon" :style="{'width':'35px','height':'35px','margin':'10px 0 0 10px','visibility':color.icon?'':'hidden'}" alt=""></div>
                  <div style="margin:15px 0 0  0;">金牌会员</div>
                  <div style="font-size: 10px;margin:10px 0 0  30px;">再消费100元可升级为 <span style="font-weight: bold;">金星会员</span></div>
                </div>
                <div class="main">
                  <div>
                    <div>21</div>
                    <div>消费单数</div>
                  </div>
                  <div>
                    <div>1</div>
                    <div>会员优惠券</div>
                  </div>
                  <div>
                    <div>2100</div>
                    <div>积分</div>
                  </div>
                </div>
              </div>
              <img v-show="formData.imgList" :src="formData.imgList" style="width:100%;height:100%;background-size:cover;" alt="">
            </div>
          </div>
          <div>
            <a-radio :style="radioStyle" :value="1">
              背景图
            </a-radio>
            <div v-if="formData.background===1">
              <upload-image
                v-model="formData.imgList"
                @change="handleProductImageChange">
              </upload-image>
              <div class="desc">尺寸：1000*600像素，小于1M，支持jpg、png、jpeg格式</div>
            </div>
          </div>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="等级图标">
        <upload-image
          v-model="formData.vipLevelPicture"
          @change="handleProductImageChange2">
        </upload-image>
        <div class="desc">尺寸：100*100像素，小于100K，支持jpg、png、jpeg格式</div>
      </a-form-item>

     <a-form-item>
       <a-col :offset="11">
         <a-space>
           <a-button type="primary" @click="submitDataEle">保存</a-button>
           <a-button @click="handleCancelEle">取消</a-button>
         </a-space>
       </a-col>
     </a-form-item>


    </a-form>
  </a-card>
</template>

<script>
  import ImageUploadList from './components/UploadImage'
  import SearchTable from "@/components/form/SearchTable";
  export default {
    name: 'vipSettingsAdd',
    components: {
      ImageUploadList,
      SearchTable
    },

    computed: {

    },
    data() {
      return {
        // isShow:false,
        colors:[
          // {color:'#EDEDED',bgc:require('@/assets/middle_modalbox_VIPcard_bg_G@2x.png'),icon:require('@/assets/vipbgc/icon/middle_modalbox_icon_viplevel01@2x.png')},
          {color:'#D79A7E',bgc:require('@/assets/middle_modalbox_VIPcard_bg_G@2x.png'),bgp:require('@/assets/vipbgc2/middle_modalbox_VIPcard_bg_01@2x.png'),icon:require('@/assets/vipbgc/icon/middle_modalbox_icon_viplevel01@2x.png')},
          {color:'#CACACA',bgc:require('@/assets/middle_modalbox_VIPcard_bg_G@2x.png'),bgp:require('@/assets/vipbgc2/middle_modalbox_VIPcard_bg_02@2x.png'),icon:require('@/assets/vipbgc/icon/middle_modalbox_icon_viplevel02@2x.png')},
          {color:'#E9D7A2',bgc:require('@/assets/middle_modalbox_VIPcard_bg_G@2x.png'),bgp:require('@/assets/vipbgc2/middle_modalbox_VIPcard_bg_03@2x.png'),icon:require('@/assets/vipbgc/icon/middle_modalbox_icon_viplevel03@2x.png')},
          {color:'#555555',bgc:require('@/assets/middle_modalbox_VIPcard_bg_G@2x.png'),bgp:require('@/assets/vipbgc2/middle_modalbox_VIPcard_bg_04@2x.png'),icon:require('@/assets/vipbgc/icon/middle_modalbox_icon_viplevel04@2x.png')},
          {color:'#92C8DF',bgc:require('@/assets/middle_modalbox_VIPcard_bg_G@2x.png'),bgp:require('@/assets/vipbgc2/middle_modalbox_VIPcard_bg_5@2x.png'),icon:require('@/assets/vipbgc/icon/middle_modalbox_icon_viplevel05@2x.png')},
          {color:'#A1DDD6',bgc:require('@/assets/middle_modalbox_VIPcard_bg_G@2x.png'),icon:require('@/assets/vipbgc/icon/middle_modalbox_icon_viplevel01@2x.png')},
          {color:'#AEDDA1',bgc:require('@/assets/middle_modalbox_VIPcard_bg_G@2x.png'),icon:require('@/assets/vipbgc/icon/middle_modalbox_icon_viplevel01@2x.png')},
          {color:'#F28792',bgc:require('@/assets/middle_modalbox_VIPcard_bg_G@2x.png'),icon:require('@/assets/vipbgc/icon/middle_modalbox_icon_viplevel01@2x.png')},
          {color:'#9880B5',bgc:require('@/assets/middle_modalbox_VIPcard_bg_G@2x.png'),icon:require('@/assets/vipbgc/icon/middle_modalbox_icon_viplevel01@2x.png')},
        ],
        color:{
          color:'#D79A7E',
          bgc:require('@/assets/middle_modalbox_VIPcard_bg_G@2x.png'),
          // icon:require('@/assets/vipbgc/icon/middle_modalbox_icon_viplevel01@2x.png')
          icon:""
        },

        formData:{
          vipLevel:'',
          background:0,
          imgList:'',
          vipLevelPicture:'',
        },
        radioStyle: {
          display: 'block',
          height: '30px',
          lineHeight: '30px',
        },

      }
    },
    watch: {

    },

    async created() {
   /*   console.log(this.colors[0].bgc)
      const res = await this.$post(`${location.origin}/goldenhome/ghs/admin/upload` , this.colors[0].bgc)
      console.log(res)*/
    },
    methods: {
      //获取VIP配置列表
      chooseColor(item){
        this.color.bgc = item.bgc
        this.formData.imgList = item.bgc
        this.color.color = item.color
        // this.color.icon = item.icon
        // this.formData.vipLevelPicture = item.icon
        // 切换颜色保持背景图的一致性
        // this.formData.imgList = item.bgp

      },

      vipLevelBlur(){
        if (this.formData.vipLevel.length<1){
          this.$message.error('身份称谓不能为空')
          return
        }
      },
      onChange(e){
        console.log(e.target.value,this.color)
        if (e.target.value ==0){
          this.formData.imgList = this.colors[0].bgc
          this.color.bgc = this.colors[0].bgc
        }
        if (e.target.value ==1){
          this.formData.imgList = ""
          this.color.bgc =  ""
        }
      },

      handleProductImageChange(val){
        this.formData.imgList  =  val
        this.color.bgc = val
        console.log( this.formData.imgList)
      },

      handleProductImageChange2(val){
        this.formData.vipLevelPicture  =  val
        this.color.icon =  val
        console.log(this.color)
        console.log( this.formData.vipLevelPicture)
      },


      handleCancel(){
        this.$router.push({ name: 'CustomerVipSettings'})
      },
      handleCancelEle(){
        this.$router.push({ name: 'CustomerVipSettings'})
      },

      submitData(){
        console.log('表单数据:',this.formData)
      },
      // 保存基本信息
      submitDataEle(){
        // console.log(this.color)
        // return
        if (this.color.bgc == ""){
          this.$message.error('请选择背景图')
          return
        }
        if (this.color.icon == ""){
          this.$message.error('请选择等级图标')
          return
        }
        if (this.formData.vipLevel.length<1){
          this.$message.error('身份称谓不能为空')
          return
        }

       if (this.formData.background===0){
         this.$post('goldenhome/member/admin_/member/gradeconfig/add', {
           gradeName:this.formData.vipLevel,
           backgroundColor:this.color.color,
           backgroundPicture:this.color.bgc,
           gradePicture:this.color.icon,
           enable:0
         }).then(res => {
           if (res && res.returnCode === 1000) {
             console.log('***********')
             console.log(res)
             this.$message.success('操作成功!')
             // this.isShow = true
             this.$router.push({
               name: 'CustomerVipSettingsDetail',
               query: {
                 id: res.dataInfo.id
               }
             })
           }
         })
       } else {
         this.$post('goldenhome/member/admin_/member/gradeconfig/add', {
           gradeName:this.formData.vipLevel,
           backgroundColor:'',
           backgroundPicture:this.color.bgc,
           gradePicture:this.color.icon,
           enable:0
         }).then(res => {
           if (res && res.returnCode === 1000) {
             console.log('***********')
             console.log(res)
             this.$message.success('操作成功!')
             // this.isShow = true
             this.$router.push({
               name: 'CustomerVipSettingsDetail',
               query: {
                 id: res.dataInfo.id
               }
             })
           }
         })
       }
      },

    },


  }
</script>
<style lang="less" scoped>
  .colorChoose{

    width:178px;
    height:66px;

    margin-top: 3px;
    background-color: #fff;
    box-shadow: 0 2px 10px 0 rgba(102, 102, 102, 0.3);

    display: flex;

    flex-wrap: wrap;
  }
  /deep/.ant-upload.ant-upload-select-picture-card{
    width: 75px;
    height: 75px;
  }
  .finalColor{
    width:60px;
    height:30px;
    background-color:#698EB9;

  }
  .divColor{
    width: 18px;
    height: 18px;
    border-radius: 3px;
    margin: 10px 0 0 10px;

  }
  .preview{
    position: absolute;
    width:310px;
    height: 160px;
    border:1px solid;
    margin-left:570px;
    border-radius:8px;
  }
  .bground{
    width: 780px;
    height: 60px;
    padding:10px 10px 0 10px;
    margin-bottom: 10px;
    background-color: #DCDCDC;
  }
  .delete{
    position: relative;
    left: 27px;
    top: -15px;
    display:inline-block;
    width: 30px;
    height: 30px;
    opacity: 0;
  }
  .delete:hover{
    opacity: 1;
    color: red;
  }
  .main{
    width:100%;height:100px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    text-align: center;
  }
  /deep/.ant-card-head-title::before{
    content:'';
    display: inline-block;
    width:5px;
    height: 20px;
    transform: scaleX(-1) scaleY(-1);
    background-image: linear-gradient(135deg, #0B59F9 0%, #48DCFF 100%);
    border-radius: 5px;
    position: relative;
    left:0;
    top:3px;
  }
  /deep/.ant-card-head-title{
    font-size: 20px;
    font-weight: bold;
    color: #333333;
    line-height: 26px;
  }
</style>

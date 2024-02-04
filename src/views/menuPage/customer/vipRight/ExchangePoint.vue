<template>
  <div>
    <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">

 <!--     <a-form-item  >
        <template slot="label">
          <span class="ant-form-item-required">选择享受权益会员级别</span>
        </template>
        <a-checkbox-group :options="vipList"  v-model="CommonData.gradeIdList" @change="checkChange">

        </a-checkbox-group>
      </a-form-item>-->
      <a-form-item  label="选择享受权益会员级别">
        <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">
          全选
        </a-checkbox>
        <br>
        <a-checkbox-group :options="vipList"  v-model="CommonData.gradeIdList" @change="checkChange">
        </a-checkbox-group>
      </a-form-item>
      <a-form-item >
        <template slot="label">
          <span class="ant-form-item-required">权益名称</span>
        </template>
        <a-input :style="{width:'200px'}" v-model="CommonData.generalName"></a-input>
      </a-form-item>

      <a-form-item >
        <template slot="label">
          <span class="ant-form-item-required">展示名称</span>
        </template>
        <a-input :style="{width:'200px'}" :maxLength="7" v-model="CommonData.benefitName"></a-input>
      </a-form-item>


      <a-form-item >
        <span slot="label" class="ant-form-item-required">权益内容</span>
        <a-button type="link" @click="openModel">{{CommonData.chooseActPage}}</a-button>
        <span>注：需先在店铺装修配置积分权益微页面</span>
        <div style="line-height: 40px">
          商城会员所获得的积分可参加积分兑换活动
        </div>

      </a-form-item>

      <a-form-item >

        <template slot="label">
          <span class="ant-form-item-required">权益图标</span>
        </template>
        <div class="shareImgBox">
          <div class="h5">
            <div class="image_wrap" :style="{
                                                background: CommonData.benefitIcon
                                                  ? `url(${CommonData.benefitIcon}) no-repeat 50% 50% /cover`
                                                  : '',
                                              }">

              <div class="hoverBox" v-if="CommonData.benefitIcon">
                <a-popconfirm
                  title="是否确认删除？"
                  @confirm="() => deleteImg('benefitIcon')"
                  :getPopupContainer="getPopupContainer()"
                >
                  <div class="delBtn">删除</div>
                </a-popconfirm>
                <div class="updatelBtn" @click="updateImgUrl('benefitIcon')">
                  替换
                </div>
              </div>
              <div class="image addBox" v-else>
                <img src="~@/assets/images/share/add.png"
                     style="width: 36px; height: 36px; margin-top: -10px"
                     @click="updateImgUrl('benefitIcon')"
                />
              </div>

            </div>
            <div style="text-align: center; color: #999; font-size: 10px">
              建议72*72像素的png照片
            </div>
          </div>
        </div>
      </a-form-item>


      <br>
      <hr>
      <div style="height: 25px;"></div>
      <div>
        <span>权益说明:</span>
        <a-button type="link" @click="openExampleModel">示例</a-button>
      </div>
      <br>


      <a-form-item >
        <template slot="label">
          <span class="ant-form-item-required">权益说明顶图</span>
        </template>
        <div class="shareImgBox">
          <div class="h5">
            <div class="image_wrap" :style="{
                                             background: CommonData.remarkTopPicture
                                               ? `url(${CommonData.remarkTopPicture}) no-repeat 50% 50% /cover`
                                               : '',
                                              }">

              <div class="hoverBox" v-if="CommonData.remarkTopPicture">
                <a-popconfirm
                  title="是否确认删除？"
                  @confirm="() => deleteImg('remarkTopPicture')"
                  :getPopupContainer="getPopupContainer()"
                >
                  <div class="delBtn">删除</div>
                </a-popconfirm>
                <div class="updatelBtn" @click="updateImgUrl('remarkTopPicture')">
                  替换
                </div>
              </div>
              <div class="image addBox" v-else>
                <img src="~@/assets/images/share/add.png"
                     style="width: 36px; height: 36px; margin-top: -10px"
                     @click="updateImgUrl('remarkTopPicture')"
                />
              </div>

            </div>
            <div style="text-align: center; color: #999; font-size: 10px">
              建议620*210像素的png照片
            </div>
          </div>
        </div>
      </a-form-item>

      <a-form-item>
        <template slot="label">
          <span class="ant-form-item-required">权益说明</span>
        </template>
        <a-col>
          <tinymce-editor v-model="CommonData.remark"></tinymce-editor>
        </a-col>
      </a-form-item>

      <a-form-item >
        <template slot="label">
          <span class="ant-form-item-required ">是否启用</span>
        </template>
        <a-switch  v-model="CommonData.isOn" @change="changeIsOn"></a-switch>
      </a-form-item>

      <a-form-item>
        <a-col :offset="11">
          <a-space>
            <a-button type="primary" @click="submitData">保存</a-button>
            <a-button @click="handleCancel">取消</a-button>
          </a-space>
        </a-col>
      </a-form-item>
    </a-form>

    <a-modal
      :visible="visible"
      okText="保存"
      cancelText="取消"
      :title="title"
      :maskClosable="false"
      :destroyOnClose="true"
      :keyboard="false"
      width="1000px"
      @cancel="closeModal()"
      @ok="handleSubmit">

      <radio-search-table
        :url="url"
        ref="searchtable"
        :form="form"
        :columns="columns"
        width="1000px"
        :chooseId="CommonData.mspageId"
      >
        <template slot="searchForm">
          <a-form layout="inline" :form="form">

            <a-form-item label="页面名称">
              <a-input
                style="width:180px"
                v-decorator="[
                                'rightName',
                              ]"
                placeholder="输入权益名称"
              >
              </a-input>
            </a-form-item>
          </a-form>
        </template>
      </radio-search-table>


    </a-modal>

    <Example :visible="exampleVisible" @cancel="closeExampleModel"></Example>
    <upload-modal
      :visible="chooseimgVisivle"
      @cancel="closeInfoModal"
      @getImgUrl="getImgUrl"
    ></upload-modal>
    <!--      <SelectImage :visible="selectImageShow"
                       :selectedFileUrls="selectedFileUrls"
                       @cancel="selectImageShow=false;"
                       @submit="handleSelectImageChange"></SelectImage>-->
  </div>
</template>

<script>
  import RadioSearchTable from './radioSearchTable'
  // import ImageUploadList from '@/components/form/UploadImage'
  // import uploadModal from "@components/antBase/uploadModal.vue";
  // import ImageUploadList from '../components/UploadImage'
  // import RadioSearchTable from './radioSearchTable'
  // import Example from "./viprightcomponents/Example";
  import mixin from "./mixins/index"
  export default {
    name: "ExchangePoint",
    mixins:[mixin],
    components:{
      RadioSearchTable
    },
    data(){
      return{
        benefitType:4,

        url:'goldenhome/decoration/admin_/page/ms/page',
        visible:false,
        title:"选择微页面",
        form: this.$form.createForm(this, { name: 'table_search' }),
        columns: [
          {
            title: '页面名称',
            dataIndex: 'pageName',
            key: 'pageName',
          },

          {
            title: '页面状态',
            dataIndex: 'pageStatus',
            key: 'pageStatus'
          },
          {
            title: '最后保存时间',
            dataIndex: 'updateDate',
            key: 'updateDate'
          },
        ],
      }
    },
    methods:{
      handleSubmit(){
        // 得到获取的微页面
        this.CommonData.chooseActPage = this.$refs.searchtable.selectedRows[0].pageName
        this.CommonData.mspageId = this.$refs.searchtable.selectedRows[0].id
        console.log(this.CommonData.chooseActPage,this.CommonData.mspageId)
        this.visible = false
      },
      submitData() {
        /* if (this.CommonData.gradeIdList.length==0){
           return this.$message.error('至少选择一个会员等级')
         }*/
        if (!this.CommonData.generalName){
          return this.$message.error('权益名称不能为空')
        }

        if (!this.CommonData.benefitName){
          return this.$message.error('展示名称不能为空')
        }

        if (!this.CommonData.benefitIcon){
          return this.$message.error('请选择权益图标')
        }
        if (!this.CommonData.mspageId){
          return this.$message.error('请选择微页面')
        }
        console.log('提交表单数据:', this.CommonData)
        // 参数说明: 权益名称, 权益类型, 权益icon, 权益说明,是否可用,积分规则,微页面id,优惠券id集合
        if (this.formData.id) {
          this.$post('goldenhome/member/admin_/member/benefits/update', {
            id: this.formData.id,
            benefitName: this.CommonData.benefitName,
            generalName: this.CommonData.generalName,
            benefitType: this.benefitType,
            benefitIcon: this.CommonData.benefitIcon,
            integralRatio: this.CommonData.integralRatio,
            remarkTopPicture: this.CommonData.remarkTopPicture,
            remark: this.CommonData.remark,
            isEnable: Number(this.CommonData.isOn),
            gradeIdList:this.CommonData.gradeIdList,
            mspageId:this.CommonData.mspageId,
            // mspageId:'',
            // couponIdList:'',
            // 参数说明: 登录商城次数 浏览时长 	每次登录获取积分数 分享商品次数 每次分享商品获取积分数
            //           每天评价商品次数 每次评价商品获取积分数 完善个人信息获取积分数 首单获取积分数

          }).then(res => {
            if (res && res.returnCode === 1000) {
              console.log('***********')
              console.log(res)
              this.$message.success('操作成功!')
              this.$router.push(
                {
                  name: 'CustomerVipRight',
                  query:{
                    current:this.current
                  }
                })
            }
          })
        } else {
          this.$post('goldenhome/member/admin_/member/benefits/add', {
            benefitName: this.CommonData.benefitName,
            generalName: this.CommonData.generalName,
            benefitType: this.benefitType,
            benefitIcon: this.CommonData.benefitIcon,
            remarkTopPicture: this.CommonData.remarkTopPicture,
            integralRatio: this.CommonData.integralRatio,
            remark: this.CommonData.remark,
            isEnable: Number(this.CommonData.isOn),
            gradeIdList:this.CommonData.gradeIdList,
            mspageId:this.CommonData.mspageId,
            // mspageId:'',
            // couponIdList:'',
            // 参数说明: 登录商城次数 浏览时长 	每次登录获取积分数 分享商品次数 每次分享商品获取积分数
            //           每天评价商品次数 每次评价商品获取积分数 完善个人信息获取积分数 首单获取积分数
          }).then(res => {
            if (res && res.returnCode === 1000) {
              console.log('***********')
              console.log(res)
              this.$message.success('操作成功!')
              this.$router.push(
                {
                  name: 'CustomerVipRight',
                  query:{
                    current:this.current
                  }
                })
            }
          })
        }

      },
    }
    /*    props: {
          formData: {
            type: Object
          }
        },
        components: {
          // ImageUploadList,
          // RadioSearchTable,
          Example,
          uploadModal
        },
        data() {
          return {
            rightType: 'MakePoint',
            CommonData: {
              gradeIdList:[],
              // 权益名称
              generalName:"",
              //展示名称
              benefitName:"",
              benefitIcon: '',
              remark: '',
              isOn: true,

              remarkTopPicture:'',


            },
            // selectImageShow:false,
            // 会员等级列表
            vipList:[],

            // 示例相关
            exampleVisible:false,

            // 选择图片相关
            chooseimgVisivle:false,
            imgType:''
          }
        },
        created() {
          this.getVipList()
        },
        mounted() {
          // this.getInfo()
        },
        watch:{
          formData:{
            immediate:true,
            deep:true,
            handler(old,newss){
              console.log(old,newss)
              this.getInfo()
              // 获取会员列表

            }

          }
        },
        methods: {
          getInfo() {
            console.log('接收传过来的makePoint数据', this.formData)
            if (this.formData.id) {
              this.CommonData.benefitIcon = this.formData.benefitIcon
              this.CommonData.benefitName = this.formData.benefitName
              this.CommonData.generalName = this.formData.generalName
              this.CommonData.remarkTopPicture = this.formData.remarkTopPicture
              this.CommonData.remark = this.formData.remark
              //gradeIdList 后端暂时没给  只要里面的id
              // this.CommonData.gradeIdList = this.formData.gradeIdList
              for (let item of this.formData.gradeList) {
                this.CommonData.gradeIdList.push(item.id)
              }

              this.CommonData.isOn = this.formData.isEnable === 1 ? true : false

            } else {
              return
              // 获取会员列表

            }
          },
          changeIsOn(val) {
          },
          handleCancel() {
            this.$router.push({name: 'CustomerVipRight'})
          },

          submitData() {

            console.log('提交表单数据:', this.CommonData)
            // 参数说明: 权益名称, 权益类型, 权益icon, 权益说明,是否可用,积分规则,微页面id,优惠券id集合
            if (this.formData.id) {
              this.$post('goldenhome/member/admin_/member/benefits/update', {
                id: this.formData.id,
                benefitName: this.CommonData.benefitName,
                generalName: this.CommonData.generalName,
                benefitType: 3,
                benefitIcon: this.CommonData.benefitIcon,
                remarkTopPicture: this.CommonData.remarkTopPicture,
                remark: this.CommonData.remark,
                isEnable: Number(this.CommonData.isOn),
                gradeIdList:this.CommonData.gradeIdList,
                // mspageId:'',
                // couponIdList:'',
                // 参数说明: 登录商城次数 浏览时长 	每次登录获取积分数 分享商品次数 每次分享商品获取积分数
                //           每天评价商品次数 每次评价商品获取积分数 完善个人信息获取积分数 首单获取积分数

              }).then(res => {
                if (res && res.returnCode === 1000) {
                  console.log('***********')
                  console.log(res)
                  this.$message.success('操作成功!')
                  this.$router.push({name: 'CustomerVipRight'})
                }
              })
            } else {
              this.$post('goldenhome/member/admin_/member/benefits/add', {
                benefitName: this.CommonData.benefitName,
                generalName: this.CommonData.generalName,
                benefitType: 3,
                benefitIcon: this.CommonData.benefitIcon,
                remarkTopPicture: this.CommonData.remarkTopPicture,
                remark: this.CommonData.remark,
                isEnable: Number(this.CommonData.isOn),
                gradeIdList:this.CommonData.gradeIdList,
                // mspageId:'',
                // couponIdList:'',
                // 参数说明: 登录商城次数 浏览时长 	每次登录获取积分数 分享商品次数 每次分享商品获取积分数
                //           每天评价商品次数 每次评价商品获取积分数 完善个人信息获取积分数 首单获取积分数
              }).then(res => {
                if (res && res.returnCode === 1000) {
                  console.log('***********')
                  console.log(res)
                  this.$message.success('操作成功!')
                  this.$router.push({name: 'CustomerVipRight'})
                }
              })
            }

          },

          openModel(){
            this.visible = true
          },
          closeModal(){
            this.visible = false
          },


          async getVipList() {
            const res = await this.$get('goldenhome/member/admin_/member/gradeconfig/list')
            if (res && res.returnCode === 1000) {
              // this.$message.success('操作成功!')
              console.log(res)
              res.dataInfo.forEach((item) => {
                const {id, gradeName, ...other} = item
                this.vipList[this.vipList.length] = {id, gradeName}
              })

              this.vipList.forEach((item) => {
                this.$set(item, "gradeId", item.id)
                this.$set(item, "label", item.gradeName)
                this.$set(item, "value", item.id)
                // this.$set(item, "use", 0)
              })

              this.vipList = this.unique(this.vipList)
              console.log('this.vipList', this.vipList)
            }
          },
          checkChange(checkedValues){
            console.log('checked = ', checkedValues);
            console.log('value = ', this.CommonData.gradeIdList);
          },


          openExampleModel(){
            this.exampleVisible = true
          },
          closeExampleModel(){
            this.exampleVisible = false
          },

          // 素材库modal 相关
          updateImgUrl(type) {
            console.log(type)
            this.imgType = type
            this.chooseimgVisivle = true;
          },
          deleteImg(type) {
            console.log(type)
            this.imgType = type
            console.log(this.imgType)
            // console.log()
            if (this.imgType=='remarkTopPicture'){
              this.CommonData.remarkTopPicture = ''
            }
            if (this.imgType=='benefitIcon'){
              this.CommonData.benefitIcon = ''
            }
            /!* console.log(type)
             this.CommonData.remarkTopPicture = ''
             this.painting.views[0].url = ''*!/

          },
          getPopupContainer() {
            return (triggerNode) => triggerNode.parentNode;
          },
          getImgUrl(value) {
            // console.log(value)
            if (this.imgType=='remarkTopPicture'){
              this.CommonData.remarkTopPicture = value
            }
            if (this.imgType=='benefitIcon'){
              this.CommonData.benefitIcon = value
            }

          },

          closeInfoModal() {
            this.chooseimgVisivle = false;
          },


          // 对象去重
          unique(objArray){
            let result = {};
            let finalResult=[];
            for(let i=0;i<objArray.length;i++){
              result[objArray[i].gradeName]=objArray[i];
            }
            for(let item in result){
              finalResult.push(result[item]);
            }
            return finalResult;
          }
        },*/
  }
</script>

<style scoped lang="less">
  .upload_btn{
    width: 104px;
    height: 104px;
    margin: 0 8px 8px 0;
    text-align: center;
    font-size:24px;
    cursor: pointer;
    line-height: 96px;
    padding: 8px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    background:#fafafa;
    display:inline-block;
  }


  .shareImgBox {
    display: flex;
    /*justify-content: space-around;*/
    width: 100%;
    .mini,
    .h5 {
      width: 160px;
      height: 120px;
      background: rgb(238, 240, 244);
      .image_wrap {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-color: #fff;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        .hoverBox {
          background: rgba(25, 25, 25, 0.4);
          border-radius: 4px;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 99999999;
          display: none;
          div {
            width: 50px;
            height: 26px;
            background: #ffffff;
            border-radius: 2px;
            border: 1px solid #979797;
            line-height: 26px;
            font-weight: 400;
            text-align: center;
            margin: auto;
          }
          .delBtn {
            color: #ff5253;
            margin-top: 25px;
          }
          .updatelBtn {
            margin-top: 15px;
            color: #666666;
          }
        }
        .image {
          width: 100%;
          height: 100%;
          border-radius: 4px;
        }
        .text {
          width: 100%;
          background-color: rgba(0, 0, 0, 0.6);
          color: #fff;
          position: absolute;
          bottom: 0;
          text-align: center;
          white-space: nowrap;
          line-height: 30px !important;
          font-size: 16px;
        }
      }
      &:hover {
        .hoverBox {
          display: block;
        }
      }
    }
  }
  .action {
    width: 100%;
    padding: 0 10px;
    margin-top: 60px;
  }
  .addBox {
    display: flex;
    /*width: 100%;*/
    /*height: 100%;*/
    justify-content: center;
    align-items: center;
  }

  /deep/.ant-form-item-control{
    line-height: 25px;
  }
  /deep/.ant-popover-buttons {
    display: flex;
  }
  /deep/ .ant-form-item .ant-switch{
    margin: 9px 0 4px;
  }
</style>
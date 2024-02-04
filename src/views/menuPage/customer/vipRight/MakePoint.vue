<template>
  <div>
      <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">

    <!--      <a-form-item  >
              <template slot="label">
                  <span class="ant-form-item-required">选择享受权益会员级别</span>
              </template>
             <a-checkbox-group :options="vipList"  v-model="makePointData.gradeIdList" @change="checkChange">

             </a-checkbox-group>
          </a-form-item>-->
          <a-form-item  label="选择享受权益会员级别">
              <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">
                  全选
              </a-checkbox>
              <br>
              <a-checkbox-group :options="vipList"  v-model="makePointData.gradeIdList" @change="checkChange">
              </a-checkbox-group>
          </a-form-item>
          <a-form-item >
              <template slot="label">
                  <span class="ant-form-item-required">权益名称</span>
              </template>
              <a-input :style="{width:'200px'}" v-model="makePointData.generalName"></a-input>
          </a-form-item>

          <a-form-item >
              <template slot="label">
                  <span class="ant-form-item-required">展示名称</span>
              </template>
              <a-input :style="{width:'200px'}" :maxLength="7" v-model="makePointData.benefitName"></a-input>
          </a-form-item>


          <a-form-item>
              <template slot="label">
                  <span class="ant-form-item-required">权益内容</span>
              </template>
              <br>
              <a-checkbox v-model="makePointData.login" @change="loginChange">每次登录商城获取:</a-checkbox>
              <a-input-number :style="{width:'100px'}" :min="0" :disabled="!makePointData.login" v-model="makePointData.everyTimeLoginPoints"></a-input-number>
              积分,
              每天最多
              <a-input-number :style="{width:'100px'}" :min="0" :disabled="!makePointData.login" v-model="makePointData.loginCount"></a-input-number>
              次，
              每次需要浏览
              <a-input-number :style="{width:'100px'}" :min="0" :disabled="!makePointData.login" v-model="makePointData.browseTime"></a-input-number>
              秒
              <br>
              <div style="height: 15px"></div>

              <a-checkbox v-model="makePointData.share" @change="shareChange">每次分享商品获取:</a-checkbox>
              <a-input-number :style="{width:'100px'}" :min="0" :disabled="!makePointData.share" v-model="makePointData.everyTimeSharePoints"></a-input-number>
              积分,
              每天最多
              <a-input-number :style="{width:'100px'}" :min="0" :disabled="!makePointData.share" v-model="makePointData.shareGoodCount"></a-input-number>
              次
              <br>
              <div style="height: 15px"></div>

              <a-checkbox v-model="makePointData.comment" @change="commentChange">每次评论获取:</a-checkbox>
              <a-input-number :style="{width:'100px'}" :min="0" :disabled="!makePointData.comment" v-model="makePointData.everyTimeReviewPoints"></a-input-number>
              积分,
              每天最多
              <a-input-number :style="{width:'100px'}" :min="0" :disabled="!makePointData.comment" v-model="makePointData.reviewGoodCount"></a-input-number>
              次
              <br>
              <div style="height: 15px" ></div>
              <a-checkbox @change="completeInfoChange" v-model="makePointData.completeInfo">完善个人信息:</a-checkbox>
              <a-input-number :style="{width:'100px'}" :min="0" :disabled="!makePointData.completeInfo" v-model="makePointData.improvePersonalInfoPoints"></a-input-number> 积分
              <br>
              <div style="height: 15px"></div>

              <a-checkbox @change="firstBuyChange" v-model="makePointData.firstBuy">首单赠送:</a-checkbox>
              <a-input-number :style="{width:'100px'}" :min="0" :disabled="!makePointData.firstBuy" v-model="makePointData.firstOrderPoints"></a-input-number>
              积分 <span style="color:darkgray">&nbsp;&nbsp;&nbsp;注：设置用户首次下单额外赠送的积分数</span>
              <br>
              <div style="height: 15px"></div>

           <!--   <a-checkbox v-model="makePointData.addVX" @change="addVXChange">添加企微:</a-checkbox>
              <a-input-number :style="{width:'100px'}"  :min="0" :disabled="!makePointData.addVX" v-model="makePointData.enterpriseWxPoints"></a-input-number>
              积分
              <br>
              <div style="height: 15px"></div>-->
              <a-checkbox v-model="makePointData.focusGZH" @change="focusGZHchange">关注公众号:</a-checkbox>
              <a-input-number :style="{width:'100px'}" :min="0" :disabled="!makePointData.focusGZH" v-model="makePointData.attentionOfficialAccountPoints"></a-input-number>
              积分 <a-button type="link" @click="openModel" :disabled="!makePointData.focusGZH || makePointData.attentionOfficialAccountPoints<=0">{{makePointData.chooseActPage}}>></a-button> <span style="color: darkgray;">注：需先在店铺装修使用公众号组件配置微页面</span>
              <br>
          </a-form-item>

          <a-form-item >

              <template slot="label">
                  <span class="ant-form-item-required">权益图标</span>
              </template>
              <div class="shareImgBox">
                  <div class="h5">
                      <div class="image_wrap" :style="{
                                                background: makePointData.benefitIcon
                                                  ? `url(${makePointData.benefitIcon}) no-repeat 50% 50% /cover`
                                                  : '',
                                              }">

                          <div class="hoverBox" v-if="makePointData.benefitIcon">
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

       <!--   <a-form-item label="*权益图标">
              <ImageUploadList
                :limit="1"
                :multiple="true"
                v-model="makePointData.benefitIcon"
              >
              </ImageUploadList>
              <div class="desc">建议72*72像素的png照片</div>
          </a-form-item>-->
          <br>
          <hr>
          <div style="height: 25px;"></div>
          <div>
              <span>权益说明</span>
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
                                                background: makePointData.remarkTopPicture
                                                  ? `url(${makePointData.remarkTopPicture}) no-repeat 50% 50% /cover`
                                                  : '',
                                              }">

                              <div class="hoverBox" v-if="makePointData.remarkTopPicture">
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
                  <tinymce-editor v-model="makePointData.remark"></tinymce-editor>
              </a-col>
          </a-form-item>

          <a-form-item >
              <template slot="label">
                  <span class="ant-form-item-required ">是否启用</span>
              </template>
              <a-switch  v-model="makePointData.isOn" @change="changeIsOn"></a-switch>
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
            :chooseId="makePointData.attentionMspageId"
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
    import ImageUploadList from '@/components/form/UploadImage'
    import uploadModal from "@components/antBase/uploadModal.vue";
    // import ImageUploadList from '../components/UploadImage'
    import RadioSearchTable from './radioSearchTable'
    import Example from "./viprightcomponents/Example";
    export default {
        name: "MakePoint",
        // 这有问题
        props: {
            formData: {
                type: Object
            },
            current:{
                default:1
            }
        },
        components: {
            ImageUploadList,
            RadioSearchTable,
            Example,
            uploadModal
        },
        data() {
            return {
                indeterminate: false,
                checkAll: false,
                rightType: 'MakePoint',
                makePointData: {
                    gradeIdList:[],
                    // 权益名称
                    generalName:"",
                    //展示名称
                    benefitName:"",
                    benefitIcon: '',
                    remark: '',
                    isOn: true,

                    everyTimeLoginPoints: 0,
                    loginCount: 0,
                    browseTime: 0,

                    everyTimeSharePoints: 0,
                    shareGoodCount: 0,

                    everyTimeReviewPoints: 0,
                    reviewGoodCount: 0,

                    improvePersonalInfoPoints: 0,
                    firstOrderPoints: 0,
                    // 添加企微
                    // enterpriseWxPoints:0,
                    // 页面id
                    attentionMspageId:'',
                    // 微页面汉字
                    chooseActPage:'选择微页面',
                    attentionOfficialAccountPoints:0,
                    remarkTopPicture:'',


                    // checkbox工具变量
                    login:false,
                    share:false,
                    comment:false,
                    completeInfo:false,
                    firstBuy:false,
                    // addVX:false,
                    focusGZH:false,


                },
                // selectImageShow:false,
                // 会员等级列表
                vipList:[],
                //微页面modal相关
                // model相关
                url:'goldenhome/decoration/admin_/page/ms/page',
                visible:false,
                title:'选择活动页面',
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
            checkChange(checkedList) {
                this.indeterminate = checkedList.length!=0 && checkedList.length < this.vipList .length;
                this.checkAll = checkedList.length === this.vipList.length;
                console.log( this.makePointData.gradeIdList)
            },
            onCheckAllChange(e) {
                console.log(e.target.checked)
                if (e.target.checked == true){
                    let vipIds = []
                    this.vipList.forEach((item,index)=>{
                        vipIds.push(item.id)
                    })
                    this.makePointData.gradeIdList = vipIds
                    this.indeterminate = false
                    this.checkAll = true
                    console.log( this.makePointData.gradeIdList)
                }
                if (e.target.checked ===false){
                    this.makePointData.gradeIdList = []
                    this.indeterminate = false
                    this.checkAll = false
                    console.log( this.makePointData.gradeIdList)
                }

            },
            getInfo() {
                console.log('接收传过来的makePoint数据', this.formData)
                if (this.formData.id) {
                    this.makePointData.benefitIcon = this.formData.benefitIcon
                    this.makePointData.benefitName = this.formData.benefitName
                    this.makePointData.generalName = this.formData.generalName
                    this.makePointData.remarkTopPicture = this.formData.remarkTopPicture
                    this.makePointData.remark = this.formData.remark
                    //gradeIdList 后端暂时没给  只要里面的id
                    this.makePointData.gradeIdList = this.formData.gradeList
                   /* for (let item of this.formData.gradeList) {
                        this.makePointData.gradeIdList.push(item.id)
                    }*/

                    this.makePointData.isOn = this.formData.isEnable === 1 ? true : false
                    // this.makePointData.attentionMspageId = this.formData.mspageId
                    // this.makePointData.
                    this.makePointData.everyTimeLoginPoints = this.formData.pointsRuleQueryResponse.everyTimeLoginPoints
                    this.makePointData.loginCount = this.formData.pointsRuleQueryResponse.loginCount
                    this.makePointData.browseTime = this.formData.pointsRuleQueryResponse.browseTime

                    this.makePointData.everyTimeSharePoints = this.formData.pointsRuleQueryResponse.everyTimeSharePoints
                    this.makePointData.shareGoodCount = this.formData.pointsRuleQueryResponse.shareGoodCount

                    this.makePointData.everyTimeReviewPoints = this.formData.pointsRuleQueryResponse.everyTimeReviewPoints
                    this.makePointData.reviewGoodCount = this.formData.pointsRuleQueryResponse.reviewGoodCount

                    this.makePointData.improvePersonalInfoPoints = this.formData.pointsRuleQueryResponse.improvePersonalInfoPoints
                    this.makePointData.firstOrderPoints = this.formData.pointsRuleQueryResponse.firstOrderPoints

                    // this.makePointData.enterpriseWxPoints = this.formData.pointsRuleQueryResponse.enterpriseWxPoints
                    this.makePointData.attentionOfficialAccountPoints = this.formData.pointsRuleQueryResponse.attentionOfficialAccountPoints
                    this.makePointData.attentionMspageId = this.formData.pointsRuleQueryResponse.attentionMspageId
                    // 根据微页面id获取汉字
                    if (this.makePointData.attentionMspageId){
                        this.$get('goldenhome/decoration/admin_/page/ms/query', {id: this.makePointData.attentionMspageId})
                            .then((res) => {
                                if (res && res.returnCode === 1000) {
                                    console.log('***********')
                                    console.log(res.dataInfo)
                                    this.makePointData.chooseActPage = res.dataInfo.pageInfo.pageName
                                    // this.chooseActObj = res.dataInfo.pageInfo
                                    // this.$message.success('操作成功!')
                                }
                            })
                    }
                    // 多选框勾选问题
                    if (this.makePointData.everyTimeLoginPoints >0 || this.makePointData.loginCount>0 || this.makePointData.browseTime){
                        this.makePointData.login = true
                    }

                    if (this.makePointData.everyTimeSharePoints >0 || this.makePointData.shareGoodCount>0){
                        this.makePointData.share = true
                    }

                    if (this.makePointData.everyTimeReviewPoints >0 || this.makePointData.reviewGoodCount>0){
                        this.makePointData.comment = true
                    }

                    if (this.makePointData.improvePersonalInfoPoints >0 ){
                        this.makePointData.completeInfo = true
                    }

                    if (this.makePointData.firstOrderPoints>0){
                        this.makePointData.firstBuy = true
                    }

                   /* if (this.makePointData.enterpriseWxPoints>0){
                        this.makePointData.addVX = true
                    }*/

                    if (!!this.makePointData.attentionMspageId && this.makePointData.attentionOfficialAccountPoints>0){
                        this.makePointData.focusGZH =true
                    }
                    if (this.makePointData.gradeIdList.length>=5){
                        this.checkAll = true
                    }else if(this.makePointData.gradeIdList.length>0&&this.makePointData.gradeIdList.length<5){
                        this.indeterminate = true
                    }else{
                        this.indeterminate = false
                    }
                } else {
                    return
                    // 获取会员列表

                }
            },
            changeIsOn(val) {
            },
            handleCancel() {
                this.$router.push(
                  {
                      name: 'CustomerVipRight',
                      query:{
                          current:this.current
                      }
                  })
            },

            submitData() {

              /*  if (this.formData.vipLevel.length<1){
                    this.$message.error('身份称谓不能为空')
                    return
                }*/
             /*   if (this.makePointData.gradeIdList.length==0){
                    return this.$message.error('至少选择一个会员等级')
                }*/
                if (!this.makePointData.generalName){
                    return this.$message.error('权益名称不能为空')
                }

                if (!this.makePointData.benefitName){
                    return this.$message.error('展示名称不能为空')
                }

                if (!this.makePointData.benefitIcon){
                    return this.$message.error('请选择权益图标')
                }
                console.log('提交表单数据:', this.makePointData)
                // 参数说明: 权益名称, 权益类型, 权益icon, 权益说明,是否可用,积分规则,微页面id,优惠券id集合
                if (this.formData.id) {
                    this.$post('goldenhome/member/admin_/member/benefits/update', {
                        id: this.formData.id,
                        benefitName: this.makePointData.benefitName,
                        generalName: this.makePointData.generalName,
                        benefitType: 2,
                        benefitIcon: this.makePointData.benefitIcon,
                        remarkTopPicture: this.makePointData.remarkTopPicture,
                        remark: this.makePointData.remark,
                        isEnable: Number(this.makePointData.isOn),
                        gradeIdList:this.makePointData.gradeIdList,
                        // mspageId:'',
                        // couponIdList:'',
                        // 参数说明: 登录商城次数 浏览时长 	每次登录获取积分数 分享商品次数 每次分享商品获取积分数
                        //           每天评价商品次数 每次评价商品获取积分数 完善个人信息获取积分数 首单获取积分数
                        pointsRule: {
                            loginCount: this.makePointData.loginCount,
                            browseTime: this.makePointData.browseTime,
                            everyTimeLoginPoints: this.makePointData.everyTimeLoginPoints,
                            shareGoodCount: this.makePointData.shareGoodCount,
                            everyTimeSharePoints: this.makePointData.everyTimeSharePoints,
                            reviewGoodCount: this.makePointData.reviewGoodCount,
                            everyTimeReviewPoints: this.makePointData.everyTimeReviewPoints,
                            improvePersonalInfoPoints: this.makePointData.improvePersonalInfoPoints,
                            firstOrderPoints: this.makePointData.firstOrderPoints,

                            // enterpriseWxPoints: this.makePointData.enterpriseWxPoints,
                            attentionOfficialAccountPoints: this.makePointData.attentionOfficialAccountPoints,
                            attentionMspageId: this.makePointData.attentionMspageId,
                        }
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
                        benefitName: this.makePointData.benefitName,
                        generalName: this.makePointData.generalName,
                        benefitType: 2,
                        benefitIcon: this.makePointData.benefitIcon,
                        remarkTopPicture: this.makePointData.remarkTopPicture,
                        remark: this.makePointData.remark,
                        isEnable: Number(this.makePointData.isOn),
                        gradeIdList:this.makePointData.gradeIdList,
                        // mspageId:'',
                        // couponIdList:'',
                        // 参数说明: 登录商城次数 浏览时长 	每次登录获取积分数 分享商品次数 每次分享商品获取积分数
                        //           每天评价商品次数 每次评价商品获取积分数 完善个人信息获取积分数 首单获取积分数
                        pointsRule: {
                            loginCount: this.makePointData.loginCount,
                            browseTime: this.makePointData.browseTime,
                            everyTimeLoginPoints: this.makePointData.everyTimeLoginPoints,
                            shareGoodCount: this.makePointData.shareGoodCount,
                            everyTimeSharePoints: this.makePointData.everyTimeSharePoints,
                            reviewGoodCount: this.makePointData.reviewGoodCount,
                            everyTimeReviewPoints: this.makePointData.everyTimeReviewPoints,
                            improvePersonalInfoPoints: this.makePointData.improvePersonalInfoPoints,
                            firstOrderPoints: this.makePointData.firstOrderPoints,

                            // enterpriseWxPoints: this.makePointData.enterpriseWxPoints,
                            attentionOfficialAccountPoints: this.makePointData.attentionOfficialAccountPoints,
                            attentionMspageId: this.makePointData.attentionMspageId,
                        }
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




            loginChange(e){
                console.log(`checked = ${e.target.checked}`)
                this.makePointData.login = e.target.checked
                console.log( this.makePointData.login)

                if (e.target.checked===false){
                    this.makePointData.everyTimeLoginPoints= 0
                    this.makePointData.loginCount = 0
                    this.makePointData.browseTime = 0
                }
            },
            shareChange(e){
                console.log(`checked = ${e.target.checked}`)
                this.makePointData.share = e.target.checked
                console.log( this.makePointData.share)

                if (e.target.checked===false){
                    this.makePointData.everyTimeSharePoints= 0
                    this.makePointData.shareGoodCount = 0
                }
            },

            commentChange(e){
                console.log(`checked = ${e.target.checked}`)
                this.makePointData.comment = e.target.checked
                console.log( this.makePointData.comment)

                if (e.target.checked===false){
                    this.makePointData.everyTimeReviewPoints= 0
                    this.makePointData.reviewGoodCount = 0
                }
            },

            completeInfoChange(e){
                console.log(`checked = ${e.target.checked}`)
                this.makePointData.completeInfo = e.target.checked
                console.log( this.makePointData.completeInfo)

                if (e.target.checked===false){
                    this.makePointData.improvePersonalInfoPoints= 0
                }
            },
            firstBuyChange(e){
                console.log(`checked = ${e.target.checked}`)
                this.makePointData.firstBuy = e.target.checked
                console.log( this.makePointData.firstBuy)

                if (e.target.checked===false){
                    this.makePointData.firstOrderPoints= 0
                }
            },

            addVXChange(e){
                console.log(`checked = ${e.target.checked}`)
                this.makePointData.addVX = e.target.checked
                console.log( this.makePointData.addVX)

                if (e.target.checked===false){
                    this.makePointData.enterpriseWxPoints= 0
                }
            },
            focusGZHchange(e){
                console.log(`checked = ${e.target.checked}`)
                this.makePointData.focusGZH = e.target.checked
                console.log( this.makePointData.focusGZH)

                if (e.target.checked===false){
                    this.makePointData.attentionOfficialAccountPoints= 0
                    this.makePointData.attentionMspageId= ''
                    this.makePointData.chooseActPage= '选择微页面'
                }
            },

            openModel(){
                this.visible = true
            },
            closeModal(){
                this.visible = false
            },
            handleSubmit(){
                // 得到获取的微页面
                console.log(this.$refs.searchtable.selectedRows)
                this.makePointData.chooseActPage = this.$refs.searchtable.selectedRows[0].pageName
                this.makePointData.attentionMspageId = this.$refs.searchtable.selectedRows[0].id
                console.log(this.chooseActPage,this.makePointData.attentionMspageId)
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
                    this.makePointData.remarkTopPicture = ''
                }
                if (this.imgType=='benefitIcon'){
                    this.makePointData.benefitIcon = ''
                }
                /* console.log(type)
                 this.makePointData.remarkTopPicture = ''
                 this.painting.views[0].url = ''*/

            },
            getPopupContainer() {
                return (triggerNode) => triggerNode.parentNode;
            },
            getImgUrl(value) {
                // console.log(value)
                if (this.imgType=='remarkTopPicture'){
                    this.makePointData.remarkTopPicture = value
                }
                if (this.imgType=='benefitIcon'){
                    this.makePointData.benefitIcon = value
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
        },
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
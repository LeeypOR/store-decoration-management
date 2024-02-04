
<template>
  <a-card title="会员权益/编辑权益" class="add_edit_product">
    <a-form :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }">
      <a-form-item label="权益类型">
        <a-radio-group  v-model="rightType" size="large" @change="" :disabled="isTrue">
          <a-radio value="OpenCardGift">
            开卡礼
          </a-radio>
          <a-radio value="MakePoint">
            赚积分
          </a-radio>
          <a-radio value="BuyAndReturnPoint">
            购物返积分
          </a-radio>
          <a-radio value="HomeConsultant">
            家居顾问
          </a-radio>

          <a-radio value="BirthdayGift">
            生日礼包
          </a-radio>

          <a-radio value="UpLevelGift">
            升级礼包
          </a-radio>

          <a-radio value="VipDay">
            会员日
          </a-radio>

          <a-radio value="ExchangePoint">
            积分兑换
          </a-radio>

          <a-radio value="VipPrice">
            超省会员价
          </a-radio>

        <!--  <a-radio value="InnerBuyPermission">
            内购权限
          </a-radio>-->

          <a-radio value="SelfSettingRight">
            自定义权益
          </a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>

    <!--<keep-alive>
      <template v-if="rightType==='makePoint'">
        <MakePoint></MakePoint>
      </template>
    </keep-alive>-->
      <template v-if="rightType==='OpenCardGift'">
        <OpenCardGift ref="OpenCardGift" :current="current" :formData="formData"></OpenCardGift>
      </template>

      <template v-if="rightType==='MakePoint'">
        <MakePoint ref="MakePoint" :current="current" :formData="formData"></MakePoint>
      </template>

    <template v-if="rightType==='BuyAndReturnPoint'">
      <BuyAndReturnPoint ref="BuyAndReturnPoint" :current="current" :formData="formData"></BuyAndReturnPoint>
    </template>

      <template v-if="rightType==='HomeConsultant'">
        <HomeConsultant ref="HomeConsultant" :current="current" :formData="formData"></HomeConsultant>
      </template>

      <template v-if="rightType==='UpLevelGift'">
        <UpLevelGift ref="UpLevelGift" :current="current" :formData="formData"></UpLevelGift>
      </template>

      <template v-if="rightType==='BirthdayGift'">
        <BirthdayGift ref="BirthdayGift" :current="current" :formData="formData"></BirthdayGift>
      </template>

    <template v-if="rightType==='VipDay'">
      <VipDay ref="VipDay" :current="current" :formData="formData"></VipDay>
    </template>

      <template v-if="rightType==='ExchangePoint'">
        <ExchangePoint ref="ExchangePoint" :current="current" :formData="formData"></ExchangePoint>
      </template>

    <template v-if="rightType==='VipPrice'">
      <VipPrice ref="VipPrice" :current="current" :formData="formData"></VipPrice>
    </template>
      <template v-if="rightType==='SelfSettingRight'">
        <SelfSettingRight :current="current" ref="SelfSettingRights" :formData="formData"></SelfSettingRight>
      </template>




  </a-card>
</template>

<script>
  import ImageUploadList from './components/UploadImage'
  import SearchTable from "@/components/form/SearchTable";
  // 权益具体 圈圈组件
  import UpLevelGift from "./vipRight/UpLevelGift";
  import SelfSettingRight from "./vipRight/SelfSettingRight";
  import MakePoint from "./vipRight/MakePoint";
  import InnerBuyPermission from "./vipRight/InnerBuyPermission";
  import HomeConsultant from "./vipRight/HomeConsultant";
  import BirthdayGift from "./vipRight/BirthdayGift";

  import VipPrice from "./vipRight/VipPrice";
  import VipDay from "./vipRight/VipDay";
  import OpenCardGift from "./vipRight/OpenCardGift";
  import ExchangePoint from "./vipRight/ExchangePoint";
  import BuyAndReturnPoint from "./vipRight/BuyAndReturnPoint";
  export default {
    name: 'vipRightDetail',
    components: {
      ImageUploadList,
      SearchTable,
      MakePoint,
      InnerBuyPermission,
      HomeConsultant,
      BirthdayGift,
      SelfSettingRight,
      UpLevelGift,

      VipPrice,
      VipDay,
      OpenCardGift,
      ExchangePoint,
      BuyAndReturnPoint

    },
    created() {
     /* this.current = this.$route.query.current
      console.log( this.current)*/
      this.getRightInfo()

    },
    computed: {
        current(){
          return this.$route.query.current
        }
    },
    data() {
      return {

        rightType:'OpenCardGift',
        // 如果是修改的时候 按钮组不给用
        isTrue:false,
        formData:{
            gradeList:[]
        },
        radioStyle: {

        },

      }
    },
    watch: {

    },
    methods: {

      getRightInfo(){
        console.log(this.$route.query.id)
          if (this.$route.query.id !==undefined){
            console.log(this.$route.query.id)
            this.$get('goldenhome/member/admin_/member/benefits/id', {id:this.$route.query.id}).then(res => {
              if (res && res.returnCode === 1000) {
                  console.log(res)
                  switch (res.dataInfo.benefitType) {
                    case 1:
                      this.rightType='OpenCardGift'
                      this.isTrue = true
                      this.formData = res.dataInfo
                      this.formData.gradeList = this.$route.query.gradeList
                      console.log('即将传的数据:',this.formData)
                      break
                    case 2:
                      this.rightType='MakePoint'
                      this.isTrue = true
                      this.formData = res.dataInfo
                      this.formData.gradeList = this.$route.query.gradeList
                      console.log('即将传的数据:',this.formData)
                      break
                    case 3:
                      this.rightType='BuyAndReturnPoint'
                      this.isTrue = true
                      this.formData = res.dataInfo
                      this.formData.gradeList = this.$route.query.gradeList
                      console.log('即将传的数据:',this.formData)
                      break
                    case 4:
                      this.rightType='ExchangePoint'
                      this.isTrue = true
                      this.formData = res.dataInfo
                      this.formData.gradeList = this.$route.query.gradeList
                      console.log('即将传的数据:',this.formData)
                      break
                    case 5:
                      this.rightType='HomeConsultant'
                      this.isTrue = true
                      this.formData = res.dataInfo
                      this.formData.gradeList = this.$route.query.gradeList
                      console.log('即将传的数据:',this.formData)
                      break
                    case 6:
                      this.rightType='BirthdayGift'
                      this.isTrue = true
                      this.formData = res.dataInfo
                      this.formData.gradeList = this.$route.query.gradeList
                      console.log('即将传的数据:',this.formData)
                      break
                    case 7:
                      this.rightType='UpLevelGift'
                      this.isTrue = true
                      this.formData = res.dataInfo
                      this.formData.gradeList = this.$route.query.gradeList
                      console.log('即将传的数据:',this.formData)
                      break
                    case 8:
                      this.rightType='VipDay'
                      this.isTrue = true
                      this.formData = res.dataInfo
                      this.formData.gradeList = this.$route.query.gradeList
                      console.log('即将传的数据:',this.formData)
                      break
                    case 9:
                      this.rightType='VipPrice'
                      this.isTrue = true
                      this.formData = res.dataInfo
                      this.formData.gradeList = this.$route.query.gradeList
                      console.log('即将传的数据:',this.formData)
                      break
                    case 10:
                      this.rightType='SelfSettingRight'
                      this.isTrue = true
                      this.formData = res.dataInfo
                      this.formData.gradeList = this.$route.query.gradeList
                      console.log('即将传的数据:',this.formData)
                      break
                    /*case 10:
                      this.rightType='SelfSettingRight'
                      this.isTrue = true
                      this.formData = res.dataInfo
                      console.log('即将传的数据:',this.formData)
                      break*/
                  }
              }
            })
          }else {
            return
          }
      },

      vipLevelChange(val){

      },
      onChange(value){

      },
      handleProductImageChange(val){

      },
      handleProductImageChange2(val){

      },
      handleChange(){

      },
      changeNumber(){

      },
      changeIsOn(val){

      },

      downRuleChange(){

      },
      openModel(){
        this.visible = true
      },
      handleCancel(){

      },

      submitData(){
        console.log('表单数据:',this.formData)
      },

      // 弹框相关
      handleSubmit(){

      },
      closeModal(){
        this.visible = false
      }
    },


  }
</script>
<style lang="less" scoped>

  /deep/.ant-upload.ant-upload-select-picture-card{
    width: 75px;
    height: 75px;
  }
  .add_edit_product{
    width: 100%;
  }
  .finalColor{
    width:60px;
    height:30px;
    background-color:black;

  }

</style>

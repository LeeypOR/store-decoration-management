<template>
  <!--
      思路
      供应商 与分销商状态节点
      未注册(提示注册语)，
      注册提交等待中(提示等待)，
      注册成功(展示正常的菜单) ，
      注册失败 (状态从接口获取) 提示重新注册
-->
  <div class="dashboard new-dashboard">


    <div class="default" v-show="type!==1 && type!==2">
      <img src="~@images/dashboard.png" alt="">
    </div>



    <div class="default" v-show="(type==1 && auditStatuse ==1) ||( type==2&&auditStatuse ==1)">
      <img src="~@images/dashboard.png" alt="">
    </div>

    <!--<template v-if="type==1 || type ==2">
      <div class="supplier-tips" v-show="(auditStatuse ==null || auditStatuse ==-1 || auditStatuse==0) && (rigs==false)">
        您好，<span style="color:red;">{{ userInfo.userName }}!  </span>
        <span v-show="type==1">成为供应商还需要完善入驻资料</span>
        <span v-show="type==2">成为分销商还需要完善入驻资料</span>
        <br>
        <br>
        <a-button type="primary" @click="editInfo"> 马上填写</a-button>
      </div>

      <div class="supplier-tips" v-show="auditStatuse ==2  && type==1">
        <p>提交成为供应商的资料还在审核中，请耐心等待。</p>
      </div>
      <div class="supplier-tips" v-show="auditStatuse ==2 && type==2">
        <p>提交成为分销商的资料还在审核中，请耐心等待。</p>
      </div>

      <div class="supplier-tips" v-show="(auditStatuse==3 || auditStatuse==4) &&(rigs ==false) && (type==1)">
        <p>您提交的入驻资料有误，请修改后重新提交，<span @click="editInfo($event)">重新填写资料>></span></p>
      </div>
      <div class="supplier-tips" v-show="(auditStatuse==3 || auditStatuse==4) &&(rigs ==false) &&(type==2)">
        <p>您提交的入驻资料有误，请修改后重新提交，<span @click="editInfo($event)">重新填写资料>></span></p>
      </div>

<<<<<<< HEAD
<<<<<<< HEAD
=======
    <div class="default2" v-show="(type==1 ||  type == 2) && auditStatuse !==1 && rigs==false">
      <img src="~@images/bg.png" alt="">
    </div>

    <template v-if="type == 1 || type == 2">
>>>>>>> 20211105
=======
>>>>>>> taoshanwen
      <div class="supplier-tips" v-show="rigs">
        <a-form-model ref="ruleForm"
                      style="width: 800px"
                      :model="formData"
                      :rules="rules"
                      :label-col="{ lg: { span: 5 }, sm: { span: 5 } }"
                      :wrapper-col="{ lg: { span: 15 }, sm: { span: 15 } }">
        &lt;!&ndash;分销商与供应商只有一个名字不一样其他数据相同&ndash;&gt;
        <template v-if="type==1">
          <a-form-model-item label="公司名称" prop="supplierName">
            <a-input
              v-model="formData.supplierName"
              :maxLength="50"
              name="supplierName"
              placeholder="最多50位"
            />
          </a-form-model-item>
        </template>

            <template v-if="type==2">
              <a-form-model-item label="公司名称" prop="companyName">
                <a-input
                  v-model="formData.companyName"
                  :maxLength="50"
                  name="supplierName"
                  placeholder="最多50位"
                />

              </a-form-model-item>
            </template>


          <a-form-model-item label="企业证件类型" prop="enterpriseIdentificationType">
            <a-select
              v-model="formData.enterpriseIdentificationType"
              :options="enterpriseIdentificationTypeList"
            >
            </a-select>
          </a-form-model-item>

          <a-form-model-item label="企业证件号码" prop="enterpriseIdentificationNumber">
            <a-input
              v-model="formData.enterpriseIdentificationNumber"
              :maxLength="32"
              name="enterpriseIdentificationNumber"
              placeholder="最多50位"
            />
          </a-form-model-item>

          <a-form-model-item label="企业对公账号" prop="bankCardNum">
            <a-input
              v-model="formData.bankCardNum"
              :maxLength="32"
              name="bankCardNum"
              placeholder="最多32位"
            />
          </a-form-model-item>

          <a-form-model-item label="开户银行" prop="bankOpenId">
            <a-select
              style="width: 250px"
              show-search
              v-model="formData.bankOpenId"
              placeholder="请选择或输入开户银行"
              option-filter-prop="children"
              :filter-option="filterOption"
              @change="changeBankOpenName">
              <a-select-option v-for="item in bankOpenNameList"
                               :key="item.value"
                               :value="item.value">{{ item.label }}</a-select-option>
            </a-select>
          </a-form-model-item>


          <a-form-model-item label="企业预留经办人手机号" prop="enterpriseOperatorPhone">
            <a-input
              v-model="formData.enterpriseOperatorPhone"
              :maxLength="11"
              name="enterpriseOperatorPhone"
              placeholder="最多32位"
            />
          </a-form-model-item>


          <a-form-model-item label="组织机构代码" prop="organizationCode">
            <a-input
              v-model="formData.organizationCode"
              :maxLength="32"
              name="organizationCode"
              placeholder="最多32位"
            />
          </a-form-model-item>

          <a-form-model-item label="法人姓名" prop="legalPersonName">
            <a-input
              v-model="formData.legalPersonName"
              :maxLength="32"
              name="legalPersonName"
              placeholder="最多32位"
            />
          </a-form-model-item>


          <a-form-model-item label="法人性别" prop="legalPersonSex">
            <a-radio-group v-model="formData.legalPersonSex">
              <a-radio :value="0">男</a-radio>
              <a-radio :value="1">女</a-radio>
            </a-radio-group>
          </a-form-model-item>

          <a-form-model-item label="法人证件类型" prop="legalCertificateType">
            <a-select
              v-model="formData.legalCertificateType"
              :options="legalCertificateTypeList" >
            </a-select>
          </a-form-model-item>



          <a-form-model-item label="法人证件号码" prop="legalCertificateNumber">
            <a-input
              v-model="formData.legalCertificateNumber"
              :maxLength="32"
              name="legalCertificateNumber"
              placeholder="最多32位"
            />
          </a-form-model-item>

          <a-form-model-item label="企业电子邮箱" prop="legalCertificateEmail">
            <a-input
              v-model="formData.legalCertificateEmail"
              :maxLength="32"
              name="legalCertificateEmail"
              placeholder="最多32位"
            />
          </a-form-model-item>

          <a-form-model-item label="经营范围" prop="businessScope">
            <a-select
              v-model="formData.industry"
              :options="industryList" >
            </a-select>
          </a-form-model-item>

          <a-form-model-item label="审核状态" prop="" class="fzcolor">
            <div>{{formData.status}}</div>
          </a-form-model-item>

          <a-form-model-item label="审核备注" prop="" class="fzcolor">
            <div>{{formData.note}}</div>
          </a-form-model-item>

          <a-form-model-item :wrapperCol="{ span: 24 }" style="text-align: center">
            <a-button type="primary"
                      @click="handleSubmit">提交</a-button>
            <a-button style="margin-left: 8px" @click="backPreStep">返回</a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
    </template>-->
    <SupAndDis :id="id" :types="type" :auditStatuses="auditStatuse"></SupAndDis>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import deepCopy from "@/utils/deepCopy";
import regex from "@/utils/regex";
import SupAndDis from "@/views/menuPage/SupAndDis.vue"
export default {

  created() {
    this.getInfo()
    // this.getBankOpenNameList()
  },

  mounted() {
      console.log('用户信息',this.userInfo)
  },
  computed: {
    ...mapGetters(["userInfo", "dictAll"]),
  },
  components:{
    SupAndDis
  },
  data() {
    return {
      //step 控制页面显示情况
      //供应商 分销商编码
      id:'',
      // type :1供应商 2 分销商
      type:null,
      // 用户状态 0待审核  1审核成功  2等待人工审核  3 人工审核失败(信息有问题)  4人工审核失败(照片有问题)
      // 同时用户页面显示情况
      auditStatuse: null,

     /* enterpriseIdentificationTypeList:[
        { label:'营业执照', value:1 },
        { label:'其他主体资格证明文件', value:2 }
      ],
      legalCertificateTypeList:[
        { label:'身份证', value:1 },
      ],
      industryList:[
        { label:'农、林、牧、渔业', value:"A" },
        { label:'采矿业', value:"B" },
        { label:'制造业', value:"C" },
        { label:'电力、热力、燃气及水生产和供应业', value:"D" },
        { label:'建筑业', value:"E" },
        { label:'批发和零售业', value:"F" },
        { label:'交通运输、仓储和邮政业', value:"G" },
        { label:'住宿和餐饮业', value:"H" },
        { label:'信息传输、软件和信息技术服务业', value:"I" },
        { label:'金融业', value:"J" },
        { label:'房地产业', value:"K" },
        { label:'租赁和商务服务业', value:"L" },
        { label:'科学研究和技术服务业', value:"M"},
        { label:'水利、环境和公共设施管理业', value:"N" },
        { label:'居民服务、修理和其他服务业', value:"O" },
        { label:'教育', value:"P" },
        { label:'卫生和社会工作', value:"Q" },
        { label:'文化、体育和娱乐业', value:"R" },
        { label:'公共管理、社会保障和社会组织', value:"S" },
        { label:'国际组织', value:"T" },


      ],
      bankOpenNameList: [],
      formData:{
        id:'', //供应商编码
        supplierName:'', //供应商公司名称
        companyName:'', //分销商公司名称
        enterpriseIdentificationType:'',          // 企业证件类型(1营业执照,2其他主体资格证明文件)
        enterpriseIdentificationNumber:'',        //	企业证件号码
        bankCardNum:"" ,                          // 企业对公账号
        bankOpenId :'' ,                          // 开户银行编码

        bankOpenName:'',                           //开户银行
        enterpriseOperatorPhone:'',                //企业预留经办人手机号
        organizationCode:"",                       //组织机构代码
        legalPersonName	:"",                          //	法人姓名
        legalPersonSex:0,                            //  (0男，1女)
        legalCertificateType:"",                      //  法人证件类型(1:身份证号)
        legalCertificateNumber:"",                    //  法人证件号码
        legalCertificateEmail:"",                     //	法人邮箱
        industry:"",                           	      //  经营范围
        returnUrl:"https://www.baidu.com" ,          //  返回地址
        status:"",
        note:''
      },
      rules:{
        supplierName: [{ required:true, message:'请填写公司名称'}],
        enterpriseIdentificationType: [{ required: true, message: '请选择企业证件类型' }],
        enterpriseIdentificationNumber:[{ required: true, message: '请输入企业证件号码' }],
        bankCardNum: [{ required: true, message: '请输入企业对公账号' }],
        bankOpenId:[{ required: true, message: '请选择开户银行' }],
        enterpriseOperatorPhone:[{ required: true, message: '请输入企业预留经办人手机号' }, {}],

      },
      // 国际银行注册链接
      href:'',
      // 注册表单是否显示
      rigs:false,*/




    }
  },

  methods: {
    // 获取当前用户 的国际银行注册情况
    getInfo(){
      //  分销商与供应商 相同接口
      this.$get('/distributor/registStatus').then(res => {
        if (res && res.returnCode === 1000) {
          // console.log("=========:",res)
          this.id = res.dataInfo.id
          this.type = res.dataInfo.type
          this.auditStatuse = res.dataInfo.auditStatuse

        }
      })
    },


/*    editInfo(e) {
      console.log(e)

      /!*if (this.auditStatuse ==3 ||this.auditStatuse ==4){

      }*!/
      this.getshopInfo()
      this.rigs = true

      // this.auditStatuse = 10
    },*/


  /*  getBankOpenNameList() {
      this.$get(`/bank/information/list`, {}).then(res => {
        if (res && res.returnCode === 1000 && res.dataInfo && res.dataInfo.length) {
          this.bankOpenNameList = res.dataInfo.map(item => {
            item.label = item.bankName
            item.value = item.id
            return item
          })
        }
      }).catch(err=> {
        this.bankOpenNameList = []
      })
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.indexOf(input) >= 0
      );
    },
    changeBankOpenName(val) {
      this.formData.bankOpenName = this.bankOpenNameList.filter(item => item.value == val)[0].label
    },*/


/*    handleSubmit(){
      console.log(this.formData)
      // 入驻国际银行
      // 提交最后要到第1步
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {

          let url =  this.type ==1 ? '/supplier/inBank' :'/distributor/inBank'
          this.$post(url, {...this.formData}).then(res => {
            if (res && res.returnCode === 1000) {
              console.log(res)
              this.href = res.dataInfo
              // this.$message.success('保存成功！')
              this.aclickTo()
              // 等待页面
              // this.auditStatuse = 1
            }
          })
        } else {
          console.log('error!!');
          return false;
        }
      });


    },*/
    /*backPreStep(){
      /!* if ( this.auditStatuse == -1){

       }*!/
      this.rigs = false
    },*/
    // 动态创建a标题跳往国际银行注册页面
/*    aclickTo(){
      var a = document.createElement('a');
      a.setAttribute('href', this.href);
      // a.setAttribute('target', '_blank');
      document.body.appendChild(a);
      a.click();
    },*/
    // 获取分销商 || 供应商的全部信息
   /* getshopInfo(){
      let url ;

      if (this.type==1){
         url ='/supplier/id'
      }

      if (this.type==2){
         url ='/distributor/id'
      }

        this.$get(url,{id:this.formData.id}).then((res)=>{
           if (res&&res.returnCode ==1000){
             this.formData = deepCopy(res.dataInfo)
             this.formData.returnUrl = "https://www.baidu.com"
             if (this.auditStatuse ===3){
               this.formData.note =  '人工审核失败(信息有误)'
               this.formData.status = "未通过"
             }
             if (this.auditStatuse ===4){
               this.formData.note =  '人工审核失败(照片问题）)'
               this.formData.status = "未通过"
             }
             console.log(this.formData)
           }
        })
    }*/
  },




};
</script>

<style lang="less" scoped>
.new-dashboard{
  display: flex;
  align-items: center;
  flex-direction: column;
  .milky{
    font-family: "Arial Rounded MT Bold", "Helvetica Rounded", Arial, sans-serif;
    text-transform: uppercase;
    display: block;
    font-size: 92px;
    color: #f1ebe5;
    text-shadow: 0 8px 9px #c4b59d, 0px -2px 1px #fff;
    font-weight: bold;
    letter-spacing: -4px;
    text-align: center;
    background: linear-gradient(to bottom, #ece4d9 0%,#e9dfd1 100%);
    padding: 50px 100px 120px;
    margin-top: 100px;
    margin-bottom: 130px;
    border-radius: 20px;
    .welcome{
      font-size: 72px;
    }
  }
  .default{
    margin: 100px 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      width: 800px;
    }
  }
  .default2{
    margin: 100px 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      width: 700px;
    }
  }
  .supplier-tips{
    margin-top: 20px;
    p{
      font-size: 16px;
      span{
        color: #1890ff;
      }
      &.supplier-name{
        font-size: 20px;
        margin-bottom: 10px;
        span{
          color: red;
        }
      }
    }
  }
}
.fzcolor{
  color:red;
}
</style>


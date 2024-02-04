import { findDictNameByValue } from '@/utils/dict'
import ImageUploadList from '@/components/form/UploadImage'
import uploadModal from "@components/antBase/uploadModal.vue";
// import ImageUploadList from '../components/UploadImage'
import RadioSearchTable from '../radioSearchTable'
import Example from "@/views/menuPage/customer/vipRight/viprightcomponents/Example";
import SearchTable from "@/components/form/SearchTableV";
export default {
  name: "OpenCardGift",
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
    uploadModal,
    SearchTable
  },
  // 这个data是 生日页面 与升级页面 共用的
  data() {
    return {
      rightType: 'MakePoint',
      //
      indeterminate: false,
      checkAll: false,
      makePointData: {
        gradeIdList:[],
        // 权益名称
        generalName:"",
        //展示名称
        benefitName:"",
        benefitIcon: '',
        remark: '',
        isOn: true,

        // 页面id
        mspageId:"",
        // 微页面汉字
        chooseActPage:'选择微页面>>',

        remarkTopPicture:'',
        // 微页面有效时长
        validDuration:1,
        popupWindowStyle:'',
        issueAging:1,
        issueAging2:1,
        sysStyle:1,

        couponIssueType:2,
        integralRatio:1,

        benefitType:6
      },
      isbackintegralRatio:false,
      issendCoupon:false,

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

      //优惠券相关
      couponVisible:false,
      title2:'选择优惠券',
      // couponurl:'coupon/page',
      couponurl:'/coupon/customer/page',
      couponform: this.$form.createForm(this, { name: 'coupon_table_search' }),
      couponmodalcolumns: [
        {
          title: '优惠券Id',
          dataIndex: 'id',
          key: 'id',
          align: 'center',
          customRender: (text, record) => {
            return <div style='white-space: normal;font-size:13px;'>{text}</div>
          }
        },
        {
          title: '优惠券名称',
          dataIndex: 'couponName',
          key: 'couponName',
          customRender: (text, record) => {
            return <div style='white-space: normal;font-size:13px;'>{text}</div>
          }
        },
        {
          title: "优惠内容",
          dataIndex: "couponAmount",
          key: "couponAmount",
          width: 150,
          customRender: (value, row) => {
            if (row.couponType == 0 || row.couponType == 1 || row.couponType == 3) {
              return "优惠金额" + value + "元";
            } else if (row.couponType == 2 || row.couponType == 4) {
              return "打" + row.discountRatio + "折";
            }
            return value;
          },
        },

        {
          title: "优惠券类型",
          dataIndex: "couponType",
          key: "couponType",
          width: 120,
          customRender: (text, record) => findDictNameByValue('COUPON_TYPE', text)
        },
        {
          title: "使用条件",
          dataIndex: "couponFullMoney",
          key: "couponFullMoney",
          customRender: (text, row) => {
            // 1、订单满xx元可用，最多优惠xx钱（使用门槛和最多优惠都不为-1）
            // 2、无门槛，最多优惠xx钱（使用门槛为-1，最多优惠不为-1）
            // 3、订单满xx元可用（最多优惠为-1，使用门槛不为-1）
            // 4、无门槛（使用门槛为-1，最多优惠也为-1）
            if (row.couponFullMoney != -1 && row.mostDiscount != -1) {
              return `订单满${row.couponFullMoney}元可用，最多优惠${row.mostDiscount}元`;
            } else if (row.couponFullMoney == -1 && row.mostDiscount != -1) {
              return `无门槛，最多优惠${row.mostDiscount}元`;
            } else if (row.couponFullMoney != -1 && row.mostDiscount == -1) {
              return `订单满${row.couponFullMoney}元可用`;
            } else if (row.couponFullMoney == -1 && row.mostDiscount == -1) {
              return "无门槛";
            }
            return "";
            // if(row.couponType==0 || row.couponType==1){
            //   if(row.couponFullMoney!=-1){
            //     return '订单满'+text+'元可用';
            //   }
            //   return '无门槛';
            // }
            // else if(row.couponType==2){
            //   if(row.mostDiscount>0){
            //     return '最多优惠'+row.mostDiscount+'元'
            //   }
            //   return '';
            // }
            // return text;
          },
        },
        {

          title: '库存',
          align: 'center',
          dataIndex: 'couponStocks',
          key: 'couponStocks',
          customRender:(text,row)=>{
            if (text==-1){
              return "不限量"
            }else{
              return text
            }
          }
        },
        {

          title: '创建时间',
          dataIndex: 'createDate',
          key: 'createDate',
          customRender: (text, record) => {
            return <div style='white-space: normal;font-size:13px;'>{text}</div>
          }
        },
        {
          title: "失效时间",
          dataIndex: "useTimeType",
          key: "useTimeType",
          width: 160,
          customRender: (text, row) => {
            let res = ''
            if(text == 3) {
              res = '永久有效';
            } else if(text == 2) {
              res = '领券当日起'+row.receiveDaysAble+'内有效';
            } else {
              if(row.useEndTime){
                res = row.useEndTime;
              } else {
                res = ''
              }
            }
            return res
          },
        },
      ],
      // 优惠券表格列数据名称
      couponcolumns: [
        {
          title: '优惠券Id',
          dataIndex: 'id',
          key: 'id',
          align: 'center',
          customRender: (text, record) => {
            return <div style='white-space: normal;font-size:13px;'>{text}</div>
          }
        },
        {
          title: "优惠券名称",
          dataIndex: "couponName",
          key: "couponName",
        },
        {
          title: "优惠内容",
          dataIndex: "couponAmount",
          key: "couponAmount",
          width: 150,
          customRender: (value, row) => {
            if (row.couponType == 0 || row.couponType == 1 || row.couponType == 3) {
              return "优惠金额" + value + "元";
            } else if (row.couponType == 2 || row.couponType == 4) {
              return "打" + row.discountRatio + "折";
            }
            return value;
          },
        },
        {
          title: "状态",
          dataIndex: "couponStatus",
          key: "couponStatus",
          customRender: (text, row) => {
            if (row.couponStatus == 0) {
              return row.couponIngStatus;
              // let currentTime = new Date().getTime();
              // if (
              //   currentTime > this.getTimestamp(row.getStartTime) &&
              //   currentTime < this.getTimestamp(row.useEndTime)
              // ) {
              //   return "进行中";
              // } else if (currentTime > this.getTimestamp(row.useEndTime)) {
              //   return "已结束";
              // } else if (currentTime < this.getTimestamp(row.getStartTime)) {
              //   return "未开始";
              // }
            } else {
              return "已结束";
            }
          },
        },
        {
          title: "领取人次",
          dataIndex: "couponIssueNum",
          key: "couponIssueNum",
          scopedSlots: { customRender: "lingqu" },
        },
        {
          title: "库存",
          dataIndex: "couponStocks",
          key: "couponStocks",
          customRender: (text, row) => {
            if (text == -1) {
              return "不限量";
            }
            return text;
          },
        },
        {
          title: "领取方式",
          dataIndex: "couponIssueType",
          key: "couponIssueType",
          customRender: (text, row) => {
            return "系统发放"
          }
        },


        {
          title: "创建时间",
          dataIndex: "createDate",
          key: "createDate",
        },
        {
          title: "失效时间",
          dataIndex: "useTimeType",
          key: "useTimeType",
          width: 160,
          customRender: (text, row) => {
            let res = ''
            if(text == 3) {
              res = '永久有效';
            } else if(text == 2) {
              res = '领券当日起'+row.receiveDaysAble+'内有效';
            } else {
              if(row.useEndTime){
                res = row.useEndTime;
              } else {
                res = ''
              }
            }
            return res
          },
        },
        {
          title: "操作",
          fixed: "right",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" },
        },
      ],
      couponListType:[

        {
          label:'权益满减券',
          value:'3'
        },
        {
          label:'权益折扣券',
          value:'4'
        }
      ],
      couponList:[],
      couponListkeys:[],

      // 示例相关
      exampleVisible:false,



      // 选择图片相关
      chooseimgVisivle:false,
      imgType:'',

      // switchOpen:true,


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
    async getInfo() {
      console.log('接收传过来的makePoint数据', this.formData)
      if (this.formData.id) {
        this.makePointData.benefitIcon = this.formData.benefitIcon || ""
        this.makePointData.benefitName = this.formData.benefitName
        this.makePointData.generalName = this.formData.generalName
        this.makePointData.remarkTopPicture = this.formData.remarkTopPicture || ""

        this.makePointData.popupWindowStyle = this.formData.popupWindowStyle || ""

        this.makePointData.remark = this.formData.remark
        //gradeIdList 后端暂时没给  只要里面的id
        this.makePointData.gradeIdList = this.formData.gradeList
        this.makePointData.mspageId = this.formData.mspageId //微页面id
        this.makePointData.issueAging2 = this.formData.issueAging //
        this.makePointData.validDuration = this.formData.validDuration || 1
        this.couponListkeys = this.formData.couponIdList || [] //拿着keys再去请求一遍
        this.makePointData.integralRatio = this.formData.integralRatio
        // this.makePointData.integralRatio = this.formData.integralRatio ==null?0:this.formData.integralRatio
        console.log(this.couponListkeys )
        if (this.couponListkeys.length>0){
          this.couponList = await this.getCouponListByIds(this.couponListkeys )
          this.makePointData.issueAging = 2
          console.log("获取的优惠券list",this.couponList)
        }

     /*   if (!!this.makePointData.mspageId){
          this.makePointData.issueAging = 1
          if (this.makePointData.validDuration>0){
            this.makePointData.issueAging2 = 2
          }
        }*/
        // 这个明天要注意
        if (!this.makePointData.popupWindowStyle){
          // if (this.makePointData.popupWindowStyle ==1){
          this.makePointData.sysStyle = 1
        }else {
          this.makePointData.sysStyle = 2
        }
        // integralRatio:this.makePointData.integralRatio
        if (this.makePointData.integralRatio==null){
          this.isbackintegralRatio = false
        }else {
          this.isbackintegralRatio = true

        }
        if (!!this.makePointData.mspageId || this.couponListkeys.length >0){
          this.issendCoupon = true
        }

        // 根据微页面id获取汉字
        if (!!this.makePointData.mspageId){
          this.$get('goldenhome/decoration/admin_/page/ms/query', {id: this.makePointData.mspageId})
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
        if (this.makePointData.gradeIdList.length>=5){
          this.checkAll = true
        }else if(this.makePointData.gradeIdList.length>0&&this.makePointData.gradeIdList.length<5){
          this.indeterminate = true
        }else{
          this.indeterminate = false
        }
        /*  if (this.makePointData.improvePersonalInfoPoints >0 ){
            this.makePointData.completeInfo = true
          }*/


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
      let popupWindowStyle;
      if ( this.makePointData.sysStyle == 1){
        popupWindowStyle = ""
        // popupWindowStyle = 1
      }else{
        popupWindowStyle = this.makePointData.popupWindowStyle
      }
      let issueAging
      if (this.makePointData.issueAging2 == 1){
        issueAging = 1
      }else {
        issueAging = 2
      }

      let integralRatio = this.makePointData.integralRatio

      if (this.isbackintegralRatio == false){
        integralRatio = null
      }
      if (this.makePointData.integralRatio>1){
        let n
        if (this.makePointData.integralRatio.toString().includes('.')){
          n= this.makePointData.integralRatio.toString().split(".")[1].length
        }

        if (n>2){
          return this.$message.error('积分倍率小数点后最多2位数')
        }

      }
      console.log('提交表单数据:', this.makePointData,)
      console.log('优惠券keys:', this.couponListkeys)
      // 参数说明: 权益名称, 权益类型, 权益icon, 权益说明,是否可用,积分规则,微页面id,优惠券id集合
      if (this.formData.id) {

        this.$post('goldenhome/member/admin_/member/benefits/update', {
          id: this.formData.id,
          benefitName: this.makePointData.benefitName,
          generalName: this.makePointData.generalName,
          benefitType:this.makePointData.benefitType,
          benefitIcon: this.makePointData.benefitIcon,
          remarkTopPicture: this.makePointData.remarkTopPicture,

          remark: this.makePointData.remark,
          isEnable: Number(this.makePointData.isOn),
          gradeIdList:this.makePointData.gradeIdList,
          popupWindowStyle: popupWindowStyle,
          // mspageId:'',
          couponIdList:this.couponListkeys,
          couponIssueType:this.makePointData.couponIssueType,
          mspageId:this.makePointData.mspageId,
          issueAging:issueAging,
          validDuration:this.makePointData.validDuration,
          integralRatio
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
        //


        this.$post('goldenhome/member/admin_/member/benefits/add', {
          benefitName: this.makePointData.benefitName,
          generalName: this.makePointData.generalName,
          benefitType: this.makePointData.benefitType,
          benefitIcon: this.makePointData.benefitIcon,
          remarkTopPicture: this.makePointData.remarkTopPicture,

          remark: this.makePointData.remark,
          isEnable: Number(this.makePointData.isOn),
          gradeIdList:this.makePointData.gradeIdList,
          popupWindowStyle: popupWindowStyle,
          // mspageId:'',
          couponIssueType:this.makePointData.couponIssueType,
          couponIdList:this.couponListkeys,
          mspageId:this.makePointData.mspageId,
          issueAging:issueAging,
          validDuration:this.makePointData.validDuration,
          integralRatio
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




    /*loginChange(e){
      console.log(`checked = ${e.target.checked}`)
      this.makePointData.login = e.target.checked
      console.log( this.makePointData.login)

      if (e.target.checked===false){
        this.makePointData.everyTimeLoginPoints= 0
        this.makePointData.loginCount = 0
        this.makePointData.browseTime = 0
      }
    },
  */

    // 微页面的
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
      this.makePointData.mspageId = this.$refs.searchtable.selectedRows[0].id
      console.log(this.chooseActPage,this.makePointData.mspageId)
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
      if (this.imgType=='popupWindowStyle'){
        this.makePointData.popupWindowStyle = ''
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
      if (this.imgType=='popupWindowStyle'){
        this.makePointData.popupWindowStyle = value
      }
    },

    closeInfoModal() {
      this.chooseimgVisivle = false;
    },


    issueAgingChange(){
      if (this.makePointData.issueAging !=1){
        // 微页面汉字置空，微页面id 置空， makePointData.issueAging =1
        this.makePointData.validDuration = 1;
        this.makePointData.mspageId = "";
        this.makePointData.chooseActPage = "选择微页面>>";
        this.makePointData.issueAging2 = 1

      }


      if (this.makePointData.issueAging !=2){
        // 微页面汉字置空，微页面id 置空， makePointData.issueAging =1
        // this.makePointData= 0;
        this.makePointData.issueAging2 = 1
        this.couponList = []
        this.couponListkeys = []

      }
    },
    issueAgingChange2(){
      if (this.makePointData.issueAging2 !=2){
        this.makePointData.validDuration = 1;
      }
    },


    // 优惠券
    chooseCoupon(){
      this.couponVisible = true
    },

    closeModal2(){
      this.couponVisible = false
    },
    async  getCouponListByIds(couponIdList){
      let ids = couponIdList.join(',')
      console.log("ids",ids)
      const res = await this.$get('/coupon/querybyids', {ids})

      if (res && res.returnCode === 1000) {
        console.log('***********')
        console.log(res.dataInfo)
        // this.chooseActPage = res.dataInfo.pageInfo.pageName
        // this.$message.success('操作成功!')
        return res.dataInfo
      }
    },
    async handleSubmit2(){
      // console.log(this.$refs.couponsearchtable.selectedRows)
      // this.RCData.couponList = this.$refs.couponsearchtable.selectedRows
      this.couponListkeys = this.$refs.couponsearchtable.selectedRowKeys
      this.couponList = await this.getCouponListByIds(this.couponListkeys )
      console.log(this.couponList,this.couponListkeys)
      this.couponList.forEach((item)=>{
        // this.$set(item,'amount',1)
        this.$set(item,'couponId',item.id)
      })

      this.couponVisible = false
    },
    // deleteDisCountGood
    deleteCoupon(record){
      console.log(record)
      this.couponList= this.couponList.filter((item)=>{
        return  item.id !==record.id
      })
      this.couponListkeys= this.couponListkeys.filter((item)=>{
        return  item !==record.couponId
      })

      console.log(this.couponList,this.couponListkeys)
    },





    switchonChange(checked){
      console.log(`a-switch to ${checked}`);
      console.log(this.switchOpen);
    },


    sysStyleChange(){
      if (this.makePointData.sysStyle !=2){
        this.makePointData.popupWindowStyle = ""
      }
    },

    backintegralRatioChange(e){
      console.log(e.target.checked)
      console.log(this.isbackintegralRatio)
      if (this.isbackintegralRatio ==false){
        this.makePointData.integralRatio = 1
      }
      if (this.isbackintegralRatio ==true && this.makePointData.integralRatio==null){
        this.makePointData.integralRatio=1
      }
    },
    sendCouponChange(e){
      console.log(e.target.checked)
      console.log(this.issendCoupon)

      if (this.issendCoupon ==false){
        // 置空
        this.makePointData.validDuration = 1;
        this.makePointData.mspageId = "";
        this.makePointData.chooseActPage = "选择微页面>>";
        this.makePointData.issueAging2 = 1
        this.couponList = []
        this.couponListkeys = []

      }
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
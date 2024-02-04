import deepCopy from '@/utils/deepCopy';
import Example from "@/views/menuPage/customer/vipRight/viprightcomponents/Example";
//this.treeData
//this.selectedRowKeys
import uploadModal from "@components/antBase/uploadModal.vue";
export default {

  props: {
    formData: {
      type: Object
    },
    current:{
      default:1
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
      indeterminate: false,
      checkAll: false,
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

        integralRatio:1,
        chooseActPage:'选择微页面>>',
        mspageId:''
      },
      // selectImageShow:false,
      // 会员等级列表
      vipList:[],

      // 示例相关
      exampleVisible:false,

      // 选择图片相关
      chooseimgVisivle:false,
      imgType:'',
      benefitType:3
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
      console.log( this.CommonData.gradeIdList)
    },
    onCheckAllChange(e) {
      console.log(e.target.checked)
      if (e.target.checked == true){
        let vipIds = []
        this.vipList.forEach((item,index)=>{
          vipIds.push(item.id)
        })
        this.CommonData.gradeIdList = vipIds
        this.indeterminate = false
        this.checkAll = true
        console.log( this.CommonData.gradeIdList)
      }
      if (e.target.checked ===false){
        this.CommonData.gradeIdList = []
        this.indeterminate = false
        this.checkAll = false
        console.log( this.CommonData.gradeIdList)
      }

    },
    getInfo() {
      console.log('接收传过来的数据', this.formData)
      if (this.formData.id) {
        this.CommonData.benefitIcon = this.formData.benefitIcon
        this.CommonData.benefitName = this.formData.benefitName
        this.CommonData.generalName = this.formData.generalName
        this.CommonData.remarkTopPicture = this.formData.remarkTopPicture
        this.CommonData.remark = this.formData.remark
        this.CommonData.integralRatio = this.formData.integralRatio
        //gradeIdList 后端暂时没给  只要里面的id
        this.CommonData.gradeIdList = this.formData.gradeList
        this.CommonData.mspageId = this.formData.mspageId //微页面id
       /* for (let item of this.formData.gradeList) {
          this.CommonData.gradeIdList.push(item.id)
        }*/

        this.CommonData.isOn = this.formData.isEnable === 1 ? true : false
        
        // 根据微页面id获取汉字
        if (!!this.CommonData.mspageId){
          this.$get('goldenhome/decoration/admin_/page/ms/query', {id: this.CommonData.mspageId})
            .then((res) => {
              if (res && res.returnCode === 1000) {
                console.log('***********')
                console.log(res.dataInfo)
                this.CommonData.chooseActPage = res.dataInfo.pageInfo.pageName
                // this.chooseActObj = res.dataInfo.pageInfo
                // this.$message.success('操作成功!')
              }
            })
        }
        
        if (this.CommonData.gradeIdList.length>=5){
          this.checkAll = true
        }else if(this.CommonData.gradeIdList.length>0&&this.CommonData.gradeIdList.length<5){
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
      /* console.log(type)
       this.CommonData.remarkTopPicture = ''
       this.painting.views[0].url = ''*/

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
  },

}
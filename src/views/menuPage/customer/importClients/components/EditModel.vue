<template>
  <a-modal
    :visible="visible"
    okText="提交"
    cancelText="关闭"
    :title="title"
    :maskClosable="false"
    :destroyOnClose="true"
    :keyboard="false"
    width="800px"
    @cancel="closeModal()"
    @ok="handleSubmit">
   <!-- <a-form :form="form"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 12 }">

      <a-form-item label="手机号">
        <a-input
          v-decorator="[
                'phoneNumber',
              ]"
          placeholder="请输入客户手机号"
        />
      </a-form-item>

      <a-form-item label="客户姓名">
        <a-input
          v-decorator="[
                'customerName',
              ]"
          placeholder="请输入客户姓名"
        />
      </a-form-item>

      <a-form-item label="员工账号(非员工可不填)">
        <a-input
          v-decorator="[
                'employeeNo',
              ]"
          placeholder=""
        />
      </a-form-item>



    </a-form>-->

        <a-form-model ref="ruleForm"
                      style="width: 800px"
                      :model="Info"
                      :rules="rules"
                      :label-col="{ lg: { span: 5 }, sm: { span: 5 } }"
                      :wrapper-col="{ lg: { span: 15 }, sm: { span: 15 } }">
          <!--分销商与供应商只有一个名字不一样其他数据相同-->

            <a-form-model-item label="客户手机号" prop="phoneNumber">
              <a-input
                v-model.number="Info.phoneNumber"
                :maxLength="11"
                name="phoneNumber"
                placeholder="客户手机号"
              />
            </a-form-model-item>


            <a-form-model-item label="客户姓名" prop="customerName">
              <a-input
                v-model="Info.customerName"
                name="customerName"
                placeholder="输入客户姓名"
              />
            </a-form-model-item>

          <a-form-model-item label="员工账号(非员工可不填)" prop="employeeNo">
            <a-input
              v-model="Info.employeeNo"
              name="employeeNo"
              placeholder="员工账号(非员工可不填)"
            />
          </a-form-model-item>

          <a-form-model-item label="客户标签" prop="">
            <div class="tagArea">
              <template v-for="(item) in handTag">
                <a-checkable-tag v-model="item.checked" :key="item.id" @change="handleChange(item)">
                  {{item.labelName}}
                </a-checkable-tag>
              </template>
            </div>
          </a-form-model-item>

          </a-form-model>

  </a-modal>
</template>

<script>
  import deepCopy from "@/utils/deepCopy";
  import regex from "@/utils/regex";

  export default {
    name: "EditModel",
    props: {
      record: {
        type: Object,
        default() {
          return {}
        }
      },
      visible: {
        type: Boolean,
        default: false
      },
    },
    computed: {
      title () {
        return '修改会员信息'
      },

    },
    data () {
      return {
        Info:{
          id:'',
          phoneNumber:'',
          customerName:'',
          employeeNo:'',

        },
        //客户已有标签
        labelList:[],
        //全部手动标签
        handTag:[],
        // form: this.$form.createForm(this, { name: 'coordinated' }),
        rules:{
          phoneNumber: [
                  { required:true, message:'请填写手机号'},
                  { pattern:/^1[3,4,5,6,7,8,9]\d{9}$/, message: '请输入正确的手机号', trigger: ['change', 'blur']}
                  ],
          customerName: [{ required: true, message: '请填写客户姓名' }],
          // employeeNo:[{required:true,validator:this.test}]
        }
      }
    },
    watch: {
      visible (value) {
        if (value && this.record.id) {
          console.log(this.record)
          this.Info.id = this.record.id
          this.Info.phoneNumber = this.record.phoneNumber
          this.Info.customerName = this.record.customerName
          this.Info.employeeNo = this.record.employeeNo
          if (!!this.record.labelList){
            this.labelList = this.record.labelList.map((item)=>{
              return {labelName:item}
            })
          }else {
            this.labelList = []
          }

          console.log(" this.labelList", this.labelList)
          this.getTagInfo()
        }
      }
    },
    mounted () {


    },
    methods: {
    /*  test (rule, value, callback) {
        var status = true
        if (!value) {//特别注意在为空时校验规则已写，所以这儿照样callback()，不然不会执行空时的校验
          callback("请输入") // 空校验
        } else {
          if (value.length <= 4 && value.length >= 2) {
            console.log(value,rule)
            value.map(function (item) {
              if (item.length > 4 || item.length < 2) {
                status = false
                return
              }
            })
            if (!status) {
              callback('选择或填写2~4个标签（限制2~4个字）')
            } else {
              callback()
            }
          } else {
            callback('选择或填写2~4个标签（限制2~4个字）')
          }
        }
      },*/


      closeModal (freshTable) {
        // this.form.resetFields()
        console.log(freshTable)
        this.$emit('cancel', freshTable)
      },


      handleSubmit(){
        console.log(this.Info)
        console.log(this.handTag)
        let label = []
        this.handTag.forEach((item)=>{
          if ( item.checked ==true){
            label.push (item.labelName)
          }
        })
        this.$refs['ruleForm'].validate(valid => {
          if (valid) {
            // 地址/leadin/detail/update
            let url = 'goldenhome/member/admin_/leadin/detail/update'
            this.$post(url, {...this.Info,label}).then(res => {
              if (res && res.returnCode === 1000) {
                this.$message.success('修改成功！')
                // 关闭model
                this.closeModal(true)
              }
            })
          } else {
            console.log('error!!');
            return false;
          }
        });
      },

      async getTagInfo() {
        let res = await this.$get(`customer/label/list`);
        if (res && res.returnCode === 1000){
          let allLabelList = res.dataInfo
          console.log(allLabelList)
          // 对比一下两个list  有的设为true 没有的设为false
          // 先找出所有自定义标签
          let tiaojianArr = allLabelList.filter((item) => {
            return item.systemDefault === 0
          })

          // 筛选手动标签
          this.handTag = tiaojianArr.filter((item) => {
            return item.labelType === 2
          })
          console.log('初选handTag', this.handTag)
          // 一开始都设为false
          this.handTag.forEach((item)=>{
            this.$set(item, "checked", false)
          })


          for (let i of this.handTag){
            for (let j of this.labelList){
              if (i.labelName === j.labelName){
                console.log(i.labelName,j.labelName)
                this.$set(i, "checked", true)
              }
            }
          }

          // this.handTagCopy  = deepCopy(this.handTag)
          // console.log("全部hand标签:",this.handTag,"客户有的hand标签:",this.labelList)
        }

      },

      handleChange(item) {
        // 每次点击把true的扔进列表 把false的移除列表
        console.log(item)
        // this.handTagCopy
        // let labelListCopy = deepCopy(this.labelHandList)
        if (item.checked == true) {
          // this.handTag.push(item)
          this.handTag.forEach((items)=>{
            if (items.id === item.id){
              this.$set(items,"checked",true)
            }
          })
        }

        if (item.checked == false) {
          this.handTag.forEach((items)=>{
            if (items.id === item.id){
              this.$set(items,"checked",false)
            }
          })
          /*  this.handTag  =   this.handTag.filter((items) => {
              return items.id !== item.id
            })*/
        }

        console.log("客户hand标签：", this.handTag)
      },
    }
  }
</script>

<style scoped lang="less">
  .tagArea {

    width: 500px;
    background-color: #F5F5F5;
    padding: 15px;

  }
</style>
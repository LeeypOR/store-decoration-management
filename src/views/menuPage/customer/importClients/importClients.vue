<template>
  <div>
    <a-card>
      <div style="width: 80%;position: relative;left:10%;">

        <a-steps :current="current">

          <a-step>
            <span slot="title">上传导入文件</span>
          </a-step>

          <!-- <a-step>
               <span slot="title">确认导入文件</span>
           </a-step>-->

          <a-step>
            <span slot="title">导入成功</span>
          </a-step>

        </a-steps>
      </div>
      <div style="margin-top: 50px; "></div>
      <template v-if="current==0">
        <a-form-model
          ref="ruleForm"
          :model="form"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item label="导入识别方式" prop="resource">
            手机号
          </a-form-model-item>

          <a-form-model-item label="导入类型" >
            <a-radio-group v-model="importwhat" @change="TypeChange">
              <a-radio :value="1">

              </a-radio>
              <span style="display: inline-block;width: 100px;">导入成为会员 </span>
              <a-select v-model="gradeName" placeholder="请选择会员" style="width: 200px;" @change="VIPChange" :disabled="importwhat!=1">
                <template v-for="(item,index) in vipList">
                  <a-select-option  :key="item.id" :disabled="item.gradeName!='金勋会员'" :value="item.gradeName">
                    {{item.gradeName}}
                  </a-select-option>
                </template>
              </a-select>
          <!--    <a-checkbox style="margin-left: 15px;"
                          :default-checked="true"
                          disabled
                          @change="foreverChaneg"
                          v-show="this.gradeName=='金勋会员'">永久</a-checkbox>

            -->
              <a-radio style="margin-left: 20px" :value="2">

              </a-radio>


              <span style="display: inline-block;width: 70px">送权益卡</span>
              <a-select v-model="cardId" placeholder="请选择权益卡" style="width: 200px;" :disabled="importwhat!=2">
                <template v-for="(item,index) in rightCardList">
                  <a-select-option  :key="index" :value="item.id">
                    {{item.cardName}}
                  </a-select-option>
                </template>
              </a-select>

            </a-radio-group>
          </a-form-model-item>

          <a-form-model-item  v-show="importwhat ==1">
            <span slot="label" class="ant-form-item-required">选择有效期</span>
            <a-radio-group style="display: flex;flex-direction: column; " @change="ValidChange" v-model="validPeriodUnit">
              <div><a-radio style="margin: 8px 0" :value="1"></a-radio> <a-input-number :disabled="validPeriodUnit!=1" v-model="vipValidDay" :min="1" :max="1000" style="width: 180px;" placeholder="填写大于等于1的整数"></a-input-number> 天</div>
              <div><a-radio style="margin: 8px 0" :value="2"></a-radio> <a-input-number :disabled="validPeriodUnit!=2" v-model="vipValidMonth" :min="1" :max="100" style="width: 180px;" placeholder="填写大于等于1的整数"></a-input-number> 月</div>
              <div><a-radio style="margin: 8px 0" :value="3"></a-radio> <a-input-number :disabled="validPeriodUnit!=3" v-model="vipValidYear" :min="1" :max="10" style="width: 180px;" placeholder="填写大于等于1的整数"></a-input-number> 年</div>
              <div><a-radio style="margin: 8px 0" :value="4"></a-radio> 永久</div>
            </a-radio-group>
          </a-form-model-item>

          <a-form-model-item  v-show="importwhat ==1">
              <span slot="label" class="ant-form-item-required">弹框提示语</span>
              <a-input v-model="popWindowPrompt" style="width: 250px" :maxLength="15" placeholder="输入4至15个汉字"></a-input>
          </a-form-model-item>

          <a-form-model-item label="上传文件 ">

            <UploadFiles  @change="change"></UploadFiles>
            <span style="font-size: 12px;">当前仅支持xls格式文件(文件大小在10M以内且行数在10万以内，若超出限制，请分批导入)，
                        请使用office2010以上版本，否则可能出现乱码，必须严格按照模板内容导入客户数据，否则可能出现导入异常</span>
            &nbsp; <a :href="moduleUrl" download="模板.xls" title="下载" target="_blank">点击下载模板(识别手机号)</a>
          </a-form-model-item>


          <div style="margin-left: 48%">
            <a-form-model-item :labelCol="{ span: 8 }" label="" >
              <a-button @click="nextStep">导入</a-button>
              <a-button @click="cancelImport">取消</a-button>
            </a-form-model-item>
          </div>
        </a-form-model>
        <!--失败提示-->
        <a-modal
          :visible="failvisible"
          cancelText="关闭"
          title="导入失败"
          :maskClosable="false"
          width="300px"
          centered
          @cancel="closeModal()"
          >
         <span style="color: red;font-size: 14px;">
           错误: {{importResult}}
         </span>
        </a-modal>
      </template>

      <!-- <template v-if="current==1">
           <div>
               <a-table :columns="Columns"
                        :row-selection="rowSelection"
                        size="small"
                        :data-source="importClientList"
                        bordered
                        table-layout="fixed"
                        :row-key="(record) => record.id"
                        :pagination="false">
             <span slot="operation" slot-scope="text, record">
                        <a-button type="primary" @click='deletes(record)'>删除</a-button>
                   </span>
               </a-table>
           </div>

           <div style="height: 50px;">

           </div>
           <div style="margin-left: 48%">
               <br>
               <br>
               <a-button @click="importClientsOP" type="primary">导入</a-button>
               <a-button style="margin-left: 20px;">暂不导入</a-button>
           </div>
       </template >-->

      <template v-if="current==1">
        <div style="margin: 100px 0 0 0 ; display: flex;flex-direction: column;align-items: center;justify-content: space-between;">
          <div style="margin-top: 20px;font-size: 30px;font-weight: bold;border-radius: 50%;">&#9989;</div>
          <div  style="margin-top: 20px; font-size: 25px;font-weight: bold;">导入中</div>
          <!--                    <div  style="margin-top: 20px">预计导入1条客户数据，导入完成后。可在导入记录中查看实际导入人数及具体情况</div>-->
          <div  style="margin-top: 20px"><a-button type="primary" class="primary2" @click="searchImport">查看导入记录</a-button></div>
          <div  style="margin-top: 20px"><a-button @click="continueImport">继续导入</a-button></div>
        </div>
      </template >
    </a-card>
  </div>
</template>

<script>
  // import UploadFile from "../shop/material/components/UploadFile";
  import UploadFiles from "./components/UploadFile";
  export default {
    name: "importClients",
    components:{
      UploadFiles,
    },

    data(){
      return{
        importwhat:1,
        current:0,
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
        form:{},
        rightCardList:[],
        moduleUrl :`/goldenhome/member/admin/leadin/record/download/template`,
        cardId:'',
        vipList:[],
        vipId:'',
        gradeName: '金勋会员',

        importResult:'',



        failvisible:false,
        // 会员有效期类型
        validPeriodUnit:1,
        // 会员有效期时间 天 月 年
        vipValidDay:'',
        vipValidMonth:'',
        vipValidYear:'',
        // 提示语
        popWindowPrompt:''
      }
    },
    computed:{

    },
    async created() {
      // 获取全部会员卡
      await this.getVipList()
      // 获取全部权益卡
      this.$get('goldenhome/member/admin_/benefits/card/list',{isEnabled:1}).then((res)=>{
        if (res && res.returnCode ==1000){
          console.log(res.dataInfo)
          this.rightCardList = res.dataInfo
        }
      })
    },
    mounted() {

    },
    methods:{
      async getVipList() {
        const res = await this.$get('goldenhome/member/admin_/member/gradeconfig/list')
        if (res && res.returnCode === 1000) {
          // this.$message.success('操作成功!')
          res.dataInfo.forEach((item) => {
            const {id, gradeName, ...other} = item
            this.vipList[this.vipList.length] = {id, gradeName}
          })

          this.vipList.forEach((item) => {
            this.$set(item, "gradeId", item.id)
          })
          console.log('this.vipList', this.vipList)

          this.vipList = this.vipList.filter((item,index)=>{
            return item.gradeName=='金勋会员'
          })
          this.vipId = this.vipList[0].id
        }
      },


      change(val){
        // formData
        this.fileList = val
        // console.log('this.fileList:',this.fileList)
      },
      nextStep(){

        if (!this.cardId && !this.vipId){
          return this.$message.error("请选择卡")
        }
        if (!this.fileList){
          this.$message.error("请选择导入类型")
          return
          // 方法
        }

        let form = new FormData()
        // 这里可能要改
        form.append('file',this.fileList.get('file'));
        if (!!this.cardId){
          form.append('relationId',this.cardId);
        }
        if (!!this.vipId){
          form.append('relationId',this.vipId);
        }
        // form.append('isForever',this.isForever);
        form.append('type',this.importwhat);
        // 如果是导入会员的话  把会员的有效期(字段待定)  和提示语(字段待定) 加进去
        if (this.importwhat == 1 && this.validPeriodUnit == 1){

          if (this.popWindowPrompt.length<4){
            return this.$message.error("提示语设置在4至15个字")
          }
          if (this.vipValidDay<1){
            return this.$message.error("设置的天数需要大于等于1")
          }
          form.append('duration',this.vipValidDay);
          form.append('validPeriodUnit',1);
          form.append('popWindowPrompt',this.popWindowPrompt);
        }
        if (this.importwhat == 1 && this.validPeriodUnit == 2){

          if (this.popWindowPrompt.length<4){
            return this.$message.error("提示语设置在4至15个字")
          }
          if (this.vipValidMonth<1){
            return this.$message.error("设置的月数需要大于等于1")
          }
          form.append('duration',this.vipValidMonth);
          form.append('validPeriodUnit',2);
          form.append('popWindowPrompt',this.popWindowPrompt);
        }
        if (this.importwhat == 1 && this.validPeriodUnit == 3){

          if (this.popWindowPrompt.length<4){
            return this.$message.error("提示语设置在4至15个字")
          }
          if (this.vipValidYear<1){
            return this.$message.error("设置的年需要大于等于1")
          }
          form.append('duration',this.vipValidYear);
          form.append('validPeriodUnit',3);
          form.append('popWindowPrompt',this.popWindowPrompt);
        }
        if (this.importwhat == 1 && this.validPeriodUnit == 4){

          if (this.popWindowPrompt.length<4){
            return this.$message.error("提示语设置在4至15个字")
          }
          form.append('validPeriodUnit',4);
          form.append('popWindowPrompt',this.popWindowPrompt);
        }
        // form.append('cardId',this.cardId);
        // form.append('cardId',this.cardId);
        // console.log(form) form不要加{}
        console.log(form)


        this.$confirm({
          title: '提示',
          content: "支持对某个客户进行重复导入，覆盖姓名，员工账号;请谨慎使用该功能，尤其是对同一批客户重复导入",
          okText: '确认导入',
          cancelText: '取消',
          onOk: ()=> {
            // 批量导入客户  要调接口
            this.$post('goldenhome/member/admin_/leadin/record/import',form).then(res => {
              if (res && res.returnCode === 1000) {
                console.log('***********',res)
                this.importResult = res.dataInfo;
                console.log(this.importResult)
                // this.$message.success('导入成功!')
              }

              // 根据导入结果判断是否跳下一步
              if (this.importResult != '' && this.importResult!=null){
                this.failvisible = true
              }else{
                this.current++
              }
            })

          }
        })


      },
      cancelImport(){
        console.log("取消导入")
        this.$router.push({ name: 'CustomerImportClientsImportClientsList'})
      },
      //
 /*     importClientsOP(){
        console.log("正式导入客户")
        this.$confirm({
          title: '提示',
          content: "支持对某个客户进行重复导入，覆盖姓名，员工账号;" +
            "会员标签注：请谨慎使用该功能，尤其是对同一批客户重复导入时",
          okText: '确认导入',
          cancelText: '取消',
          onOk: ()=> {
              this.$post('/goods/recycle/reduction', {ids, operation}).then(res => {
                  if (res && res.returnCode == 1000) {
                      this.$message.success('操作成功')
                      this.$refs.searchtable.refreshTable()
                  }
              })
            this.current++
          }
        })
      },*/

      searchImport(){
        console.log("查看导入记录")
        this.$router.push({
          name: 'CustomerImportClientsImportClientsList',
        })
      },
      continueImport(){
        console.log("继续导入")
        this.current=0
      },


    // 会员卡变化时
      VIPChange(){

       let currentVip =  this.vipList.filter((item,index)=>{
          if (item.id == this.vipId){
            return item
          }
        })
          this.gradeName = currentVip[0].gradeName
          console.log( this.gradeName)



      },
      TypeChange(){
        console.log(this.importwhat)
        if (this.importwhat ==2){
          this.vipId = ''
          this.gradeName = ''
        }
        if (this.importwhat ==1){
          this.cardId = ''
          this.gradeName = '金勋会员'
          this.vipId = this.vipList[0].id
        }

      },
      foreverChaneg(e){
        console.log(e.target.checked)
        this.isForever = e.target.checked==true?1:0;
        console.log(this.isForever)
      },
      closeModal(freshTable) {
        // this.$emit('cancel', freshTable)
        this.failvisible = false
        // this.fileList = null
        // 可能需要清空提交的数据...
      },

      ValidChange(e){
          if (e.target.value==1){
            this.vipValidMonth = ""
            this.vipValidYear = ""
          }
          if (e.target.value==2){
            this.vipValidDay = ""
            this.vipValidYear = ""
          }
          if (e.target.value==3){
            this.vipValidDay = ""
            this.vipValidMonth = ""
          }
          if (e.target.value==4){
            this.vipValidDay = ""
            this.vipValidMonth = ""
            this.vipValidYear = ""
          }
      }
    }

  }
</script>

<style scoped lang="less">

  /deep/ .ant-btn-primary{
    display: none;
  }
  .primary2{
    display: block;
  }
</style>
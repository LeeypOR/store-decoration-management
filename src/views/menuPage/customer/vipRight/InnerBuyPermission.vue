<!--
<template>
  <a-form :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }">


    <a-form-item label="权益名称">
      <a-input :style="{width:'200px'}" v-model="InnerBuyPermission.rightName"></a-input>
    </a-form-item>

    <a-form-item label="选择商品">
      <span @click="openModel" style="color: #1890ff;cursor: pointer;"> {{chooseActPage}}</span>
    </a-form-item>


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
              :chooseId="chooseActId"
              :chooseObj="chooseActObj"
      >
        <template slot="searchForm">
          <a-form layout="inline" :form="form">

            <a-form-item label="页面名称">
              <a-input
                      style="width:180px"
                      v-decorator="[
                      'rightName']"
                      placeholder="输入权益名称"
              >
              </a-input>
            </a-form-item>
          </a-form>
        </template>
      </radio-search-table>
    </a-modal>

    <a-form-item label="权益图标">
      <ImageUploadList
              :limit="1"
              :multiple="true"
              v-model="InnerBuyPermission.rightIcon"
      >
      </ImageUploadList>
      <div class="desc">建议72*72像素的png照片</div>
    </a-form-item>


    <a-form-item label="权益说明">
      <a-col>
        <tinymce-editor v-model="InnerBuyPermission.rightExplanation"></tinymce-editor>
      </a-col>
    </a-form-item>

    <a-form-item label="是否启用">
      <a-switch v-model="InnerBuyPermission.isOn" @change="changeIsOn"></a-switch>
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

</template>

<script>
  import ImageUploadList from '../components/UploadImage'
  import RadioSearchTable from './radioSearchTable'
  export default {
    name: "InnerBuyPermission",
    props: {
      formData: {
        type: Object
      }
    },
    components:{
      ImageUploadList,
      RadioSearchTable
    },
    data() {
      return {
        chooseActId:'',
        chooseActObj:{},
        chooseActPage:'选择活动页面>',
        rightType:'InnerBuyPermission',
        InnerBuyPermission:{
          rightIcon:'',
          rightName:'内购权益',

          rightExplanation:'',
          isOn:true
        },


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
      }
    },
    created() {
      console.log('接收传过来的数据', this.formData)
      if (this.formData.id) {
        this.InnerBuyPermission.rightIcon = this.formData.benefitIcon
        this.InnerBuyPermission.rightName = this.formData.benefitName
        this.InnerBuyPermission.rightExplanation = this.formData.benefitRemark
        this.InnerBuyPermission.isOn = this.formData.isEnable === 1 ? true : false
        this.chooseActId = this.formData.mspageId
        this.$get('goldenhome/decoration/admin_/page/ms/query', {id: this.chooseActId})
                .then((res) => {
                  if (res && res.returnCode === 1000) {
                    console.log('***********')
                    console.log(res.dataInfo)
                    this.chooseActPage = res.dataInfo.pageInfo.pageName
                    // this.$message.success('操作成功!')
                    this.chooseActObj = res.dataInfo.pageInfo
                  }
                })
      } else {
        return
      }
    },
    methods: {

      changeIsOn(val){

      },
      handleCancel(){
        this.$router.push({ name: 'CustomerVipRight' })
      },

      submitData(){
        // 微页面id
        console.log('表单数据:',this.InnerBuyPermission)
        if (this.formData.id){
          this.$post('goldenhome/member/admin_/member/benefits/update',{
            id:this.formData.id,
            benefitName:this.InnerBuyPermission.rightName,
            benefitType:5,
            benefitIcon:this.InnerBuyPermission.rightIcon,
            benefitRemark:this.InnerBuyPermission.rightExplanation,
            isEnable:Number(this.InnerBuyPermission.isOn),
            mspageId:this.chooseActId

          }).then(res => {
            if (res && res.returnCode === 1000) {
              console.log('***********')
              console.log(res)
              this.$message.success('操作成功!')
              this.$router.push({ name: 'CustomerVipRight' })
            }
          })
        }else {
          this.$post('goldenhome/member/admin_/member/benefits/add',{
            benefitName:this.InnerBuyPermission.rightName,
            benefitType:5,
            benefitIcon:this.InnerBuyPermission.rightIcon,
            benefitRemark:this.InnerBuyPermission.rightExplanation,
            isEnable:Number(this.InnerBuyPermission.isOn),
            mspageId:this.chooseActId

          }).then(res => {
            if (res && res.returnCode === 1000) {
              console.log('***********')
              console.log(res)
              this.$message.success('操作成功!')
              this.$router.push({ name: 'CustomerVipRight' })
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
      handleSubmit(){
        // 得到获取的微页面
        console.log(this.$refs.searchtable.selectedRows)
        this.chooseActPage = this.$refs.searchtable.selectedRows[0].pageName
        this.chooseActId = this.$refs.searchtable.selectedRows[0].id
        console.log(this.chooseActPage,this.chooseActId)
        this.visible = false
      },
    },
  }
</script>

<style scoped>

</style>-->

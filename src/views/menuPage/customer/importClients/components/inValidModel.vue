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

   <template>
        <span style="display: inline-block;height: 52px;">
          <span style="color: red">*</span>
          <span>填写操作原因：</span>
        </span>
       <a-textarea style="width: 400px;" :autosize="{ minRows: 2, maxRows: 6 }" :max-length="20" v-model="remark"></a-textarea>
   </template>

  </a-modal>
</template>

<script>
  import deepCopy from "@/utils/deepCopy";
  import regex from "@/utils/regex";

  export default {
    name: "EditModel",
    props: {
      record: {
        type: [Object,Array],
        default() {
          return []
        }
      },
      visible: {
        type: Boolean,
        default: false
      },
    },
    computed: {
      title () {
        return '操作原因'
      },

    },
    data () {
      return {
        remark:''
      }
    },
    watch: {
      visible (value) {
        if (value && this.record) {
          // console.log(this.record)

        }
      }
    },
    mounted () {


    },
    methods: {



      closeModal (freshTable) {
        // this.form.resetFields()
        console.log(freshTable)
        this.$emit('cancel', freshTable)
      },


      handleSubmit(){
        if (!this.remark){
          return this.$message.error("操作原因不可为空")
        }
          console.log(this.remark)
          console.log(this.record)
          //  /admin/leadin/detail/invalid  导入会员的页面的失效
          //  /admin/card/buy/record/invalid  会员记录页面的失效
         if (this.record.receiveWay==2){
             console.log("会员购买记录失效")
           this.$post('goldenhome/member/admin_/card/buy/record/invalid', {id:this.record.id,remark:this.remark}).then(res => {
             if (res && res.returnCode == 1000) {
               this.$message.success('操作成功！')
               this.closeModal(true)
             }
           })
         }else{
             console.log("导入会员失效")
           this.$post('goldenhome/member/admin_/leadin/detail/invalid', {idList:this.record,remark:this.remark}).then(res => {
             if (res && res.returnCode == 1000) {
               this.$message.success('操作成功！')
               this.closeModal(true)
             }
           })
         }

      },

    }
  }
</script>

<style scoped lang="less">


</style>
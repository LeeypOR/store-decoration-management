<template>
  <a-modal 
    :visible="visible"
    okText="提交" 
    cancelText="关闭" 
    :title="title"
    :maskClosable="false"
    :keyboard="false"
    @cancel="closeModal()" 
    @ok="handleSubmit">
    <a-form :form="form"  :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      
      <a-form-item label="当前密码">
        <a-input-password 
          autocomplete="off"
          v-decorator="['oldPwd', {rules: [{ required: true, message: '请填写当前密码' }] }]"
          placeholder="请填写当前密码"
        />
      </a-form-item>
      <a-form-item label="新密码">
        <a-input-password 
          autocomplete="off"
          v-decorator="['password', {rules: [{ required: true, message: '请填写新密码' }] }]"
          placeholder="请填写新密码"
        />
      </a-form-item>
      <a-form-item label="确认密码">
        <a-input-password 
          autocomplete="off"
          v-decorator="['confimPwd', {rules: [{ required: true, message: '请填写确认密码' },{
                  validator: checkPwd,
                }] }]"
          placeholder="请填写确认密码"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
export default {
  name: 'edit-pas',
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
      return '修改密码'
    },
    
  },
  data () {
    return {
      form: this.$form.createForm(this, { name: 'coordinated' })
    }
  },
  methods: {
    checkPwd (rule, value, callback) {
      if (value && value !== this.form.getFieldValue('password')) {
        callback('两次输入密码不一致！');
      } else {
        callback();
      }
    },
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          let url = '/sys/users'
          console.log(this.record)
          url = this.record.id ? `${url}/${this.record.id}/password/change` : url
          this.$post(url, {...values}).then(res => {
            if (res && res.returnCode === 1000) {
              this.$message.success('保存成功！')
              this.closeModal(true)
            }
          })
        }
      });
    },
    closeModal (freshTable) {
      this.form.resetFields()
      this.$emit('cancel', freshTable)
    }
  }
}
</script>
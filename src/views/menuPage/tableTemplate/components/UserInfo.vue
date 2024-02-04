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
      
      <a-form-item label="用户名" v-if="!isEdit">
        <a-input
          autocomplete="off"
          v-decorator="['account', { rules: [{ required: true, message: '请填写权限名称' }] }]"
          placeholder="请填写用户名"
        />
      </a-form-item>
      <a-form-item label="密码" v-if="!isEdit">
        <a-input-password 
          autocomplete="new-password"
          v-decorator="['password', {rules: [{ required: true, message: '请填写密码' }] }]"
          placeholder="请填写密码"
        />
      </a-form-item>
      <a-form-item label="确认密码" v-if="!isEdit">
        <a-input-password 
          autocomplete="new-password"
          v-decorator="['confimPwd', {rules: [{ required: true, message: '请填写确认密码' },{
                  validator: checkPwd,
                }] }]"
          placeholder="请填写确认密码"
        />
      </a-form-item>
      <a-form-item label="用户姓名">
        <a-input
          v-decorator="['name', { rules: [{ required: true, message: '请填写权限名称' }] }]"
          placeholder="请填写用户姓名"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
export default {
  name: 'user-info',
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
      return this.record.id ? '修改用户' : '添加用户'
    },
    isEdit () {
      return !!this.record.id
    },
    
  },
  data () {
    return {
      form: this.$form.createForm(this, { name: 'coordinated' })
    }
  },
  watch: {
    visible (value) {
      if (value && this.record.id) {
        this.$nextTick(()=> {
          const formItems = this.form.getFieldsValue();
          Object.keys(formItems).forEach(key => {
            formItems[key] = this.record[key]
          })
          this.form.setFieldsValue(formItems);
        })
      }
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
          url = this.record.id ? `${url}/${this.record.id}/update` : url
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
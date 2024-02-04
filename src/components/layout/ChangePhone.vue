<template>
  <a-modal class="change-phone" :visible="visible"
    :destroyOnClose="true" width="600px" okText="提交" :confirm-loading="confirmLoading" cancelText="关闭" :title="title" :maskClosable="false"
    :keyboard="false" @cancel="closeModal()" @ok="handleSubmit">
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-form-item label="旧手机号">
        <a-input :disabled="true" :max-length="11" v-decorator="['phoneOld', { initialValue: userInfo.userPhone,rules: phoneRules }]" placeholder="请填写旧手机号" />
      </a-form-item>
      <a-form-item class="search-input" label="短信验证码">
        <a-input-search @search="getCode(1)" :max-length="6" v-decorator="['phoneOldCode', { rules: smsRules }]" placeholder="请填写短信验证码" >
          <a-button :loading="oldBtnLoading" type="primary" slot="enterButton" v-if="oldTimeout === '获取验证码'">{{oldTimeout}}</a-button>
          <a-button :disabled="true" type="link" slot="enterButton" v-else>{{oldTimeout}} s</a-button>
        </a-input-search>
      </a-form-item>
      <a-form-item label="新手机号">
        <a-input :max-length="11" v-decorator="['phoneNew', { rules: phoneRules }]" placeholder="请填写新手机号" />
      </a-form-item>
      <a-form-item class="search-input" label="短信验证码">
        <a-input-search @search="getCode(2)" :max-length="6" v-decorator="['phoneNewCode', { rules: smsRules }]" placeholder="请填写短信验证码" >
          <a-button  :loading="newBtnLoading" type="primary" slot="enterButton" v-if="newTimeout === '获取验证码'">{{newTimeout}}</a-button>
          <a-button :disabled="true" type="link" slot="enterButton" v-else>{{newTimeout}} s</a-button>
        </a-input-search>
      </a-form-item>

    </a-form>
  </a-modal>
</template>
<script>
  import regex from '@/utils/regex'
  import {mapGetters} from 'vuex'
  export default {
    name: 'select-info',
    props: {
      visible: {
        type: Boolean,
        default: false
      },
    },
    computed: {
      ...mapGetters(['userInfo']),
      title() {
        return '修改手机号'
      },

    },
    data() {
      return {
        oldTimer: null,
        oldTimeout: '获取验证码',
        newTimer: null,
        phoneRules: [
          {required: true, message: '请输入手机号'},
          {pattern: regex.phone, message: '请输入正确的手机号'},
        ],
        smsRules: [
          {required: true, message: '请输入验证码'},
          {pattern: /^\d{4,6}$/, message: '请输入正确的验证码'},
        ],
        newTimeout: '获取验证码',
        confirmLoading: false,
        oldBtnLoading: false,
        newBtnLoading: false,
        form: this.$form.createForm(this, {
          name: 'coordinated'
        }),
      }
    },
    watch: {
      visible(value) {
        if (this.oldTimer) {
          clearTimeout(this.oldTimer)
          this.oldTimer = null
        }
        if (this.newTimer) {
          clearTimeout(this.newTimer)
          this.newTimer = null
        }
        this.oldTimeout = '获取验证码'
        this.newTimeout = '获取验证码'
      }
    },
    methods: {
      getCode (type) {
        const typeObj = {
          1: {
            key: 'phoneOld',
            timer: 'oldTimer',
            timeout: 'oldTimeout',
            loading: 'oldBtnLoading',
          },
          2: {
            key: 'phoneNew',
            timer: 'newTimer',
            timeout: 'newTimeout',
            loading: 'newBtnLoading',
          },
        }
        if (this[typeObj[type]['timeout']] !=='获取验证码') return 
        if (type == 2) {
          const oldPhone = this.form.getFieldValue('phoneOld')
          const phoneNew = this.form.getFieldValue('phoneNew')
          if (oldPhone === phoneNew) return this.$message.error('新手机号和旧手机号相同，不需要更改！') 
        }
        const phone = this.form.getFieldValue(typeObj[type]['key'])
        console.log(phone)
        if (!regex.phone.test(phone)) return this.$message.error('请输入正确的手机号！')
        this[typeObj[type]['loading']] = true
        this.$post('/shop/style/sms/send', {phoneNumber: phone}).then(res => {
          this[typeObj[type]['loading']] = false
          if (res && res.returnCode === 1000) {
            this.$message.success('验证码发送成功！')
            if (typeObj[type]['timer']) {
              clearTimeout(this[typeObj[type]['timer']])
              this[typeObj[type]['timer']] = null
            }
            this[typeObj[type]['timeout']] = 120
            this.setTimer(typeObj[type]['timer'], typeObj[type]['timeout'])
          }
        }).catch(()=>{this[typeObj[type]['loading']] = false})
      },
      setTimer (timer, timeout) {
        if (this[timer]) {
          clearTimeout(this[timer])
          this[timer] = null
        }
        this[timer] = setTimeout(() => {
          if (this[timeout] <= 0) {
            this[timeout] = '获取验证码'
          } else {
            this[timeout] --
            this.setTimer(timer, timeout)
          }
        }, 1000);
      },
      handleSubmit() {
        this.form.validateFields((err, values) => {
          if (!err) {
            if (values.phoneNew === values.phoneOld) return this.$message.error('新手机号和旧手机号相同，不需要更改！')
            this.confirmLoading = true
            this.$post('/shop/style/changephone', {
              ...values
            }).then(res => {
              this.confirmLoading = false
              if (res && res.returnCode === 1000) {
                this.$message.success('保存成功，您需要重新登录！')
                this.$router.push('/login')
                this.closeModal()
              }
            }).catch(()=> {this.confirmLoading = false})
          }
        });
      },
      closeModal() {
        this.form.resetFields()
        this.$emit('cancel')
      },
    },
  }
</script>
<style lang="less">
.change-phone {
  .search-input {
    .ant-input {
      border-radius: 4px!important;
      border: 1px solid #d9d9d9!important;
    }
    .ant-input-search-button {
      margin-left: 10px!important;
      border-radius: 4px!important;
    }
  }
}
</style>
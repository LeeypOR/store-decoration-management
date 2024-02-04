<template>
  <div class="login-page">
    <h1 class="login-logo"></h1>

    <!-- 短信验证码登录 -->
    <div class="login-container" v-show="current === 'sms'">
      <div class="right-toggle toggle-qr pointer" @click="toggleLoginType('qrcode')" title="切换到二维码登录"></div>
      <h3>验证码登录</h3>
      <a-form-model
        class="login-form"
        ref="form"
        :rules="rules"
        :model="form"
        :form="form"
        @submit.prevent="handleSubmit">
        <a-form-model-item prop="phone" class="login-input-account">
          <a-input

            autofocus
            :maxLength="11"
            v-model.trim="form.phone"
            @change="e=>form.phone = e.target.value.replace(/\D/g,'')"
            prefix="+86"
            placeholder="请输入账户">
          </a-input>
        </a-form-model-item>
        <a-form-model-item prop="smsCode" class="login-input-sms">
          <a-input
            :maxLength="6"
            placeholder="请输入验证码"
            @change="e=>form.smsCode = e.target.value.replace(/\W/g,'')"
            v-model.trim="form.smsCode">
            <a-button :loading="getSmsLoading" slot="suffix" @click="getSmsCode" class="sms-btn" v-if="smsTimeout === 0" type="link" ghost>获取验证码</a-button>
            <span slot="suffix" class="count-dowm" v-else>重新获取 {{smsTimeout}} s</span>
          </a-input>
        </a-form-model-item>
        <a-form-item class="login-btn">
          <a-button :loading="loginLoading" block type="primary" html-type="submit">
            登录
          </a-button>
        </a-form-item>
      </a-form-model>
    </div>

    <!-- 二维码登录 -->
    <div class="login-container" v-show="current === 'qrcode'">
      <div class="right-toggle toggle-sms pointer" @click="toggleLoginType('sms')" title="切换到短信验证码登录"></div>
      <h3>扫码登录</h3>
      <div class="form-qrcode">
        <div class="qrcode-img" :style="{backgroundImage: `url(${qrcodeImg})`}"></div>
      </div>
      <p class="qr-tip">请使用<span class="text-primary">金店涨APP</span>扫码登录</p>
    </div>
  </div>
</template>
<script>
  import regex from '@/utils/regex'
  import QRCode from 'qrcode'
  export default {
    name: 'LoginPage',
    data () {
      return {
        logining: false, // 登录防抖
        current: 'sms',
        qrcodeImg: '', // 二维码图片
        smsTimeout: 0, // 短信验证码倒计时
        getSmsLoading: false, // 获取短信按钮加载状态
        loginLoading: false, // 登录按钮加载按钮
        smsTimer: null, // 验证码定时器
        queryQrCodeTimer: null, // 查询二维码结果定时器
        form: {
          phone: '',
          smsCode: ''
        },
        rules: {
          phone: [
            { required: true, message: '请输入手机号', trigger: ['change', 'blur']},
            { pattern: regex.phone, message: '请输入正确的手机号', trigger: ['change', 'blur']}
          ],
          smsCode: [
            { required: true, whitespace: true, message: '请输入验证码', trigger: ['change', 'blur']},
            { pattern: /^[A-Za-z0-9]{4,6}$/, message: '请输入正确的验证码', trigger: ['change', 'blur']}
          ]
        }
      }
    },
    created () {
      // this.logout()
    },
    methods: {
      // 进来页面前先登出
      logout () {
        // this.$post('/logout')
      },
      // 切换登录方式
      toggleLoginType (type) {
        this.current = type
        if (type === 'qrcode' && !this.qrcodeImg) {
          this.getQrCode()
        }
      },
      // 获取二维码
      getQrCode () {
        this.$post('/qrcode').then(res => {
          if (res && res.returnCode === 1000 && res.dataInfo.qrcodeToken) {
            QRCode.toDataURL(res.dataInfo.qrcodeToken).then(src => {
              this.qrcodeImg = src
              this.startQueryQrCodeResult(res.dataInfo.qrcodeToken)
            })
          }
        })
      },
      // 重置二维码定时器
      resetQrCodeTimer () {
        if (this.queryQrCodeTimer) {
          clearTimeout(this.queryQrCodeTimer)
          this.queryQrCodeTimer = null
        }
      },
      // 开始查询二维码登录结果
      startQueryQrCodeResult (qrcodeToken) {
        this.$post('/login/qrcode', { qrcodeToken }).then(res => {
          if (res && res.returnCode === 1000) {
            this.resetQrCodeTimer()
            if (res.dataInfo.qrcodeStatus == '3') {
              this.$message.success('扫码登录成功!')
              window.localStorage.storetoken = res.dataInfo.token
              // 初始化会员等级配置数据
              this.$post('/login/init')
              this.$router.push({ name: 'Dashboard' })
            } else {
              this.queryQrCodeTimer = setTimeout(() => {
                this.startQueryQrCodeResult(qrcodeToken)
              }, 1000)
            }
          }
        })
      },
      // 登录
      handleSubmit () {
        if (this.loginLoading) return
        this.loginLoading = true
        if (this.form.smsCode == '666') {
          this.$message.success('登录成功!')
          window.localStorage.storetoken = '123456789'
          this.$router.push({ name: 'Dashboard' })
        }
        // this.$refs.form.validate(validate => {
        //   if (validate) {
        //     this.$post('/login/sms', this.form).then(res => {
        //       this.loginLoading = false
        //       if (res && res.returnCode === 1000) {
        //         this.$message.success('登录成功!')
        //         window.localStorage.storetoken = res.dataInfo.token
        //         // 初始化会员等级配置数据
        //         this.$post('/login/init')
        //         this.$router.push({ name: 'Dashboard' })
        //       }
        //     }).catch(() => {
        //       this.loginLoading = false
        //     })
        //   } else {
        //     this.loginLoading = false
        //   }
        // })
      },
      // 开启短信验证码倒计时
      startSmsTimer () {
        this.smsTimer = setTimeout(() => {
          if (this.smsTimeout <= 0) {
            this.resetSmsTimer()
          } else {
            this.smsTimeout--
            this.startSmsTimer()
          }
        }, 1000)
      },
      // 重置短信验证码定时器
      resetSmsTimer () {
        this.smsTimeout = 0
        if (this.smsTimer) {
          clearTimeout(this.smsTimer)
          this.smsTimer = null
        }
      },
      // 获取短信二维码
      getSmsCode () {
        this.$refs.form.validateField('phone', (err) => {
          if (!err) {
            this.getSmsLoading = true
            this.$post('/send/sms', { phone: this.form.phone }).then(res => {
              this.getSmsLoading = false
              if (res && res.returnCode === 1000) {
                this.$message.success('验证码发送成功！')
                this.startSmsTimer()
                this.smsTimeout = 120
              }
            }).catch(() => this.getSmsLoading = false)
          }
        })
      }
    },
    beforeDestroy () {
      this.resetSmsTimer()
      this.resetQrCodeTimer()
    }
  }
</script>
<style lang="less" scoped>
  .login-page {
    height: 100vh;
    background: url("~@/assets/images/login/home_big_bg.png") center/ cover no-repeat;
    padding-top: 30px;

    .login-logo {
      margin: 0;
      // margin-left: 40px;
      height: 30px;
      width: 100%;
      background: url("~@/assets/images/login/logo.png") no-repeat 40px center/auto 100%;
    }

    .login-container {
      background-color: #fff;
      width: 400px;
      border-radius: 10px;
      overflow: hidden;
      padding: 40px 40px 92px;
      position: relative;
      margin: 80px auto 0;

      .right-toggle {
        position: absolute;
        right: 0;
        top: 0;
        z-index: 2;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: top right;
        width: 80px;
        height: 80px;

        &.toggle-qr {
          background-image: url("~@/assets/images/login/login_scan_code.png");
        }

        &.toggle-sms {
          background-image: url("~@/assets/images/login/login_account_password.png");
        }
      }

      h3 {
        font-size: 22px;
        margin-bottom: 60px;
      }
      .login-form {
        /deep/.ant-input {
          border-top: none!important;
          border-left: none!important;
          border-right: none!important;
          box-shadow: none!important;
          outline: none!important;
          border-radius: 0;
          line-height: 48px;
          height: 48px;
          font-size: 16px;
        }
        .login-input-account {
          /deep/input {
            padding-left: 64px;
          }
        }
        .login-input-sms {
          .sms-btn {
            color: #999;
          }
        }
        .login-btn {
          padding-top: 100px;
          .ant-btn {
            height: 48px;
            border-radius: 6px;
            font-size: 16px;
          }
        }

      }
      .form-qrcode {
        width: 220px;
        height: 220px;
        background: url("~@/assets/images/login/login_scan_code_frame.png") no-repeat 100% 100%;
        margin: 0 auto;
        padding: 4px;
        .qrcode-img {
          width: 100%;
          height: 100%;
          background-repeat: no-repeat;
          background-size: 100%;
          background-position: center;
        }
      }
      .qr-tip {
        margin-top: 20px;
        text-align: center;
      }
    }
  }
</style>

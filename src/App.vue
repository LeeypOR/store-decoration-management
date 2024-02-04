<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <!-- <a-spin :spinning="this.$store.state.loadding"> -->
        <router-view />
      <!-- </a-spin> -->
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
  name: 'App',
  created () {
    if (!window.localStorage.storetoken && this.$route.name !== 'Login') {
      this.$router.push('/login')
    }
    this.setRem()
    // window.addEventListener('resize', this.setRem)
    // window.addEventListener('orientationchange', this.setRem)
  },
  data () {
    return {
      locale: zhCN
    }
  },
  methods: {
    setRem () {
      var html = document.querySelector('html')
      var width = html.getBoundingClientRect().width
      console.log('设备的width', width)
      // width / 1440 * 100
      html.style.fontSize = width / 1440 * 100 + 'px'
      // if (width >= 1680) {
      //   console.log('font-size', width / 128)
      //   html.style.fontSize = width / 128 + 'px'
      // } else if (width > 1280 && width < 1680) {
      //   console.log('font-size', width / 128)
      //   html.style.fontSize = width / 128 + 'px'
      // } else {
      //   console.log('font-size', width / 100)
      //   html.style.fontSize = width / 100 + 'px'
      // }
      // console.log(html.style.fontSize);
    }
  }
}
</script>
<style lang="less">
#app > .ant-spin-nested-loading > div > .ant-spin-spinning {
  position: fixed;
  width: 100%;
  height: 100vh;
  max-height: unset;
  z-index: 9999;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, .4);
  .ant-spin-dot-spin {
    top: 300px;
  }
}
</style>

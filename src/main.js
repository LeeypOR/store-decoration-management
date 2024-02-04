// import 'babel-polyfill'
import Vue from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'
import router from './router'
import store from './store'
import './plugins'
import './assets/style/reset.less'
import './assets/style/common.less'
import './assets/style/antd.less'
import './assets/fonts/iconfont.css'
Vue.prototype.$EventBus = new Vue()
Vue.config.productionTip = false
Vue.use(Antd)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

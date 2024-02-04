<template>
    <!-- 左侧菜单 -->
    <a-layout-sider class="layout-sider" :trigger="null" >
      <h1 class="logo pointer">
        <a-dropdown :trigger="['click']">
          <div class="img" :style="{backgroundImage: `url(${userInfo.shopLogo || require('@/assets/images/default/user.png')})`}"></div>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;" @click="changePhoneVisible = true">更换手机号</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;" @click="logout">退出登录</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </h1>

      <!-- 菜单列表 -->
      <template v-if="checkRole">
        <a-menu
          class="menu-list noscroll"
          mode="inline"
          theme="dark"
          :selectedKeys="selectedKeys || []"
          @select="(selected)=>($emit('menuSelect', selected))"
        >
          <template v-for="item in MENU">
            <a-menu-item :title="item.title" v-if="item.show" :key="item.key">
              <icon-font v-if="item.icon" :type="item.icon" />
              <a-icon v-else type="file-text" />
              <span>{{ item.title }}</span>
            </a-menu-item>
          </template>
          <!-- <template v-for="item in MENU">
            <a-menu-item :title="item.title" v-if="item.show && !(item.children && item.children.length)" :key="item.key">
              <a-icon :type="item.icon || 'file-text'" />
              <span>{{ item.title }}</span>
            </a-menu-item>
            <sub-menu v-if="item.show && item.children && item.children.length" :key="item.key" :menu-info="item" />
          </template> -->
          <change-phone :visible="changePhoneVisible" @cancel="closeChangePhone" />
        </a-menu>
      </template>

    </a-layout-sider>
</template>
<script>
import LayoutSubMenu from './LayoutSubMenu'
import ChangePhone from './ChangePhone'
import {mapGetters} from 'vuex'
import { Icon } from 'ant-design-vue';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2931845_kv92qrgudsa.js',
});

export default {
  name: 'LayoutSidebar',
  components: {
    'sub-menu': LayoutSubMenu,
    ChangePhone,
    IconFont
  },
  data () {
    return {
      changePhoneVisible: false,
      auditStatuse:''
    }
  },
  created() {

    this.$get('/distributor/registStatus').then(res => {
      if (res && res.returnCode === 1000) {
        console.log("银行注册状态",res)
   /*     this.formData.id = res.dataInfo.id
        this.type = res.dataInfo.type*/
        this.auditStatuse = res.dataInfo.auditStatuse

      }
    })
  },
  computed: {
    ...mapGetters(['userInfo']),
    checkRole(){
      let res ;
      // 不是供应商分销商 就显示菜单  供应商3 分销商4
      if (this.userInfo.userIdType!==3 && this.userInfo.userIdType!==4 ){
        console.log('不是供应商分销商')
        res = true
        return res
      }else if ((this.userInfo.userIdType ===3 && this.auditStatuse === 1) ||( this.userInfo.userIdType === 4 && this.auditStatuse ===1)){
        // 是供应商或者分销商的时候，，同时还注册国际银行才能显示菜单
        console.log("是供应商或分销商且注册了国际银行")
        res = true
        return res
      }else {
        console.log("是供应商或分销商且但是未成功注册国际银行")
        res = false
        return res
      }
    }
  },
  props: {
    MENU: {
      type: Array,
      required: true
    },
    selectedKeys: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    closeChangePhone () {
      this.changePhoneVisible = false
    },
    logout () {
      this.$confirm({
        title: '退出确认',
        content: '请确认是否退出登录？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          this.$router.push('/login')
        }
      });
    },

  }
}
</script>
<style lang="less" scoped>
.layout-sider {
  width: 120px!important;
  min-width: auto!important;
  flex: none!important;
  background-color: #202324;
  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
    height: 100vh;
    .logo {
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 80px;
      .img {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        background-color: #d8d8d8;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
      }
    }
    .menu-list {
      flex: 1;
      overflow: auto;
      background-color: #202324;
      .ant-menu-item {
        color: #75859B;
        position: relative;
        height: 42px;
        font-size: 16px;
        line-height: 42px;
        .anticon{
          font-size: 16px;
          margin-right: 6px;
        }
        &.ant-menu-item-selected {
          background-color: #fff;
          span, i {
            color: #016DFF;
          }
          &::after {
            content: '';
            width: 3px;
            height: 12px;
            background-color: #016DFF;
            position: absolute;
            right: 4px;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
  }
}
</style>

<template>
  <!-- <a-layout id="components-layout-demo-custom-trigger"> -->
  <a-layout id="components-layout">
    <!-- <a-layout id="components-layout-demo-custom-trigger" v-if="storeUserInfo && storeDictAll"> -->

    <!-- 左侧菜单 -->
    <LayoutSidebar
      :currentMenu="currentMenu"
      :selectedKeys="selectedKeys"
      @menuSelect="menuSelect"
      v-show="MENU.length"
      :MENU="MENU"
    />
    <LayoutMenuChildren
      :currentMenu="currentMenu"
      :menuChildren="menuChildren"
      :selectedKeys="selectedKeys"
      :MENU="MENU"
      @menuChildrenSelect="menuChildrenSelect"
    />
    <!-- 右侧内容 -->
    <a-layout class="layout-content">
      <!-- 页面头部 -->
      <LayoutHeader :currentMenu="currentMenu" :secondTitle="secondTitle" />
      <!-- 页面内容 -->
      <a-layout-content
        class="layout-router"
        v-if="storeUserInfo && storeDictAll"
      >
        <div>
          <a-spin :spinning="this.$store.state.loadding">
            <transition name="slide-fade" mode="out-in">
              <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
              </keep-alive>
            </transition>
            <transition name="slide-fade" mode="out-in">
              <router-view v-if="!$route.meta.keepAlive"></router-view>
            </transition>
          </a-spin>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import LayoutHeader from '@/components/layout/LayoutHeader'
import LayoutSidebar from '@/components/layout/LayoutSidebar'
import LayoutMenuChildren from '@/components/layout/LayoutMenuChildren'
import MENU from '@/router/menu'
import { mapGetters } from 'vuex'
import isEmpty from 'lodash/isEmpty'
import { makeId } from '@/utils'
import { getDictAll } from '@/utils/dict'
export default {
  name: 'Welcome',
  data () {
    return {
      MENU,
      menuChildren: [],
      flatMenu: [],
      currentMenu: {},
      secondTitle: '',
      selectedKeys: []
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'dictAll']),
    storeUserInfo () {
      return true
      // return isEmpty(this.userInfo) ? null : this.userInfo
    },
    storeDictAll () {
      return true
      // return isEmpty(this.dictAll) ? null : this.dictAll
    },
    isExclude () {
      const excludePathNameList = [
        'ShopCustomDecorateMicroPageMicroPageDecoration'
      ]
      const result = !excludePathNameList.includes(this.$route.name)
      return result
    }
  },
  watch: {
    currentMenu: function (current) {
      this.$set(this, 'selectedKeys', [])
      if (current) {
        this.getSelectedKeys(current)
      }
    },
    $route: {
      handler: function (val, oldVal) {
        if (val.path == '/customer/Info') {
          this.secondTitle = '浏览记录/浏览详情'
        } else if (val.path == '/customer/userInfo') {
          this.secondTitle = '客户列表/客户详情'
        } else if (val.path == '/shop/system/divisionSetting/styleEditor') {
          this.secondTitle = '分类设置/样式编辑'
        } else if (val.path == '/marketing/sellCard/orderList') {
          this.secondTitle = '售卡活动/查看订单'
        } else {
          this.secondTitle = ''
        }
      },
      deep: true
    }
  },
  components: {
    LayoutSidebar,
    LayoutHeader,
    LayoutMenuChildren
  },
  async created () {
    await this.getUserInfo()
    await getDictAll()
    // this.getDictAll()
  },
  mounted () {
    // console.log('加载完毕：', this.$route.path)
    console.log('$route', this.$route)
  },
  methods: {
    setDefaultMenu () {
      const pathname = this.$route.name
      const currentMenu =
        this.flatMenu.find((item) => item.pathname === pathname) ||
        this.MENU[0]
      if (currentMenu && currentMenu === this.MENU[0]) {
        this.$set(this, 'currentMenu', this.MENU[0])
        this.$router.push({ name: 'Dashboard' })
      } else {
        this.$set(this, 'currentMenu', currentMenu)
      }
      this.getSelectedKeys(this.currentMenu)

      // 设置默认的第二列菜单
      const selectedRootMenu = this.MENU.find(
        (item) => this.selectedKeys.indexOf(item.key) > -1
      )
      if (selectedRootMenu) {
        this.menuChildren = selectedRootMenu.children || []
      } else {
        this.menuChildren = []
      }
    },
    deepEachMenu (menu, parent) {
      const permissions = this.userInfo.permissions || []
      // if (!(permissions && permissions.length)) return
      menu &&
        menu.length &&
        menu.forEach((item) => {
          // 没配鉴权信息默认展示
          // const show = !item.authority || (permissions && permissions.length && permissions.indexOf(item.authority) > -1)
          // 没配鉴权信息则不展示。
          // const show =
          //   item.authority &&
          //   permissions &&
          //   permissions.length &&
          //   permissions.indexOf(item.authority) > -1

          // 全部展示菜单
          const show = true

          this.$set(item, 'show', show)
          this.$set(item, 'parent', parent)
          this.$set(item, 'key', makeId())
          this.$set(
            item,
            'breadcrumb',
            `${ (item.parent && item.parent.breadcrumb) || '' } / ${ item.title }`
          )
          this.flatMenu.push(item)
          if (item.children && item.children.length) {
            this.deepEachMenu(item.children, item)
          }
        })
    },
    // 点击第一列菜单
    menuSelect ({ item, key, selectedKeys }) {
      this.$set(this, 'menuChildren', [])
      console.log(selectedKeys)
      const selectMenu = this.flatMenu.find((menu) => menu.key === key)
      console.log('点击的菜单----', selectMenu)
      if (selectMenu) {
        if (selectMenu.children && selectMenu.children.length) {
          this.$set(this, 'menuChildren', selectMenu.children)
        } else if (selectMenu.pathname) {
          this.$router.push({ name: selectMenu.pathname })
          this.$set(this, 'currentMenu', selectMenu)
        }
        this.$set(this, 'currentMenu', selectMenu)
      }
    },
    // 点击第二列菜单
    menuChildrenSelect ({ item, key, selectedKeys }) {
      console.log(selectedKeys)
      const selectMenu = this.flatMenu.find((menu) => menu.key === key)
      console.log('点击的菜单----', selectMenu)
      if (selectMenu && selectMenu.pathname) {
        this.$router.push({ name: selectMenu.pathname })
        this.$set(this, 'currentMenu', selectMenu)
      }
    },
    getSelectedKeys (menu) {
      // console.log('menu----', menu)
      if (menu.key) {
        this.selectedKeys.push(menu.key)
      }
      if (menu.parent) {
        this.getSelectedKeys(menu.parent)
      }
    },
    async getUserInfo () {
      this.$store.dispatch('setUserInfo', {})
      this.flatMenu = []
      this.deepEachMenu(this.MENU)
      this.setDefaultMenu()

      // try {
      //   const res = await this.$get('/user/info')
      //   console.log('用户信息:', res)
      //   // const res = await this.$get('/userInfo')
      //   if (res && res.returnCode === 1000) {
      //     this.$store.dispatch('setUserInfo', res.dataInfo)
      //     this.flatMenu = []
      //     this.deepEachMenu(this.MENU)
      //     this.setDefaultMenu()
      //   } else {
      //     this.$router.push('/login')
      //   }
      // } catch (error) {
      //   this.$router.push('/login')
      // }
    }
    // async getDictAll () {
    //   const res = await this.$get('/sys/dict/all')
    //   if (res && res.returnCode === 1000) {
    //     await this.$store.dispatch('setDictAll', res.dataInfo)
    //   }
    // }
  }
}
</script>
<style lang="less" scoped>
#components-layout {
  display: flex;
  height: 100vh;
  // min-width: 1440px;
  min-width: 1366px;
  .ant-layout-content {
    flex: 1;
    overflow: auto;
  }
  /deep/.layout-menu-children {
    .ant-menu-submenu-title {
      padding-left: 35px!important;
    }
  }
  .layout-router {
    padding: 16px;
    background: #f6f7f8;
    flex: 1;
    > div {
      background-color: #fff;
      padding: 16px;
      // min-height: 800px;
      min-height: 680px;
      // height: calc(100vh - 86px);
    }
  }
}
.slide-fade-enter-active {
  transition: all 0.2s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>

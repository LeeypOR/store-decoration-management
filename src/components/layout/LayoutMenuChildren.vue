<template>
    <!-- 左侧菜单 -->
    <a-layout-sider
      class="layout-menu-children"
      :class="{empty: !(menuChildren && menuChildren.length)}"
      :trigger="null"
      style="flex: 0 0 0;">
      <div class="layout-menu-children-flex">
        <p class="menu-title pointer center" @click="$router.push({name: 'Dashboard'})">
          {{selectRootMenu.title}}
        </p>
        <!-- 第二列菜单列表 -->
        <a-menu
            class="layout-menu-children-flex-list noscroll"
            mode="inline"
            theme="light"
            :selectedKeys="selectedKeys || []"
            @click="(selected)=>($emit('menuChildrenSelect', selected))"
          >
          <template v-for="item in menuChildren">
            <a-menu-item style="padding-left: 24px;" :title="item.title" v-if="item.show && !item.hide && !(item.children && item.children.length)" :key="item.key">
              <!-- <a-icon :type="item.icon || 'file-text'" /> -->
              <span>{{ item.title }}</span>
            </a-menu-item>
            <sub-menu v-if="item.show && !item.hide && item.children && item.children.length" :key="item.key" :menu-info="item" />
          </template>
        </a-menu>
      </div>
    </a-layout-sider>
</template>
<script>
import LayoutSubMenu from './LayoutSubMenu'
export default {
  name: 'LayoutMenuChildren',
  components: {
    'sub-menu': LayoutSubMenu
  },
  data () {
    return {
    }
  },
  props: {
    menuChildren: {
      type: Array
    },
    MENU: {
      type: Array
    },
    selectedKeys: {
    }
  },
  computed: {
    // 给个初始值避免找不到的时候报错。
    selectRootMenu () {
      return this.MENU ? this.MENU.find(item => this.selectedKeys.indexOf(item.key) > -1) || {} : {}
    }
  }
}
</script>
<style lang="less" scoped>
.layout-menu-children {
  border-right: 1px solid #e8e8e8;
  background-color: #fff;
  width: 130px!important;
  min-width: auto!important;
  flex: none!important;
  overflow: hidden;
  transition: all .2s ease-in-out;
  &-flex {
    height: 100%;
    display: flex;
    flex-direction: column;
    &-list {
      flex: 1;
      overflow-x: hidden;
      overflow-y: auto;
      border: none;
    }
  }
  &.empty {
    width: 0!important;
  }
  .ant-menu-item {
    text-align: center;
    padding: 0!important;
    text-align: center;
    span {
      padding: 6px 24px;
      color: #666;
      transition: all .3s ease-in-out;
    }
    &.ant-menu-item-active,
    &.ant-menu-item-selected {
      background-color: #fff;
      &::after {
        display: none;
      }
      span {
        color: #333;
        background-color: #EDF0F4;
      }
    }
  }
  .ant-menu-submenu-title {
    color: #333;
    padding-left: 30px!important;
    padding-right: 10px;
    .ant-menu-submenu-arrow{
      left: 14px!important;
      &::before {

        background: #666!important;
      }
      &::after {

        background: #666!important;
      }
    }
  }
  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
    height: 100vh;
    .menu-title {
      font-size: 1px;
      text-align: center;
      line-height: 54px;
      font-size: 14px;
      // color: #333;
      margin: 0;
      white-space: nowrap;
      font-weight: bold;
      position: relative;
      border-bottom: 1px solid #e8e8e8;
    }
    .menu-list {
      flex: 1;
      overflow: auto;
    }
  }
}

</style>

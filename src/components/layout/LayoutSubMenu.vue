<template>
  <a-sub-menu :key="menuInfo.key" v-bind="$props" v-on="$listeners">
    <span slot="title">
      <!-- <a-icon :type="menuInfo.icon || 'file-text'" /> -->
      <span>{{ menuInfo.title }}</span>
    </span>
    <template v-for="item in menuInfo.children">
      <a-menu-item style="padding-left: 36px;" v-if="item.show && !item.hide && !(item.children && item.children.length)"  :key="item.key">
        <!-- <a-icon :type="item.icon || 'file-text'" /> -->
        <span>{{ item.title }}</span>
      </a-menu-item>
      <sub-menu v-if="item.show && !item.hide && item.children && item.children.length" :key="item.key" :menu-info="item" />
    </template>
  </a-sub-menu>
</template>
<script>
import { Menu } from 'ant-design-vue';
export default {
  
  name: 'sub-menu',
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
<style lang="less">
</style>
<template>
  <a-row class="layout-tabs">
    <div class="container">
      <a-popover class="opration-list" trigger="hover" placement="bottom" v-for="(tab, index) in tabList" :key="tab.pathname">
        <template slot="content" >
          <p class="opration-item pointer" v-for="item in oprations" :key="item.type" @click.stop="$emit('oprationTab', {index,type: item.type})">{{item.text}}</p>
        </template>
        <div @click="$emit('menuSelect', tab)" class="pointer tab-item" :class="{active: tab.pathname === currentMenu.pathname}">
          <span>{{tab.title}} </span>
          <a-icon @click.stop="$emit('oprationTab', {index, type:'close'})" type="close" :style="{fontSize: '12px'}" v-if="tab.pathname !== 'Dashboard'"/>
        </div>
      </a-popover>
    </div>
  </a-row>
</template>
<script>
export default {
  name: 'LayoutTabs',
  props: {
    tabList: {
      type: Array
    },
    currentMenu: {
      type: Object
    }
  },
  data () {
    return {
      oprations: [
        { text: '关闭', type: 'close' },
        { text: '关闭其他', type: 'closeOther' },
        { text: '关闭右侧', type: 'closeRight' },
        { text: '关闭全部', type: 'closeAll' }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.layout-tabs {
  width: 100%;
  // overflow-x: auto;
  background-color: #fff;
  margin-bottom: 10px;
  .container {
    white-space: nowrap;
    align-items: center;
    padding: 0 20px;
    .tab-item {
      padding: 0 20px;
      display: inline-block;
      line-height: 40px;
      position: relative;
      margin-right: 10px;
      position: relative;
      &:hover {
        color: #1890FF;
      }
      &.active {
        color: #1890FF;
        border-bottom: 2px solid #1890FF;
      }
    }
  }
}
</style>
<style lang="less">

  .opration-item {
    margin: 0;
    padding: 0;
    font-size: 12px;
    line-height: 24px;
    &:hover {
      color: #1890FF;
    }
  }
</style>

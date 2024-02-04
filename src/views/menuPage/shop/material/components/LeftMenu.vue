<template>
  <div class="left_menu">
        <a-menu mode="inline" :defaultOpenKeys="defaultOpenKeys" :defaultSelectedKeys="defaultSelectedKeys">
            <a-sub-menu title="全部图片（1001）" key="s1">
                <a-menu-item key="1">未分组（15）</a-menu-item>
                <a-menu-item key="2">锅（134）</a-menu-item>
                <a-menu-item key="3">道具（134）</a-menu-item>
                <a-menu-item key="4">碗筷（134）</a-menu-item>
            </a-sub-menu>
        </a-menu>
        <a-space>
            <a-button>添加分组</a-button>
            <a-button>管理分组</a-button>
        </a-space>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.left_menu{
    display: flex;
    flex-direction: column;
    .ant-menu{
        flex:1;
    }
    .ant-space{

    }
}
</style>
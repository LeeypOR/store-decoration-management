<template>
    <div class="Official">
        <p>仅当用户扫码访问小程序时展示该组件，用户点击可直接关注(已关注用户显示查看按钮)，该组件不支持样式配置； *商家后台仅支持配置展示页面，能力启用以及选择展示指定公众号请登录<i>[微信小程序-设置-接口设置]</i>操作</p>
    </div>
</template>
<script>
export default {
    name: 'OfficialAccountsForm',
}
</script>
<style lang="less" scoped>
.Official{
    i{
        color:#016dff;
    }
}
</style>
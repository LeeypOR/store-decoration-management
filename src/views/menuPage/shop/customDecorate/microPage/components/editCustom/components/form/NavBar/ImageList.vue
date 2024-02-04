<template>
<a-row>
  <a-list item-layout="horizontal" :data-source="value" v-if="value && value.length">
    <a-list-item slot="renderItem" slot-scope="item">
      <a-list-item-meta>
        <a-avatar slot="avatar" :src="item.src" />
        <a-input slot="title" v-model="item.title" placeholder="请输入标题" />
        <a-input slot="description" v-model="item.desc" placeholder="请输入跳转链接" />
      </a-list-item-meta>
    </a-list-item>
  </a-list>
  <a-button type="dashed" style="width: 100%" @click="addRow">
      <a-icon type="plus" /> 添加背景图
  </a-button>
</a-row>
</template>
<script>
export default {
  name: 'MyImageList',
  props: {
    value: {
      type: Array
    }
  },
  methods: {
    addRow () {
      const value = [...this.value]
      value.push({
        src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        title: '好日子',
        desc: '今天是个好日子'
      })
      this.$emit('input', value)
      this.$emit('change', value)
    }
  }
}
</script>

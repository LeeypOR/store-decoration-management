<template>
  <a-modal
    :visible="visible"
    :footer="false"
    cancelText="关闭"
    :title="title"
    :maskClosable="false"
    :destroyOnClose="true"
    :keyboard="false"
    width="750px"
    height="750px"
    @cancel="closeModal()">
      <div>
        <img style="width: 700px;height: 500px;object-fit:contain" :src="example" alt="无">
      </div>
  </a-modal>
</template>

<script>
  export default {
    name: 'Example',
    props: {
      record: {
        type: Object,
        default() {
          return {}
        }
      },
      visible: {
        type: Boolean,
        default: false
      },
    },
    computed: {
      title () {
        return '查看权益说明示例'
      },

    },
    data () {
      return {
        example:require('@/assets/example.jpg')
      }
    },
    watch: {
      visible (value) {
        if (value && this.record.id) {

        }
      }
    },
    mounted () {

    },
    methods: {
      closeModal (freshTable) {

        this.$emit('cancel', freshTable)
      }
    }
  }
</script>

<style scoped>

</style>
<template>
  <span v-if="!authority || permissions.indexOf(authority) > -1"><slot></slot></span>
</template>
<script>

export default {
  name: 'Permission',
  props: ['authority'],
  computed: {
    permissions () {
      return this.$store.getters.userInfo.permissions || []
    }
  }
}
</script>

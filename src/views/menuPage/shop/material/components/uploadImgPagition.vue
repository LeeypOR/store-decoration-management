<template>
  <a-pagination
    :show-total="(total) => `共${total}条`"
    :defaultPageSize="size"
    :default-current="current"
    v-model="pageCurrent"
    :total="total"
    :pageSizeOptions="pageSizeOptions"
    @change="handleChange"
  />
</template>

<script>
export default {
  name:'uploadImgPagition',
  props: {
    current: {
      type: Number,
      default: 1,
    },
    size: {
      type: Number,
      default: 6,
    },
    total: {
      type: Number,
      default: 0,
    },
    pageSizeOptions: {
      type: Array,
      default() {
        return ["10", "20", "50", "100", "200"];
      },
    },
  },
  watch: {
    current: {
      handler(newVal) {
        this.pageCurrent = newVal;
      },
      immediate: true,
    },
  },
  data() {
    return {
      pageCurrent: 1,
    };
  },
  methods: {
    handleChange(page, pageSize) {
      console.log(page, pageSize);
      this.$emit("change", page, pageSize);
    },
  },
};
</script>

<style>
</style>
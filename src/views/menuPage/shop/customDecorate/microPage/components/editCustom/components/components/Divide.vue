<template>
  <div class="divide" :style="divideHeight">
    <div
      class="divideInside"
      :style="insideHeight"
      v-if="formData.divideType == 1"
    ></div>
  </div>
</template>
<script>
export default {
  name: "MyDivide",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formData() {
      console.log(this.item.config.formData);
      return this.item.config.formData || {};
    },
    divideHeight() {
      return {
        height: this.formData.blankHeight + "px",
        padding: this.formData.left_rightType == 0 ? "" : "0 15px",
        background: this.formData.blankColor,
      };
    },
    insideHeight() {
      return {
        height: this.formData.blankHeight / 2 + "px",
        borderBottom: `1px ${this.formData.lineType} ${this.formData.lineColor}`,
      };
    },
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.divide {
  //   min-height: 20px;
  .divideInside {
    width: 100%;
  }
}
</style>

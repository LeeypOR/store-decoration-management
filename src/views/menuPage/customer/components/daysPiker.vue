<template>
  <div>
    <a-select
      v-model="selectValue"
      :style="stylecss"
      @change="handleChange"
      :getPopupContainer="getPopupContainer()"
      :disabled="tradingConditions.includes(bValue) ? false : true"
    >
      <a-select-option value="1"> 今天 </a-select-option>
      <a-select-option value="7"> 最近7天 </a-select-option>
      <a-select-option value="15"> 最近15天 </a-select-option>
      <a-select-option value="30"> 最近30天 </a-select-option>
      <a-select-option value="45"> 最近45天 </a-select-option>
      <a-select-option value="60"> 最近60天 </a-select-option>
      <a-select-option value="90"> 最近90天 </a-select-option>
      <a-select-option value="180"> 最近180天 </a-select-option>
      <a-select-option value=""> 不限 </a-select-option>
    </a-select>
  </div>
</template>
<script>
export default {
  name: "daysPiker",
  data() {
    return {
      selectValue: "",
    };
  },
  created() {
    this.selectValue = this.selectValues
  },
  props: {
    selectValues:{
      default:'7',
      type:String
    },
    tradingConditions: {
      default: "",
      type: Array,
    },
    changeTime: {
      type: Function,
    },
    stylecss: {
      default: "width:120px;height:unset",
      type: String,
    },
    bValue: {
      default: "",
      type: String,
    },
  },
  destroyed() {

  },
  methods: {
    handleChange(value) {
      //   console.log(`selected ${value}`);
      this.changeTime(value);
    },
    getPopupContainer() {
      return (triggerNode) =>
        triggerNode.parentNode.parentNode.parentNode.parentNode;
    },
    
  },
};
</script>

<style  rel="stylesheet/less" lang="less" scoped>
/deep/.ant-select-selection--single {
  height: 30px !important;
}
</style>

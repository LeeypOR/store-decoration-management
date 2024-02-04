<template>
  <a-form class="search-box-form" :form="form" :onValuesChange="updateFormData"  :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
    <a-form-item label="框体样式">
      <a-radio-group
        :options="[
          {label: '固定', value:1},
          {label: '跟随滚动', value: 0},
        ]"
        v-decorator="['position']"
      />
    </a-form-item>
    <a-form-item label="框体样式">
      <a-radio-group
        :options="[
          {label: '方形', value: '4'},
          {label: '圆形', value: '100'},
        ]"
        v-decorator="['borderRadius']"
      />
    </a-form-item>
    <a-form-item label="文本位置">
      <a-radio-group
        :options="[
          {label: '居左', value: 'left'},
          {label: '居中', value: 'center'},
        ]"
        v-decorator="['textAlign']"
      />
    </a-form-item>
    <a-form-item label="框体高度">
      <a-slider
        v-decorator="['height']"
        :max="40"
        :min="28"
      />
    </a-form-item>
    <a-form-item label="框体宽度">
      <a-slider
        v-decorator="['width']"
        :max="100"
        :min="15"
      />
    </a-form-item>
    <a-form-item label="背景颜色">
      <a-input
        type="color"
        :addon-after="formData.backgroundColor"
        v-decorator="['backgroundColor']"
      />
      <span class="pointer text-primary" @click="form.setFieldsValue({backgroundColor: '#f0f5f8'})">重置</span>
    </a-form-item>
    <a-form-item label="背景透明度">
      <a-slider
        v-decorator="['opacity']"
        :max="100"
        :min="0"
      />
    </a-form-item>
    <a-form-item label="框体颜色">
      <a-input
        type="color"
        :addon-after="formData.borderColor"
        v-decorator="['borderColor']"
      />
      <span class="pointer text-primary" @click="form.setFieldsValue({borderColor: '#ffffff'})">重置</span>
    </a-form-item>
    <a-form-item label="文本颜色">
      <a-input
        type="color"
        :addon-after="formData.color"
        v-decorator="['color']"
      />
      <span class="pointer text-primary" @click="form.setFieldsValue({color: '#999999'})">重置</span>
    </a-form-item>
  </a-form>
</template>
<script>
import isEmpty from 'lodash/isEmpty'
export default {
  name: 'MySearchBoxForm',
  props: {
    formData: {}
  },
  data () {
    return {
      form: this.$form.createForm(this, { name: 'componentform', onValuesChange: this.updateFormData })
    }
  },
  mounted () {
    if (!isEmpty(this.formData)) {
      this.form.setFieldsValue(this.formData)
    }
  },
  methods: {
    updateFormData (props, value) {
      const formData = this.form.getFieldsValue() // formData是表单项更改之前的所有表单值，所以需要和刚更改的表单值合并
      Object.assign(formData, value)
      this.$emit('updateFormData', formData)
    }
  }
}
</script>
<style lang="less" scoped>
  .search-box-form {
  }
</style>

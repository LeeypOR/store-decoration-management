<template>
  <div>
    <div>
      <div>
        <h3 class="title">魔方布局</h3>
        <p class="describe">选定布局区域，在下方添加图片，建议添加比例一致的图片</p>
      </div>
      <div>
        <div class="flex_between ">
          <div class="upload_img"></div>
          <div class="upload_img"></div>
        </div>
        <div class="flex_between">
          <div class="upload_img"></div>
          <div class="upload_img"></div>
          <div class="upload_img"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import isEmpty from 'lodash/isEmpty'
export default {
  name: 'MyRubickCubeForm',
  props: {
    formData: {}
  },
  data () {
    return {
      form: this.$form.createForm(this, {
        name: 'componentform',
        onValuesChange: this.updateFormData
      })
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
.title {
  font-size: 14px;
  color: #333333;
}
.describe {
  font-size: 12px;
  color: #999999;
  margin-bottom:5px;
}
.flex_between {
  display: flex;
  justify-content: space-between;
}
.upload_img {
  display: inline-block;
  width: 173px;
  height: 173px;
  background: pink;
}
.search-box-form {
}
</style>

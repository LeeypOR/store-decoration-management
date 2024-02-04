<template>
  <div class="header_form">
    <a-form
      :form="form"
      :onValuesChange="updateFormData"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 19 }"
    >
      <a-form-item label="页面名称">
        <a-input
          placeholder="请输入页面标题"
          v-decorator="['title', { rules: [{ required: true, message: '请输入页面标题' }] }]"
        />
      </a-form-item>
      <a-form-item label="页面描述">
        <a-input v-decorator="['desc']" />
      </a-form-item>
      <a-form-item label="背景颜色">
        <a-radio-group v-model="formData.backgroundColorType">
          <a-radio value="1">
            默认背景色
          </a-radio>
          <a-radio value="2">
            自定义背景色
          </a-radio>
        </a-radio-group>
        <div class="choose_color_wrap" v-show="formData.backgroundColorType === '2'">
          <a-input type="color" :addon-after="formData.backgroundColor" v-decorator="['backgroundColor']" />
          <span class="pointer text-primary" @click="resetColor">重置 </span>
        </div>
      </a-form-item>
      <!-- <a-form-item label="字体颜色">
        <a-input
          type="color"
          :addon-after="formData.color"
          v-decorator="['color']"
        />
      </a-form-item> -->
    </a-form>
  </div>

</template>
<script>
import isEmpty from 'lodash/isEmpty'
export default {
	name: 'MyHeaderForm',
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
		resetColor () {
			console.log('this.formData', this.formData)
			console.log('this.formData.defaultBackgroundColor', this.formData.defaultBackgroundColor)
			// this.form.setFieldsValue({ backgroundColor: this.formData.defaultBackgroundColor })
			this.form.setFieldsValue({ backgroundColor: '#f5f5f5' })
		},
		updateFormData (props, value) {
			let formData = this.form.getFieldsValue() // formData是表单项更改之前的所有表单值，所以需要和刚更改的表单值合并
			formData = Object.assign({}, this.formData, formData, value, { type: 'header' })
			this.$emit('updateFormData', formData)
		}
	}
}
</script>
<style lang="less" scoped>
.header_form {
}
</style>

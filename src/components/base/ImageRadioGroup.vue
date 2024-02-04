<!--  -->
<template>
	<div class="radio-group-wrap">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'ImageRadioGroup',
	components: {},
	directives: {},
	filters: {},
	mixins: [],
	model: {},
	props: {
		value: {
			type: [String, Number],
			default: ''
		}
	},
	data () {
		return {}
	},
	computed: {},
	watch: {
    value (n, o) {
      this.$emit('change', n)
    }
  },
	beforeCreate () {},
	created () {},
	beforeMount () {},
	mounted () {
		if (this.value) {
			this.dispatch(this.value)
		}
		this.$on('radioChange', this.radioChange)
	},
	beforeUpdate () {},
	updated () {},
	activated () {},
	deactivated () {},
	beforeDestroy () {},
	destroyed () {},
	// 方法集合
	methods: {
    // checkAllNone () {
    //   // const allNone = this.$children.every(item => !item.isChecked)
    //   // console.log('allNone', allNone)
    // },
		dispatch (value) {
			// 调用所有子组件的checkIsActive方法
			this.$children.forEach(item => {
				const temp = item
				temp.checkIsActive(value)
			})
		},
		radioChange (value) {
      console.log('切换')
      // this.checkAllNone()
			this.$emit('input', value)
			this.dispatch(value)
		}
	}
}
</script>
<style rel="stylesheet/less" lang="less" scoped>
//@import url();
</style>

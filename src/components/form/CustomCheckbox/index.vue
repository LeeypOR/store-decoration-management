<template>
  <div>
    <!-- <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange($event.target.checked)">
      全选
    </a-checkbox>
    <a-checkbox-group v-model="checkedList" :options="options" @change="onChange" /> -->
 
  
    
    <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange($event.target.checked)">
      全选
    </a-checkbox>
    <a-tree
        class="tree"
        checkable
        :checkStrictly="false"
        :tree-data="options"
        :replace-fields="replaceFields"
        :default-expand-all="false" 
        v-model="checkedList"
        @check="handleTreeCheck"
      />
      
        <!-- :default-checked-keys="checkedList"
        :default-selected-keys="checkedList"
        :selected-keys="checkedList" -->
  </div>
</template>
<script>
export default {
  name: 'custom-checkbox',
  props: {
    value: String, // 格式 xxx,xxx,xxxx
    options: {
      type: Array,
      default () {
        return []
      }
    },
    defaultCheckAll: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    canSelectOptions () { // 可选的项，除去了禁用的选项
      return this.options.filter(item => !item.disabled)
    },
    canDeepSelectOptions (data) { // 可选的项，除去了禁用的选项
      if(data.length>0){
        this.canDeepSelectOptions(data.children);
      }
      return data.filter(item => !item.disabled)
    },
    indeterminate () {
      //console.log('indeterminate, this.getSelectedKeys(this.options)', this.getSelectedKeys(this.options))
      return this.checkedList.length < this.getSelectedKeys(this.options).length && this.checkedList.length > 0
    },
    checkAll () {
      //console.log('checkAll, this.getSelectedKeys(this.options)', this.getSelectedKeys(this.options))
      return this.checkedList.length === this.getSelectedKeys(this.options).length && this.checkedList.length > 0
    }
  },
  data () {
    return {
      checkedList: [],
      replaceFields: {
        children: "children",
        title: "areaName",
        key: "id",
      },
    }
  },
  created () {
    if (this.defaultCheckAll) {
      this.onCheckAllChange(true)
    }
  },
  methods: {
    getSelectedKeys(data=[],keys=[]){
      data.forEach(item=>{
        if(!item.disabled){
          keys.push(item.id);
        }
        if(item.children && item.children.length>0){
          this.getSelectedKeys(item.children,keys);
        }
      });
      return keys;
    },
    handleTreeCheck(checkedList){
      console.log('checkedList',checkedList)
      const value = checkedList && checkedList.length && checkedList.join(',') || ''
      this.$emit('change', value)
      this.$emit('input', value)
    },
    onChange (checkedList) {
      const value = checkedList && checkedList.length && checkedList.join(',') || ''
      this.$emit('change', value)
      this.$emit('input', value)
    },
    onCheckAllChange(checked) {
      console.log('checked',checked)
      //const checkList = checked ? this.canSelectOptions.filter(item => !item.disabled).map(item => item.value) : []
      const checkList = checked ? this.getSelectedKeys(this.options) : []
      this.checkedList = checkList
      console.log('this.checkedList',this.checkedList);

      this.onChange(checkList)
    },
  },
  watch: {
    value: {
      immediate: true,
      handler (newValue) {
        if (newValue) {
          this.checkedList = newValue.split(',')
        } else {
          this.checkedList =[]
        }
      }
    },
    options:{
      handler(newObj){        
        console.log('==========newObj==========',newObj)
      },
      immediate:true,
      deep:true,
    }
  }

}
</script>

<style lang="less" scoped>
/deep/ .ant-tree{
  column-span: all;
  column-width: 200px;
}
</style>

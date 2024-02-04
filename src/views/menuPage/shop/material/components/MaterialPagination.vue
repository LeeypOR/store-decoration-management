<template>
  <a-pagination :show-total="total => `共${total}条`" show-size-changer show-quick-jumper 
    :defaultPageSize="size" 
    :default-current="current" 
    v-model="pageCurrent"
    :total="total" 
    :pageSizeOptions="pageSizeOptions"
    @showSizeChange="handleShowSizeChange"
    @change="handleChange"/>
</template>

<script>
export default {
  props:{
    current:{
      type:Number,
      default:1,
    },
    size:{
      type:Number,
      default:10,
    },
    total:{
      type:Number,
      default:0,
    },
    pageSizeOptions:{
      type:Array,
      default(){
        return ['10', '20', '50', '100', '200'];
      }
    }
  },
  watch:{
    current:{
      handler(newVal){
        this.pageCurrent=newVal;
      },
      immediate:true,
    },
  },
  data(){
    return {
      pageCurrent:1,
    }
  },
  methods:{
    handleShowSizeChange(current,size){
      console.log(current,size)
      this.$emit('showSizeChange',current,size);
    },
    handleChange(page,pageSize){
      console.log(page,pageSize)
      this.$emit('change',page,pageSize);
    }
  }
}
</script>

<style>

</style>
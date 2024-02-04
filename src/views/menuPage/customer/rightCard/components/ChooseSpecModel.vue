<template>
  <a-modal
    :visible="visible"
    okText="提交"
    cancelText="取消"
    :title="title"
    :maskClosable="false"
    :destroyOnClose="true"
    :keyboard="false"
    width="800px"
    @cancel="closeModal()"
    @ok="handleSubmit">
    <div>
      <a-radio-group  @change="SpecIdChange" v-model="goodsSpecId">
        <a-radio :style="radioStyle" :key="item.id" :value="item.goodsSpecId" v-for="(item,index) in goodsSpecList">{{item.normString}}</a-radio>
      </a-radio-group>
    </div>

  </a-modal>
</template>
<script>
  export default {
    name: 'chooseSpecModel',
    props: {
      record: {
        type: Object,
        default() {
          return {}
          }
        },
      visible: {
        type: Boolean,
        default: false
        }
      },
    computed: {
      title () {
        return '选择商品规格'
      },

    },
    data () {
      return {
        goodsId:'',
        goodsSpecId:'',
        goodsSpecList:[],
        normString:'',
        radioStyle: {
          display: 'inline-block',
          height: '35px',
          lineHeight: '35px',
        }
    }
    },
    watch: {
      visible (value) {
        if (value && this.record.goodsId) {
          console.log(this.record)
          this.goodsId = this.record.goodsId
          this.$get('/goods/query/norm', {goodsId: this.goodsId}).then(res => {
            if (res && res.returnCode === 1000) {
              console.log("获取的商品规格列表",res)
            /*  if (res.dataInfo.length ==1 && res.dataInfo[0].normString==null){
                res.dataInfo[0].normString = "统一规格"
              }*/
              this.goodsSpecList  = res.dataInfo || []
              // 没有规格就是统一规格
              console.log("获取的商品规格列表",this.goodsSpecList)
            }
          })
        }
      }
    },
    mounted () {

    },
    methods: {
      getInfo () {

      },
      closeModal (freshTable) {
        // this.form.resetFields()
        this.goodsId = ''
        this.goodsSpecId = ''
        this.goodsSpecList = []
        this.$emit('cancel', freshTable)
      },
      handleSubmit(){
        console.log("提交规格")
        let goodsId = this.goodsId
        let goodsSpecId = this.goodsSpecId
        let normString = this.normString
        this.$emit('submitSpec', {goodsId,goodsSpecId,normString})
        this.$emit('cancel')
        // this.closeModal(true)
      },
      SpecIdChange(e){
        console.log(e.target.value)
        console.log(this.goodsSpecId)
        this.goodsSpecList.forEach((item)=>{
          if (item.goodsSpecId==e.target.value){
            this.normString = item.normString
          }
        })
      }
    }
  }
</script>
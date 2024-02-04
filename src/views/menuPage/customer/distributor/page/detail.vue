<template>
  <div class="distributor-detail-div">
    <a-descriptions title="" bordered :column="2" style="margin-bottom: 20px">
      <a-descriptions-item label="分销员姓名">
        {{ formData.custName }}
      </a-descriptions-item>
      <a-descriptions-item label="身份证号">
        {{ formData.idNo }}
      </a-descriptions-item>
      <a-descriptions-item label="分销员手机号">
        {{ formData.phoneNumber }}
      </a-descriptions-item>
      <a-descriptions-item label="分销员昵称">
        {{ formData.nickName }}
      </a-descriptions-item>
      <a-descriptions-item label="分销员头像">
        <table-img :src="formData.avatar" />
      </a-descriptions-item>
      <a-descriptions-item label="分销总笔数">
        {{ formData.distributedTotalNumber || '0' }}
      </a-descriptions-item>
      <a-descriptions-item label="分销总金额">
        ¥ {{ formData.distributedTotalSum ? ((Number(formData.distributedTotalSum)/100).toFixed(2)) :'0.00' }}
      </a-descriptions-item>
    </a-descriptions>
    <!-- tab切换 -->
    <a-tabs type="card" :activeKey="activeKey" @change="tabsChange">
      <a-tab-pane v-for="item in tabs" :key="item.key" :tab="item.name">
        <distributorDetailTable ref="distributorDetailTable" :id="id" :tab="item.key" :curTab="activeKey"></distributorDetailTable>
      </a-tab-pane>
    </a-tabs>
    <a-row style="margin-top: 20px; text-align: center;">
      <a-col>
        <a-button @click="closeModal()">返回</a-button>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import distributorDetailTable from './../components/detailTable';

export default {
  name: 'distributorDetail',
  components: {
    distributorDetailTable
  },
  data() {
    return {
      activeKey: '2', // 当前活动tab
      tabs: [ // 标签页集合
        { name: '已结算', key: '2', authority: '', title: '已结算' },
        { name: '待结算', key: '1', authority: '', title: '待结算' }
      ],
      formData: {
        custName: undefined,
        idNo: undefined,
        phoneNumber: undefined,
        avatar: undefined,
        distributedTotalNumber: undefined,
        distributedTotalSum: undefined
      },
    };
  },
  computed: {
    type() { // 返回本页携带的活跃tab
      return this.$route.query.type || '2';
    },
    id() { // 分销员id
      return this.$route.query.id || '2';
    },
  },
  created() {
    this.activeKey = this.type || '2'
    this.getInfo(this.id)
  },
  mounted() {},
  methods: {
    // tab切换
    tabsChange(val) {
      this.activeKey = val
    },
    // 获取分销员详情
    async getInfo(id){
      let res = await this.$get('/distributor/pepole/id', {id});
      if(res && res.returnCode=='1000'){
        this.formData = res.dataInfo
        console.log(this.formData)
      }
    },
    // 关闭弹窗
    closeModal(freshTable) {
      this.$router.push({
        name:'CustomerDistributor',
        query:{
          current: this.$route.query.current
        }
      })
    },
  }
};
</script>

<style lang="less">
.distributor-detail-div{
  .ant-descriptions-bordered .ant-descriptions-item-label{
    width: 150px;
  }
}
</style>

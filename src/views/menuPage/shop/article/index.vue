<template>
  <div>
    <search-table
      :url="url"
      ref="searchtable"
      :columns="columns"
      :headParams="headParams"
      :defaultParams="defaultParams"
      :form="form">
      <template slot="searchForm">
        <a-form layout="inline" :form="form">
          <a-form-item label="文章标题">
            <a-input allowClear v-decorator="['articleTitle']" placeholder="请输入文章标题"></a-input>
          </a-form-item>
          <a-form-item label="添加时间">
            <!-- <a-date-picker
              style="width: 200px"
              allow-clear
              v-decorator="['createDateStart']"
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
              placeholder="请选择开始时间" />
            <span style="margin: 0 10px;">至</span>
            <a-date-picker
              style="width: 200px"
              allow-clear
              v-decorator="['createDateEnd']"
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
              placeholder="请选择结束时间" /> -->
            <fast-range-picker
              v-decorator="[
              'createDateStart-createDateEnd',
              ]"
              >
            </fast-range-picker>
          </a-form-item>
        </a-form>
      </template>
      <template slot="oprationRow">
        <permission authority="seckill:activity:add">
          <a-button type="primary" @click="editInfo('add', {})">新增文章</a-button>
        </permission>
      </template>
      <template slot="tableOperation" slot-scope="{ record }">
        <a-space>
          <!-- <permission v-if="record.activityStatus != 1" authority="seckill:activity:info">
            <span
              class="text-primary pointer"
              @click="editInfo('view', record)"
              >查看</span>
          </permission> -->
          <!-- <a-divider type="vertical" /> -->
          <permission authority="seckill:activity:modify">
            <span
              class="text-primary pointer"
              @click="editInfo('edit', record)"
              >编辑</span>
          </permission>
          <!-- <a-divider type="vertical" /> -->
          <permission authority="seckill:activity:delete">
            <a-popconfirm
              title="是否确认删除？"
              :getPopupContainer="getPopupContainer()"
              @confirm="() => deleteRows([record.id])">
              <a href="javascript:;" class="text-danger pointer">删除</a>
            </a-popconfirm>
          </permission>
        </a-space>
      </template>
    </search-table>
  </div>
</template>

<script>
import { findDictNameByValue,createOptionsByDict } from '@/utils/dict'
// import seckillForm from './components/form';
export default {
  name: 'MarketingSeckill',
  components: {},
  // props: {
  //   // 自身的tab
  //   tab: {
  //     type: String,
  //     required: true,
  //     default: ''
  //   },
  // },
  data() {
    return {
      statusList: createOptionsByDict('MARKETING_STATUS'),
      yesOrNo: createOptionsByDict('YES_NO'),
      url: '/articles/page',
      deleteUrl: "/articles/delete",
      handle: 'edit',
      currentRecord: {},
      form: this.$form.createForm(this, { name: "table_search" }),
      headParams: { baseURL: `${location.origin}/goldenhome/decoration/admin` },
      defaultParams: {},
      columns: [
        {
          title: "文章标题",
          width: 500,
          dataIndex: "articleTitle",
          key: "articleTitle",
        },
        {
          title: "文章类型",
          dataIndex: "articleType",
          key: "articleType",
          customRender: (text)=>{
            let res = ''
            if(text==1){
              res = '公众号文章'
            } else if(text==2){
              res = '小程序文章'
            } else if(text==3){
              res = '微页面'
            }
            return res;
          }
        },
        // {
        //   title: "阅读数",
        //   dataIndex: "viewNum",
        //   key: "viewNum",
        // },
        {
          title: "添加时间",
          dataIndex: "createDate",
          key: "createDate"
        },
        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" },
        }
      ]
    };
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    getPopupContainer() {
      return (triggerNode) => triggerNode.parentNode.parentNode;
    },
    editInfo(type, record) {
      this.currentRecord = record
      this.$router.push({
        name:'ShopArticlePagesForm',
        query: {
          handle: type,
          id: record.id
        }
      })
    },
    deleteRows(ids) {
      this.$post(this.deleteUrl,
        ids,
        { baseURL: `${location.origin}/goldenhome/decoration/admin` }).then((res) => {
        if (res && res.returnCode === 1000) {
          this.$refs.searchtable.refreshTable();
        }
      });
    },
  }
};
</script>

<style lang="less" scoped></style>

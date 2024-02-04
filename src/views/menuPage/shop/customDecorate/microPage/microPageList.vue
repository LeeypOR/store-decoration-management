<!-- 图库首页 -->
<template>
  <div class="conent_wrap">
      <search-table :url="url" ref="searchtable" :columns="columns" :form="form" :showSizeChanger="true" @selectedRowChange="getSelectedRow">
        <template slot="searchForm">
          <a-form layout="inline" ref="ceshi" :form="form">
            <a-form-item>
              <a-select v-decorator="['pageStatus', { initialValue: '' }]">
                <a-select-option value="">全部状态</a-select-option>
                <a-select-option value="1">已发布</a-select-option>
                <a-select-option value="0">未发布</a-select-option>
              </a-select>
            </a-form-item>
             <a-form-item label="微页面名称">
                <a-input
                  style="width: 200px"
                  v-decorator="['pageName']"
                  placeholder="请输入微页面名称"
                  autocomplete="off"
                >
                </a-input>
              </a-form-item>
          </a-form>
        </template>
        <template slot="oprationRow">
          <permission>
            <a-button type="primary" icon="plus" @click="jumpMicroPageDecoration()">新建页面</a-button>
          </permission>

          <permission>
            <a-button @click="deleteRows($refs.searchtable.selectedRows)" icon="delete">删除页面</a-button>
          </permission>
          <permission>
            <a-button icon="book" @click="classifyAdd($refs.searchtable.selectedRows,true,'发布页面')">发布页面</a-button>
          </permission>
          <permission>
            <a-button icon="file-excel" @click="classifyAdd($refs.searchtable.selectedRows,false,'取消发布')">取消发布</a-button>
          </permission>
        </template>
        <template slot="ImgTextTable" slot-scope="{record}">
          <div class="alignCenter">
            <span>{{record.pageInfo.pageName}}</span>
            <img v-if="record.isIndex==1 " :src="imgUrl" alt="">
          </div>
        </template>
        <template slot="tableOperation" slot-scope="{ record }">
          <span class="text-primary pointer" @click="handlePreview(record.id)">预览</span> 
          <a-divider type="vertical" />
          <span class="text-primary pointer" @click="handlePopularize(record)">推广</span>
          <a-divider type="vertical" />
<!--            <permission v-if="record.parentId == 0">-->
            <permission>
              <span class="text-primary pointer" @click="jumpMicroPageDecoration(record.id)">编辑</span>
            </permission>
         <a-divider type="vertical" />
          <permission>
            <span v-if="record.pageInfo.pageStatus==0" class="text-primary pointer" @click="classifyAdd([record],true,'发布页面')">发布</span>
            <span class="text-primary pointer" v-else @click="classifyAdd([record],false,'下架页面')">取消</span>
          </permission>
          <a-divider type="vertical" />
          <permission>
            <span class="text-primary pointer" @click="copyAdd({...record,add:'update'})">复制</span>
          </permission>
          <a-divider type="vertical" />
          <permission>
            <span v-if="record.isIndex==1" class="text-primary pointer">已设主页</span>
            <span v-else class="text-primary pointer" @click="openNew(record)">设为主页</span>
            <!-- <a-popconfirm
              title="是否确认删除？"
              @confirm="() => deleteRows([record.id])"
            >
              <a href="javascript:;" class="text-danger pointer">删除</a>
            </a-popconfirm>-->
          </permission>
        </template>
      </search-table>
    <!-- <classify-modal v-model="showModal" @handleSubmit="handleSubmit" :records="currentRecord" :childModal="childModal" :title="title"></classify-modal> -->
    <popularize :visible="showPopularize" :record="record" @cancel="showPopularize=false;record={};"></popularize>
    <preview :visible="showPreview" :id="previewId" @cancel="showPreview=false;this.previewId='';"></preview>
  </div>
</template>

<script>
// import ClassifyModal from './components/ClassifyModal'
import popularize from './components/popularize';
import preview from './components/preview';

export default {
  name: 'ShopCustomDecorateMicroPageMicroPageList',
  directives: {},
  filters: {},
  mixins: [],
  model: {},
  props: {},
  components: {
    // ClassifyModal,
    popularize,
    preview
  },
  data () {
    return {
      showModal: false,
      childModal: false,
      title: '新增分类',
      url: 'goldenhome/decoration/admin_/page/ms/page',
      form: this.$form.createForm(this, { name: 'table_search' }),
      currentRecord: {},
      imgUrl: require('@/assets/images/shop/isIndex.png'),
      columns: [
        { title: '' },
        {
          title: '页面名称',
          dataIndex: 'ImgTextOperation',
          scopedSlots: { customRender: 'ImgTextOperation' }
        },
        {
          title: '页面状态',
          dataIndex: 'pageStatus',
          key: 'pageStatus',
          align: 'center',
          customRender: (text, row) => {
            const val = row.pageInfo.pageStatus
            switch (val) {
              case 0:
                return '未发布'
              case 1:
                return '已发布'
              default:
                return '不存在的值'
            }
          }
        },
        {
          title: '最后保存时间',
          dataIndex: 'updateDate',
          key: 'updateDate',
          align: 'center'
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      showPopularize:false,
      showPreview:false,
      previewId:'',
      record:{},
    }
  },
  computed: {},
  watch: {},
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {
  },
  beforeUpdate () {},
  updated () {},
  activated () {
    console.log(this.$refs)
    this.$nextTick(() => {
      this.$refs.searchtable.refreshTable()
    })
  },
  deactivated () {},
  beforeDestroy () {},
  destroyed () {},
  // 方法集合
  methods: {
    //推广
    handlePopularize(record){
      this.record=record;
      this.showPopularize=true;
    },
    //预览
    async handlePreview(id){
      this.previewId=id;
      this.showPreview=true;
    },
    // 跳转到新建微页面装修页面
    jumpMicroPageDecoration (decorationId = '') {
      let query = {}
      if (decorationId !== '') {
        query = {
          decorationId
        }
      }
      this.$router.push({
        name: 'ShopCustomDecorateMicroPageMicroPageDecoration',
        query
      })
    },
    initData (records) {
      let source = this.$refs.searchtable.dataSource
      if (records.parentId == 0) return records
      source.forEach((item) => {
        if (records.parentId == item.id) {
          records.parentName = item.classificationName
        }
      })
      return records
    },
    getSelectedRow (rows) {
      console.log('选择的', rows)
      // if (rows.length > 0) {
      // 	this.currentSelectedProductInfo = rows[0]
      // }
      // console.log('row', this.currentSelectedProductInfo)
    },
    openNew (records) {
      // console.log(records)
      // return
      this.$confirm({
        title: '设为主页',
        content: '是否设为主页面',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          this.$post('goldenhome/decoration/admin_/page/ms/index', {
            id: records.pageInfo.id
          }).then((res) => {
            // console.log(res)
            if (res && res.returnCode == 1000) {
              this.$message.success('设置成功')
              this.$refs.searchtable.refreshTable()
            }
          })
        }
      })
      // this.currentRecord = this.initData(records)
      // if (records.parentId != 0) {
      //   this.childModal = true
      // } else {
      //   this.childModal = false
      // }
      // console.log(records)
      // this.showModal = true
    },
    deleteRows (ids) {
      const list = ids.map((item) => {
        return item.pageInfo.id
      })
      if (!ids || ids.length === 0) {
        return this.$message.warn('请先选择一项后再进行操作')
      }
      this.$confirm({
        title: '删除提示',
        content: '删除操作不可恢复，请确认是否删除？',
        okText: '确认删除',
        cancelText: '取消',
        onOk: () => {
          this.$post('goldenhome/decoration/admin_/page/ms/delete', list).then(
            (res) => {
              if (res && res.returnCode == 1000) {
                this.$message.success('删除成功')
                this.$refs.searchtable.refreshTable()
              }
            }
          )
        }
      })
    },
    // list列表数据 a上架下架 title标题
    classifyAdd (ids, a, title) {
      // console.log(ids)
      // return
      var url = 'goldenhome/decoration/admin_/page/ms/enable'
      if (!a) url = 'goldenhome/decoration/admin_/page/ms/disable'
      // console.log(ids)
      // return
      const list = ids.map((item) => {
        return item.pageInfo.id
      })
      if (!ids || ids.length === 0) {
        return this.$message.warn('请先选择一项后再进行操作')
      }
      this.$confirm({
        title: title,
        content: a
          ? '是否发布所选页面，发布后立即生效！'
          : '是否取消发布所选页面，取消后用户无法访问！',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          this.$post(url, list).then((res) => {
            // console.log(res)
            if (res && res.returnCode == 1000) {
              this.$message.success(a ? '发布成功' : '取消成功')
              this.$refs.searchtable.refreshTable()
            }
          })
        }
      })
      // this.childModal = childModal
      // this.currentRecord = this.initData(record)
      // if (childModal) {
      //   this.title = '添加子级'
      //   // this.currentRecord.name = record.classificationName
      //   // this.currentRecord.classificationName = ''
      // } else {
      //   this.title = '新增分类'
      // }
      // this.showModal = true
    },

    // 复制页面
    copyAdd (ids) {
      const { id } = ids.pageInfo
      this.$confirm({
        title: '复制页面',
        content: '是否复制页面',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          this.$post('goldenhome/decoration/admin_/page/ms/copy', {
            id: id
          }).then((res) => {
            // console.log(res)
            if (res && res.returnCode == 1000) {
              this.$message.success('复制成功')
              this.$refs.searchtable.refreshTable()
            }
          })
        }
      })
    },
    handleSubmit () {
      this.showModal = false
      this.$refs.searchtable.refreshTable()
    },
    // 跳转编辑
    classifyEditor (item) {
      console.log(item)
    }
  }
}
</script>
<style rel="stylesheet/less" lang="less" scoped>
/deep/.alignCenter{
  display:flex;
  // flex-flow: column;
  align-items: center;
  color:#016BFF;
  img{
    margin-left:5px;
  }
}
</style>

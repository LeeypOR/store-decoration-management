import Vue from 'vue'
import { $get, $post, $upload, $export } from '@/axios'
import download from '@/utils/download'
import { message } from 'ant-design-vue'

import TinymceEditor from '@/components/form/TinymceEditor'
import UploadImage from '@/components/form/UploadImage'
import UploadFile from '@/components/form/UploadFile'
import FastRangePicker from '@/components/form/FastRangePicker'
import SearchTable from '@/components/form/SearchTable'
import TableImg from '@/components/form/TableImg'
import Permission from '@/components/common/Permission'

import GModal from '@/components/antBase/GModal'

import { getImgView } from '@/utils'

import * as filters from './filters'
import * as directives from './directives'

function install (Vue) {
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })
  Object.keys(directives).forEach(key => {
    Vue.directive(key, directives[key])
  })

  Vue.$getImgView = Vue.prototype.$getImgView = getImgView

  Vue.$get = Vue.prototype.$get = $get
  Vue.$post = Vue.prototype.$post = $post
  Vue.$upload = Vue.prototype.$upload = $upload
  Vue.$export = Vue.prototype.$export = $export
  Vue.$download = Vue.prototype.$download = download

  Vue.component(GModal.name, GModal)

  // 富文本组件
  Vue.component(TinymceEditor.name, TinymceEditor)
  // 上传文件组件，默认单图上传，使用limit(数量限制)属性控制上传多图
  Vue.component(UploadImage.name, UploadImage)
  // 上传文件组件，默认单文件上传，使用limit(数量限制)属性控制上传多个文件
  Vue.component(UploadFile.name, UploadFile)
  // 带今，昨天，近七日，近30日的时间选择器
  Vue.component(FastRangePicker.name, FastRangePicker)
  // 带搜索的表格模板
  Vue.component(SearchTable.name, SearchTable)
  // 表格项是图片
  Vue.component(TableImg.name, TableImg)
  // 权限控制组件
  Vue.component(Permission.name, Permission)

  message.config({
    duration: 2,
    maxCount: 2
  })
}
Vue.use(install)

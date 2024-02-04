import store from '@/store'
import isEmpty from 'lodash/isEmpty'
import {$get} from '@/axios'

// 根据字典值获取字典名称
export function findDictNameByValue(type, value) {
  const dictAll = store.getters.dictAll || [];
  if (isEmpty(dictAll)) {
    return value;
  }

  const dict = dictAll.find(item => {
    return item.type == type && item.dictValue == value;
  });
  return dict ? dict.name : value
}

// 根据字典名称获取字段值
export function findDictValueByName(type, name) {
  const dictAll = store.getters.dictAll || [];
  if (isEmpty(dictAll)) {
    return '';
  }
  const dict = dictAll.find(item => {
    return item.type == type && item.name == name;
  });
  return dict ? dict.dictValue : ''
}

// 根据字典类型获取该类型下的字段列表
export function findDictListByType(type) {
  const dictAll = store.getters.dictAll || [];
  if (isEmpty(dictAll)) {
    return '';
  }
  const dictFilter =  dictAll.filter(item => {
    return item.type == type;
  })
  return dictFilter ? dictFilter : []
}

// 获取数据字典当作下拉框或者单选框多选框列表选项
export function createOptionsByDict(type, valueType = String) { // 字典接口返回的value统一是string, 但是有的接口返回的字段是number，回显会出问题，如果是number，第二个参数传Number
  const dictFilter = findDictListByType(type) || []
  return dictFilter.map(item => ({label: item.name, value: valueType(item.dictValue)}))
}

export async function getDictAll (callback) {
  const res = await $get('/sys/dict/all', {}, {preventCancelToken: true})
  if (res && res.returnCode === 1000) {
    await store.dispatch('setDictAll', res.dataInfo)
    if (callback && callback instanceof Function) {
      callback()
    }
  }
}
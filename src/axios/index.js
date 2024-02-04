import axios from 'axios'
import {
  message
} from 'ant-design-vue'
import {
  BASE_URL
} from './config'
import store from '@/store'
import router from '@/router'
import isEmpty from 'lodash/isEmpty'
import download from '@/utils/download'
import { encrypt } from '@/utils/encrypt'

axios.defaults.baseURL = BASE_URL
axios.defaults.timeout = 60000
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '您请求的资源不存在',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}

// 请求计数器
let count = 0

// 请求拦截
axios.interceptors.request.use(function (config) {
  // alert(config.preventLoading)
  // console.log('config---', config)

  // 请求的第三个入参添加preventLoading: true 即可不开启loading效果
  if (!config.preventLoading) {
    count++
  }
  if (count === 1) {
    loading(true)
  }

  console.log('阻止了请求。')

  return false

  // return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截
axios.interceptors.response.use(function (response) {
  loading(false)
  // 导出
  if (response.status === 200 && response.config.responseType === 'blob') {
    return response
  }
  // console.log('response',response)

  // 正常的get请求
  if (response.data.returnCode && response.data.returnCode != 1000) {
    if (response.data.returnCode === 1003) {
      window.localStorage.removeItem('storetoken')
      router.push('/login')
    }
    if (response.data.returnCode === 1006) {
      message.error(response.data.message)
      router.push('/dashboard')
      return
    }

    if (response.config.noAlertFlag) {
      return response.data
    }

    message.error(response.data.message)
    return Promise.reject(response.data)
  }
  return response.data
}, function (error) {
  loading(false)
  console.log('阻止了请求。', error)
  return false
  // return handleError(error)
})

// 处理请求异常
function handleError (err) {
  if (axios.isCancel(err)) { // 切换页面的时候会取消上个页面的请求
    console.log('请求被取消了---')
  } else {
    if (err && typeof (err) === 'object') {
      message.error(codeMessage[err.response.status] || '服务处理异常，请稍后重试。')
      return Promise.reject(err)
    } else {
      message.error('服务处理异常，请稍后重试。')
      return Promise.reject('服务处理异常，请稍后重试。')
    }
  }
}
// 加载状态
function loading (status) {
  if (status) {
    store.dispatch('setloadding', true)
  } else {
    count--
    if (count <= 0) {
      count = 0
      store.dispatch('setloadding', false)
    }
  }
}
// get请求
export const $get = function (url, params, config = {}) {
  if (!url) throw Error('请核对请求链接是否正确')
  const token = window.localStorage.storetoken
  const {
    params: configParams,
    headers,
    ...otherConfig
  } = config
  const header = Object.assign(headers || {}, {
    'Content-Type': 'application/json; charset=utf-8',
    'Auth-Token': token,
    'Common-Param': getCommonParam()
  })
  // return axios.get(url, {
  //   params,
  //   ...otherConfig,
  //   headers: header,
  // })

  // console.log(parameter);
  // 其他服务名的接口地址，为了和原有的服务区分开同时不影响原有代码。
  if (url.includes('_')) {
    // $符号分割服务名，和真实的请求地址。
    const [serverName, requestUrl] = url.split('_')
    console.log('收到的url是：', url)
    console.log('收到的serverName是：', serverName)
    console.log('收到的requestUrl是：', requestUrl)
    console.log('收到的BASE_URL是：', BASE_URL)

    return axios.get(requestUrl, {
      params,
      ...otherConfig,
      baseURL: location.origin + '/' + serverName,
      headers: header
    })
  } else {
    return axios.get(url, {
      params,
      ...otherConfig,
      headers: header
    })
  }
}
// post请求
export const $post = function (url, params, config = {}, group = 'ghs') {
  // if (!url) throw Error('请核对请求链接是否正确')
  const token = window.localStorage.storetoken
  const {
    params: configParams,
    headers,
    ...otherConfig
  } = config
  const header = Object.assign(headers || {}, {
    'Content-Type': 'application/json; charset=utf-8',
    'Auth-Token': token,
    'Common-Param': getCommonParam()
  })
  // return axios.post(url, params, {
  //   ...otherConfig,
  //   headers: header
  // })

  // console.log(parameter);
  // 其他服务名的接口地址，为了和原有的服务区分开同时不影响原有代码。
  console.log(url)
  if (url.includes('_')) {
    // $符号分割服务名，和真实的请求地址。
    const [serverName, requestUrl] = url.split('_')

    console.log('收到的url是：', url)
    console.log('收到的serverName是：', serverName)
    console.log('收到的requestUrl是：', requestUrl)
    console.log('收到的BASE_URL是：', BASE_URL)
    console.log('收到的location.origin是：', location.origin)

    return axios.post(requestUrl, params, {
      ...otherConfig,
      baseURL: location.origin + '/' + serverName,
      headers: header
    })
  } else {
    return axios.post(url, params, {
      ...otherConfig,
      headers: header
    })
  }
}
// 上传接口
export const $upload = function (url, file, config = {}, group = 'ghs') {
  url = url || '/upload'
  const token = window.localStorage.storetoken
  const params = new FormData()
  const {
    params: configParams,
    headers,
    ...otherConfig
  } = config
  params.append('file', file)
  if (!isEmpty(configParams)) {
    Object.keys(configParams).forEach(key => {
      if (configParams[key]) {
        params.append(key, configParams[key])
      }
    })
  }
  const header = Object.assign(headers || {}, {
    'Content-Type': 'multipart/form-data',
    'Auth-Token': token,
    'Common-Param': getCommonParam()
  })
  return axios.post(url, params, {
    ...otherConfig,
    headers: header
  })
}
// 导出接口
export const $export = (url, params = {}, savePageInfo = false, config = {}, requestType = false) => {
  if (!url) return message.error('导出链接不能为空')
  // const link = `${ BASE_URL }${ url }`
  if (!savePageInfo) {
    delete params['current']
    delete params['size']
  }
  (requestType ? $post : $get)(url, params, {
    responseType: 'blob',
    ...config
  }).then(res => {
    // 正常情况这个type是application/vnd.ms-excel
    if (res.data.type === 'application/json') {
      // 错误时需要读取json文件里面的错误信息
      const reader = new FileReader()
      reader.readAsText(res.data, 'utf-8')
      reader.onload = function () {
        const data = JSON.parse(reader.result)
        message.error(data.message || '导出发生错误！')
      }
      reader.onerror = function () {
        message.error('导出发生错误！')
      }
      return
    }
    // 获取文件名
    let fileName = ''
    try {
      fileName = decodeURI(res.headers['content-disposition'].match(
        /attachment;filename=(.*)/
      )[1])
    } catch (error) {
      // message.error('未获取到导出文件名！')
      // return
    }
    download(res.data, fileName)
  })
}
export function getCommonParam () {
  const userInfo = store.getters.userInfo || {}
  const commonparam = JSON.stringify({
    timestamp: new Date().valueOf().toString(),
    deviceType: 'pcweb',
    deviceModel: navigator.userAgent,
    shopId: userInfo.shopId,
    orgId: userInfo.orgId,
    roleId: userInfo.userRoleId
  })
  // console.log('commonparam', commonparam)

  return encrypt(commonparam)
}

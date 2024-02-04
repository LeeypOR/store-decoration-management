import { decrypt, encrypt } from '@/utils/encrypt'

export const makeId = function (str = 'id') {
  return `${ str }-${ new Date().valueOf() - Math.random().toFixed(6) * 1000000 }`
}

export const makeLongId = function (str = 'id') {
  console.log(`${ str }${ new Date().valueOf() - Math.random().toFixed(6) * 1000000 }`)
  return `${ new Date().valueOf() - Math.random().toFixed(6) * 1000000 }`
}

/**
 * 获取文件服务访问路径
 * @param avatar
 * @param subStr
 * @returns {*}
 */
 export function getFileAccessHttpUrl (avatar, subStr) {
  if (!subStr) subStr = 'http'
  if (avatar && avatar.startsWith(subStr)) {
    return avatar
  } else {
    if (avatar && avatar.length > 0 && avatar.indexOf('[') == -1) {
      return window._CONFIG['staticDomainURL'] + '/' + avatar
    }
  }
}

/* 图片预览 */
export const getImgView = text => {
  console.log('texttexttext', text)
  if (text && text.indexOf(',') > 0) {
    text = text.substring(0, text.indexOf(','))
  }
  return getFileAccessHttpUrl(text)
}

/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
export function debounceFunc (func, wait = 1000, immediate = true) {
  console.log('开启防抖')
  let timeout
  return function () {
    if (timeout) clearTimeout(timeout)
    if (immediate) {
      var callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callNow) func.apply(this, arguments)
    } else {
      timeout = setTimeout(function () {
        func.apply(this, arguments)
      }, wait)
    }
  }
}

// 需要加密的环境。
// export const needEncryptEnvironmentList = 'h5.sd.chinamobile.com'
export const needEncryptEnvironmentList = [
  'localhost',
  // 'testsd.cicd.vpclub.cn',
  // 'stageh5.sd.chinamobile.com',
  'h5.sd.chinamobile.com' // 正式环境的请不要取消。其他3个环境可以随便取消。
]

export const $session = {
  // sessionStorage封装
  get (key) {
    console.log('$session.get', sessionStorage.getItem(key))
    let returnValue = ''
    if (!sessionStorage.getItem(key)) return ''
    // 需要加解密的场景。
    if (needEncryptEnvironmentList.includes(window.location.hostname)) {
      returnValue = decrypt(sessionStorage.getItem(key))
    } else {
      returnValue = sessionStorage.getItem(key)
    }
    try {
      returnValue = JSON.parse(returnValue)
    } catch (e) {
      console.log('无法json.parse，值是:', returnValue)
    }
    return returnValue
  },
  set (key, val) {
    let setVal = ''
    setVal = JSON.stringify(val)
    console.log('收到的值是', val)
    console.log('序列化后的值是', setVal)
    if (needEncryptEnvironmentList.includes(window.location.hostname)) {
      setVal = encrypt(setVal)
    }
    console.log('加密后的值是', setVal)
    sessionStorage.setItem(key, setVal)
  },
  remove (key) {
    sessionStorage.removeItem(key)
  }
}

// 在select 或者 redio 的options 用value查对应的label
export const findNameInOptions = function (options, value) {
  let name = value
  if (options && options.length) {
    const item = options.find(options => options.value == value)
    if (item) {
      name = item.label
    }
  }
  return name
}

// 设置树级的最后一层children为null，避免出现没有子集还展示出展开按钮
export const setLastChildrenNull = function (list, key = 'children') {
  if (!(Array.isArray(list) && list.length)) return null
  list.forEach(item => {
    if (Array.isArray(item[key]) && item[key].length) {
      item[key] = setLastChildrenNull(item[key])
    } else {
      item[key] = null
    }
  })
  return list
}

// 查询树级机构某个节点的所有父级
export const treeFindPath = (tree, func, path = [], key = 'dictValue') => {
  if (!(tree && tree.length)) return []
  for (const data of tree) {
    // 这里按照你的需求来存放最后返回的内容吧
    path.push(data[key])
    if (func(data)) return path
    if (data.children && data.children.length) {
      const findChildren = treeFindPath(data.children, func, path, key)
      if (findChildren.length) return findChildren
    }
    path.pop()
  }
  return []
}

// 获取视频封面，一般需要配合dataURLtoBlob和blobToFile两个方法转成file进行上传，有概率是黑屏
export const getVideoCover = function (url) {
  return new Promise((resolve, reject) => {

      const video = document.createElement("video");

      // 处理跨域
      video.setAttribute('crossOrigin', 'anonymous');
      video.setAttribute('src', url);
      video.setAttribute('muted', false);
      video.setAttribute('preload', 'metadata');
      // video.setAttribute('width', 750);
      // video.setAttribute('height', 300);
      video.setAttribute('autoplay', 'autoplay');
      video.addEventListener('loadeddata', () => {
          // 视频时长video.duration;
          const canvas = document.createElement("canvas"),
              //canvas的尺寸和图片一样
              width = video.videoWidth, 
              height = video.videoHeight;

          video.setAttribute('width', width);
          video.setAttribute('height', height);
          canvas.width = width;
          canvas.height = height;
           // 绘制canvas
          canvas.getContext("2d").drawImage(video, 0, 0, width, height);
          video.pause();
          // 转换为base64
          const dataURL = canvas.toDataURL('image/jpeg');
          video.removeAttribute('src');
          resolve(dataURL);
      });
  });
}
/**
 * 将base64转换为blob
 */
 export const dataURLtoBlob = (dataurl) => { 
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

/**
 * 将blob转换为file
 */
export const blobToFile = (theBlob, fileName) => {
  return new window.File([theBlob], fileName, {type: theBlob.type})
}

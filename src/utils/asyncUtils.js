import {$get} from '@/axios'


export const getAreaTree = function () {
  return new Promise((resolve, reject)=> {
    let areaTree =  window['_areaTree']
    if (areaTree && areaTree.length) {
      resolve(areaTree)
      return 
    } 
    $get('/area/tree', {}, {preventLoading: true}).then(res => {
      if (res && res.returnCode === 1000 && res.dataInfo) {
        const map = function (item) {
          return {
            id: item.id,
            areaFullName: item.areaFullName,
            areaLevel: item.areaLevel,
            areaName: item.areaName,
            children: item.children && item.children.length && item.children.map(map) || null,
            treePath: item.treePath,
          }
        }
        const areaTree = res.dataInfo.map(map)
        console.log('省市区-----', areaTree)
        // 不能存到vuex(和sessionStroage关联着)里面和浏览器存储，原因都是数据量过大，浏览器存储放不下
        window['_areaTree'] = areaTree
      
        resolve(areaTree)
      } else {
        reject(res)
      }
    }).catch(err=> {
      reject(err)
    })
  })
}

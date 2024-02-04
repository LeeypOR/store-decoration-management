import Vue from 'vue'
import VueRouter from 'vue-router'
import { Modal } from 'ant-design-vue'
// import { includes } from 'core-js/core/array'

const otherFileModules = require.context('@/views/otherPage', true, /(?<!View)(\.vue$)/)
// console.log('fileModules.keys()', otherFileModules.keys())

const menuFileModules = require.context('@/views/menuPage', true, /(?<!View)(\.vue$)/)
// console.log('menuFileModules', menuFileModules.keys())
// 需要加keepAlive的路由,跟path一样就可以keepAlive
const keepList = [
  'shop/customDecorate/microPage/microPageList',
  'order/list',
  'marketing'
]
// 这样处理的结果无法嵌套子路由，简单 扁平 化处理了路由结构。
const getFlatRouterByFileModules = (fileModules, modalPath) => {
  // 过滤掉components中的组件。
  // console.log(fileModules.keys(), modalPath, '解析的router')
  const routes = fileModules.keys().filter(path => !path.includes('components')).reduce((modules, modulePath) => {
    const value = fileModules(modulePath)
    // console.log('value', value)
    const childConponent = value.default
    // console.log('childConponent', childConponent)
    // console.log('modulePath', modulePath)

    // 匹配出前面不是./和后面不是.vue的内容
    var reg = new RegExp('(?<=\.\/)(.*)(?=\.vue)')
    let path = reg.exec(modulePath)
    // console.log('path', path)

    // console.log('path000', path)

    if (path) path = path[0]

    // console.log('path0', path)
    // 1、path取的是路径的拼接。
    // 2、需要去掉index.vue，避免index的影响。取上级文件夹名称。
    // console.log('path', path)
    path = path.replace(/\/index/, '')
    // 路径的首字母转小写。
    // console.log('path', path)

    path = path.replace(/^./, path[0].toLowerCase())
    // console.log('path', path)

    // console.log('path', path)
    // name改成大驼峰。
    let name = path.replace(/^./, path[0].toUpperCase())
    // console.log('name0', name)

    name = name.split('/').map(_ => _.replace(/^./, _[0].toUpperCase())).join('')
    // console.log('name', name)

    // console.log('childConponent', childConponent)
    // console.log('childConponent', childConponent.__file)

    // const aliasChildConponent = childConponent.__file.replace('src/', '')
    const restPath = modulePath.slice(2)
    const childRoute = {
      path: `/${ path }`,
      name: name,
      meta: {
        keepAlive: keepList.includes(path)
      },
      // component: childConponent // 此种方式无法按需加载和分割代码。
      // component: resolve => require([`@/${ aliasChildConponent }`], resolve) // 可以按需加载，但是无法命名chunk。
      component: resolve => require([`@/views/${ modalPath }/${ restPath }`], resolve) // 可以按需加载，但是无法命名chunk。
      // component: resolve => require.ensure([], () => resolve(require(`@/views/${ modalPath }/${ restPath }`)), `vrView`) // 按需加载，同时命名一个指定的chunk名，似乎也不太好。
    }
    return [...modules, childRoute]
  }, [])
  // console.log('生成的routes', routes)
  return routes
}

const otherPageRoutes = getFlatRouterByFileModules(otherFileModules, 'otherPage')

const menuPageRoutes = getFlatRouterByFileModules(menuFileModules, 'menuPage')

// console.log('menuPageRoutes', menuPageRoutes)

const routes = [
  ...otherPageRoutes,
  // ...menuPageRoutes,
  {
    path: '/',
    name: 'Layout',
    component: () => import(/* webpackChunkName: "Layout" */ '@views/Layout.vue'),
    children: [
      ...menuPageRoutes
    ]
  }

  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: () => import(/* webpackChunkName: "login" */ '@views/Login.vue')
  // },
  // {
  //   path: '/',
  //   name: 'Layout',
  //   component: () => import(/* webpackChunkName: "Layout" */ '@views/Layout.vue'),
  //   children: [
  //     {
  //       path: 'dashboard',
  //       name: 'Dashboard', // 路由必须有该值，且唯一，与菜单的pathname一致，用来菜单跳转
  //       component: () => import(/* webpackChunkName: "Dashboard" */ '@views/layout/Dashboard.vue')
  //     },
  //     { // 带搜索功能的表格模板
  //       path: 'tableTemplate',
  //       name: 'TableTemplate',
  //       component: () => import(/* webpackChunkName: "TableTemplate" */ '@views/layout/tableTemplate/index.vue')
  //     },
  //     { // 菜单管理
  //       path: 'menu',
  //       name: 'SystemMenu',
  //       component: () => import(/* webpackChunkName: "SystemMenu" */ '@views/layout/system/menu/index.vue')
  //     },
  //     { // 角色管理
  //       path: 'role',
  //       name: 'SystemRole',
  //       component: () => import(/* webpackChunkName: "SystemRole" */ '@views/layout/system/role/index.vue')
  //     },
  //     { // 用户管理
  //       path: 'user',
  //       name: 'SystemUser',
  //       component: () => import(/* webpackChunkName: "SystemUser" */ '@views/layout/system/user/index.vue')
  //     },
  //     { // 字典管理
  //       path: 'dict',
  //       name: 'SystemDict',
  //       component: () => import(/* webpackChunkName: "SystemDict" */ '@views/layout/system/dict/index.vue')
  //     }
  //   ]
  // }
]

// 解决 vue-router 3.1.0+路由，重新进入相同路由时报错的问题 Uncaught(in Promise)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  routes
  // scrollBehavior (to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     return { x: 0, y: 0 }
  //   }
  // }
})

console.log('最终的 routes', routes)

router.beforeEach((to, from, next) => {
  // document.body.scrollTop = 0;
  // console.log('document.body.scrollTop',document.body.scrollTop)
  Modal.destroyAll()
  next()
})
export default router

Vue.use(VueRouter)

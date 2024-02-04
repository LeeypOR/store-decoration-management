import Vue from 'vue'
import Vuex from 'vuex'
import plugins from './plugins'
Vue.use(Vuex)

const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})
console.log(modules, 'modules')

const store = new Vuex.Store({
  state: {
    loadding: false,
    userInfo: {},
    dictAll: [],
    changePersonalInfo: false,
  },
  mutations: {
    showloadding(state, load) {
      state.loadding = load
    },
    setUserInfo(state, data) {
      state.userInfo = data || {}
    },
    setDictAll(state, data) {
      state.dictAll = data || []
    },
    setChangePersonalInfo(state, data) {
      state.changePersonalInfo = data
    }
  },
  actions: {
    setloadding(context, load) {
      context.commit('showloadding', load)
    },
    setUserInfo(context, data) {
      context.commit('setUserInfo', data)
    },
    setDictAll(context, data) {
      context.commit('setDictAll', data)
    },
    setChangePersonalInfo(context, data) {
      context.commit('setChangePersonalInfo', data)
    }
  },
  getters: {
    isloading: (state) => {
      return state.loadding
    },
    userInfo: (state) => {
      return state.userInfo || {}
    },
    dictAll: (state) => {
      return state.dictAll || {}
    },
    changePersonalInfo: (state) => {
      return state.changePersonalInfo
    }
  },
  modules,
  plugins
})

// hot update---------
// if (module.hot) {
//   module.hot.accept([
//     './modules/storeNavigation'
//   ], () => {
//     const newModuleA = require('./modules/storeNavigation').default
//     console.log(newModuleA)

//     store.hotUpdate({
//       modules: {
//         storeNavigation: newModuleA
//       }
//     })
//   })
// }
export default store


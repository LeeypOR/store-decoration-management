
/**
 * 店铺导航数据状态存储
 */
 const state = {
  moduleList: [], // 可选组件列表
  pageList: [] // 已经选择的组件列表。
}

const mutations = {
  SetModuleList (state, data) {
    state.moduleList = data
  },
  SetPageList (state, data) {
    state.pageList = data
  }

}

const actions = {
  setModuleList ({ commit }, data) {
    commit('SetModuleList', data)
  },
  setPageList ({ commit }, data) {
    commit('SetPageList', data)
  }
}
const getters = {
  
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

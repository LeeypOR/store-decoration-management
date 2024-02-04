

/**
 * 店铺导航数据状态存储
 */
const state = {
  isShowNavigation: false,
  // 当前编辑器编辑工程项目数据
  navigationData: {},
  pageId: "",
};

const mutations = {
  setNavigationData(state, data) {
    state.navigationData = data;
  },

  // 是否展示导航
  setShowNavigation(state, data) {
    state.isShowNavigation = data;
  },

  // 设置背景颜色
  setBgColor(state, data) {
    state.navigationData.backgroundColor = data
  },

  // 设置Id
  setPageId(state, data) {
    state.pageId = data
  },

};


const actions = {
  /**
   * 初始化编辑项目数据
   * @param state
   * @param data
   */
  setNavigationData({ commit }, data) {
    commit('setNavigationData', data);
  },


  /**
   * 修改是否展示导航
   */
  setShowNavigation({ commit }, data) {
    console.log(data);
    commit('setShowNavigation', data);
  },


  // 设置背景颜色
  setBgColor({ commit }, data) {
    commit('setBgColor', data);
  },


  setPageId({ commit }, data) {
    commit('setPageId', data);
  },

};
const getters = {

};

export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations
}

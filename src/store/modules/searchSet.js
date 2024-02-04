

/**
 * 店铺导航数据状态存储
 */
const state = {
  hotWords: [ // 当前数据默认两个
    {
      hotWordName: "",
      id: "",
    },
  ]
};

const mutations = {
  setSearchWords(state, data) {
    state.hotWords = data;
  },
  addNewHotWord(state, data) {
    state.hotWords.push(data);
  }
};

const actions = {
  /**
   * 初始化编辑项目数据
   * @param state
   * @param data
   */
  setSearchWords({ commit }, data) {
    commit('setSearchWords', data);
  },

  addNewHotWord({ commit }, data) {
    commit('addNewHotWord', data);
  }
};
const getters = {
  _hotWords: (state) => {
    return state.hotWords
  },
};

export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations
}



/**
 * 店铺导航数据状态存储
 */
const state = {
    shareInfo: {}
};

const mutations = {
    setShareInfo(state, data) {
        state.shareInfo = data;
    },
};

const actions = {
    /**
     * 初始化编辑项目数据
     * @param state
     * @param data
     */
    setShareInfo({ commit }, data) {
        commit('setShareInfo', data);
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

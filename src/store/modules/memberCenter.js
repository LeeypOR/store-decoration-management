

/**
 * 店铺导航数据状态存储
 */
const state = {
    tab: '',
    // memberInfo:{},
};

const mutations = {
    setTab(state, data) {
        state.tab = data;
    },
    // setMemberInfo(state, data) {
    //     state.memberInfo = data;
    // },
};

const actions = {
    /**
     * 初始化编辑项目数据
     * @param state
     * @param data
     */
    setTab({ commit }, data) {
        commit('setTab', data);
    },
    // setMemberInfo({ commit }, data) {
    //     commit('setMemberInfo', data);
    // },
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

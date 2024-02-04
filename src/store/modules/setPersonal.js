

/**
 * 店铺导航数据状态存储
 */
const state = {
    personalCenter: {},
    tab: '',
    adSpaceList: {},
    menuList: [],
    styleType: {},
    pageInfo: {},
};

const mutations = {
    setPersonalCenter(state, data) {
        state.personalCenter = data;
    },
    setTab(state, data) {
        state.tab = data;
    },
    setAdSpaceList(state, data) {
        state.adSpaceList = data;
    },
    setMenuList(state, data) {
        state.menuList = data;
    },
    setStyleType(state, data) {
        state.styleType = data;
    },
    setPageInfo(state, data) {
        state.pageInfo = data;
    },
};

const actions = {
    /**
     * 初始化编辑项目数据
     * @param state
     * @param data
     */
    setPersonalCenter({ commit }, data) {
        commit('setPersonalCenter', data);
    },
    setTab({ commit }, data) {
        commit('setTab', data);
    },
    setAdSpaceList({ commit }, data) {
        commit('setAdSpaceList', data);
    },
    setMenuList({ commit }, data) {
        commit('setMenuList', data);
    },
    setStyleType({ commit }, data) {
        commit('setStyleType', data);
    },
    setPageInfo({ commit }, data) {
        commit('setPageInfo', data);
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

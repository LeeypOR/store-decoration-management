

/**
 * 店铺导航数据状态存储
 */
const state = {
    navList: {},
    styleCode: '',
    isShowSerach: {},
    pageInfomation: {},
    ids: '',
    table: '',
    navStyle: {},
};

const mutations = {
    setNavList(state, data) {
        state.navList = data;
    },
    setStyleCode(state, data) {
        state.styleCode = data;
    },
    setIsShowSerach(state, data) {
        state.isShowSerach = data;
    },
    setPageInfomation(state, data) {
        state.pageInfomation = data;
    },
    setIds(state, data) {
        state.ids = data;
    },
    setTable(state, data) {
        state.table = data;
    },
    setNavStyle(state, data) {
        state.navStyle = data;
    }
};

const actions = {
    /**
     * 初始化编辑项目数据
     * @param state
     * @param data
     */
    setNavList({ commit }, data) {
        commit('setNavList', data);
    },
    setStyleCode({ commit }, data) {
        commit('setStyleCode', data);
    },
    setIsShowSerach({ commit }, data) {
        commit('setIsShowSerach', data);
    },
    setPageInfomation({ commit }, data) {
        commit('setPageInfomation', data);
    },
    setIds({ commit }, data) {
        commit('setIds', data);
    },
    setTable({ commit }, data) {
        commit('setTable', data);
    },
    setNavStyle({ commit }, data) {
        commit('setNavStyle', data);
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

const state = {
    isUpdate: false,
};

const mutations = {
    setIsUpdate(state, data) {
        state.isUpdate = data;
    }
}

const actions = {
    setIsUpdate({ commit }, data) {
        commit('setIsUpdate', data);
    }
}
export default {
    state,
    actions,
    mutations
  }
  
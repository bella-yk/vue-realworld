import ApiService from "@/common/api.service";
import { FETCH_HISTORIES } from "./actions.type";
import { SET_HISTORY } from "@/store/mutations.type";

const state = {
  errors: {},
  histories: {},
  historiesCount: 0
};

const getters = {
  historiesCount(state) {
    return state.historiesCount;
  },
  histories(state) {
    return state.histories;
  }
};

const actions = {
  [FETCH_HISTORIES](context, params) {
    return ApiService.query("histories", {
      params: params.filters
    })
      .then(({ data }) => {
        context.commit(SET_HISTORY, data);
        return data;
      })
      .catch(() => {
        // #todo SET_ERROR cannot work in multiple states
        // context.commit(SET_ERROR, response.data.errors)
      });
  }
};

const mutations = {
  [SET_HISTORY](state, data) {
    state.histories = data.histories;
    state.historiesCount = data.historiesCount;
  }
};

export default {
  state,
  actions,
  history,
  mutations,
  getters
};

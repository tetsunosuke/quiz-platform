import { createStore } from "vuex";

// TODO: キャッシュのリセットについては要確認
export const store = createStore({
  state() {
    return {
      count: 0,
      json: {},
    };
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    saveJson(state, value) {
      state.count = 0;
      state.json = value;
    },
  },
});

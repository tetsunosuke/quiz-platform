import { createStore } from "vuex";

// このままだと一度食わせたものがキャッシュされてしまうので
// リセットする方法を検討しなくてはならない
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
      state.json = value;
    },
  },
});

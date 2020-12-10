import { createApp } from 'vue'
import { createStore } from 'vuex'

import App from './App.vue'
import './index.css'


const store = createStore({
  state () {
    return {
     count: 0,
     json: {}
    }
  },
  mutations: {
    increment (state) {
      state.count++
    },
    saveJson(state, value) {
        state.json = value;
    }
  }
})

const app = createApp(App);

app.use(store);
app.mount('#app');

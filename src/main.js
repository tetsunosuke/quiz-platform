import { createApp } from 'vue'
import { createWebHashHistory } from 'vue-router'

import App from './App.vue'
import './index.css'
import { store } from './store'
import { router } from './router'
import { config } from './config'

const app = createApp(App);

app.use(store);
app.use(router);
app.mount('#app');

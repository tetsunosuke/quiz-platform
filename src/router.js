import { createRouter, createWebHistory } from "vue-router";

import Home from "./components/Home.vue";
import Main from "./components/Main.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    // コロンで始まる動的セグメント
    { path: "/", component: Home},
    { path: "/:id", component: Main },
    { path: "/category/:category", component: Main, name: 'category'},
  ],
});

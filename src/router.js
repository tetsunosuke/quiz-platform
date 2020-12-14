import { createRouter, createWebHistory } from "vue-router";

/** サンプル **/
import Hoge from "./components/Hoge.vue";
import Main from "./components/Main.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    // コロンで始まる動的セグメント
    { path: "/", component: Main},
    { path: "/hoge", component: Hoge },
    { path: "/hoge/:id", component: Hoge },
  ],
});

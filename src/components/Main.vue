<template>
  <div class="container">
    <h1>第二種衛生管理者過去問</h1>
    <div id="question" v-if="question" class="card bg-light border-dark">
      <div class="card-body">
        <h2 class=".h5 mb card-title alert alert-info">{{ question }}</h2>
        <div class="list-group">
          <div
            class="list-group-item"
            v-for="item in alternatives"
            @click="check"
          >
            <button type="button" class="btn" v-if="result">
              <!-- o -->
              <svg
                v-if="item.result"
                width="2em"
                height="2em"
                viewBox="0 0 16 16"
                class="bi bi-check-circle text-primary"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                />
                <path
                  fill-rule="evenodd"
                  d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
                />
              </svg>

              <!-- x -->
              <svg
                v-else
                width="2em"
                height="2em"
                viewBox="0 0 16 16"
                class="bi bi-x-circle text-danger"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                />
                <path
                  fill-rule="evenodd"
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </button>
            <span class="card-text">{{ item.text }}</span>
          </div>
        </div>

        <div v-if="result === 'x' || result === 'o'" class="alert alert-light">
          {{ explanation }}
        </div>
        <p v-if="question && hasNext" @click="next" class="card-footer">
          <button class="btn btn-primary">次の問題へ</button>
        </p>
      </div>
    </div>
    <div v-else>
      <p>問題を読み込んでいます</p>
    </div>
    <div class="container"></div>
  </div>
</template>

<script>
import axios from "axios";
import { AxiosPromise } from "axios";
import { shuffle } from "./Module";
import Navigation from "./Navigation.vue";
window.__SKYWAY_KEY__ = "f4e8c608-6e6f-4e20-a536-967f19ab03f3";
export default {
  name: "Main",
  components: {},
  props: {},
  data() {
    return {
      result: "",
    };
  },
  // ここをcomputedでやると思っていたけどどうするのが良いのだろうか
  // ajaxが完了したらdataとして書き換えるのがスジっぽ？
  computed: {
    hasNext: {
      get() {
        const state = this.$store.state;
        if (Object.keys(state.json).length === state.count + 1) {
          return false;
        }

        return true;
      },
    },
    question: {
      get() {
        if (!this.isQuestionLoaded()) {
          return null;
        }
        const item = this.getItem();
        return item["問題"];
      },
    },
    explanation: {
      get() {
        if (!this.isQuestionLoaded()) {
          return null;
        }

        const item = this.getItem();
        return item["解説"];
      },
    },
    alternatives: {
      get() {
        if (!this.isQuestionLoaded()) {
          return null;
        }

        const item = this.getItem();
        const arr = [
          { result: true, text: item["正解"] },
          { result: false, text: item["不正解1"] },
          { result: false, text: item["不正解2"] },
          { result: false, text: item["不正解3"] },
          { result: false, text: item["不正解4"] },
        ];
        return shuffle(arr);
      },
    },
    correct: {
      get() {
        if (!this.isQuestionLoaded()) {
          return "-";
        }
        const item = this.getItem();
        return item["正解"];
      },
    },
  },
  mounted() {
    const dataUrl =
      "https://script.google.com/macros/s/AKfycby31Zm2NXkOv_sM-PPmp3f2gENNJq5fKw2vMDsoIcFHqhfpgn02/exec";
    // TODO: キャッシュしているなら読みに行かないように？
    axios
      .get(dataUrl, { crossDomain: true })
      .then((response) => {
        // 一旦ストアに全部入れる(ランダム化してから突っ込むのが良いかも)
        this.$store.commit("saveJson", shuffle(response.data));
        console.info("axios get success");
      })
      .catch((response) => {
        console.error(response);
      });

    /*
      // skywayを使う場合はこのへんを仕込んでおいて
      // window.meshRoom.send() を用いてイベント発生
      // 受け取ったイベントはdataを使ってフックする
      const peer = (window.peer = new Peer({
        key: window.__SKYWAY_KEY__,
        debug: 2,
      }));
      peer.once('open', (id) => {
        console.log(`open id=${id}`);
        const meshRoom = peer.joinRoom("eisei", {
          mode: 'mesh',
        });
        window.meshRoom = meshRoom;
        meshRoom.on('open', () => {console.log("room opened")});
        meshRoom.on('peerJoin', (peerId) => {
          console.log(`peerId: ${peerId} joined`);
        })
        meshRoom.on('data', (obj) => {
          // 誰の発信で何を受け取ったかはこれでわかる
          console.log(`src: ${obj.src}, data: ${obj.data}`);
        })
      });
      peer.on('connection', dataConnection => {
        console.log(`dataConnection ${dataConnection}`);
      });
      peer.on('error', console.error);
      */
  },
  methods: {
    next() {
      const state = this.$store.state;
      this.$store.commit("increment");
      this.result = "";
    },
    check(e) {
      const selected = e.target.parentElement.parentElement.querySelector(
        "span"
      ).innerText;
      const result = selected === this.correct;
      // このあとにスタイルで打消し線を引いても面白い
      // とりあえずは選んだものが正解かどうかとどれが正解でどれが不正解か出すのが良さげ
      this.result = result ? "o" : "x";
    },
    isQuestionLoaded() {
      const state = this.$store.state;
      return Object.keys(state.json).length === 0 ? false : true;
    },
    getItem() {
      return this.$store.state.json[this.$store.state.count];
    },
  },
};
</script>

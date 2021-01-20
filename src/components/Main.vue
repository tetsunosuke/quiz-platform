<template>
  <div class="container">
    <div id="question" v-if="question" class="card bg-light border-dark">
      <div class="card-body">
        <h2 class=".h5 mb card-title alert alert-info">{{ question }}</h2>
        <div class="list-group">
          <div
            class="list-group-item"
            v-bind:class="resultStatus"
            v-for="item in alternatives"
            v-bind:key="item.text"
          >
            <button type="button" class="btn" v-if="result !== ''">
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
            <span @click="check" class="card-text">{{ item.text }}</span>
          </div>
        </div>

        <div
          v-if="result !== ''"
          class="alert alert-light"
          style="white-space: pre-wrap"
        >
          <h3>解説</h3>
          <p>
            {{ explanation }}
          </p>
          <p>出典： {{ from }} </p>
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
import { config } from "../config.js";
import { useRouter } from "vue-router";

export default {
  name: "Main",
  components: {},
  props: {},
  data() {
    return {
      result: "",
    };
  },
  computed: {
    resultStatus: function () {
      const result = this.result || this.result === "";
      return {
        // TODO: もうちょっときれいなクラスが良い...alert alert-dangerとかは配列で返す？
        "bg-warning": !result,
      };
    },
    hasNext: {
      get() {
        // TOOD: GETで渡した問題パラメータで読み取るように変更
        // TODO: このへんで問題集のデータの長さと現在地を比較できる
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
    from: {
      get() {
        if (!this.isQuestionLoaded()) {
          return null;
        }

        const item = this.getItem();
        console.log(item);
        return item["出典"];
      }
    },
    alternatives: {
      get() {
        if (!this.isQuestionLoaded()) {
          return null;
        }

        const item = this.getItem();
        const arr = Object.keys(item).reduce((pv, cv) => {
          if (cv.indexOf("不正解") === 0) {
            pv.push({ result: false, text: item[cv] });
            return pv;
          } else {
            return pv;
          }
        }, []);
        arr.push({ result: true, text: item["正解"] });
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
    // 何か必要かな？
  },
  methods: {
    next() {
      // TODO: storeを頼らずにGETパラメータでどうにかする方法を検討する
      this.$store.commit("increment");
      this.result = "";
    },
    check(e) {
      const selected = e.target.innerText;
      const result = selected === this.correct;
      this.result = result;
    },
    isQuestionLoaded() {
      const state = this.$store.state;
      return Object.keys(state.json).length === 0 ? false : true;
    },
    getItem() {
      // TODO: this.$store.state.countの代わりに、this.$route.params.id を利用できないか検討する
      // console.info(this.$route.params.id);
      return this.$store.state.json[this.$store.state.count];
    },
    fetchData(category) {
      // もし回答を選択していたらリセットする
      this.result = "";
      let dataUrl = config.dataUrl + `?category=${category}`;
      console.info(`get ${dataUrl}`);

      // TODO: 開発環境だけ？
      axios.defaults.baseURL = 'http://localhost:3000';
      axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
      axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
      axios
        .get(dataUrl, { crossDomain: true })
        .then((response) => {
          // 一旦ストアに全部入れる
            this.$store.commit("saveJson", shuffle(response.data));
            console.info("axios get success");
        })
        .catch((response) => {
          // TODO: エラー処理
          console.error(response);
          const dummy = [
            {
              正解: "00000",
              問題: "xxxxxx",
              不正解1: "xxxx",
              不正解2: "YYYY",
            },
            {
              正解: "1111",
              問題: "xxxxx2",
              不正解1: "xxxx",
              不正解2: "YYYY",
            },
          ];
          this.$store.commit("saveJson", dummy);
        });
    }
  },
  created() {
    // URLの変更を検知させて必要な問題集を取りに行くようにする
    if (this.$route.params.category !== undefined) {
      console.log("HomeからMainを呼んだ場合")
      this.fetchData(this.$route.params.category);
    }
    // TODO: HomeからMainへ移った場合にはこのwatchが効かない
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        console.log("Main内でパラメータが変わった場合", "to", toParams, "prev", previousParams)
        if (toParams.category !== undefined) {
          this.fetchData(toParams.category);

        }
      }
    )
  }
};
</script>

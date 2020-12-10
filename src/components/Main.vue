<template>
  <div class="container">
    <h1>第二種衛生管理者過去問</h1>
    <h2>{{result}}</h2>
    <div id="question">
      <h2>{{question}}</h2>
      <ul>
        <li @click="check" v-for="item in alternatives">{{item}}</li>
      </ul>

      <p v-if="question && hasNext" @click="next">次の問題へ</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { AxiosPromise } from "axios";
import {shuffle} from "./Module";
export default {
  name: 'Main',
  props: {
  },
  data() {
    return {
      result: "",
    }
  },
  // ここをcomputedでやると思っていたけどどうするのが良いのだろうか
  // ajaxが完了したらdataとして書き換えるのがスジっぽ？
  computed: {
    hasNext: {
      get() {
        const state = this.$store.state;
        console.log(Object.keys(state.json).length, state.count);
        if (Object.keys(state.json).length === state.count + 1) {
            return false;
        }
        
        return true;
      }
    },
    question: {
      get() {
        const state = this.$store.state;
        if (Object.keys(state.json).length === 0) {
          return null;
        }
        console.log(state.count, state.json);
        const item = this.$store.state.json[this.$store.state.count];
        return item["問題"];

      }
    },
    alternatives: {
      get() {
        const state = this.$store.state;
        if (Object.keys(state.json).length === 0) {
          return null;
        }

        const item = this.$store.state.json[this.$store.state.count];
        const arr =  [
              item["正解"],
              item["不正解1"],
              item["不正解2"],
              item["不正解3"],
              item["不正解4"]
            ];
            return shuffle(arr);
      }
    },
    correct: {
      get() {
        const state = this.$store.state;
        if (Object.keys(state.json).length === 0) {
          return "-";
        }
        const item = this.$store.state.json[this.$store.state.count];
        return item["正解"];
      }
    }
  },
  mounted() {
    console.log("mounted");
      // 先にバックグラウンドで読み込んでおく
      // ここでVuexの出番かも
      const dataUrl = "https://script.google.com/macros/s/AKfycby31Zm2NXkOv_sM-PPmp3f2gENNJq5fKw2vMDsoIcFHqhfpgn02/exec";
      axios.get(dataUrl, {crossDomain: true}).then(response => {
          // 一旦ストアに全部入れる(ランダム化してから突っ込むのが良いかも)
          this.$store.commit('saveJson', response.data);
          console.info("axios get success");
      }).catch(response => {
          console.error(response)
      });
  },
  methods: {
      next() {
          const state = this.$store.state;
          this.$store.commit('increment');
          this.result = "";
      },
      check(e) {
        const result = (e.target.innerText === this.correct);
        // このあとにスタイルで打消し線を引いても面白い
        this.result = result ? "o": "x";

      }
  }
}
</script>

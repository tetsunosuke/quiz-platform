<template>
  <div class="container">
    <h1>第二種衛生管理者過去問</h1>
    <div id="question" v-if="question" class="card bg-light border-dark">
      <div class="card-body">
      <h2 class=".h5 mb card-title alert alert-info">{{question}}</h2>
      <ul class="list-unstyled list-group list-group-flush">
        <li @click="check" v-for="item in alternatives" class="list-group-item">
          <button class="card-text btn btn-light">{{item}}</button>
        </li>
      </ul>
      <h3>{{result}}</h3>
      <div v-if="result === 'x'" class="alert alert-light">
        {{explanation}}
      </div>
      <p v-if="question && hasNext" @click="next" class="card-footer">
        <button class="btn btn-primary">次の問題へ</button>
      </p>
    </div>
    </div>
    <div v-else>
      <p>問題を読み込んでいます</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { AxiosPromise } from "axios";
import {shuffle} from "./Module";
import Navigation from "./Navigation.vue";
export default {
  name: 'Main',
  components: {
  },
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
        if (Object.keys(state.json).length === state.count + 1) {
            return false;
        }
        
        return true;
      }
    },
    question: {
      get() {
        console.log(this.isQuestionLoaded());
        if (!this.isQuestionLoaded()) {
          return null;
        }
        const item = this.getItem();
        console.log(item, "item!!!!");
        return item["問題"];

      }
    },
    explanation: {
      get() {
        if (!this.isQuestionLoaded()) {
          return null;
        }

        const item = this.getItem();
        return item["解説"];
      }
    },
    alternatives: {
      get() {
        if (!this.isQuestionLoaded()) {
          return null;
        }

        const item = this.getItem();
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
        if (!this.isQuestionLoaded()) {
          return "-";
        }
        const item = this.getItem();
        return item["正解"];
      }
    }
  },
  mounted() {
      const dataUrl = "https://script.google.com/macros/s/AKfycby31Zm2NXkOv_sM-PPmp3f2gENNJq5fKw2vMDsoIcFHqhfpgn02/exec";
      // TODO: キャッシュしているなら読みに行かないように？
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
        // とりあえずは選んだものが正解かどうかとどれが正解でどれが不正解か出すのが良さげ
        this.result = result ? "o": "x";

      },
      isQuestionLoaded() {
        const state = this.$store.state;
        console.log("isQuestionLoaded", Object.keys(state.json).length, state.count);
        return Object.keys(state.json).length === 0 ? false :true;
      },
      getItem() {
        console.log(Object.keys(this.$store.state.json), this.$store.state.json, this.$store.state.count);
        return this.$store.state.json[this.$store.state.count];
      }
  }
}
</script>

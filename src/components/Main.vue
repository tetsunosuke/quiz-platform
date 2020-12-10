<template>
  <div class="container">
    <h1>test</h1>
    <div id="question">
      {{question}}
      <ul>
        <li v-for="item in alternatives">{{item}}</li>
      </ul>
      <p @click="next">次の問題へ</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { AxiosPromise } from "axios";
export default {
  name: 'Main',
  props: {
  },
  data() {
    return {
      text: "",
      json : {},
      item: {}
    }
  },
  computed: {
    question: {
      get() {
        // 何問目かを示すパラメータがないとだめかな...
        return this.item["問題"];
      }
    },
    alternatives: {
      get() {
        // TODO: 返す際にシャッフルして返す
        return [
          this.item["正解"],
          this.item["不正解1"],
          this.item["不正解2"],
          this.item["不正解3"],
          this.item["不正解4"]
        ];
      }
    },
  },
  created: function() {
      // 先にバックグラウンドで読み込んでおく
      // ここでVuexの出番かも
      const dataUrl = "https://script.google.com/macros/s/AKfycby31Zm2NXkOv_sM-PPmp3f2gENNJq5fKw2vMDsoIcFHqhfpgn02/exec";
      axios.get(dataUrl, {crossDomain: true}).then(response => {
          this.text = response.data;
          // 一旦ストアに全部入れる(ランダム化してから突っ込むのが良いかも)
          this.$store.commit('saveJson', response.data);
          console.log(this.$store.state.json, response.data[0], response.data[1]);


          // ここから先はいらないかもしれない
          // 取ってきた問題集を全部シャッフルして持っておく
          const arr = response.data;
          // テストのため１件取り出す
          // 実際は後ほどstoreから取るように変更する
          this.item = arr.shift(); 
      }).catch(response => {
          console.error(response)
      });
  },
  mounted: function() {
      // console.log("mounted");
  },
  methods: {
      next() {
          this.$store.commit('increment');
          // これで切り替えを処理すればOK?
          console.log(this.$store.state.count, this.$store.state.json[this.$store.state.count]);
      }
  }
}
</script>

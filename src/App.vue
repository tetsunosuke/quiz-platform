<template>
  <div class="container">
    <!--<Navigation />-->

    <Main />
    <!--<Footer /> -->
  </div>
</template>

<script>
import Main from "./components/Main.vue";
import Navigation from "./components/Navigation.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Main,
    Navigation,
    Footer,
  },
};
</script>

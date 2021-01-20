<template>
  <div class="container">
  <!-- nav -->
    <Navigation />
  <!-- nav -->
     <div class="container">
      <router-view></router-view>
    </div>
    <!--<Footer /> -->
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Navigation,
    Footer,
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand">第二種衛生管理者学習アプリ</a>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <router-link to="/" class="nav-link nav-item">Home</router-link>
        <router-link to="/category/関係法令" class="nav-link nav-item">関係法令</router-link>
        <router-link to="/category/労働衛生" class="nav-link nav-item">労働衛生</router-link>
        <router-link to="/category/労働生理" class="nav-link nav-item">労働生理</router-link>
        <!--
        <router-link to="/hoge/1" class="nav-link nav-item">hoge</router-link>
        -->
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navigation",
  components: {},
  props: {},
  data() {
    return {};
  },
};
</script>

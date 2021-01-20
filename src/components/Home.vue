<template>
  <div class="container">
    <h2 class=".h5 mb card-title alert alert-info">Home</h2>
    <ul>
    <li><router-link to="/category/関係法令" class="nav-link nav-item">関係法令</router-link></li>
    <li><router-link to="/category/労働衛生" class="nav-link nav-item">労働衛生</router-link></li>
    <li><router-link to="/category/労働生理" class="nav-link nav-item">労働生理</router-link></li>
    <li><router-link to="/category/all" class="nav-link nav-item">すべてのカテゴリ</router-link></li>
    </ul>
  </div>
<script>

export default {
  name: "Home"
};
</script>

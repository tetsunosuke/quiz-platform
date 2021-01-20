<template>
  <div class="container">
    <h2 class=".h5 mb card-title alert alert-info">Home</h2>
    <!-- 
      TODO: なんかこんな感じにしたいんだけどできない
    <ul v-for="item in categories" v-bind:key="item.name">
      <router-link 
        v-for="max in item.max" 
        v-bind:key="max"
        :to="{ category: item.name, params: {max: max}}"
        class="nav-link nav-item">
        <li>{{item.name}}から{{max}}問</li>
      </router-link>
    </ul>
    -->
    <ul>
    <li><router-link to="/category/関係法令" class="nav-link nav-item">関係法令</router-link></li>
    <li><router-link to="/category/労働衛生" class="nav-link nav-item">労働衛生</router-link></li>
    <li><router-link to="/category/労働生理" class="nav-link nav-item">労働生理</router-link></li>
    <li><router-link to="/category/all" class="nav-link nav-item">すべてのカテゴリ</router-link></li>
    <!--
    <li><router-link to="/category/関係法令/max/10" class="nav-link nav-item">関係法令から10問</router-link></li>
    <li><router-link to="/category/関係法令/max/15" class="nav-link nav-item">関係法令から15問</router-link></li>
    <li><router-link to="/category/労働衛生/max/10" class="nav-link nav-item">労働衛生から10問</router-link></li>
    <li><router-link to="/category/労働衛生/max/15" class="nav-link nav-item">労働衛生ら15問</router-link></li>
    <li><router-link to="/category/労働生理/max/10" class="nav-link nav-item">労働生理から10問</router-link></li>
    <li><router-link to="/category/労働生理/max/15" class="nav-link nav-item">労働生理から15問</router-link></li>
    <li><router-link to="/category/all/max/10" class="nav-link nav-item">すべてのカテゴリから10問</router-link></li>
    <li><router-link to="/category/all/max/15" class="nav-link nav-item">すべてのカテゴリから15問</router-link></li>
    -->
    </ul>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    const pattern = [5, 10, 15];
    return {
      "categories" : [
        {name: "関係法令",  max:pattern},
        {name: "労働衛生",  max:pattern},
        {name: "労働生理",  max:pattern}
      ]
    }
  }
};
</script>

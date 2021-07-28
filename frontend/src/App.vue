<template>
  <div id="app">
    <!-- Toutes nos views seront placées dans un container -->
    <div class="container">
      <div class="AppTopBar">
        <!-- <Post /> -->
        <router-view /> <!-- pour afficher les views du router -->
      </div>
    </div>
  </div>
</template>

<script>

// import Post from "./components/Post.vue";

export default {
  data: () => {
    return {};
  },
  methodes: {},
  components:{
    // Post,
  }
}
</script>
<template>
  <div id="app">
    <!-- Toutes nos views seront placées dans un container -->
    <div class="container">
      <div class="AppTopBar">
        <Navigation />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "./components/Topbar.vue"

export default {
  data: () => {
    return {};
  },
  methodes: {},
  components:{
    Navigation,
  }
}
</script>
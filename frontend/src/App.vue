<template>
  <div id="app">
    <!-- Toutes nos views seront placées dans un container -->
    <div class="container">
      <div class="AppTopBar">
        <router-view />
        <!-- pour afficher les views du router -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {};
  },
  methodes: {},
  components: {},
};
</script>
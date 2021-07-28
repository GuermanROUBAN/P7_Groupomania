<template>
  <div class="container">
    <div class="banner d-flex justify-content-center">
      <img :src="require('/src/assets/icon-above-font.png')" alt="Logo de l'entreprise" />
    </div>
    <div class="row">
      <div class="col-12 col-lg-12">
        <div class="row">
          <div class="about d-flex justify-content-center">
            <h1>WELCOME TO SOCIAL WORK</h1>
          </div>
          <div class="row">
            <div class="col-12 col-lg-12">
              <router-link to="/login" class="btn">LOGIN</router-link>
              <router-link to="/register" class="btn">REGISTER</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// description de notre component About
export default {
  // on exporte la description
  name: "About",
  computed: {
    // liste des variables qui montrent les variables globales
    // variables locales pour notre companent que attend Vue
    //  counter(){
    //    return this.$store.state.counter
    //  }
  },
  methods: {
    //   increaseCounter() {
    //     // fonction qui ne va pas accepté d'arguments particuliers
    //     this.$store.commit("increaseCounter"); // on modifie la variable globale de vueX(Redex pour vue.js => technologie de stockage de toute l'application dans un objet global)
    //     // on appel notre mutation dans store l.11
    //   },
  },
};
</script>
<style>
.container {
  height: auto;
}

.banner {
  height: 300px;
  width: 100%;
}
</style> 

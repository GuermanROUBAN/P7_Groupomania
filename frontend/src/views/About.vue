<template>
  <div class="container">
    <div>
      <img src="C:\Users\Guermoon\Desktop\Triumph\2021\P7\P7_Groupomania\frontend\src\assets\icon-above-front.png" class="img-fluid" alt="...">
    </div>
    
    <div class="row">
      <div class="col-12 col-lg-12">
        <div class="about">
          <h1>WELCOME TO GROUPOMANIA</h1>
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

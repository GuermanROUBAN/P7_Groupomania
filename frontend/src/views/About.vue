<template>
  <div class="container">
    <div class="banner-logo col-12 col-lg-12 d-flex justify-content-center text-center">
      <img :src="require('/src/assets/icon-left-font-monochrome-white.svg')" alt="Logo de l'entreprise" />
    </div>
    <div class="row">
      <div class="col-12 col-lg-12">
        <div class="row">
          <div class="about d-flex justify-content-center text-center">
            <h1>BIENVENUE DANS NOTRE RESEAU</h1>
          </div>
          <div class="row">
            <div class="actions col-12 col-lg-12 d-flex justify-content-around">
              <router-link to="/login" class="btn-link btn-lg">Se connecter</router-link>
              <router-link to="/register" class="btn-link btn-lg">S'inscrire</router-link>
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

body {
  background-image: url("https://note256.files.wordpress.com/2014/01/evernote-background-color.png");
}

h1 {
  align-content: center;
  color: #454545;
  font-weight: 600;font-weight: bold;
}

.banner-logo {
  height: 300px;
  width: 50%;
  margin: auto;
}
.btn{
  font-weight: bold;
}

.btn-link{
  color:#454545;
  font-weight: 800;
  font-size:2rem;
} 

.actions{
  margin-top: 40px;
}

</style> 

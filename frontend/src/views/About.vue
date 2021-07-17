<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button type="button" class="btn btn-success" v-on:click="increaseCounter">
      Success
    </button>
    {{ counter }}
  </div>
</template>

<script>
// description de notre component About
export default {
  // on exporte la description
  name: "About",
  computed: { // liste des variables qui montrent les variables globales
    // variables locales pour notre companent que attend Vue
   counter(){
     return this.$store.state.counter
   }
  },
  methods: {
    increaseCounter() {
      // fonction qui ne va pas accepté d'arguments particuliers
      this.$store.commit("increaseCounter"); // on modifie la variable globale de vueX(Redex pour vue.js => technologie de stockage de toute l'application dans un objet global)
      // on appel notre mutation dans store l.11
    },
  },
};
</script>

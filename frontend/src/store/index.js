import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/store/modules/auth'


Vue.use(Vuex)

// Vuex : une bibliothèque de gestion d'état permettant de créer un store centralisé
// qui deviendra la seule source de vérité de notre app;

export default new Vuex.Store({
  // Partie de Vuex est responsable de la gestion des données dans le store
  // State  contient notre data store global ;

  state: { // ici que des champs
    counter: 0
  },

  // La deuxième clé définie dans le store est appelée mutation.Comme son nom l'indique, 
  // elle contiendra un objet de toutes les propriétés responsables de modifications du  state.
  // Partie de Vuex qui est chargée d'apporter directement des modifications au data store 

  mutations: { // ici que des fonctions (liste de fonctions qui changent le state)

    increaseCounter(state) { // mutation qui comptabilise le click
      console.log(state.counter)
      state.counter++

    }
  },

  // Elles nous servent à coordonner la logique derrière les mutations.
  // Partie de Vuex qui est responsable de la gestion de la logique 
  // qui peut déclencher des changements dans le data store

  actions: { // marchent d'une facon async (pour les grandes operations pour le Be)

  },

  modules: {
    auth // on demande a vuex de traiter le module auth
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/store/modules/auth'


Vue.use(Vuex)

export default new Vuex.Store({
  state: { // ici que des champs
    counter: 0
  },
  mutations: { // ici que des fonctions (liste de fonctions qui changent le state)
    
    increaseCounter(state) { // mutation qui comptabilise le click
      console.log(state.counter)
      state.counter++
      
    }
  },
  actions: {
  },
  modules: {
    auth // on demande a vuex de traiter le module auth
  }
})

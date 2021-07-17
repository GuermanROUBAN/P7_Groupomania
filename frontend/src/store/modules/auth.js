// Création du module pour vuex.
// Il aura son state et sa mutation.

// state du module par defaut
let state = {
	isSubmitting: false
}

// mutation de notre module qui vont modifier notre state
let mutations = {
	registerStart(state) { // la fonction recoit comme argument l'etat du state
		state.isSubmitting = true // elle modifie la valeur et cela est le commit pour Register.vue
	}
}

// On exporte 
export default {state, mutations}
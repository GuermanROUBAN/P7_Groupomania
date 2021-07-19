// Création du module pour vuex.
// Il aura son state et sa mutation.

// Imports
import authApi from '@/api/auth'




// state du module par defaut
let state = {
	isSubmitting: false,
	isLoggedIn: false,
	currentUser: null, // Ici on va mettre notre objet
	error: null, // ici on va mettre notre erreur 
}

// mutation de notre module qui vont modifier notre state
let mutations = { // pour les modifications d'etat
	registerStart(state) { // la fonction recoit comme argument l'etat du state
		state.isSubmitting = true // elle modifie la valeur et cela est le commit pour Register.vue
	},
	registerSuccess(state, user) {
		state.isSubmitting = false // Le bouton doit se debloquer.
		state.currentUser = user
	},
	registerFailure(state, err) {
		state.isSubmitting = false
		state.error = err
	}
}

let actions = { // pour les grandes actions comme fetch
	register(context, credentials) {
		console.log("register")
		context.commit('registerStart')
		console.log("BOOOOOMMM");
		authApi.register(credentials)

			.then(response => {
				if (response.ok) {
					response.json().then(json => { // le json c'est la reponse de notre serveur
						console.log(json)
						context.commit('registerSuccess', json.user)
						localStorage.setItem("token", json.token)
					})
				} else {
					response.json().then(json => {
						console.log(json)
						context.commit('registerFailure', json.error)
					})

				}
			})
			.catch()
		// Test
		// setTimeout(() => {
		// 	context.commit('registerStart')
		// },
		// 	1000
		// )
	}
}


// On exporte 
export default { state, mutations, actions }
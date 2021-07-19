// Création du module pour vuex.
// Il aura son state et sa mutation.

// Imports
import authApi from '@/api/auth' // on importe toutes les fonctions depuis le fichier authAPI


// Sur cette base, nous pouvons définir le state comme un instantané du data store à un moment donné

// créer un espace de stockage de données unique qui servira de source unique de vérité
// pour toutes les données partagées;

// permettre à n'importe quel composant de récupérer des données directement ;

// permettre à n'importe quel composant de modifier le data store unique directement.

// state du module par defaut
let state = {
	isSubmitting: false, // etat du bouton (allumé par défaut)
	isLoggedIn: false,
	currentUser: null, // Ici on va mettre notre objet
	error: null, // ici on va mettre notre erreur 
}

// Mutation de notre module qui vont modifier notre state


let mutations = { // pour les modifications d'etat
	registerStart(state) { // la fonction recoit comme argument l'etat du state
		state.isSubmitting = true // elle modifie la valeur et cela est le commit pour Register.vue , eteint le bouton
	},
	registerSuccess(state, user) { // on capte l'etat actuel et le user
		state.isSubmitting = false // Le bouton doit se debloquer alors meme qu'on a enregistre le post
		state.isLoggedIn = true // l'utilisateur est arrivé
		state.currentUser = user // on met le user actuel (l.60) dans le state
	},
	registerFailure(state, err) {
		state.isSubmitting = false
		state.error = err // vient du state l.22
	}
}

// pour les grandes actions comme fetch
let actions = {
	// On va chercher notre action/fonction register (fetch) dans api/auth
	// Une action est composée d'un nom, du paramètre  context  et d'un payload optionnel
	// le paramètre  context  nous donne accès aux mêmes méthodes et propriétés 
	// dans l'instance du store Vuex (par exemple, commit, state, getters, etc.) ;
	register(context, credentials) {
		console.log("register")
		//Lorsqu'une mutation est actée, l'action commit prend 1 paramètre :
		// nom de la mutation ici registerStart
		context.commit('registerStart') // commit appel mutation
		// console.log("BOOOOOMMM");
		authApi.register(credentials)
			.then(response => {
				if (response.ok) {
					response.json().then(json => { // le json c'est la reponse de notre serveur (user, token)
						console.log(json)
						// La mutation est actée, l'action commit
						context.commit('registerSuccess', json.user) // on envoi le user dans les mutations
						localStorage.setItem("token", json.token) // le token va dans le LS
					})
				} else {
					response.json().then(json => {
						console.log(json)
						// La mutation est actée, l'action commit
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
	},
	login(context, credentials) {
		console.log("login")
		//Lorsqu'une mutation est actée, l'action commit prend 1 paramètre :
		// nom de la mutation ici registerStart
		context.commit('registerStart') // commit appel mutation // eteint le bouton
		// console.log("BOOOOOMMM");
		authApi.login(credentials)
			.then(response => {
				if (response.ok) {
					response.json().then(json => { // le json c'est la reponse de notre serveur (user, token)
						console.log(json)
						// La mutation est actée, l'action commit
						context.commit('registerSuccess', json.user) // on envoi le user dans les mutations, on appel tjr la meme mutation car elle nous est favorable
						localStorage.setItem("token", json.token) // le token va dans le LS
					})
				} else {
					response.json().then(json => {
						console.log(json)
						// La mutation est actée, l'action commit
						context.commit('registerFailure', json.error)
					})

				}
			})
			.catch()
	}
}


// On exporte 
export default { state, mutations, actions }
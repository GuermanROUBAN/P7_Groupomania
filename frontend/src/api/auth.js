// Imports
const fetch = require('node-fetch')
// req pour l'authorisation
// pour que fetch fonctionne dans npm il faut installer un module node-fetch
import axios from './instance'

// Enregistrer un utilisateur:
function register(credentials) { // données pour entrer usename email password
	// Le fetch prend 4 options
	return fetch('http://127.0.0.1:3000/api/auth/signup', { // 1. faire une requete sur l'addresse
		method: 'post', // 2. indique l'option du type de methode
		headers: { // 3. envoyer headers car sinon retourne 400 et ne voit pas le contenu de l'objet
			"Content-Type": "application/json"
		},
		body: JSON.stringify(credentials)
	})
}

// Loginer un utilisateur:
function login(credentials) { // données pour entrer usename email password
	// Le fetch prend 4 options
	return fetch('http://127.0.0.1:3000/api/auth/login', { // 1. faire une requete sur l'addresse
		method: 'post', // 2. indique l'option du type de methode
		headers: { // 3. envoyer headers car sinon retourne 400 et ne voit pas le contenu de l'objet
			"Content-Type": "application/json"
		},
		body: JSON.stringify(credentials)
	})
}

// Supprimer un post: router.delete('/delete/:id', auth, userCtrl.deleteUser);
function deleteMyAccount(userId) {
	return axios.delete(`http://127.0.0.1:3000/api/auth/delete/${userId}`);
}

// Exports
export default { register, login, deleteMyAccount }

//---------------------------------------------------

// Autres Routes possibles

// Séléctionner un utilisateur
// router.get('/', userCtrl.getOneUser);

// Séléctionner tous les utilisateurs
// router.get('/users', userCtrl.getAllUsers);
// req pour l'authorisation
// pour que fetch fonctionne dans npm il faut installer un module node-fetch

// Imports

const fetch = require('node-fetch')

function register(credentials) { // données pour entrer usename email password
	console.log(credentials)
	// Le fetch prend 4 options

	return fetch('http://127.0.0.1:3000/api/auth/signup', { // 1. faire une requete sur l'addresse

		method: 'post', // 2. indique l'option du type de methode
		headers: { // 3. envoyer headers car sinon retourne 400 et ne voit pas le contenu de l'objet
			"Content-Type": "application/json"
		},
		body: JSON.stringify(credentials)
	})
}

function login(credentials) { // données pour entrer usename email password
	console.log(credentials)
	// Le fetch prend 4 options

	return fetch('http://127.0.0.1:3000/api/auth/login', { // 1. faire une requete sur l'addresse

		method: 'post', // 2. indique l'option du type de methode
		headers: { // 3. envoyer headers car sinon retourne 400 et ne voit pas le contenu de l'objet
			"Content-Type": "application/json"
		},
		body: JSON.stringify(credentials)
	})
}





export default { register, login }

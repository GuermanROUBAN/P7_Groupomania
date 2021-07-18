// req pour l'authorisation
// pour que fetch fonctionne dans npm il faut installer un module node-fetch

// Imports

const fetch = require('node-fetch')

function register(credentials) {
	console.log(credentials)
	fetch('http://127.0.0.1:3000/api/auth/signup', {
		method: 'post',
		body: {
			username: 'Asterix',
			email: 'asterix@test.fr',
			password: 'Revolution45'
		}
	}).then(response => {
		console.log(response);
	}).catch(err => {
		console.log('error signup' + err)
	})
}
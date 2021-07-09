// Imports
let express = require('express');
// const userCtrl = require('./controllers/user')
/* récupération de l'application express */
const app = require('./app');

// Instantiate server
let server = express();

// Configure routes

server.get('/', function (req, res) {
//   // C'est l'entête de notre reponse http.
//   // Une fois qu'on aura accedé à la racine de la route, le serveur va nous renvoyer sa reponse.
//   // Nous prevenons le navigateur que nous attendons du content sous forme html(JSON XML HTML texte plein)
res.setHeader('Content-Type', 'text/html');
//   // on demande le renvoi d'un status 200 pour dire que tout est ok
res.status(200).send('<h1>Go poursuis tes rêves</h1>');
});

// Launch server
app.listen(3000, function () {
  console.log('Server en écoute :)');
});

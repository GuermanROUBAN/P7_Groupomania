// Importation de modules

// Ajout du router express
const express = require('express');

// Application express
const app = express();

// Importation des routes
const commentsRoutes = require('./routes/comments');
//-----------------------------------------------------------------------------
const userRoutes = require('./routes/user');
//-----------------------------------------------------------------------------
//Correction des erreurs CORS.
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});

// Routes
// on enregistre nos routeurs dans notre application
app.use('/api/comments', commentsRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
const express = require('express');
const app = express();

const bodyParser = require('body-parser');


//environnement variables//
require('dotenv').config()

//DB connection//
require("./database_connection");

/* CROSS ORIGIN RESOURCE SHARING CORS*/
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


/* .json - méthode de l'objet bodyParser qui transforme le corps de la requête en objet JS*/
app.use(bodyParser.json());

module.exports = app;
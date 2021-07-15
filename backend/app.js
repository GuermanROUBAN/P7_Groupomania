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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

const userRoute = require('./routes/user');
app.use('/api/auth', userRoute);

const postRoute = require('./routes/post')
app.use('/api/post', postRoute);

const commentRoute = require('./routes/comment');
app.use('/api/comment', commentRoute);

const adminRoute = require('./routes/admin');
app.use('/api/admin', adminRoute);


/* .json - méthode de l'objet bodyParser qui transforme le corps de la requête en objet JS*/

module.exports = app; // export vers server
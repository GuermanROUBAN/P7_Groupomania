// Imports

const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
//const multer = require('../middleware/multer-config');

// Routes

// Enregistrement des post dans la base de donnée
router.post('/create', auth, postCtrl.create);
// on met multer après l'authentification de la requete et pas avant

// Mise en place de la modification d'un post
router.put('/:id', auth, postCtrl.modifyPost);

// Supprimer un post
router.delete('/delete/:id', auth, postCtrl.deletePost);

// On Récupère un post spécifique
//router.get('/:id', auth, postCtrl.getOnePost)

// On va aller chercher la liste des posts dans la BD
//router.get('/', auth, postCtrl.getAllPosts);



// Exports
module.exports = router;
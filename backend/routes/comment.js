

// Imports

const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');
//const multer = require('../middleware/multer-config');

// Routes

// Enregistrement des post dans la base de donnée
router.post('/create', auth, commentCtrl.create);
// on met multer après l'authentification de la requete et pas avant

// Mise en place de la modification d'un post
router.put('/:id', auth, commentCtrl.modifyComment);

// Supprimer un post
router.delete('/delete/:id', auth, commentCtrl.deleteComment); //

// On Récupère un post spécifique
router.get('/read/:id', commentCtrl.getOneComment) // auth inutile car pas besoin d'etre logé pour voir un comment

// On va aller chercher la liste des posts dans la BD
router.get('/read-all-comments', commentCtrl.getAllComments); //auth inutile car pas besoin d'etre logé pour voir tous les posts

router.get('/posts-comments/:id', commentCtrl.getAllCommentForPost);

router.get('/users-comments/:id', commentCtrl.getAllCommentForUser);


// Exports
module.exports = router;

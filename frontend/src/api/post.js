// Imports


// const fetch = require('node-fetch')


// il faudra envoyer la clé TOKEN dans Headers
// il serait bien de mettre la clé automatiquement dans le headers


//---------------------------------------------------


// // Routes

// // Enregistrement des post dans la base de donnée
// router.post('/create', auth, postCtrl.create);
// // on met multer après l'authentification de la requete et pas avant

// // Mise en place de la modification d'un post
// router.put('/:id', auth, postCtrl.modifyPost);

// // Supprimer un post
// router.delete('/delete/:id', auth, postCtrl.deletePost); //

// // On Récupère un post spécifique
// router.get('/read/:id', postCtrl.getOnePost) // auth inutile car pas besoin d'etre logé pour voir un post

// // On va aller chercher la liste des posts dans la BD
// router.get('/read-all-posts', postCtrl.getAllPosts); //auth inutile car pas besoin d'etre logé pour voir tous les posts

// router.get('/users-posts/:id', postCtrl.getAllPostForUser);


// export default {  }
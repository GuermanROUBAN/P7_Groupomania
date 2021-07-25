// // Imports


// const fetch = require('node-fetch')

// function displayPosts() { // données pour entrer usename email password
// 	console.log()
// 	// Le fetch prend 4 options

// 	return fetch('http://127.0.0.1:3000/api/post/read-all-posts')
// }

// // il faudra envoyer la clé TOKEN dans Headers
// // il serait bien de mettre la clé automatiquement dans le headers
// export default { displayPosts }

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


// import { URL } from './info'

import axios from './instance'

// import axios from 'axios';

// const axiosInstance2 = axios.create({
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })



// import { URL } from './info'

function getPosts() {
  return axios({
    url: 'http://127.0.0.1:3000/api/post/read-all-posts',
    method: 'get'
  })
}

function createNewPost(credentials) {
  console.log(credentials)
  // Le fetch prend 4 options

  // return fetch('http://127.0.0.1:3000/api/post/create', {

  //   method: 'post',
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify(credentials)
  // })

  return axios.post('http://127.0.0.1:3000/api/post/create', credentials);

  // axiosInstance2.post('http://127.0.0.1:3000/api/post/create', credentials);
}

export default { getPosts, createNewPost }
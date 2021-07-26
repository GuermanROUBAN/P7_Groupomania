// Imports
import axios from './instance'

// Afficher des comments pour un post: router.get('/read-all-posts', postCtrl.getAllPosts); 
function getPosts() {
  return axios({
    url: 'http://127.0.0.1:3000/api/post/read-all-posts',// auth inutile car pas besoin d'etre logé pour voir un post
    method: 'get'
  })
}

// Enregistrer un post: router.post('/create', auth, postCtrl.create);
function createNewPost(credentials) {
  return axios.post('http://127.0.0.1:3000/api/post/create', credentials);
}

// Modifier un comment: router.put('/:id', auth, commentCtrl.deleteComment);
function modifyMyPost(postId, credentials) {
	return axios.put(`http://127.0.0.1:3000/api/post/${postId}`, credentials);
}

// Supprimer un post: router.delete('/delete/:id', auth, postCtrl.deletePost);
function deleteMyPost(postId, credentials) {
  return axios.delete(`http://127.0.0.1:3000/api/post/delete/${postId}`, credentials);
}

// Exports
export default { getPosts, createNewPost, deleteMyPost, modifyMyPost }

//---------------------------------------------------

// Autres Routes possibles

// On Récupère un post spécifique
// router.get('/read/:id', postCtrl.getOnePost) // auth inutile car pas besoin d'etre logé pour voir un post

// On Récupère tous les posts d'un user
// router.get('/users-posts/:id', postCtrl.getAllPostForUser);

//-------------------------------------------------

// 1) Variantes (axios (2))

// import { URL } from './info'

// const axiosInstance2 = axios.create({
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })
// axiosInstance2.post('http://127.0.0.1:3000/api/post/create', credentials);

// Variantes (fetch)

// function createNewPost(credentials) {
//   console.log(credentials)
// return fetch('http://127.0.0.1:3000/api/post/create', {
//   method: 'post',
//   headers: {
//     "Content-Type": "application/json"
//   },
//   body: JSON.stringify(credentials)
// })
//
//-------------------------------------------------

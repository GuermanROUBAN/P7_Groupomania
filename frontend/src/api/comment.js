// Imports
import axios from './instance'

// On récupère un comment spécifique
// router.get('/read/:id', commentCtrl.getOneComment) // auth inutile car pas besoin d'etre logé pour voir un comment

// On va chercher tous les comments dans la BD
// router.get('/read-all-comments', commentCtrl.getAllComments); //auth inutile car pas besoin d'etre logé pour voir tous les posts

// On va chercher tous les comments d'un user dans la BD
// router.get('/users-comments/:id', commentCtrl.getAllCommentForUser);



// Affichage des comments pour un post: router.get('/posts-comments/:id', commentCtrl.getAllCommentForPost);
function getCommentsForPost(postId) {
	return axios.get(`http://127.0.0.1:3000/api/comment/posts-comments/${postId}`);
}

// Enregistrer un comment: router.post('/create', auth, commentCtrl.create);
function createNewComment(credentials) {
	return axios.post('http://127.0.0.1:3000/api/comment/create', credentials);
}

// Modifier un comment: router.put('/:id', auth, commentCtrl.deleteComment);
function modifyMyComment(postId, credentials) {
	return axios.put(`http://127.0.0.1:3000/api/comment/${postId}`, credentials);
}

// Supprimer un comment: router.delete('/delete/:id', auth, commentCtrl.deleteComment);
function deleteMyComment(postId, credentials) {
	return axios.delete(`http://127.0.0.1:3000/api/comment/delete/${postId}`, credentials);
}

export default { getCommentsForPost, createNewComment, modifyMyComment, deleteMyComment }
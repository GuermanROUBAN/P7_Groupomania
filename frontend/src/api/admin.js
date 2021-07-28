// Imports
import axios from './instance'

// Supprimer un post: router.delete('/delete-post/:id', auth, adminCtrl.adminRemovePost);
function deleteUserPost(id) {
	return axios.delete(`http://127.0.0.1:3000/api/admin/delete-post/${id}`);
}

// Supprimer un comment: router.delete('/delete-post/:id', auth, adminCtrl.adminRemovePost);
function deleteUserComment(id) {
	return axios.delete(`http://127.0.0.1:3000/api/admin/delete-comment/${id}`);
}

// Supprimer un compte utilisateur: router.delete('/delete-post/:id', auth, adminCtrl.adminRemovePost);
function deleteUserAccount(postId, credentials) {
	return axios.delete(`http://127.0.0.1:3000/api/admin/delete-user/${postId}`, credentials);
}

// Exports
export default { deleteUserPost, deleteUserComment, deleteUserAccount }

//---------------------------------------------------
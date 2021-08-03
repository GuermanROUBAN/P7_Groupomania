// Imports des models
const User = require('../models/user')
const Post = require('../models/post');
const Comment = require('../models/comment');

// On vérifie si l'utilisateur est l'Administrateur
function checkIfAdmin(req, res, handler) {
	let userId = req.body.userId // On a recu l'id de l'utilisateur
	User.findOne({
		where: {
			id: userId
		}
	})
		.then(user => {
			if (user.isAdmin) {
				handler(true)
			} else {
				handler(false)
			}
		})
		.catch(err => {
			console.log("contrôle ERROR " + err);
			return res.status(500).json({ 'error': err })
		})
}

// L'admin supprime un post
exports.adminRemovePost = (req, res) => {
	checkIfAdmin(req, res, function (result) {
		//console.log("contrôle ADMIN " + result);
		if (!result) {
			res.status(404).json({ "error": "Accès uniquement administrateur !" })
		} else {
			Comment.findAll().then(async (comments) => {
				for (const comment of comments) {
					// permet de supprimer tous le poste avec le commentaire
					if (Number(req.params.id) === comment.idPOSTS) {
						await Comment.destroy({
							where: {
								id: comment.id
							}
						})
					}
				}
				Post.destroy({
					where: {
						id: Number(req.params.id)// convertion string in number
					}
				}).then(() => {
					res.status(200).json({
						message: "Post supprimé"
					})
				})
			})
		}
	})
}

// L'admin supprime un comment
exports.adminRemoveComment = (req, res) => {
	checkIfAdmin(req, res, function (result) {
		//console.log("contrôle ADMIN " + result);
		if (!result) {
			res.status(404).json({ "error": "Accès uniquement administrateur !" })
		} else {
			Comment.destroy({
				where: {
					id: Number(req.params.id)// convertion string in number
				}
			})
			res.status(200).json({
				message: "Comment supprimé"
			})
		}
	})
}

// // L'admin supprime un utilisteur
// exports.adminRemoveUser = (req, res) => {
// 	checkIfAdmin(req, res, function (result) {
// 		//console.log("contrôle ADMIN " + result);
// 		if (!result) {
// 			res.status(404).json({ "error": "Accès uniquement administrateur !" })
// 		} else {
// 			User.destroy({
// 				where: {
// 					id: Number(req.params.id)// convertion string in number
// 				}
// 			})
// 			res.status(200).json({
// 				message: "User supprimé"
// 			})
// 		}
// 	})
// }
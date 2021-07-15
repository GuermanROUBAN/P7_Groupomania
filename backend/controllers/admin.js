const User = require('../models/user')
const Post = require('../models/post');
const Comment = require('../models/comment');


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

exports.adminRemovePost = (req, res) => {
	checkIfAdmin(req, res, function (result) {
		console.log("contrôle ADMIN " + result);
		if (!result) {
			res.status(404).json({ "error": "Accès uniquement administrateur !" })
		} else {
			Post.destroy({
				where: {
					id: Number(req.params.id)// convertion string in number
				}
			})
			res.status(200).json({
				message: "Post supprimé"
			})
		}
	})
}

exports.adminRemoveComment = (req, res) => {
	checkIfAdmin(req, res, function (result) {
		console.log("contrôle ADMIN " + result);
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


exports.adminRemoveUser = (req, res) => {
	checkIfAdmin(req, res, function (result) {
		console.log("contrôle ADMIN " + result);
		if (!result) {
			res.status(404).json({ "error": "Accès uniquement administrateur !" })
		} else {
			User.destroy({
				where: {
					id: Number(req.params.id)// convertion string in number
				}
			})
			res.status(200).json({
				message: "User supprimé"
			})
		}
	})
}
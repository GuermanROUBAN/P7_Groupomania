// Imports
const Comment = require('../models/comment');
const User = require('../models/user');
// On aura besoin de npm install --save jsonwebtoken
const jwt = require('jsonwebtoken'); // on l'importe ici

// Creation d'un comment
exports.create = (req, res, next) => {

	let idUSERS = req.body.userId;
	let idPOSTS = req.body.postId; // la key est elle ici?
	let text = req.body.comment;

	if (idUSERS === null || idPOSTS === null || text === "") {
		return res.status(400).json({ 'error': 'missing parameters > commentCtrl.js(1)' });
	}
	const comment = new Comment({
		idUSERS: idUSERS,
		idPOSTS: idPOSTS,
		comment: text,
	});
	comment.save()
		.then(() => res.status(201).json({ message: 'comment enregistrée !' })) // 201 pour création de ressources
		.catch(error => res.status(400).json({ error }));
}

// Modification comment
exports.modifyComment = (req, res, next) => {
	// On fait un req dans body et params
	let text = req.body.comment;
	let idComment = req.params.id; // on capte l'id du comment
	let userId = req.body.userId // on capte l'id de l'utilisateur

	Comment.findOne({ // on cherche le comment avec le bon id
		where: { id: idComment } // le numero du commentaire dans la ligne params
	}).then(comment => {
		if (!comment) { // le comment existe t'il
			return res.status(400).json({ "error": 'comment non trouvé' })
		}
		if (Number(userId) === Number(comment.idUSERS)) { // on controle si l'id qui fait la requete correspond avec l'id de l'utilisateur dans le post
			// Number permet de le donner le meme type (Nombre)
			Comment.update({
				comment: text, // La clé doit correspondre au champs de la bdd et apres la proriete
			},
				// La methode .update prend 2 arguments: 1er {nouvelles values}, 2eme {la où elles doivent etre inscrites}
				{
					where:
						{ id: idComment },
				}) // permet de mettre à jour comment, {objet} que nous passons en argument.
				// Nous utilisons aussi id passé dans la demande et le remplacons par le comment passé comme second argument.
				.then(() => res.status(200).json({ message: 'comment modifiée !' }))
				.catch(error => res.status(400).json({ error }));
		} else {
			return res.status(400).json({ "error": 'changement comment interdit !' })
		}
	})
}

// Supprimer un comment
exports.deleteComment = (req, res, next) => {

	let idComment = req.params.id;
	let userId = req.body.userId

	Comment.findOne({
		where: { id: idComment }
	}).then(comment => {
		if (!comment) {
			return res.status(400).json({ "error": 'comment non trouvé' })
		}
		if (Number(userId) === Number(comment.idUSERS)) {
			Comment.destroy({
				where: {
					id: Number(req.params.id)// convertion string in number
				}
			})
			return res.status(200).send({
				message: "Comment supprimé"
			})
		} else {
			return res.status(400).json({ "error": 'Suppression comment non autorisée' })
		}
	})
}

// Chercher un comment
exports.getOneComment = (req, res, next) => {

	let commentId = req.params.id; // id apparait dans la ligne de la reqete

	Comment.findOne({
		where: {
			id: commentId,
		},
	})
		.then((comment) => res.status(200).json({
			comment
		}))
		.catch((err) => res.status(401).json({
			err
		}));
};

// Chercher tous les comments
exports.getAllComments = (req, res, next) => {
	Comment.findAll()
		.then((comments) => {
			const copyComments = [...comments];

			User.findAll().then((users) => {
				for (const comment of copyComments) {
					for (const user of users) {
						if (user.id === comment.idUSERS) {
							comment.username = user.username;
							break;
						}
					}
				}

				const newMapComments = copyComments.map((copyComment) => {
					return {
						id: copyComment.id,
						idPOSTS: copyComment.idPOSTS,
						comment: copyComment.comment,
						createdAt: copyComment.createdAt,
						updatedAt: copyComment.updatedAt,
						username: copyComment.username
					}
				})
				res.status(200).json({
					comments: newMapComments
				})
			})
		})
		.catch((err) => res.status(401).json({
			err
		}));
};


// Chercher tous les comments d'un post
exports.getAllCommentForPost = (req, res, next) => {

	let postId = Number(req.params.id); // id apparait dans la ligne de la reqete

	Comment.findAll({
		where: {
			idPOSTS: postId,
		},
	})
		.then((comments) => {
			const copyComments = [...comments];

			User.findAll().then((users) => {
				for (const comment of copyComments) {
					for (const user of users) {
						if (user.id === comment.idUSERS) {
							comment.username = user.username;
							break;
						}
					}
				}

				const newMapComments = copyComments.map((copyComment) => {
					return {
						id: copyComment.id,
						idUSERS: copyComment.idUSERS,
						idPOSTS: copyComment.idPOSTS,
						comment: copyComment.comment,
						createdAt: copyComment.createdAt,
						updatedAt: copyComment.updatedAt,
						username: copyComment.username
					}
				})

				res.status(200).json({
					comments: newMapComments
				})
			})
		})

		.catch((err) => res.status(401).json({
			err
		}));
};


// Chercher tous les comments d'un user

exports.getAllCommentForUser = (req, res, next) => {

	let userId = Number(req.params.id); // id apparait dans la ligne de la reqete

	Comment.findAll({
		where: {
			idUSERS: userId,
		},
	})
		.then((comments) => {
			res.status(200).json({
				comments
			})
		})

		.catch((err) => res.status(401).json({
			err
		}));
};
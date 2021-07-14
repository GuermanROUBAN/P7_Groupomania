const Comment = require('../models/comment');

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
	let idComment = req.params.id; // on capte l'id du post
	let userId = req.body.userId // on capte l'id de l'utilisateur

	Comment.findOne({ // on cherche le poste avec le bon id
		where: { id: idComment } // le numero du commentaire dans la ligne params
	}).then(comment => {
		if (!comment) { // le poste existe t'il
			return res.status(400).json({ "error": 'comment non trouvé' })
		}
		console.log('WAHHHH :' + userId)
		console.log('BAHHHH:' + comment.idUSERS);
		if (Number(userId) === Number(comment.idUSERS)) { // on controle si l'id qui fait la requete correspond avec l'id de l'utilisateur dans le post
			// Number permet de le donner le meme type (Nombre)
			Comment.update({
				comment: text, // La clé doit correspondre au champs de la bdd et apres la proriete
			},
				// La methode .update prend 2 arguments: 1er {nouvelles values}, 2eme {la où elles doivent etre inscrites}
				{
					where:
						{ id: idComment },

				}) // permet de mettre à jour post, {objet} que nous passons en argument.
				// Nous utilisons aussi id passé dans la demande et le remplacons par le post passé comme second argument.
				.then(() => res.status(200).json({ message: 'post modifiée !' }))
				.catch(error => res.status(400).json({ error }));
		} else {
			return res.status(400).json({ "error": 'changement comment interdit !' })
		}
	})
}



// Supprimer un utilisateur

exports.deleteComment = (req, res, next) => {

	let idComment = req.params.id;
	let userId = req.body.userId


	Comment.findOne({
		where: { id: idComment }
	}).then(comment => {
		if (!comment) {
			return res.status(400).json({ "error": 'comment non trouvé' })
		}
		console.log('BOOOOOM :' + userId)
		console.log(comment.idUSERS);
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

// Chercher un Utilisateur

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



// Chercher tous les utilisateurs

exports.getAllComments = (req, res, next) => {
	Comment.findAll()
		.then((comments) => res.status(200).json({
			comments
		}))
		.catch((err) => res.status(401).json({
			err
		}));
};


// Chercher tous les comments d'un post

exports.getAllCommentForPost = (req, res, next) => {

	let postId = Number(req.params.id); // id apparait dans la ligne de la reqete
	console.log(postId);
	Comment.findAll({
		where: {
			idPOSTS: postId,
		},
	})
		.then((comments) => {
			console.log(comments);
			res.status(200).json({
				comments
			})
		})

		.catch((err) => res.status(401).json({
			err
		}));
};


// Chercher tous les comments d'un post

exports.getAllCommentForUser = (req, res, next) => {

	let userId = Number(req.params.id); // id apparait dans la ligne de la reqete
	console.log(userId);
	Comment.findAll({
		where: {
			idUSERS: userId,
		},
	})
		.then((comments) => {
			console.log(comments);
			res.status(200).json({
				comments
			})
		})

		.catch((err) => res.status(401).json({
			err
		}));
};
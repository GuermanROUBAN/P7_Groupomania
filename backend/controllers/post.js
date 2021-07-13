const Post = require('../models/post');

// On aura besoin de npm install --save jsonwebtoken
const jwt = require('jsonwebtoken'); // on l'importe ici

// Creation d'une post

exports.create = (req, res, next) => {

	let idUSERS = req.body.userId;
	let title = req.body.title;
	let content = req.body.content;
	let attachement = req.body.attachement;

	if (idUSERS === null || title === "" || content === "" || attachement === "") {
		return res.status(400).json({ 'error': 'missing parameters > postCtrl.js(1)' });
	}
	const post = new Post({
		idUSERS: idUSERS,
		title: title,
		content: content,
		attachement: attachement,
	});
	post.save()
		.then(() => res.status(201).json({ message: 'post enregistrée !' })) // 201 pour création de ressources
		.catch(error => res.status(400).json({ error }));
}

// Modification post
exports.modifyPost = (req, res, next) => {

	let title = req.body.title;
	let content = req.body.content;
	let attachement = req.body.attachement;
	let idPost = req.params.id;
	let userId = req.body.userId

	Post.findOne({
		where: { id: idPost }
	}).then(post => {
		if (!post) {
			return res.status(400).json({ "error": 'post non trouvé' })
		}
		if (userId === post.idUSERS) {
			Post.update({
				title: title,
				content: content,
				attachement: attachement,
			},
				// La methode .update prend 2 arguments: 1er {nouvelles values}, 2eme {la où elles doivent etre inscrites}
				{
					where:
						{ id: idPost },

				}) // permet de mettre à jour post, {objet} que nous passons en argument.
				// Nous utilisons aussi id passé dans la demande et le remplacons par le post passé comme second argument.
				.then(() => res.status(200).json({ message: 'post modifiée !' }))
				.catch(error => res.status(400).json({ error }));
		} else {
			return res.status(400).json({ "error": 'changement post interdit !' })
		}
	})
}


// Supprimer un utilisateur

exports.deletePost = (req, res, next) => {

	let idPost = req.params.id;
	let userId = req.body.userId

	Post.findOne({
		where: { id: idPost }
	}).then(post => {
		if (!post) {
			return res.status(400).json({ "error": 'post non trouvé' })
		}
		console.log(userId)
		console.log(post.idUSERS);
		if (Number(userId) === Number(post.idUSERS)) {
			Post.destroy({
				where: {
					id: Number(req.params.id)// convertion string in number
				}
			})
			return res.status(200).send({
				message: "Utilisateur supprimé"
			})
		} else {
			return res.status(400).json({ "error": 'suppression non autorisée' })
		}
	})
}

// Chercher un Utilisateur

exports.getOnePost = (req, res, next) => {

	let postId = req.params.id; // id apparait dans la ligne de la reqete

	Post.findOne({
		where: {
			id: postId,
		},
	})
		.then((post) => res.status(200).json({
			post
		}))
		.catch((err) => res.status(401).json({
			err
		}));
};



// Chercher tous les utilisateurs

exports.getAllPosts = (req, res, next) => {
	Post.findAll()
		.then((posts) => res.status(200).json({
			posts
		}))
		.catch((err) => res.status(401).json({
			err
		}));
};
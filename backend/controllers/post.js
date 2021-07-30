const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

// On aura besoin de npm install --save jsonwebtoken
// const jwt = require('jsonwebtoken'); // on l'importe ici

// Création d'un post
exports.create = (req, res, next) => {

	let idUSERS = req.body.userId;
	let title = req.body.title;
	let content = req.body.content;
	let attachement = req.body.attachement;

	// null ne doit pas etre vide, c'est un number
	if (idUSERS === null || title === "" || content === "" || attachement === "") {
		return res.status(400).json({ 'error': 'Missing parameters > postCtrl.js(1)' });
	}
	const post = new Post({
		idUSERS: idUSERS,
		title: title,
		content: content,
		attachement: attachement,
	});
	post.save()
		.then(() => res.status(201).json({ message: 'Post enregistrée !' })) // 201 pour création de ressources
		.catch(error => res.status(400).json({ error }));
}

// Modification d'un post
exports.modifyPost = (req, res, next) => {

	let title = req.body.title;
	let content = req.body.content;
	let attachement = req.body.attachement;
	let idPost = req.params.id; // on capte l'id du post
	let userId = req.body.userId // on capte l'id de l'utilisateur

	Post.findOne({ // on cherche le poste avec le bon id
		where: { id: idPost }
	}).then(post => {
		if (!post) { // le poste existe t'il
			return res.status(400).json({ "error": 'Post non trouvé' })
		}
		if (userId === post.idUSERS) { // on controle si l'id qui fait la requete correspond avec l'id de l'utilisateur dans le post
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
				.then(() => res.status(200).json({ message: 'Post modifiée !' }))
				.catch(error => res.status(400).json({ error }));
		} else {
			return res.status(400).json({ "error": 'Changement post interdit !' })
		}
	})
}


// Supprimer d'un post
exports.deletePost = (req, res, next) => {

	let idPost = req.params.id;
	let userId = req.body.userId

	Post.findOne({
		where: { id: idPost }
	}).then(post => {
		if (!post) {
			return res.status(400).json({ "error": 'Post non trouvé' })
		}
		if (Number(userId) === Number(post.idUSERS)) {
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
		} else {
			return res.status(400).json({ "error": 'Suppression post non autorisée' })
		}
	})
}

// Chercher un post
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

// Chercher tous les posts
exports.getAllPosts = (req, res, next) => {
	Post.findAll()
		.then((posts) => {
			// on fait une copie de l'objet
			const copyPosts = [...posts];
			// on cherche tous les utilisateurs
			User.findAll().then((users) => {
				// cycle de copyPost
				for (const post of copyPosts) {
					// pour chaque post on prend tous les users
					for (const user of users) {
						// on compare l'id user avec l'id du post
						if (user.id === post.idUSERS) {
							// on ajoute a post d'objet username
							post.username = user.username;
							break;
						}
					}
				}
				// On crée un nouveau massif avec ces données
				const newMapPosts = copyPosts.map((copyPost) => {
					return {
						idUSERS: copyPost.idUSERS,
						title: copyPost.title,
						content: copyPost.content,
						attachement: copyPost.attachement,
						username: copyPost.username,
						createdAt: copyPost.createdAt,
						updatedAt: copyPost.updatedAt,
						id: copyPost.id
					}
				})
				// On envoie les données
				res.status(200).json({
					posts: newMapPosts
				})
			})
		})
		.catch((err) => res.status(401).json({
			err
		}));
};


// Chercher tous les posts d'un user
exports.getAllPostForUser = (req, res, next) => {

	let userId = Number(req.params.id); // id apparait dans la ligne de la reqete
	console.log(userId);
	Post.findAll({
		where: {
			idUSERS: userId,
		},
	})
		.then((posts) => {
			console.log(posts);
			res.status(200).json({
				posts
			})
		})
		.catch((err) => res.status(401).json({
			err
		}));
};
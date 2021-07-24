const Post = require('../models/post');
const User = require('../models/user');

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
		console.log(userId)
		console.log(post.idUSERS);
		if (Number(userId) === Number(post.idUSERS)) {
			Post.destroy({
				where: {
					id: Number(req.params.id)// convertion string in number
				}
			})
			return res.status(200).send({
				message: "Post supprimé"
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
			const copyPosts = [...posts];
			User.findAll().then((users) => {
				for (const post of copyPosts) {
					for (const user of users) {
						if (user.id === post.idUSERS) {
							post.username = user.username;
							break;
						}
					}
				}
				const newMapPosts = copyPosts.map((copyPost) => {
					return {
						idUSERS: copyPost.idUSERS,
						title: copyPost.title,
						content: copyPost.content,
						attachement: copyPost.attachement,
						username: copyPost.username,
						createdAt: copyPost.createdAt
					}
				})

				console.log(newMapPosts);

				res.status(200).json({
					posts: newMapPosts
				})
				res.status(200).json({
					posts: copyPosts
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